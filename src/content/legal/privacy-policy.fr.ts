import type { LegalDocument } from "./types";

export const privacyPolicyFr: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Dernière mise à jour :" },
      {
        type: "text",
        text: " juillet 2026. La présente Politique de confidentialité explique comment Compensall collecte, utilise et protège les données personnelles lorsque vous utilisez notre site web et nos services de réclamation.",
      },
    ],
  },
  sections: [
    {
      title: "1. Qui sommes-nous",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), exerçant sous le nom " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' ("' },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: '", "nous", "notre"), est le responsable du traitement des données personnelles traitées via ce site web et les services associés. Adresse enregistrée : ',
            },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Questions relatives à la confidentialité : " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Champ d'application",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cette politique s'applique aux visiteurs de notre site web, aux personnes qui entament ou soumettent une réclamation d'indemnisation et à toute personne qui nous contacte. Si vous soumettez une réclamation, vous devrez également consulter notre document spécifique ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Confidentialité et consentement aux données",
            },
            { type: "text", text: " avant de signer." },
          ],
        },
      ],
    },
    {
      title: "3. Données que nous collectons",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Selon la façon dont vous utilisez Compensall, nous pouvons traiter :",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Données d'identité et de contact :" },
              {
                type: "text",
                text: " nom, adresse e-mail, numéro de téléphone, adresse postale.",
              },
            ],
            [
              { type: "strong", text: "Données de réclamation :" },
              {
                type: "text",
                text: " téléversements de cartes d'embarquement, numéro de vol, itinéraire, référence de réservation, détails de la perturbation, informations sur les passagers et signatures.",
              },
            ],
            [
              { type: "strong", text: "Données financières :" },
              {
                type: "text",
                text: " coordonnées bancaires utilisées pour verser l'indemnisation récupérée.",
              },
            ],
            [
              { type: "strong", text: "Données techniques :" },
              {
                type: "text",
                text: " adresse IP, type de navigateur, informations sur l'appareil, pages visitées et source de référence.",
              },
            ],
            [
              { type: "strong", text: "Communications :" },
              {
                type: "text",
                text: " messages que vous envoyez au support et enregistrements de la correspondance relative à la réclamation.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Comment nous utilisons vos données",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nous utilisons les données personnelles pour :" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Exploiter le site web et fournir notre service de réclamation." }],
            [
              {
                type: "text",
                text: "Lire les informations de la carte d'embarquement et évaluer l'éligibilité au titre du UK261, du CE 261/2004 et des règles connexes.",
              },
            ],
            [
              {
                type: "text",
                text: "Préparer, soumettre et gérer les réclamations d'indemnisation auprès des compagnies aériennes en votre nom.",
              },
            ],
            [
              {
                type: "text",
                text: "Communiquer avec vous concernant l'état de la réclamation, les documents et les paiements.",
              },
            ],
            [
              {
                type: "text",
                text: "Respecter les obligations légales, réglementaires et comptables.",
              },
            ],
            [
              {
                type: "text",
                text: "Renforcer la sécurité, prévenir la fraude et maintenir la qualité du service.",
              },
            ],
            [
              {
                type: "text",
                text: "Envoyer des mises à jour liées au service et, lorsque cela est autorisé, des communications marketing.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Bases juridiques",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Conformément au RGPD du Royaume-Uni et au RGPD de l'UE, nous nous fondons sur :",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Contrat :" },
              { type: "text", text: " pour fournir le service de réclamation que vous demandez." },
            ],
            [
              { type: "strong", text: "Intérêts légitimes :" },
              {
                type: "text",
                text: " pour exploiter, sécuriser et améliorer notre plateforme et mener les réclamations efficacement.",
              },
            ],
            [
              { type: "strong", text: "Obligation légale :" },
              {
                type: "text",
                text: " lorsque la conservation ou la divulgation est requise par la loi.",
              },
            ],
            [
              { type: "strong", text: "Consentement :" },
              {
                type: "text",
                text: " pour le marketing optionnel et les cookies non essentiels, le cas échéant.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Partage de vos données",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nous pouvons partager des données avec :" }],
        },
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "Les compagnies aériennes, régulateurs et organismes de règlement des litiges impliqués dans votre réclamation.",
              },
            ],
            [
              {
                type: "text",
                text: "Les conseillers juridiques et représentants agissant pour votre réclamation.",
              },
            ],
            [
              {
                type: "text",
                text: "Les prestataires de paiement et banques traitant les transferts d'indemnisation.",
              },
            ],
            [
              {
                type: "text",
                text: "Les fournisseurs d'hébergement, de messagerie, de stockage et informatiques sous accords de traitement des données.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nous ne vendons pas vos données personnelles." }],
        },
      ],
    },
    {
      title: "7. Transferts internationaux",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Certains prestataires de services peuvent traiter des données en dehors du Royaume-Uni ou de l'EEE. Lorsque cela se produit, nous utilisons des garanties appropriées, telles que les Clauses Contractuelles Types ou des protections équivalentes exigées par la loi applicable.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Conservation",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les dossiers de réclamation sont généralement conservés jusqu'à 7 ans après la clôture d'un dossier. Les journaux techniques sont conservés pendant une période plus courte, sauf si nécessaire pour des enquêtes de sécurité. Nous supprimons ou anonymisons les données lorsqu'elles ne sont plus nécessaires.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Vos droits",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Vous pouvez avoir le droit d'accéder, de rectifier, d'effacer, de restreindre, de vous opposer ou de porter vos données personnelles, et de retirer votre consentement lorsque le traitement est fondé sur le consentement. Contactez ",
            },
            { type: "email" },
            {
              type: "text",
              text: ". Vous pouvez également déposer une plainte auprès de votre autorité locale de protection des données.",
            },
          ],
        },
      ],
    },
    {
      title: "10. Sécurité",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nous utilisons le chiffrement, des contrôles d'accès et une infrastructure sécurisée pour protéger les données personnelles. Aucun service en ligne ne peut être garanti totalement sécurisé, mais nous travaillons à réduire les risques de manière proportionnée à la sensibilité des informations que nous traitons.",
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
            {
              type: "text",
              text: "Nous utilisons des cookies et des technologies similaires comme décrit dans notre ",
            },
            { type: "link", href: "/cookies", label: "Politique relative aux cookies" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Modifications",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nous pouvons mettre à jour cette politique de temps à autre. Les modifications importantes seront publiées sur cette page avec une date actualisée.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Version du document 1.0. Dernière mise à jour : juillet 2026",
};
