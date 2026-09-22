import type { LegalDocument } from "./types";

export const cookiesDe: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Letzte Aktualisierung:" },
      {
        type: "text",
        text: " Juli 2026. Diese Cookie-Richtlinie erklärt, wie Compensall Cookies und ähnliche Technologien auf der Website einsetzt.",
      },
    ],
  },
  sections: [
    {
      title: "1. Was sind Cookies?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen Seiten zu funktionieren, Einstellungen zu merken und zu verstehen, wie Besucher die Seiten nutzen. Ähnliche Technologien sind Local Storage und Session Storage.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Wie wir Cookies nutzen",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Compensall setzt Cookies in folgenden Kategorien ein:" }],
        },
        {
          type: "table",
          headers: ["Kategorie", "Zweck"],
          rows: [
            {
              category: "Unbedingt erforderlich",
              purpose:
                "Erforderlich für wesentliche Funktionen der Website, etwa Sicherheit, Lastverteilung, Fortsetzung der Antragssitzung und das Speichern von Entscheidungen, die nötig sind, um den von Ihnen gewünschten Dienst zu erbringen.",
            },
            {
              category: "Funktional",
              purpose:
                "Merken sich Einstellungen, die Ihre Nutzung verbessern, etwa den Fortschritt in Formularen oder Anzeigeoptionen, soweit sie aktiviert sind.",
            },
            {
              category: "Analyse",
              purpose:
                "Helfen uns zu verstehen, wie Besucher die Seite nutzen, um Leistung und Inhalte zu verbessern. Sie werden nur eingesetzt, wenn das zulässig ist und — soweit erforderlich — nach Ihrer Einwilligung.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookies Dritter",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Einige Cookies können von Infrastruktur- oder Dienstleistern gesetzt werden, die uns beim Hosting und Betrieb der Website helfen, etwa Anbieter für Hosting, Sicherheit und Performance. Wenn Sie Analyse-Cookies akzeptieren, nutzen wir Google Tag Manager und zugehörige Mess-Tags von Google (Google Ireland Limited / Google LLC), darunter gegebenenfalls Google Analytics, um zu verstehen, wie Besucher die Seite nutzen. Google kann Cookies wie _ga und _ga_* setzen und Nutzungsdaten nach seinen Richtlinien verarbeiten. Analyse-Cookies werden erst gesetzt, nachdem Sie „Alle akzeptieren“ gewählt haben.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Cookies steuern",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sie können Cookies über die Einstellungen Ihres Browsers steuern. Die meisten Browser erlauben das Blockieren oder Löschen von Cookies. Das Blockieren unbedingt erforderlicher Cookies kann Teile der Website — einschließlich des Antragswegs — beeinträchtigen.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Soweit nicht notwendige Cookies nach geltendem Recht eine Einwilligung brauchen, fragen wir Sie, bevor wir sie setzen.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Speicherdauer",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sitzungs-Cookies enden, wenn Sie den Browser schließen. Persistente Cookies bleiben für eine festgelegte Zeit oder bis Sie sie löschen. Die Dauer hängt vom Zweck des Cookies und vom Anbieter ab.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Weitere Informationen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wie wir personenbezogene Daten verarbeiten, steht in unserer ",
            },
            { type: "link", href: "/privacy-policy", label: "Datenschutzerklärung" },
            { type: "text", text: ". Fragen zum Datenschutz: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Änderungen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wir können diese Cookie-Richtlinie anpassen, wenn sich unser Einsatz von Cookies ändert. Die jeweils aktuelle Fassung finden Sie immer auf dieser Seite.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentversion 1.0. Letzte Aktualisierung: Juli 2026",
};
