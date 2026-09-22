import type { LegalDocument } from "./types";

export const privacyPolicySq: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Përditësimi i fundit:" },
      {
        type: "text",
        text: " korrik 2026. Kjo Politikë Privatësie shpjegon se si Compensall i mbledh, i përdor dhe i mbron të dhënat personale kur përdorni faqen dhe shërbimet e kërkesës.",
      },
    ],
  },
  sections: [
    {
      title: "1. Kush jemi",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), që vepron si " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' («' },
            { type: "brand", field: "brandName" },
            { type: "text", text: "», «ne»), është kontrolluesi i të dhënave personale të përpunuara përmes kësaj faqeje dhe shërbimeve të lidhura. Adresa e regjistruar: " },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Pyetje për privatësinë: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Çfarë mbulon kjo politikë",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Kjo politikë vlen për vizitorët e faqes, personat që nisin ose dërgojnë një kërkesë kompensimi, dhe këdo që na kontakton. Nëse dërgoni një kërkesë, do t’ju kërkohet edhe të shqyrtoni dokumentin specifik ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Privatësia dhe pëlqimi për të dhënat",
            },
            { type: "text", text: " para nënshkrimit." },
          ],
        },
      ],
    },
    {
      title: "3. Të dhënat që mbledhim",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Sipas mënyrës si e përdorni Compensall, mund të përpunojmë:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Të dhëna identifikimi dhe kontakti:" },
              { type: "text", text: " emër, email, telefon, adresë postare." },
            ],
            [
              { type: "strong", text: "Të dhëna të kërkesës:" },
              {
                type: "text",
                text: " ngarkime të kartës së imbarkimit, numër fluturimi, itinerar, referencë rezervimi, detaje të ndërprerjes, të dhëna pasagjeri dhe nënshkrime.",
              },
            ],
            [
              { type: "strong", text: "Të dhëna financiare:" },
              { type: "text", text: " të dhëna bankare për të paguar kompensimin e rikuperuar." },
            ],
            [
              { type: "strong", text: "Të dhëna teknike:" },
              {
                type: "text",
                text: " adresë IP, lloj shfletuesi, informacion pajisjeje, faqe të vizituara dhe burim referimi.",
              },
            ],
            [
              { type: "strong", text: "Komunikime:" },
              { type: "text", text: " mesazhet që i dërgoni mbështetjes dhe regjistrat e korrespondencës së kërkesës." },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Si i përdorim të dhënat",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Të dhënat personale i përdorim për të:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Operuar faqen dhe ofruar shërbimin e kërkesës." }],
            [
              {
                type: "text",
                text: "Lexuar informacionin e kartës së imbarkimit dhe vlerësuar të drejtën sipas UK261 dhe 261/2004/KE dhe rregullave të lidhura.",
              },
            ],
            [
              {
                type: "text",
                text: "Përgatitur, dërguar dhe menaxhuar kërkesat e kompensimit te kompanitë ajrore në emrin tuaj.",
              },
            ],
            [{ type: "text", text: "Komunikuar me ju për statusin e kërkesës, dokumentet dhe pagesat." }],
            [{ type: "text", text: "Përmbushur detyrimet ligjore, rregullatore dhe kontabël." }],
            [{ type: "text", text: "Përmirësuar sigurinë, parandaluar mashtrimin dhe mbajtur cilësinë e shërbimit." }],
            [
              {
                type: "text",
                text: "Dërguar përditësime të shërbimit dhe, kur lejohet, komunikime marketingu.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Bazat ligjore",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Sipas GDPR të MB dhe GDPR të BE-së, mbështetemi te:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Kontrata:" },
              { type: "text", text: " për të ofruar shërbimin e kërkesës që kërkoni." },
            ],
            [
              { type: "strong", text: "Intereset e ligjshme:" },
              {
                type: "text",
                text: " për të operuar, siguruar dhe përmirësuar platformën dhe për të ndjekur kërkesat në mënyrë efikase.",
              },
            ],
            [
              { type: "strong", text: "Detyrimi ligjor:" },
              { type: "text", text: " kur ruajtja ose zbulimi kërkohet me ligj." },
            ],
            [
              { type: "strong", text: "Pëlqimi:" },
              {
                type: "text",
                text: " për marketing opsional dhe cookies jo thelbësore, kur zbatohet.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Ndarja e të dhënave",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Mund t’i ndajmë të dhënat me:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Kompani ajrore, rregullatorë dhe organe zgjidhjeje të përfshira në kërkesën tuaj." }],
            [{ type: "text", text: "Këshilltarë dhe përfaqësues ligjorë që veprojnë për kërkesën tuaj." }],
            [{ type: "text", text: "Ofrues pagesash dhe banka që trajtojnë transferimet e kompensimit." }],
            [{ type: "text", text: "Ofrues hosting, email, ruajtjeje dhe IT, me marrëveshje përpunimi të dhënash." }],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nuk i shesim të dhënat tuaja personale." }],
        },
      ],
    },
    {
      title: "7. Transferime ndërkombëtare",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Disa ofrues mund t’i përpunojnë të dhënat jashtë MB ose ZEE. Kur ndodh kjo, përdorim masa mbrojtëse të përshtatshme, si Klauzolat Standarde Kontraktuale ose mbrojtje ekuivalente që kërkon ligji i zbatueshëm.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Ruajtja",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Regjistrat e kërkesës zakonisht ruhen deri në 7 vjet pas mbylljes së çështjes. Regjistrat teknikë mbahen për një periudhë më të shkurtër, përveçse kur duhen për hetime sigurie. I fshijmë ose i anonimizojmë të dhënat kur nuk nevojiten më.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Të drejtat tuaja",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Mund të keni të drejtën e aksesit, korrigjimit, fshirjes, kufizimit, kundërshtimit ose portueshmërisë së të dhënave, dhe të tërhiqni pëlqimin kur përpunimi bazohet te pëlqimi. Na shkruani te ",
            },
            { type: "email" },
            {
              type: "text",
              text: ". Mund të ankimoheni edhe te autoriteti lokal i mbrojtjes së të dhënave (në Shqipëri, KDIMDP).",
            },
          ],
        },
      ],
    },
    {
      title: "10. Siguria",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Përdorim enkriptim, kontrolle aksesi dhe infrastrukturë të sigurt për të mbrojtur të dhënat personale. Asnjë shërbim online nuk mund të garantohet i sigurt plotësisht, por punojmë për ta ulur rrezikun në përpjesëtim me ndjeshmërinë e informacionit që trajtojmë.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Përdorim cookies dhe teknologji të ngjashme siç përshkruhet në " },
            { type: "link", href: "/cookies", label: "Politikën e Cookies" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Ndryshimet",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Mund ta përditësojmë këtë politikë herë pas here. Ndryshimet materiale do të publikohen në këtë faqe me datë të përditësuar.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versioni i dokumentit 1.0. Përditësimi i fundit: korrik 2026",
};
