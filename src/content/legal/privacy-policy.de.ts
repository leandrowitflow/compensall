import type { LegalDocument } from "./types";

export const privacyPolicyDe: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Letzte Aktualisierung:" },
      {
        type: "text",
        text: " Juli 2026. Diese Datenschutzerklärung erklärt, wie Compensall personenbezogene Daten erhebt, nutzt und schützt, wenn Sie unsere Website und den Antragsservice nutzen.",
      },
    ],
  },
  sections: [
    {
      title: "1. Wer wir sind",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), handelnd als " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' („' },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: '“, „wir“, „uns“, „unser“), ist der Verantwortliche für die personenbezogenen Daten, die über diese Website und die zugehörigen Dienste verarbeitet werden. Sitz: ',
            },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Fragen zum Datenschutz: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Geltungsbereich",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Diese Erklärung gilt für Besucher unserer Website, Personen, die einen Entschädigungsantrag beginnen oder einreichen, und alle, die uns kontaktieren. Wenn Sie einen Antrag einreichen, lesen Sie bitte auch unser gesondertes Dokument ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Datenschutz und Einwilligung",
            },
            { type: "text", text: ", bevor Sie unterschreiben." },
          ],
        },
      ],
    },
    {
      title: "3. Daten, die wir erheben",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Je nachdem, wie Sie Compensall nutzen, können wir verarbeiten:",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Identitäts- und Kontaktdaten:" },
              {
                type: "text",
                text: " Name, E-Mail-Adresse, Telefonnummer, Postanschrift.",
              },
            ],
            [
              { type: "strong", text: "Antragsdaten:" },
              {
                type: "text",
                text: " hochgeladene Bordkarten, Flugnummer, Strecke, Buchungsreferenz, Angaben zur Störung, Fluggastdaten und Unterschriften.",
              },
            ],
            [
              { type: "strong", text: "Finanzdaten:" },
              {
                type: "text",
                text: " Bankverbindung für die Auszahlung der eingeholten Entschädigung.",
              },
            ],
            [
              { type: "strong", text: "Technische Daten:" },
              {
                type: "text",
                text: " IP-Adresse, Browsertyp, Geräteinformationen, besuchte Seiten und Herkunft der Anfrage.",
              },
            ],
            [
              { type: "strong", text: "Kommunikation:" },
              {
                type: "text",
                text: " Nachrichten an den Support und Aufzeichnungen der Korrespondenz zum Anspruch.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Wie wir Ihre Daten nutzen",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wir nutzen personenbezogene Daten, um:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "die Website zu betreiben und unseren Antragsservice zu erbringen." }],
            [
              {
                type: "text",
                text: "Angaben der Bordkarte zu lesen und die Berechtigung nach UK261, der Verordnung (EG) Nr. 261/2004 und verwandten Regeln zu prüfen.",
              },
            ],
            [
              {
                type: "text",
                text: "Entschädigungsansprüche gegenüber Airlines in Ihrem Namen vorzubereiten, einzureichen und zu führen.",
              },
            ],
            [
              {
                type: "text",
                text: "Sie über Status, Unterlagen und Zahlungen zu informieren.",
              },
            ],
            [
              {
                type: "text",
                text: "gesetzliche, aufsichtsrechtliche und buchhalterische Pflichten zu erfüllen.",
              },
            ],
            [
              {
                type: "text",
                text: "Sicherheit zu stärken, Betrug vorzubeugen und die Servicequalität zu halten.",
              },
            ],
            [
              {
                type: "text",
                text: "dienstbezogene Updates und, soweit zulässig, Marketingmitteilungen zu senden.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Rechtsgrundlagen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nach der britischen DSGVO und der EU-DSGVO stützen wir uns auf:",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Vertrag:" },
              { type: "text", text: " um den von Ihnen gewünschten Antragsservice zu erbringen." },
            ],
            [
              { type: "strong", text: "Berechtigte Interessen:" },
              {
                type: "text",
                text: " um unsere Plattform zu betreiben, zu sichern und zu verbessern und Ansprüche wirksam zu führen.",
              },
            ],
            [
              { type: "strong", text: "Rechtliche Verpflichtung:" },
              {
                type: "text",
                text: " wenn Speicherung oder Offenlegung gesetzlich vorgeschrieben ist.",
              },
            ],
            [
              { type: "strong", text: "Einwilligung:" },
              {
                type: "text",
                text: " für optionales Marketing und nicht notwendige Cookies, soweit erforderlich.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Weitergabe Ihrer Daten",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wir können Daten teilen mit:" }],
        },
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "Airlines, Aufsichtsbehörden und Streitbeilegungsstellen, die an Ihrem Anspruch beteiligt sind.",
              },
            ],
            [
              {
                type: "text",
                text: "Rechtsberatern und Vertretern, die für Ihren Anspruch tätig werden.",
              },
            ],
            [
              {
                type: "text",
                text: "Zahlungsdienstleistern und Banken, die Entschädigungsüberweisungen ausführen.",
              },
            ],
            [
              {
                type: "text",
                text: "Anbietern für Hosting, E-Mail, Speicherung und IT unter Auftragsverarbeitungsverträgen.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wir verkaufen Ihre personenbezogenen Daten nicht." }],
        },
      ],
    },
    {
      title: "7. Internationale Übermittlungen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Einige Dienstleister können Daten außerhalb des Vereinigten Königreichs oder des EWR verarbeiten. In diesem Fall nutzen wir geeignete Garantien, etwa Standardvertragsklauseln oder gleichwertige gesetzlich geforderte Schutzmaßnahmen.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Speicherung",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Antragsakten werden in der Regel bis zu 7 Jahre nach Abschluss eines Vorgangs aufbewahrt. Technische Protokolle speichern wir kürzer, sofern sie nicht für Sicherheitsuntersuchungen nötig sind. Daten löschen oder anonymisieren wir, sobald sie nicht mehr erforderlich sind.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Ihre Rechte",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sie können das Recht haben, Ihre personenbezogenen Daten einzusehen, zu berichtigen, zu löschen, einzuschränken, der Verarbeitung zu widersprechen oder sie zu übertragen und eine Einwilligung zu widerrufen, soweit die Verarbeitung auf Einwilligung beruht. Schreiben Sie an ",
            },
            { type: "email" },
            {
              type: "text",
              text: ". Sie können sich außerdem bei Ihrer örtlichen Datenschutzaufsicht beschweren (in Deutschland beim Bundesbeauftragten für den Datenschutz und die Informationsfreiheit, BfDI, oder bei der zuständigen Landesbehörde).",
            },
          ],
        },
      ],
    },
    {
      title: "10. Sicherheit",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wir setzen Verschlüsselung, Zugriffskontrollen und eine gesicherte Infrastruktur ein, um personenbezogene Daten zu schützen. Kein Onlinedienst ist vollständig risikofrei; wir reduzieren Risiken im Verhältnis zur Sensibilität der verarbeiteten Informationen.",
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
              text: "Wir nutzen Cookies und ähnliche Technologien wie in unserer ",
            },
            { type: "link", href: "/cookies", label: "Cookie-Richtlinie" },
            { type: "text", text: " beschrieben." },
          ],
        },
      ],
    },
    {
      title: "12. Änderungen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wir können diese Erklärung von Zeit zu Zeit aktualisieren. Wesentliche Änderungen veröffentlichen wir auf dieser Seite mit neuem Datum.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentversion 1.0. Letzte Aktualisierung: Juli 2026",
};
