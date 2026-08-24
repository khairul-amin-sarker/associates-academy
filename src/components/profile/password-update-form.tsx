"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function PasswordUpdateForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password দুটি মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message || "Password update করা যায়নি");
      } else {
        toast.success("Password সফলভাবে পরিবর্তন করা হয়েছে");
        setPassword("");
        setConfirmPassword("");
      }
    } catch {
      toast.error("Password update ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mt-8 max-w-2xl border-brand-navy/10 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gold/15 text-brand-navy">
            <KeyRound className="h-4 w-4 text-brand-gold" />
          </span>
          <div>
            <CardTitle className="font-heading text-xl font-bold text-brand-navy">
              Password পরিবর্তন
            </CardTitle>
            <p className="text-muted-foreground text-xs">
              আপনার অ্যাকাউন্টের জন্য নতুন একটি নিরাপদ password সেট করুন।
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="new-password">নতুন Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                minLength={8}
                autoComplete="new-password"
                className="pr-11"
              />
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 grid w-11 place-items-center"
                aria-label={visible ? "Password লুকান" : "Password দেখুন"}
              >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">নতুন Password নিশ্চিত করুন</Label>
            <Input
              id="confirm-password"
              type={visible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="একই password পুনরায় লিখুন"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" className="w-fit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Password আপডেট করুন
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
