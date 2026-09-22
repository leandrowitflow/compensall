import type { LegalDocument } from "./types";

export const termsNl: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Kort overzicht:" },
      { type: "text", text: " Deze algemene voorwaarden regelen uw relatie met " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Wij werken No win, no fee: onze juridische ondersteuning kost u niets, behalve als wij uw compensatie succesvol innen. Gaat de claim naar de rechter, dan geldt een extra succesfee van 20 %, alleen verschuldigd bij succes. Alle fees staan in de ",
      },
      { type: "link", href: "/prices", label: "prijslijst" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Begripsbepalingen",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Voor zover het verband van deze algemene voorwaarden niets anders verlangt, hebben de met een hoofdletter geschreven begrippen de volgende betekenis (hierna: «Voorwaarden»):",
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "«Overeenkomst»:" },
              { type: "text", text: " de overeenkomst tussen de Klant en " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", die tot stand komt door aanvaarding van de Voorwaarden door de Klant. Voor de juridische diensten geldt de Overeenkomst zodra de Klant daarnaast het Opdrachtformulier heeft ondertekend.",
              },
            ],
            [
              { type: "strong", text: "«Compensall»:" },
              { type: "text", text: " de rechtspersoon (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", handelsregister " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), gevestigd te " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", e-mail " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Passagiersrechtenvoorschriften»:" },
              {
                type: "text",
                text: " elke wet, verordening, richtlijn of vergelijkbare regeling op staats-, EU-, federaal, nationaal of regionaal niveau die regels vaststelt voor geldelijke compensatie, schadevergoeding of terugbetaling van passagiers bij overboeking, vertraging of annulering.",
              },
            ],
            [
              { type: "strong", text: "«Opdrachtformulier»:" },
              { type: "text", text: " de overeenkomst tussen de Klant en " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", die wordt gesloten nadat de Klant de Voorwaarden heeft kennisgenomen en aanvaard, en die elektronisch of schriftelijk wordt ondertekend. Met deze Overeenkomst verleent de Klant ons een exclusieve en onherroepelijke machtiging om een claim volgens Verordening (EG) nr. 261/2004 van het Europees Parlement en de Raad en de bijbehorende rechtspraak in te leiden en uit te voeren, alsmede alle vereiste handelingen te verrichten, met inbegrip van cessie of overdracht van de claim, ontvangst van betalingen en verwerking, opvraging of doorgifte van persoonsgegevens, voor zover nodig, echter alleen jegens verbonden instanties en alleen voor dit doel.",
              },
            ],
            [
              { type: "strong", text: "«Klant(en)»:" },
              {
                type: "text",
                text: " de persoon die het Opdrachtformulier ondertekent, de Voorwaarden heeft aanvaard en vluchtcompensatie vordert.",
              },
            ],
            [
              { type: "strong", text: "«Compensatie»:" },
              { type: "text", text: " het totale bedrag dat een airline voor een claim betaalt — als compensatie, buitengerechtelijke schikking, coulance of anderszins — en dat aan de Klant of aan " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " wordt overgemaakt, nadat de Klant de Voorwaarden heeft aanvaard." },
            ],
            [
              { type: "strong", text: "«Informatiedienst»:" },
              { type: "text", text: " het verstrekken van vluchtgerelateerde informatie door " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", met inbegrip van gegevens over airlines, luchthavens, passagiersrechten, consumentenbescherming en verdere reisinformatie. De informatie moet relevant zijn voor de reizen van de Klant en kan een ruimer kader omvatten. Zij wordt verstrekt via elektronische communicatie, met inbegrip van e-mail, gepersonaliseerde elektronische borden, door ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " beheerde websites of mobiele toepassingen." },
            ],
            [
              { type: "strong", text: "«Gerechtelijke procedure»:" },
              {
                type: "text",
                text: " reageert de airline niet binnen twee maanden of wordt het antwoord na interne toetsing als ontoereikend beoordeeld, dan gaat de claim naar de rechter. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " behoudt het exclusieve recht de meest geschikte weg vast te stellen, zonder motiveringsplicht, waarbij de Klant geïnformeerd blijft. Vanwege de aanzienlijke tijds- en middeleninzet geldt een extra succesfee van 20 %, alleen verschuldigd bij succes. De aanwezigheid van de Klant in rechte is niet vereist; verwacht wordt medewerking door stukken, informatie of bewijs.",
              },
            ],
            [
              { type: "strong", text: "«Prijslijst»:" },
              {
                type: "text",
                text: " de bijlage bij deze Voorwaarden, die geaccepteerde valuta, betaalwegen en alle fees van ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vastlegt. De Prijslijst is gepubliceerd op de ", },
              { type: "link", href: "/prices", label: "prijspagina" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Verordening 261/04»:" },
              {
                type: "text",
                text: " Verordening (EG) nr. 261/2004 van het Europees Parlement en de Raad van 11 februari 2004 tot vaststelling van gemeenschappelijke regels inzake compensatie en bijstand aan luchtreizigers bij instapweigering en annulering of langdurige vertraging van vluchten.",
              },
            ],
            [
              { type: "strong", text: "«Claim»:" },
              {
                type: "text",
                text: " elke financiële compensatievordering tegen een airline volgens Verordening (EG) nr. 261/2004.",
              },
            ],
            [
              { type: "strong", text: "«Eisen inzake gegevensbescherming en privacy»:" },
              {
                type: "text",
                text: " alle toepasselijke wetten en voorschriften over de verwerking van persoonsgegevens en privacy, met inbegrip van richtsnoeren en gedragscodes van toezichthouders alsmede gelijkwaardige regelingen in elk relevant rechtsgebied.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "De voorgaande begripsbepalingen gelden voor het sluiten en de nakoming van elk document of elke handeling in verband met de Voorwaarden.",
            },
          ],
        },
      ],
    },
    {
      title: "Artikel 1. Opdrachtformulier",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              { type: "text", text: " De Klant aanvaardt de Voorwaarden (het Opdrachtformulier) vrijwillig; zij vormen de grondslag van elk verder document tussen de Klant en " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " gebruikt een online-authenticatiedienst voor geavanceerde elektronische handtekeningen die voldoet aan de eisen van artikel 26 van de verordening betreffende elektronische identificatie, internationaal erkend en ook door rechterlijke instanties aanvaard. De Klant hoeft het formulier daarom niet te printen, te ondertekenen en per aangetekende post terug te sturen.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " Met het sluiten van de Overeenkomst bevestigt de Klant bevoegd en handelingsbekwaam te zijn om documenten te ondertekenen die ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " en de Klant binden, of — voor zover van toepassing — namens een andere persoon (bijvoorbeeld een kind) te ondertekenen.",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " De Klant verplicht zich " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " alle gegevens en informatie te verstrekken die nodig zijn om de vluchtcompensatie bij de uitvoerende luchtvaartmaatschappij te innen." },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " is alleen gerechtigd vluchtcompensatie in geld te aanvaarden; reisvouchers of andere door de uitvoerende onderneming aangeboden prestaties worden niet aanvaard." },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " De Klant waarborgt dat de compensatie niet aan derden is gecedeerd en dat over hetzelfde onderwerp geen rechtsgeding tussen de Klant en de airline aanhangig is of aanhangig wordt gemaakt.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " Na ondertekening van het Opdrachtformulier moet de Klant onderhandelingen met de betreffende airline staken en elk contact doorsturen naar ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", zodat " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " het best mogelijke resultaat kan behalen." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " De Klant bevestigt dat de Voorwaarden onmiddellijk bewijs en uitdrukking van zijn werkelijke wil zijn, die de uitvoerende luchtvaartmaatschappijen in acht moeten nemen. De Klant komt met ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " overeen dat alle compensatiebetalingen van de uitvoerende ondernemingen op grond van de claims van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " rechtstreeks naar de bankrekeningen van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " of naar andere tussen " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " en de Klant overeengekomen rekeningen gaan." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " De Klant stemt er verder mee in dat " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " hem bijstaat bij de uitoefening van zijn recht om zijn belangen bij de inning van de vluchtcompensatie te behartigen." },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Ontvangt de Klant na het sluiten van de Overeenkomst rechtstreekse betalingen of andere compensatie van de airline, dan is hij verplicht ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " onverwijld te informeren. Zulke betalingen gelden als Compensatie en geven " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " het recht de servicefee en de gerechtelijke fee te vorderen, als " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " al een vordering heeft ingesteld voordat de Klant de betaling van de airline ontving." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 2. Beschrijving van de juridische dienst",
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
                text: " leidt de claim van de Klant door naar de airline die de vlucht uitvoert, steunend op Verordening 261/2004 of elke andere passagiersrechtenvoorschrift die voor die vlucht geldt.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Vluchtgegevens kunnen " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " via de website, per e-mail of telefonisch worden doorgegeven." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Om de claim voort te zetten, verlangt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " de ondertekening van het Opdrachtformulier, dat via het webformulier, per e-mail of per post kan worden verstrekt. Na ontvangst van het formulier handelt ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " in eigen naam om de gecedeerde claim jegens de airline geldend te maken." },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Komt geen schikking met de uitvoerende luchtvaartmaatschappij tot stand of is naar het oordeel van ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " de inning langs deze weg doeltreffender of sneller, dan is ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " gerechtigd de gerechtelijke weg te bewandelen, waardoor het aandeel van de compensatie toeneemt dat " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " toekomt, zoals aangegeven in de " },
              { type: "link", href: "/prices", label: "prijslijst" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              { type: "text", text: " Wordt een ingeschakelde juridisch vertegenwoordiger bij de procedure betrokken, dan stemt de Klant ermee in " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " toe te staan de vertegenwoordiger toegang tot alle relevante dossierinformatie te geven en de vertegenwoordiger te machtigen ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " over de voortgang te informeren. Verlangt de rechter legalisaties, volmachten, beëdigde verklaringen, opdrachtformulieren of andere documenten, dan ondertekent de Klant deze. Heeft de Klant het Opdrachtformulier al ondertekend, dan geldt als overeengekomen dat de claim hem vóór ondertekening van zulke aanvullende documenten automatisch wordt terugovergedragen.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Stelt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " of de ingeschakelde vertegenwoordiger vast dat de claim onvoldoende kans van slagen heeft, dan wordt het dossier gesloten en de Klant geïnformeerd.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Leiden " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " of de vertegenwoordiger een procedure in, dan draagt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " de kosten bij verlies. Bij winst of schikking draagt ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " de kosten die de airline niet vergoedt." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " De Klant erkent dat de behandeling van de claim lang kan duren en " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " niet kan beïnvloeden hoe snel de claim afdwingbaar is." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 3. Fees en betalingen",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Onze dienst wordt " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: " verleend, zoals vastgelegd in de " },
            { type: "link", href: "/documents/no-win-no-fee", label: "overeenkomst No win, no fee" },
            { type: "text", text: ". Alle toepasselijke fees staan in de " },
            { type: "link", href: "/prices", label: "prijslijst" },
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
              { type: "text", text: " verleent juridische ondersteuning om niet, behalve als " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " de compensatie succesvol int. Bij succes maakt " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " het overeengekomen aandeel aan de Klant over volgens de tarieven van de Prijslijst." },
            ],
            [
              { type: "strong", text: "3.2." },
              { type: "text", text: " Het overeengekomen aandeel wordt aan de Klant uitbetaald volgens de opties van de Prijslijst." },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Heeft de Klant onjuiste of ontoereikende betalingsgegevens verstrekt, dan keert de betaling terug naar ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Reageert de Klant na meerdere berichten en redelijke pogingen van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " om hem langs een andere weg dan het opgegeven e-mailadres te bereiken, niet, dan is " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " gerechtigd het aandeel in te houden dat de Klant zou zijn toekomend." },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Nadat " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " de overeengekomen compensatie volgens de aanwijzingen en de door de Klant gekozen weg heeft betaald, is " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " niet aansprakelijk voor: (i) problemen met cheques, prepaid- of creditcards of andere verliezen onderweg; of (ii) gevolgen van onjuiste bankgegevens, een onjuist adres of vergelijkbare fouten, met inbegrip van betaling aan de verkeerde ontvanger. Gaat de betaling door schuld van de Klant naar de verkeerde ontvanger, dan is ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " niet verplicht deze actief terug te vorderen." },
            ],
            [
              { type: "strong", text: "3.5." },
              { type: "text", text: " Rente over de periode tussen ontvangst en uitbetaling van de compensatie kan niet worden gevorderd. " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " behoudt het recht van de airline geïnde rente in te houden." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " is niet aansprakelijk voor compensatie, schade of daarmee samenhangende claims als de overmaking wegens een gebeurtenis buiten redelijke controle niet mogelijk is, met inbegrip van stakingen, arbeidsconflicten, natuurrampen, oorlog, onlusten, sabotage, naleving van wetten of overheidsbevelen, ongevallen, uitval van installaties, brand, overstroming of storm.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Omdat de vestiging van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " in Portugal ligt, wordt de btw, voor zover van toepassing, bepaald volgens Portugees recht tegen het wettelijke tarief." },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " Voor rekeningen in de gemeenschappelijke eurobetalingsruimte (SEPA) geschieden betalingen per overboeking. Bij een internationale overmaking aan de Klant worden alle bankkosten afgetrokken van het klantaandeel in de vluchtcompensatie.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              { type: "text", text: " Om bankkosten te beperken, maakt " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " bij gezamenlijke boeking of in andere gevallen (bijv. ouders die voor kinderen worden uitbetaald) alle bedragen over naar één rekening, als de Klant dat toestaat of bij de gegevensverstrekking één rekening opgeeft. Wie geld voor anderen ontvangt, is verplicht met hen af te rekenen; " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " draagt niet het risico van niet-betaling." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " Vluchtcompensatie en andere betalingen verricht " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " alleen aan de uiteindelijk gerechtigden. " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " betaalt niet aan tussenpersonen, agentschappen, vertegenwoordigers of derden, tenzij zij schriftelijke stukken overleggen die de bevoegdheid tot ontvangst van betalingen namens de gerechtigde duidelijk aantonen. Bij onzekerheid kan ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " aanvullend bewijs verlangen en naar eigen inzicht de rechtstreekse betaling weigeren." },
            ],
            [
              { type: "strong", text: "3.11." },
              { type: "text", text: " Ontvangt de Klant na opdrachtverlening aan " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " een betaling of een andere vorm van vluchtcompensatie, bijvoorbeeld een voucher, van de uitvoerende onderneming, dan is hij verplicht dit onverwijld mee te delen. In dat geval betaalt de Klant " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " de vergoeding volgens de Prijslijst binnen 10 (tien) dagen na ontvangst van de compensatie op de op de website van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " vermelde rekening of op elke andere schriftelijk meegedeelde rekening." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 4. Bescherming van persoonsgegevens",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " De Klant waarborgt dat de aan " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " over de claim verstrekte gegevens juist, volledig, waar en niet misleidend zijn. De Klant vrijwaart " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " voor elke claim die voortvloeit uit onjuiste gegevens of gebrekkige medewerking van de Klant." },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " kan persoonsgegevens ook voor verdere doelen verzamelen, zoals statistische evaluatie, beheer, communicatie, IT- en beveiligingsbeheer, fysieke beveiliging, authenticatie, ondersteuningssystemen, projectcoördinatie en organisatorische activiteiten. Alle gegevens worden verzameld volgens de Algemene verordening gegevensbescherming, Verordening (EU) 2016/679 (zie de ",
              },
              { type: "link", href: "/privacy-policy", label: "privacyverklaring" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " De Klant verstrekt " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " persoonsgegevens volgens de AVG of andere relevante wetten en verleent uitdrukkelijke toestemming tot verwerking en gebruik van die gegevens in het kader van de Overeenkomst. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " geeft gegevens alleen door aan derden als: (i) de Klant toestemming heeft gegeven; (ii) het nodig is voor een doel dat rechtstreeks samenhangt met het oorspronkelijke verzameldoel; (iii) het nodig is voor voorbereiding, onderhandeling en nakoming van de overeenkomst met de Klant; (iv) het wordt vereist door een wettelijke plicht, een administratief of gerechtelijk bevel; (v) het nodig is om rechtsvorderingen in te stellen of te verdedigen; of (vi) het nodig is om misbruik of andere onrechtmatige activiteiten te voorkomen.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "In het kader van de contractuele relatie volgens deze Voorwaarden kan " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " de Klant van tijd tot tijd dienstgerelateerde berichten sturen, ook per e-mail. Daartoe kunnen wijzen op verdere mogelijke claims volgens passagiersrechtenvoorschriften behoren, steunend op de analyse door ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " van de dossiers of openbare vluchtgegevens. Zulke berichten dienen alleen om de Klant te ondersteunen bij de uitoefening van zijn rechten en vallen onder het gerechtvaardigd belang van ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " om verbonden diensten te verlenen." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "De Klant kan deze berichten te allen tijde afmelden via de afmeldlink of door contact met " },
            { type: "brand", field: "brandName" },
            { type: "text", text: " via " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Artikel 5. Herroepingsrecht",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              { type: "text", text: " De contractuele relatie eindigt wanneer de Overeenkomst volledig is nagekomen, dat wil zeggen wanneer de betaling volgens de Overeenkomst volledig is verricht." },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Kwalificeert u zich als consument volgens de EU-consumentenvoorschriften — dus als natuurlijke persoon die een rechtshandeling verricht voor een doel dat noch tot zijn bedrijfs- noch tot zijn zelfstandige beroepsactiviteit kan worden gerekend —, dan hebt u een wettelijk herroepingsrecht.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " De Overeenkomst eindigt onmiddellijk: (i) als " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " na diepgaande toetsing vaststelt dat de claim naar verwachting geen succes heeft, en de Klant daarvan in kennis wordt gesteld; (ii) bij onjuiste gegevens of bedrieglijk gedrag van de Klant, na beslissing van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "; of (iii) als de Klant als consument binnen 14 (veertien) dagen na het sluiten van de Overeenkomst de herroeping per e-mail verklaart. Het opzeggingsrecht om deze reden vervalt eerder als de Overeenkomst vóór het verstrijken van die termijn volledig is nagekomen." },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " U kunt uw aanvaarding van de Overeenkomst binnen 14 dagen na sluiting (bijvoorbeeld per brief of e-mail) zonder opgave van redenen herroepen. Voor uitoefening moet de mededeling binnen die 14 dagen plaatsvinden en duidelijk verklaren dat u wilt herroepen. Vanwege de aard van de prestatie kunt u niet meer herroepen nadat wij u hebben meegedeeld dat de airline de claim heeft erkend, omdat de prestatie dan al is geleverd. De herroeping kan naar ons e-mailadres ",
              },
              { type: "email" },
              { type: "text", text: " worden gestuurd." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artikel 6. Slotbepalingen",
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
                text: " is gerechtigd de Voorwaarden te allen tijde zonder aankondiging te wijzigen en aanvullende voorwaarden vast te stellen, maar zal zich inspannen de Klant op de hoogte te houden. Zijn wijzigingen vanuit het oogpunt van de Klant nadelig, dan moet de Klant ze goedkeuren voordat de gewijzigde Voorwaarden voor hem gelden.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " Voor de Voorwaarden, de Overeenkomst en elk ander verbonden document geldt het recht van de Portugese Republiek, voor zover in het betreffende document niets anders is overeengekomen. De Klant als consument heeft daarnaast het recht bescherming te verlangen volgens de dwingende voorschriften van het land waar hij zijn gewone verblijfplaats heeft.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " gebruikt persoonsgegevens van de Klant en, voor zover van toepassing, van zijn werknemers uitsluitend voor de uitvoering van de claim. Gegevens over omvang en vorm van de verzameling, opslag en het gebruik staan in de ",
              },
              { type: "link", href: "/privacy-policy", label: "privacyverklaring" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              { type: "text", text: " Is de Klant een rechtspersoon, dan waarborgt hij dat: (i) de aan " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " verstrekte persoonsgegevens steeds volgens de eisen inzake gegevensbescherming en privacy worden verzameld en doorgegeven; en (ii) " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " voor de doelen van deze Overeenkomst als verwerker en niet als verwerkingsverantwoordelijke (in de zin van de privacy-eisen) handelt voor de verwerkingsactiviteiten volgens deze Overeenkomst." },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Wordt een bepaling van de Voorwaarden door een rechter of scheidsgerecht als onrechtmatig, nietig of onafdwingbaar beschouwd, dan blijven de overige bepalingen van kracht. Een slechts gedeeltelijk getroffen bepaling blijft in het geldige deel bestaan. ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " wijzigt de Voorwaarden door ongeldige regelingen te vervangen door rechtmatige die de doelen van " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " en de Klant zo dicht mogelijk benaderen." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " is gerechtigd deze Voorwaarden en de Prijslijst te allen tijde zonder aankondiging te wijzigen en aanvullende voorwaarden vast te stellen. Wijzigingen met nadelig effect voor de Klant gelden voor hem alleen als hij ze aanvaardt." },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Beperken of verbieden nationale wetten de cessie van claims, dan handelt " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " met lokale juridisch vertegenwoordigers volgens de geldende lokale regels." },
            ],
            [
              { type: "strong", text: "6.8." },
              { type: "text", text: " Rechten en plichten die geheel of gedeeltelijk met een geldend gemaakte claim zijn verbonden, kunnen onbeperkt door " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " worden overgedragen op elke onderneming van de groep " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " en door " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " op derden." },
            ],
          ],
        },
      ],
    },
    {
      title: "Bijlage nr. 1 — Prijslijst",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "De Prijslijst maakt deel uit van deze Voorwaarden en wordt gepubliceerd op de " },
            { type: "link", href: "/prices", label: "prijspagina" },
            { type: "text", text: ". Zij legt geaccepteerde valuta, betaalwegen en alle fees van " },
            { type: "brand", field: "brandName" },
            { type: "text", text: " vast, met inbegrip van de succesfee en de extra gerechtelijke fee van 20 %." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "De commerciële feevoorwaarden staan in de " },
            { type: "link", href: "/documents/no-win-no-fee", label: "overeenkomst No win, no fee" },
            { type: "text", text: ". Vragen over deze Voorwaarden stuurt u naar " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Documentversie 4.0. Laatst bijgewerkt: september 2026",
};
