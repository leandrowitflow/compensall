import type { LegalDocument } from "./types";

export const cookiesRo: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Ultima actualizare:" },
      {
        type: "text",
        text: " iulie 2026. Această Politică de cookie-uri explică modul în care Compensall folosește cookie-uri și tehnologii similare pe site-ul nostru.",
      },
    ],
  },
  sections: [
    {
      title: "1. Ce sunt cookie-urile?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookie-urile sunt fișiere text mici care se salvează pe dispozitivul tău când vizitezi un site. Ajută paginile să funcționeze, să-ți țină minte preferințele și să înțeleagă cum le folosesc vizitatorii. Tehnologii similare includ stocarea locală și cea de sesiune.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Cum folosim cookie-urile",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Compensall folosește cookie-uri în următoarele categorii:" }],
        },
        {
          type: "table",
          headers: ["Categorie", "Scop"],
          rows: [
            {
              category: "Strict necesare",
              purpose:
                "Esențiale pentru funcții de bază precum securitatea, echilibrarea încărcării, continuitatea sesiunii cererii și reținerea alegerilor necesare ca să prestăm serviciul pe care îl soliciți.",
            },
            {
              category: "Funcționale",
              purpose:
                "Țin minte preferințe care îți îmbunătățesc experiența, cum ar fi progresul unui formular sau setările de afișare, atunci când sunt activate.",
            },
            {
              category: "Analitice",
              purpose:
                "Ne ajută să înțelegem cum folosesc vizitatorii site-ul, ca să îmbunătățim performanța și conținutul. Se folosesc doar când este permis și, dacă e nevoie, după consimțământ.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookie-uri ale terților",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Unele cookie-uri pot fi setate de furnizori de infrastructură sau de servicii care ne ajută să găzduim și să operăm site-ul, cum ar fi hosting, securitate și performanță. Când accepți cookie-urile analitice, folosim Google Tag Manager și etichetele de măsurare Google aferente (Google Ireland Limited / Google LLC), care pot include Google Analytics, ca să înțelegem cum folosesc vizitatorii site-ul. Google poate seta cookie-uri precum _ga și _ga_* și poate trata date de utilizare conform politicilor sale. Cookie-urile analitice sunt plasate doar dacă alegi «Accept toate».",
            },
          ],
        },
      ],
    },
    {
      title: "4. Gestionarea cookie-urilor",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Poți controla cookie-urile din setările browserului. Majoritatea browserelor permit blocarea sau ștergerea lor. Blocarea cookie-urilor strict necesare poate împiedica funcționarea unor părți ale site-ului, inclusiv fluxul cererii.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Când cookie-urile neesențiale necesită consimțământ conform legii aplicabile, îți vom cere alegerea înainte de a le plasa.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Păstrare",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookie-urile de sesiune expiră când închizi browserul. Cookie-urile persistente rămân o perioadă definită sau până le ștergi. Durata de păstrare depinde de scopul cookie-ului și de furnizor.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Mai multe informații",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Ca să afli cum tratăm datele personale, consultă " },
            { type: "link", href: "/privacy-policy", label: "Politica de confidențialitate" },
            { type: "text", text: ". Întrebări de confidențialitate: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Modificări",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Putem actualiza această Politică de cookie-uri când se schimbă modul în care folosim cookie-urile. Cea mai recentă versiune va fi mereu disponibilă pe această pagină.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versiunea documentului 1.0. Ultima actualizare: iulie 2026",
};
