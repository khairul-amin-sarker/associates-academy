import { describe, expect, it } from "vitest";
import { defaultHomeContent } from "@/lib/content/defaults";
import { homeContentSchema } from "./cms";

describe("home CMS schema", () => {
  it("accepts the full standalone homepage snapshot", () => { expect(homeContentSchema.safeParse(defaultHomeContent).success).toBe(true); });
  it("rejects incomplete publish content", () => { expect(homeContentSchema.safeParse({ ...defaultHomeContent, title: "short" }).success).toBe(false); });
});
