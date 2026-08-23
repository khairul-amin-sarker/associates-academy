import { describe, expect, it } from "vitest";
import {
  isValidBdMobileNumber,
  normalizeBdMobileNumber,
  workshopRegistrationSchema,
} from "./workshop";

describe("workshopRegistrationSchema & helpers", () => {
  describe("normalizeBdMobileNumber", () => {
    it("strips whitespace and hyphens", () => {
      expect(normalizeBdMobileNumber(" 01712-123456 ")).toBe("01712123456");
      expect(normalizeBdMobileNumber("01819 987 654")).toBe("01819987654");
    });

    it("handles country codes +880 and 880", () => {
      expect(normalizeBdMobileNumber("+8801712123456")).toBe("01712123456");
      expect(normalizeBdMobileNumber("8801712123456")).toBe("01712123456");
    });
  });

  describe("isValidBdMobileNumber", () => {
    it("validates correct 11-digit numbers", () => {
      expect(isValidBdMobileNumber("01712123456")).toBe(true);
      expect(isValidBdMobileNumber("01312123456")).toBe(true);
      expect(isValidBdMobileNumber("01912123456")).toBe(true);
      expect(isValidBdMobileNumber("01812123456")).toBe(true);
      expect(isValidBdMobileNumber("01612123456")).toBe(true);
      expect(isValidBdMobileNumber("01512123456")).toBe(true);
      expect(isValidBdMobileNumber("01412123456")).toBe(true);
    });

    it("rejects invalid numbers", () => {
      expect(isValidBdMobileNumber("01212123456")).toBe(false); // 012 is invalid operator
      expect(isValidBdMobileNumber("0171212345")).toBe(false); // 10 digits
      expect(isValidBdMobileNumber("017121234567")).toBe(false); // 12 digits
      expect(isValidBdMobileNumber("abcdefghijk")).toBe(false);
    });
  });

  describe("workshopRegistrationSchema validation", () => {
    it("parses valid registration data with UTM attribution", () => {
      const input = {
        fullName: " তানভীর আহমেদ ",
        mobile: "+88 01712-345678",
        email: " Tanvir.Ahmed@Example.Com ",
        profession: "Accountant",
        workshopIntent: "tax-profession",
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "august_workshop",
        landingPageUrl: "https://associatesacademy.bd/workshop?utm_source=facebook",
        referrer: "https://facebook.com",
      };

      const parsed = workshopRegistrationSchema.parse(input);

      expect(parsed).toEqual({
        fullName: "তানভীর আহমেদ",
        mobile: "01712345678",
        email: "tanvir.ahmed@example.com",
        profession: "Accountant",
        workshopIntent: "tax-profession",
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "august_workshop",
        utmContent: "",
        utmTerm: "",
        utmAudience: "",
        landingPageUrl: "https://associatesacademy.bd/workshop?utm_source=facebook",
        referrer: "https://facebook.com",
        registeredAt: undefined,
        workshopId: "free-return-workshop-2026-08-26",
        website: "",
      });
    });

    it("rejects missing or invalid fields", () => {
      const invalid = workshopRegistrationSchema.safeParse({
        fullName: "A", // too short
        mobile: "12345", // invalid mobile
        email: "not-an-email",
        profession: "",
        workshopIntent: "invalid-intent",
      });

      expect(invalid.success).toBe(false);
      if (!invalid.success) {
        const paths = invalid.error.issues.map((i) => i.path[0]);
        expect(paths).toContain("fullName");
        expect(paths).toContain("mobile");
        expect(paths).toContain("email");
        expect(paths).toContain("profession");
        expect(paths).toContain("workshopIntent");
      }
    });

    it("parses Meta campaign audiences correctly", () => {
      const taxpayerInput = {
        fullName: "মো: রফিকুল ইসলাম",
        mobile: "01819123456",
        email: "rafiq@gmail.com",
        profession: "চাকরিজীবী",
        workshopIntent: "own-return-do",
        utmSource: "meta",
        utmMedium: "cpc",
        utmCampaign: "taxpayer_return_preparation",
        utmAudience: "taxpayer",
      };

      const parsedTaxpayer = workshopRegistrationSchema.parse(taxpayerInput);
      expect(parsedTaxpayer.utmAudience).toBe("taxpayer");
      expect(parsedTaxpayer.workshopIntent).toBe("own-return-do");

      const proInput = {
        fullName: "Advocate Kamrul Hasan",
        mobile: "01711987654",
        email: "kamrul.law@yahoo.com",
        profession: "Tax Lawyer",
        workshopIntent: "tax-profession",
        utmSource: "meta",
        utmMedium: "cpc",
        utmCampaign: "pro_tax_workflow",
        utmAudience: "professional",
      };

      const parsedPro = workshopRegistrationSchema.parse(proInput);
      expect(parsedPro.utmAudience).toBe("professional");
      expect(parsedPro.workshopIntent).toBe("tax-profession");
    });
  });
});

