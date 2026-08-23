import "server-only";

import { createAdminClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

type ExternalEvent = {
  eventId: string;
  sessionId: string;
  name: string;
  path: string;
  occurredAt: string;
  properties: Record<string, unknown>;
  clientIp?: string;
  userAgent?: string;
  fbclid?: string | null;
};

const metaNames: Record<string, string> = {
  page_view: "PageView",
  cta_click: "ViewContent",
  checkout_started: "InitiateCheckout",
  payment_initiated: "AddPaymentInfo",
  verified_purchase: "Purchase",
  workshop_registration: "Lead",
  lead: "Lead",
};

function base64Url(value: string | ArrayBuffer) {
  const bytes =
    typeof value === "string"
      ? new TextEncoder().encode(value)
      : new Uint8Array(value);
  return Buffer.from(bytes).toString("base64url");
}

async function googleAccessToken(serviceAccountJson: string) {
  const account = JSON.parse(serviceAccountJson) as {
    client_email?: string;
    private_key?: string;
  };
  if (!account.client_email || !account.private_key)
    throw new Error("invalid_google_service_account");
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: account.client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const keyBytes = Buffer.from(
    account.private_key.replace(
      /-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,
      "",
    ),
    "base64",
  );
  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${header}.${payload}`),
  );
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${payload}.${base64Url(signature)}`,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`google_oauth_${response.status}`);
  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("google_oauth_token_missing");
  return data.access_token;
}

async function sendGa4(event: ExternalEvent) {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return { configured: false };
  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: event.sessionId,
        timestamp_micros: String(new Date(event.occurredAt).getTime() * 1000),
        events: [
          {
            name: event.name,
            params: {
              ...event.properties,
              page_location: `${process.env.NEXT_PUBLIC_SITE_URL}${event.path}`,
              engagement_time_msec: 1,
              event_id: event.eventId,
            },
          },
        ],
      }),
      cache: "no-store",
    },
  );
  if (!response.ok)
    throw new Error(`ga4_measurement_protocol_${response.status}`);
  return { configured: true };
}

async function sendMeta(event: ExternalEvent) {
  const datasetId = process.env.META_DATASET_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_API_VERSION;
  const eventName = metaNames[event.name];
  if (!datasetId || !token || !version || !eventName)
    return { configured: false };
  const response = await fetch(
    `https://graph.facebook.com/${encodeURIComponent(version)}/${encodeURIComponent(datasetId)}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(new Date(event.occurredAt).getTime() / 1000),
            event_id: event.eventId,
            action_source: "website",
            event_source_url: `${process.env.NEXT_PUBLIC_SITE_URL}${event.path}`,
            user_data: {
              client_ip_address: event.clientIp,
              client_user_agent: event.userAgent,
              fbc: event.fbclid
                ? `fb.1.${new Date(event.occurredAt).getTime()}.${event.fbclid}`
                : undefined,
            },
            custom_data: event.properties,
          },
        ],
      }),
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error(`meta_capi_${response.status}`);
  return { configured: true };
}

export async function dispatchExternalEvent(event: ExternalEvent) {
  return Promise.allSettled([sendGa4(event), sendMeta(event)]);
}

export async function syncExternalAnalytics(
  runType: "daily_sync" | "manual_sync",
) {
  const admin = createAdminClient();
  if (!admin) return { configured: false, reason: "supabase_secret_missing" };
  const completedAt = new Date().toISOString();
  const results: Record<string, { connected: boolean; error?: string }> = {};
  try {
    const serviceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!serviceAccount || !propertyId) throw new Error("not_connected");
    const token = await googleAccessToken(serviceAccount);
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
          dimensions: [
            { name: "date" },
            { name: "sessionSource" },
            { name: "sessionMedium" },
          ],
          metrics: [
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "eventCount" },
            { name: "keyEvents" },
          ],
          limit: 1000,
        }),
        cache: "no-store",
      },
    );
    if (!response.ok) throw new Error(`ga4_data_api_${response.status}`);
    const detail = await response.json();
    await admin.from("integration_runs").insert({
      integration_key: "ga4",
      run_type: runType,
      status: "success",
      completed_at: completedAt,
      detail,
    });
    results.ga4 = { connected: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "sync_failed";
    await admin.from("integration_runs").insert({
      integration_key: "ga4",
      run_type: runType,
      status: "failed",
      completed_at: completedAt,
      detail: {},
      error_message: message,
    });
    results.ga4 = { connected: false, error: message };
  }
  try {
    const token = process.env.META_MARKETING_ACCESS_TOKEN;
    const account = process.env.META_AD_ACCOUNT_ID;
    const version = process.env.META_GRAPH_API_VERSION;
    if (!token || !account || !version) throw new Error("not_connected");
    const url = new URL(
      `https://graph.facebook.com/${version}/act_${account.replace(/^act_/, "")}/insights`,
    );
    url.searchParams.set("access_token", token);
    url.searchParams.set(
      "fields",
      "campaign_id,campaign_name,impressions,clicks,spend,actions,action_values",
    );
    url.searchParams.set("date_preset", "yesterday");
    url.searchParams.set("level", "campaign");
    url.searchParams.set("limit", "500");
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`meta_marketing_api_${response.status}`);
    const detail = (await response.json()) as {
      data?: Array<Record<string, unknown>>;
    };
    const day = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    if (detail.data?.length)
      await admin.from("ad_campaign_metrics").upsert(
        detail.data.map((row) => ({
          day,
          platform: "meta",
          account_id: account,
          campaign_id: String(row.campaign_id ?? "unknown"),
          campaign_name:
            typeof row.campaign_name === "string" ? row.campaign_name : null,
          impressions: Number(row.impressions ?? 0),
          clicks: Number(row.clicks ?? 0),
          spend: Number(row.spend ?? 0),
          raw_metrics: row as Json,
          synced_at: completedAt,
        })),
        { onConflict: "day,platform,account_id,campaign_id" },
      );
    await admin.from("integration_runs").insert({
      integration_key: "meta",
      run_type: runType,
      status: "success",
      completed_at: completedAt,
      detail: detail as Json,
    });
    results.meta = { connected: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "sync_failed";
    await admin.from("integration_runs").insert({
      integration_key: "meta",
      run_type: runType,
      status: "failed",
      completed_at: completedAt,
      detail: {},
      error_message: message,
    });
    results.meta = { connected: false, error: message };
  }
  return { configured: true, results };
}
