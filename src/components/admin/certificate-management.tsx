"use client";

import { useState } from "react";
import {
  Award,
  Filter,
  Loader2,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { issueCertificate, toggleCertificateStatus } from "@/app/(admin)/admin/certificates/actions";

export type AdminCertificate = {
  id: number;
  verification_code: string;
  student_name: string;
  course_name: string;
  batch_name: string | null;
  instructor_name: string;
  status: string;
  issued_at: string;
  created_at?: string;
};

export function CertificateManagement({
  initialCertificates,
  courseOptions,
}: {
  initialCertificates: AdminCertificate[];
  courseOptions: string[];
}) {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "valid" | "revoked">("all");
  const [showModal, setShowModal] = useState(false);
  const [issuing, setIssuing] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const filtered = certificates.filter((cert) => {
    const matchesSearch =
      cert.student_name.toLowerCase().includes(search.toLowerCase()) ||
      cert.verification_code.toLowerCase().includes(search.toLowerCase()) ||
      cert.course_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  async function handleToggleStatus(cert: AdminCertificate) {
    setTogglingId(cert.id);
    const result = await toggleCertificateStatus(cert.id, cert.status);
    setTogglingId(null);
    if (result.success && result.newStatus) {
      setCertificates((prev) =>
        prev.map((c) => (c.id === cert.id ? { ...c, status: result.newStatus! } : c))
      );
      toast.success(
        `Certificate ${cert.verification_code} ${result.newStatus === "valid" ? "পুনরায় সক্রিয়" : "বাতিল (Revoked)"} করা হয়েছে`
      );
    } else {
      toast.error(result.error || "Status পরিবর্তন করা যায়নি");
    }
  }

  async function handleIssueSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIssuing(true);
    const result = await issueCertificate(formData);
    setIssuing(false);
    if (result.success) {
      toast.success("নতুন Certificate ইস্যু সম্পন্ন হয়েছে");
      setShowModal(false);
      // Construct newly created item optimistically
      const newCert: AdminCertificate = {
        id: Date.now(),
        verification_code: String(formData.get("verification_code")).trim().toUpperCase(),
        student_name: String(formData.get("student_name")).trim(),
        course_name: String(formData.get("course_name")).trim(),
        batch_name: String(formData.get("batch_name")).trim() || "Batch 1",
        instructor_name: String(formData.get("instructor_name")).trim() || "Mohammad Khairul Amin Sarker",
        status: String(formData.get("status")) || "valid",
        issued_at: String(formData.get("issued_at")) || new Date().toISOString().slice(0, 10),
      };
      setCertificates((prev) => [newCert, ...prev]);
    } else {
      toast.error(result.error || "Certificate ইস্যু ব্যর্থ হয়েছে");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="outline" className="border-brand-gold/50 text-brand-navy">
            PUBLIC REGISTRY
          </Badge>
          <h1 className="font-heading text-brand-navy mt-3 text-3xl sm:text-4xl font-extrabold">
            Certificates Management
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
            সকল ইস্যুকৃত সার্টিফিকেট পরিচালনা, নতুন সনদ ইস্যু এবং পাবলিক ভেরিফিকেশন স্ট্যাটাস কন্ট্রোল করুন।
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="clicky bg-brand-navy text-white hover:bg-brand-navy/90 shrink-0"
        >
          <Plus className="mr-1.5 h-4 w-4 text-brand-gold" />
          নতুন Certificate ইস্যু করুন
        </Button>
      </div>

      <Card className="border-brand-navy/10 bg-white py-0 shadow-sm">
        <CardHeader className="border-b border-brand-navy/10 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="শিক্ষার্থীর নাম, কোড বা কোর্স খুঁজুন..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="border-input bg-background h-9 rounded-md border px-3 text-sm"
              >
                <option value="all">সব স্ট্যাটাস ({certificates.length})</option>
                <option value="valid">Valid ({certificates.filter((c) => c.status === "valid").length})</option>
                <option value="revoked">Revoked ({certificates.filter((c) => c.status === "revoked").length})</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-navy text-white">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Verification Code</th>
                    <th className="px-5 py-3.5 font-semibold">Student Name</th>
                    <th className="px-5 py-3.5 font-semibold">Course & Batch</th>
                    <th className="px-5 py-3.5 font-semibold">Issued Date</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-brand-navy/10 divide-y">
                  {filtered.map((cert) => (
                    <tr key={cert.id} className="hover:bg-brand-cream/30 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-brand-navy">
                        {cert.verification_code}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-foreground">
                        {cert.student_name}
                      </td>
                      <td className="px-5 py-3.5 text-xs">
                        <p className="font-medium text-brand-navy">{cert.course_name}</p>
                        <p className="text-muted-foreground">{cert.batch_name || "Batch 1"}</p>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs">
                        {cert.issued_at}
                      </td>
                      <td className="px-5 py-3.5">
                        {cert.status === "valid" ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1 font-medium">
                            <ShieldCheck className="h-3 w-3" /> Valid
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1 font-medium">
                            <ShieldAlert className="h-3 w-3" /> Revoked
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={togglingId === cert.id}
                          onClick={() => handleToggleStatus(cert)}
                          className={
                            cert.status === "valid"
                              ? "text-red-600 hover:bg-red-50 hover:text-red-700 text-xs font-semibold"
                              : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold"
                          }
                        >
                          {togglingId === cert.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : cert.status === "valid" ? (
                            "Revoke করুন"
                          ) : (
                            "Re-activate করুন"
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Award className="mx-auto h-12 w-12 text-brand-navy/30" />
              <p className="font-heading mt-4 text-xl font-bold text-brand-navy">
                কোনো সার্টিফিকেট পাওয়া যায়নি
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                অন্য কোনো নাম বা কোড দিয়ে অনুসন্ধান করুন।
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Certificate Modal */}
      {showModal ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-navy/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-brand-navy/10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-brand-navy/10">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gold/15 text-brand-navy">
                  <Award className="h-5 w-5 text-brand-gold" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-navy">
                    নতুন Certificate ইস্যু করুন
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    পাবলিক ভেরিফিকেশন ডাটাবেসে সার্টিফিকেট যোগ হবে।
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground rounded-lg p-1.5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="verification_code">Verification Code</Label>
                <Input
                  id="verification_code"
                  name="verification_code"
                  placeholder="e.g. B1-2026-FIT022 বা PR-2026-001"
                  required
                  className="uppercase font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="student_name">Student Full Name</Label>
                <Input
                  id="student_name"
                  name="student_name"
                  placeholder="e.g. Mohammad Khairul Amin"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="course_name">Course Name</Label>
                <select
                  id="course_name"
                  name="course_name"
                  required
                  className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
                  defaultValue={courseOptions[0] ?? "Practical Paper Return & E-Return Filing Course"}
                >
                  {courseOptions.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                  <option value="Fundamentals of Income Tax Act, 2023">
                    Fundamentals of Income Tax Act, 2023
                  </option>
                  <option value="Practical Paper Return & E-Return Filing Course">
                    Practical Paper Return & E-Return Filing Course
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="batch_name">Batch Name</Label>
                  <Input
                    id="batch_name"
                    name="batch_name"
                    placeholder="Batch 1"
                    defaultValue="Batch 1"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="issued_at">Issued Date</Label>
                  <Input
                    id="issued_at"
                    name="issued_at"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="instructor_name">Instructor Name</Label>
                <Input
                  id="instructor_name"
                  name="instructor_name"
                  defaultValue="Mohammad Khairul Amin Sarker"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status">Initial Status</Label>
                <select
                  id="status"
                  name="status"
                  className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
                  defaultValue="valid"
                >
                  <option value="valid">Valid (Active)</option>
                  <option value="revoked">Revoked</option>
                </select>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-brand-navy/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  disabled={issuing}
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={issuing}
                  className="bg-brand-navy text-white hover:bg-brand-navy/90"
                >
                  {issuing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  ইস্যু ও সেভ করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
