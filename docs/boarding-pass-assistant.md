# Boarding Pass Assistant — Guide for the Assistant

This document describes how the **Compensall boarding pass assistant** works: what the user sees at each step, what the system does behind the scenes, and what happens after submission. Use it when answering user questions, extending the claim flow, or wiring up backend integrations.

---

## Purpose

The boarding pass assistant helps passengers start a flight compensation claim quickly. The user uploads a boarding pass (or enters route details manually). The assistant extracts flight information, asks the user to confirm it, then collects signed legal documents before submitting the claim for review.

The main UI lives on the homepage at `/#claim` in `HeroClaimForm.tsx`.

---

## High-level flow

```
Step 1: Upload          Step 2: Confirm details     Step 3: Sign & submit        After submit
─────────────────       ───────────────────────     ─────────────────────      ──────────────
Boarding pass file  →   Pre-filled flight info  →   3 legal documents    →   AI verification
or manual route         User checks / edits         Name + signature          Email to ops
                                                                               Tracking # to user
                                                                               (ODOO later)
```

There are **three wizard steps**, shown in the step indicator:

| Step | Label (UI)     | User action |
|------|----------------|-------------|
| 1    | Upload         | Upload boarding pass **or** pick departure/arrival airports manually |
| 2    | AI check       | Review extracted details, edit if needed, confirm everything is correct |
| 3    | Sign & submit  | Read and accept three documents, enter legal name, sign, submit |

---

## Step 1 — Upload boarding pass

**Component:** `src/components/claim/Step1Upload.tsx`  
**Orchestrator:** `src/components/HeroClaimForm.tsx` → `handleExtract` / `handleManualSubmit`

### Upload path (primary)

1. User drops or selects a file (PDF, JPG, PNG, WebP — max 10 MB).
2. Frontend POSTs the file to `POST /api/claim/extract-boarding-pass`.
3. The API calls `extractBoardingPassFromFile()` in `src/lib/extract-boarding-pass.ts`, which uses **Gemini** via `GEMINI_API_KEY`.
4. On success:
   - `entryMode` is set to `"upload"`.
   - Upload metadata (filename, size, preview URL) is stored.
   - Extracted fields populate `ClaimFlightData`.
   - Wizard advances to **Step 2**.

### Manual path (fallback)

If extraction fails or the user prefers not to upload:

1. User selects **departure** and **arrival** airports via `AirportSelect`.
2. `entryMode` is set to `"manual"`.
3. Route labels are stored; other fields start empty.
4. Wizard advances to **Step 2** in **edit mode** so the user can fill in missing details.

### Extracted / collected fields

Defined in `src/lib/claim-types.ts` as `ClaimFlightData`:

| Field       | Description |
|-------------|-------------|
| `passenger` | Name on boarding pass |
| `flight`    | Flight number (e.g. `BA123`) |
| `routeFrom` | Departure city + IATA when visible (e.g. `London (LHR)`) |
| `routeTo`   | Arrival city + IATA |
| `date`      | Human-readable date (e.g. `14 May 2026`) |
| `status`    | `Delayed`, `Cancelled`, `Denied boarding`, or `Unknown` |
| `delay`     | Delay duration if known (often empty after extraction) |

**Important:** Boarding passes usually do **not** include disruption info on the pass itself. After extraction, the assistant may pre-fill `status` and `delay` via **web lookup** (see below). The user must still confirm or edit these in Step 2.

### Environment

Extraction, web flight lookup, and verification all use **`GEMINI_API_KEY`** (see `src/lib/gemini.ts`). Without it, extraction returns 503 and verification defaults to `needs_review`.

Optional env vars for web lookup (`src/lib/lookup-flight-status-web.ts`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `GEMINI_FLIGHT_WEB_LOOKUP` | `true` | Set to `false` to skip web search after upload |
| `GEMINI_FLIGHT_LOOKUP_MODEL` | `gemini-3.5-flash` | Model used for Google Search + URL fetch |
| `GEMINI_VISION_MODEL` | `gemini-3.5-flash` | Model used to read boarding pass images/PDFs |
| `GEMINI_TEXT_MODEL` | `gemini-3.5-flash` | Model used for text-only structuring |

### Reference-based extraction (how it works)

Boarding passes print **standard reference codes**. The assistant reads those codes from the image — it does not guess city names or flight details.

| Reference | Example | What we do with it |
|-----------|---------|-------------------|
| **IATA airport codes** | `STN`, `FCO` | Look up city in our airport catalog → `"London (STN)"` |
| **Flight designator** | `FR8542` | Use directly as flight number |
| **Operating carrier** | `FR` | Map to airline name (Ryanair, easyJet, …) |
| **PNR / record locator** | `ABC123` | Captured for ops verification (future airline lookup) |
| **Passenger name** | `SMITH/JOHN` | Formatted for the claim form |
| **Flight date** | `14 May 2026` | Normalized to UK date format |

**Pipeline** (`extract-boarding-pass.ts`):

1. Gemini vision extracts **printed reference codes only**
2. Codes are normalized and validated (IATA format, PNR pattern, flight designator)
3. IATA codes and carrier codes are resolved against our catalogs
4. Gemini **searches the web** (Google Search + URL fetch) for delay/cancellation using flight number + date — no paid flight API; may open Flightradar24, FlightAware, or airline status pages

No barcode scanning is required — everything needed is usually printed on the pass itself.

### Web flight lookup (no paid API)

After references are resolved, `lookupFlightStatusFromWeb()` uses Gemini's built-in **Google Search** and **URL context** tools (same `GEMINI_API_KEY`):

1. Search for the exact flight number and date
2. Open the best matching page (often Flightradar24 or the airline site)
3. Extract delay, cancellation, or "on time" if stated
4. Pre-fill `status` and `delay` in Step 2 when confidence is sufficient

This is not a headless browser on your server — Google runs the search/fetch on Gemini's side. If lookup fails, upload still succeeds and status stays `Unknown`.

---

## Step 2 — Confirm extracted information

**Components:** `Step2Panel.tsx`, `ClaimSidebar.tsx`, `FlightDetailsForm.tsx`

After upload, Step 2 opens with **information already filled in** from extraction (or partially filled for manual entry).

### Layout

- **Left sidebar (`ClaimSidebar`):** Boarding pass preview (if uploaded) + summary cards for all flight fields.
- **Right panel (`Step2Panel`):** Assistant message asking the user to confirm details, plus a read-only summary or editable form.

### User actions

- **Yes, continue** — Validates required fields and moves to Step 3.
- **Edit details** — Toggles `FlightDetailsForm` so the user can correct mistakes.
- **Delete data** — Resets the entire claim and returns to Step 1.

### Validation before Step 3

`validateStep2()` in `HeroClaimForm.tsx` requires:

- Passenger name
- Flight number
- Route (from + to)
- Flight date
- Flight status (not `Unknown`)
- Delay duration if status is `Delayed`

If validation fails, the form switches to edit mode and shows an error.

### Assistant messaging (Step 2)

The assistant should communicate clearly:

> Thanks! I've extracted your flight details. Please confirm the information below is correct.

Emphasise that accurate details are needed to assess eligibility under EU261 / UK261.

---

## Step 3 — Documents, name, and signature

**Component:** `src/components/claim/Step3Panel.tsx`  
**Document list:** `src/lib/claim-documents.ts`

The user must complete **all** of the following before submitting:

### 1. Review and accept three documents

Each document has a **Review** link (opens in a new tab) and a checkbox: *"I have read and agree to this document"*.

| ID | Title | Path |
|----|-------|------|
| `authority-to-act` | Authority to Act | `/documents/authority-to-act` |
| `no-win-no-fee` | No Win, No Fee Agreement | `/documents/no-win-no-fee` |
| `privacy-data-consent` | Privacy & Data Consent | `/documents/privacy-data-consent` |

All three checkboxes must be checked.

### 2. Enter full legal name

Pre-filled from `flight.passenger` when available. User can edit. Required to submit.

### 3. Sign

- Canvas signature pad (draw with pointer/finger), **or**
- Typed name counts as electronic signature (per helper text).

User clicks **Sign & Submit** when ready.

### Assistant messaging (Step 3)

> Your claim is ready. Review the documents below and sign to submit.

---

## After submission — backend behaviour

When the user completes Step 3, `POST /api/claim/submit` runs this pipeline:

### 1. Final AI verification of boarding pass

Implemented in `src/lib/verify-boarding-pass.ts` using **Gemini** (`GEMINI_API_KEY`).

- Re-reads the uploaded boarding pass (if present)
- Compares against user-confirmed `ClaimFlightData`
- Returns `pass`, `needs_review`, or `fail` with a summary and mismatches
- If `GEMINI_API_KEY` is missing, verification defaults to `needs_review`

### 2. Notify operations by email

Implemented in `src/lib/send-claim-email.ts` via **Resend** (`RESEND_API_KEY`).

- Sends to `CLAIM_OPS_EMAIL` (default: `help@compensall.com`)
- Includes tracking number, flight details, signed name, verification summary
- Attaches boarding pass and signature image when available

### 3. Tracking number for the user

- Generated in `src/lib/claim-tracking.ts` (format: `CMP-YYMMDD-XXXXX`)
- Shown on the success screen with a link to `/track/[trackingNumber]`
- Optional contact email on Step 3 — user receives tracking email when `RESEND_API_KEY` is set

### 4. Claim storage

- **Development:** `data/claims/{trackingNumber}.json` (gitignored)
- **Production:** Supabase `claims` table — run `supabase/migrations/001_claims.sql`
- Env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### 5. ODOO integration (planned)

Claim status milestones are shown on the track page. Live updates will sync from ODOO when connected.

---

## Success screen

After submit, `Step3Panel` shows the tracking number and a **Track your claim** link to `/track/[trackingNumber]`.

---

## Key source files

| File | Role |
|------|------|
| `src/components/HeroClaimForm.tsx` | Wizard state, step routing, extraction handler |
| `src/components/claim/Step1Upload.tsx` | Upload zone + manual airport entry |
| `src/components/claim/Step2Panel.tsx` | Confirm / edit flight details |
| `src/components/claim/Step3Panel.tsx` | Documents, name, signature, submit |
| `src/components/claim/ClaimSidebar.tsx` | Boarding pass preview + detail summary |
| `src/lib/claim-types.ts` | Shared types and normalisation |
| `src/lib/claim-documents.ts` | Three legal documents |
| `src/lib/extract-boarding-pass.ts` | AI extraction logic |
| `src/app/api/claim/submit/route.ts` | Submit pipeline API |
| `src/app/api/claim/track/[trackingNumber]/route.ts` | Tracking lookup API |
| `src/lib/verify-boarding-pass.ts` | Post-submit Gemini verification |
| `src/lib/send-claim-email.ts` | Ops + user notification emails |
| `src/lib/claim-store.ts` | Claim persistence (Supabase / local dev) |
| `src/lib/claim-tracking.ts` | Tracking number generation |
| `src/app/track/[trackingNumber]/page.tsx` | User-facing tracking page |

---

## Terminology for user-facing copy

- Prefer **"assistant"** or **"Compensall AI"** in the product UI (matches existing components).
- Avoid overusing "AI" in customer-facing explanations; focus on outcomes ("we read your boarding pass", "we check your details").
- Use **"tracking number"** / **"claim reference"** for post-submit follow-up.

---

## Suggested API to implement next

```
POST /api/claim/submit
```

**Request body (conceptual):**

- `flight`: confirmed `ClaimFlightData`
- `entryMode`: `"upload" | "manual"`
- `boardingPass`: file reference or base64 (if uploaded)
- `signedName`: string
- `signatureDataUrl`: PNG data URL or null
- `acceptedDocuments`: ids of the three accepted docs

**Response:**

- `trackingNumber`: string
- `status`: initial status (e.g. `"submitted"`)

**Side effects:**

1. Run post-submit AI verification
2. Email `help@compensall.com`
3. Email user (when email field exists) with tracking number
4. (Future) Create ODOO case and persist mapping

---

## Quick answers for common user questions

**"What file can I upload?"**  
PDF, JPG, or PNG boarding pass, up to 10 MB.

**"Why is flight status Unknown?"**  
Boarding passes rarely show delays or cancellations. You'll confirm what happened in Step 2.

**"Can I change details after upload?"**  
Yes — use **Edit details** in Step 2.

**"What documents am I signing?"**  
Authority to Act, No Win No Fee Agreement, and Privacy & Data Consent.

**"How do I track my claim?"**  
You'll receive a tracking number after submit. Status updates will come from our case system (ODOO integration planned).
