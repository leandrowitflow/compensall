import type { LegalDocument } from "./types";

export const noWinNoFeeSq: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Përmbledhje:" },
      {
        type: "text",
        text: " Nuk paguani asgjë paraprakisht dhe asgjë nëse nuk rikuperojmë kompensimin në emrin tuaj. Tarifa e suksesit merret vetëm kur kërkesa juaj del me sukses.",
      },
    ],
  },
  sections: [
    {
      title: "1. Përmbledhje e marrëveshjes",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Kjo Marrëveshje No win, no fee («Marrëveshja») lidhet mes pretenduesit (ju) dhe ",
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: " («Shoqëria»). Duke vazhduar një kërkesë përmes platformës Compensall, pranoni këto kushte.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Pa kosto paraprake",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nuk ka tarifa paraprake, regjistrimi apo administrimi për të dërguar kërkesën. Nuk do të keni asnjë kosto nëse nuk arrijmë të rikuperojmë kompensimin në emrin tuaj.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Tarifa e suksesit",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Një tarifë suksesi zbritet nga kompensimi i rikuperuar në emrin tuaj:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Shuma e kompensimit", "Tarifa e suksesit"],
          rows: [
            { category: "Deri në 250 €", purpose: "30% + TVSH" },
            { category: "251 € – 400 €", purpose: "30% + TVSH" },
            { category: "401 € – 600 €", purpose: "30% + TVSH" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tarifa e suksesit zbritet para se bilanci i mbetur t’ju transferohet. Do të merrni gjithmonë të paktën 70% të shumës së rikuperuar, para rregullimeve të TVSH-së.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Procesi i pagesës",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pasi kompania ajrore paguan kompensimin, Compensall zbrit tarifën e dakorduar të suksesit dhe transferon bilancin e mbetur në llogarinë tuaj bankare të caktuar brenda 5–10 ditëve pune. Do të merrni një ndarje të plotë të shlyerjes dhe zbritjeve.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Anulimi",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Mund ta anuloni këtë marrëveshje në çdo kohë para se kërkesa të shlyhet, duke na njoftuar me shkrim në ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Nëse puna e rëndësishme është kryer tashmë dhe kompania ka bërë një ofertë, mund të zbatohet një tarifë e reduktuar anulimi.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Ligji i zbatueshëm",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Kjo Marrëveshje rregullohet nga ligjet e Anglisë dhe Uellsit. Çdo mosmarrëveshje i nënshtrohet juridiksionit ekskluziv të gjykatave të Anglisë dhe Uellsit.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versioni i dokumentit 3.0. Përditësimi i fundit: janar 2026",
};
