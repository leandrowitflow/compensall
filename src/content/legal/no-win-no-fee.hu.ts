import type { LegalDocument } from "./types";

export const noWinNoFeeHu: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Összefoglaló:" },
      {
        type: "text",
        text: " Előre semmit nem fizet, és akkor sem fizet, ha nem sikerül kártérítést visszaszereznünk az Ön nevében. A sikerdíjat csak akkor számítjuk fel, ha a kárigény sikeres.",
      },
    ],
  },
  sections: [
    {
      title: "1. A megállapodás leírása",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Ez a No win, no fee Megállapodás («Megállapodás») a kérelmező (Ön) és a ",
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: " («a Társaság») között jön létre. Ha kárigényt indít a Compensall platformon, elfogadja ezeket a feltételeket.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Nincs előzetes költség",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nincs nyitási, regisztrációs vagy ügyintézési díj a kárigény benyújtásához. Semmilyen költsége nem merül fel, ha nem tudunk kártérítést visszaszerezni az Ön nevében.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Sikerdíj",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A sikerdíjat az Ön nevében visszaszerzett kártérítésből vonjuk le:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Visszaszerzett kártérítés", "Sikerdíj"],
          rows: [
            { category: "250 €-ig", purpose: "30% + áfa" },
            { category: "251–400 €", purpose: "30% + áfa" },
            { category: "401–600 €", purpose: "30% + áfa" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A sikerdíjat a fennmaradó összeg átutalása előtt vonjuk le. Az áfa-korrekciók előtt mindig legalább a visszaszerzett összeg 70%-át kapja meg.",
            },
          ],
        },
      ],
    },
    {
      title: "4. A kifizetés menete",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Amikor a légitársaság kifizeti a kártérítést, a Compensall levonja a megállapodott sikerdíjat, és a fennmaradó összeget 5–10 munkanapon belül átutalja az Ön által megadott bankszámlára. Teljes elszámolást kap a rendezésről és a levonásokról.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Felmondás",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A megállapodást a kárigény rendezése előtt bármikor felmondhatja írásban a ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: " címen. Ha már jelentős munka készült el, és a légitársaság ajánlatot tett, csökkentett felmondási díj merülhet fel.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Irányadó jog",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Erre a Megállapodásra Anglia és Wales joga az irányadó. A vitákra Anglia és Wales bíróságainak kizárólagos illetékessége vonatkozik.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentumverzió 3.0. Utolsó frissítés: 2026. január",
};
