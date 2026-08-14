"use client";

import { useState } from "react";
import { Loader2, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Certificate = { verification_code: string; student_name: string; course_name: string; batch_name: string | null; instructor_name: string; grade: string | null; status: string; issued_at: string; expires_at: string | null };

export function CertificateLookup() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function lookup(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(null); setResult(null);
    const response = await fetch(`/api/certificates/${encodeURIComponent(code.trim())}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) setError(data.error === "not_found" ? "এই code-এ কোনো certificate পাওয়া যায়নি" : "যাচাই করা যায়নি"); else setResult(data.certificate);
    setLoading(false);
  }
  return <div><form onSubmit={lookup} className="flex flex-col gap-3 sm:flex-row"><Input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Certificate verification code" className="h-12 flex-1 uppercase" minLength={4} required /><Button type="submit" size="lg" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : <Search />}যাচাই করুন</Button></form>{error ? <p role="alert" className="mt-4 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p> : null}{result ? <Card className="mt-6 border-success/25 bg-white"><CardContent className="p-6"><div className="flex items-start gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-success"><ShieldCheck /></span><div><p className="text-sm font-semibold text-success">Verified certificate</p><h2 className="font-heading mt-1 text-2xl font-bold">{result.student_name}</h2><p className="text-muted-foreground">{result.course_name}</p></div></div><dl className="mt-6 grid gap-4 border-t pt-5 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">Verification code</dt><dd className="font-mono font-semibold">{result.verification_code}</dd></div><div><dt className="text-muted-foreground">Issued</dt><dd className="font-semibold">{result.issued_at}</dd></div><div><dt className="text-muted-foreground">Batch</dt><dd className="font-semibold">{result.batch_name ?? "—"}</dd></div><div><dt className="text-muted-foreground">Instructor</dt><dd className="font-semibold">{result.instructor_name}</dd></div></dl></CardContent></Card> : null}</div>;
}
