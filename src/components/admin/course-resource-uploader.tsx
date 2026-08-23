"use client";

import { useState, useTransition } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { saveModuleResource } from "@/app/(admin)/admin/courses/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type ModuleOption = { id: number; title: string; productId: number };

export function CourseResourceUploader({
  modules,
}: {
  modules: ModuleOption[];
}) {
  const [moduleId, setModuleId] = useState(String(modules[0]?.id ?? ""));
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [pending, startTransition] = useTransition();
  async function upload() {
    const selectedModule = modules.find((item) => item.id === Number(moduleId));
    if (!selectedModule || !file) return;
    try {
      const payload = {
        bucket: "course-files",
        originalName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        scopeId: String(selectedModule.productId),
      };
      const signedResponse = await fetch("/api/admin/media/sign-upload", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const signed = await signedResponse.json();
      if (!signedResponse.ok) throw new Error(signed.error ?? "signing_failed");
      const { error } = await createClient()
        .storage.from("course-files")
        .uploadToSignedUrl(signed.path, signed.token, file, {
          contentType: file.type,
        });
      if (error) throw error;
      const completeResponse = await fetch("/api/admin/media/complete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, path: signed.path }),
      });
      if (!completeResponse.ok) throw new Error("upload_not_verified");
      const formData = new FormData();
      formData.set("moduleId", moduleId);
      formData.set("title", title || file.name);
      formData.set("objectPath", signed.path);
      formData.set("mimeType", file.type);
      formData.set("position", "0");
      formData.set("isPublished", "on");
      startTransition(async () => {
        await saveModuleResource(formData);
        toast.success("Private resource upload ও publish হয়েছে");
        setFile(null);
        setTitle("");
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Resource upload failed",
      );
    }
  }
  return (
    <div className="bg-brand-cream/30 space-y-3 rounded-2xl border border-dashed p-4">
      <p className="font-heading text-lg font-bold">Private resource upload</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="resource-module">Module</Label>
          <select
            id="resource-module"
            value={moduleId}
            onChange={(event) => setModuleId(event.target.value)}
            className="mt-1 h-10 w-full rounded-md border bg-white px-3"
          >
            <option value="">Module নির্বাচন করুন</option>
            {modules.map((module) => (
              <option value={module.id} key={module.id}>
                {module.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="resource-title">Resource title</Label>
          <Input
            id="resource-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="PDF Notes"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="course-file">File</Label>
        <Input
          id="course-file"
          type="file"
          accept="application/pdf,application/zip,image/jpeg,image/png"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </div>
      <Button
        type="button"
        onClick={upload}
        disabled={!file || !moduleId || pending}
      >
        {pending ? <Loader2 className="animate-spin" /> : <FileUp />}Upload
        private resource
      </Button>
    </div>
  );
}
