import type { LegalDocument } from "./types";

export const privacyPolicyNl: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Laatst bijgewerkt:" },
      {
        type: "text",
        text: " juli 2026. Deze privacyverklaring legt uit hoe Compensall persoonsgegevens verzamelt, gebruikt en beschermt wanneer u onze website en claimdienst gebruikt.",
      },
    ],
  },
  sections: [
    {
      title: "1. Wie wij zijn",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), handelend als " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' („' },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: '”, „wij”, „ons”, „onze”), is de verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website en de bijbehorende diensten worden verwerkt. Vestigingsadres: ',
            },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Vragen over privacy: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Toepassingsgebied",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Deze verklaring geldt voor bezoekers van onze website, personen die een compensatieclaim starten of indienen, en iedereen die contact met ons opneemt. Als u een claim indient, leest u ook ons afzonderlijke document ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Privacy en toestemming",
            },
            { type: "text", text: ", voordat u ondertekent." },
          ],
        },
      ],
    },
    {
      title: "3. Gegevens die wij verzamelen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Afhankelijk van hoe u Compensall gebruikt, kunnen wij verwerken:",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Identiteits- en contactgegevens:" },
              {
                type: "text",
                text: " naam, e-mailadres, telefoonnummer, postadres.",
              },
            ],
            [
              { type: "strong", text: "Claimgegevens:" },
              {
                type: "text",
                text: " geüploade instapkaarten, vluchtnummer, traject, boekingsreferentie, gegevens over de verstoring, passagiersgegevens en handtekeningen.",
              },
            ],
            [
              { type: "strong", text: "Financiële gegevens:" },
              {
                type: "text",
                text: " bankgegevens voor de uitbetaling van de geïnde compensatie.",
              },
            ],
            [
              { type: "strong", text: "Technische gegevens:" },
              {
                type: "text",
                text: " IP-adres, browsertype, apparaatinformatie, bezochte pagina’s en herkomst van het verzoek.",
              },
            ],
            [
              { type: "strong", text: "Communicatie:" },
              {
                type: "text",
                text: " berichten aan de support en registraties van de correspondentie over de claim.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Hoe wij uw gegevens gebruiken",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wij gebruiken persoonsgegevens om:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "de website te exploiteren en onze claimdienst te verlenen." }],
            [
              {
                type: "text",
                text: "gegevens van de instapkaart te lezen en het recht te toetsen volgens UK261, Verordening (EG) nr. 261/2004 en verwante regels.",
              },
            ],
            [
              {
                type: "text",
                text: "compensatieclaims jegens airlines namens u voor te bereiden, in te dienen en te voeren.",
              },
            ],
            [
              {
                type: "text",
                text: "u te informeren over status, stukken en betalingen.",
              },
            ],
            [
              {
                type: "text",
                text: "wettelijke, toezichthoudende en boekhoudkundige verplichtingen na te komen.",
              },
            ],
            [
              {
                type: "text",
                text: "de beveiliging te versterken, fraude te voorkomen en de dienstkwaliteit te handhaven.",
              },
            ],
            [
              {
                type: "text",
                text: "dienstgerelateerde updates en, voor zover toegestaan, marketingberichten te sturen.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Rechtsgrondslagen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Volgens de Britse AVG en de EU-AVG (Algemene verordening gegevensbescherming) steunen wij op:",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Overeenkomst:" },
              { type: "text", text: " om de door u gevraagde claimdienst te verlenen." },
            ],
            [
              { type: "strong", text: "Gerechtvaardigd belang:" },
              {
                type: "text",
                text: " om ons platform te exploiteren, te beveiligen en te verbeteren en claims doeltreffend te voeren.",
              },
            ],
            [
              { type: "strong", text: "Wettelijke verplichting:" },
              {
                type: "text",
                text: " wanneer bewaring of openbaarmaking wettelijk is voorgeschreven.",
              },
            ],
            [
              { type: "strong", text: "Toestemming:" },
              {
                type: "text",
                text: " voor optionele marketing en niet-noodzakelijke cookies, voor zover vereist.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Delen van uw gegevens",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wij kunnen gegevens delen met:" }],
        },
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "airlines, toezichthouders en geschilleninstanties die bij uw claim betrokken zijn.",
              },
            ],
            [
              {
                type: "text",
                text: "juridisch adviseurs en vertegenwoordigers die voor uw claim optreden.",
              },
            ],
            [
              {
                type: "text",
                text: "betaaldienstverleners en banken die compensatie-overboekingen uitvoeren.",
              },
            ],
            [
              {
                type: "text",
                text: "aanbieders van hosting, e-mail, opslag en IT onder verwerkersovereenkomsten.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wij verkopen uw persoonsgegevens niet." }],
        },
      ],
    },
    {
      title: "7. Internationale doorgiften",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sommige dienstverleners kunnen gegevens buiten het Verenigd Koninkrijk of de EER verwerken. In dat geval gebruiken wij passende waarborgen, zoals standaardcontractbepalingen of gelijkwaardige wettelijk vereiste beschermingsmaatregelen.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Bewaring",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Claimdossiers worden in de regel tot 7 jaar na afronding van een zaak bewaard. Technische logs bewaren wij korter, tenzij zij nodig zijn voor beveiligingsonderzoek. Gegevens wissen of anonimiseren wij zodra zij niet meer nodig zijn.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Uw rechten",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "U kunt het recht hebben uw persoonsgegevens in te zien, te rectificeren, te wissen, te beperken, bezwaar te maken tegen de verwerking of deze over te dragen, en een toestemming in te trekken voor zover de verwerking op toestemming berust. Schrijf naar ",
            },
            { type: "email" },
            {
              type: "text",
              text: ". U kunt ook een klacht indienen bij uw lokale privacytoezichthouder (in Nederland de Autoriteit Persoonsgegevens).",
            },
          ],
        },
      ],
    },
    {
      title: "10. Beveiliging",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wij zetten versleuteling, toegangsbeheer en een beveiligde infrastructuur in om persoonsgegevens te beschermen. Geen onlinedienst is volledig risicovrij; wij beperken risico’s naar evenredigheid van de gevoeligheid van de verwerkte informatie.",
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
              text: "Wij gebruiken cookies en vergelijkbare technologieën zoals beschreven in ons ",
            },
            { type: "link", href: "/cookies", label: "cookiebeleid" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Wijzigingen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wij kunnen deze verklaring van tijd tot tijd bijwerken. Wezenlijke wijzigingen publiceren wij op deze pagina met een nieuwe datum.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Documentversie 1.0. Laatst bijgewerkt: juli 2026",
};
