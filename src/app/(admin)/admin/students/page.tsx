import AdminCoursesPage from "../courses/page";

export default async function AdminStudentsPage() {
  // The learning manager includes the student completion controls. Reuse the
  // authoritative course query rather than duplicating enrolment data paths.
  return <AdminCoursesPage studentFocus />;
}
