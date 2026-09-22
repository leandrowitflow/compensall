import type { LegalDocument } from "./types";

export const termsSq: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Përmbledhje:" },
      { type: "text", text: " Këto Kushte të Përgjithshme rregullojnë marrëdhënien tuaj me " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Punojmë No win, no fee: ndihma jonë ligjore nuk ju kushton asgjë, përveçse kur rikuperojmë me sukses kompensimin. Nëse kërkesa shkon në gjyq, zbatohet një tarifë shtesë suksesi prej 20%, e pagueshme vetëm nëse çështja fiton. Të gjitha tarifat janë në ",
      },
      { type: "link", href: "/prices", label: "Listën e çmimeve" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Përkufizime",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Nëse konteksti i këtyre Kushteve të Përgjithshme nuk kërkon ndryshe, termat me shkronjë të madhe kanë kuptimin e mëposhtëm (më poshtë: «Kushte»):",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "«Marrëveshja»:" },
              { type: "text", text: " marrëveshja mes Klientit dhe " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", që lidhet me pranimin e Kushteve nga Klienti. Për Shërbimet e Ndihmës Ligjore, Marrëveshja vlen kur Klienti ka nënshkruar edhe Formularin e Detyrës, përveç pranimit të Kushteve.",
              },
            ],
            [
              { type: "strong", text: "«Compensall»:" },
              { type: "text", text: " personi juridik (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", regjistrimi ligjor " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), me seli në " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", email zyrtar " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Rregullorja e të drejtave të pasagjerit ajror»:" },
              {
                type: "text",
                text: " çdo ligj, rregullore, direktivë ose akt i ngjashëm, i lëshuar në nivel shtetëror, të BE-së, federal, kombëtar ose rajonal, që cakton rregulla për kompensim monetar, dëmshpërblim ose rimbursim të pasagjerëve në rast overbooking, vonese ose anulimi.",
              },
            ],
            [
              { type: "strong", text: "«Formulari i Detyrës»:" },
              { type: "text", text: " marrëveshja mes Klientit dhe " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " që lidhet pasi Klienti i njeh dhe i pranon Kushtet, dhe nënshkruhet elektronikisht ose me shkrim. Me këtë Marrëveshje Klienti na jep autorizim ekskluziv dhe të parevokueshëm për të nisur dhe përmbushur një kërkesë sipas të drejtave të Klientit në Rregulloren (KE) nr. 261/2004 të Parlamentit Evropian dhe të Këshillit dhe vendimeve të lidhura, dhe për të ndërmarrë të gjitha veprimet e nevojshme, përfshirë delegimin ose transferimin e kërkesës, marrjen e pagesave dhe përpunimin, kërkimin ose dhënien e të dhënave personale nëse duhet, por vetëm me subjekte të lidhura dhe vetëm për këtë qëllim.",
              },
            ],
            [
              { type: "strong", text: "«Klient(ët)»:" },
              {
                type: "text",
                text: " personi që ka nënshkruar Formularin e Detyrës, i ka pranuar Kushtet dhe kërkon kompensim fluturimi.",
              },
            ],
            [
              { type: "strong", text: "«Kompensimi»:" },
              { type: "text", text: " shuma totale e paguar nga një kompani ajrore për një kërkesë, si kompensim, shlyerje jashtëgjyqësore, gjest mirësie ose ndryshe, e transferuar te Klienti ose te " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " pasi Klienti i ka pranuar Kushtet." },
            ],
            [
              { type: "strong", text: "«Shërbimi i informacionit»:" },
              { type: "text", text: " dhënia e informacionit të lidhur me fluturimin nga " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", përfshirë detaje për kompani, aeroporte, të drejta pasagjeri, mbrojtje konsumatori dhe informacion tjetër udhëtimi. Informacioni do të jetë i rëndësishëm për udhëtimet e Klientit dhe mund të përfshijë kontekst më të gjerë. Jepet përmes komunikimeve elektronike, përfshirë email, tabela elektronike të personalizuara, faqe të kontrolluara nga ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", ose aplikacione celulare." },
            ],
            [
              { type: "strong", text: "«Gjyqësia»:" },
              {
                type: "text",
                text: " nëse kompania nuk përgjigjet brenda dy muajve, ose nëse përgjigjia vlerësohet e papërshtatshme pas vlerësimit të brendshëm, kërkesa shkon në gjyq. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ruan të drejtën ekskluzive të përcaktojë rrugën më të përshtatshme pa detyrim justifikimi, ndërsa Klienti mbahet i informuar. Për shkak të kohës dhe burimeve të rëndësishme gjatë gjyqit, zbatohet një tarifë shtesë suksesi prej 20%, e pagueshme vetëm në rast suksesi. Prania e Klientit në gjykatë nuk kërkohet; pritet bashkëpunim me dokumente, informacion ose prova të nevojshme.",
              },
            ],
            [
              { type: "strong", text: "«Lista e çmimeve»:" },
              {
                type: "text",
                text: " shtojca e këtyre Kushteve, që specifikon monedhat e pranuara, mënyrat e pagesës dhe të gjitha tarifat e ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Lista e çmimeve publikohet te " },
              { type: "link", href: "/prices", label: "faqja e Çmimeve" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Rregullorja 261/04»:" },
              {
                type: "text",
                text: " Rregullorja (KE) nr. 261/2004 e Parlamentit Evropian dhe e Këshillit e 11 shkurtit 2004 që cakton rregulla të përbashkëta për kompensimin dhe ndihmën e pasagjerëve në rast refuzimi imbarkimi, anulimi ose vonese të gjatë.",
              },
            ],
            [
              { type: "strong", text: "«Kërkesa»:" },
              {
                type: "text",
                text: " çdo kërkesë financiare kompensimi ndaj një kompanie ajrore sipas Rregullores (KE) nr. 261/2004.",
              },
            ],
            [
              { type: "strong", text: "«Kërkesat e privatësisë dhe mbrojtjes së të dhënave»:" },
              {
                type: "text",
                text: " të gjitha ligjet dhe rregulloret e zbatueshme për përpunimin e të dhënave personale dhe privatësinë, përfshirë udhëzimet dhe kodet e praktikës të autoriteteve mbikëqyrëse, dhe ekuivalentët e tyre në çdo juridiksion të rëndësishëm.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Përkufizimet e mësipërme përdoren në lidhjen dhe përmbushjen e çdo dokumenti ose transaksioni të lidhur me Kushtet.",
            },
          ],
        },
      ],
    },
    {
      title: "Neni 1. Formulari i Detyrës",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              { type: "text", text: " Klienti i pranon Kushtet (Formularin e Detyrës), që konsiderohen baza e çdo dokumenti tjetër mes Klientit dhe " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", me vullnet të lirë." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " përdor një shërbim autentifikimi online për nënshkrime elektronike të avancuara që plotësojnë kërkesat e nenit 26 të Rregullores së Identifikimit Elektronik, të njohura ndërkombëtarisht dhe të pranuara edhe nga gjykatat, kështu që Klienti nuk ka nevojë ta printojë, ta nënshkruajë dhe ta kthejë Formularin me postë të regjistruar.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " Duke lidhur Marrëveshjen, Klienti konfirmon se është i autorizuar dhe ka zotësi ligjore të nënshkruajë dokumente që i detyrojnë ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " dhe Klientin ose, nëse zbatohet, ka të drejtë të nënshkruajë në emër të një personi tjetër (për shembull, një fëmije).",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " Klienti merr përsipër t’i japë " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " të gjitha të dhënat dhe informacionin e nevojshëm për mbledhjen e Kompensimit të Fluturimit nga operatori." },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ka të drejtë të pranojë vetëm Kompensime Fluturimi; nuk pranohen kupona udhëtimi ose shërbime të tjera të ofruara nga operatori." },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " Klienti garanton se kompensimi nuk u është transferuar palëve të treta dhe se nuk ka dhe nuk do të ketë mosmarrëveshje ligjore mes Klientit dhe kompanisë për të njëjtën çështje.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " Pas nënshkrimit të Formularit të Detyrës, Klienti duhet t’i ndërpresë bisedimet me kompaninë përkatëse dhe t’ia drejtojë çdo kontakt ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", që " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " të arrijë rezultatin më të mirë të mundshëm." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " Klienti konfirmon se Kushtet janë provë e drejtpërdrejtë dhe shprehje e vullnetit të vërtetë, që duhet respektuar nga operatorët. Klienti bie dakord me ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " që të gjitha pagesat e Kompensimit të Fluturimit nga operatorët sipas kërkesave të " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " duhet të shkojnë drejtpërdrejt në llogaritë bankare të " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ose në llogari të tjera të dakorduara mes " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " dhe Klientit." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " Klienti bie dakord gjithashtu që " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ta ndihmojë në ushtrimin e së drejtës për të mbrojtur Klientin në mbledhjen e Kompensimit të Fluturimit." },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Nëse Klienti merr pagesa të drejtpërdrejta ose çdo kompensim tjetër nga kompania pas lidhjes së Marrëveshjes, është i detyruar ta njoftojë ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " pa vonesë. Këto pagesa konsiderohen kompensim dhe i japin " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " të drejtën të kërkojë tarifën e shërbimit dhe tarifën e gjyqit nëse " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ka ngritur padi para se Klienti të merrte pagesën nga kompania." },
            ],
          ],
        },
      ],
    },
    {
      title: "Neni 2. Përshkrimi i Shërbimit të Ndihmës Ligjore",
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
                text: " e dërgon kërkesën e Klientit te kompania që operon fluturimin, sipas Rregullores 261/2004 ose çdo rregulloreje tjetër të të drejtave të pasagjerit që zbatohet për atë fluturim.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Të dhënat e fluturimit mund t’i dërgohen " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " përmes faqes, me email ose telefon." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Për të vazhduar kërkesën, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " kërkon që Klienti të nënshkruajë Formularin e Detyrës, i cili mund të dërgohet nga formulari i uebit, me email ose me postë. Pasi merret Formulari, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vepron në emrin e vet për të ndjekur kërkesën e caktuar te kompania." },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Nëse nuk arrihet një shlyerje me operatorin, ose në raste të tjera kur, sipas mendimit të ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", procesi i rikuperimit do të ishte më i efektshëm ose më i shpejtë, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ka të drejtë të ndjekë veprim ligjor, që rrit pjesën e Kompensimit që i takon " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", siç specifikohet në " },
              { type: "link", href: "/prices", label: "Listën e çmimeve" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              { type: "text", text: " Nëse një përfaqësues ligjor i kontraktuar përfshihet në gjyq, Klienti pranon t’i japë " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " lejen t’i japë përfaqësuesit akses në të gjithë informacionin e rëndësishëm të dosjes, dhe ta lejojë përfaqësuesin t’i njoftojë ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ecurinë. Nëse gjykata kërkon certifikata autentifikimi, prokura, vetëdeklarime, Formularë Detyre ose dokumente të tjera, Klienti pranon t’i nënshkruajë. Nëse Klienti ka nënshkruar tashmë Formularin e Detyrës, bie dakord që kërkesa i kthehet automatikisht Klientit para nënshkrimit të dokumenteve shtesë.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Nëse " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ose përfaqësuesi i kontraktuar përcakton se kërkesa nuk ka meritë të mjaftueshme, dosja mbyllet dhe Klienti njoftohet.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Nëse " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ose përfaqësuesi nisin procedime, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " i mbulon kostot nëse padia humbet. Nëse padia fiton ose arrihet shlyerje, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " i mbulon kostot që nuk i rimburson kompania." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " Klienti pranon se trajtimi i Kërkesës mund të zgjasë shumë dhe se " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nuk mund të ndikojë sa shpejt mund të pohohet Kërkesa." },
            ],
          ],
        },
      ],
    },
    {
      title: "Neni 3. Tarifat dhe pagesat",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Shërbimi ynë ofrohet " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: ", siç përcaktohet në " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Marrëveshjen No win, no fee" },
            { type: "text", text: ". Të gjitha tarifat e zbatueshme janë në " },
            { type: "link", href: "/prices", label: "Listën e çmimeve" },
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
              { type: "text", text: " ofron ndihmë ligjore pa pagesë, përveçse kur " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " mbledh me sukses kompensimin. Nëse kërkesa del me sukses, " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " i transferon Klientit pjesën e dakorduar, sipas tarifave të Listës së çmimeve." },
            ],
            [
              { type: "strong", text: "3.2." },
              { type: "text", text: " Pjesa e dakorduar i paguhet Klientit sipas opsioneve të Listës së çmimeve." },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Nëse Klienti ka dhënë informacion të pasaktë ose të pamjaftueshëm për pagesën, pagesa i kthehet ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", dhe nëse Klienti nuk përgjigjet pas disa njoftimeve dhe përpjekjeve të arsyeshme të " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " për ta arritur me mjete të tjera përveç emailit të dhënë, " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ka të drejtë të mbajë pjesën që do t’i ishte transferuar Klientit." },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Pasi " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ka paguar kompensimin e dakorduar sipas udhëzimeve dhe mënyrës së zgjedhur nga Klienti, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nuk përgjigjet për: (i) probleme me çekë, karta parapaguese, karta krediti ose humbje të tjera gjatë transitit; ose (ii) pasoja nga të dhëna të gabuara bankare, adresë e gabuar ose gabime të ngjashme, përfshirë pagesën te marrësi i gabuar. Nëse pagesa shkon te marrësi i gabuar për faj të Klientit, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nuk është e detyruar ta rikuperojë në mënyrë aktive." },
            ],
            [
              { type: "strong", text: "3.5." },
              { type: "text", text: " Interesi nuk mund të kërkohet për periudhën mes marrjes dhe pagesës së kompensimit. " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ruan të drejtën të mbajë çdo interes të rikuperuar nga kompania." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nuk përgjigjet për kompensim, dëme ose kërkesa të lidhura nëse nuk mund ta transferojë pagesën për shkak të një ngjarjeje jashtë kontrollit të arsyeshëm, përfshirë greva, mosmarrëveshje pune, fatkeqësi natyrore, luftë, trazira, sabotim, përputhje me ligje ose urdhra qeveritarë, aksidente, dështime impiantesh, zjarre, përmbytje ose stuhira.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Meqenëse selia e " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " është në Portugali, shuma e TVSH-së, nëse zbatohet, përcaktohet nga ligjet e Portugalisë sipas normës ligjore." },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " Për llogaritë në Zonën e Vetme të Pagesave në Euro (SEPA), pagesat dërgohen me transfer bankar. Në transfer ndërkombëtar te Klienti, të gjitha tarifat bankare zbriten nga pjesa e Klientit e Kompensimit të Fluturimit.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              { type: "text", text: " Për të kursyer kosto bankare, në rast rezervimi të përbashkët ose raste të tjera (p.sh. prindër që paguhen për fëmijë), " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " i transferon të gjitha pagesat në një llogari të vetme nëse Klienti e lejon, ose nëse jepet një llogari kur dërgohen të dhënat. Kush merr para për të tjerë është i detyruar të shlyejë me ta; " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nuk merr rrezikun e mospagesës." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " Kompensimi i Fluturimit dhe pagesat e tjera bëhen nga " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vetëm te përfituesit përfundimtarë që kanë të drejtë ta kërkojnë. " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nuk u paguan ndërmjetësve, agjencive, përfaqësuesve ose palëve të treta, përveçse kur japin dokumentacion të shkruar që konfirmon qartë autorizimin për të pranuar pagesa në emër të përfituesit. Kur ka pasiguri, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " mund të kërkojë prova shtesë dhe, sipas gjykimit, të refuzojë pagesën e drejtpërdrejtë." },
            ],
            [
              { type: "strong", text: "3.11." },
              { type: "text", text: " Nëse Klienti merr ndonjë pagesë ose lloj tjetër Kompensimi Fluturimi, p.sh. një kupon, nga operatori pasi ka angazhuar " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", është i detyruar ta njoftojë menjëherë. Në atë rast Klienti i paguan " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " shpërblimin e Listës së çmimeve brenda 10 (dhjetë) ditëve nga dita e marrjes së Kompensimit, në llogarinë e dhënë në faqen e " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ose në çdo llogari tjetër të dhënë me shkrim." },
            ],
          ],
        },
      ],
    },
    {
      title: "Neni 4. Mbrojtja e të dhënave personale",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " Klienti garanton se të dhënat e dhëna " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " në lidhje me Kërkesën janë të sakta, të plota, të vërteta dhe jo mashtruese. Klienti e mban " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " të dëmshpërblyer për çdo kërkesë që vjen nga informacion i pasaktë ose nga mungesë bashkëpunimi i Klientit." },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " mund të mbledhë të dhëna personale edhe për qëllime shtesë, si analizë statistikore, administrim, komunikim, menaxhim IT dhe siguri, siguri fizike, autentifikim, sisteme mbështetëse, koordinim projektesh dhe aktivitete organizative. Të gjitha të dhënat mblidhen sipas Rregullores së Përgjithshme për Mbrojtjen e të Dhënave, Rregullorja (BE) 2016/679 (shih ",
              },
              { type: "link", href: "/privacy-policy", label: "Politikën e Privatësisë" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " Klienti i jep " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " të dhëna personale sipas GDPR ose ligjeve të tjera të rëndësishme, duke dhënë pëlqim të shprehur për përpunimin dhe përdorimin e këtyre të dhënave në kuadër të Marrëveshjes. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " i ndan të dhënat me palë të treta vetëm kur: (i) Klienti ka dhënë pëlqim; (ii) është e nevojshme për një qëllim të lidhur drejtpërdrejt me arsyen fillestare të mbledhjes; (iii) kërkohet për përgatitjen, negociatën dhe ekzekutimin e marrëveshjes me Klientin; (iv) kërkohet nga një detyrim ligjor, urdhër administrativ ose gjyqësor; (v) është e nevojshme për të ngritur ose mbrojtur pretendime ligjore; ose (vi) kërkohet për të parandaluar keqpërdorim ose veprimtari të tjera të paligjshme.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Si pjesë e marrëdhënies kontraktuale sipas këtyre Kushteve, " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " mund t’i dërgojë Klientit herë pas here komunikime të lidhura me shërbimin, përfshirë me email. Këto mund të përfshijnë informacion për kërkesa të tjera të mundshme sipas rregulloreve të të drejtave të pasagjerit, bazuar në analizën e ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " të të dhënave të dosjeve ose informacionit publik të fluturimeve. Mesazhe të tilla kanë për qëllim vetëm ta ndihmojnë Klientin të ushtrojë të drejtat e veta dhe bien brenda interesit të ligjshëm të ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " për të ofruar shërbime të lidhura." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Klienti mund të heqë dorë nga këto komunikime në çdo kohë duke klikuar lidhjen e çregjistrimit ose duke kontaktuar " },
            { type: "brand", field: "brandName" },
            { type: "text", text: " te " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Neni 5. E drejta e tërheqjes",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              { type: "text", text: " Marrëdhënia kontraktuale mbaron kur Marrëveshja përmbushet plotësisht, pra kur pagesa sipas Marrëveshjes është kryer plotësisht." },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Nëse kualifikoheni si konsumator sipas rregulloreve të konsumatorit të BE-së, pra jeni person fizik që kryen një veprim ligjor për një qëllim që nuk është tregtar as veprimtari e pavarur profesionale, keni të drejtë ligjore tërheqjeje.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " Marrëveshja ndërpritet menjëherë: (i) kur " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vlerëson se Kërkesa mund të mos ketë sukses pas një shqyrtimi të thelluar, dhe Klienti njoftohet; (ii) në rast të dhënash të pasakta ose sjellje mashtruese të Klientit, me vendim të " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "; ose (iii) nëse, brenda 14 (katërmbëdhjetë) ditëve nga lidhja e Marrëveshjes, Klienti, si konsumator, dërgon njoftim tërheqjeje me email. E drejta e ndërprerjes mbi këtë bazë mbaron para kohe nëse Marrëveshja përmbushet plotësisht para skadimit të atij afati." },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " Mund ta tërhiqni pranimin e Marrëveshjes brenda 14 ditëve nga lidhja (p.sh. me letër ose email) pa dhënë arsye. Për ta ushtruar, njoftimi duhet të bëhet brenda atyre 14 ditëve dhe të thotë qartë se dëshironi të tërhiqeni. Për shkak të natyrës së shërbimit, nuk mund të tërhiqeni pasi ju kemi njoftuar se kompania e ka pranuar kërkesën, sepse atëherë e kemi ofruar tashmë shërbimin. Tërheqja mund të dërgohet te emaili ynë ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Neni 6. Dispozitat përfundimtare",
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
                text: " është e autorizuar t’i ndryshojë Kushtet dhe të caktojë kushte shtesë në çdo kohë pa njoftim, por do të përpiqet ta mbajë Klientin të përditësuar. Nëse ndryshimet janë negative nga këndvështrimi i Klientit, Klienti duhet t’i miratojë që Kushtet e ndryshuara t’i zbatohen atij Klienti.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " Ligjet e Republikës së Portugalisë zbatohen për Kushtet, Marrëveshjen dhe çdo dokument tjetër të lidhur, përveçse kur bihet dakord ndryshe në dokumentin specifik. Klienti, si konsumator, ka gjithashtu të drejtë të kërkojë mbrojtje sipas dispozitave të detyrueshme të vendit ku banon.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " i përdor të dhënat personale të Klientit dhe, nëse zbatohet, të punonjësve të tij, ekskluzivisht për të zbatuar Kërkesën. Informacioni për shkallën dhe formën e mbledhjes, ruajtjes dhe përdorimit gjendet te ",
              },
              { type: "link", href: "/privacy-policy", label: "Politika e Privatësisë" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              { type: "text", text: " Kur Klienti është person juridik, garanton se: (i) të dhënat personale të dhëna " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " janë mbledhur dhe jepen gjithmonë sipas Kërkesave të Privatësisë; dhe (ii) për qëllimet e kësaj Marrëveshjeje, " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " do të veprojë si përpunues të dhënash e jo si kontrollues (sipas kuptimit të Kërkesave të Privatësisë) për aktivitetet e përpunimit sipas kësaj Marrëveshjeje." },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Nëse një dispozitë e Kushteve vlerësohet e paligjshme, e pavlefshme ose e pazbatueshme nga një gjykatë ose tribunal arbitral, dispozitat e tjera mbeten në fuqi. Çdo dispozitë e tillë vetëm pjesërisht mbetet në fuqi për pjesën e vlefshme. ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " do t’i ndryshojë Kushtet duke i zëvendësuar me dispozita të ligjshme që japin një rezultat sa më afër qëllimeve të " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " dhe Klientit." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " është e autorizuar t’i ndryshojë këto Kushte dhe Listën e çmimeve dhe të caktojë kushte shtesë në çdo kohë pa njoftim. Ndryshimet me efekt negativ për Klientin nuk i zbatohen atij Klienti përveçse kur i pranon." },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Kur ligjet kombëtare kufizojnë ose ndalojnë cesionin e kërkesave, " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vepron në bashkëpunim me përfaqësues ligjorë lokalë sipas rregullave lokale të zbatueshme." },
            ],
            [
              { type: "strong", text: "6.8." },
              { type: "text", text: " Të drejtat dhe detyrimet e lidhura tërësisht ose pjesërisht me çdo kërkesë të ngritur mund të transferohen pa kufizim nga " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " te çdo subjekt i grupit " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", dhe nga " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " te palë të treta." },
            ],
          ],
        },
      ],
    },
    {
      title: "Shtojca nr. 1 — Lista e çmimeve",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Lista e çmimeve është pjesë përbërëse e këtyre Kushteve dhe publikohet te " },
            { type: "link", href: "/prices", label: "faqja e Çmimeve" },
            { type: "text", text: ". Ajo specifikon monedhat e pranuara, mënyrat e pagesës dhe të gjitha tarifat e " },
            { type: "brand", field: "brandName" },
            { type: "text", text: ", përfshirë tarifën e suksesit dhe tarifën shtesë 20% të gjyqit." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Kushtet tregtare të tarifës janë në " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Marrëveshjen No win, no fee" },
            { type: "text", text: ". Pyetje për këto Kushte mund t’i dërgoni te " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Versioni i dokumentit 4.0. Përditësimi i fundit: shtator 2026",
};
