import type { LegalDocument } from "./types";

export const cookiesNl: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Laatst bijgewerkt:" },
      {
        type: "text",
        text: " juli 2026. Dit cookiebeleid legt uit hoe Compensall cookies en vergelijkbare technologieën op de website inzet.",
      },
    ],
  },
  sections: [
    {
      title: "1. Wat zijn cookies?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Zij helpen pagina’s te functioneren, voorkeuren te onthouden en te begrijpen hoe bezoekers de pagina’s gebruiken. Vergelijkbare technologieën zijn local storage en session storage.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Hoe wij cookies gebruiken",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Compensall zet cookies in de volgende categorieën in:" }],
        },
        {
          type: "table",
          headers: ["Categorie", "Doel"],
          rows: [
            {
              category: "Strikt noodzakelijk",
              purpose:
                "Vereist voor essentiële functies van de website, zoals beveiliging, load balancing, voortzetting van de claimsessie en het opslaan van keuzes die nodig zijn om de door u gevraagde dienst te verlenen.",
            },
            {
              category: "Functioneel",
              purpose:
                "Onthouden voorkeuren die uw gebruik verbeteren, zoals de voortgang in formulieren of weergave-opties, voor zover zij zijn ingeschakeld.",
            },
            {
              category: "Analyse",
              purpose:
                "Helpen ons te begrijpen hoe bezoekers de site gebruiken, om prestaties en inhoud te verbeteren. Zij worden alleen ingezet waar dat is toegestaan en — voor zover vereist — na uw toestemming.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookies van derden",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sommige cookies kunnen worden geplaatst door infrastructuur- of dienstverleners die ons helpen de website te hosten en te exploiteren, zoals aanbieders van hosting, beveiliging en prestaties. Als u analysecookies accepteert, gebruiken wij Google Tag Manager en bijbehorende meet-tags van Google (Google Ireland Limited / Google LLC), waaronder zo nodig Google Analytics, om te begrijpen hoe bezoekers de site gebruiken. Google kan cookies zoals _ga en _ga_* plaatsen en gebruiksgegevens verwerken volgens zijn beleid. Analysecookies worden pas geplaatst nadat u „Alles accepteren” hebt gekozen.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Cookies beheren",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "U kunt cookies beheren via de instellingen van uw browser. De meeste browsers laten toe cookies te blokkeren of te wissen. Het blokkeren van strikt noodzakelijke cookies kan delen van de website — waaronder het claimtraject — belemmeren.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Voor zover niet-noodzakelijke cookies volgens het toepasselijke recht toestemming vereisen, vragen wij u om uw keuze voordat wij ze plaatsen.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Bewaartermijn",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sessiecookies eindigen wanneer u de browser sluit. Persistente cookies blijven voor een vastgestelde tijd of totdat u ze wist. De duur hangt af van het doel van de cookie en van de aanbieder.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Meer informatie",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hoe wij persoonsgegevens verwerken, staat in onze ",
            },
            { type: "link", href: "/privacy-policy", label: "privacyverklaring" },
            { type: "text", text: ". Vragen over privacy: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Wijzigingen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wij kunnen dit cookiebeleid aanpassen wanneer ons gebruik van cookies verandert. De actuele versie vindt u altijd op deze pagina.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Documentversie 1.0. Laatst bijgewerkt: juli 2026",
};
