import type { LegalDocument } from "./types";

export const noWinNoFeeNl: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Kort overzicht:" },
      {
        type: "text",
        text: " U betaalt niets vooraf en niets als wij namens u geen compensatie innen. Onze succesfee geldt alleen als uw claim slaagt.",
      },
    ],
  },
  sections: [
    {
      title: "1. Voorwerp van de overeenkomst",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Deze overeenkomst No win, no fee („Overeenkomst”) wordt gesloten tussen de claimant (u) en ",
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: " („de Onderneming”). Door een claim via het platform Compensall te vervolgen, aanvaardt u deze voorwaarden.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Geen voorafkosten",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Voor het indienen van uw claim gelden geen inschrijvings-, opname- of administratiekosten. U maakt geen kosten als wij namens u geen compensatie innen.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Succesfee",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Van de voor u geïnde compensatie wordt een succesfee afgetrokken:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Compensatiebedrag", "Succesfee"],
          rows: [
            { category: "Tot 250 €", purpose: "30 % + btw" },
            { category: "251 € – 400 €", purpose: "30 % + btw" },
            { category: "401 € – 600 €", purpose: "30 % + btw" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "De succesfee wordt afgetrokken voordat het restant wordt overgemaakt. U ontvangt altijd minstens 70 % van het geïnde bedrag vóór btw-aanpassingen.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Uitbetaling",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Zodra de airline de compensatie heeft betaald, trekt Compensall de overeengekomen succesfee af en maakt het restant binnen 5 tot 10 werkdagen over naar de door u opgegeven rekening. U ontvangt een volledige afrekening van de betaling en de aftrekposten.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Opzegging",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "U kunt deze overeenkomst te allen tijde vóór de afrekening van de claim schriftelijk opzeggen via ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Als al wezenlijk werk is verricht en de airline een aanbod heeft gedaan, kan een verlaagde opzeggingsfee gelden.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Toepasselijk recht",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Deze overeenkomst valt onder het recht van Engeland en Wales. Voor geschillen zijn uitsluitend de rechterlijke instanties van Engeland en Wales bevoegd.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Documentversie 3.0. Laatst bijgewerkt: januari 2026",
};
