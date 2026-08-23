import {
  saveBatch,
  saveClassSession,
  saveLearningModule,
  saveCourseResource,
  saveModuleResource,
  setModuleProgress,
} from "@/app/(admin)/admin/courses/actions";
import { CourseResourceUploader } from "@/components/admin/course-resource-uploader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AdminCourse = {
  id: number;
  productId: number;
  title: string;
  slug: string;
};
export type AdminBatch = {
  id: number;
  courseId: number;
  name: string;
  startsAt: string | null;
  endsAt: string | null;
  published: boolean;
};
export type AdminModule = {
  id: number;
  courseId: number;
  productId: number;
  title: string;
  description: string | null;
  position: number;
  recordingUrl: string | null;
  preview: boolean;
  published: boolean;
};
export type AdminSession = {
  id: number;
  batchId: number;
  moduleId: number;
  startsAt: string;
  endsAt: string;
  meetUrl: string | null;
  calendarUrl: string | null;
  published: boolean;
};
export type AdminResource = {
  id: number;
  moduleId: number;
  title: string;
  path: string;
  mimeType: string | null;
  position: number;
  published: boolean;
};
export type AdminEnrollment = {
  id: number;
  learner: string;
  courseId: number;
  moduleIds: number[];
};

const inputClass = "mt-1";
function checkbox(defaultChecked: boolean, name: string, label: string) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}
function dateTime(value: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

export function LearningManagement({
  courses,
  batches,
  modules,
  sessions,
  resources,
  enrollments,
  demo = false,
  studentFocus = false,
}: {
  courses: AdminCourse[];
  batches: AdminBatch[];
  modules: AdminModule[];
  sessions: AdminSession[];
  resources: AdminResource[];
  enrollments: AdminEnrollment[];
  demo?: boolean;
  studentFocus?: boolean;
}) {
  const course = courses[0];
  const courseBatches = batches.filter(
    (batch) => batch.courseId === course?.id,
  );
  const courseModules = modules.filter(
    (module) => module.courseId === course?.id,
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="outline">LEARNING OPERATIONS</Badge>
          <h1 className="font-heading mt-3 text-4xl font-extrabold">
            {studentFocus ? "Students & Batches" : "Courses & Learning"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {studentFocus
              ? "Learner-wise module completion এবং batch learning progress পরিচালনা করুন।"
              : "Batch, module, class schedule ও private resource এখান থেকে পরিচালনা করুন।"}
          </p>
        </div>
        {demo ? (
          <Badge className="w-fit bg-amber-100 text-amber-900">
            Local preview — changes persist করবে না
          </Badge>
        ) : null}
      </div>
      {!course ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="font-heading text-xl font-bold">
              কোনো course পাওয়া যায়নি
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Published product ও course তৈরি হলে management workspace সক্রিয়
              হবে।
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {!studentFocus ? (
            <>
              <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">নতুন batch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form action={saveBatch} className="grid gap-3">
                      <input name="courseId" type="hidden" value={course.id} />
                      <div>
                        <Label htmlFor="batch-name">Batch name</Label>
                        <Input
                          id="batch-name"
                          name="name"
                          required
                          placeholder="Tax Pro — Batch 01"
                          className={inputClass}
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="batch-start">Start</Label>
                          <Input
                            id="batch-start"
                            name="startsAt"
                            type="datetime-local"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <Label htmlFor="batch-end">End</Label>
                          <Input
                            id="batch-end"
                            name="endsAt"
                            type="datetime-local"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      {checkbox(
                        true,
                        "isPublished",
                        "Student dashboard-এ publish করুন",
                      )}
                      <Button>Batch save করুন</Button>
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">নতুন module</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form action={saveLearningModule} className="grid gap-3">
                      <input name="courseId" type="hidden" value={course.id} />
                      <div>
                        <Label htmlFor="module-title">Module title</Label>
                        <Input
                          id="module-title"
                          name="title"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label htmlFor="module-description">Description</Label>
                        <Input
                          id="module-description"
                          name="description"
                          className={inputClass}
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="module-position">Position</Label>
                          <Input
                            id="module-position"
                            name="position"
                            type="number"
                            min="0"
                            defaultValue={courseModules.length + 1}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <Label htmlFor="recording-url">Recording URL</Label>
                          <Input
                            id="recording-url"
                            name="recordingUrl"
                            type="url"
                            placeholder="https://..."
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {checkbox(false, "isPreview", "Preview module")}
                        {checkbox(true, "isPublished", "Publish করুন")}
                      </div>
                      <Button>Module save করুন</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">
                    Module live class
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    action={saveClassSession}
                    className="grid gap-3 lg:grid-cols-3"
                  >
                    <div>
                      <Label htmlFor="session-batch">Batch</Label>
                      <select
                        id="session-batch"
                        name="batchId"
                        required
                        className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                      >
                        <option value="">Batch নির্বাচন করুন</option>
                        {courseBatches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="session-module">Module</Label>
                      <select
                        id="session-module"
                        name="moduleId"
                        required
                        className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                      >
                        <option value="">Module নির্বাচন করুন</option>
                        {courseModules.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      {checkbox(true, "isPublished", "Publish করুন")}
                    </div>
                    <div>
                      <Label htmlFor="session-start">Start</Label>
                      <Input
                        id="session-start"
                        name="startsAt"
                        type="datetime-local"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label htmlFor="session-end">End</Label>
                      <Input
                        id="session-end"
                        name="endsAt"
                        type="datetime-local"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meet-url">Google Meet URL</Label>
                      <Input
                        id="meet-url"
                        name="meetUrl"
                        type="url"
                        placeholder="https://meet.google.com/..."
                        className={inputClass}
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <Label htmlFor="calendar-url">Google Calendar URL</Label>
                      <Input
                        id="calendar-url"
                        name="calendarUrl"
                        type="url"
                        placeholder="https://calendar.google.com/..."
                        className={inputClass}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Class save করুন</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">
                      Private resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form action={saveCourseResource} className="mb-5 grid gap-3 rounded-2xl border border-brand-gold/40 bg-brand-cream/30 p-4">
                      <p className="font-heading font-bold">Course-level material</p>
                      <input name="courseId" type="hidden" value={course.id} />
                      <Input name="title" required placeholder="Course guide / final resource" />
                      <Input name="objectPath" required placeholder={`${course.productId}/…`} />
                      <div className="grid gap-3 sm:grid-cols-2"><Input name="position" type="number" min="0" defaultValue="0" /><Input name="mimeType" defaultValue="application/pdf" /></div>
                      {checkbox(true, "isPublished", "Publish করুন")}
                      <Button variant="outline">Course material register করুন</Button>
                    </form>
                    <CourseResourceUploader
                      modules={courseModules.map((module) => ({
                        id: module.id,
                        title: module.title,
                        productId: module.productId,
                      }))}
                    />
                    <form
                      action={saveModuleResource}
                      className="mt-5 grid gap-3 border-t pt-5"
                    >
                      <p className="text-sm font-semibold">
                        Existing uploaded file register করুন
                      </p>
                      <div>
                        <Label htmlFor="resource-module-path">Module</Label>
                        <select
                          id="resource-module-path"
                          name="moduleId"
                          required
                          className="mt-1 h-10 w-full rounded-md border bg-white px-3"
                        >
                          {courseModules.map((module) => (
                            <option key={module.id} value={module.id}>
                              {module.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="resource-path">Object path</Label>
                        <Input
                          id="resource-path"
                          name="objectPath"
                          required
                          placeholder={`${course.productId}/…`}
                          className={inputClass}
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="resource-name">Title</Label>
                          <Input
                            id="resource-name"
                            name="title"
                            required
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <Label htmlFor="resource-position">Position</Label>
                          <Input
                            id="resource-position"
                            name="position"
                            type="number"
                            min="0"
                            defaultValue="0"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <input
                        name="mimeType"
                        type="hidden"
                        value="application/pdf"
                      />
                      {checkbox(true, "isPublished", "Publish করুন")}
                      <Button variant="outline">Resource register করুন</Button>
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">
                      Published learning items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {courseBatches.map((batch) => (
                      <details
                        key={`batch-${batch.id}`}
                        className="rounded-xl border p-3"
                      >
                        <summary className="cursor-pointer font-semibold">
                          Batch · {batch.name}
                        </summary>
                        <form action={saveBatch} className="mt-4 grid gap-3">
                          <input name="id" type="hidden" value={batch.id} />
                          <input
                            name="courseId"
                            type="hidden"
                            value={batch.courseId}
                          />
                          <Input name="name" defaultValue={batch.name} />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              name="startsAt"
                              type="datetime-local"
                              defaultValue={dateTime(batch.startsAt)}
                            />
                            <Input
                              name="endsAt"
                              type="datetime-local"
                              defaultValue={dateTime(batch.endsAt)}
                            />
                          </div>
                          {checkbox(
                            batch.published,
                            "isPublished",
                            "Published",
                          )}
                          <Button size="sm">Batch update করুন</Button>
                        </form>
                      </details>
                    ))}
                    {courseModules.map((module) => (
                      <details
                        key={module.id}
                        className="rounded-xl border p-3"
                      >
                        <summary className="font-heading cursor-pointer font-bold">
                          {module.position.toLocaleString("bn-BD", {
                            minimumIntegerDigits: 2,
                          })}{" "}
                          · {module.title}
                        </summary>
                        <form
                          action={saveLearningModule}
                          className="mt-4 grid gap-3"
                        >
                          <input name="id" type="hidden" value={module.id} />
                          <input
                            name="courseId"
                            type="hidden"
                            value={module.courseId}
                          />
                          <Input name="title" defaultValue={module.title} />
                          <Input
                            name="description"
                            defaultValue={module.description ?? ""}
                          />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              name="position"
                              type="number"
                              min="0"
                              defaultValue={module.position}
                            />
                            <Input
                              name="recordingUrl"
                              type="url"
                              defaultValue={module.recordingUrl ?? ""}
                            />
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {checkbox(module.preview, "isPreview", "Preview")}
                            {checkbox(
                              module.published,
                              "isPublished",
                              "Published",
                            )}
                          </div>
                          <Button size="sm">Module update করুন</Button>
                        </form>
                      </details>
                    ))}
                    {sessions.map((session) => (
                      <details
                        key={session.id}
                        className="rounded-xl border p-3"
                      >
                        <summary className="cursor-pointer text-sm font-semibold">
                          Class ·{" "}
                          {new Date(session.startsAt).toLocaleString("bn-BD", {
                            timeZone: "Asia/Dhaka",
                          })}
                        </summary>
                        <form
                          action={saveClassSession}
                          className="mt-4 grid gap-3"
                        >
                          <input name="id" type="hidden" value={session.id} />
                          <select
                            name="batchId"
                            defaultValue={session.batchId}
                            className="h-10 rounded-md border bg-white px-3"
                          >
                            {courseBatches.map((batch) => (
                              <option key={batch.id} value={batch.id}>
                                {batch.name}
                              </option>
                            ))}
                          </select>
                          <select
                            name="moduleId"
                            defaultValue={session.moduleId}
                            className="h-10 rounded-md border bg-white px-3"
                          >
                            {courseModules.map((module) => (
                              <option key={module.id} value={module.id}>
                                {module.title}
                              </option>
                            ))}
                          </select>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              name="startsAt"
                              type="datetime-local"
                              defaultValue={dateTime(session.startsAt)}
                            />
                            <Input
                              name="endsAt"
                              type="datetime-local"
                              defaultValue={dateTime(session.endsAt)}
                            />
                          </div>
                          <Input
                            name="meetUrl"
                            type="url"
                            defaultValue={session.meetUrl ?? ""}
                          />
                          <Input
                            name="calendarUrl"
                            type="url"
                            defaultValue={session.calendarUrl ?? ""}
                          />
                          {checkbox(
                            session.published,
                            "isPublished",
                            "Published",
                          )}
                          <Button size="sm">Class update করুন</Button>
                        </form>
                      </details>
                    ))}
                    {resources.map((resource) => (
                      <p
                        key={resource.id}
                        className="bg-muted/40 rounded-xl p-3 text-sm"
                      >
                        <strong>{resource.title}</strong>
                        <br />
                        <span className="text-muted-foreground break-all">
                          {resource.path}
                        </span>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          ) : null}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Learner completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrollments.length ? (
                enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="rounded-2xl border p-4">
                    <p className="font-heading text-lg font-bold">
                      {enrollment.learner}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {courseModules.map((module) => {
                        const complete = enrollment.moduleIds.includes(
                          module.id,
                        );
                        return (
                          <form action={setModuleProgress} key={module.id}>
                            <input
                              name="enrollmentId"
                              type="hidden"
                              value={enrollment.id}
                            />
                            <input
                              name="moduleId"
                              type="hidden"
                              value={module.id}
                            />
                            <input
                              name="completed"
                              type="hidden"
                              value={String(!complete)}
                            />
                            <Button
                              size="sm"
                              variant={complete ? "default" : "outline"}
                            >
                              {complete
                                ? "Completed"
                                : `Complete করুন · ${module.position.toLocaleString("bn-BD")}`}
                            </Button>
                          </form>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  Active learner পাওয়া যায়নি।
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
