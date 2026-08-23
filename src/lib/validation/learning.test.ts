import { describe, expect, it } from "vitest";
import { calculateProgress } from "@/lib/learning/progress";
import {
  classSessionSchema,
  googleCalendarUrlSchema,
  googleMeetUrlSchema,
} from "@/lib/validation/learning";

describe("learning validation", () => {
  it("only accepts secure Google Meet and Calendar links", () => {
    expect(
      googleMeetUrlSchema.safeParse("https://meet.google.com/abc-defg-hij")
        .success,
    ).toBe(true);
    expect(
      googleCalendarUrlSchema.safeParse(
        "https://calendar.google.com/calendar/u/0/r/eventedit",
      ).success,
    ).toBe(true);
    expect(
      googleMeetUrlSchema.safeParse("https://example.com/meeting").success,
    ).toBe(false);
    expect(
      googleCalendarUrlSchema.safeParse("http://calendar.google.com/calendar")
        .success,
    ).toBe(false);
  });

  it("rejects a class that ends before it starts", () => {
    expect(
      classSessionSchema.safeParse({
        batchId: 1,
        moduleId: 1,
        startsAt: "2026-08-30T14:00:00.000Z",
        endsAt: "2026-08-30T13:00:00.000Z",
        meetUrl: "",
        calendarUrl: "",
        isPublished: true,
      }).success,
    ).toBe(false);
  });

  it("calculates course progress from Admin-marked modules", () => {
    expect(calculateProgress(2, 6)).toBe(33);
    expect(calculateProgress(0, 0)).toBe(0);
  });
});
