# External setup and launch checklist

No accounts or credentials are required for the Phase 2 validation preview. Create/configure these incrementally when the matching phase begins. Enter secrets in local `.env.local` or Vercel project environment settings, never in Git or chat. The variable names below are planned interfaces; nothing reads them yet.

| Account / setting          | Needed when    | Configuration                                                                                                                                                                        |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GitHub                     | Source control | Existing `urvashisaxena/LittleMilestones` repository; review changes before committing/pushing.                                                                                      |
| Supabase                   | Phase 3        | Separate development and production projects. `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only). Apply reviewed migrations and RLS before storing parent/baby data.          |
| Stripe sandbox             | Phase 4        | Create a recurring **$1 USD monthly** Price. Set test `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, and endpoint-specific `STRIPE_WEBHOOK_SECRET`. Never use live keys during development. |
| Resend                     | Phase 5        | `RESEND_API_KEY`, `EMAIL_FROM`. Verify a domain and its DNS; test only with authorized test recipients. No production sends without owner approval.                                  |
| Vercel                     | Phase 8        | Import GitHub repository, Next.js preset, Node 24, `npm ci`, `npm run build`. Separate Preview and Production configuration.                                                         |
| Application URL            | Integrations   | `NEXT_PUBLIC_APP_URL`: local origin during development, then the actual HTTPS deployment origin for redirects and links. Public, never a credential.                                 |
| Vercel Cron                | Phase 6        | `CRON_SECRET`: generate a long random secret and require Bearer authorization. Confirm current plan's scheduling limits and cadence meet the delivery timezone requirements.         |
| Domain and support contact | Before launch  | Configure DNS, sender authentication, reply/support inbox, and legal business identity.                                                                                              |

## Stripe test-mode preparation (Phase 4)

- [ ] Create the test product and recurring monthly price; check amount, currency, and billing interval server-side.
- [ ] Register the signed webhook endpoint after it is implemented; use its own signing secret (local forwarding has a separate secret).
- [ ] Configure the Billing Portal to permit cancellation and payment management.
- [ ] Test payment success/failure, duplicate/out-of-order webhooks, cancellation, entitlement expiry, and delayed confirmation.
- [ ] Approve the billing policy after the final guide and disclose it before Checkout.

## Before production

- [ ] Implement and test phases 2–8; Phase 2 is a validation-only prototype.
- [ ] Complete date/timezone boundary tests, entitlement tests, concurrent delivery/retry tests, and signed webhook verification tests.
- [ ] Verify no child data or secret values appear in client bundles, URLs, public database access, or logs.
- [ ] Review data minimization, retention, deletion, abuse prevention/rate limits, secure management links, and email opt-out behavior.
- [ ] Publish owner-reviewed privacy and terms documents, clearly separating optional email preferences from billing cancellation.
- [ ] Medically review all 12 versioned content guides and verify authoritative references.
- [ ] Add delivery monitoring, retry/alert procedures, database backups, and an operational incident plan.
- [ ] Validate staging on Vercel using sandbox billing and controlled email recipients.
- [ ] Obtain explicit owner approval before enabling real payments or production email.

A successful local build does not validate Supabase, Stripe, Resend, cron scheduling, or Vercel deployment. Those checks happen in their implementation phases.

## Phase 1 dependency audit

At implementation time, `npm audit --omit=dev` reported **0 vulnerabilities**. The full `npm audit` reported a high-severity `braces` stack-exhaustion advisory (GHSA-vfj7-8cjw-p6xm), propagated through `micromatch`, `fast-glob`, and the Next.js ESLint plugin/config (five affected packages reported). This is development tooling; avoid linting untrusted glob patterns. npm's proposed fix downgrades `eslint-config-next` across major versions, so it was not applied. Recheck the advisory and upgrade to compatible patched tooling when available before launch; do not use `npm audit fix --force` blindly.

## Scope boundary

V1 uses chronological age from date of birth. Expected due date and corrected-age support are deferred to V1.1. Personalized categories, health tracking, and community-driven solutions are future scope, not current implementation targets.
