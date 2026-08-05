import type { LegalDocument } from "./types";

export const noWinNoFeeFr: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Résumé :" },
      {
        type: "text",
        text: " Vous ne payez rien d'avance et rien si nous ne récupérons pas d'indemnisation en votre nom. Nos honoraires de succès ne sont facturés que lorsque votre réclamation aboutit.",
      },
    ],
  },
  sections: [
    {
      title: "1. Présentation de l'accord",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le présent Accord « vous ne payez que si on gagne » (« Accord ») est conclu entre le demandeur (vous) et ",
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: " (« la Société »). En poursuivant une réclamation via la plateforme Compensall, vous acceptez les présentes conditions.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Aucun frais initial",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Il n'y a aucun frais initial, d'inscription ou d'administration pour déposer votre réclamation. Vous n'engagez aucun coût si nous ne parvenons pas à récupérer une indemnisation en votre nom.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Honoraires de succès",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Des honoraires de succès seront déduits de l'indemnisation récupérée en votre nom :",
            },
          ],
        },
        {
          type: "table",
          headers: ["Montant de l'indemnisation", "Honoraires de succès"],
          rows: [
            { category: "Jusqu'à 250€", purpose: "25% + TVA" },
            { category: "251€ – 400€", purpose: "25% + TVA" },
            { category: "401€ – 600€", purpose: "25% + TVA" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les honoraires de succès sont déduits avant le transfert du solde restant. Vous recevez toujours au moins 75% du montant récupéré avant ajustements de TVA.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Processus de paiement",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Une fois l'indemnisation versée par la compagnie aérienne, Compensall déduit les honoraires de succès convenus et transfère le solde restant sur le compte bancaire que vous avez indiqué sous 5 à 10 jours ouvrables. Vous recevez un détail complet du règlement et des déductions.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Résiliation",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Vous pouvez résilier cet accord à tout moment avant le règlement de la réclamation en nous en informant par écrit à ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Si des travaux substantiels ont déjà été réalisés et que la compagnie aérienne a formulé une offre, des frais de résiliation réduits peuvent s'appliquer.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Droit applicable",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le présent Accord est régi par le droit de l'Angleterre et du Pays de Galles. Tout litige relève de la compétence exclusive des tribunaux d'Angleterre et du Pays de Galles.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Version du document 3.0. Dernière mise à jour : janvier 2026",
};
