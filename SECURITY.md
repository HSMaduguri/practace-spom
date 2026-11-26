# Security Policy — practACE (CA Final SPOM Set A & Set B Suite)

## 1. Data Ownership & Row-Level Security (RLS) Invariants
- **Direct Student Ownership:** All student profile records (`profiles`) and progress buckets (`user_progress` for `practice`, `flashcards`, and `notes`) are isolated via PostgreSQL Row-Level Security (RLS) policies checking `(select auth.uid()) = user_id` / `id`. No user can read, modify, or delete another student's study records.
- **Scoped Client Credentials:** The browser client strictly uses public/publishable Supabase credentials (`VITE_SUPABASE_PUBLISHABLE_KEY` / `anon`) combined with user-scoped JWT sessions. Service-role keys are never shipped to or accessible from the client.
- **Local Storage Isolation:** Local browser caching (`localStorage`) is strictly scoped to the authenticated student's session and cleared automatically upon sign-out so shared devices never leak study notes or progress between students.

## 2. Authentication & Session Security
- **Transport & Encryption:** All authentication and database synchronization traffic is encrypted in transit over HTTPS/TLS 1.3 via Supabase Auth and PostgREST.
- **Password & OAuth Flows:** Email/password authentication enforces minimum length validation and token-verified password recovery (`resetPasswordForEmail` / `PASSWORD_RECOVERY`). Canceling an incomplete recovery flow immediately invalidates the temporary recovery session.

## 3. Supported Versions

| Version | Supported | Notes |
| ------- | --------- | ----- |
| `1.x` (Current Web Suite) | Yes | Active SPOM Set A (Laws) & Set B (SCMPE) release |
| `< 1.0` (Legacy `pract.CA`) | No | Upgraded to unified `practACE` platform |

## 4. Reporting a Security Vulnerability
If you discover a security vulnerability, authorization bypass, or data-exposure issue in **practACE**:
1. **Do not disclose it publicly** until our team has investigated and deployed a fix.
2. Submit a report via our [Official Feedback & Security Report Form](https://forms.gle/PzWDLK1F3PsobrFL6) or message the maintainers through the official [practACE LinkedIn page](https://www.linkedin.com/company/pract-ace/).
3. Include steps to reproduce, affected URL/component, and any relevant screenshots or logs. We aim to acknowledge reports within **48 hours** and deploy verified remediations promptly.

