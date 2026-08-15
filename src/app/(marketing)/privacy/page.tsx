import type { Route } from "next";
import { redirect } from "next/navigation";

export default function PrivacyAliasPage() {
  redirect("/privacy-policy" as Route);
}
