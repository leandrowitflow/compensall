import { buildActiveCrmLeadArchiveDomain, type OdooCrmLeadArchiveCandidate } from "../src/lib/odoo-client";
import {
  claimLeadMatchesSubmitIdentity,
  normalizeClaimLeadEmail,
  type ClaimLeadArchiveIdentity,
} from "../src/lib/odoo-crm-lead";

const RESUME_TOKEN = "a".repeat(64);
const SESSION_A = "11111111-aaaa-bbbb-cccc-ddddeeeeffff";
const SESSION_B = "22222222-aaaa-bbbb-cccc-ddddeeeeffff";

const johnIdentity: ClaimLeadArchiveIdentity = {
  email: "johnculligan1983@outlook.com",
  formSessionId: SESSION_A,
  resumeToken: RESUME_TOKEN,
  trackingNumber: "CMP-200073-DCQMWS",
  odooLeadId: 100,
};

function candidate(overrides: Partial<OdooCrmLeadArchiveCandidate>): OdooCrmLeadArchiveCandidate {
  return {
    id: 1,
    name: "Compensall incomplete — Eyz2016 — John Culligan",
    emailFrom: "johnculligan1983@outlook.com",
    description: `Form status: Incomplete\nSession: ${SESSION_A}`,
    website: `https://www.compensall.com/en/resume/${RESUME_TOKEN}`,
    ...overrides,
  };
}

const cases: Array<{
  id: string;
  lead: OdooCrmLeadArchiveCandidate;
  identity?: ClaimLeadArchiveIdentity;
  expect: boolean;
}> = [
  {
    id: "same incomplete email + lost session still matches",
    lead: candidate({
      id: 11,
      description: `Form status: Incomplete\nSession: ${SESSION_B}`,
      website: null,
    }),
    expect: true,
  },
  {
    id: "Claim Submitted same email is archived (recovery list)",
    lead: candidate({
      id: 12,
      name: "Compensall claim CMP-200073-DCQMWS — Eyz2016",
      description: "Form status: Submitted\nTracking number: CMP-200073-DCQMWS",
      website: null,
    }),
    expect: true,
  },
  {
    id: "john vs jenna never matches (same flight, similar email)",
    lead: candidate({
      id: 13,
      name: "Compensall incomplete — Eyz2016 — Jenna Culligan",
      emailFrom: "jennaculligan1983@outlook.com",
      description: `Form status: Incomplete\nSession: ${SESSION_B}`,
    }),
    expect: false,
  },
  {
    id: "known lead id + same email matches",
    lead: candidate({ id: 100, description: null, website: null, name: "Other" }),
    expect: true,
  },
  {
    id: "known lead id + different email does not match",
    lead: candidate({
      id: 100,
      emailFrom: "jennaculligan1983@outlook.com",
      description: null,
      website: null,
    }),
    expect: false,
  },
  {
    id: "exact session match + same email",
    lead: candidate({
      id: 14,
      name: "Lead",
      description: `<p>Session: ${SESSION_A}</p>`,
      website: null,
    }),
    expect: true,
  },
  {
    id: "resume token in website + same email",
    lead: candidate({
      id: 15,
      name: "Lead",
      description: null,
      website: `https://www.compensall.com/en/resume/${RESUME_TOKEN}`,
    }),
    expect: true,
  },
  {
    id: "flight/last-name similarity is not a key",
    lead: candidate({
      id: 16,
      name: "Compensall incomplete — Eyz2016 — Culligan",
      emailFrom: "someone.else@outlook.com",
      description: "Form status: Incomplete\nFlight: Eyz2016",
      website: null,
    }),
    expect: false,
  },
  {
    id: "email is case/whitespace insensitive",
    lead: candidate({
      emailFrom: "  JohnCulligan1983@Outlook.com ",
    }),
    expect: true,
  },
  {
    id: "angle-bracket email_from still matches",
    lead: candidate({
      emailFrom: "John Culligan <johnculligan1983@outlook.com>",
    }),
    expect: true,
  },
  {
    id: "empty submit email never matches",
    lead: candidate({}),
    identity: { ...johnIdentity, email: "   " },
    expect: false,
  },
  {
    id: "unrelated Compensall lead with different email stays",
    lead: candidate({
      id: 17,
      emailFrom: "other@example.com",
      name: "Compensall claim CMP-999 — Eyz2016",
      description: "Form status: Submitted\nTracking number: CMP-999",
    }),
    expect: false,
  },
];

let failed = 0;

for (const testCase of cases) {
  const actual = claimLeadMatchesSubmitIdentity(testCase.lead, testCase.identity ?? johnIdentity);
  const ok = actual === testCase.expect;
  console.log(`${ok ? "PASS" : "FAIL"} ${testCase.id} → ${actual} (expected ${testCase.expect})`);
  if (!ok) failed += 1;
}

const normalized = normalizeClaimLeadEmail(" JohnCulligan1983@Outlook.com ");
const normalizeOk = normalized === "johnculligan1983@outlook.com";
console.log(
  `${normalizeOk ? "PASS" : "FAIL"} normalizeClaimLeadEmail → ${normalized}`,
);
if (!normalizeOk) failed += 1;

const domain = buildActiveCrmLeadArchiveDomain({
  email: "johnculligan1983@outlook.com",
  leadId: 100,
  formSessionId: SESSION_A,
});
const domainHasActive = Array.isArray(domain) && JSON.stringify(domain[0]) === JSON.stringify(["active", "=", true]);
const domainHasOr = Array.isArray(domain) && domain.includes("|");
const domainOk = Boolean(domainHasActive && domainHasOr);
console.log(`${domainOk ? "PASS" : "FAIL"} archive search domain is active AND identity OR`);
if (!domainOk) failed += 1;

const emptyDomain = buildActiveCrmLeadArchiveDomain({});
const emptyOk = emptyDomain === null;
console.log(`${emptyOk ? "PASS" : "FAIL"} empty identity builds no archive domain`);
if (!emptyOk) failed += 1;

if (failed > 0) {
  process.exit(1);
}
console.log("\nCRM recovery-lead matching checks passed.");
