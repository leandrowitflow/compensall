import type { LegalDocument } from "./types";

export const termsRo: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Rezumat:" },
      { type: "text", text: " Acești Termeni și condiții reglementează relația dumneavoastră cu " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Lucrăm cu No win, no fee: asistența noastră juridică nu vă costă nimic decât dacă recuperăm cu succes despăgubirea. Dacă cererea trebuie să ajungă în litigiu, se aplică un comision suplimentar de succes de 20 %, plătibil doar dacă dosarul reușește. Toate comisioanele figurează în ",
      },
      { type: "link", href: "/prices", label: "Lista de prețuri" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Definiții",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dacă contextul acestor Condiții generale nu impune o altă interpretare, termenii cu majusculă folosiți aici («CG») au înțelesul de mai jos:",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "«Contract»:" },
              { type: "text", text: " un acord între Client și " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", format când Clientul acceptă CG. Pentru prestarea Serviciilor de asistență juridică, Contractul se consideră valabil când Clientul a semnat Formularul de mandat, pe lângă acceptarea acestor CG.",
              },
            ],
            [
              { type: "strong", text: "«Compensall»:" },
              { type: "text", text: " înseamnă o persoană juridică (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", înregistrare legală " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), cu sediul în " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", și e-mail de birou " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Normativa drepturilor pasagerilor aerieni»:" },
              {
                type: "text",
                text: " orice lege, regulament, directivă sau instrument similar, emis la nivel de stat, UE, federal, național sau regional, care stabilește norme de despăgubire bănească, indemnizație sau rambursare a pasagerilor în caz de overbooking, întârziere sau anulare a zborurilor.",
              },
            ],
            [
              { type: "strong", text: "«Formular de mandat»:" },
              {
                type: "text",
                text: " acordul dintre Client și ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " care se încheie după ce Clientul a cunoscut și acceptat CG și care se semnează electronic sau în scris. În temeiul acestui Contract, Clientul ne acordă autorizație exclusivă și irevocabilă de a iniția și gestiona o cerere bazată pe drepturile sale conform Regulamentului (CE) nr. 261/2004 al Parlamentului European și al Consiliului și hotărârilor aferente și de a efectua toate actele necesare, inclusiv a ceda sau transfera cererea, a primi plăți și a trata, solicita sau facilita date personale dacă este necesar, exclusiv cu entități conexe și doar în acest scop.",
              },
            ],
            [
              { type: "strong", text: "«Client(ți)»:" },
              {
                type: "text",
                text: " o persoană care a semnat Formularul de mandat, a acceptat CG și cere o despăgubire de zbor.",
              },
            ],
            [
              { type: "strong", text: "«Despăgubire»:" },
              { type: "text", text: " suma totală plătită de o companie aeriană pentru o cerere, fie ca despăgubire, tranzacție extrajudiciară, gest comercial sau alt concept, transferată Clientului sau " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " după ce Clientul a acceptat CG." },
            ],
            [
              { type: "strong", text: "«Serviciu de informare»:" },
              { type: "text", text: " prestarea de informații legate de zboruri de către " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", inclusiv date despre companii aeriene, aeroporturi, drepturile pasagerilor, norme de consum și alte informații de călătorie. Informația va fi relevantă pentru călătoriile Clientului și poate include un context mai larg, cum ar fi clasamente de aeroporturi sau companii ori noutăți despre schimbări ale drepturilor pasagerilor. Se prestează prin comunicări electronice, inclusiv e-mail, panouri electronice personalizate, site-uri controlate de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sau aplicații mobile." },
            ],
            [
              { type: "strong", text: "«Litigiu»:" },
              {
                type: "text",
                text: " dacă respectiva companie nu răspunde în două luni sau dacă răspunsul este considerat nesatisfăcător după o evaluare internă, cererea trece în litigiu. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " își rezervă dreptul exclusiv de a determina calea de acțiune cea mai potrivită, fără obligația de a-și justifica deciziile, deși Clientul va fi informat pe parcurs. Având în vedere timpul și resursele pe care le cere litigiul, se aplică un comision suplimentar de succes de 20 %, plătibil doar dacă rezultatul este favorabil. Nu se cere prezența Clientului în instanță; se așteaptă însă colaborarea sa cu documentele, informațiile sau probele necesare pentru a susține procedura.",
              },
            ],
            [
              { type: "strong", text: "«Lista de prețuri»:" },
              {
                type: "text",
                text: " anexa acestor CG care precizează monedele acceptate, metodele de plată și toate comisioanele percepute de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Lista de prețuri este publicată pe " },
              { type: "link", href: "/prices", label: "pagina noastră de Prețuri" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Regulamentul 261/04»:" },
              {
                type: "text",
                text: " Regulamentul (CE) nr. 261/2004 al Parlamentului European și al Consiliului din 11 februarie 2004 de stabilire a unor norme comune în materie de compensare și de asistență a pasagerilor în eventualitatea refuzului la îmbarcare și a anulării sau a întârzierii prelungite a zborurilor.",
              },
            ],
            [
              { type: "strong", text: "«Cerere»:" },
              {
                type: "text",
                text: " orice cerere de despăgubire economică împotriva unei companii aeriene în temeiul Regulamentului (CE) nr. 261/2004 al Parlamentului European și al Consiliului.",
              },
            ],
            [
              { type: "strong", text: "«Cerințe de confidențialitate și protecție a datelor»:" },
              {
                type: "text",
                text: " toate legile și normele aplicabile tratării datelor personale și confidențialității, inclusiv, când este cazul, orientările și codurile de conduită (dacă există) ale autorităților de supraveghere competente și echivalentele lor în orice jurisdicție relevantă.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Definițiile de mai sus se folosesc la încheierea și executarea oricărui document sau tranzacție legată de CG.",
            },
          ],
        },
      ],
    },
    {
      title: "Articolul 1. Formularul de mandat",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              {
                type: "text",
                text: " Clientul acceptă CG (Formularul de mandat), care se consideră baza oricărui alt document încheiat între Client și ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " în mod liber și voluntar." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " folosește un serviciu de autentificare online pentru semnături electronice avansate care îndeplinește cerințele articolului 26 din Regulamentul privind identificarea electronică, recunoscut internațional și acceptat inclusiv de instanțe, astfel încât Clientul nu trebuie să imprime, semneze și returneze Formularul de mandat prin scrisoare recomandată.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " La încheierea unui Contract, Clientul confirmă că este autorizat și are capacitate legală de a semna documente care îi leagă atât pe ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", cât și pe Client sau, dacă este cazul, că are dreptul să semneze în numele altei persoane (de exemplu, un minor).",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " Clientul se angajează să furnizeze " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " toate datele și informațiile necesare pentru a încasa Despăgubirea de zbor de la transportatorul aerian operator.",
              },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va fi îndreptățită doar să accepte Despăgubiri de zbor; nu se acceptă bonuri de călătorie sau alte servicii oferite de transportatorul aerian operator.",
              },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " Clientul garantează că despăgubirea nu a fost cedată unor terți și că nu există și nu va exista un litigiu pendinte între Client și respectiva companie pe același subiect.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " După semnarea Formularului de mandat, Clientul trebuie să înceteze negocierile cu respectiva companie și să îndrepte orice contact al acesteia către ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", pentru ca " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " să obțină cel mai bun rezultat posibil." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " Clientul confirmă și declară că CG sunt dovadă directă și expresie a voinței sale reale, pe care trebuie să o respecte transportatorii aerieni operatori. Clientul convine cu ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ca toate plățile de Despăgubire de zbor făcute de transportatorii operatori în Cererile " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " să se facă direct în conturile bancare ale " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sau în alte conturi convenite între " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " și Client." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " Clientul acceptă de asemenea ca " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " să îl asiste în exercitarea dreptului de a-l apăra la încasarea Despăgubirii de zbor.",
              },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Dacă Clientul primește plăți directe sau orice altă despăgubire de la respectiva companie după încheierea Contractului, este obligat să informeze ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " fără întârziere. Aceste plăți se consideră despăgubire și dau " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " dreptul de a cere comisionul serviciului și comisionul de litigiu dacă ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a depus acțiune înainte ca Clientul să primească plata de la companie.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Articolul 2. Descrierea Serviciului de asistență juridică",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "2.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " depune cererea de despăgubire a Clientului la compania care a operat zborul, pe baza Regulamentului 261/2004 sau a oricărei alte normative a drepturilor pasagerilor aerieni aplicabile acelui zbor.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Datele și informațiile zborului pot fi trimise " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " prin site, e-mail sau telefon." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Pentru a continua cererea, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " are nevoie ca Clientul să semneze Formularul de mandat, care poate fi trimis prin formularul web, e-mail sau poștă. După primirea Formularului de mandat, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va acționa în nume propriu și pe cont propriu pentru a cere cesiunea față de companie.",
              },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Dacă nu se ajunge la un acord cu transportatorul aerian operator privind Cererea sau în alte cazuri în care, după aprecierea ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", încasarea Despăgubirii de zbor ar fi mai eficientă sau mai rapidă, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va fi îndreptățită să inițieze acțiuni legale, ceea ce va crește partea din Despăgubirea de zbor care revine ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", conform ", },
              { type: "link", href: "/prices", label: "Listei de prețuri" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              {
                type: "text",
                text: " Dacă intervine un reprezentant legal contractat în litigiu, Clientul acceptă să acorde ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " permisiunea de a facilita reprezentantului legal accesul la toate informațiile relevante ale dosarului și ca reprezentantul legal să informeze ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " despre evoluția cauzei. Dacă instanța cere certificate de autentificare, împuterniciri, declarații, Formulare de mandat sau altă documentație, Clientul acceptă să le semneze. Dacă Clientul a semnat deja un Formular de mandat, se convine că cererea se transferă automat înapoi Clientului înainte de semnarea acelor documente suplimentare.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Dacă " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " sau reprezentantul său legal contractat determină că cererea nu are temei suficient, dosarul se închide și Clientul este informat.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Dacă " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sau reprezentantul legal contractat inițiază o procedură judiciară, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va acoperi cheltuielile dacă acțiunea se pierde. Dacă acțiunea reușește sau se ajunge la o tranzacție, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " va acoperi cheltuielile pe care respectiva companie nu le rambursează." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " Clientul recunoaște că gestionarea Cererii poate dura destul de mult și că " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nu poate influența rapiditatea cu care se valorifică Cererea." },
            ],
          ],
        },
      ],
    },
    {
      title: "Articolul 3. Comisioane și plăți",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Serviciul nostru se prestează cu " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: ", conform " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Acordului No win, no fee" },
            { type: "text", text: ". Toate comisioanele aplicabile figurează în " },
            { type: "link", href: "/prices", label: "Lista de prețuri" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "3.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " oferă asistență juridică gratuită, cu excepția cazului în care " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " încasează cu succes despăgubirea. Dacă cererea reușește, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va transfera Clientului partea convenită din despăgubire, sub rezerva comisioanelor aplicabile din Lista de prețuri.",
              },
            ],
            [
              { type: "strong", text: "3.2." },
              {
                type: "text",
                text: " Partea convenită din despăgubire se plătește Clientului conform opțiunilor din Lista de prețuri.",
              },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Dacă Clientul a furnizat informații incorecte sau insuficiente necesare pentru plata despăgubirii, plata se returnează ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", iar Clientul nu răspunde după mai multe înștiințări și eforturi rezonabile ale ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " de a-l contacta prin mijloace altele decât e-mailul furnizat, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va avea dreptul să rețină partea din despăgubire care ar fi fost transferată Clientului.",
              },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " După ce " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a plătit despăgubirea convenită conform instrucțiunilor și metodei de plată alese de Client, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nu răspunde pentru: (i) incidente cu cecuri, carduri preplătite, carduri de credit sau alte pierderi în timpul trimiterii către Client; nici (ii) consecințele faptului că Clientul a furnizat date bancare greșite, o adresă greșită sau erori similare, inclusiv, fără limitare, despăgubirea plătită unui destinatar greșit. Dacă despăgubirea se plătește unui destinatar greșit din vina Clientului, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nu este obligată să o recupereze activ." },
            ],
            [
              { type: "strong", text: "3.5." },
              {
                type: "text",
                text: " Nu se pot cere dobânzi pentru perioada dintre primirea și plata despăgubirii. ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " își rezervă dreptul de a reține orice dobândă recuperată de la companie." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nu răspunde pentru nicio despăgubire, daună sau pretenție dacă nu poate transfera plata Clientului din cauza unui eveniment în afara controlului său rezonabil, inclusiv, fără limitare, greve, conflicte de muncă, catastrofe naturale, război, tulburări, sabotaj intenționat, respectarea legilor sau ordinelor guvernamentale, regulamentelor, dispozițiilor sau instrucțiunilor, accidente, defecțiuni de instalații sau mașini, incendii, inundații sau furtuni.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Deoarece sediul social al " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " este în Portugalia, cuantumul taxei pe valoarea adăugată (TVA), dacă este cazul, este determinat de legislația portugheză, la cota legală.",
              },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " În conturi din Zona unică de plăți în euro (SEPA), toate plățile se trimit în cont prin transfer. La un transfer internațional către Client, toate comisioanele bancare se deduc din partea Clientului din Despăgubirea de zbor.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              {
                type: "text",
                text: " Pentru a economisi costuri bancare, la o rezervare comună sau în alte cazuri (de exemplu, părinți care încasează pentru copii), ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va transfera toate plățile într-un singur cont dacă Clientul permite acest lucru sau dacă se indică un singur cont la trimiterea datelor către ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ". Cine primește bani pentru alte persoane este obligat să deconteze cu acestea și, în acest caz, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nu își asumă riscul de neplată." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " Despăgubirea de zbor și orice alte plăți vor fi făcute de " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " doar beneficiarilor finali îndreptățiți să ceară Despăgubirea de zbor. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nu va face plăți către intermediari, agenții, reprezentanți sau alți terți decât dacă aceștia prezintă documentație scrisă specifică care confirmă clar și neechivoc autoritatea de a accepta plăți în numele beneficiarului final. Dacă există îndoială privind dreptul de a primi plăți, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " își rezervă dreptul de a cere probe suplimentare și poate, la discreția sa, să refuze plata directă către acele persoane.",
              },
            ],
            [
              { type: "strong", text: "3.11." },
              {
                type: "text",
                text: " Dacă Clientul primește orice plată sau orice alt tip de Despăgubire de zbor, de exemplu un bon de zbor, de la transportatorul aerian operator după ce a contractat serviciile ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", Clientul este obligat să informeze ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " imediat. În acest caz, Clientul va plăti ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " remunerația indicată în Lista de prețuri în termen de 10 (zece) zile de la data la care primește Despăgubirea de zbor de la transportatorul aerian operator, în contul bancar indicat pe site-ul ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sau în orice alt cont pe care " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " îl comunică în scris." },
            ],
          ],
        },
      ],
    },
    {
      title: "Articolul 4. Protecția datelor personale",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " Clientul garantează că datele și informațiile furnizate " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " în legătură cu Cererea sunt corecte, complete, adevărate și nu sunt înșelătoare. Clientul va ține indemn " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " față de orice pretenție rezultată din informații incorecte furnizate de Client sau din lipsa cooperării ori o cooperare inadecvată a Clientului.",
              },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " poate colecta date personale și în scopuri suplimentare, precum analiză statistică, administrare, comunicare, gestiune informatică și securitate, securitate fizică, procese de autentificare și autorizare, sisteme de suport, coordonare internă de proiecte și echipe și activități organizatorice. Toate datele personale se colectează conform Regulamentului general privind protecția datelor, Regulamentul (UE) 2016/679 (a se vedea ",
              },
              { type: "link", href: "/privacy-policy", label: "Politica de confidențialitate" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " Clientul furnizează " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " date personale conform Regulamentului general privind protecția datelor sau altor legi relevante de protecție a datelor, acordând consimțământ explicit pentru tratarea și folosirea acestor date în cadrul Contractului. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va partaja date personale cu terți doar când: (i) Clientul și-a dat consimțământul; (ii) este necesar pentru un scop legat direct de motivul inițial al colectării; (iii) este necesar pentru pregătirea, negocierea și executarea acordului cu Clientul; (iv) o impune o obligație legală, un ordin administrativ sau judecătoresc; (v) este necesar pentru a formula sau apăra pretenții juridice sau a răspunde unor acțiuni legale; sau (vi) este necesar pentru a preveni o folosire abuzivă sau alte activități ilicite, cum ar fi atacurile intenționate, pentru a asigura protecția datelor.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Ca parte a relației contractuale stabilite în aceste CG, " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " poate, din când în când, să trimită Clientului comunicări legate de serviciu folosind datele de contact furnizate, inclusiv e-mailul. Aceste comunicări pot include informații despre alte cereri potențiale la care Clientul poate avea dreptul conform normativei drepturilor pasagerilor aerieni, pe baza analizei ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " a datelor din dosare anterioare sau a informațiilor de zbor de acces public. Aceste mesaje urmăresc doar să îl ajute pe Client să își exercite drepturile și se consideră în interesul legitim al ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " de a presta servicii relevante și conexe.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Clientul se poate dezabona de la aceste comunicări oricând, apăsând linkul de dezabonare din fiecare mesaj sau contactând ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " la " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Articolul 5. Dreptul de retragere",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              {
                type: "text",
                text: " Relația contractuală dintre părți încetează când Contractul a fost executat integral, adică atunci când plata prevăzută în Contract a fost efectuată în întregime.",
              },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Dacă aveți calitatea de consumator conform normativei de consum a UE, adică sunteți o persoană fizică care încheie un act juridic într-un scop care nu este comercial și nici o activitate profesională independentă, aveți un drept legal de retragere.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " Contractul se reziliază imediat: (i) când " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " consideră că Cererea riscă să nu reușească după o analiză aprofundată, iar Clientul este informat de acea decizie; (ii) în caz de date sau informații incorecte și de conduită frauduloasă a Clientului, prin decizia ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: "; sau (iii) dacă, în termen de 14 (paisprezece) zile de la încheierea Contractului, Clientul, fiind consumator, depune o notificare de retragere prin e-mail. Dreptul de a rezilia Contractul din acest motiv se stinge anticipat dacă Contractul a fost executat integral înainte de expirarea acelui termen.",
              },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " Puteți retrage acceptarea Contractului nostru în termen de 14 zile de la încheierea sa (de exemplu, prin scrisoare sau e-mail), fără a indica motive. Pentru a exercita dreptul de retragere, trebuie să comunicați în acel termen de 14 zile și să indicați clar că doriți să vă retrageți din Contract. Prin natura serviciului prestat, nu vă puteți retrage din Contractul nostru odată ce v-am informat că respectiva companie a acceptat cererea, deoarece în acel caz am prestat deja serviciul solicitat. Retragerea poate fi trimisă la e-mailul nostru ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Articolul 6. Dispoziții finale",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "6.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " este autorizată să modifice CG și să stabilească condiții suplimentare oricând și fără preaviz, dar se va strădui să țină Clientul la curent cu aceste schimbări. Dacă vreo schimbare este negativă din perspectiva Clientului, Clientul trebuie să o aprobe pentru ca CG-urile modificate să îi fie aplicabile.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " CG-urilor, Contractului și oricărui alt document încheiat în legătură cu CG și Contract li se aplică dreptul Republicii Portugheze, dacă nu se convine altfel în documentul concret. Clientul, ca și consumator, are și dreptul de a cere protecția normelor imperative ale țării în care domiciliază.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va folosi datele personale ale Clientului și, dacă este cazul, ale angajaților săi, exclusiv pentru a valorifica Cererea. Toate informațiile despre sfera și modul colectării, stocării și folosirii datelor personale figurează în ",
              },
              { type: "link", href: "/privacy-policy", label: "Politica de confidențialitate" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              {
                type: "text",
                text: " Când Clientul este o persoană juridică, garantează și declară că: (i) datele personale furnizate ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " au fost colectate și sunt furnizate în orice moment conform Cerințelor de confidențialitate și protecție a datelor; și (ii) în scopul acestui Contract, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va acționa ca persoană împuternicită de operator și nu ca operator (în sensul acelor Cerințe) față de toate activitățile de prelucrare desfășurate în temeiul acestui Contract.",
              },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Dacă o instanță sau un tribunal arbitral declară ilegală, nulă sau inaplicabilă vreo dispoziție a CG, celelalte dispoziții rămân în vigoare. Orice dispoziție declarată ilegală, nulă sau inaplicabilă doar parțial, sau într-un anumit grad, rămâne în vigoare în măsura în care nu a fost declarată ilegală, nulă sau inaplicabilă. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va modifica CG înlocuind acele dispoziții cu altele legale, valabile și aplicabile care produc un rezultat cât mai apropiat de intenția ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " și a Clientului." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " este autorizată să modifice aceste CG și Lista de prețuri și să stabilească condiții suplimentare oricând și fără notificare. Totuși, schimbările cu un efect negativ pentru Client nu îi vor fi aplicabile decât dacă Clientul le acceptă.",
              },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Când legile naționale restricționează sau interzic cesiunea cererilor, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " va acționa în cooperare cu reprezentanți legali locali, conform normativei locale aplicabile.",
              },
            ],
            [
              { type: "strong", text: "6.8." },
              {
                type: "text",
                text: " Drepturile și obligațiile legate total sau parțial de orice cerere depusă pot fi transferate fără restricție de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " oricărei entități din grupul de societăți al " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " și de " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " către terți." },
            ],
          ],
        },
      ],
    },
    {
      title: "Anexa nr. 1 - Lista de prețuri",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Lista de prețuri face parte integrantă din aceste CG și este publicată pe " },
            { type: "link", href: "/prices", label: "pagina noastră de Prețuri" },
            {
              type: "text",
              text: ". Precizează monedele acceptate, metodele de plată disponibile și toate comisioanele percepute de ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: ", inclusiv comisionul de succes și comisionul suplimentar de litigiu de 20 %." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Condițiile comerciale ale regimului nostru de comisioane figurează în " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Acordul No win, no fee" },
            { type: "text", text: ". Întrebările despre aceste CG pot fi trimise la " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Versiunea documentului 4.0. Ultima actualizare: septembrie 2026",
};
