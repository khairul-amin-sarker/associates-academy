import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Download,
  MessageCircle,
  PlayCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NextLiveClassPanel } from "@/components/dashboard/next-live-class-panel";
import type { CourseWorkspace } from "@/lib/learning/workspace";

const dashboardShortcuts = [
  [PlayCircle, "Modules", "Module তালিকা ও progress"],
  [Download, "Resources", "Private files"],
  [MessageCircle, "Community", "Batch setting থেকে"],
  [Award, "Certificate", "Completion-এর পর"],
] as const;

export function StudentDashboard({
  workspaces,
}: {
  workspaces: CourseWorkspace[];
}) {
  const primary = workspaces[0];
  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="dotted-grid border-brand-navy/20 bg-brand-navy overflow-hidden rounded-[2rem] border px-6 py-9 text-white shadow-[0_22px_44px_-30px_rgb(17_24_68_/_80%)] sm:px-10 sm:py-12">
        <Badge className="border-brand-gold/70 text-brand-gold bg-transparent">
          LEARNING DASHBOARD
        </Badge>
        <h1 className="font-heading mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          আপনার শেখার journey
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
          Class, module, resource ও certificate—সবকিছু{" "}
          <span className="text-brand-gold">organised</span> এবং{" "}
          <span className="text-brand-gold">secure</span>।
        </p>
      </section>

      {primary ? (
        <>
          <NextLiveClassPanel
            session={primary.nextSession}
            module={
              primary.modules.find(
                (module) => module.id === primary.nextSession?.moduleId,
              ) ?? null
            }
            entitled={primary.enrolled}
          />

          <section className="border-brand-navy/10 rounded-[2rem] border bg-white p-4 shadow-[0_18px_38px_-30px_rgb(17_24_68_/_45%)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-brand-indigo text-sm font-bold tracking-[0.16em] uppercase">
                My enrolled courses
              </p>
              <Link
                href="/courses"
                className="text-brand-navy inline-flex items-center gap-1 text-sm font-bold hover:underline"
              >
                View all courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {workspaces.map((workspace, index) => (
                <article
                  key={workspace.slug}
                  className={
                    index === 0
                      ? "bg-brand-navy rounded-[1.5rem] p-6 text-white shadow-[0_16px_30px_-24px_rgb(17_24_68_/_90%)]"
                      : "border-brand-navy/10 bg-card rounded-[1.5rem] border p-6"
                  }
                >
                  <Badge
                    className={
                      workspace.enrolled
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }
                  >
                    {workspace.demo
                      ? "Local preview"
                      : workspace.enrolled
                        ? "Active"
                        : "Preview"}
                  </Badge>
                  <h2 className="font-heading mt-5 text-2xl leading-tight font-extrabold">
                    {workspace.title}
                  </h2>
                  <p
                    className={
                      index === 0
                        ? "mt-3 flex items-center gap-2 text-sm text-white/75"
                        : "text-muted-foreground mt-3 flex items-center gap-2 text-sm"
                    }
                  >
                    <BookOpen className="text-brand-gold h-5 w-5 shrink-0" />
                    {workspace.moduleCount.toLocaleString("bn-BD")}টি learning
                    module
                  </p>
                  <div className="mt-8 flex items-center justify-between text-sm font-semibold">
                    <span>Course progress</span>
                    <span>{workspace.progress.toLocaleString("bn-BD")}%</span>
                  </div>
                  <Progress
                    value={workspace.progress}
                    className={
                      index === 0
                        ? "[&>div]:bg-brand-gold mt-2 bg-white/20"
                        : "mt-2"
                    }
                  />
                  <Button
                    className={
                      index === 0
                        ? "text-brand-navy mt-6 bg-white hover:bg-white/90"
                        : "mt-6"
                    }
                    asChild
                  >
                    <Link href={`/dashboard/courses/${workspace.slug}`}>
                      Course খুলুন <ArrowRight />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardShortcuts.map(([Icon, title, text]) => (
              <Card
                key={title}
                className="group py-0 shadow-[0_12px_26px_-24px_rgb(17_24_68_/_55%)]"
              >
                <CardContent className="flex min-h-28 items-center gap-4 p-5">
                  <Icon
                    className="text-brand-gold h-9 w-9 shrink-0"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="font-heading text-lg font-bold">{title}</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {title === "Resources" && !primary.enrolled
                        ? "Enrollment needed"
                        : text}
                    </p>
                  </div>
                  <ArrowRight className="text-brand-navy ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            ))}
          </section>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="font-heading text-2xl font-bold">
              এখনও active course নেই
            </p>
            <p className="text-muted-foreground mt-2">
              আপনার enrollment active হলে learning workspace এখানে দেখা যাবে।
            </p>
            <Button className="mt-5" asChild>
              <Link href="/courses">
                কোর্স দেখুন <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
