import type { ComponentType, ReactNode } from "react";
import PowerOfAttorneyDocument from "@/components/claim/PowerOfAttorneyDocument";
import LegalDocumentContent from "@/components/legal/LegalDocumentContent";
import type { AppLocale } from "@/i18n/routing";
import {
  BRAND_NAME,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_NIF,
} from "@/lib/passenger-rights";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-[#1f3664] text-lg mb-2">{title}</h2>
      <div className="text-[#1f3664]/70 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function AuthorityToActContent({ locale = "en" }: { locale?: AppLocale }) {
  return <PowerOfAttorneyDocument locale={locale} />;
}

export function NoWinNoFeeContent({ locale = "en" }: { locale?: AppLocale }) {
  return <LegalDocumentContent document="no-win-no-fee" locale={locale} />;
}

const privacyConsentCopy = {
  en: {
    noticeLabel: "GDPR Notice:",
    notice:
      "Compensall processes your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable national data protection laws. This document explains how and why we process your data.",
    controllerTitle: "1. Data Controller",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), trading as ${brand}, is the data controller responsible for your personal data. Registered address: ${address}. Contact:`,
    collectTitle: "2. Data We Collect",
    collectIntro: "To process your flight compensation claim we collect the following categories of personal data:",
    identity: ["Identity data:", "Name, date of birth, passport/ID number."],
    contact: ["Contact data:", "Email address, phone number, postal address."],
    flight: ["Flight data:", "Boarding pass, flight number, route, booking reference, disruption details."],
    financial: ["Financial data:", "Bank account details for compensation transfer."],
    technical: ["Technical data:", "IP address, browser type, device identifiers (collected automatically)."],
    basisTitle: "3. Legal Basis for Processing",
    basisIntro: "We process your personal data on the following legal bases:",
    contract: ["Contract performance:", "To fulfil our obligations under the No win, no fee Agreement."],
    interests: ["Legitimate interests:", "To pursue flight compensation claims on your behalf."],
    obligation: ["Legal obligation:", "To comply with applicable laws and regulations."],
    consent: ["Consent:", "For marketing communications (optional and easily withdrawn)."],
    sharingTitle: "4. Data Sharing",
    sharingIntro: "We may share your data with:",
    sharing: [
      "Airlines and aviation authorities (to pursue your claim).",
      "Legal representatives and advisors.",
      "Payment processors (to transfer compensation).",
      "IT service providers (under strict data processing agreements).",
    ],
    neverSell: "We never sell your personal data to third parties.",
    retentionTitle: "5. Data Retention",
    retention:
      "We retain your personal data for 7 years after a claim is closed to comply with legal and accounting obligations. Technical logs are retained for 12 months.",
    rightsTitle: "6. Your Rights",
    rightsIntro: "Under GDPR you have the following rights:",
    rights: [
      { right: "Right to access", desc: "Request a copy of your data." },
      { right: "Right to rectification", desc: "Correct inaccurate data." },
      { right: "Right to erasure", desc: 'Request deletion ("right to be forgotten").' },
      { right: "Right to restrict processing", desc: "Limit how we use your data." },
      { right: "Right to data portability", desc: "Receive your data in a machine-readable format." },
      { right: "Right to object", desc: "Object to processing based on legitimate interests." },
    ],
    rightsContact: "To exercise any of these rights, contact us at",
    rightsAuthority: "You also have the right to lodge a complaint with your national supervisory authority.",
    consentTitle: "7. Consent",
    consentBody:
      "By submitting your claim through Compensall, you confirm that you have read and understood this Privacy & Data Consent notice and consent to the processing of your personal data as described herein for the purpose of pursuing your flight compensation claim.",
    footer: "Document version 1.4. Last updated January 2026",
  },
  es: {
    noticeLabel: "Aviso RGPD:",
    notice:
      "Compensall trata sus datos personales de conformidad con el Reglamento general de protección de datos (RGPD) y las leyes nacionales de protección de datos aplicables. Este documento explica cómo y por qué tratamos sus datos.",
    controllerTitle: "1. Responsable del tratamiento",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), que opera como ${brand}, es el responsable del tratamiento de sus datos personales. Domicilio social: ${address}. Contacto:`,
    collectTitle: "2. Datos que recogemos",
    collectIntro: "Para tramitar su reclamación de compensación de vuelo recogemos las siguientes categorías de datos personales:",
    identity: ["Datos de identidad:", "Nombre, fecha de nacimiento, número de pasaporte/DNI."],
    contact: ["Datos de contacto:", "Correo electrónico, teléfono y dirección postal."],
    flight: ["Datos del vuelo:", "Tarjeta de embarque, número de vuelo, ruta, localizador y detalles de la incidencia."],
    financial: ["Datos financieros:", "Datos bancarios para transferir la compensación."],
    technical: ["Datos técnicos:", "Dirección IP, tipo de navegador e identificadores del dispositivo (recogidos automáticamente)."],
    basisTitle: "3. Base jurídica del tratamiento",
    basisIntro: "Tratamos sus datos personales sobre las siguientes bases jurídicas:",
    contract: ["Ejecución del contrato:", "Para cumplir nuestras obligaciones del Acuerdo No win, no fee."],
    interests: ["Intereses legítimos:", "Para tramitar reclamaciones de compensación de vuelo en su nombre."],
    obligation: ["Obligación legal:", "Para cumplir las leyes y normas aplicables."],
    consent: ["Consentimiento:", "Para comunicaciones de marketing (opcional y fácil de retirar)."],
    sharingTitle: "4. Cesión de datos",
    sharingIntro: "Podemos compartir sus datos con:",
    sharing: [
      "Aerolíneas y autoridades de aviación (para tramitar su reclamación).",
      "Representantes y asesores legales.",
      "Proveedores de pago (para transferir la compensación).",
      "Proveedores informáticos (bajo encargos de tratamiento estrictos).",
    ],
    neverSell: "Nunca vendemos sus datos personales a terceros.",
    retentionTitle: "5. Conservación de datos",
    retention:
      "Conservamos sus datos personales durante 7 años después de cerrar una reclamación para cumplir obligaciones legales y contables. Los registros técnicos se conservan 12 meses.",
    rightsTitle: "6. Sus derechos",
    rightsIntro: "Según el RGPD, tiene los siguientes derechos:",
    rights: [
      { right: "Derecho de acceso", desc: "Solicitar una copia de sus datos." },
      { right: "Derecho de rectificación", desc: "Corregir datos inexactos." },
      { right: "Derecho de supresión", desc: "Pedir la eliminación («derecho al olvido»)." },
      { right: "Derecho a limitar el tratamiento", desc: "Limitar cómo usamos sus datos." },
      { right: "Derecho a la portabilidad", desc: "Recibir sus datos en un formato legible por máquina." },
      { right: "Derecho de oposición", desc: "Oponerse al tratamiento basado en intereses legítimos." },
    ],
    rightsContact: "Para ejercer cualquiera de estos derechos, contáctenos en",
    rightsAuthority: "También tiene derecho a presentar una reclamación ante su autoridad nacional de control.",
    consentTitle: "7. Consentimiento",
    consentBody:
      "Al enviar su reclamación a través de Compensall, confirma que ha leído y entendido este aviso de Privacidad y consentimiento de datos y consiente el tratamiento de sus datos personales según se describe aquí, con la finalidad de tramitar su reclamación de compensación de vuelo.",
    footer: "Versión del documento 1.4. Última actualización: enero de 2026",
  },
  ro: {
    noticeLabel: "Notificare RGPD:",
    notice:
      "Compensall prelucrează datele dumneavoastră personale în conformitate cu Regulamentul general privind protecția datelor (RGPD) și cu legile naționale aplicabile de protecție a datelor. Acest document explică cum și de ce prelucrăm datele.",
    controllerTitle: "1. Operatorul de date",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), care operează ca ${brand}, este operatorul responsabil pentru datele dumneavoastră personale. Sediu: ${address}. Contact:`,
    collectTitle: "2. Datele pe care le colectăm",
    collectIntro:
      "Pentru a gestiona cererea de despăgubire pentru zbor colectăm următoarele categorii de date personale:",
    identity: ["Date de identitate:", "Nume, data nașterii, număr de pașaport/CI."],
    contact: ["Date de contact:", "Adresă de e-mail, telefon și adresă poștală."],
    flight: [
      "Date despre zbor:",
      "Carte de îmbarcare, număr de zbor, rută, referință de rezervare și detalii despre perturbare.",
    ],
    financial: ["Date financiare:", "Date bancare pentru transferul despăgubirii."],
    technical: [
      "Date tehnice:",
      "Adresă IP, tip de browser și identificatori ai dispozitivului (colectate automat).",
    ],
    basisTitle: "3. Temeiul juridic al prelucrării",
    basisIntro: "Prelucrăm datele personale pe următoarele temeiuri juridice:",
    contract: [
      "Executarea contractului:",
      "Pentru a ne îndeplini obligațiile din Acordul No win, no fee.",
    ],
    interests: [
      "Interese legitime:",
      "Pentru a urmări cereri de despăgubire pentru zbor în numele dumneavoastră.",
    ],
    obligation: ["Obligație legală:", "Pentru a respecta legile și reglementările aplicabile."],
    consent: ["Consimțământ:", "Pentru comunicări de marketing (opțional și ușor de retras)."],
    sharingTitle: "4. Partajarea datelor",
    sharingIntro: "Putem partaja datele dumneavoastră cu:",
    sharing: [
      "Companii aeriene și autorități de aviație (pentru a urmări cererea).",
      "Reprezentanți și consilieri juridici.",
      "Procesatori de plăți (pentru a transfera despăgubirea).",
      "Furnizori IT (în baza unor acorduri stricte de prelucrare a datelor).",
    ],
    neverSell: "Nu vindem niciodată datele personale către terți.",
    retentionTitle: "5. Păstrarea datelor",
    retention:
      "Păstrăm datele personale 7 ani după închiderea unei cereri, pentru a respecta obligațiile legale și contabile. Jurnalele tehnice se păstrează 12 luni.",
    rightsTitle: "6. Drepturile dumneavoastră",
    rightsIntro: "Conform RGPD, aveți următoarele drepturi:",
    rights: [
      { right: "Dreptul de acces", desc: "Să cereți o copie a datelor." },
      { right: "Dreptul la rectificare", desc: "Să corectați date inexacte." },
      { right: "Dreptul la ștergere", desc: "Să cereți ștergerea («dreptul de a fi uitat»)." },
      { right: "Dreptul de a restricționa prelucrarea", desc: "Să limitați modul în care folosim datele." },
      { right: "Dreptul la portabilitatea datelor", desc: "Să primiți datele într-un format lizibil automat." },
      { right: "Dreptul de opoziție", desc: "Să vă opuneți prelucrării bazate pe interese legitime." },
    ],
    rightsContact: "Pentru a exercita oricare dintre aceste drepturi, contactați-ne la",
    rightsAuthority:
      "Aveți și dreptul de a depune o plângere la autoritatea națională de supraveghere (în România, ANSPDCP).",
    consentTitle: "7. Consimțământ",
    consentBody:
      "Prin trimiterea cererii prin Compensall, confirmați că ați citit și înțeles acest aviz de confidențialitate și consimțământ la date și sunteți de acord cu prelucrarea datelor personale descrisă aici, în scopul urmăririi cererii de despăgubire pentru zbor.",
    footer: "Versiunea documentului 1.4. Ultima actualizare: ianuarie 2026",
  },
  hu: {
    noticeLabel: "GDPR-tájékoztató:",
    notice:
      "A Compensall a személyes adatait az általános adatvédelmi rendelet (GDPR) és az alkalmazandó nemzeti adatvédelmi jogszabályok szerint kezeli. Ez a dokumentum elmagyarázza, hogyan és miért kezeljük az adatait.",
    controllerTitle: "1. Adatkezelő",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), ${brand} néven, az Ön személyes adatainak adatkezelője. Székhely: ${address}. Kapcsolat:`,
    collectTitle: "2. Az általunk gyűjtött adatok",
    collectIntro:
      "A járatkártérítési kárigény intézéséhez a következő személyesadat-kategóriákat gyűjtjük:",
    identity: ["Személyazonosító adatok:", "Név, születési dátum, útlevél-/személyazonosító-szám."],
    contact: ["Kapcsolattartási adatok:", "E-mail-cím, telefonszám, postacím."],
    flight: [
      "Járatadatok:",
      "Beszállókártya, járatszám, útvonal, foglalási hivatkozás, a fennakadás részletei.",
    ],
    financial: ["Pénzügyi adatok:", "Bankszámlaadatok a kártérítés átutalásához."],
    technical: [
      "Technikai adatok:",
      "IP-cím, böngészőtípus, eszközazonosítók (automatikusan gyűjtve).",
    ],
    basisTitle: "3. A kezelés jogalapja",
    basisIntro: "A személyes adatait a következő jogalapokon kezeljük:",
    contract: ["Szerződés teljesítése:", "A No win, no fee megállapodás szerinti kötelezettségeink teljesítéséhez."],
    interests: ["Jogos érdek:", "Járatkártérítési kárigények érvényesítése az Ön nevében."],
    obligation: ["Jogi kötelezettség:", "Az alkalmazandó jogszabályok és előírások betartása."],
    consent: ["Hozzájárulás:", "Marketingkommunikációhoz (opcionális, és könnyen visszavonható)."],
    sharingTitle: "4. Adatátadás",
    sharingIntro: "Az adatait megoszthatjuk a következőkkel:",
    sharing: [
      "Légitársaságok és légügyi hatóságok (a kárigény érvényesítéséhez).",
      "Jogi képviselők és tanácsadók.",
      "Fizetési szolgáltatók (a kártérítés átutalásához).",
      "Informatikai szolgáltatók (szigorú adatfeldolgozási megállapodások alapján).",
    ],
    neverSell: "Személyes adatait soha nem adjuk el harmadik félnek.",
    retentionTitle: "5. Megőrzés",
    retention:
      "A személyes adatait a kárigény lezárása után 7 évig őrizzük, a jogi és számviteli kötelezettségek miatt. A technikai naplókat 12 hónapig tartjuk.",
    rightsTitle: "6. Az Ön jogai",
    rightsIntro: "A GDPR alapján a következő jogok illetik meg:",
    rights: [
      { right: "Hozzáféréshez való jog", desc: "Másolatot kérhet az adatairól." },
      { right: "Helyesbítéshez való jog", desc: "Kijavíttathatja a pontatlan adatokat." },
      { right: "Törléshez való jog", desc: "Kérheti a törlést („az elfeledtetéshez való jog”)." },
      { right: "Az adatkezelés korlátozásához való jog", desc: "Korlátozhatja, hogyan használjuk az adatait." },
      { right: "Az adathordozhatósághoz való jog", desc: "Géppel olvasható formátumban megkaphatja az adatait." },
      { right: "Tiltakozáshoz való jog", desc: "Tiltakozhat a jogos érdeken alapuló kezelés ellen." },
    ],
    rightsContact: "Ezeknek a jogoknak a gyakorlásához írjon nekünk ide:",
    rightsAuthority:
      "Jogában áll panaszt tenni a nemzeti felügyeleti hatóságnál is (Magyarországon a NAIH).",
    consentTitle: "7. Hozzájárulás",
    consentBody:
      "A kárigény Compensallon keresztüli beküldésével megerősíti, hogy elolvasta és megértette ezt az adatvédelmi és adatkezelési hozzájárulási tájékoztatót, és hozzájárul a személyes adatai itt leírt kezeléséhez, a járatkártérítési kárigény érvényesítése céljából.",
    footer: "Dokumentumverzió 1.4. Utolsó frissítés: 2026. január",
  },
  sq: {
    noticeLabel: "Njoftim GDPR:",
    notice:
      "Compensall i trajton të dhënat tuaja personale sipas Rregullores së Përgjithshme për Mbrojtjen e të Dhënave (GDPR) dhe ligjit kombëtar të zbatueshëm. Ky dokument shpjegon si dhe përse i përpunojmë të dhënat tuaja.",
    controllerTitle: "1. Kontrolluesi",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), që vepron si ${brand}, është kontrolluesi i të dhënave tuaja personale. Selia: ${address}. Kontakt:`,
    collectTitle: "2. Të dhënat që mbledhim",
    collectIntro:
      "Për të ndjekur kërkesën tuaj për kompensim fluturimi, mbledhim këto kategori të dhënash personale:",
    identity: ["Të dhëna identifikimi:", "Emër, datëlindje, numër pasaporte/letërnjoftimi."],
    contact: ["Të dhëna kontakti:", "Email, telefon, adresë postare."],
    flight: [
      "Të dhëna fluturimi:",
      "Kartë imbarkimi, numër fluturimi, itinerar, referencë rezervimi, detajet e ndërprerjes.",
    ],
    financial: ["Të dhëna financiare:", "Të dhëna bankare për transferimin e kompensimit."],
    technical: [
      "Të dhëna teknike:",
      "Adresë IP, lloj shfletuesi, identifikues pajisjeje (të mbledhura automatikisht).",
    ],
    basisTitle: "3. Baza ligjore e përpunimit",
    basisIntro: "Të dhënat tuaja i përpunojmë mbi këto baza ligjore:",
    contract: ["Përmbushje e kontratës:", "Për t’i përmbushur detyrimet tona sipas marrëveshjes No win, no fee."],
    interests: ["Interes i ligjshëm:", "Për të ndjekur kërkesat e kompensimit të fluturimit në emrin tuaj."],
    obligation: ["Detyrim ligjor:", "Për të respektuar ligjet dhe rregulloret e zbatueshme."],
    consent: ["Pëlqim:", "Për komunikime marketingu (opsionale dhe e tërheqshme lehtë)."],
    sharingTitle: "4. Ndarja e të dhënave",
    sharingIntro: "Të dhënat tuaja mund t’i ndajmë me:",
    sharing: [
      "Kompani ajrore dhe autoritete të aviacionit (për të ndjekur kërkesën).",
      "Përfaqësues dhe këshilltarë ligjorë.",
      "Ofrues pagesash (për transferimin e kompensimit).",
      "Ofrues shërbimesh IT (me marrëveshje strikte përpunimi).",
    ],
    neverSell: "Të dhënat tuaja personale nuk i shesim kurrë te palë të treta.",
    retentionTitle: "5. Ruajtja",
    retention:
      "Të dhënat personale i ruajmë 7 vjet pas mbylljes së dosjes, për detyrime ligjore dhe kontabël. Regjistrat teknikë i mbajmë 12 muaj.",
    rightsTitle: "6. Të drejtat tuaja",
    rightsIntro: "Sipas GDPR keni këto të drejta:",
    rights: [
      { right: "E drejta e aksesit", desc: "Të kërkoni një kopje të të dhënave tuaja." },
      { right: "E drejta e korrigjimit", desc: "Të kërkoni ndreqjen e të dhënave të pasakta." },
      { right: "E drejta e fshirjes", desc: "Të kërkoni fshirjen («e drejta për t’u harruar»)." },
      { right: "E drejta e kufizimit", desc: "Të kufizoni mënyrën si i përdorim të dhënat." },
      { right: "E drejta e portueshmërisë", desc: "Të merrni të dhënat në format të lexueshëm nga makina." },
      { right: "E drejta e kundërshtimit", desc: "Të kundërshtoni përpunimin e bazuar në interes të ligjshëm." },
    ],
    rightsContact: "Për t’i ushtruar këto të drejta, na shkruani në",
    rightsAuthority:
      "Keni gjithashtu të drejtën të ankimoheni te autoriteti kombëtar mbikëqyrës (në Shqipëri, KDIMDP).",
    consentTitle: "7. Pëlqimi",
    consentBody:
      "Duke dërguar kërkesën përmes Compensall, konfirmoni se e keni lexuar dhe kuptuar këtë njoftim privatësie dhe pëlqimi për të dhënat, dhe pranoni përpunimin e të dhënave personale siç përshkruhet këtu, për ndjekjen e kërkesës suaj për kompensim fluturimi.",
    footer: "Versioni i dokumentit 1.4. Përditësimi i fundit: janar 2026",
  },
  de: {
    noticeLabel: "DSGVO-Hinweis:",
    notice:
      "Compensall verarbeitet Ihre personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) und den geltenden nationalen Datenschutzgesetzen. Dieses Dokument erklärt, wie und warum wir Ihre Daten verarbeiten.",
    controllerTitle: "1. Verantwortlicher",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), handelnd als ${brand}, ist der Verantwortliche für Ihre personenbezogenen Daten. Sitz: ${address}. Kontakt:`,
    collectTitle: "2. Daten, die wir erheben",
    collectIntro:
      "Zur Bearbeitung Ihres Anspruchs auf Flugentschädigung erheben wir die folgenden Kategorien personenbezogener Daten:",
    identity: ["Identitätsdaten:", "Name, Geburtsdatum, Reisepass-/Ausweisnummer."],
    contact: ["Kontaktdaten:", "E-Mail-Adresse, Telefonnummer, Postanschrift."],
    flight: [
      "Flugdaten:",
      "Bordkarte, Flugnummer, Strecke, Buchungsnummer und Angaben zur Störung.",
    ],
    financial: ["Finanzdaten:", "Bankverbindung für die Überweisung der Entschädigung."],
    technical: [
      "Technische Daten:",
      "IP-Adresse, Browsertyp, Gerätekennungen (automatisch erhoben).",
    ],
    basisTitle: "3. Rechtsgrundlage der Verarbeitung",
    basisIntro: "Wir verarbeiten Ihre personenbezogenen Daten auf folgenden Rechtsgrundlagen:",
    contract: ["Vertragserfüllung:", "Zur Erfüllung unserer Pflichten aus der No win, no fee-Vereinbarung."],
    interests: ["Berechtigtes Interesse:", "Zur Durchsetzung von Flugentschädigungsansprüchen in Ihrem Namen."],
    obligation: ["Rechtliche Verpflichtung:", "Zur Einhaltung geltender Gesetze und Vorschriften."],
    consent: ["Einwilligung:", "Für Marketingmitteilungen (freiwillig und leicht widerrufbar)."],
    sharingTitle: "4. Datenweitergabe",
    sharingIntro: "Wir können Ihre Daten weitergeben an:",
    sharing: [
      "Fluggesellschaften und Luftfahrtbehörden (zur Durchsetzung Ihres Anspruchs).",
      "Rechtsvertreter und Berater.",
      "Zahlungsdienstleister (zur Überweisung der Entschädigung).",
      "IT-Dienstleister (auf Grundlage strenger Auftragsverarbeitungsverträge).",
    ],
    neverSell: "Wir verkaufen Ihre personenbezogenen Daten niemals an Dritte.",
    retentionTitle: "5. Speicherdauer",
    retention:
      "Wir speichern Ihre personenbezogenen Daten 7 Jahre nach Abschluss eines Falls, um gesetzliche und buchhalterische Pflichten zu erfüllen. Technische Protokolle werden 12 Monate aufbewahrt.",
    rightsTitle: "6. Ihre Rechte",
    rightsIntro: "Nach der DSGVO haben Sie folgende Rechte:",
    rights: [
      { right: "Auskunftsrecht", desc: "Eine Kopie Ihrer Daten anfordern." },
      { right: "Recht auf Berichtigung", desc: "Unrichtige Daten korrigieren lassen." },
      { right: "Recht auf Löschung", desc: "Die Löschung verlangen («Recht auf Vergessenwerden»)." },
      { right: "Recht auf Einschränkung der Verarbeitung", desc: "Einschränken, wie wir Ihre Daten nutzen." },
      { right: "Recht auf Datenübertragbarkeit", desc: "Ihre Daten in einem maschinenlesbaren Format erhalten." },
      { right: "Widerspruchsrecht", desc: "Der Verarbeitung auf Grundlage berechtigter Interessen widersprechen." },
    ],
    rightsContact: "Um eines dieser Rechte auszuüben, schreiben Sie uns an",
    rightsAuthority:
      "Sie haben außerdem das Recht, eine Beschwerde bei Ihrer nationalen Aufsichtsbehörde einzureichen (in Deutschland der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit, BfDI, oder die zuständige Landesbehörde).",
    consentTitle: "7. Einwilligung",
    consentBody:
      "Mit der Einreichung Ihres Antrags über Compensall bestätigen Sie, dass Sie diesen Hinweis zu Datenschutz und Dateneinwilligung gelesen und verstanden haben und in die hier beschriebene Verarbeitung Ihrer personenbezogenen Daten zum Zweck der Durchsetzung Ihres Anspruchs auf Flugentschädigung einwilligen.",
    footer: "Dokumentversion 1.4. Letzte Aktualisierung: Januar 2026",
  },
  nl: {
    noticeLabel: "AVG-kennisgeving:",
    notice:
      "Compensall verwerkt uw persoonsgegevens volgens de Algemene verordening gegevensbescherming (AVG) en de toepasselijke nationale privacywetten. Dit document legt uit hoe en waarom wij uw gegevens verwerken.",
    controllerTitle: "1. Verwerkingsverantwoordelijke",
    controllerBody: (name: string, nif: string, brand: string, address: string) =>
      `${name} (NIF ${nif}), handelend als ${brand}, is de verwerkingsverantwoordelijke voor uw persoonsgegevens. Vestigingsadres: ${address}. Contact:`,
    collectTitle: "2. Gegevens die wij verzamelen",
    collectIntro:
      "Voor de behandeling van uw claim tot vluchtcompensatie verzamelen wij de volgende categorieën persoonsgegevens:",
    identity: ["Identiteitsgegevens:", "Naam, geboortedatum, paspoort-/identiteitsnummer."],
    contact: ["Contactgegevens:", "E-mailadres, telefoonnummer, postadres."],
    flight: [
      "Vluchtgegevens:",
      "Instapkaart, vluchtnummer, traject, boekingsnummer en gegevens over de verstoring.",
    ],
    financial: ["Financiële gegevens:", "Bankgegevens voor de overmaking van de compensatie."],
    technical: [
      "Technische gegevens:",
      "IP-adres, browsertype, apparaatidentificatoren (automatisch verzameld).",
    ],
    basisTitle: "3. Rechtsgrondslag van de verwerking",
    basisIntro: "Wij verwerken uw persoonsgegevens op de volgende rechtsgrondslagen:",
    contract: ["Uitvoering van de overeenkomst:", "Om onze verplichtingen uit de overeenkomst No win, no fee na te komen."],
    interests: ["Gerechtvaardigd belang:", "Om claims tot vluchtcompensatie namens u af te dwingen."],
    obligation: ["Wettelijke verplichting:", "Om toepasselijke wetten en voorschriften na te leven."],
    consent: ["Toestemming:", "Voor marketingberichten (vrijwillig en eenvoudig in te trekken)."],
    sharingTitle: "4. Delen van gegevens",
    sharingIntro: "Wij kunnen uw gegevens delen met:",
    sharing: [
      "Airlines en luchtvaartautoriteiten (om uw claim af te dwingen).",
      "Juridisch vertegenwoordigers en adviseurs.",
      "Betaaldienstverleners (om de compensatie over te maken).",
      "IT-dienstverleners (op grond van strikte verwerkersovereenkomsten).",
    ],
    neverSell: "Wij verkopen uw persoonsgegevens nooit aan derden.",
    retentionTitle: "5. Bewaartermijn",
    retention:
      "Wij bewaren uw persoonsgegevens 7 jaar na afronding van een zaak, om wettelijke en boekhoudkundige verplichtingen na te komen. Technische logs worden 12 maanden bewaard.",
    rightsTitle: "6. Uw rechten",
    rightsIntro: "Volgens de AVG hebt u de volgende rechten:",
    rights: [
      { right: "Recht op inzage", desc: "Een kopie van uw gegevens opvragen." },
      { right: "Recht op rectificatie", desc: "Onjuiste gegevens laten corrigeren." },
      { right: "Recht op wissing", desc: "Wissing verlangen («recht om vergeten te worden»)." },
      { right: "Recht op beperking van de verwerking", desc: "Beperken hoe wij uw gegevens gebruiken." },
      { right: "Recht op gegevensoverdraagbaarheid", desc: "Uw gegevens in een machineleesbaar formaat ontvangen." },
      { right: "Recht van bezwaar", desc: "Bezwaar maken tegen verwerking op grond van gerechtvaardigd belang." },
    ],
    rightsContact: "Om een van deze rechten uit te oefenen, schrijft u ons op",
    rightsAuthority:
      "U hebt ook het recht een klacht in te dienen bij uw nationale toezichthouder (in Nederland de Autoriteit Persoonsgegevens).",
    consentTitle: "7. Toestemming",
    consentBody:
      "Door uw claim via Compensall in te dienen, bevestigt u dat u deze kennisgeving over privacy en toestemming hebt gelezen en begrepen en stemt u in met de hier beschreven verwerking van uw persoonsgegevens met het oog op de afdwinging van uw claim tot vluchtcompensatie.",
    footer: "Documentversie 1.4. Laatst bijgewerkt: januari 2026",
  },
} as const;

export function PrivacyDataConsentContent({ locale = "en" }: { locale?: AppLocale }) {
  const copy =
    locale === "es"
      ? privacyConsentCopy.es
      : locale === "ro"
        ? privacyConsentCopy.ro
        : locale === "hu"
          ? privacyConsentCopy.hu
          : locale === "sq"
            ? privacyConsentCopy.sq
            : locale === "de"
              ? privacyConsentCopy.de
              : locale === "nl"
                ? privacyConsentCopy.nl
                : privacyConsentCopy.en;

  return (
    <>
      <div className="mb-6 p-4 bg-[#f0f5ff] rounded-xl border border-[#d5e0f9]">
        <p className="text-sm text-[#1f3664]/70 leading-relaxed">
          <strong className="text-[#1f3664]">{copy.noticeLabel}</strong> {copy.notice}
        </p>
      </div>

      <Section title={copy.controllerTitle}>
        <p>
          {copy.controllerBody(LEGAL_ENTITY_NAME, LEGAL_ENTITY_NIF, BRAND_NAME, LEGAL_ENTITY_ADDRESS)}{" "}
          <a href={`mailto:${LEGAL_ENTITY_EMAIL}`} className="text-[#2669f3] underline">
            {LEGAL_ENTITY_EMAIL}
          </a>
        </p>
      </Section>

      <Section title={copy.collectTitle}>
        <p>{copy.collectIntro}</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>{copy.identity[0]}</strong> {copy.identity[1]}
          </li>
          <li>
            <strong>{copy.contact[0]}</strong> {copy.contact[1]}
          </li>
          <li>
            <strong>{copy.flight[0]}</strong> {copy.flight[1]}
          </li>
          <li>
            <strong>{copy.financial[0]}</strong> {copy.financial[1]}
          </li>
          <li>
            <strong>{copy.technical[0]}</strong> {copy.technical[1]}
          </li>
        </ul>
      </Section>

      <Section title={copy.basisTitle}>
        <p>{copy.basisIntro}</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>{copy.contract[0]}</strong> {copy.contract[1]}
          </li>
          <li>
            <strong>{copy.interests[0]}</strong> {copy.interests[1]}
          </li>
          <li>
            <strong>{copy.obligation[0]}</strong> {copy.obligation[1]}
          </li>
          <li>
            <strong>{copy.consent[0]}</strong> {copy.consent[1]}
          </li>
        </ul>
      </Section>

      <Section title={copy.sharingTitle}>
        <p>{copy.sharingIntro}</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {copy.sharing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-2">{copy.neverSell}</p>
      </Section>

      <Section title={copy.retentionTitle}>
        <p>{copy.retention}</p>
      </Section>

      <Section title={copy.rightsTitle}>
        <p>{copy.rightsIntro}</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {copy.rights.map((item) => (
            <div key={item.right} className="p-3 bg-[#f8faff] rounded-lg border border-[#d5e0f9]">
              <p className="font-semibold text-[#1f3664] text-xs mb-0.5">{item.right}</p>
              <p className="text-muted text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-3">
          {copy.rightsContact}{" "}
          <a href={`mailto:${LEGAL_ENTITY_EMAIL}`} className="text-[#2669f3] underline">
            {LEGAL_ENTITY_EMAIL}
          </a>
          . {copy.rightsAuthority}
        </p>
      </Section>

      <Section title={copy.consentTitle}>
        <p>{copy.consentBody}</p>
      </Section>

      <p className="text-xs text-[#1f3664]/50 pt-2 border-t border-[#d5e0f9]">{copy.footer}</p>
    </>
  );
}

export const LEGAL_DOCUMENT_CONTENT: Record<string, ComponentType<{ locale?: AppLocale }>> = {
  "authority-to-act": AuthorityToActContent,
  "no-win-no-fee": NoWinNoFeeContent,
  "privacy-data-consent": PrivacyDataConsentContent,
};
