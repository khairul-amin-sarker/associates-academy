"use client";

import React from "react";
import { WorkshopHero } from "./workshop-hero";
import { WorkshopBenefits } from "./workshop-benefits";
import { WorkshopLearningFlow } from "./workshop-learning-flow";
import { WorkshopAudience } from "./workshop-audience";
import { WorkshopInstructor } from "./workshop-instructor";
import { WorkshopEventPanel } from "./workshop-event-panel";
import { WorkshopRegistrationForm } from "./workshop-registration-form";
import { WorkshopFaq } from "./workshop-faq";
import { WorkshopFinalCta } from "./workshop-final-cta";
import { WorkshopStickyCta } from "./workshop-sticky-cta";

interface WorkshopLandingProps {
  initialWorkshop?: {
    status?: "draft" | "registration_open" | "registration_closed" | "live" | "completed" | "cancelled";
    registrationEnabled?: boolean;
    startsAt?: string | null;
  };
}

export function WorkshopLanding({ initialWorkshop }: WorkshopLandingProps = {}) {
  return (
    <div className="relative min-h-screen bg-[#f8f3eb] text-brand-navy">
      {/* 1. Hero Section */}
      <WorkshopHero />

      {/* 2. Workshop Value & Benefits */}
      <WorkshopBenefits />

      {/* 3. 9-Step Practical Learning Flow */}
      <WorkshopLearningFlow />

      {/* 4. Target Audience Groups */}
      <WorkshopAudience />

      {/* 5. Instructor Section */}
      <WorkshopInstructor />

      {/* 6. Mid-Page Event Reminder Panel */}
      <WorkshopEventPanel />

      {/* 7. Free Registration Form */}
      <WorkshopRegistrationForm initialWorkshop={initialWorkshop} />

      {/* 8. Frequently Asked Questions (FAQ) */}
      <WorkshopFaq />

      {/* 9. Final High-Conversion CTA */}
      <WorkshopFinalCta />

      {/* Mobile Sticky CTA Bar */}
      <WorkshopStickyCta />
    </div>
  );
}
