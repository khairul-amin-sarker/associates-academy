"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({ email: z.email("সঠিক email দিন"), password: z.string().min(8, "কমপক্ষে ৮ অক্ষর দিন") });
type Values = z.infer<typeof schema>;

export function AuthForm({ nextPath = "/dashboard" }: { nextPath?: string }) {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });
  const loading = form.formState.isSubmitting;

  async function submit(values: Values) {
    const supabase = createClient();
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword(values)
      : await supabase.auth.signUp({ ...values, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}` } });
    if (result.error) { toast.error(result.error.message); return; }
    if (mode === "signup" && !result.data.session) { toast.success("Verification email পাঠানো হয়েছে"); return; }
    window.location.assign(nextPath.startsWith("/") ? nextPath : "/dashboard");
  }

  async function resetPassword() {
    const email = form.getValues("email");
    if (!z.email().safeParse(email).success) { form.setError("email", { message: "Reset link-এর জন্য email দিন" }); return; }
    const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/profile` });
    if (error) toast.error(error.message); else toast.success("Password reset email পাঠানো হয়েছে");
  }

  return <Tabs value={mode} onValueChange={(value) => setMode(value as typeof mode)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="signin">লগইন</TabsTrigger><TabsTrigger value="signup">নতুন account</TabsTrigger></TabsList><TabsContent value={mode} className="mt-6"><form onSubmit={form.handleSubmit(submit)} className="space-y-5"><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" inputMode="email" autoComplete="email" placeholder="you@example.com" {...form.register("email")} />{form.formState.errors.email ? <p className="text-sm text-destructive">{form.formState.errors.email.message}</p> : null}</div><div className="space-y-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label>{mode === "signin" ? <button type="button" onClick={resetPassword} className="text-xs font-semibold text-brand-indigo hover:underline">Password ভুলে গেছেন?</button> : null}</div><div className="relative"><Input id="password" type={visible ? "text" : "password"} autoComplete={mode === "signin" ? "current-password" : "new-password"} className="pr-11" {...form.register("password")} /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted-foreground" aria-label={visible ? "Password লুকান" : "Password দেখুন"}>{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{form.formState.errors.password ? <p className="text-sm text-destructive">{form.formState.errors.password.message}</p> : null}</div><Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : null}{mode === "signin" ? "Dashboard-এ প্রবেশ করুন" : "Account তৈরি করুন"}</Button></form></TabsContent></Tabs>;
}
