import { parseAppLocale, type AppLocale } from "@/i18n/routing";

/** Exact English PoA wording from the Compensall Power of Attorney (client PDF). */
export const POWER_OF_ATTORNEY_BODY =
  "As an air passenger of the below-mentioned flight(s), I hereby grant Albuquerque & Araújo, Lda., also known as Compensall, the authority to initiate and pursue a claim based on my rights as set out in Regulation (EC) No. 261/2004 of the European Parliament and of the Council and related rulings, and to undertake all necessary related actions, including processing payments and holding, requesting, or supplying personal data exclusively with the relevant entities and for this purpose, in accordance with the Terms and Conditions of Compensall's website, which I hereby declare to accept. This authority expressly includes the right to appoint, substitute, delegate to, or transfer this power of attorney, in whole or in part, to third parties, including but not limited to attorneys-at-law and legal representatives, for the purpose of enforcing my claims. This power of attorney is exclusive, irrevocable, and replaces any previously issued powers of attorney, if any. Furthermore, I request that all communications be addressed exclusively to the above-mentioned company.";

export type PoaCopy = {
  title: string;
  body: string;
  name: string;
  flights: string;
  from: string;
  to: string;
  flightsDate: string;
  date: string;
  thePassenger: string;
  passengerSignatureAlt: string;
  qrAlt: string;
  euFlagAlt: string;
  europeanUnion: string;
  structuralFundsLine1: string;
  structuralFundsLine2: string;
  signaturePlaceholder: string;
  claimLabel: string;
};

const POA_COPY: Record<AppLocale, PoaCopy> = {
  en: {
    title: "Power of Attorney",
    body: POWER_OF_ATTORNEY_BODY,
    name: "Name:",
    flights: "Flight(s):",
    from: "from",
    to: "to",
    flightsDate: "Flight(s) Date:",
    date: "Date:",
    thePassenger: "The passenger:",
    passengerSignatureAlt: "Passenger signature",
    qrAlt: "QR code linking to the European Union official website",
    euFlagAlt: "Flag of Europe",
    europeanUnion: "European Union",
    structuralFundsLine1: "European Structural",
    structuralFundsLine2: "and Investment Funds",
    signaturePlaceholder: "Your signature will appear here as you draw below",
    claimLabel: "Claim",
  },
  pt: {
    title: "Procuração",
    body: "Na qualidade de passageiro aéreo do(s) voo(s) abaixo indicado(s), concedo por este meio à Albuquerque & Araújo, Lda., também conhecida como Compensall, autorização para iniciar e prosseguir um pedido com base nos meus direitos previstos no Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho e nas decisões conexas, e para praticar todos os atos necessários, incluindo o tratamento de pagamentos e a detenção, o pedido ou o fornecimento de dados pessoais exclusivamente junto das entidades competentes e para este fim, em conformidade com os Termos e Condições do sítio da Compensall, que declaro aceitar. Esta autorização inclui expressamente o direito de nomear, substituir, delegar ou transmitir esta procuração, no todo ou em parte, a terceiros, incluindo advogados e representantes legais, para efeitos de execução dos meus direitos. Esta procuração é exclusiva, irrevogável e substitui quaisquer procurações anteriormente emitidas, se as houver. Solicito ainda que todas as comunicações sejam dirigidas exclusivamente à empresa acima referida.",
    name: "Nome:",
    flights: "Voo(s):",
    from: "de",
    to: "para",
    flightsDate: "Data do(s) voo(s):",
    date: "Data:",
    thePassenger: "O passageiro:",
    passengerSignatureAlt: "Assinatura do passageiro",
    qrAlt: "Código QR para o sítio oficial da União Europeia",
    euFlagAlt: "Bandeira da Europa",
    europeanUnion: "União Europeia",
    structuralFundsLine1: "Fundos Estruturais",
    structuralFundsLine2: "e de Investimento Europeus",
    signaturePlaceholder: "A sua assinatura aparece aqui à medida que desenha abaixo",
    claimLabel: "Pedido",
  },
  fr: {
    title: "Procuration",
    body: "En qualité de passager aérien du ou des vols mentionnés ci-dessous, je donne par la présente à Albuquerque & Araújo, Lda., également connue sous le nom de Compensall, le pouvoir d'engager et de poursuivre une réclamation fondée sur mes droits tels que prévus par le règlement (CE) n° 261/2004 du Parlement européen et du Conseil et les décisions connexes, et d'accomplir toutes les démarches nécessaires, y compris le traitement des paiements et la détention, la demande ou la communication de données personnelles exclusivement auprès des entités concernées et à cette fin, conformément aux Conditions générales du site de Compensall, que je déclare accepter. Ce pouvoir comprend expressément le droit de nommer, substituer, déléguer ou transférer la présente procuration, en tout ou en partie, à des tiers, notamment des avocats et représentants légaux, aux fins de faire valoir mes droits. Cette procuration est exclusive, irrévocable et remplace toute procuration antérieure, le cas échéant. Je demande en outre que toutes les communications soient adressées exclusivement à la société susmentionnée.",
    name: "Nom :",
    flights: "Vol(s) :",
    from: "de",
    to: "à",
    flightsDate: "Date du/des vol(s) :",
    date: "Date :",
    thePassenger: "Le passager :",
    passengerSignatureAlt: "Signature du passager",
    qrAlt: "QR code vers le site officiel de l'Union européenne",
    euFlagAlt: "Drapeau de l'Europe",
    europeanUnion: "Union européenne",
    structuralFundsLine1: "Fonds structurels",
    structuralFundsLine2: "et d'investissement européens",
    signaturePlaceholder: "Votre signature apparaîtra ici au fur et à mesure que vous signez ci-dessous",
    claimLabel: "Dossier",
  },
  es: {
    title: "Poder de representación",
    body: "Como pasajero aéreo del vuelo o vuelos indicados a continuación, otorgo por la presente a Albuquerque & Araújo, Lda., también conocida como Compensall, autorización para iniciar y tramitar una reclamación basada en mis derechos recogidos en el Reglamento (CE) n.º 261/2004 del Parlamento Europeo y del Consejo y en las resoluciones conexas, y para realizar todas las gestiones necesarias, incluido el tratamiento de pagos y la conservación, solicitud o cesión de datos personales exclusivamente con las entidades pertinentes y para este fin, de conformidad con los Términos y Condiciones del sitio de Compensall, que declaro aceptar. Esta autorización incluye expresamente el derecho a nombrar, sustituir, delegar o transmitir el presente poder, total o parcialmente, a terceros, incluidos abogados y representantes legales, para hacer valer mis pretensiones. Este poder es exclusivo, irrevocable y sustituye cualquier poder emitido con anterioridad, si lo hubiera. Solicito además que todas las comunicaciones se dirijan exclusivamente a la empresa mencionada.",
    name: "Nombre:",
    flights: "Vuelo(s):",
    from: "de",
    to: "a",
    flightsDate: "Fecha del/de los vuelo(s):",
    date: "Fecha:",
    thePassenger: "El pasajero:",
    passengerSignatureAlt: "Firma del pasajero",
    qrAlt: "Código QR al sitio oficial de la Unión Europea",
    euFlagAlt: "Bandera de Europa",
    europeanUnion: "Unión Europea",
    structuralFundsLine1: "Fondos Estructurales",
    structuralFundsLine2: "y de Inversión Europeos",
    signaturePlaceholder: "Tu firma aparecerá aquí mientras firmas abajo",
    claimLabel: "Reclamación",
  },
  ro: {
    title: "Împuternicire",
    body: "În calitate de pasager al zborului sau zborurilor menționate mai jos, acord prin prezenta societății Albuquerque & Araújo, Lda., cunoscută și ca Compensall, împuternicirea de a iniția și de a urmări o cerere de despăgubire întemeiată pe drepturile mele prevăzute în Regulamentul (CE) nr. 261/2004 al Parlamentului European și al Consiliului și în jurisprudența conexă, precum și de a întreprinde toate demersurile necesare, inclusiv procesarea plăților și deținerea, solicitarea sau furnizarea de date cu caracter personal exclusiv către entitățile relevante și în acest scop, în conformitate cu Termenii și Condițiile site-ului Compensall, pe care declar că îi accept. Această împuternicire include expres dreptul de a numi, substitui, delega sau transfera prezenta procură, în tot sau în parte, către terți, inclusiv avocați și reprezentanți legali, pentru valorificarea pretențiilor mele. Împuternicirea este exclusivă, irevocabilă și înlocuiește orice împuternicire emisă anterior, dacă există. Solicit, de asemenea, ca toate comunicările să fie adresate exclusiv societății menționate mai sus.",
    name: "Nume:",
    flights: "Zbor(uri):",
    from: "de la",
    to: "spre",
    flightsDate: "Data zborului/zborurilor:",
    date: "Data:",
    thePassenger: "Pasagerul:",
    passengerSignatureAlt: "Semnătura pasagerului",
    qrAlt: "Cod QR către site-ul oficial al Uniunii Europene",
    euFlagAlt: "Steagul Europei",
    europeanUnion: "Uniunea Europeană",
    structuralFundsLine1: "Fonduri structurale",
    structuralFundsLine2: "și de investiții europene",
    signaturePlaceholder: "Semnătura ta va apărea aici pe măsură ce semnezi mai jos",
    claimLabel: "Cerere",
  },
  hu: {
    title: "Meghatalmazás",
    body: "A lent megjelölt járat(ok) utasaként ezennel meghatalmazom az Albuquerque & Araújo, Lda. társaságot, amely Compensall néven is ismert, hogy az Európai Parlament és a Tanács 261/2004/EK rendelete és a kapcsolódó döntések szerinti jogaim alapján kárigényt indítson és érvényesítsen, valamint minden szükséges kapcsolódó intézkedést megtegyen — ideértve a kifizetések kezelését, továbbá a személyes adatok kizárólag az érintett szervezetekkel és e célból történő tárolását, kérését vagy átadását —, a Compensall honlapjának Általános Szerződési Feltételeivel összhangban, amelyeket ezennel elfogadok. Ez a meghatalmazás kifejezetten magában foglalja a jogot, hogy a meghatalmazást egészben vagy részben harmadik személyekre, így különösen ügyvédekre és jogi képviselőkre átruházzam, helyettesítsem vagy delegáljam a követeléseim érvényesítése érdekében. A meghatalmazás kizárólagos, visszavonhatatlan, és minden korábban kiadott meghatalmazást felvált, ha volt ilyen. Kérem továbbá, hogy minden kommunikációt kizárólag a fent megjelölt társasághoz címezzenek.",
    name: "Név:",
    flights: "Járat(ok):",
    from: "honnan",
    to: "hova",
    flightsDate: "Járat(ok) dátuma:",
    date: "Dátum:",
    thePassenger: "Az utas:",
    passengerSignatureAlt: "Az utas aláírása",
    qrAlt: "QR-kód az Európai Unió hivatalos honlapjára",
    euFlagAlt: "Európa zászlaja",
    europeanUnion: "Európai Unió",
    structuralFundsLine1: "Európai strukturális",
    structuralFundsLine2: "és beruházási alapok",
    signaturePlaceholder: "Az aláírásod itt jelenik meg, ahogy lent rajzolod",
    claimLabel: "Kárigény",
  },
  sq: {
    title: "Prokurë",
    body: "Si pasagjer ajror i fluturimit ose fluturimeve të përmendura më poshtë, i jap këtu Albuquerque & Araújo, Lda., e njohur edhe si Compensall, autorizimin për të nisur dhe ndjekur një kërkesë bazuar në të drejtat e mia sipas Rregullores (KE) nr. 261/2004 të Parlamentit Evropian dhe të Këshillit dhe vendimeve të lidhura, si dhe për të ndërmarrë të gjitha veprimet e nevojshme, përfshirë përpunimin e pagesave dhe mbajtjen, kërkimin ose dhënien e të dhënave personale vetëm te subjektet përkatëse dhe për këtë qëllim, në përputhje me Termat dhe Kushtet e faqes së Compensall, të cilat i pranoj. Ky autorizim përfshin shprehimisht të drejtën për të emëruar, zëvendësuar, deleguar ose transferuar këtë prokurë, tërësisht ose pjesërisht, te palë të treta, përfshirë avokatë dhe përfaqësues ligjorë, për të zbatuar pretendimet e mia. Kjo prokurë është ekskluzive, e parevokueshme dhe zëvendëson çdo prokurë të lëshuar më parë, nëse ka. Kërkoj gjithashtu që të gjitha komunikimet t'i drejtohen ekskluzivisht shoqërisë së sipërpërmendur.",
    name: "Emri:",
    flights: "Fluturimi/fluturimet:",
    from: "nga",
    to: "në",
    flightsDate: "Data e fluturimit/fluturimeve:",
    date: "Data:",
    thePassenger: "Pasagjeri:",
    passengerSignatureAlt: "Nënshkrimi i pasagjerit",
    qrAlt: "Kodi QR drejt faqes zyrtare të Bashkimit Evropian",
    euFlagAlt: "Flamuri i Evropës",
    europeanUnion: "Bashkimi Evropian",
    structuralFundsLine1: "Fondet Strukturore",
    structuralFundsLine2: "dhe të Investimeve Evropiane",
    signaturePlaceholder: "Nënshkrimi yt shfaqet këtu ndërsa vizaton më poshtë",
    claimLabel: "Kërkesa",
  },
  de: {
    title: "Vollmacht",
    body: "Als Fluggast des/der nachstehend genannten Fluges/Flüge erteile ich hiermit der Albuquerque & Araújo, Lda., auch bekannt als Compensall, die Vollmacht, einen Anspruch auf Grundlage meiner Rechte gemäß der Verordnung (EG) Nr. 261/2004 des Europäischen Parlaments und des Rates sowie damit zusammenhängender Entscheidungen einzuleiten und zu verfolgen und alle erforderlichen damit verbundenen Handlungen vorzunehmen, einschließlich der Verarbeitung von Zahlungen sowie des Speicherns, Anforderns oder Übermittelns personenbezogener Daten ausschließlich gegenüber den zuständigen Stellen und zu diesem Zweck, gemäß den Allgemeinen Geschäftsbedingungen der Website von Compensall, die ich hiermit akzeptiere. Diese Vollmacht umfasst ausdrücklich das Recht, sie ganz oder teilweise auf Dritte — insbesondere Rechtsanwälte und gesetzliche Vertreter — zu übertragen, zu substituieren oder zu delegieren, um meine Ansprüche durchzusetzen. Die Vollmacht ist ausschließlich, unwiderruflich und ersetzt etwaige zuvor erteilte Vollmachten. Ich bitte außerdem, dass sämtliche Kommunikation ausschließlich an das oben genannte Unternehmen gerichtet wird.",
    name: "Name:",
    flights: "Flug/Flüge:",
    from: "von",
    to: "nach",
    flightsDate: "Flugdatum:",
    date: "Datum:",
    thePassenger: "Der Fluggast:",
    passengerSignatureAlt: "Unterschrift des Fluggastes",
    qrAlt: "QR-Code zur offiziellen Website der Europäischen Union",
    euFlagAlt: "Europaflagge",
    europeanUnion: "Europäische Union",
    structuralFundsLine1: "Europäische Struktur-",
    structuralFundsLine2: "und Investitionsfonds",
    signaturePlaceholder: "Ihre Unterschrift erscheint hier, während Sie unten unterschreiben",
    claimLabel: "Antrag",
  },
  nl: {
    title: "Volmacht",
    body: "Als luchtpassagier van de hieronder vermelde vlucht(en) verleen ik hierbij aan Albuquerque & Araújo, Lda., ook bekend als Compensall, de bevoegdheid om een claim in te dienen en te vervolgen op grond van mijn rechten zoals vastgelegd in Verordening (EG) nr. 261/2004 van het Europees Parlement en de Raad en daarmee samenhangende uitspraken, en om alle noodzakelijke daarmee verband houdende handelingen te verrichten, waaronder het verwerken van betalingen en het bewaren, opvragen of verstrekken van persoonsgegevens uitsluitend aan de betrokken instanties en voor dit doel, overeenkomstig de Algemene Voorwaarden van de website van Compensall, die ik hierbij aanvaard. Deze bevoegdheid omvat uitdrukkelijk het recht om deze volmacht geheel of gedeeltelijk te benoemen, te substitueren, te delegeren of over te dragen aan derden, waaronder advocaten en wettelijke vertegenwoordigers, om mijn vorderingen te innen. Deze volmacht is exclusief, onherroepelijk en vervangt eventuele eerder afgegeven volmachten. Ik verzoek tevens dat alle communicatie uitsluitend aan bovengenoemde vennootschap wordt gericht.",
    name: "Naam:",
    flights: "Vlucht(en):",
    from: "van",
    to: "naar",
    flightsDate: "Datum van de vlucht(en):",
    date: "Datum:",
    thePassenger: "De passagier:",
    passengerSignatureAlt: "Handtekening van de passagier",
    qrAlt: "QR-code naar de officiële website van de Europese Unie",
    euFlagAlt: "Vlag van Europa",
    europeanUnion: "Europese Unie",
    structuralFundsLine1: "Europese structuur-",
    structuralFundsLine2: "en investeringsfondsen",
    signaturePlaceholder: "Uw handtekening verschijnt hier terwijl u hieronder tekent",
    claimLabel: "Claim",
  },
};

export function getPoaCopy(locale: string | null | undefined): PoaCopy {
  const appLocale = parseAppLocale(locale);
  switch (appLocale) {
    case "en":
      return POA_COPY.en;
    case "pt":
      return POA_COPY.pt;
    case "fr":
      return POA_COPY.fr;
    case "es":
      return POA_COPY.es;
    case "ro":
      return POA_COPY.ro;
    case "hu":
      return POA_COPY.hu;
    case "sq":
      return POA_COPY.sq;
    case "de":
      return POA_COPY.de;
    case "nl":
      return POA_COPY.nl;
    default: {
      const _exhaustive: never = appLocale;
      return _exhaustive;
    }
  }
}

export function getPoaDateLocale(locale: string | null | undefined): string {
  const appLocale = parseAppLocale(locale);
  switch (appLocale) {
    case "en":
      return "en-GB";
    case "pt":
      return "pt-PT";
    case "fr":
      return "fr-FR";
    case "es":
      return "es-ES";
    case "ro":
      return "ro-RO";
    case "hu":
      return "hu-HU";
    case "sq":
      return "sq-AL";
    case "de":
      return "de-DE";
    case "nl":
      return "nl-NL";
    default: {
      const _exhaustive: never = appLocale;
      return _exhaustive;
    }
  }
}

export function formatPoaDate(date: string, locale: string | null | undefined): string {
  if (!date) return "";
  const dateLocale = getPoaDateLocale(locale);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T12:00:00`).toLocaleDateString(dateLocale, options);
  }
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toLocaleDateString(dateLocale, options);
  }
  return date;
}

export const POA_CONTACT_EMAIL = "help@compensall.com";
export const POA_CONTACT_PHONE = "923391980";
export const POA_CONTACT_PHONE_DISPLAY = "+351 923 391 980";
/** Footer line matching the Compensall PoA PDF. */
export const POA_FOOTER_LINE =
  "Albuquerque & Araújo, Ltd · R. da Beneditina 6 · 4150-133 Porto, Portugal · www.compensall.com";
/** Official EU portal — encoded in the PoA QR code. */
export const POA_EU_QR_URL = "https://european-union.europa.eu/index_en";
