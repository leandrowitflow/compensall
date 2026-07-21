import type { LegalDocument } from "./types";

export const termsFr: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Résumé :" },
      {
        type: "text",
        text: " En utilisant Compensall, vous acceptez les présentes Conditions d'utilisation. Notre travail de réclamation est fourni sur une base pas de gain, pas de frais, sous réserve de l'accord tarifaire distinct que vous signez lors de la soumission d'une réclamation.",
      },
    ],
  },
  sections: [
    {
      title: "1. Accord",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Les présentes Conditions d\'utilisation (« Conditions ») régissent votre accès au site web, aux outils et aux services associés de Compensall (le « Service ») ainsi que leur utilisation. En utilisant le Service, vous acceptez ces Conditions et notre ',
            },
            { type: "link", href: "/privacy-policy", label: "Politique de confidentialité" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "2. Qui peut utiliser le Service",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Vous devez avoir au moins 18 ans et être légalement capable de conclure des contrats contraignants. Si vous soumettez une réclamation pour un autre passager, vous confirmez que vous avez l'autorité d'agir en son nom.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Notre Service",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " aide les passagers aériens à évaluer et à mener des réclamations d'indemnisation de vol, principalement au titre du Règlement UK261 du Royaume-Uni et du Règlement CE 261/2004 de l'UE et des règles connexes sur les droits des passagers. Nous fournissons des outils numériques, des vérifications assistées, la préparation de documents et une gestion des réclamations avec un accompagnement humain.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nous ne garantissons pas qu'une réclamation aboutira. L'éligibilité dépend des faits de votre voyage, de la réponse de la compagnie aérienne et de la loi applicable.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Soumettre une réclamation",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Lorsque vous soumettez une réclamation, vous acceptez de :" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Fournir des informations exactes et complètes." }],
            [
              {
                type: "text",
                text: "Téléverser des documents que vous êtes autorisé à partager et qui se rapportent à votre réclamation.",
              },
            ],
            [
              {
                type: "text",
                text: "Signer les documents juridiques requis, notamment le Mandat d'agir, l'Accord pas de gain pas de frais et le Consentement confidentialité et données.",
              },
            ],
            [
              {
                type: "text",
                text: "Ne pas poursuivre la même réclamation de manière indépendante auprès de la compagnie aérienne pendant que nous agissons pour vous, sauf accord écrit contraire.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Consultez nos documents de réclamation : " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Pas de gain, pas de frais" },
            { type: "text", text: ", " },
            { type: "link", href: "/documents/authority-to-act", label: "Mandat d'agir" },
            { type: "text", text: " et " },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Confidentialité et consentement aux données",
            },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "5. Frais",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "L'accès au site web et les vérifications d'éligibilité sont gratuits. Si vous nous mandatez pour poursuivre une indemnisation, nos frais ne s'appliquent qu'en cas de succès, conformément à l'Accord pas de gain pas de frais. Vous ne payez rien si nous ne récupérons pas d'indemnisation pour vous, sous réserve des termes de cet accord.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Vos responsabilités",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Vous acceptez de ne pas :" }],
        },
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "Utiliser abusivement le Service ou tenter d'accéder à nos systèmes sans autorisation.",
              },
            ],
            [
              {
                type: "text",
                text: "Soumettre des réclamations ou documents faux, trompeurs ou frauduleux.",
              },
            ],
            [
              {
                type: "text",
                text: "Utiliser le Service en violation de la loi applicable ou des droits de tiers.",
              },
            ],
            [
              {
                type: "text",
                text: "Copier, extraire ou exploiter commercialement notre contenu sans autorisation.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "7. Propriété intellectuelle",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le nom Compensall, la marque, le contenu du site web, les logiciels et les matériaux appartiennent à Compensall ou lui sont concédés sous licence. Vous recevez une licence limitée et non exclusive pour utiliser le Service à des fins personnelles de réclamation.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Avertissement",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le Service fournit des informations générales et une assistance à la réclamation. Il ne constitue pas un conseil juridique. Le contenu du site web est fourni à titre informatif et peut ne pas refléter les évolutions juridiques les plus récentes dans toutes les juridictions.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Limitation de responsabilité",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dans toute la mesure permise par la loi, Compensall n'est pas responsable des pertes indirectes, accessoires ou consécutives, ni des décisions des compagnies aériennes, des issues judiciaires ou des retards indépendants de notre contrôle raisonnable. Rien dans ces Conditions ne limite une responsabilité qui ne peut être limitée en vertu de la loi applicable, y compris la responsabilité pour fraude ou décès ou blessures corporelles causés par négligence.",
            },
          ],
        },
      ],
    },
    {
      title: "10. Suspension et résiliation",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nous pouvons suspendre ou résilier l'accès au Service si vous enfreignez ces Conditions ou si la poursuite du service créerait un risque juridique ou de sécurité. Vous pouvez cesser d'utiliser le Service à tout moment. Les droits d'annulation spécifiques à la réclamation sont décrits dans vos documents de réclamation signés.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Droit applicable",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Ces Conditions sont régies par les lois d'Angleterre et du Pays de Galles. Les tribunaux d'Angleterre et du Pays de Galles ont compétence exclusive, sauf lorsque les lois impératives de protection des consommateurs de votre pays de résidence vous confèrent le droit d'intenter une action ailleurs.",
            },
          ],
        },
      ],
    },
    {
      title: "12. Contact",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Questions concernant ces Conditions : " },
            { type: "email" },
          ],
        },
      ],
    },
  ],
  footer: "Version du document 1.0. Dernière mise à jour : juillet 2026",
};
