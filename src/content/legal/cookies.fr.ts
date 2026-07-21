import type { LegalDocument } from "./types";

export const cookiesFr: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Dernière mise à jour :" },
      {
        type: "text",
        text: " juillet 2026. La présente Politique relative aux cookies explique comment Compensall utilise les cookies et technologies similaires sur notre site web.",
      },
    ],
  },
  sections: [
    {
      title: "1. Que sont les cookies ?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils aident les sites à fonctionner, à mémoriser les préférences et à comprendre comment les visiteurs utilisent les pages. Les technologies similaires incluent le stockage local et le stockage de session.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Comment nous utilisons les cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Compensall utilise des cookies dans les catégories suivantes :" },
          ],
        },
        {
          type: "table",
          headers: ["Catégorie", "Finalité"],
          rows: [
            {
              category: "Strictement nécessaires",
              purpose:
                "Requis pour les fonctions essentielles du site, telles que la sécurité, l'équilibrage de charge, la continuité de session de réclamation et la mémorisation des choix nécessaires pour fournir le service que vous demandez.",
            },
            {
              category: "Fonctionnels",
              purpose:
                "Mémorisent les préférences qui améliorent votre expérience, comme la progression des formulaires ou les paramètres d'affichage, lorsqu'ils sont activés.",
            },
            {
              category: "Analytiques",
              purpose:
                "Nous aident à comprendre comment les visiteurs utilisent le site afin d'améliorer les performances et le contenu. Ils ne sont utilisés que lorsque cela est autorisé et, le cas échéant, après consentement.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookies tiers",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Certains cookies peuvent être déposés par des prestataires d'infrastructure ou de services qui nous aident à héberger et exploiter le site web, tels que les fournisseurs d'hébergement, de sécurité et de performance. Si nous activons des outils analytiques ou marketing à l'avenir, cette politique sera mise à jour pour lister les prestataires et périodes de conservation concernés.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Gestion des cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Vous pouvez contrôler les cookies via les paramètres de votre navigateur. La plupart des navigateurs permettent de bloquer ou supprimer les cookies. Bloquer les cookies strictement nécessaires peut empêcher certaines parties du site, y compris le parcours de réclamation, de fonctionner correctement.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Lorsque les cookies non essentiels nécessitent un consentement en vertu de la loi applicable, nous demanderons votre choix avant de les placer.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Conservation",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les cookies de session expirent lorsque vous fermez votre navigateur. Les cookies persistants restent pendant une période définie ou jusqu'à ce que vous les supprimiez. La conservation dépend de la finalité du cookie et du prestataire.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Plus d'informations",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pour plus de détails sur la façon dont nous traitons les données personnelles, consultez notre ",
            },
            { type: "link", href: "/privacy-policy", label: "Politique de confidentialité" },
            { type: "text", text: ". Questions relatives à la confidentialité : " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Modifications",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nous pouvons mettre à jour cette Politique relative aux cookies lorsque notre utilisation des cookies change. La dernière version sera toujours disponible sur cette page.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Version du document 1.0. Dernière mise à jour : juillet 2026",
};
