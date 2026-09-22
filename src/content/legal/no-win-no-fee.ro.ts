import type { LegalDocument } from "./types";

export const noWinNoFeeRo: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Rezumat:" },
      {
        type: "text",
        text: " Nu plătiți nimic în avans și nimic dacă nu recuperăm despăgubirea în numele dumneavoastră. Comisionul nostru de succes se percepe doar când cererea dumneavoastră reușește.",
      },
    ],
  },
  sections: [
    {
      title: "1. Descrierea acordului",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Acest Acord No win, no fee («Acordul») se încheie între reclamant (dumneavoastră) și ',
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: ' («Societatea»). Continuând o cerere prin platforma Compensall, acceptați acești termeni.',
            },
          ],
        },
      ],
    },
    {
      title: "2. Fără costuri inițiale",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nu există comisioane de deschidere, de înregistrare sau de administrare pentru a depune cererea. Nu veți suporta niciun cost dacă nu putem recupera despăgubirea în numele dumneavoastră.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Comisionul de succes",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Un comision de succes va fi reținut din despăgubirea recuperată în numele dumneavoastră:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Suma despăgubirii", "Comision de succes"],
          rows: [
            { category: "Până la 250 €", purpose: "30 % + TVA" },
            { category: "251 € – 400 €", purpose: "30 % + TVA" },
            { category: "401 € – 600 €", purpose: "30 % + TVA" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Comisionul de succes se deduce înainte de a vă transfera restul despăgubirii. Veți primi întotdeauna cel puțin 70 % din suma recuperată, înainte de ajustări de TVA.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Procesul de plată",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Când compania aeriană plătește despăgubirea, Compensall va reține comisionul de succes convenit și va transfera soldul rămas în contul bancar indicat de dumneavoastră în 5–10 zile lucrătoare. Veți primi un decont complet al lichidării și al reținerilor.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Reziliere",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Puteți rezilia acest acord oricând înainte de lichidarea cererii, notificându-ne în scris la ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Dacă s-a desfășurat deja o muncă substanțială și compania a formulat o ofertă, se poate aplica un comision de reziliere redus.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Legea aplicabilă",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Acest Acord este guvernat de legile Angliei și Țării Galilor. Orice litigiu va fi supus jurisdicției exclusive a instanțelor din Anglia și Țara Galilor.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versiunea documentului 3.0. Ultima actualizare: ianuarie 2026",
};
