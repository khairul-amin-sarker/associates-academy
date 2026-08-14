"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader2, RotateCcw, Save, Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { publishHomePage, saveHomeDraft } from "@/app/(admin)/admin/website-studio/actions";
import { homeContentSchema, type HomeContentInput } from "@/lib/validation/cms";

export function WebsiteStudioForm({ initial }: { initial: HomeContentInput }) {
  const [publishing, startPublishing] = useTransition();
  const form = useForm<HomeContentInput>({ resolver: zodResolver(homeContentSchema), defaultValues: initial });
  const values = useWatch({ control: form.control });

  function run(kind: "draft" | "publish") {
    void form.handleSubmit((data) => startPublishing(async () => {
      const result = kind === "draft" ? await saveHomeDraft(data) : await publishHomePage(data);
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    }))();
  }

  return <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]"><Card className="py-0"><CardHeader className="flex-row items-center justify-between border-b p-5"><div><CardTitle className="font-heading">Homepage content</CardTitle><p className="mt-1 text-xs text-muted-foreground">Draft → preview → publish → rollback</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => run("draft")} disabled={publishing}><Save />Draft</Button><Button onClick={() => run("publish")} disabled={publishing}>{publishing ? <Loader2 className="animate-spin" /> : <Send />}Publish</Button></div></CardHeader><CardContent className="space-y-5 p-5"><Field label="Eyebrow" error={form.formState.errors.eyebrow?.message}><Input {...form.register("eyebrow")} /></Field><Field label="Hero title" error={form.formState.errors.title?.message}><Textarea rows={3} {...form.register("title")} /></Field><Field label="Hero description" error={form.formState.errors.description?.message}><Textarea rows={4} {...form.register("description")} /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Primary CTA" error={form.formState.errors.primaryCta?.message}><Input {...form.register("primaryCta")} /></Field><Field label="Secondary CTA" error={form.formState.errors.secondaryCta?.message}><Input {...form.register("secondaryCta")} /></Field></div><div className="border-t pt-5"><p className="font-heading text-lg font-bold">Founder section</p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Name" error={form.formState.errors.founderName?.message}><Input {...form.register("founderName")} /></Field><Field label="Title" error={form.formState.errors.founderTitle?.message}><Input {...form.register("founderTitle")} /></Field></div><Field label="Short profile" error={form.formState.errors.founderBio?.message}><Textarea rows={4} {...form.register("founderBio")} /></Field></CardContent></Card><div className="space-y-5"><Card className="sticky top-6 overflow-hidden py-0"><CardHeader className="flex-row items-center justify-between border-b p-5"><CardTitle className="font-heading flex items-center gap-2"><Eye className="h-5 w-5 text-brand-gold" />Live preview</CardTitle><Button variant="ghost" size="sm" onClick={() => form.reset(initial)}><RotateCcw />Reset</Button></CardHeader><CardContent className="p-0"><div className="paper-grid bg-brand-navy p-7 text-white"><p className="text-xs font-bold tracking-[0.14em] text-brand-gold uppercase">{values.eyebrow}</p><h2 className="font-heading mt-4 text-4xl leading-tight font-extrabold">{values.title}</h2><p className="mt-4 text-sm leading-7 text-white/65">{values.description}</p><div className="mt-6 flex gap-2"><span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-navy">{values.primaryCta}</span><span className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold">{values.secondaryCta}</span></div></div><div className="p-6"><p className="text-xs font-bold tracking-[0.14em] text-brand-gold uppercase">FOUNDER</p><p className="font-heading mt-2 text-2xl font-bold">{values.founderName}</p><p className="text-sm font-semibold text-brand-indigo">{values.founderTitle}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{values.founderBio}</p></div></CardContent></Card></div></div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <div className="space-y-2"><Label>{label}</Label>{children}{error ? <p className="text-xs text-destructive">{error}</p> : null}</div>; }
