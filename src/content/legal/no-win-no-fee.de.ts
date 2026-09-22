import type { LegalDocument } from "./types";

export const noWinNoFeeDe: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Kurzüberblick:" },
      {
        type: "text",
        text: " Sie zahlen nichts im Voraus und nichts, wenn wir in Ihrem Namen keine Entschädigung einholen. Unsere Erfolgsgebühr fällt nur an, wenn Ihr Anspruch Erfolg hat.",
      },
    ],
  },
  sections: [
    {
      title: "1. Gegenstand der Vereinbarung",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Diese Vereinbarung No win, no fee („Vereinbarung“) wird zwischen dem Antragsteller (Ihnen) und ",
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: " („das Unternehmen“) geschlossen. Indem Sie einen Anspruch über die Plattform Compensall verfolgen, akzeptieren Sie diese Bedingungen.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Keine Vorabkosten",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Für die Einreichung Ihres Anspruchs fallen keine Anmelde-, Aufnahme- oder Verwaltungsgebühren an. Ihnen entstehen keine Kosten, wenn wir in Ihrem Namen keine Entschädigung einholen.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Erfolgsgebühr",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Von der für Sie eingeholten Entschädigung wird eine Erfolgsgebühr abgezogen:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Entschädigungsbetrag", "Erfolgsgebühr"],
          rows: [
            { category: "Bis 250 €", purpose: "30 % + MwSt." },
            { category: "251 € – 400 €", purpose: "30 % + MwSt." },
            { category: "401 € – 600 €", purpose: "30 % + MwSt." },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Die Erfolgsgebühr wird abgezogen, bevor der Restbetrag überwiesen wird. Sie erhalten stets mindestens 70 % des eingeholten Betrags vor MwSt.-Anpassungen.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Auszahlung",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sobald die Airline die Entschädigung gezahlt hat, zieht Compensall die vereinbarte Erfolgsgebühr ab und überweist den Rest innerhalb von 5 bis 10 Werktagen auf das von Ihnen angegebene Konto. Sie erhalten eine vollständige Abrechnung der Zahlung und der Abzüge.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Kündigung",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Sie können diese Vereinbarung jederzeit vor der Abrechnung des Anspruchs schriftlich kündigen an ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Wenn bereits wesentliche Arbeit geleistet wurde und die Airline ein Angebot unterbreitet hat, kann eine reduzierte Kündigungsgebühr anfallen.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Anwendbares Recht",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Diese Vereinbarung unterliegt dem Recht von England und Wales. Für Streitigkeiten sind ausschließlich die Gerichte von England und Wales zuständig.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentversion 3.0. Letzte Aktualisierung: Januar 2026",
};
