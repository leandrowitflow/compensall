import type { LegalDocument } from "./types";

export const cookiesEn: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Last updated:" },
      {
        type: "text",
        text: " July 2026. This Cookie Policy explains how Compensall uses cookies and similar technologies on our website.",
      },
    ],
  },
  sections: [
    {
      title: "1. What are cookies?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies are small text files stored on your device when you visit a website. They help sites function, remember preferences, and understand how visitors use pages. Similar technologies include local storage and session storage.",
            },
          ],
        },
      ],
    },
    {
      title: "2. How we use cookies",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Compensall uses cookies in the following categories:" }],
        },
        {
          type: "table",
          headers: ["Category", "Purpose"],
          rows: [
            {
              category: "Strictly necessary",
              purpose:
                "Required for core site functions such as security, load balancing, claim session continuity, and remembering choices needed to provide the service you request.",
            },
            {
              category: "Functional",
              purpose:
                "Remember preferences that improve your experience, such as form progress or display settings where enabled.",
            },
            {
              category: "Analytics",
              purpose:
                "Help us understand how visitors use the site so we can improve performance and content. These are only used where permitted and, where required, after consent.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Third-party cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Some cookies may be set by infrastructure or service providers that help us host and operate the website, such as hosting, security, and performance providers. If we enable analytics or marketing tools in future, this policy will be updated to list the relevant providers and retention periods.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Managing cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "You can control cookies through your browser settings. Most browsers let you block or delete cookies. Blocking strictly necessary cookies may prevent parts of the site, including the claim flow, from working correctly.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Where non-essential cookies require consent under applicable law, we will ask for your choice before placing them.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Retention",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Session cookies expire when you close your browser. Persistent cookies remain for a defined period or until you delete them. Retention depends on the cookie purpose and provider.",
            },
          ],
        },
      ],
    },
    {
      title: "6. More information",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "For details on how we process personal data, see our " },
            { type: "link", href: "/privacy-policy", label: "Privacy Policy" },
            { type: "text", text: ". Privacy enquiries: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Changes",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "We may update this Cookie Policy when our use of cookies changes. The latest version will always be available on this page.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Document version 1.0. Last updated July 2026",
};
