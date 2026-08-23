import { notFound } from "next/navigation";
import { CourseWorkspace } from "@/components/dashboard/course-workspace";
import { requireUser } from "@/lib/auth";
import { getCourseWorkspace } from "@/lib/learning/workspace";

type Props = { params: Promise<{ slug: string }> };

export default async function CourseWorkspacePage({ params }: Props) {
  const { slug } = await params;
  const context = await requireUser();
  const workspace = await getCourseWorkspace(context, slug);
  if (!workspace) notFound();
  return <CourseWorkspace workspace={workspace} />;
}
