"use client";

import React, { useState, useMemo, useTransition } from "react";
import {
  Search,
  Download,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  WorkshopParticipantDrawer,
  type ParticipantRecord,
} from "./workshop-participant-drawer";
import {
  updateAttendanceAction,
  bulkUpdateAttendanceAction,
} from "@/app/(admin)/admin/workshop/actions";
import { toast } from "sonner";

const intentLabels: Record<string, string> = {
  "own-return-do": "নিজের Return নিজে",
  "own-return-understand": "Return পরিষ্কার ধারণা",
  "tax-profession": "Tax Profession",
  "accounts-finance-profession": "Accounts/Finance",
  "tax-practice-start": "Tax Practice শুরু",
  "other": "অন্যান্য",
};

export function WorkshopParticipantTable({
  initialParticipants,
}: {
  initialParticipants: ParticipantRecord[];
  workshopTitle?: string;
}) {
  const [participants, setParticipants] = useState<ParticipantRecord[]>(initialParticipants);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeParticipant, setActiveParticipant] = useState<ParticipantRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [intentFilter, setIntentFilter] = useState("all");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [leadFilter, setLeadFilter] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Filter logic
  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.full_name?.toLowerCase().includes(q);
        const matchMobile = p.mobile?.toLowerCase().includes(q) || p.normalized_mobile?.includes(q);
        const matchEmail = p.email?.toLowerCase().includes(q);
        const matchCode = p.registration_code?.toLowerCase().includes(q);
        const matchProfession = p.profession?.toLowerCase().includes(q);
        if (!matchName && !matchMobile && !matchEmail && !matchCode && !matchProfession) {
          return false;
        }
      }

      // Audience Filter
      if (audienceFilter !== "all") {
        if (audienceFilter === "taxpayer") {
          const isTaxpayer =
            p.utm_audience === "taxpayer" ||
            p.intent === "own-return-do" ||
            p.intent === "own-return-understand";
          if (!isTaxpayer) return false;
        } else if (audienceFilter === "professional") {
          const isProfessional =
            p.utm_audience === "professional" ||
            p.intent === "tax-profession" ||
            p.intent === "accounts-finance-profession" ||
            p.intent === "tax-practice-start";
          if (!isProfessional) return false;
        } else if (audienceFilter === "direct") {
          if (p.utm_audience || p.utm_source) return false;
        }
      }

      // Intent Filter
      if (intentFilter !== "all" && p.intent !== intentFilter) {
        return false;
      }

      // Attendance Filter
      if (attendanceFilter !== "all" && p.attendance_status !== attendanceFilter) {
        return false;
      }

      // Course Conversion Filter
      if (courseFilter !== "all" && p.course_conversion_status !== courseFilter) {
        return false;
      }

      // Lead Status Filter
      if (leadFilter !== "all" && p.lead_status !== leadFilter) {
        return false;
      }

      return true;
    });
  }, [
    participants,
    searchQuery,
    audienceFilter,
    intentFilter,
    attendanceFilter,
    courseFilter,
    leadFilter,
  ]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(filteredParticipants.length / pageSize));
  const paginatedParticipants = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredParticipants.slice(start, start + pageSize);
  }, [filteredParticipants, currentPage, pageSize]);

  // Bulk selection helpers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredParticipants.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Inline single attendance toggle
  const handleQuickAttendance = (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === "attended" ? "absent" : "attended";
    startTransition(async () => {
      const res = await updateAttendanceAction(id, nextStatus);
      if (res.success) {
        toast.success(res.message);
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  attendance_status: nextStatus,
                  attended_at: nextStatus === "attended" ? new Date().toISOString() : null,
                }
              : p,
          ),
        );
      } else {
        toast.error(res.message);
      }
    });
  };

  // Bulk attendance mark
  const handleBulkAttendance = (status: "attended" | "absent") => {
    if (!selectedIds.length) {
      toast.error("অনুগ্রহ করে কমপক্ষে একজন participant নির্বাচন করুন।");
      return;
    }
    startTransition(async () => {
      const res = await bulkUpdateAttendanceAction(selectedIds, status);
      if (res.success) {
        toast.success(res.message);
        setParticipants((prev) =>
          prev.map((p) =>
            selectedIds.includes(p.id)
              ? {
                  ...p,
                  attendance_status: status,
                  attended_at: status === "attended" ? new Date().toISOString() : null,
                }
              : p,
          ),
        );
        setSelectedIds([]);
      } else {
        toast.error(res.message);
      }
    });
  };

  // UTF-8 CSV Export
  const handleExportCsv = (recordsToExport = filteredParticipants) => {
    if (!recordsToExport.length) {
      toast.error("Export করার মতো কোনো ডেটা নেই।");
      return;
    }

    const headers = [
      "Registration ID",
      "Full Name",
      "Mobile",
      "Email",
      "Profession",
      "Intent",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "UTM Content",
      "UTM Audience",
      "Registration Status",
      "Attendance Status",
      "Lead Status",
      "Course Status",
      "Registered At",
    ];

    const rows = recordsToExport.map((p) => [
      `"${p.registration_code || ""}"`,
      `"${(p.full_name || "").replace(/"/g, '""')}"`,
      `"${p.mobile || ""}"`,
      `"${p.email || ""}"`,
      `"${(p.profession || "").replace(/"/g, '""')}"`,
      `"${intentLabels[p.intent] || p.intent || ""}"`,
      `"${p.utm_source || ""}"`,
      `"${p.utm_medium || ""}"`,
      `"${p.utm_campaign || ""}"`,
      `"${p.utm_content || ""}"`,
      `"${p.utm_audience || ""}"`,
      `"${p.registration_status || ""}"`,
      `"${p.attendance_status || ""}"`,
      `"${p.lead_status || ""}"`,
      `"${p.course_conversion_status || ""}"`,
      `"${p.registered_at || ""}"`,
    ]);

    // UTF-8 BOM (\uFEFF) ensures proper rendering of Bengali text in MS Excel
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const dateStr = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `workshop-participants-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`${recordsToExport.length}টি রেকর্ড সফলভাবে CSV ফাইলে ডাউনলোড হয়েছে।`);
  };

  const handleOpenDrawer = (participant: ParticipantRecord) => {
    setActiveParticipant(participant);
    setDrawerOpen(true);
  };

  const handleParticipantUpdated = (updated: ParticipantRecord) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p)),
    );
  };

  const formatDate = (val?: string | null) => {
    if (!val) return "—";
    try {
      return new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
      }).format(new Date(val));
    } catch {
      return val;
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Filter & Search Controls Bar */}
      <div className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy/40 pointer-events-none" />
            <Input
              type="text"
              placeholder="নাম, মোবাইল বা ইমেইল দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-10 text-xs border-brand-navy/20 focus-visible:ring-brand-indigo"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {selectedIds.length > 0 ? (
              <div className="flex items-center gap-1.5 bg-brand-cream/80 border border-brand-navy/15 px-3 py-1 rounded-xl text-xs font-semibold text-brand-navy">
                <span>{selectedIds.length} জন নির্বাচিত</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleBulkAttendance("attended")}
                  disabled={isPending}
                  className="h-7 text-xs text-emerald-800 hover:bg-emerald-100 font-bold px-2"
                >
                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                  Attended
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleBulkAttendance("absent")}
                  disabled={isPending}
                  className="h-7 text-xs text-red-800 hover:bg-red-100 font-bold px-2"
                >
                  <UserX className="h-3.5 w-3.5 mr-1" />
                  Absent
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    handleExportCsv(participants.filter((p) => selectedIds.includes(p.id)))
                  }
                  className="h-7 text-xs text-brand-navy hover:bg-brand-navy/10 font-bold px-2"
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Export Selected
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExportCsv(filteredParticipants)}
                className="h-10 text-xs font-bold border-brand-navy/20 hover:bg-brand-cream/50 text-brand-navy"
              >
                <Download className="h-4 w-4 mr-1.5 text-brand-indigo" />
                CSV Export ({filteredParticipants.length})
              </Button>
            )}
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-brand-navy/10 text-xs">
          {/* Audience */}
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-navy/60 block mb-1">
              Audience
            </label>
            <select
              value={audienceFilter}
              onChange={(e) => {
                setAudienceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-8.5 rounded-md border border-brand-navy/20 bg-white px-2.5 text-xs text-brand-navy"
            >
              <option value="all">All Audiences</option>
              <option value="taxpayer">General Taxpayer ($6)</option>
              <option value="professional">Tax Professional ($4)</option>
              <option value="direct">Direct / Organic</option>
            </select>
          </div>

          {/* Attendance */}
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-navy/60 block mb-1">
              Attendance
            </label>
            <select
              value={attendanceFilter}
              onChange={(e) => {
                setAttendanceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-8.5 rounded-md border border-brand-navy/20 bg-white px-2.5 text-xs text-brand-navy"
            >
              <option value="all">All Attendance</option>
              <option value="attended">Attended (উপস্থিত)</option>
              <option value="absent">Absent (অনুপস্থিত)</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          {/* Course Conversion */}
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-navy/60 block mb-1">
              Course Status
            </label>
            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-8.5 rounded-md border border-brand-navy/20 bg-white px-2.5 text-xs text-brand-navy"
            >
              <option value="all">All Course Status</option>
              <option value="enrolled">Enrolled in Full Course</option>
              <option value="interested">Interested Lead</option>
              <option value="not_enrolled">Not Enrolled</option>
            </select>
          </div>

          {/* Lead Status */}
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-navy/60 block mb-1">
              Lead Status
            </label>
            <select
              value={leadFilter}
              onChange={(e) => {
                setLeadFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-8.5 rounded-md border border-brand-navy/20 bg-white px-2.5 text-xs text-brand-navy"
            >
              <option value="all">All Lead Statuses</option>
              <option value="new">New Lead</option>
              <option value="interested">Warm Lead</option>
              <option value="follow_up">Needs Follow-up</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          {/* Intent */}
          <div>
            <label className="text-[10px] font-bold uppercase text-brand-navy/60 block mb-1">
              Workshop Intent
            </label>
            <select
              value={intentFilter}
              onChange={(e) => {
                setIntentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-8.5 rounded-md border border-brand-navy/20 bg-white px-2.5 text-xs text-brand-navy"
            >
              <option value="all">All Intent Options</option>
              <option value="own-return-do">নিজের Return নিজে করতে চাই</option>
              <option value="own-return-understand">পরিষ্কার ধারণা নিতে চাই</option>
              <option value="tax-profession">Income Tax Profession</option>
              <option value="accounts-finance-profession">Accounts / Finance</option>
              <option value="tax-practice-start">Tax Practice শুরু</option>
              <option value="other">অন্যান্য</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main Data Table */}
      <div className="rounded-2xl border border-brand-navy/10 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f5efe6] text-brand-navy border-b border-brand-navy/10 font-bold">
              <tr>
                <th className="px-3.5 py-3 w-10 text-center">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={
                      filteredParticipants.length > 0 &&
                      selectedIds.length === filteredParticipants.length
                    }
                    onChange={handleSelectAll}
                    className="h-3.5 w-3.5 rounded border-brand-navy/30 accent-brand-navy cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3">Participant</th>
                <th className="px-3.5 py-3">Contact</th>
                <th className="px-3.5 py-3">Profession / Intent</th>
                <th className="px-3.5 py-3">Audience / Source</th>
                <th className="px-3.5 py-3">Attendance</th>
                <th className="px-3.5 py-3">Lead / Course</th>
                <th className="px-3.5 py-3 text-right">Registered</th>
                <th className="px-3.5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-navy/5">
              {paginatedParticipants.length > 0 ? (
                paginatedParticipants.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-brand-cream/40 transition-colors ${
                        isSelected ? "bg-brand-gold/10" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-3.5 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          aria-label={`Select ${p.full_name}`}
                          checked={isSelected}
                          onChange={() => handleSelectOne(p.id)}
                          className="h-3.5 w-3.5 rounded border-brand-navy/30 accent-brand-navy cursor-pointer"
                        />
                      </td>

                      {/* Participant Name & Reg Code */}
                      <td
                        className="px-4 py-3 cursor-pointer"
                        onClick={() => handleOpenDrawer(p)}
                      >
                        <div className="font-semibold text-brand-navy hover:text-brand-indigo transition-colors flex items-center gap-1.5">
                          <span>{p.full_name}</span>
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] font-bold text-emerald-950 bg-emerald-500/15 border border-emerald-600/20 px-1.5 py-0.2 rounded w-fit">
                          {p.registration_code}
                        </div>
                      </td>

                      {/* Mobile & Email */}
                      <td className="px-3.5 py-3">
                        <p className="font-mono text-xs font-semibold text-brand-navy">
                          {p.mobile}
                        </p>
                        <p className="text-[11px] text-brand-navy/60 truncate max-w-[150px]">
                          {p.email}
                        </p>
                      </td>

                      {/* Profession & Intent */}
                      <td className="px-3.5 py-3 max-w-[180px]">
                        <p className="font-medium text-brand-navy truncate">
                          {p.profession}
                        </p>
                        <p className="text-[10px] text-brand-navy/55 truncate">
                          {intentLabels[p.intent] || p.intent}
                        </p>
                      </td>

                      {/* Audience / UTM */}
                      <td className="px-3.5 py-3">
                        {p.utm_audience === "taxpayer" ? (
                          <span className="inline-flex rounded-sm bg-emerald-600/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-900">
                            Taxpayer ($6)
                          </span>
                        ) : p.utm_audience === "professional" ? (
                          <span className="inline-flex rounded-sm bg-indigo-600/15 px-1.5 py-0.5 text-[10px] font-bold text-indigo-900">
                            Professional ($4)
                          </span>
                        ) : (
                          <span className="inline-flex rounded-sm bg-brand-navy/10 px-1.5 py-0.5 text-[10px] font-medium text-brand-navy/70">
                            {p.utm_source || "Organic"}
                          </span>
                        )}
                      </td>

                      {/* Attendance Quick Action */}
                      <td className="px-3.5 py-3">
                        <button
                          type="button"
                          onClick={() => handleQuickAttendance(p.id, p.attendance_status)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                            p.attendance_status === "attended"
                              ? "bg-emerald-600/15 border-emerald-600/30 text-emerald-800 hover:bg-emerald-600/25"
                              : p.attendance_status === "absent"
                                ? "bg-red-600/10 border-red-600/25 text-red-800 hover:bg-red-600/20"
                                : "bg-brand-navy/5 border-brand-navy/15 text-brand-navy/60 hover:bg-brand-navy/10"
                          }`}
                        >
                          {p.attendance_status === "attended" ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                              <span>Attended</span>
                            </>
                          ) : p.attendance_status === "absent" ? (
                            <>
                              <XCircle className="h-3 w-3 text-red-700" />
                              <span>Absent</span>
                            </>
                          ) : (
                            <span>Set Attendance</span>
                          )}
                        </button>
                      </td>

                      {/* Lead / Course Status */}
                      <td className="px-3.5 py-3">
                        <div className="flex flex-col gap-0.5">
                          {p.course_conversion_status === "enrolled" ? (
                            <span className="inline-flex w-fit rounded-sm bg-purple-600 text-white font-bold px-1.5 py-0.2 text-[10px]">
                              Course Enrolled ★
                            </span>
                          ) : p.course_conversion_status === "interested" ? (
                            <span className="inline-flex w-fit rounded-sm bg-amber-500/20 text-amber-900 font-semibold px-1.5 py-0.2 text-[10px]">
                              Lead Interested
                            </span>
                          ) : (
                            <span className="inline-flex w-fit rounded-sm bg-brand-navy/5 text-brand-navy/60 text-[10px]">
                              Lead: {p.lead_status}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Registered timestamp */}
                      <td className="px-3.5 py-3 text-right text-brand-navy/60 text-[11px] whitespace-nowrap">
                        {formatDate(p.registered_at)}
                      </td>

                      {/* Open Action */}
                      <td className="px-3.5 py-3 text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenDrawer(p)}
                          className="h-7 w-7 p-0 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-cream"
                          aria-label={`View details for ${p.full_name}`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-brand-navy/60">
                    {searchQuery ||
                    audienceFilter !== "all" ||
                    intentFilter !== "all" ||
                    attendanceFilter !== "all" ||
                    courseFilter !== "all" ||
                    leadFilter !== "all"
                      ? "আপনার অনুসন্ধানের সাথে কোনো participant পাওয়া যায়নি।"
                      : "এখনও কেউ রেজিস্ট্রেশন করেননি।"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#faf7f2] border-t border-brand-navy/10 text-xs">
          <div className="text-brand-navy/60">
            সর্বমোট <strong>{filteredParticipants.length.toLocaleString("bn-BD")}</strong> জন participant
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-navy/60">
              পৃষ্ঠা {currentPage} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="h-7 w-7 p-0 border-brand-navy/20"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="h-7 w-7 p-0 border-brand-navy/20"
              aria-label="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Detailed Participant Drawer */}
      <WorkshopParticipantDrawer
        participant={activeParticipant}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onParticipantUpdated={handleParticipantUpdated}
      />
    </div>
  );
}
