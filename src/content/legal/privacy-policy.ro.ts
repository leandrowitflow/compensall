import type { LegalDocument } from "./types";

export const privacyPolicyRo: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Ultima actualizare:" },
      {
        type: "text",
        text: " iulie 2026. Această Politică de confidențialitate explică modul în care Compensall colectează, folosește și protejează datele personale când folosiți site-ul nostru și serviciile de despăgubire.",
      },
    ],
  },
  sections: [
    {
      title: "1. Cine suntem",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), care operează ca " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' («' },
            { type: "brand", field: "brandName" },
            { type: "text", text: '", «noi»), este operatorul de date personale tratate prin acest site și prin serviciile aferente. Sediu social: ' },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Întrebări de confidențialitate: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Domeniul de aplicare al acestei politici",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Această politică se aplică vizitatorilor site-ului, persoanelor care încep sau depun o cerere de despăgubire și oricui ne contactează. Dacă depuneți o cerere, vi se va cere și să revizuiți documentul nostru de ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Confidențialitate și consimțământ pentru date",
            },
            { type: "text", text: " specific cererii, înainte de a semna." },
          ],
        },
      ],
    },
    {
      title: "3. Datele pe care le colectăm",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "În funcție de modul în care folosiți Compensall, putem trata:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Date de identitate și contact:" },
              { type: "text", text: " nume, e-mail, telefon și adresă poștală." },
            ],
            [
              { type: "strong", text: "Datele cererii:" },
              {
                type: "text",
                text: " încărcări ale cărții de îmbarcare, numărul zborului, ruta, locatorul, detaliile incidentului, informații despre pasageri și semnături.",
              },
            ],
            [
              { type: "strong", text: "Date financiare:" },
              { type: "text", text: " date bancare folosite pentru a plăti despăgubirea recuperată." },
            ],
            [
              { type: "strong", text: "Date tehnice:" },
              {
                type: "text",
                text: " adresa IP, tipul de browser, informații despre dispozitiv, paginile vizitate și sursa vizitei.",
              },
            ],
            [
              { type: "strong", text: "Comunicări:" },
              { type: "text", text: " mesajele pe care le trimiteți către suport și evidențele corespondenței cererii." },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Cum folosim datele dumneavoastră",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Folosim datele personale pentru:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "A opera site-ul și a presta serviciul de despăgubire." }],
            [
              {
                type: "text",
                text: "A citi informațiile din cartea de îmbarcare și a evalua dreptul conform UK261, Regulamentului CE 261/2004 și normelor aferente.",
              },
            ],
            [
              {
                type: "text",
                text: "A pregăti, depune și gestiona cereri de despăgubire la companiile aeriene în numele dumneavoastră.",
              },
            ],
            [{ type: "text", text: "A comunica cu dumneavoastră despre starea cererii, documente și plăți." }],
            [{ type: "text", text: "A respecta obligațiile legale, de reglementare și contabile." }],
            [{ type: "text", text: "A îmbunătăți securitatea, a preveni frauda și a menține calitatea serviciului." }],
            [
              {
                type: "text",
                text: "A trimite actualizări ale serviciului și, când este permis, comunicări de marketing.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Temeiuri juridice",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Conform RGPD din Regatul Unit și RGPD al UE, ne bazăm pe:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Contract:" },
              { type: "text", text: " pentru a presta serviciul de despăgubire pe care îl solicitați." },
            ],
            [
              { type: "strong", text: "Interese legitime:" },
              {
                type: "text",
                text: " pentru a opera, proteja și îmbunătăți platforma și a gestiona cererile eficient.",
              },
            ],
            [
              { type: "strong", text: "Obligație legală:" },
              { type: "text", text: " când păstrarea sau comunicarea este impusă de lege." },
            ],
            [
              { type: "strong", text: "Consimțământ:" },
              {
                type: "text",
                text: " pentru marketing opțional și cookie-uri neesențiale, atunci când este cazul.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Transmiterea datelor dumneavoastră",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Putem partaja date cu:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Companii aeriene, autorități de reglementare și organisme de soluționare implicate în cererea dumneavoastră." }],
            [{ type: "text", text: "Consultanți și reprezentanți legali care acționează în cererea dumneavoastră." }],
            [{ type: "text", text: "Furnizori de plăți și bănci care gestionează transferurile de despăgubire." }],
            [{ type: "text", text: "Furnizori de hosting, e-mail, stocare și informatică, în baza unor contracte de prelucrare." }],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nu vindem datele dumneavoastră personale." }],
        },
      ],
    },
    {
      title: "7. Transferuri internaționale",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Unii furnizori pot trata date în afara Regatului Unit sau a SEE. În acest caz, folosim garanții adecvate, precum clauzele contractuale standard sau alte protecții impuse de legea aplicabilă.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Păstrare",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dosarele cererilor se păstrează, în general, până la 7 ani după închiderea cazului. Înregistrările tehnice se păstrează mai puțin, cu excepția situațiilor necesare pentru investigații de securitate. Ștergem sau anonimizăm datele când nu mai sunt necesare.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Drepturile dumneavoastră",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Puteți avea dreptul de a accesa, rectifica, șterge, restricționa, vă opune sau porta datele personale și de a retrage consimțământul când prelucrarea se bazează pe acesta. Contactați ",
            },
            { type: "email" },
            { type: "text", text: ". Puteți depune și o plângere la autoritatea dumneavoastră de protecție a datelor (în România, ANSPDCP)." },
          ],
        },
      ],
    },
    {
      title: "10. Securitate",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Folosim criptare, controale de acces și infrastructură sigură pentru a proteja datele personale. Niciun serviciu online nu poate fi garantat ca fiind complet sigur, dar lucrăm să reducem riscul proporțional cu sensibilitatea informațiilor pe care le tratăm.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Cookie-uri",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Folosim cookie-uri și tehnologii similare, după cum este descris în " },
            { type: "link", href: "/cookies", label: "Politica de cookie-uri" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Modificări",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Putem actualiza această politică din când în când. Modificările relevante vor fi publicate pe această pagină, cu o dată actualizată.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versiunea documentului 1.0. Ultima actualizare: iulie 2026",
};
