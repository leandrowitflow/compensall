import type { LegalDocument } from "./types";

export const noWinNoFeeEs: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Resumen:" },
      {
        type: "text",
        text: " No pagas nada por adelantado ni nada si no recuperamos la compensación en tu nombre. Nuestra comisión de éxito solo se cobra cuando tu reclamación tiene éxito.",
      },
    ],
  },
  sections: [
    {
      title: "1. Descripción del acuerdo",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Este Acuerdo No win, no fee («Acuerdo») se celebra entre el reclamante (usted) y ',
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: ' («la Compañía»). Al continuar con una reclamación a través de la plataforma Compensall, usted acepta estos términos.',
            },
          ],
        },
      ],
    },
    {
      title: "2. Sin costes iniciales",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "No hay comisiones iniciales, de registro ni de administración para presentar su reclamación. No incurrirá en ningún coste si no podemos recuperar la compensación en su nombre.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Comisión de éxito",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Se deducirá una comisión de éxito de la compensación recuperada en su nombre:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Importe de la compensación", "Comisión de éxito"],
          rows: [
            { category: "Hasta 250 €", purpose: "30 % + IVA" },
            { category: "251 € – 400 €", purpose: "30 % + IVA" },
            { category: "401 € – 600 €", purpose: "30 % + IVA" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "La comisión de éxito se deduce antes de transferirle el resto de la compensación. Usted recibirá siempre al menos el 70 % del importe recuperado, antes de ajustes de IVA.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Proceso de pago",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cuando la aerolínea pague la compensación, Compensall deducirá la comisión de éxito acordada y transferirá el saldo restante a la cuenta bancaria que usted indique en un plazo de 5 a 10 días hábiles. Recibirá un desglose completo de la liquidación y de las deducciones.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Cancelación",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Puede cancelar este acuerdo en cualquier momento antes de que se liquide la reclamación, notificándonoslo por escrito a ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Si ya se ha realizado un trabajo sustancial y la aerolínea ha formulado una oferta, puede aplicarse una comisión de cancelación reducida.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Ley aplicable",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Este Acuerdo se rige por las leyes de Inglaterra y Gales. Cualquier litigio quedará sometido a la jurisdicción exclusiva de los tribunales de Inglaterra y Gales.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versión del documento 3.0. Última actualización: enero de 2026",
};
