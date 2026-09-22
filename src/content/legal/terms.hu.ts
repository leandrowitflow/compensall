import type { LegalDocument } from "./types";

export const termsHu: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Összefoglaló:" },
      { type: "text", text: " Ezek az Általános Szerződési Feltételek szabályozzák az Ön és a " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: " közötti jogviszonyt. No win, no fee alapon dolgozunk: a jogi segítségnyújtás Önnek semmibe sem kerül, hacsak sikeresen meg nem szerezzük a kártérítést. Ha a kárigény peres eljárásra kerül, további 20%-os, sikerhez kötött díj érvényesül, amely csak akkor fizetendő, ha az ügy sikerrel zárul. Minden díjat az ",
      },
      { type: "link", href: "/prices", label: "Árlista" },
      { type: "text", text: " tartalmaz." },
    ],
  },
  sections: [
    {
      title: "Fogalommeghatározások",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Ha az Általános Szerződési Feltételek szövege másként nem kívánja, a nagybetűs kifejezések az alábbi jelentéssel bírnak (a továbbiakban: „ÁSZF”):",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "„Szerződés”:" },
              { type: "text", text: " az Ügyfél és a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " között létrejött megállapodás, amely az ÁSZF Ügyfél általi elfogadásával jön létre. A jogi segítségnyújtási szolgáltatásokra a Szerződés akkor tekinthető érvényesnek, ha az Ügyfél az ÁSZF elfogadásán túl a Megbízási űrlapot is aláírta.",
              },
            ],
            [
              { type: "strong", text: "„Compensall”:" },
              { type: "text", text: " a jogi személy (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", cégjegyzékszám " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), székhelye: " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", hivatalos e-mail: " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "„Légi utasjogi rendelet”:" },
              {
                type: "text",
                text: " bármely állam, az EU, szövetségi, nemzeti vagy regionális szinten kiadott törvény, rendelet, irányelv vagy hasonló jogi aktus, amely pénzbeli kártérítésre, kártalanításra vagy visszatérítésre vonatkozó szabályokat állapít meg túlkönyvelt, késedelmes vagy törölt járatok esetén.",
              },
            ],
            [
              { type: "strong", text: "„Megbízási űrlap”:" },
              {
                type: "text",
                text: " az Ügyfél és a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " között az ÁSZF megismerése és elfogadása után létrejött, elektronikusan vagy írásban aláírt megállapodás. E Szerződés alapján az Ügyfél kizárólagos és visszavonhatatlan felhatalmazást ad arra, hogy a 261/2004/EK európai parlamenti és tanácsi rendelet és a kapcsolódó ítélkezési gyakorlat szerinti jogai alapján kárigényt indítsunk és teljesítsünk, valamint minden szükséges intézkedést megtegyünk — ideértve a kárigény átruházását vagy átengedését, a kifizetések fogadását, továbbá a személyes adatok kezelését, kérését vagy átadását, kizárólag kapcsolt szervezetek felé és kizárólag e célból.",
              },
            ],
            [
              { type: "strong", text: "„Ügyfél(ek)”:" },
              {
                type: "text",
                text: " az a személy, aki aláírta a Megbízási űrlapot, elfogadta az ÁSZF-et, és járatkártérítést kíván érvényesíteni.",
              },
            ],
            [
              { type: "strong", text: "„Kártérítés”:" },
              { type: "text", text: " a légitársaság által a kárigényre kifizetett teljes összeg — akár kártérítés, peren kívüli egyezség, gesztusösszeg vagy egyéb jogcímen —, amelyet az Ügyfél vagy a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " kap meg azt követően, hogy az Ügyfél elfogadta az ÁSZF-et." },
            ],
            [
              { type: "strong", text: "„Tájékoztatási szolgáltatás”:" },
              { type: "text", text: " a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " által nyújtott, járattal kapcsolatos tájékoztatás, ideértve a légitársaságokra, repülőterekre, légi utasjogokra, fogyasztóvédelmi szabályokra és egyéb utazási információkra vonatkozó adatokat. A tájékoztatás az Ügyfél utazásaihoz kapcsolódik, és tágabb kontextust is tartalmazhat, például repülőtéri vagy légitársasági rangsorokat, illetve a légi utasjogok változásait. Elektronikus csatornákon keresztül történik: e-mailben, személyre szabott elektronikus hirdetéseken, a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " által működtetett weboldalakon vagy mobilalkalmazásokban." },
            ],
            [
              { type: "strong", text: "„Peres eljárás”:" },
              {
                type: "text",
                text: " ha a légitársaság két hónapon belül nem válaszol, vagy a válasza belső értékelésünk szerint nem kielégítő, a kárigény peres eljárásra kerül. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " kizárólagos jogot tart fenn a legmegfelelőbb eljárás megválasztására, anélkül, hogy döntéseit indokolnia kellene; az Ügyfelet azonban a folyamat során folyamatosan tájékoztatjuk. A peres eljárás jelentős idő- és erőforrásigénye miatt további 20%-os, sikerhez kötött díj érvényesül, amely csak sikeres kimenetel esetén fizetendő. Az Ügyfél személyes megjelenése a bíróságon nem szükséges; együttműködés azonban elvárt a szükséges iratok, információk és bizonyítékok átadásában.",
              },
            ],
            [
              { type: "strong", text: "„Árlista”:" },
              {
                type: "text",
                text: " az ÁSZF melléklete, amely meghatározza az elfogadott pénznemeket, a fizetési módokat és a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " által felszámított valamennyi díjat. Az Árlista itt érhető el: " },
              { type: "link", href: "/prices", label: "Árak oldalunk" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "„261/04. rendelet”:" },
              {
                type: "text",
                text: " az Európai Parlament és a Tanács 261/2004/EK rendelete (2004. február 11.) a visszautasított beszállás és légijáratok törlése vagy hosszú késése esetén az utasoknak nyújtandó kártalanítás és segítség közös szabályainak megállapításáról.",
              },
            ],
            [
              { type: "strong", text: "„Kárigény”:" },
              {
                type: "text",
                text: " a 261/2004/EK európai parlamenti és tanácsi rendelet alapján légitársasággal szemben érvényesített pénzbeli kártérítési igény.",
              },
            ],
            [
              { type: "strong", text: "„Adatvédelmi követelmények”:" },
              {
                type: "text",
                text: " a személyes adatok kezelésére és a magánélet védelmére vonatkozó valamennyi alkalmazandó jogszabály, ideértve — ha van ilyen — az illetékes felügyeleti hatóságok iránymutatásait és magatartási kódexeit, valamint ezek megfelelőit bármely releváns joghatóságban.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A fenti fogalmakat kell alkalmazni az ÁSZF-hez kapcsolódó bármely irat vagy ügylet megkötésekor és teljesítésekor.",
            },
          ],
        },
      ],
    },
    {
      title: "1. cikk. Megbízási űrlap",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              {
                type: "text",
                text: " Az Ügyfél szabad akaratából fogadja el az ÁSZF-et (a Megbízási űrlapot), amely az Ügyfél és a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " között később megkötendő bármely más irat alapja." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " olyan online hitelesítési szolgáltatást használ a fokozott biztonságú elektronikus aláíráshoz, amely megfelel az eIDAS-rendelet 26. cikkében foglalt követelményeknek, nemzetközi szinten elismert, és a bíróságok is elfogadják; így az Ügyfélnek nem kell kinyomtatnia, aláírnia és tértivevényes postával visszaküldenie a Megbízási űrlapot.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " A Szerződés megkötésével az Ügyfél megerősíti, hogy jogosult és cselekvőképes a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " és az Ügyfél számára egyaránt kötelező iratok aláírására, illetve — adott esetben — más személy (például kiskorú) nevében is aláírhat.",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " Az Ügyfél vállalja, hogy a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " rendelkezésére bocsátja a járatkártérítésnek az üzemeltető légi fuvarozótól való beszedéséhez szükséges valamennyi adatot és információt.",
              },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " kizárólag járatkártérítést fogadhat el; az üzemeltető légi fuvarozó által felajánlott utazási utalványt vagy egyéb szolgáltatást nem.",
              },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " Az Ügyfél szavatolja, hogy a kártérítési igényt nem ruházta át harmadik félre, és hogy ugyanazon ügyben az Ügyfél és a légitársaság között nincs folyamatban, és nem is lesz folyamatban jogvita.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " A Megbízási űrlap aláírása után az Ügyfél köteles megszüntetni a tárgyalásokat az érintett légitársasággal, és a légitársaság bármely megkeresését a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " felé továbbítani, hogy a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " a lehető legjobb eredményt érhesse el." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " Az Ügyfél megerősíti és kijelenti, hogy az ÁSZF a valódi akarat közvetlen bizonyítéka és kifejezése, amelyet az üzemeltető légi fuvarozóknak tiszteletben kell tartaniuk. Az Ügyfél és a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " abban állapodik meg, hogy a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " kárigényei alapján az üzemeltető fuvarozók által fizetett járatkártérítést közvetlenül a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " tulajdonában álló bankszámlákra, vagy a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " és az Ügyfél között megállapodott egyéb bankszámlákra kell utalni." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " Az Ügyfél azt is elfogadja, hogy a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " segíti az Ügyfelet a járatkártérítés beszedéséhez fűződő jogainak érvényesítésében.",
              },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Ha az Ügyfél a Szerződés megkötése után közvetlen kifizetést vagy bármely más kártérítést kap az érintett légitársaságtól, köteles erről haladéktalanul tájékoztatni a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " céget. Ezek a kifizetések kártérítésnek minősülnek, és a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " jogosult a szolgáltatási díjat, valamint — ha a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a kifizetés Ügyfélhez érkezése előtt pert indított — a peres díjat is érvényesíteni.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "2. cikk. A jogi segítségnyújtási szolgáltatás leírása",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "2.1." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " az Ügyfél kártérítési igényét a járatot üzemeltető légitársasághoz nyújtja be, a 261/2004. rendelet vagy az Ügyfél konkrét járatára alkalmazandó egyéb légi utasjogi rendelet alapján.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " A járatadatokat és információkat a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " részére a weboldalon, e-mailben vagy telefonon lehet elküldeni." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " A kárigény folytatásához a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " megköveteli, hogy az Ügyfél aláírja a Megbízási űrlapot, amelyet webes űrlapon, e-mailben vagy postán lehet benyújtani. A Megbízási űrlap kézhezvétele után a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " saját nevében és saját javára jár el az átruházott kárigény légitársasággal szembeni érvényesítése érdekében.",
              },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Ha a Kárigényre vonatkozóan nem jön létre egyezség az üzemeltető légi fuvarozóval, vagy más esetben, amikor a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " megítélése szerint a járatkártérítés érvényesítése hatékonyabb vagy gyorsabb lenne, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " jogosult jogi eljárást indítani, amely a járatkártérítés ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: "-t megillető részének növekedését eredményezi, az " },
              { type: "link", href: "/prices", label: "Árlistában" },
              { type: "text", text: " meghatározottak szerint." },
            ],
            [
              { type: "strong", text: "2.5." },
              {
                type: "text",
                text: " Ha peres eljárásban szerződéses jogi képviselő vesz részt, az Ügyfél hozzájárul, hogy a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a jogi képviselőnek hozzáférést adjon az ügy valamennyi releváns adatához, és a jogi képviselő tájékoztassa a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " céget az ügy előrehaladásáról. Ha a bíróság hitelesítési igazolást, meghatalmazást, nyilatkozatot, Megbízási űrlapot vagy egyéb iratot kér, az Ügyfél vállalja ezek aláírását. Ha az Ügyfél már aláírta a Megbízási űrlapot, a felek megállapodnak, hogy a kárigény az ilyen további iratok aláírása előtt automatikusan visszaszáll az Ügyfélre.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Ha a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " vagy a szerződéses jogi képviselője úgy ítéli meg, hogy a kárigénynek nincs kellő megalapozottsága, az ügyet lezárjuk, és az Ügyfelet erről tájékoztatjuk.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Ha a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vagy a szerződéses jogi képviselő jogi eljárást indít, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " viseli a költségeket, ha a pert elveszítjük. Ha a per sikeres, vagy egyezség jön létre, a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " viseli azokat a költségeket, amelyeket a légitársaság nem térít meg." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " Az Ügyfél tudomásul veszi, hogy a Kárigény kezelése jelentős időt vehet igénybe, és a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nem tudja befolyásolni, milyen gyorsan érvényesíthető a Kárigény." },
            ],
          ],
        },
      ],
    },
    {
      title: "3. cikk. Díjak és kifizetések",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Szolgáltatásunkat " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: " alapon nyújtjuk, a " },
            { type: "link", href: "/documents/no-win-no-fee", label: "No win, no fee megállapodásban" },
            { type: "text", text: " foglaltak szerint. Az alkalmazandó díjakat az " },
            { type: "link", href: "/prices", label: "Árlista" },
            { type: "text", text: " tartalmazza." },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "3.1." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " díjmentesen nyújt jogi segítséget, kivéve, ha a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sikeresen beszedte a kártérítést. Sikeres kárigény esetén a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " az Árlistában meghatározott díjak levonása után átutalja az Ügyfélnek a kártérítés megállapodás szerinti részét.",
              },
            ],
            [
              { type: "strong", text: "3.2." },
              {
                type: "text",
                text: " A kártérítés megállapodás szerinti részét az Árlistában meghatározott lehetőségek szerint fizetjük ki az Ügyfélnek.",
              },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Ha az Ügyfél a kártérítés kifizetéséhez szükséges adatokat helytelenül vagy hiányosan adta meg, a kifizetés visszakerül a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " részére, és az Ügyfél több értesítés, valamint a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ésszerű, a megadott e-mailtől eltérő csatornákon tett erőfeszítései után sem válaszol, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " jogosult megtartani a kártérítésnek azt a részét, amelyet az Ügyfélnek kellett volna átutalni.",
              },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Miután a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " az Ügyfél utasításai és választott fizetési módja szerint kifizette a megállapodás szerinti kártérítést, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nem felel: (i) csekkekkel, előre feltöltött bankkártyákkal, hitelkártyákkal kapcsolatos problémákért, illetve az Ügyfélhez vezető úton bekövetkező egyéb veszteségekért; vagy (ii) az Ügyfél által megadott helytelen bankszámlaadatok, cím vagy hasonló hibák következményeiért, ideértve különösen azt, ha a kártérítést téves címzetthez utalják. Ha a kártérítés az Ügyfél hibájából téves címzetthez kerül, a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nem köteles azt aktívan visszaszerezni." },
            ],
            [
              { type: "strong", text: "3.5." },
              {
                type: "text",
                text: " A kártérítés beérkezése és kifizetése közötti időszakra kamat nem igényelhető. A ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " fenntartja a jogot, hogy a légitársaságtól beszedett kamatot megtartsa." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nem felel semmilyen kártérítésért, kárért vagy kapcsolódó igényért, ha az Ügyfélnek történő átutalást ésszerű ellenőrzésén kívül eső esemény akadályozza, ideértve különösen a sztrájkot, munkaügyi vitát, természeti katasztrófát, háborút, zavargást, polgári nyugtalanságot, szándékos szabotázst, jogszabályok vagy hatósági utasítások betartását, balesetet, üzem- vagy géphibát, tüzet, árvizet vagy vihart.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Mivel a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " székhelye Portugáliában van, az általános forgalmi adó (áfa) — ha alkalmazandó — a portugál jog szerint, a törvényben megállapított mértékkel számítandó.",
              },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " Az Egységes Euró Fizetési Térségben (SEPA) vezetett számlákra minden kifizetést banki átutalással küldünk. Az Ügyfélnek szóló nemzetközi átutalásnál a banki költségeket a járatkártérítés Ügyfelet megillető részéből vonjuk le.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              {
                type: "text",
                text: " A bankköltségek csökkentése érdekében közös foglalás vagy más esetekben (például ha a szülők kapják a gyermekek után járó összeget) a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " valamennyi kifizetést egyetlen számlára utalja, ha az Ügyfél ezt engedélyezi, vagy ha az adatok ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " részére történő megadásakor egyetlen számlát jelöltek meg. Aki mások számára kap pénzt, köteles velük elszámolni; ilyen esetben a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nem viseli a kifizetés elmaradásának kockázatát." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " Járatkártérítést és bármely más kifizetést a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " kizárólag azoknak a végső jogosultaknak teljesít, akik a járatkártérítésre jogosultak. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nem fizet közvetítőknek, ügynökségeknek, képviselőknek vagy más harmadik feleknek, hacsak konkrét írásos irattal egyértelműen és kétséget kizáróan nem igazolják, hogy jogosultak a végső jogosult nevében kifizetést fogadni. Ha a kifizetéshez való jog kétséges, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " további igazolást kérhet, és saját belátása szerint megtagadhatja a közvetlen kifizetést.",
              },
            ],
            [
              { type: "strong", text: "3.11." },
              {
                type: "text",
                text: " Ha az Ügyfél a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " megbízása után bármilyen kifizetést vagy más járatkártérítést — például járatutalványt — kap az üzemeltető légi fuvarozótól, köteles erről haladéktalanul tájékoztatni a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " céget. Ilyen esetben az Ügyfél az Árlistában megjelölt díjat a járatkártérítés üzemeltető légi fuvarozótól való kézhezvételétől számított 10 (tíz) napon belül köteles megfizetni a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " weboldalán feltüntetett, vagy a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " által írásban közölt bankszámlára." },
            ],
          ],
        },
      ],
    },
    {
      title: "4. cikk. Személyes adatok védelme",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " Az Ügyfél szavatolja, hogy a Kárigénnyel összefüggésben a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " részére átadott adatok és információk helyesek, teljesek, valósak és nem félrevezetők. Az Ügyfél kártalanítja a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " céget az Ügyfél által közölt helytelen információból, illetve az együttműködés hiányából vagy nem megfelelő együttműködésből eredő igényekkel szemben.",
              },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " személyes adatokat további célokra is gyűjthet, például statisztikai elemzéshez, ügyintézéshez, kommunikációhoz, informatikai üzemeltetéshez és biztonsághoz, fizikai biztonsághoz, hitelesítési és jogosultsági folyamatokhoz, támogatási rendszerekhez, belső projekt- és csapatkoordinációhoz, valamint szervezeti tevékenységekhez. Minden személyes adatot az (EU) 2016/679 általános adatvédelmi rendeletnek (GDPR) megfelelően gyűjtünk (lásd az ",
              },
              { type: "link", href: "/privacy-policy", label: "Adatvédelmi irányelveket" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " Az Ügyfél a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " részére a GDPR vagy más releváns adatvédelmi jogszabályok szerint adja át a személyes adatokat, és kifejezetten hozzájárul azoknak a Szerződés keretében történő kezeléséhez és felhasználásához. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " személyes adatokat harmadik felekkel csak akkor oszt meg, ha: (i) az Ügyfél hozzájárult; (ii) az szükséges a gyűjtés eredeti céljához közvetlenül kapcsolódó célhoz; (iii) az szükséges az Ügyféllel kötött szerződés előkészítéséhez, tárgyalásához és teljesítéséhez; (iv) jogszabály, közigazgatási vagy bírósági határozat írja elő; (v) az szükséges jogi igények érvényesítéséhez vagy védelméhez, illetve jogi eljárásokra válaszul; vagy (vi) az szükséges a visszaélések vagy más jogellenes tevékenységek — például szándékos támadások — megelőzéséhez az adatvédelem biztosítása érdekében.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Az ÁSZF alapján létrejött szerződéses kapcsolat keretében a " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " időről időre szolgáltatás jellegű üzeneteket küldhet az Ügyfélnek a megadott elérhetőségeken, ideértve az e-mailt. Ezek tartalmazhatnak tájékoztatást más, a légi utasjogi rendeletek alapján esetlegesen érvényesíthető kárigényekről, a ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " korábbi ügyadatai vagy nyilvánosan elérhető járatinformációk elemzése alapján. Az ilyen üzenetek kizárólag azt a célt szolgálják, hogy segítsék az Ügyfelet jogai gyakorlásában, és a ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " jogos érdekébe tartoznak a kapcsolódó szolgáltatások nyújtása körében.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Az Ügyfél bármikor leiratkozhat ezekről az üzenetekről az egyes levelekben szereplő leiratkozási hivatkozással, vagy a ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " megkeresésével a következő címen: " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "5. cikk. Elállási jog",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              {
                type: "text",
                text: " A felek közötti szerződéses kapcsolat akkor szűnik meg, amikor a Szerződés teljes mértékben teljesült, azaz amikor a Szerződés szerinti kifizetés teljesen megtörtént.",
              },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Ha Ön az uniós fogyasztóvédelmi szabályok szerint fogyasztónak minősül — vagyis természetes személy, aki olyan jogügyletet köt, amely nem tartozik sem kereskedelmi, sem önálló foglalkozási tevékenységébe —, törvényes elállási joga van.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " A Szerződés azonnal megszűnik: (i) ha a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a Kárigény alapos vizsgálata után úgy ítéli meg, hogy a Kárigény nem lehet sikeres, és erről az Ügyfelet tájékoztatja; (ii) helytelen adatok vagy információk, illetve az Ügyfél csalárd magatartása esetén, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " döntésére; vagy (iii) ha a Szerződés megkötésétől számított 14 (tizennégy) napon belül a fogyasztónak minősülő Ügyfél e-mailben elállási nyilatkozatot küld. Ezen az alapon a felmondási jog idő előtt megszűnik, ha a Szerződés a határidő lejárta előtt teljes mértékben teljesült.",
              },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " A Szerződés elfogadásától a megkötéstől számított 14 napon belül (például levélben vagy e-mailben) indokolás nélkül elállhat. Az elállási jog gyakorlásához a nyilatkozatot e 14 napos határidőn belül kell közölni, és egyértelműen ki kell fejeznie, hogy a Szerződéstől el kíván állni. A szolgáltatás jellegéből adódóan nem állhat el a Szerződéstől, ha már tájékoztattuk, hogy az érintett légitársaság elfogadta a kárigényt, mert ebben az esetben a kért szolgáltatást már teljesítettük. Az elállást a következő e-mail-címre küldheti: ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "6. cikk. Záró rendelkezések",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "6.1." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " jogosult az ÁSZF-et bármikor, előzetes értesítés nélkül módosítani és további feltételeket megállapítani, de törekszik arra, hogy az Ügyfelet a változásokról tájékoztassa. Ha a módosítás az Ügyfél szempontjából hátrányos, a módosított ÁSZF csak akkor vonatkozik rá, ha azt jóváhagyta.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " Az ÁSZF-re, a Szerződésre és az ezekkel összefüggésben megkötött bármely más iratra a Portugál Köztársaság joga az irányadó, kivéve, ha az adott irat másként rendelkezik. Az Ügyfél mint fogyasztó a lakóhelye szerinti ország kógens rendelkezéseinek védelmét is igényelheti.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " az Ügyfél — és adott esetben munkavállalói — személyes adatait kizárólag a Kárigény érvényesítésére használja. Az adatgyűjtés, -tárolás és -felhasználás mértékéről és módjáról az ",
              },
              { type: "link", href: "/privacy-policy", label: "Adatvédelmi irányelvekben" },
              { type: "text", text: " tájékozódhat." },
            ],
            [
              { type: "strong", text: "6.4." },
              {
                type: "text",
                text: " Ha az Ügyfél jogi személy, szavatolja és kijelenti, hogy: (i) a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " részére átadott személyes adatokat mindig az Adatvédelmi követelményeknek megfelelően gyűjtötték és adják át; és (ii) e Szerződés céljából a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " adatfeldolgozóként, nem pedig adatkezelőként jár el (az Adatvédelmi követelmények szerinti értelemben) a Szerződés alapján végzett valamennyi adatkezelési tevékenység tekintetében.",
              },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Ha az ÁSZF bármely rendelkezését bíróság vagy választottbíróság jogellenesnek, érvénytelennek vagy végrehajthatatlannak minősíti, az ÁSZF többi rendelkezése teljes hatályban marad. Az a rendelkezés, amely csak részben vagy csak bizonyos mértékig jogellenes, érvénytelen vagy végrehajthatatlan, a többi részében teljes hatályban marad. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " az ÁSZF-et úgy módosítja, hogy ezeket a rendelkezéseket jogszerű, érvényes és végrehajtható rendelkezésekkel váltja fel, amelyek a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " és az Ügyfél szándékához a lehető legközelebb álló eredményt hozzák." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " jogosult az ÁSZF-et és az Árlistát bármikor, értesítés nélkül módosítani, és további feltételeket megállapítani. Az Ügyfélre hátrányos változások azonban nem alkalmazhatók rá, hacsak azokat el nem fogadja.",
              },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Ha a nemzeti jog korlátozza vagy megtiltja a kárigények átruházását, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a helyi jogi képviselőkkel együttműködve, a helyi szabályoknak megfelelően jár el.",
              },
            ],
            [
              { type: "strong", text: "6.8." },
              {
                type: "text",
                text: " A benyújtott kárigényhez egészben vagy részben kapcsolódó jogok és kötelezettségek korlátozás nélkül átruházhatók a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " által a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " cégcsoport bármely tagjára, valamint a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " által harmadik felekre." },
            ],
          ],
        },
      ],
    },
    {
      title: "1. számú melléklet — Árlista",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Az Árlista az ÁSZF elválaszthatatlan része, és itt érhető el: " },
            { type: "link", href: "/prices", label: "Árak oldalunk" },
            {
              type: "text",
              text: ". Meghatározza az elfogadott pénznemeket, a rendelkezésre álló fizetési módokat és a ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " által felszámított valamennyi díjat, ideértve a sikerdíjat és a további 20%-os peres díjat." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A díjmegállapodás kereskedelmi feltételeit a " },
            { type: "link", href: "/documents/no-win-no-fee", label: "No win, no fee megállapodás" },
            { type: "text", text: " tartalmazza. Az ÁSZF-fel kapcsolatos kérdéseket a következő címre küldheti: " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentumverzió 4.0. Utolsó frissítés: 2026. szeptember",
};
