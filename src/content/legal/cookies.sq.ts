import type { LegalDocument } from "./types";

export const cookiesSq: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Përditësimi i fundit:" },
      {
        type: "text",
        text: " korrik 2026. Kjo Politikë e Cookies shpjegon se si Compensall përdor cookies dhe teknologji të ngjashme në faqen e internetit.",
      },
    ],
  },
  sections: [
    {
      title: "1. Çfarë janë cookies?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies janë skedarë të vegjël teksti që ruhen në pajisjen tënde kur viziton një faqe. Ato ndihmojnë funksionimin, mbajnë mend preferencat dhe tregojnë si e përdorin vizitorët faqet. Teknologji të ngjashme janë edhe ruajtja lokale dhe ajo e sesionit.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Si i përdorim cookies",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Compensall i përdor cookies në këto kategori:" }],
        },
        {
          type: "table",
          headers: ["Kategoria", "Qëllimi"],
          rows: [
            {
              category: "Rreptësisht të nevojshme",
              purpose:
                "Të domosdoshme për funksionet bazë: siguri, shpërndarje ngarkese, vazhdimësi e sesionit të kërkesës dhe kujtim i zgjedhjeve që duhen për shërbimin që kërkon.",
            },
            {
              category: "Funksionale",
              purpose:
                "Mbajnë mend preferenca që e përmirësojnë përvojën, si ecuria e formularit ose cilësimet e shfaqjes, kur janë të aktivizuara.",
            },
            {
              category: "Analitike",
              purpose:
                "Na ndihmojnë të kuptojmë si e përdorin vizitorët faqen, që të përmirësojmë performancën dhe përmbajtjen. Përdoren vetëm kur lejohet dhe, kur kërkohet, pas pëlqimit.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookies të palëve të treta",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Disa cookies mund t’i vendosin ofruesit e infrastrukturës ose shërbimeve që na ndihmojnë të presim dhe të operojmë faqen, si hosting, siguri dhe performancë. Kur pranon cookies analitike, përdorim Google Tag Manager dhe etiketat e matjes të Google (Google Ireland Limited / Google LLC), që mund të përfshijnë Google Analytics, për të kuptuar si e përdorin vizitorët faqen. Google mund të vendosë cookies si _ga dhe _ga_* dhe t’i përpunojë të dhënat sipas politikave të veta. Cookies analitike vendosen vetëm pasi zgjedh «Pranoji të gjitha».",
            },
          ],
        },
      ],
    },
    {
      title: "4. Menaxhimi i cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies i kontrollon nga cilësimet e shfletuesit. Shumica e shfletuesve të lejojnë t’i bllokosh ose t’i fshish. Bllokimi i cookies rreptësisht të nevojshme mund të pengojë pjesë të faqes, përfshirë rrjedhën e kërkesës.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Kur cookies jo thelbësore kërkojnë pëlqim sipas ligjit të zbatueshëm, do të të pyesim para se t’i vendosim.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Ruajtja",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies e sesionit skadojnë kur e mbyll shfletuesin. Cookies e qëndrueshme mbeten për një periudhë të caktuar ose derisa t’i fshish. Ruajtja varet nga qëllimi dhe ofruesi.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Më shumë informacion",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Për detaje se si i përpunojmë të dhënat personale, shih " },
            { type: "link", href: "/privacy-policy", label: "Politikën e Privatësisë" },
            { type: "text", text: ". Pyetje për privatësinë: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Ndryshimet",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Mund ta përditësojmë këtë Politikë të Cookies kur ndryshon përdorimi ynë i cookies. Versioni i fundit do të jetë gjithmonë në këtë faqe.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versioni i dokumentit 1.0. Përditësimi i fundit: korrik 2026",
};
