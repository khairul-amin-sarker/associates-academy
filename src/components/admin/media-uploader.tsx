"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function MediaUploader() {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  async function upload() {
    if (!file) return;
    setLoading(true);
    try {
      const payload = { bucket: "cms-public", originalName: file.name, mimeType: file.type, sizeBytes: file.size, altText: alt };
      const sign = await fetch("/api/admin/media/sign-upload", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const signed = await sign.json();
      if (!sign.ok) throw new Error(signed.error ?? "signing_failed");
      const { error } = await createClient().storage.from("cms-public").uploadToSignedUrl(signed.path, signed.token, file, { contentType: file.type });
      if (error) throw error;
      const complete = await fetch("/api/admin/media/complete", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...payload, path: signed.path }) });
      const completed = await complete.json();
      if (!complete.ok) throw new Error(completed.error ?? "verification_failed");
      toast.success("Upload verified এবং Media Library-তে যোগ হয়েছে");
      setFile(null); setAlt(""); if (input.current) input.current.value = "";
    } catch (error) { toast.error(error instanceof Error ? error.message : "Upload failed"); }
    finally { setLoading(false); }
  }
  return <Card className="max-w-2xl py-0"><CardContent className="p-6"><div className="grid min-h-48 place-items-center rounded-2xl border border-dashed bg-muted/30 p-6 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-gold/15 text-brand-gold"><UploadCloud /></span><p className="font-heading mt-4 text-xl font-bold">Marketing image upload</p><p className="mt-1 text-sm text-muted-foreground">JPG, PNG, WebP বা AVIF · সর্বোচ্চ ১০MB</p><Input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="mt-4" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></div></div><div className="mt-5 space-y-2"><Label htmlFor="alt">Alt text</Label><Input id="alt" value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="ছবিটি কী দেখায়" /></div><Button className="mt-5" onClick={upload} disabled={!file || loading}>{loading ? <Loader2 className="animate-spin" /> : <ImageUp />}Upload এবং verify</Button></CardContent></Card>;
}
