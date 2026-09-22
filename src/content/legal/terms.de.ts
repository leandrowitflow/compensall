import type { LegalDocument } from "./types";

export const termsDe: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Kurzüberblick:" },
      { type: "text", text: " Diese Allgemeinen Bedingungen regeln Ihre Beziehung zu " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Wir arbeiten No win, no fee: unsere rechtliche Unterstützung kostet Sie nichts, außer wenn wir Ihre Entschädigung erfolgreich einholen. Geht der Anspruch vor Gericht, gilt eine zusätzliche Erfolgsgebühr von 20 %, zahlbar nur bei Erfolg. Alle Gebühren stehen in der ",
      },
      { type: "link", href: "/prices", label: "Preisliste" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Begriffsbestimmungen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Soweit der Zusammenhang dieser Allgemeinen Bedingungen nichts anderes verlangt, haben die großgeschriebenen Begriffe die folgende Bedeutung (nachstehend: «Bedingungen»):",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "«Vertrag»:" },
              { type: "text", text: " die Vereinbarung zwischen dem Kunden und " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", die durch die Annahme der Bedingungen durch den Kunden zustande kommt. Für die Rechtsdienstleistungen gilt der Vertrag, sobald der Kunde zusätzlich das Auftragsformular unterzeichnet hat.",
              },
            ],
            [
              { type: "strong", text: "«Compensall»:" },
              { type: "text", text: " die juristische Person (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", Handelsregister " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), mit Sitz in " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", E-Mail " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Fluggastrechtevorschriften»:" },
              {
                type: "text",
                text: " jedes Gesetz, jede Verordnung, Richtlinie oder vergleichbare Regelung auf staatlicher, EU-, bundes-, nationaler oder regionaler Ebene, die Regeln für Geldentschädigung, Schadensersatz oder Erstattung von Fluggästen bei Überbuchung, Verspätung oder Annullierung festlegt.",
              },
            ],
            [
              { type: "strong", text: "«Auftragsformular»:" },
              { type: "text", text: " die Vereinbarung zwischen dem Kunden und " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", die geschlossen wird, nachdem der Kunde die Bedingungen zur Kenntnis genommen und angenommen hat, und die elektronisch oder schriftlich unterzeichnet wird. Mit diesem Vertrag erteilt der Kunde uns eine ausschließliche und unwiderrufliche Ermächtigung, einen Anspruch nach der Verordnung (EG) Nr. 261/2004 des Europäischen Parlaments und des Rates und der zugehörigen Rechtsprechung einzuleiten und durchzuführen sowie alle erforderlichen Handlungen vorzunehmen, einschließlich Abtretung oder Übertragung des Anspruchs, Entgegennahme von Zahlungen und Verarbeitung, Anforderung oder Weitergabe personenbezogener Daten, soweit nötig, jedoch nur gegenüber verbundenen Stellen und nur zu diesem Zweck.",
              },
            ],
            [
              { type: "strong", text: "«Kunde(n)»:" },
              {
                type: "text",
                text: " die Person, die das Auftragsformular unterzeichnet, die Bedingungen angenommen hat und Flugentschädigung verlangt.",
              },
            ],
            [
              { type: "strong", text: "«Entschädigung»:" },
              { type: "text", text: " der Gesamtbetrag, den eine Fluggesellschaft für einen Anspruch zahlt — als Entschädigung, außergerichtliche Einigung, Kulanz oder sonst — und der an den Kunden oder an " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " überwiesen wird, nachdem der Kunde die Bedingungen angenommen hat." },
            ],
            [
              { type: "strong", text: "«Informationsdienst»:" },
              { type: "text", text: " die Bereitstellung flugbezogener Informationen durch " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", einschließlich Angaben zu Airlines, Flughäfen, Fluggastrechten, Verbraucherschutz und weiteren Reiseinformationen. Die Informationen sollen für die Reisen des Kunden relevant sein und können einen weiteren Kontext umfassen. Sie werden über elektronische Kommunikation bereitgestellt, einschließlich E-Mail, personalisierter elektronischer Tafeln, von ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " gesteuerter Websites oder mobiler Anwendungen." },
            ],
            [
              { type: "strong", text: "«Gerichtsverfahren»:" },
              {
                type: "text",
                text: " antwortet die Airline nicht innerhalb von zwei Monaten oder wird die Antwort nach interner Prüfung als unzureichend bewertet, geht der Anspruch vor Gericht. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " behält das ausschließliche Recht, den geeignetsten Weg festzulegen, ohne Begründungspflicht, wobei der Kunde informiert bleibt. Wegen des erheblichen Zeit- und Ressourcenaufwands gilt eine zusätzliche Erfolgsgebühr von 20 %, zahlbar nur bei Erfolg. Die Anwesenheit des Kunden vor Gericht ist nicht erforderlich; erwartet wird die Mitwirkung durch Unterlagen, Informationen oder Beweise.",
              },
            ],
            [
              { type: "strong", text: "«Preisliste»:" },
              {
                type: "text",
                text: " die Anlage zu diesen Bedingungen, die akzeptierte Währungen, Zahlungswege und alle Gebühren von ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " festlegt. Die Preisliste ist veröffentlicht auf der ", },
              { type: "link", href: "/prices", label: "Preisseite" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Verordnung 261/04»:" },
              {
                type: "text",
                text: " die Verordnung (EG) Nr. 261/2004 des Europäischen Parlaments und des Rates vom 11. Februar 2004 über gemeinsame Regeln für Ausgleichs- und Unterstützungsleistungen für Fluggäste im Fall der Nichtbeförderung und bei Annullierung oder großer Verspätung von Flügen.",
              },
            ],
            [
              { type: "strong", text: "«Anspruch»:" },
              {
                type: "text",
                text: " jede finanzielle Entschädigungsforderung gegen eine Fluggesellschaft nach der Verordnung (EG) Nr. 261/2004.",
              },
            ],
            [
              { type: "strong", text: "«Anforderungen an Datenschutz und Privatsphäre»:" },
              {
                type: "text",
                text: " alle geltenden Gesetze und Vorschriften zur Verarbeitung personenbezogener Daten und zum Datenschutz, einschließlich Leitlinien und Verhaltenskodizes der Aufsichtsbehörden sowie gleichwertiger Regelungen in jedem maßgeblichen Rechtsraum.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Die vorstehenden Begriffsbestimmungen gelten für den Abschluss und die Erfüllung jedes Dokuments oder Vorgangs im Zusammenhang mit den Bedingungen.",
            },
          ],
        },
      ],
    },
    {
      title: "Artikel 1. Auftragsformular",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              { type: "text", text: " Der Kunde nimmt die Bedingungen (das Auftragsformular) freiwillig an; sie bilden die Grundlage jedes weiteren Dokuments zwischen dem Kunden und " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nutzt einen Online-Authentifizierungsdienst für fortgeschrittene elektronische Signaturen, der die Anforderungen von Artikel 26 der Verordnung über elektronische Identifizierung erfüllt, international anerkannt und auch von Gerichten akzeptiert wird. Der Kunde muss das Formular daher nicht ausdrucken, unterschreiben und per Einschreiben zurücksenden.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " Mit dem Vertragsschluss bestätigt der Kunde, befugt und geschäftsfähig zu sein, Dokumente zu unterzeichnen, die ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " und den Kunden binden, oder — soweit zutreffend — im Namen einer anderen Person (zum Beispiel eines Kindes) zu unterzeichnen.",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " Der Kunde verpflichtet sich, " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " alle Daten und Informationen zur Verfügung zu stellen, die für die Einziehung der Flugentschädigung beim ausführenden Luftfahrtunternehmen erforderlich sind." },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ist nur berechtigt, Flugentschädigungen in Geld anzunehmen; Reisegutscheine oder andere vom ausführenden Unternehmen angebotene Leistungen werden nicht angenommen." },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " Der Kunde gewährleistet, dass die Entschädigung nicht an Dritte abgetreten wurde und dass über denselben Gegenstand kein Rechtsstreit zwischen dem Kunden und der Airline anhängig ist oder anhängig gemacht wird.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " Nach Unterzeichnung des Auftragsformulars hat der Kunde Verhandlungen mit der betreffenden Airline einzustellen und jeden Kontakt an ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " weiterzuleiten, damit " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " das bestmögliche Ergebnis erzielen kann." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " Der Kunde bestätigt, dass die Bedingungen unmittelbarer Beweis und Ausdruck seines wirklichen Willens sind, den die ausführenden Luftfahrtunternehmen zu beachten haben. Der Kunde vereinbart mit ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", dass alle Entschädigungszahlungen der ausführenden Unternehmen aufgrund der Ansprüche von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " direkt auf die Bankkonten von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " oder auf andere zwischen " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " und dem Kunden vereinbarte Konten gehen." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " Der Kunde stimmt außerdem zu, dass " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ihn bei der Wahrnehmung seines Rechts unterstützt, seine Interessen bei der Einziehung der Flugentschädigung zu wahren." },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Erhält der Kunde nach Vertragsschluss direkte Zahlungen oder sonstige Entschädigung von der Airline, ist er verpflichtet, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " unverzüglich zu unterrichten. Solche Zahlungen gelten als Entschädigung und geben " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " das Recht, die Servicegebühr und die Gerichtsgebühr zu verlangen, wenn " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " bereits Klage erhoben hat, bevor der Kunde die Zahlung der Airline erhalten hat." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 2. Beschreibung der Rechtsdienstleistung",
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
                text: " leitet den Anspruch des Kunden an die Airline weiter, die den Flug durchführt, gestützt auf die Verordnung 261/2004 oder jede andere Fluggastrechtevorschrift, die für diesen Flug gilt.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Flugdaten können " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " über die Website, per E-Mail oder telefonisch übermittelt werden." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Um den Anspruch fortzusetzen, verlangt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " die Unterzeichnung des Auftragsformulars, das über das Webformular, per E-Mail oder per Post übermittelt werden kann. Nach Eingang des Formulars handelt ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " im eigenen Namen, um den abgetretenen Anspruch gegenüber der Airline geltend zu machen." },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Kommt keine Einigung mit dem ausführenden Luftfahrtunternehmen zustande oder ist nach Ansicht von ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " der Einzug auf diesem Weg wirksamer oder schneller, ist ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " berechtigt, den Rechtsweg zu beschreiten, wodurch sich der Anteil der Entschädigung erhöht, der " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " zusteht, wie in der " },
              { type: "link", href: "/prices", label: "Preisliste" },
              { type: "text", text: " angegeben." },
            ],
            [
              { type: "strong", text: "2.5." },
              { type: "text", text: " Wird ein beauftragter Rechtsvertreter ins Verfahren einbezogen, stimmt der Kunde zu, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " zu gestatten, dem Vertreter Zugang zu allen maßgeblichen Akteninformationen zu geben und den Vertreter zu ermächtigen, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " über den Fortgang zu unterrichten. Verlangt das Gericht Beglaubigungen, Vollmachten, eidesstattliche Erklärungen, Auftragsformulare oder andere Dokumente, unterzeichnet der Kunde diese. Hat der Kunde das Auftragsformular bereits unterzeichnet, gilt als vereinbart, dass der Anspruch ihm vor Unterzeichnung solcher Zusatzdokumente automatisch zurückübertragen wird.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Stellt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " oder der beauftragte Vertreter fest, dass der Anspruch keine hinreichende Erfolgsaussicht hat, wird die Akte geschlossen und der Kunde unterrichtet.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Leiten " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " oder der Vertreter ein Verfahren ein, trägt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " die Kosten bei Unterliegen. Bei Obsiegen oder Vergleich trägt ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " die Kosten, die die Airline nicht erstattet." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " Der Kunde erkennt an, dass die Bearbeitung des Anspruchs lange dauern kann und " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nicht beeinflussen kann, wie schnell der Anspruch durchsetzbar ist." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 3. Gebühren und Zahlungen",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Unser Service wird " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: " erbracht, wie in der " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Vereinbarung No win, no fee" },
            { type: "text", text: " festgelegt. Alle geltenden Gebühren stehen in der " },
            { type: "link", href: "/prices", label: "Preisliste" },
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
              { type: "text", text: " erbringt rechtliche Unterstützung unentgeltlich, außer wenn " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " die Entschädigung erfolgreich einzieht. Bei Erfolg überweist " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " dem Kunden den vereinbarten Anteil nach den Sätzen der Preisliste." },
            ],
            [
              { type: "strong", text: "3.2." },
              { type: "text", text: " Der vereinbarte Anteil wird dem Kunden nach den Optionen der Preisliste ausgezahlt." },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Hat der Kunde unrichtige oder unzureichende Zahlungsangaben gemacht, geht die Zahlung an ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " zurück. Reagiert der Kunde nach mehreren Mitteilungen und angemessenen Versuchen von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", ihn auf anderem Weg als über die angegebene E-Mail zu erreichen, nicht, ist " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " berechtigt, den Anteil einzubehalten, der dem Kunden zugestanden hätte." },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Nachdem " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " die vereinbarte Entschädigung nach den Weisungen und dem vom Kunden gewählten Weg gezahlt hat, haftet " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " nicht für: (i) Probleme mit Schecks, Prepaid- oder Kreditkarten oder sonstige Verluste auf dem Transportweg; oder (ii) Folgen falscher Bankdaten, einer falschen Adresse oder vergleichbarer Fehler, einschließlich Zahlung an den falschen Empfänger. Geht die Zahlung durch Verschulden des Kunden an den falschen Empfänger, ist ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nicht verpflichtet, sie aktiv zurückzuholen." },
            ],
            [
              { type: "strong", text: "3.5." },
              { type: "text", text: " Zinsen für den Zeitraum zwischen Eingang und Auszahlung der Entschädigung können nicht verlangt werden. " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " behält das Recht, von der Airline eingezogene Zinsen einzubehalten." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " haftet nicht für Entschädigung, Schäden oder damit zusammenhängende Ansprüche, wenn die Überweisung wegen eines Ereignisses außerhalb angemessener Kontrolle nicht möglich ist, einschließlich Streiks, Arbeitskämpfen, Naturkatastrophen, Krieg, Unruhen, Sabotage, Einhaltung von Gesetzen oder behördlichen Anordnungen, Unfällen, Anlagenausfällen, Brand, Überschwemmung oder Sturm.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Da der Sitz von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " in Portugal liegt, bestimmt sich die MwSt., soweit anwendbar, nach portugiesischem Recht zum gesetzlichen Satz." },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " Für Konten im einheitlichen Euro-Zahlungsverkehrsraum (SEPA) erfolgen Zahlungen per Überweisung. Bei einer internationalen Überweisung an den Kunden werden alle Bankgebühren vom Kundenanteil an der Flugentschädigung abgezogen.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              { type: "text", text: " Um Bankkosten zu sparen, überweist " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " bei gemeinsamer Buchung oder in anderen Fällen (z. B. Eltern, die für Kinder ausgezahlt werden) alle Beträge auf ein einziges Konto, wenn der Kunde das zulässt oder bei der Datenübermittlung ein Konto angibt. Wer Geld für andere entgegennimmt, ist verpflichtet, mit ihnen abzurechnen; " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " trägt nicht das Risiko der Nichtzahlung." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " Flugentschädigung und andere Zahlungen leistet " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nur an die endgültigen Berechtigten. " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " zahlt nicht an Vermittler, Agenturen, Vertreter oder Dritte, außer sie legen schriftliche Unterlagen vor, die die Befugnis zur Entgegennahme von Zahlungen im Namen des Berechtigten klar belegen. Bei Unsicherheit kann ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " zusätzliche Nachweise verlangen und nach eigenem Ermessen die Direktzahlung ablehnen." },
            ],
            [
              { type: "strong", text: "3.11." },
              { type: "text", text: " Erhält der Kunde nach Beauftragung von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " eine Zahlung oder eine andere Form von Flugentschädigung, etwa einen Gutschein, vom ausführenden Unternehmen, ist er verpflichtet, dies unverzüglich mitzuteilen. In diesem Fall zahlt der Kunde " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " die Vergütung nach der Preisliste innerhalb von 10 (zehn) Tagen ab Erhalt der Entschädigung auf das auf der Website von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " angegebene Konto oder auf jedes andere schriftlich mitgeteilte Konto." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 4. Schutz personenbezogener Daten",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " Der Kunde gewährleistet, dass die " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " zum Anspruch übermittelten Daten zutreffend, vollständig, wahr und nicht irreführend sind. Der Kunde hält " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " schadlos für jeden Anspruch, der aus unrichtigen Angaben oder mangelnder Mitwirkung des Kunden entsteht." },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " kann personenbezogene Daten auch für weitere Zwecke erheben, etwa statistische Auswertung, Verwaltung, Kommunikation, IT- und Sicherheitsmanagement, physische Sicherheit, Authentifizierung, Unterstützungssysteme, Projektkoordination und organisatorische Tätigkeiten. Alle Daten werden nach der Datenschutz-Grundverordnung, Verordnung (EU) 2016/679, erhoben (siehe ",
              },
              { type: "link", href: "/privacy-policy", label: "Datenschutzerklärung" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " Der Kunde übermittelt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " personenbezogene Daten nach DSGVO oder anderen maßgeblichen Gesetzen und erteilt die ausdrückliche Einwilligung zur Verarbeitung und Nutzung dieser Daten im Rahmen des Vertrags. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " gibt Daten an Dritte nur weiter, wenn: (i) der Kunde eingewilligt hat; (ii) es für einen Zweck erforderlich ist, der unmittelbar mit dem ursprünglichen Erhebungszweck zusammenhängt; (iii) es für Vorbereitung, Verhandlung und Erfüllung der Vereinbarung mit dem Kunden nötig ist; (iv) es durch gesetzliche Pflicht, Verwaltungs- oder Gerichtsbeschluss verlangt wird; (v) es zur Begründung oder Verteidigung rechtlicher Ansprüche nötig ist; oder (vi) es erforderlich ist, Missbrauch oder andere rechtswidrige Tätigkeiten zu verhindern.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Im Rahmen der Vertragsbeziehung nach diesen Bedingungen kann " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " dem Kunden von Zeit zu Zeit dienstbezogene Mitteilungen senden, auch per E-Mail. Dazu können Hinweise auf weitere mögliche Ansprüche nach Fluggastrechtevorschriften gehören, gestützt auf die Analyse von ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " der Akten oder öffentlicher Flugdaten. Solche Nachrichten sollen den Kunden nur bei der Ausübung seiner Rechte unterstützen und fallen in das berechtigte Interesse von ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: ", verbundene Leistungen zu erbringen." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Der Kunde kann diese Mitteilungen jederzeit über den Abmeldelink oder durch Kontakt mit " },
            { type: "brand", field: "brandName" },
            { type: "text", text: " unter " },
            { type: "email" },
            { type: "text", text: " abbestellen." },
          ],
        },
      ],
    },
    {
      title: "Artikel 5. Widerrufsrecht",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              { type: "text", text: " Das Vertragsverhältnis endet, wenn der Vertrag vollständig erfüllt ist, das heißt, wenn die Zahlung nach dem Vertrag vollständig erfolgt ist." },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Qualifizieren Sie sich als Verbraucher nach den EU-Verbrauchervorschriften — also als natürliche Person, die ein Rechtsgeschäft zu einem Zweck vornimmt, der weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden kann —, haben Sie ein gesetzliches Widerrufsrecht.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " Der Vertrag endet sofort: (i) wenn " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " nach vertiefter Prüfung feststellt, dass der Anspruch voraussichtlich keinen Erfolg hat, und der Kunde unterrichtet wird; (ii) bei unrichtigen Angaben oder arglistigem Verhalten des Kunden, nach Entscheidung von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "; oder (iii) wenn der Kunde als Verbraucher innerhalb von 14 (vierzehn) Tagen nach Vertragsschluss den Widerruf per E-Mail erklärt. Das Kündigungsrecht aus diesem Grund erlischt vorzeitig, wenn der Vertrag vor Ablauf dieser Frist vollständig erfüllt ist." },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " Sie können Ihre Annahme des Vertrags innerhalb von 14 Tagen nach Abschluss (zum Beispiel per Brief oder E-Mail) ohne Angabe von Gründen widerrufen. Zur Ausübung muss die Mitteilung innerhalb dieser 14 Tage erfolgen und klar erklären, dass Sie widerrufen wollen. Wegen der Natur der Leistung können Sie nicht mehr widerrufen, nachdem wir Ihnen mitgeteilt haben, dass die Airline den Anspruch anerkannt hat, weil die Leistung dann bereits erbracht ist. Der Widerruf kann an unsere E-Mail ",
              },
              { type: "email" },
              { type: "text", text: " gesendet werden." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 6. Schlussbestimmungen",
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
                text: " ist berechtigt, die Bedingungen jederzeit ohne Ankündigung zu ändern und zusätzliche Bedingungen festzulegen, wird sich aber bemühen, den Kunden auf dem Laufenden zu halten. Sind Änderungen aus Sicht des Kunden nachteilig, muss der Kunde sie genehmigen, damit die geänderten Bedingungen für ihn gelten.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " Für die Bedingungen, den Vertrag und jedes andere verbundene Dokument gilt das Recht der Portugiesischen Republik, soweit im jeweiligen Dokument nichts anderes vereinbart ist. Der Kunde als Verbraucher hat außerdem das Recht, Schutz nach den zwingenden Vorschriften des Landes zu verlangen, in dem er seinen gewöhnlichen Aufenthalt hat.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " verwendet personenbezogene Daten des Kunden und, soweit zutreffend, seiner Beschäftigten ausschließlich zur Durchführung des Anspruchs. Angaben zu Umfang und Form der Erhebung, Speicherung und Nutzung stehen in der ",
              },
              { type: "link", href: "/privacy-policy", label: "Datenschutzerklärung" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              { type: "text", text: " Ist der Kunde eine juristische Person, gewährleistet er, dass: (i) die " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " übermittelten personenbezogenen Daten stets nach den Anforderungen an Datenschutz und Privatsphäre erhoben und weitergegeben werden; und (ii) " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " für die Zwecke dieses Vertrags als Auftragsverarbeiter und nicht als Verantwortlicher (im Sinne der Datenschutzanforderungen) für die Verarbeitungstätigkeiten nach diesem Vertrag handelt." },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Wird eine Bestimmung der Bedingungen von einem Gericht oder Schiedsgericht als rechtswidrig, unwirksam oder undurchsetzbar angesehen, bleiben die übrigen Bestimmungen in Kraft. Eine nur teilweise betroffene Bestimmung bleibt im wirksamen Teil bestehen. ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ändert die Bedingungen, indem unwirksame Regelungen durch rechtmäßige ersetzt werden, die den Zielen von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " und dem Kunden möglichst nahekommen." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ist berechtigt, diese Bedingungen und die Preisliste jederzeit ohne Ankündigung zu ändern und zusätzliche Bedingungen festzulegen. Änderungen mit nachteiliger Wirkung für den Kunden gelten für ihn nur, wenn er sie annimmt." },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Beschränken oder verbieten nationale Gesetze die Abtretung von Ansprüchen, handelt " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " mit örtlichen Rechtsvertretern nach den geltenden lokalen Regeln." },
            ],
            [
              { type: "strong", text: "6.8." },
              { type: "text", text: " Rechte und Pflichten, die ganz oder teilweise mit einem geltend gemachten Anspruch verbunden sind, können uneingeschränkt von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " auf jedes Unternehmen der Gruppe " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " und von " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " auf Dritte übertragen werden." },
            ],
          ],
        },
      ],
    },
    {
      title: "Anlage Nr. 1 — Preisliste",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Die Preisliste ist Bestandteil dieser Bedingungen und wird auf der " },
            { type: "link", href: "/prices", label: "Preisseite" },
            { type: "text", text: " veröffentlicht. Sie legt akzeptierte Währungen, Zahlungswege und alle Gebühren von " },
            { type: "brand", field: "brandName" },
            { type: "text", text: " fest, einschließlich der Erfolgsgebühr und der zusätzlichen Gerichtsgebühr von 20 %." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Die kaufmännischen Gebührenbedingungen stehen in der " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Vereinbarung No win, no fee" },
            { type: "text", text: ". Fragen zu diesen Bedingungen senden Sie an " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Dokumentversion 4.0. Letzte Aktualisierung: September 2026",
};
