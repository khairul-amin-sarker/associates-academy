# Associates Academy — Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** Associates Academy  
**Product Type:** Professional Education & Course Platform  
**Primary Market:** Bangladesh  
**Primary Language:** Bengali, with English where appropriate  
**Platform:** Web Application  
**Frontend:** Next.js App Router  
**Hosting:** Vercel  
**Backend:** Supabase  
**Database:** PostgreSQL via Supabase  
**Authentication:** Supabase Auth  
**Storage:** Supabase Storage  

Associates Academy is a professional education platform focused primarily on practical training in:

- Income Tax
- VAT
- RJSC
- Corporate Compliance
- Related professional and legal education

The platform must support the complete journey from discovering a course to enrollment, payment, course access, live class participation, learning resources, and administration.

The core objective is to make Associates Academy a reliable, scalable digital learning platform rather than only a collection of course landing pages.

---

# 2. Product Vision

Associates Academy should become a centralized professional learning platform where a user can:

**Discover → Understand → Purchase → Learn → Access Resources → Track Courses**

without requiring manual intervention from the academy for routine operations.

The platform should maintain a professional, academic and trustworthy identity appropriate for tax practitioners, accountants, finance professionals, business owners and students.

---

# 3. Product Goals

## Primary Goals

1. Sell professional courses directly from the website.
2. Reduce friction between course discovery and enrollment.
3. Automatically create course access after successful purchase.
4. Provide each student with a centralized dashboard.
5. Allow Associates Academy to manage courses, students and enrollments through an admin system.
6. Preserve existing users, enrollment records and other production data during migration from the existing Lovable application.
7. Build the application on a modern architecture that can be maintained efficiently by both developers and AI coding agents.

## Secondary Goals

- Improve landing-page conversion rates.
- Support future ebooks, workshops and other digital products.
- Improve analytics and marketing attribution.
- Reduce repetitive administrative work.
- Support future expansion of course formats and learning resources.

---

# 4. Target Users

## 4.1 Tax Professionals

Income Tax Practitioners and professionals who want practical understanding of Bangladesh tax law, return preparation, assessment, TDS and related areas.

## 4.2 Accountants & Finance Professionals

Professionals responsible for taxation, accounts, payroll, compliance and company finance.

## 4.3 Students & Aspiring Professionals

People preparing to enter tax, accounting, legal or corporate-compliance professions.

## 4.4 Business Owners

Entrepreneurs who want to better understand their tax and regulatory obligations.

## 4.5 Existing Students

Users who have already purchased or enrolled in Associates Academy courses and need ongoing access to their course dashboard and resources.

## 4.6 Administrators

Associates Academy team members responsible for courses, users, enrollment and website operations.

---

# 5. Core User Journey

The primary course-purchase journey should be:

```text
Traffic / Advertisement
        ↓
Course Landing Page
        ↓
Course Details
        ↓
CTA — Enroll / Buy Course
        ↓
Login / Registration
        ↓
Checkout
        ↓
Payment
        ↓
Payment Verification
        ↓
Enrollment Creation
        ↓
Student Dashboard
        ↓
Course Dashboard
        ↓
Live Classes / Materials / Resources
```

The journey should minimize unnecessary steps.

---

# 6. Functional Requirements

## 6.1 Public Website

The public website should contain the primary Associates Academy brand presence.

Possible core sections include:

- Home
- Courses
- Individual Course Landing Pages
- Workshops
- About Associates Academy
- Instructor / Faculty Information
- Contact
- Login
- Student Dashboard

The architecture should allow additional content pages without major restructuring.

---

# 7. Homepage

The homepage should clearly communicate:

- What Associates Academy does
- Who it is for
- Current or featured courses
- Why students should trust the academy
- Instructor or academy credibility
- Key learning outcomes
- Call-to-action toward courses

The homepage should not overwhelm visitors with excessive information.

Its primary objective is to direct users toward relevant courses or learning opportunities.

---

# 8. Course System

Courses are one of the principal entities of the platform.

Each course should support information such as:

- Course title
- Slug
- Short description
- Full description
- Thumbnail / cover
- Instructor
- Course price
- Discount price, if applicable
- Course status
- Enrollment status
- Course start date
- Course schedule
- Total modules
- Course duration
- Learning outcomes
- Target audience
- Curriculum
- Course resources
- Student access rules

Possible statuses:

```text
Draft
Published
Enrollment Open
Enrollment Closed
Ongoing
Completed
Archived
```

Exact implementation may use fewer statuses depending on requirements.

---

# 9. Course Landing Page

Each course should have a conversion-focused landing page.

Typical sections:

1. Hero
2. Main course promise
3. Problem / pain points
4. What the student will learn
5. Course curriculum
6. Practical outcomes
7. Who the course is for
8. Course format
9. Instructor profile
10. Course schedule
11. Course fee
12. Testimonials, where genuine data exists
13. FAQ
14. Final CTA

Landing pages should support Bengali-first content.

---

# 10. Authentication

Authentication will use **Supabase Auth**.

Required capabilities:

- User registration
- Login
- Logout
- Session persistence
- Password recovery
- Google login if enabled in the existing system
- Secure authenticated routes

Users should not be required to create a second account if they already have an existing valid Associates Academy account.

Migration must prioritize authentication continuity.

---

# 11. User Profile

Each user should have a profile record associated with the authentication account.

Possible profile information:

- Full name
- Email
- Phone number
- Avatar
- User ID
- Registration date
- Role

Optional future fields may include:

- Profession
- Organization
- Address
- Tax-related professional designation

Only information genuinely required by the product should be collected.

---

# 12. Roles

Minimum required roles:

### Student

Can:

- Access own dashboard
- View purchased/enrolled courses
- Access authorized course resources
- Manage personal profile

Cannot:

- Access other users' information
- Modify courses
- Modify enrollment
- Access admin functionality

### Admin

Can manage:

- Courses
- Students
- Enrollment
- Orders/payments
- Content
- Course schedules
- Resources
- Administrative settings

Authorization must always be validated server-side.

Client-side role checking should only control user experience, not actual permission.

---

# 13. Checkout

Checkout should be simple and focused.

Recommended flow:

```text
Course
  ↓
Enroll Now
  ↓
Authentication if required
  ↓
Checkout
  ↓
Payment
```

Checkout should display:

- Course
- Customer information
- Original price
- Discount, if applicable
- Payable amount
- Payment method
- Clear CTA

The UI must clearly communicate that the product is a digital course and not a physical product.

---

# 14. Payment System

The architecture must support Bangladeshi payment gateways.

Payment provider implementation should remain modular.

Recommended lifecycle:

```text
Checkout Started
      ↓
Order Created
      ↓
Payment Initiated
      ↓
Gateway
      ↓
Server-side Verification
      ↓
Payment Successful
      ↓
Order Paid
      ↓
Enrollment Created
```

A browser redirect alone must never mark an order as paid.

Payment success should only be accepted after authoritative server-side verification.

---

# 15. Order System

Each purchase should create an order.

Suggested order information:

- Order ID
- User ID
- Course/Product ID
- Price
- Discount
- Final amount
- Payment provider
- Transaction ID
- Payment status
- Created timestamp
- Paid timestamp

Potential statuses:

```text
pending
paid
failed
cancelled
refunded
```

---

# 16. Enrollment System

Successful course purchases should result in a course enrollment.

Enrollment should associate:

```text
User
  +
Course
  +
Enrollment Status
```

Suggested enrollment information:

- Enrollment ID
- Student ID
- Course ID
- Order ID
- Enrollment date
- Access status
- Completion status

Possible statuses:

```text
active
completed
suspended
cancelled
```

Admin should also be capable of manually enrolling a student when legitimate business requirements require it.

---

# 17. Student Dashboard

The student dashboard should be the primary authenticated workspace.

Suggested dashboard sections:

### Overview

- Welcome message
- Current courses
- Upcoming classes
- Recent resources

### My Courses

Display all courses the student has access to.

Each course card may show:

- Course title
- Cover
- Course status
- Schedule
- Continue / Open Course button

### Profile

Allow students to view or update relevant profile information.

Future features may include certificates and learning progress.

---

# 18. Course Dashboard

Each enrolled course should have its own dashboard.

Possible information:

- Course title
- Course status
- Upcoming class
- Countdown
- Class schedule
- Live class link
- Modules
- Course materials
- Announcements
- Community link
- Instructor information

Access must depend on valid enrollment.

A user manually entering a course dashboard URL must not receive access unless authorized.

---

# 19. Live Class System

Associates Academy currently conducts live learning programs.

The course dashboard should therefore support:

- Live class date
- Start time
- Join link
- Google Meet or equivalent platform
- Upcoming class state
- Class started state
- Class completed state

The system may optionally support:

- Google Calendar integration
- Add-to-calendar button
- Countdown timer

---

# 20. Course Resources

A course may contain downloadable or linked resources.

Examples:

- PDF
- Ebook
- Slides
- Worksheets
- Templates
- Legal/reference documents
- External learning links

Files requiring student-only access should not be exposed through permanently public URLs.

---

# 21. Community Integration

Courses may use external communities such as WhatsApp.

The course dashboard should support an authorized community link when applicable.

Example:

```text
Join Private Course Community
```

The community link should only be visible to eligible students if access needs to remain restricted.

---

# 22. Workshop Support

Associates Academy may run free workshops as part of its marketing and education strategy.

The product architecture should support workshop landing pages separately from paid courses.

Potential workshop flow:

```text
Advertisement
     ↓
Workshop Landing Page
     ↓
Registration
     ↓
Workshop Dashboard
     ↓
Live Session
```

Workshop registration should not automatically be treated as a paid course enrollment.

---

# 23. Ebook / Digital Product Expansion

The architecture should allow Associates Academy to sell digital products beyond courses.

Potential product types:

```text
Course
Workshop
Ebook
Template
Bundle
```

This should be treated as an extensibility requirement rather than forcing all product types into the first development phase.

---

# 24. Admin Dashboard

Admin users need a centralized control panel.

Suggested primary navigation:

```text
Dashboard
Courses
Students
Enrollments
Orders
Payments
Workshops
Content
Analytics
Settings
```

Implementation should prioritize the sections that already exist or are required for current operations.

---

# 25. Admin — Course Management

Admin should be able to:

- Create course
- Edit course
- Publish/unpublish
- Manage pricing
- Manage curriculum
- Manage schedules
- Add course resources
- Configure course landing-page content
- Configure live class links
- Archive course

Destructive operations should use confirmation.

---

# 26. Admin — Student Management

Admin should be able to:

- Search students
- View student profile
- View enrollment history
- View course access
- Manually enroll
- Remove/suspend access when legitimately required

Admin should not have unrestricted access to sensitive authentication credentials.

Passwords must never be exposed.

---

# 27. Admin — Enrollment Management

Admin should see:

- Student
- Course
- Enrollment date
- Related order
- Enrollment status
- Access status

Filters should support course and enrollment status.

---

# 28. Admin — Orders and Payments

Admin should be able to view:

- Orders
- Customer
- Course/product
- Amount
- Payment status
- Payment provider
- Transaction ID
- Date

Sensitive financial state changes must be controlled and auditable.

---

# 29. Analytics

The platform should support marketing and product analytics.

Recommended tracked stages:

```text
Page View
↓
Course View
↓
CTA Click
↓
Checkout View
↓
Checkout Started
↓
Payment Started
↓
Purchase Completed
↓
Dashboard Access
```

Potential integrations:

- Meta Pixel
- Meta Conversions API
- Google Analytics / GA4
- First-party application analytics

Purchase conversion data must originate from verified purchases rather than browser-only events.

---

# 30. Marketing Attribution

The application should retain useful campaign attribution information.

Examples:

- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

Where appropriate, the original acquisition information should be associated with session, checkout or order analytics.

This will allow Associates Academy to understand which campaigns generate actual enrollment.

---

# 31. Design Requirements

Associates Academy must retain its established brand identity.

Core visual principles:

- Professional
- Academic
- Premium
- Clean
- Editorial
- Trustworthy
- Bengali-first

Primary visual direction:

- Warm cream / beige backgrounds
- Deep navy headings
- Muted indigo accents
- White/off-white cards
- Subtle gold highlights
- Rounded surfaces
- Soft shadows
- Structured spacing

Avoid:

- Excessive gradients
- Neon appearance
- Glassmorphism-heavy interfaces
- Generic AI-looking layouts
- Unnecessary 3D effects
- Excessive animation

---

# 32. Responsive Requirements

The website must work properly across:

- Mobile
- Tablet
- Laptop
- Desktop

Mobile usability is particularly important because a significant proportion of traffic may originate from Facebook and mobile advertisements.

Primary flows must be easy on small screens:

- Landing-page browsing
- Login
- Checkout
- Payment
- Dashboard access
- Joining live classes

---

# 33. Performance Requirements

Performance priorities:

- Fast initial loading
- Optimized images
- Minimal unnecessary JavaScript
- Server Components where appropriate
- Lazy loading where useful
- Efficient database querying
- No unnecessary API waterfalls

Marketing landing pages should prioritize Core Web Vitals and mobile loading speed.

---

# 34. SEO Requirements

Public pages should support:

- Dynamic metadata
- Title
- Description
- Open Graph image
- Canonical URL
- Sitemap
- robots.txt
- Structured data where relevant

Important course landing pages should be indexable unless intentionally hidden.

Student/admin dashboards must not be indexed.

---

# 35. Security Requirements

Security is a critical requirement.

The application must preserve:

### Authentication Security

- Secure session handling
- No exposure of service-role secrets

### Authorization

- Server-side permission validation
- Course entitlement checking
- Admin-role validation

### Database

Use proper Supabase RLS or equivalent server authorization.

### Payments

Only verified payments may activate paid enrollment.

### Storage

Restricted files must not use uncontrolled public access.

### Secrets

Secrets belong in Vercel/Supabase environment configuration and must never be committed to GitHub.

---

# 36. Technology Architecture

## Frontend / Application

```text
Next.js App Router
TypeScript
React
Tailwind CSS
shadcn/ui where appropriate
```

## Hosting

```text
Vercel
```

## Backend

```text
Supabase
├── PostgreSQL
├── Auth
├── Storage
└── RLS / Database Functions where needed
```

## Recommended Supporting Libraries

```text
Zod
React Hook Form
Lucide React
Recharts when analytics charts are needed
```

Major dependencies should only be added when they solve a real product requirement.

---

# 37. Application Architecture Principle

The migration should preserve:

```text
Business Rules
User Accounts
Database Records
Enrollments
Payments
Course Information
User Journeys
Visual Identity
```

but does **not** need to preserve the internal architecture of the old Lovable application.

The new application should use clean Next.js-native patterns.

```text
Existing Application
        ↓
Understand Product Truth
        ↓
Preserve Data + Business Rules
        ↓
Reimplement
        ↓
Next.js-native Architecture
```

---

# 38. Supabase Migration Principle

The existing production backend should be retained wherever technically possible.

Priority:

**Do not recreate the database unnecessarily.**

The migration should first determine:

- Existing Supabase project ownership
- Tables
- Relationships
- Auth users
- RLS policies
- Storage buckets
- Database functions
- Existing integrations
- Environment configuration

The new Next.js app should ideally connect to the existing production Supabase backend after security review and compatibility verification.

---

# 39. Vercel Deployment

Target architecture:

```text
Users
  ↓
Domain
  ↓
Vercel
  ↓
Next.js
  ↓
Supabase
```

Vercel will host the application layer while Supabase remains responsible for the managed backend.

Production and development environment variables must remain separated.

---

# 40. Migration Requirements

Migration from the current Lovable application should be performed incrementally.

Recommended sequence:

### Phase 1 — Discovery

- Inspect existing code
- Inspect database
- Inspect auth
- Inspect storage
- Document current flows

### Phase 2 — Foundation

- Create Next.js application
- Configure design system
- Configure Supabase clients
- Configure environment variables
- Establish authentication

### Phase 3 — Public Application

- Homepage
- Course pages
- Landing pages
- Shared navigation/footer

### Phase 4 — Commerce

- Checkout
- Orders
- Payment integration
- Verification

### Phase 5 — Student Application

- Student dashboard
- My Courses
- Course dashboard
- Resources
- Live class access

### Phase 6 — Administration

- Admin dashboard
- Courses
- Students
- Enrollments
- Orders

### Phase 7 — Marketing & Analytics

- Meta Pixel
- CAPI where required
- GA4
- Attribution

### Phase 8 — Verification

Verify:

- Existing user login
- Course access
- Existing enrollments
- Admin access
- Purchase lifecycle
- Mobile responsiveness
- Analytics
- Security

### Phase 9 — Production Switch

Only after successful validation should the production domain move to the new application.

---

# 41. Non-Goals for Initial Migration

The migration should not automatically introduce:

- Full LMS video hosting
- Complex learning-progress tracking
- Gamification
- Discussion forums
- AI tutors
- Native mobile apps
- Advanced CRM
- Affiliate system
- Subscription billing
- Marketplace functionality

These may become separate future product initiatives.

The priority is migrating and improving the current business-critical system.

---

# 42. Future Expansion

The architecture should allow future development of:

### Learning

- Recorded lessons
- Lesson completion
- Learning progress
- Quizzes
- Assignments
- Certificates

### Commerce

- Bundles
- Coupon codes
- Multiple products per checkout
- Ebook sales
- Memberships

### Marketing

- Automated lead funnels
- Email marketing
- Lead segmentation
- Retargeting events
- Conversion dashboards

### Operations

- Automated certificates
- Student notifications
- WhatsApp/email reminders
- Attendance tracking

These should remain modular and should not complicate the initial migration.

---

# 43. Success Metrics

Primary indicators:

### Business Metrics

- Course landing-page conversion rate
- Checkout completion rate
- Paid enrollments
- Revenue per campaign
- Cost per purchase

### Product Metrics

- Login success rate
- Payment success rate
- Dashboard access success
- Course access success
- Mobile usability

### Technical Metrics

- Page performance
- Error rate
- Authentication failures
- Payment verification failures
- Database query performance

---

# 44. Acceptance Criteria

The initial Next.js version is ready for production only when:

- Existing production users remain intact.
- Existing valid users can authenticate.
- Existing course enrollment remains intact.
- Public pages function correctly.
- Course landing pages are responsive.
- Checkout works.
- Payment states are verified securely.
- Successful purchases generate correct enrollment.
- Students can access authorized courses.
- Unauthorized users cannot access restricted courses.
- Admin functions work correctly.
- No production database records are lost.
- Mobile experience is tested.
- Analytics and purchase tracking behave correctly.
- Application builds successfully on Vercel.
- Production environment contains no exposed secrets.
- Core flows have been manually tested end-to-end.

---

# 45. Product Development Rule

Every future implementation decision should answer this question:

> **Does this make it easier and safer for a student to discover, purchase and access Associates Academy's professional education while making the platform easier for the academy to operate?**

If the answer is no and the feature is not necessary for security, compliance or technical reliability, it should not increase the complexity of the initial product.

---

# 46. Source of Truth Hierarchy

For the migration project, the preferred documentation structure should be:

```text
AGENTS.md
│
├── PRD.md
├── PROJECT.md
├── design.md
├── UI.md
├── architecture.md
├── backend.md
├── flows.md
├── analytics.md
├── security.md
├── MIGRATION.md
└── logs.md
```

`PRD.md` defines **what the product should accomplish**.

`PROJECT.md` defines **what currently exists and the business context**.

`architecture.md` and `backend.md` define **how the current and target systems work technically**.

`MIGRATION.md` defines **how the transition will occur safely**.

The codebase and actual production database remain the ultimate technical source of truth where documentation and implementation disagree.