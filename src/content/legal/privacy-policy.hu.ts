import type { LegalDocument } from "./types";

export const privacyPolicyHu: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Utolsó frissítés:" },
      {
        type: "text",
        text: " 2026. július. Ez az Adatvédelmi szabályzat elmagyarázza, hogyan gyűjti, használja és védi a Compensall a személyes adatokat, amikor a weboldalt és a kárigény-szolgáltatást használja.",
      },
    ],
  },
  sections: [
    {
      title: "1. Kik vagyunk",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), amely " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' («' },
            { type: "brand", field: "brandName" },
            { type: "text", text: '", «mi») néven működik, az adatkezelő a weboldalon és a kapcsolódó szolgáltatásokban kezelt személyes adatok tekintetében. Székhely: ' },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Adatvédelmi kérdés: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Mire vonatkozik ez a szabályzat",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A szabályzat a weboldal látogatóira, azokra, akik kárigényt indítanak vagy nyújtanak be, és mindenkire vonatkozik, aki kapcsolatba lép velünk. Ha kárigényt nyújt be, a aláírás előtt a kárigényre vonatkozó ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Adatvédelmi és hozzájárulási",
            },
            { type: "text", text: " dokumentumot is át kell tekintenie." },
          ],
        },
      ],
    },
    {
      title: "3. Milyen adatokat gyűjtünk",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Attól függően, hogyan használja a Compensallt, kezelhetünk:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Azonosító és kapcsolattartási adatok:" },
              { type: "text", text: " név, e-mail-cím, telefonszám, postacím." },
            ],
            [
              { type: "strong", text: "Kárigényadatok:" },
              {
                type: "text",
                text: " beszállókártya-feltöltések, járatszám, útvonal, foglalási hivatkozás, a zavar részletei, utasadatok és aláírások.",
              },
            ],
            [
              { type: "strong", text: "Pénzügyi adatok:" },
              { type: "text", text: " bankszámlaadatok a visszaszerzett kártérítés kifizetéséhez." },
            ],
            [
              { type: "strong", text: "Technikai adatok:" },
              {
                type: "text",
                text: " IP-cím, böngészőtípus, eszközadatok, meglátogatott oldalak és a hivatkozó forrás.",
              },
            ],
            [
              { type: "strong", text: "Kommunikáció:" },
              { type: "text", text: " az ügyfélszolgálatnak küldött üzenetek és a kárigény-levelezés." },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Hogyan használjuk az adatait",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "A személyes adatokat arra használjuk, hogy:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Működtessük a weboldalt, és nyújtsuk a kárigény-szolgáltatást." }],
            [
              {
                type: "text",
                text: "Olvassuk a beszállókártya adatait, és megítéljük a jogosultságot a UK261, a 261/2004/EK rendelet és a kapcsolódó szabályok szerint.",
              },
            ],
            [
              {
                type: "text",
                text: "Előkészítsük, benyújtsuk és kezeljük a kártérítési igényeket a légitársaságoknál az Ön nevében.",
              },
            ],
            [{ type: "text", text: "Tájékoztassuk a kárigény állapotáról, a dokumentumokról és a kifizetésekről." }],
            [{ type: "text", text: "Teljesítsük a jogi, szabályozási és számviteli kötelezettségeket." }],
            [{ type: "text", text: "Javítsuk a biztonságot, megelőzzük a csalást, és tartsuk a szolgáltatás színvonalát." }],
            [
              {
                type: "text",
                text: "Szolgáltatással kapcsolatos frissítéseket és, ahol megengedett, marketingüzeneteket küldjünk.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Jogalapok",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Az uniós GDPR és az Egyesült Királyság GDPR-ja alapján a következőkre támaszkodunk:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Szerződés:" },
              { type: "text", text: " a kért kárigény-szolgáltatás teljesítéséhez." },
            ],
            [
              { type: "strong", text: "Jogos érdek:" },
              {
                type: "text",
                text: " a platform működtetéséhez, védelméhez és fejlesztéséhez, valamint a kárigények hatékony érvényesítéséhez.",
              },
            ],
            [
              { type: "strong", text: "Jogi kötelezettség:" },
              { type: "text", text: " ha a megőrzést vagy az átadást jogszabály írja elő." },
            ],
            [
              { type: "strong", text: "Hozzájárulás:" },
              {
                type: "text",
                text: " az opcionális marketinghez és a nem szükséges cookie-khoz, ahol ez alkalmazandó.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Az adatok továbbítása",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Adatot megoszthatunk:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "A kárigényben érintett légitársaságokkal, hatóságokkal és vitarendezési szervekkel." }],
            [{ type: "text", text: "A kárigényben eljáró jogi tanácsadókkal és képviselőkkel." }],
            [{ type: "text", text: "A kártérítés átutalását kezelő fizetési szolgáltatókkal és bankokkal." }],
            [{ type: "text", text: "Tárhely-, e-mail-, tároló- és informatikai szolgáltatókkal, adatfeldolgozási szerződések alapján." }],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Személyes adatait nem adjuk el." }],
        },
      ],
    },
    {
      title: "7. Nemzetközi adattovábbítás",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Egyes szolgáltatók az Egyesült Királyságon vagy az EGT-n kívül is kezelhetnek adatokat. Ilyenkor megfelelő garanciákat alkalmazunk, például általános szerződési záradékokat vagy a vonatkozó jog által megkövetelt egyenértékű védelmet.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Megőrzés",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
                text: "A kárigény-iratokat általában az ügy lezárása után 7 évig őrizzük. A technikai naplókat rövidebb ideig tartjuk, kivéve, ha biztonsági vizsgálathoz kellenek. Az adatot töröljük vagy anonimizáljuk, ha már nincs rá szükség.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Az Ön jogai",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Joga lehet a hozzáféréshez, helyesbítéshez, törléshez, korlátozáshoz, tiltakozáshoz vagy az adathordozhatósághoz, és visszavonhatja a hozzájárulást, ha a kezelés ezen alapul. Írjon a ",
            },
            { type: "email" },
            { type: "text", text: " címre. Panaszt tehet a nemzeti felügyeleti hatóságnál is (Magyarországon a NAIH)." },
          ],
        },
      ],
    },
    {
      title: "10. Biztonság",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Titkosítást, hozzáférés-szabályozást és biztonságos infrastruktúrát használunk. Egyetlen online szolgáltatás sem lehet teljesen kockázatmentes, de a kezelt információ érzékenységéhez igazítjuk a védelmet.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Cookie-k",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Cookie-kat és hasonló technológiákat a " },
            { type: "link", href: "/cookies", label: "Sütiirányelvek" },
            { type: "text", text: " szerint használunk." },
          ],
        },
      ],
    },
    {
      title: "12. Változások",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A szabályzatot időről időre frissíthetjük. A lényeges változásokat ezen az oldalon, frissített dátummal tesszük közzé.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentumverzió 1.0. Utolsó frissítés: 2026. július",
};
