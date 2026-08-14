import { CourseLanding } from "@/components/marketing/course-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Working Framework",
  description:
    "Income Tax Act, 2023 থেকে return preparation পর্যন্ত structured practical course.",
};

export default function LegacyCourseLandingRoute() {
  return <CourseLanding />;
}
