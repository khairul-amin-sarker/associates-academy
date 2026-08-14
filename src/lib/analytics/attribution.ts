export type Touchpoint = { source?: string | null; medium?: string | null; campaign?: string | null; fbclidHash?: string | null; occurredAt: string };

export function resolveAttribution(touchpoints: Touchpoint[], purchaseAt: string, windowDays = 30) {
  const purchaseTime = new Date(purchaseAt).getTime();
  const windowMs = windowDays * 86_400_000;
  const eligible = touchpoints.filter((touch) => { const time = new Date(touch.occurredAt).getTime(); return Number.isFinite(time) && time <= purchaseTime && purchaseTime - time <= windowMs; }).sort((a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime());
  return { firstTouch: eligible[0] ?? null, lastTouch: eligible.at(-1) ?? null };
}
