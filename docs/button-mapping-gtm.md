# Compensall — Button / CTA mapping for GTM

Implemented in code (`data-gtm` / `data-gtm-location`). Helper: `src/lib/gtm.ts`.

Labels below are English (`messages/en.json`). UI is i18n: `en` / `pt` / `fr`.

**Primary conversion destination:** `/#claim` (locale-prefixed, e.g. `/en/#claim`) — scrolls to the homepage hero form (`id="claim"`).

**Paid conversion URL:** `/{locale}/claim/thank-you` (e.g. `/en/claim/thank-you`, `/pt/claim/thank-you`). Fire `claim_submitted` only on this page after a tracking number exists. Query: `ref`, `mode`, `flight`.

---

## Attribute convention

| Attribute | Use |
|---|---|
| `data-gtm` | Fixed click identifier |
| `data-gtm-location` | Only on CTAs that open the claim form |

### Claim-intent CTAs

All buttons/links that go to `/#claim` (Talk to us, Check compensation, Back to claim, etc.):

```html
data-gtm="cta_claim"
data-gtm-location="header"
```

Valid `data-gtm-location` values: `header` · `header_mobile` · `banner` · `about` · `catalog_detail` · `docs` · `docs_breadcrumb` · `track` · `thank_you` · `not_found`

In GTM: trigger when `data-gtm` equals `cta_claim`; use `data-gtm-location` as a parameter/dimension for placement.

### Other CTAs

```html
data-gtm="nav_about"
```

---

## Claim CTAs (`data-gtm="cta_claim"`)

| `data-gtm-location` | Where | Typical label (EN) |
|---|---|---|
| `header` | Header desktop | Talk to us |
| `header_mobile` | Mobile menu CTA | Talk to us |
| `banner` | Shared CTA banner (home, rights, about, airlines, blog) | Check compensation |
| `about` | About · why choose us | Check compensation |
| `catalog_detail` | Airline / airport detail claim section | Check compensation |
| `docs` | Docs · Back to claim | Back to claim |
| `docs_breadcrumb` | Docs · breadcrumb Claim | Claim |
| `track` | Track claim · error state | Start a new claim |
| `thank_you` | Thank-you page · new claim | Start a new claim |
| `not_found` | 404 | Check compensation |

---

## Header / navigation

| Section | Label (EN) | `data-gtm` |
|---|---|---|
| Logo | Compensall | `nav_logo_home` |
| Nav / dropdown trigger | Know your rights | `nav_know_your_rights` |
| Nav / dropdown trigger | Airlines | `nav_airlines` |
| Nav | About us | `nav_about` |
| Nav | Blog | `nav_blog` |
| Nav | FAQ | `nav_faq` |
| Mobile menu open | Open menu | `nav_mobile_menu_open` |
| Mobile accordion | Know your rights | `nav_mobile_accordion_rights` |
| Mobile accordion | Airlines & airports | `nav_mobile_accordion_airlines` |
| Dropdown rights items | Overview / blog guides | `nav_dropdown_rights_{slug}` |
| Dropdown catalog items | Airlines / airports | `nav_dropdown_catalog_{id}` |

---

## Footer

| Section | `data-gtm` |
|---|---|
| Nav | `footer_nav_know_your_rights`, `footer_nav_airlines`, `footer_nav_about`, `footer_nav_blog`, `footer_nav_faq` |
| Contact | `footer_contact_email`, `footer_contact_phone` |
| Legal | `footer_legal_privacy`, `footer_legal_terms`, `footer_legal_cookies`, `footer_legal_prices`, `footer_legal_no_win_no_fee` |
| Social | `footer_social_linkedin`, `footer_social_instagram`, `footer_social_facebook`, `footer_social_tiktok` |
| Newsletter | `footer_newsletter_subscribe`, `footer_newsletter_privacy` |

---

## Homepage claim form (`/#claim`)

| Step | Label (EN) | `data-gtm` |
|---|---|---|
| 1 | Upload boarding pass | `claim_step1_upload_boarding_pass` |
| 1 | Check compensation | `claim_step1_check_compensation` |
| 1 | Swap airports | `claim_step1_swap_airports` |
| 2 | Delete data | `claim_step2_delete_data` |
| 2 | Edit details | `claim_step2_edit_details` |
| 2 | Yes, continue | `claim_step2_yes_continue` |
| 3 contact | Add / Remove passenger | `claim_step3_add_passenger`, `claim_step3_remove_passenger` |
| 3 contact | Continue to signing | `claim_step3_continue_to_signing` |
| 3 sign | Open full page / Clear / Back / Sign | `claim_step3_open_poa`, `claim_step3_clear_signature`, `claim_step3_sign_back`, `claim_step3_sign_continue` |
| 3 docs | File uploads | `claim_step3_upload_passport_copy`, `claim_step3_upload_booking_confirmation`, `claim_step3_upload_expenses_receipts`, `claim_step3_upload_other_documents` |
| 3 docs | Back / Continue to review | `claim_step3_documents_back`, `claim_step3_continue_to_review` |
| 3 review | Back / Submit claim | `claim_step3_review_back`, `claim_step3_submit_claim` |
| 3 | Delete data | `claim_step3_delete_data` |
| Thank-you `/{locale}/claim/thank-you` | Claim submitted (conversion) | `claim_submitted` (dataLayer + `data-gtm`) |
| Thank-you | Track your claim | `claim_success_track_claim` |

---

## Other pages

| Page | Label | `data-gtm` |
|---|---|---|
| Know your rights | Learn more | `kyr_learn_more_{slug}` |
| Airlines catalog | Learn more / Check claims | `catalog_airline_learn_more_{id}` / `catalog_airport_check_claims_{id}` |
| Catalog | See more / Show less | `catalog_see_more_airlines` / `catalog_see_more_airports`, `catalog_show_less` |
| Catalog detail | Breadcrumb | `catalog_detail_breadcrumb` |
| Blog index | Read article | `blog_read_article` |
| Blog article | Back to blog | `blog_back_to_blog` |
| Prices | No Win, No Fee Agreement | `prices_nwnf_agreement` |
| 404 | Know your rights / Blog | `not_found_know_your_rights`, `not_found_blog` |
| Cookies | Essential only / Accept all | `cookie_essential_only`, `cookie_accept_all` |
| Cookies | Policy links | `cookie_policy_link`, `cookie_privacy_link` |

---

## Suggested GTM setup

1. **Trigger:** Click – All Elements (or Just Links), condition: Click Element matches CSS `[data-gtm]`.
2. **Variables** (Element Attribute):
   - `data-gtm`
   - `data-gtm-location`
3. **GA4 event** (example):
   - name: `cta_click`
   - params: `gtm_id` = `{{data-gtm}}`, `gtm_location` = `{{data-gtm-location}}`
4. **Claim funnel:** filter where `data-gtm` starts with `claim_step`.
5. **Paid conversions (Meta / Google Ads):** unique URL `/{locale}/claim/thank-you` plus Custom Event `claim_submitted`. The site sends `claim_tracking_number`, `claim_locale`, `claim_entry_mode`, `claim_flight_number` once on that page. Turn off tags that fire on the last form step.
