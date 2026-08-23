import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LiveClassActions } from "@/components/dashboard/live-class-actions";
import { NextLiveClassPanel } from "@/components/dashboard/next-live-class-panel";
import type { CourseWorkspace as CourseWorkspaceData } from "@/lib/learning/workspace";

export function CourseWorkspace({
  workspace,
}: {
  workspace: CourseWorkspaceData;
}) {
  return (
    <div className="space-y-6">
      <section className="dotted-grid border-brand-navy/20 bg-brand-navy overflow-hidden rounded-[2rem] border p-7 text-white shadow-[0_22px_44px_-30px_rgb(17_24_68_/_80%)] sm:p-10">
        <Badge className="border-brand-gold/70 text-brand-gold bg-transparent">
          {workspace.demo
            ? "LOCAL DEMO WORKSPACE"
            : workspace.enrolled
              ? "ACTIVE ENROLLMENT"
              : "COURSE PREVIEW"}
        </Badge>
        <h1 className="font-heading mt-4 max-w-4xl text-3xl font-extrabold sm:text-5xl">
          {workspace.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-white/75">
          Progress, module, recording, resource ও live class—সবকিছু এক জায়গায়।
        </p>
        {workspace.demo ? (
          <p className="text-brand-gold mt-4 text-xs">
            এটি local preview—কোনো live link বা progress পরিবর্তন হবে না।
          </p>
        ) : null}
      </section>
      <NextLiveClassPanel
        session={workspace.nextSession}
        module={
          workspace.modules.find(
            (module) => module.id === workspace.nextSession?.moduleId,
          ) ?? null
        }
        entitled={workspace.enrolled}
      />
      <div className="grid gap-4 xl:grid-cols-[1.28fr_0.72fr]">
        <Card className="overflow-hidden py-0">
          <CardHeader className="border-b bg-white/70 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge
                  className={
                    workspace.enrolled
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }
                >
                  {workspace.enrolled ? "Full access" : "Preview access"}
                </Badge>
                <CardTitle className="font-heading mt-4 text-2xl font-extrabold">
                  Course progress
                </CardTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  {workspace.completedCount.toLocaleString("bn-BD")} /{" "}
                  {workspace.moduleCount.toLocaleString("bn-BD")}টি module Admin
                  complete করেছেন
                </p>
              </div>
              <BookOpen className="text-brand-gold" />
            </div>
            <div className="bg-brand-navy/10 mt-5 h-2 overflow-hidden rounded-full">
              <div
                className="bg-brand-navy h-full rounded-full transition-[width]"
                style={{ width: `${workspace.progress}%` }}
              />
            </div>
            <p className="text-brand-navy mt-2 text-right text-sm font-bold">
              {workspace.progress.toLocaleString("bn-BD")}%
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion
              type="single"
              collapsible
              defaultValue={
                workspace.modules[0]
                  ? `module-${workspace.modules[0].id}`
                  : undefined
              }
              className="divide-brand-navy/10 divide-y"
            >
              {workspace.modules.map((module) => (
                <AccordionItem
                  key={module.id}
                  value={`module-${module.id}`}
                  className="border-none"
                >
                  <AccordionTrigger className="group hover:bg-brand-cream/25 p-5 text-left hover:no-underline sm:px-6">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="bg-brand-navy text-brand-gold grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-mono text-sm font-bold shadow-[0_5px_10px_-7px_rgb(17_24_68_/_80%)]">
                        {module.position.toLocaleString("bn-BD", {
                          minimumIntegerDigits: 2,
                        })}
                      </span>
                      <span className="min-w-0">
                        <span className="font-heading text-foreground block text-lg font-extrabold">
                          {module.title}
                        </span>
                        <span className="text-muted-foreground mt-1 block text-sm font-normal">
                          {module.description ??
                            "Module detail Admin publish করলে দেখা যাবে"}
                        </span>
                      </span>
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        module.completed
                          ? "border-green-200 bg-green-50 text-green-800"
                          : "border-brand-navy/10 text-muted-foreground"
                      }
                    >
                      {module.completed ? "Completed" : "In progress"}
                    </Badge>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="border-brand-navy/10 bg-brand-cream/35 rounded-2xl border p-4 sm:p-5">
                      <p className="text-foreground mb-4 text-sm leading-6">
                        {module.description ??
                          "এই module-এর বিস্তারিত Admin publish করলে দেখা যাবে।"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {workspace.enrolled && module.recordingUrl ? (
                          <Button variant="outline" asChild>
                            <a
                              href={module.recordingUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <PlayCircle />
                              Recording
                              <ExternalLink />
                            </a>
                          </Button>
                        ) : null}
                        {workspace.enrolled ? (
                          module.resources.length ? (
                            module.resources.map((resource) => (
                              <Button
                                key={resource.id}
                                variant="outline"
                                asChild
                              >
                                <a
                                  href={`/api/dashboard/resources/${resource.id}`}
                                >
                                  {/(note|নোট)/i.test(resource.title) ? (
                                    <FileText />
                                  ) : (
                                    <Download />
                                  )}
                                  {resource.title}
                                </a>
                              </Button>
                            ))
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              এই module-এর অতিরিক্ত file এখনও publish হয়নি।
                            </p>
                          )
                        ) : (
                          <Button asChild>
                            <Link href={`/checkout/${workspace.slug}`}>
                              <LockKeyhole />
                              Enrollment activate করুন
                            </Link>
                          </Button>
                        )}
                      </div>
                      {module.session ? (
                        <div className="border-brand-navy/10 mt-5 border-t pt-5">
                          <p className="text-brand-indigo mb-3 text-xs font-bold tracking-[0.14em] uppercase">
                            Module live class
                          </p>
                          <LiveClassActions
                            session={module.session}
                            entitled={workspace.enrolled}
                          />
                        </div>
                      ) : null}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {workspace.modules.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-heading text-xl font-bold">
                  এখনও কোনো module প্রকাশ হয়নি
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Admin publish করলে course content এখানে আসবে।
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
        <aside className="space-y-4">
          <Card className="py-0 shadow-[0_16px_30px_-25px_rgb(17_24_68_/_50%)]">
            <CardContent className="p-6">
              <span className="bg-brand-cream text-brand-gold grid h-12 w-12 place-items-center rounded-full">
                <ShieldCheck />
              </span>
              <p className="font-heading mt-4 text-xl font-extrabold">
                Secure learning access
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Resource download এবং class link কেবল active enrollment-এর জন্য
                server-side যাচাই করা হয়।
              </p>
            </CardContent>
          </Card>
          <Card className="py-0 shadow-[0_16px_30px_-25px_rgb(17_24_68_/_50%)]">
            <CardContent className="p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-green-50 text-green-700">
                <UsersRound />
              </span>
              <p className="font-heading mt-4 text-xl font-extrabold">
                {workspace.enrolled ? "Active enrollment" : "Preview access"}
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {workspace.enrolled
                  ? "আপনার enrollment active আছে। Course content আপনার জন্য উপলব্ধ।"
                  : "Full class, resource ও certificate পেতে enrollment activate করুন।"}
              </p>
            </CardContent>
          </Card>
          <Card className="py-0 shadow-[0_16px_30px_-25px_rgb(17_24_68_/_50%)]">
            <CardContent className="p-6">
              <p className="text-brand-indigo text-xs font-bold tracking-[0.14em] uppercase">
                Quick summary
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex justify-between gap-3">
                  <span className="text-muted-foreground">মোট module</span>
                  <strong>
                    {workspace.moduleCount.toLocaleString("bn-BD")}
                  </strong>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-muted-foreground">সম্পন্ন</span>
                  <strong>
                    {workspace.completedCount.toLocaleString("bn-BD")}
                  </strong>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Progress</span>
                  <strong>{workspace.progress.toLocaleString("bn-BD")}%</strong>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="py-0 shadow-[0_16px_30px_-25px_rgb(17_24_68_/_50%)]">
            <CardContent className="p-6">
              <span className="text-brand-indigo grid h-12 w-12 place-items-center rounded-full bg-blue-50">
                <Headphones />
              </span>
              <p className="font-heading mt-4 text-xl font-extrabold">
                Need help?
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Class বা resource নিয়ে সাহায্য লাগলে support team-এর সঙ্গে
                যোগাযোগ করুন।
              </p>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/contact">
                  Contact support <ChevronRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <section className="border-brand-navy/10 rounded-[2rem] border bg-white p-6 shadow-[0_18px_38px_-30px_rgb(17_24_68_/_48%)] sm:p-8">
        <p className="text-brand-indigo text-sm font-bold tracking-[0.15em] uppercase">
          Course materials & certificate
        </p>
        <h2 className="font-heading mt-2 text-2xl font-extrabold">
          এই course-এর আলাদা resources
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          এই section-এর file ও certificate কেবল এই course-এর enrollment-এর সঙ্গে
          যুক্ত।
        </p>
        {workspace.enrolled && workspace.courseResources.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workspace.courseResources.map((resource) => (
              <a
                key={resource.id}
                href={`/api/dashboard/course-resources/${resource.id}`}
                className="group border-brand-navy/10 bg-card hover:border-brand-gold/60 flex min-h-24 items-center gap-4 rounded-2xl border p-4 transition-colors"
              >
                <span className="bg-brand-cream text-brand-gold grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                  <FileText />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-heading block font-bold">
                    {resource.title}
                  </span>
                  <span className="text-muted-foreground mt-1 block text-xs">
                    Secure download
                  </span>
                </span>
                <ChevronRight className="text-brand-navy h-4 w-4" />
              </a>
            ))}
          </div>
        ) : !workspace.enrolled ? (
          <Button className="mt-5" asChild>
            <Link href={`/checkout/${workspace.slug}`}>
              <LockKeyhole />
              Enrollment activate করুন
            </Link>
          </Button>
        ) : (
          <p className="text-muted-foreground mt-5 text-sm">
            Admin এখনও কোনো আলাদা course material publish করেননি।
          </p>
        )}
        <div className="border-brand-navy/10 bg-brand-cream/45 mt-7 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-brand-gold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-heading text-lg font-bold">
                Course certificate
              </p>
            </span>
            <p className="text-muted-foreground mt-2 text-sm">
              Certificate issue হলে এই course-এর জন্য এখানেই download পাওয়া
              যাবে।
            </p>
          </div>
          {workspace.certificate?.available ? (
            <Button asChild>
              <a
                href={`/api/dashboard/certificates/${workspace.certificate.id}`}
              >
                <Download />
                Download certificate
              </a>
            </Button>
          ) : (
            <Badge variant="outline">Not issued yet</Badge>
          )}
        </div>
      </section>
    </div>
  );
}
