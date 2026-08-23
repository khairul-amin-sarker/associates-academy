import { requireUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { saveProfile } from "./actions";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  const context = await requireUser();
  let profile: {
    full_name?: string | null;
    phone?: string | null;
    whatsapp_number?: string | null;
    occupation?: string | null;
    city?: string | null;
  } | null = null;
  if (context.supabase) {
    const result = await context.supabase
      .from("profiles")
      .select("full_name, phone, whatsapp_number, occupation, city")
      .eq("id", context.userId)
      .maybeSingle();
    profile = result.data;
  }
  return (
    <div>
      <h1 className="font-heading text-4xl font-extrabold">Profile</h1>
      <Card className="mt-8 max-w-2xl">
        <CardHeader>
          <CardTitle className="font-heading">ব্যক্তিগত তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveProfile} className="grid gap-5">
            {query.saved ? (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                Profile saved successfully.
              </p>
            ) : null}
            {query.error ? (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                Profile could not be saved. Check the information and try again.
              </p>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="name">নাম</Label>
              <Input
                id="name"
                name="full_name"
                required
                minLength={2}
                defaultValue={profile?.full_name ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile</Label>
              <Input
                id="phone"
                name="phone"
                required
                minLength={8}
                inputMode="tel"
                defaultValue={profile?.phone ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">WhatsApp</Label>
              <Input
                id="whatsapp_number"
                name="whatsapp_number"
                required
                minLength={8}
                inputMode="tel"
                defaultValue={profile?.whatsapp_number ?? ""}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  defaultValue={profile?.occupation ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={profile?.city ?? ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={context.email ?? ""} disabled />
            </div>
            <Button type="submit" className="w-fit">
              Save profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
