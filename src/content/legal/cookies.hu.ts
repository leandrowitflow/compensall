import type { LegalDocument } from "./types";

export const cookiesHu: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Utolsó frissítés:" },
      {
        type: "text",
        text: " 2026. július. Ez a Cookie-szabályzat elmagyarázza, hogyan használ a Compensall cookie-kat és hasonló technológiákat a weboldalon.",
      },
    ],
  },
  sections: [
    {
      title: "1. Mik a cookie-k?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A cookie-k kis szöveges fájlok, amelyeket az eszközödön tárolunk, amikor meglátogatsz egy oldalt. Segítenek a működésben, megjegyzik a beállításokat, és megmutatják, hogyan használják a látogatók az oldalakat. Hasonló technológia a helyi tároló és a munkamenet-tároló is.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Hogyan használjuk a cookie-kat",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "A Compensall a következő kategóriákban használ cookie-kat:" }],
        },
        {
          type: "table",
          headers: ["Kategória", "Cél"],
          rows: [
            {
              category: "Feltétlenül szükséges",
              purpose:
                "A működéshez kell: biztonság, terheléselosztás, a kárigény munkamenetének folytonossága, és azok a választások, amelyekkel a kért szolgáltatást tudjuk nyújtani.",
            },
            {
              category: "Funkcionális",
              purpose:
                "Megjegyzik a kényelmi beállításokat, például az űrlap állapotát vagy a megjelenítést, ha ez be van kapcsolva.",
            },
            {
              category: "Elemző",
              purpose:
                "Segítenek megérteni, hogyan használják a látogatók az oldalt, hogy javítsuk a teljesítményt és a tartalmat. Csak akkor használjuk őket, ha ez megengedett, és ahol kell, a hozzájárulásod után.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Harmadik fél cookie-jai",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Egyes cookie-kat az infrastruktúra- vagy szolgáltatók állítanak be, akik a tárhelyben, a biztonságban és a teljesítményben segítenek. Ha elfogadod az elemző cookie-kat, a Google Tag Managert és a kapcsolódó Google-mérési címkéket használjuk (Google Ireland Limited / Google LLC), ideértve a Google Analyticset, hogy lássuk, hogyan használják a látogatók az oldalt. A Google olyan cookie-kat állíthat be, mint a _ga és a _ga_*, és a használati adatokat a saját szabályzatai szerint kezeli. Elemző cookie-t csak akkor helyezünk el, ha az «Összes elfogadása» gombot választod.",
            },
          ],
        },
      ],
    },
    {
      title: "4. A cookie-k kezelése",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A cookie-kat a böngésző beállításaiban tudod szabályozni. A legtöbb böngészőben blokkolhatod vagy törölheted őket. A feltétlenül szükséges cookie-k tiltása az oldal egyes részeit, köztük a kárigény folyamatát, működésképtelenné teheti.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Ha a nem szükséges cookie-khoz a vonatkozó jog hozzájárulást ír elő, a választásodat kérjük, mielőtt elhelyeznénk őket.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Megőrzés",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A munkamenet-cookie-k a böngésző bezárásakor lejárnak. Az állandó cookie-k meghatározott ideig maradnak, vagy amíg törlöd őket. A megőrzés a cookie céljától és a szolgáltatótól függ.",
            },
          ],
        },
      ],
    },
    {
      title: "6. További információ",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A személyes adatok kezeléséről az " },
            { type: "link", href: "/privacy-policy", label: "Adatvédelmi szabályzat" },
            { type: "text", text: " szól. Adatvédelmi kérdés: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Változások",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Ezt a Cookie-szabályzatot frissíthetjük, ha változik a cookie-használat. A legújabb változat mindig ezen az oldalon lesz elérhető.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentumverzió 1.0. Utolsó frissítés: 2026. július",
};
