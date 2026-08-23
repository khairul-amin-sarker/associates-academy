import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileCheck2,
  Files,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { defaultCourse } from "@/lib/content/defaults";
import {
  practicalReturnCourse,
  practicalReturnCoursePath,
} from "@/lib/content/practical-return-course";

export const metadata: Metadata = {
  title: "কোর্সসমূহ",
  description: "Associates Academy-এর professional learning programs.",
};

export default function CoursesPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="section-shell">
        <Badge variant="outline">ACADEMY PROGRAMS</Badge>
        <h1 className="font-heading mt-4 text-4xl font-extrabold sm:text-6xl">
          Professional learning, structured for practice
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
          প্রতিটি program আইন, calculation, compliance এবং professional
          outcome-কে একটি clear learning journey-তে সাজায়।
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Card className="border-brand-navy/10 overflow-hidden py-0">
            <div className="paper-grid bg-brand-navy p-7 text-white">
              <div className="flex items-center justify-between">
                <Badge className="bg-brand-gold text-brand-navy">
                  Enrollment open
                </Badge>
                <BookOpen className="text-brand-gold" aria-hidden="true" />
              </div>
              <h2 className="font-heading mt-6 text-3xl font-bold">
                {defaultCourse.title}
              </h2>
              <p className="mt-2 text-white/65">{defaultCourse.subtitle}</p>
            </div>
            <CardContent className="p-7">
              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Live cohort
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  Recorded access
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between gap-5">
                <div>
                  <p className="text-muted-foreground text-xs">Program fee</p>
                  <p className="font-heading text-3xl font-bold">
                    ৳ {defaultCourse.price.toLocaleString("bn-BD")}
                  </p>
                </div>
                <Button asChild>
                  <Link href="/courses/income-tax-working-framework">
                    বিস্তারিত
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-navy/10 overflow-hidden py-0">
            <div className="gradient-navy course-bg-dots-navy p-7 text-white">
              <div className="flex items-center justify-between gap-4">
                <Badge className="bg-white/10 text-white hover:bg-white/10">
                  Practical filing program
                </Badge>
                <FileCheck2 className="text-brand-gold" aria-hidden="true" />
              </div>
              <h2 className="font-heading mt-6 text-3xl leading-tight font-bold">
                {practicalReturnCourse.name}
              </h2>
              <p className="mt-2 text-white/65">
                Documents থেকে Final Submission পর্যন্ত complete practical
                return filing workflow।
              </p>
            </div>
            <CardContent className="p-7">
              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <Files className="h-4 w-4" aria-hidden="true" />
                  Paper + E-Return
                </span>
                <span className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                  ৫টি practical module
                </span>
              </div>
              <div className="mt-6 flex items-center justify-between gap-5">
                <p className="text-brand-indigo text-sm font-semibold">
                  AY {practicalReturnCourse.assessmentYear}
                </p>
                <Button asChild>
                  <Link href={practicalReturnCoursePath}>
                    বিস্তারিত
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
