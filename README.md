# Little Milestones

A calm companion for a baby's first year. Planned service: $1 USD/month for one baby, with an age-specific email seven calendar days before each monthly birthday (months 1–12).

**Current status: Phase 2 validation preview.** Landing page and a server-validated registration form are implemented. Use fictional data: form input is transmitted for validation but is not persisted. No account or subscription is created, no payments are accepted, and no emails are sent. This is not yet a production-ready subscription product.

## Run it

Use Node.js 24 LTS and npm (version pin in `.nvmrc`). If you use nvm, run `nvm install && nvm use` first.

```sh
cd LittleMilestones # omit this if already in the repository
npm ci
npm run dev
```

On your own computer, open the local address printed by Next.js. Stop the server with Ctrl+C. The registration validation preview requires no external accounts or environment variables. In the Codex cloud machine, if npm's default cache is unwritable, prefix npm commands with `npm_config_cache=/tmp/npm-cache`.

For future integrations, copy the variable template and fill in values securely:

```sh
cp .env.example .env.local
```

`.env.local` is ignored by Git. The example intentionally contains no credentials. Never rename private API keys with a `NEXT_PUBLIC_` prefix: those values can enter browser code.

## Check your changes

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run start
```

The last command runs the production build, so stop the development server first if it uses the same port. The build must succeed before `start`.

Manual feature checks:

1. Open `/`: confirm the hero, how-it-works section, sample email, pricing, FAQs, and footer render.
2. Click “How it works” and “Pricing”: each jumps to its section.
3. Click any subscription CTA: it opens `/subscribe`. Submit fictional details: a baby born today or within the last 12 months, optional gender, an email, and your IANA time zone. Confirm the validation-only success message. Then try an empty form, a future birthday, and a baby exactly 12 months old; confirm accessible field errors. There must be no due-date field. Use its back link to return.
4. Open each FAQ with the mouse and with Enter/Space after tabbing to it.
5. At mobile widths (375px) and desktop widths (1280px), check that text and buttons fit without horizontal scrolling.
6. Use Tab to navigate: verify visible focus and the “Skip to content” link. Enable reduced motion in system settings to disable smooth scrolling.
7. Confirm the sample is labeled as illustrative and medically unreviewed; the site must not imply clinical review has happened.

`npm test` runs deterministic server-validation tests for eligibility, invalid input, leap years, month ends, time zones, and the exclusion of deferred fields. Billing, scheduling, and delivery tests will be added with their implementation. Validation does not persist registration; Supabase integration is Phase 3.

## Structure

- `src/app/layout.tsx`: shared header, footer, metadata, and document shell.
- `src/app/page.tsx`: marketing landing page.
- `src/app/subscribe/`: registration page and validation-only Server Action.
- `src/lib/registration/`: pure input validation and chronological calendar-date helpers.
- `src/components/registration-form.tsx`: accessible form and pending/error/success states.
- `tests/registration.test.mjs`: server-validation boundary tests.
- `src/app/globals.css`: Tailwind import, warm color tokens, responsive styling, and CSS illustration.
- `public/`: local static assets.
- `docs/launch-checklist.md`: external accounts, configuration, and launch gates.

The landing page uses server components, local system fonts, semantic HTML, native FAQ disclosures, and a CSS illustration. No analytics, third-party embeds, remote fonts, or paid-service SDKs are included.

## Implementation plan

- [x] 1. Next.js App Router, TypeScript, Tailwind, landing page, documentation.
- [x] 2. Registration form and server-side validation (preview; persistence is Phase 3); collect timezone explicitly and avoid logging baby data.
- [ ] 3. Supabase schema, constraints, indexes, and deny-by-default row-level security.
- [ ] 4. Stripe test-mode Checkout, subscription entitlement, signed and idempotent webhooks.
- [ ] 5. Versioned month 1–12 content and email templates. All content remains draft until medically reviewed.
- [ ] 6. Authenticated cron, calendar-aware scheduling, unique delivery keys, logging, and retries.
- [ ] 7. Secure management, cancellation, deletion/unsubscribe, security review, and tests.
- [ ] 8. Vercel deployment and launch validation.

Later scheduling must clamp monthly anniversaries from the original date of birth (not repeatedly add months), handle leap years and parent-local calendar dates, send within-window catch-up only after payment confirmation, enforce entitlement at delivery, and stop after guide 12. V1 uses chronological age from date of birth only. Expected due date and corrected-age calculations are deferred to V1.1. Delivery retries must consider the email provider's idempotency window, not just database uniqueness.

Before paid launch, decide and disclose what happens to billing after guide 12; email completion must not silently imply cancellation.

## Safety and launch status

The sample is general illustrative copy, not a month-specific clinical guide. Future content must distinguish CDC/AAP milestones from activities and general suggestions, retain source/version metadata, and receive medical review. Privacy/terms drafts, success/management pages, persistent storage, and integrations belong to later phases. Do not deploy this as a functioning paid service. Real payments and production email require explicit owner approval.

## Product scope and extension boundaries

V1 is one baby per subscription with chronological age only. There is no expected-due-date field or corrected-age calculation. V1.1 may add medically reviewed corrected-age guidance. Future personalized categories, health tracking, and community solutions are outside the MVP. Keep registration validation, persistence, billing, content, and scheduling in separate domain modules as they are implemented; use versioned content and stable identifiers in Phase 3. Do not add speculative tables, health fields, generic metadata bags, or community infrastructure now. Future additions require explicit schemas, consent/privacy review, and their own tests.
