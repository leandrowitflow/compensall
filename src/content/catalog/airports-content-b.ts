import type { CatalogContentMap } from "./types";

/**
 * Airport catalog copy, batch B: Spain (Balearics), France, Germany, Italy and the Netherlands.
 * All entries are EU departure airports, so EC 261/2004 covers every outbound flight.
 */
export const airportsContentB: CatalogContentMap = {
  palma: {
    facts: [
      {
        en: "IATA PMI — Son Sant Joan, on Mallorca's south coast about 8 km east of Palma.",
        pt: "IATA PMI — Son Sant Joan, na costa sul de Maiorca, a cerca de 8 km a leste de Palma.",
        fr: "IATA PMI — Son Sant Joan, sur la côte sud de Majorque, à environ 8 km à l'est de Palma.",
      },
      {
        en: "Spain's third-busiest airport, with four boarding modules (A to D) inside a single terminal.",
        pt: "É o terceiro aeroporto espanhol com mais tráfego e tem quatro módulos de embarque (A a D) num único terminal.",
        fr: "Troisième aéroport espagnol par le trafic, avec quatre modules d'embarquement (A à D) dans un seul terminal.",
      },
      {
        en: "Traffic is sharply seasonal: summer low-cost and charter flights to Germany and the UK dominate.",
        pt: "O tráfego é fortemente sazonal: no verão dominam os voos low-cost e charter para a Alemanha e o Reino Unido.",
        fr: "Le trafic est très saisonnier : l'été, les vols low-cost et charters vers l'Allemagne et le Royaume-Uni dominent.",
      },
    ],
    about: {
      en: "Palma de Mallorca Airport is the gateway to the Balearic Islands and one of the most seasonal large airports in Europe, approaching 30 million passengers in peak years. Managed by the Spanish operator Aena, it is built around one terminal split into four boarding modules, with Ryanair, Vueling, easyJet, Eurowings, Condor and TUI carrying most of the summer traffic.",
      pt: "O Aeroporto de Palma de Maiorca é a porta de entrada das Ilhas Baleares e um dos grandes aeroportos mais sazonais da Europa, aproximando-se dos 30 milhões de passageiros nos anos de maior procura. Gerido pela operadora espanhola Aena, organiza-se num único terminal dividido em quatro módulos de embarque, com a Ryanair, a Vueling, a easyJet, a Eurowings, a Condor e a TUI a transportar a maior parte do tráfego de verão.",
      fr: "L'aéroport de Palma de Majorque est la porte d'entrée des îles Baléares et l'un des grands aéroports les plus saisonniers d'Europe, avec près de 30 millions de passagers lors des années record. Exploité par l'opérateur espagnol Aena, il s'organise autour d'un terminal unique divisé en quatre modules d'embarquement, où Ryanair, Vueling, easyJet, Eurowings, Condor et TUI assurent l'essentiel du trafic estival.",
    },
    rights: {
      en: "Palma is an EU airport, so every departure is covered by Regulation EC 261/2004 whichever airline you fly and wherever it is based. Arriving three hours or more late at your final destination, a cancellation announced less than 14 days ahead, or denied boarding on an oversold flight can be worth €250 on short routes such as Madrid or Barcelona and €400 on longer flights within the EU, for example Berlin, Düsseldorf or Stockholm.",
      pt: "Palma é um aeroporto da UE, pelo que todas as partidas estão abrangidas pelo Regulamento CE 261/2004, independentemente da companhia aérea e do país onde está sediada. Chegar ao destino final com três horas ou mais de atraso, um cancelamento comunicado com menos de 14 dias de antecedência ou uma recusa de embarque num voo com excesso de reservas podem valer 250 € nas rotas curtas, como Madrid ou Barcelona, e 400 € nos voos mais longos dentro da UE, por exemplo Berlim, Düsseldorf ou Estocolmo.",
      fr: "Palma est un aéroport de l'Union européenne : tous les départs relèvent donc du règlement CE 261/2004, quelle que soit la compagnie aérienne et son pays d'origine. Une arrivée à destination finale avec au moins trois heures de retard, une annulation notifiée moins de 14 jours avant le vol ou un refus d'embarquement sur un vol surréservé peuvent donner droit à 250 € sur les courtes liaisons comme Madrid ou Barcelone, et à 400 € sur les vols plus longs au sein de l'UE, par exemple Berlin, Düsseldorf ou Stockholm.",
    },
    tips: {
      en: "Peak-season disruption at Palma tends to cascade, because your aircraft is often on its fourth or fifth rotation of the day — and the airline still owes compensation for a knock-on delay. Photograph the departure board, keep your boarding passes and note the time the doors actually opened at the gate, since that is what the three-hour test measures. If you are stranded overnight and the airline refuses a hotel, book something reasonable, keep the receipts and claim them alongside the fixed amount.",
      pt: "Em plena época alta, as perturbações em Palma tendem a acumular-se, porque o avião vai muitas vezes na quarta ou quinta rotação do dia — e a companhia continua a dever indemnização por um atraso em cadeia. Fotografe o painel de partidas, guarde os cartões de embarque e registe a hora a que as portas foram efetivamente abertas na porta de embarque, porque é esse o momento que conta para o critério das três horas. Se ficar retido durante a noite e a companhia recusar alojamento, reserve algo razoável, guarde as faturas e peça o reembolso em conjunto com o valor fixo.",
      fr: "En haute saison, les perturbations à Palma s'enchaînent : votre avion en est souvent à sa quatrième ou cinquième rotation de la journée, et la compagnie doit malgré tout indemniser un retard en cascade. Photographiez le tableau des départs, conservez vos cartes d'embarquement et notez l'heure réelle d'ouverture des portes à la porte d'embarquement, car c'est ce moment qui sert au calcul des trois heures. Si vous êtes bloqué pour la nuit et que la compagnie refuse l'hôtel, réservez une solution raisonnable, gardez les justificatifs et réclamez-les en plus du montant forfaitaire.",
    },
  },

  "paris-cdg": {
    facts: [
      {
        en: "IATA CDG — Roissy, some 25 km north-east of central Paris and the busiest airport in the EU.",
        pt: "IATA CDG — Roissy, a cerca de 25 km a nordeste do centro de Paris, é o aeroporto com mais tráfego da UE.",
        fr: "IATA CDG — Roissy, à environ 25 km au nord-est de Paris, premier aéroport de l'Union européenne par le trafic.",
      },
      {
        en: "Air France's global hub and Europe's main SkyTeam gateway, with three terminals and four runways.",
        pt: "É o hub mundial da Air France e a principal porta da SkyTeam na Europa, com três terminais e quatro pistas.",
        fr: "Hub mondial d'Air France et principale porte SkyTeam en Europe, avec trois terminaux et quatre pistes.",
      },
      {
        en: "Two rail stations on site: the RER B into Paris and a TGV interchange for high-speed trains.",
        pt: "Tem duas estações ferroviárias no local: o RER B para Paris e uma interface TGV para comboios de alta velocidade.",
        fr: "Deux gares sur le site : le RER B vers Paris et une gare TGV pour les trains à grande vitesse.",
      },
    ],
    about: {
      en: "Paris Charles de Gaulle, still called Roissy locally, is the largest airport in the European Union and the home base of Air France. Operated by Groupe ADP, it spreads across Terminal 1 with its circular satellites, the seven halls of Terminal 2 and the low-cost Terminal 3, linked by the automated CDGVAL shuttle. That scale is exactly why connections are tight and why one late aircraft can unsettle dozens of flights.",
      pt: "Paris Charles de Gaulle, ainda hoje conhecido localmente como Roissy, é o maior aeroporto da União Europeia e a base da Air France. Gerido pelo Groupe ADP, distribui-se pelo Terminal 1 e os seus satélites circulares, pelas sete alas do Terminal 2 e pelo Terminal 3, dedicado às low-cost, todos ligados pelo comboio automático CDGVAL. É precisamente esta dimensão que torna as ligações apertadas e faz com que um único avião atrasado desorganize dezenas de voos.",
      fr: "Paris Charles de Gaulle, toujours appelé Roissy dans le langage courant, est le plus grand aéroport de l'Union européenne et la base d'Air France. Exploité par le Groupe ADP, il se déploie entre le Terminal 1 et ses satellites circulaires, les sept halls du Terminal 2 et le Terminal 3 dédié au low-cost, reliés par la navette automatique CDGVAL. C'est précisément cette échelle qui rend les correspondances serrées et permet à un seul avion en retard de déstabiliser des dizaines de vols.",
    },
    rights: {
      en: "Every flight leaving CDG is protected by EC 261/2004, and arrivals are covered too when the operating carrier is an EU airline. The amounts follow distance: €250 up to 1,500 km, €400 for medium-haul, and €600 for long-haul routes beyond 3,500 km such as New York, Tokyo or Johannesburg. If you miss a connection at CDG because the first leg ran late, the delay is measured at your final destination rather than in Paris, as long as both legs sit on one booking.",
      pt: "Todos os voos que partem de CDG estão protegidos pelo CE 261/2004 e as chegadas também estão abrangidas quando a transportadora operadora é uma companhia da UE. Os valores seguem a distância: 250 € até 1500 km, 400 € no médio curso e 600 € nas rotas de longo curso acima de 3500 km, como Nova Iorque, Tóquio ou Joanesburgo. Se perder uma ligação em CDG por causa do atraso do primeiro trecho, o atraso é medido no destino final e não em Paris, desde que ambos os trechos estejam na mesma reserva.",
      fr: "Tous les vols au départ de CDG sont protégés par le règlement CE 261/2004, et les arrivées le sont également lorsque le transporteur effectif est une compagnie de l'UE. Les montants suivent la distance : 250 € jusqu'à 1 500 km, 400 € sur le moyen-courrier et 600 € sur le long-courrier au-delà de 3 500 km, comme New York, Tokyo ou Johannesburg. Si vous manquez une correspondance à CDG à cause du retard du premier tronçon, le retard se mesure à votre destination finale et non à Paris, dès lors que les deux tronçons figurent sur la même réservation.",
    },
    tips: {
      en: "French air traffic control strikes are frequent and normally count as extraordinary circumstances, so compensation is unlikely — but the airline still owes you re-routing or a full refund, plus meals and a hotel where needed. A walkout by the airline's own staff is different: the Court of Justice treats it as part of normal business, so payment remains due. Ask for the written reason for the disruption at the transfer desk, and remember that French law generally allows five years to bring a claim.",
      pt: "As greves do controlo de tráfego aéreo em França são frequentes e, em regra, contam como circunstâncias extraordinárias, pelo que a indemnização é pouco provável — mas a companhia continua obrigada a reencaminhá-lo ou a reembolsar o bilhete na totalidade, além de refeições e alojamento quando necessário. Uma greve do pessoal da própria companhia é diferente: o Tribunal de Justiça considera-a parte da atividade normal, pelo que o pagamento continua a ser devido. Peça no balcão de trânsito a justificação por escrito da perturbação e tenha presente que o direito francês concede, em geral, cinco anos para apresentar o pedido.",
      fr: "Les grèves du contrôle aérien français sont fréquentes et constituent en principe des circonstances extraordinaires : l'indemnisation est donc peu probable, mais la compagnie doit toujours vous réacheminer ou vous rembourser intégralement, et assurer repas et hôtel si nécessaire. Une grève du personnel de la compagnie elle-même est un autre cas : la Cour de justice y voit un aléa inhérent à l'activité, si bien que l'indemnisation reste due. Demandez au comptoir de transit le motif écrit de la perturbation et gardez en mémoire que le droit français laisse en général cinq ans pour agir.",
    },
  },

  "paris-orly": {
    facts: [
      {
        en: "IATA ORY — 13 km south of Paris, the capital's second airport and its busiest for domestic routes.",
        pt: "IATA ORY — a 13 km a sul de Paris, é o segundo aeroporto da capital e o principal nas rotas domésticas.",
        fr: "IATA ORY — à 13 km au sud de Paris, deuxième aéroport de la capitale et premier pour les lignes intérieures.",
      },
      {
        en: "Terminals were renumbered Orly 1 to 4 in 2019 and now form one connected building.",
        pt: "Os terminais foram renumerados de Orly 1 a 4 em 2019 e formam hoje um único edifício contínuo.",
        fr: "Les terminaux ont été renumérotés Orly 1 à 4 en 2019 et forment désormais un seul bâtiment continu.",
      },
      {
        en: "A night curfew closes the airport from 23:30 to 06:00, and annual movements are capped by law.",
        pt: "Um período de silêncio noturno fecha o aeroporto entre as 23h30 e as 06h00 e o número anual de movimentos está limitado por lei.",
        fr: "Un couvre-feu ferme l'aéroport de 23h30 à 6h00, et le nombre annuel de mouvements est plafonné par la loi.",
      },
    ],
    about: {
      en: "Paris Orly was the capital's main airport until CDG opened, and it still handles around 30 million passengers on French domestic, overseas département, North African and short-haul European routes. Air France, Transavia France and Vueling are the biggest operators, alongside long flights to Guadeloupe, Martinique and Réunion. Tram T7, the Orlyval shuttle to the RER B and the extended metro line 14 all reach the terminals.",
      pt: "Paris Orly foi o principal aeroporto da capital até à abertura de CDG e continua a movimentar cerca de 30 milhões de passageiros em rotas domésticas francesas, para os departamentos de ultramar, para o Norte de África e para o curto curso europeu. A Air France, a Transavia France e a Vueling são as maiores operadoras, a par dos voos longos para Guadalupe, Martinica e Reunião. O elétrico T7, o Orlyval até ao RER B e o prolongamento da linha 14 do metro servem os terminais.",
      fr: "Paris Orly a été le principal aéroport de la capitale jusqu'à l'ouverture de CDG et accueille encore près de 30 millions de passagers sur les lignes intérieures, les liaisons vers les départements d'outre-mer, l'Afrique du Nord et le court-courrier européen. Air France, Transavia France et Vueling en sont les premiers opérateurs, aux côtés des longs vols vers la Guadeloupe, la Martinique et La Réunion. Le tramway T7, l'Orlyval vers le RER B et le prolongement de la ligne 14 du métro desservent les terminaux.",
    },
    rights: {
      en: "As an EU departure point, Orly falls squarely under EC 261/2004. One quirk is worth knowing: flights to Guadeloupe, Martinique and Réunion are legally intra-Community even though they run for more than 6,000 km, which caps compensation at €400 rather than the €600 long-haul rate. Short routes to Nice, Toulouse or Madrid sit at €250, and the three-hour test is always applied to your arrival, not your departure.",
      pt: "Sendo um ponto de partida na UE, Orly está plenamente sujeito ao CE 261/2004. Vale a pena conhecer uma particularidade: os voos para Guadalupe, Martinica e Reunião são juridicamente intracomunitários, apesar de percorrerem mais de 6000 km, o que limita a indemnização a 400 € em vez dos 600 € do longo curso. As rotas curtas para Nice, Toulouse ou Madrid ficam nos 250 € e o critério das três horas aplica-se sempre à chegada, nunca à partida.",
      fr: "En tant qu'aéroport de départ dans l'UE, Orly relève pleinement du règlement CE 261/2004. Une particularité mérite d'être connue : les vols vers la Guadeloupe, la Martinique et La Réunion sont juridiquement intracommunautaires bien qu'ils dépassent 6 000 km, ce qui plafonne l'indemnisation à 400 € au lieu des 600 € du long-courrier. Les liaisons courtes vers Nice, Toulouse ou Madrid restent à 250 €, et le seuil des trois heures s'apprécie toujours à l'arrivée, jamais au départ.",
    },
    tips: {
      en: "The 23:30 curfew shapes disruption at Orly: an aircraft that cannot leave before the cut-off is often cancelled outright or diverted to CDG, and a diversion obliges the airline to carry you on to Orly at its own cost. Keep any taxi or coach receipts from that transfer. Because late-evening rotations here are tight, ask for written confirmation of whether the flight was cancelled or merely delayed — the entitlements are not identical.",
      pt: "O silêncio noturno das 23h30 molda as perturbações em Orly: um avião que não consiga partir antes da hora limite é muitas vezes cancelado ou desviado para CDG, e um desvio obriga a companhia a levá-lo até Orly a expensas suas. Guarde os recibos de táxi ou de autocarro dessa transferência. Como as rotações do fim da noite são apertadas, peça confirmação por escrito de que o voo foi cancelado ou apenas atrasado, porque os direitos não são iguais nos dois casos.",
      fr: "Le couvre-feu de 23h30 façonne les perturbations à Orly : un avion qui ne peut pas partir avant l'heure limite est souvent annulé ou dérouté vers CDG, et un déroutement oblige la compagnie à vous acheminer jusqu'à Orly à ses frais. Conservez les justificatifs de taxi ou de car pour ce transfert. Les rotations de fin de soirée étant serrées, demandez une confirmation écrite indiquant si le vol a été annulé ou seulement retardé : les droits ne sont pas les mêmes.",
    },
  },

  nice: {
    facts: [
      {
        en: "IATA NCE — built on reclaimed land beside the Baie des Anges, minutes from the Promenade des Anglais.",
        pt: "IATA NCE — construído em terrenos conquistados ao mar na Baie des Anges, a poucos minutos da Promenade des Anglais.",
        fr: "IATA NCE — construit sur des terre-pleins en bord de baie des Anges, à quelques minutes de la promenade des Anglais.",
      },
      {
        en: "France's third-busiest passenger airport and the busiest business-aviation airport in Europe.",
        pt: "É o terceiro aeroporto francês em passageiros e o mais movimentado da Europa em aviação executiva.",
        fr: "Troisième aéroport français en nombre de passagers et premier aéroport d'aviation d'affaires en Europe.",
      },
      {
        en: "Two terminals linked by tram line 2, which runs directly to the city centre and the port.",
        pt: "Dois terminais ligados pela linha 2 do elétrico, que segue diretamente para o centro da cidade e para o porto.",
        fr: "Deux terminaux reliés par la ligne 2 du tramway, qui rejoint directement le centre-ville et le port.",
      },
    ],
    about: {
      en: "Nice Côte d'Azur is the main gateway to the French Riviera and Monaco, handling around 14 million passengers with a pronounced summer peak. easyJet keeps a large base here alongside Air France, British Airways and a dense seasonal charter programme, while a separate general-aviation terminal serves the private jets that make Nice Europe's busiest business-aviation field. Both runways sit on reclaimed land, so sea fog and strong easterly winds can close approaches quickly.",
      pt: "Nice Côte d'Azur é a principal porta de entrada da Riviera Francesa e do Mónaco, com cerca de 14 milhões de passageiros e um pico de verão muito acentuado. A easyJet mantém aqui uma base importante, ao lado da Air France, da British Airways e de um denso programa de charters sazonais, enquanto um terminal próprio de aviação geral serve os jatos privados que fazem de Nice o aeroporto executivo mais movimentado da Europa. Ambas as pistas assentam em terrenos conquistados ao mar, pelo que o nevoeiro marítimo e os ventos fortes de leste podem fechar as aproximações num instante.",
      fr: "Nice Côte d'Azur est la principale porte d'entrée de la Côte d'Azur et de Monaco, avec près de 14 millions de passagers et un pic estival très marqué. easyJet y maintient une base importante aux côtés d'Air France, de British Airways et d'un dense programme de charters saisonniers, tandis qu'un terminal d'aviation générale distinct accueille les jets privés qui font de Nice le premier aéroport d'affaires d'Europe. Les deux pistes reposent sur des terre-pleins : brouillard marin et vents d'est soutenus peuvent fermer les approches très vite.",
    },
    rights: {
      en: "EC 261/2004 applies to all departures from Nice. Compensation is €250 on routes under 1,500 km such as Paris, Geneva or Milan, €400 on longer intra-EU flights, and €600 on the seasonal transatlantic services to New York and Montreal. A strike by ground handlers or airport staff is usually treated as beyond the airline's control, whereas its own pilots or cabin crew walking out does not excuse payment.",
      pt: "O CE 261/2004 aplica-se a todas as partidas de Nice. A indemnização é de 250 € nas rotas inferiores a 1500 km, como Paris, Genebra ou Milão, de 400 € nos voos intracomunitários mais longos e de 600 € nas ligações transatlânticas sazonais para Nova Iorque e Montreal. Uma greve dos operadores de assistência em escala ou do pessoal do aeroporto é normalmente considerada alheia ao controlo da companhia, ao contrário de uma greve dos seus próprios pilotos ou tripulantes de cabina, que não a dispensa de pagar.",
      fr: "Le règlement CE 261/2004 couvre tous les départs de Nice. L'indemnisation s'élève à 250 € sur les liaisons de moins de 1 500 km comme Paris, Genève ou Milan, à 400 € sur les vols intracommunautaires plus longs et à 600 € sur les services transatlantiques saisonniers vers New York et Montréal. Une grève des assistants en escale ou du personnel aéroportuaire est généralement jugée extérieure à la compagnie, alors qu'un mouvement de ses propres pilotes ou personnels de cabine ne la dispense pas de payer.",
    },
    tips: {
      en: "With only two terminals and a compact apron, gate changes at Nice are common in July and August, so watch the boards rather than trusting notifications. When weather closes the airport the airline still owes care and re-routing even though no compensation is due, and since the coast is well served by rail you can ask about a TGV alternative. Save the SMS or email announcing the disruption: its timestamp decides whether a cancellation fell inside or outside the 14-day window.",
      pt: "Com apenas dois terminais e uma placa de estacionamento compacta, as mudanças de porta em Nice são frequentes em julho e agosto, pelo que convém seguir os painéis e não confiar apenas nas notificações. Quando o mau tempo fecha o aeroporto, a companhia continua a dever assistência e reencaminhamento, ainda que não haja indemnização, e como a costa é bem servida por ferrovia pode pedir uma alternativa em TGV. Guarde o SMS ou o e-mail que anunciou a perturbação: a hora nele registada determina se o cancelamento ocorreu dentro ou fora do prazo de 14 dias.",
      fr: "Avec seulement deux terminaux et une aire de stationnement compacte, les changements de porte sont fréquents à Nice en juillet et en août : fiez-vous aux écrans plutôt qu'aux notifications. Quand la météo ferme l'aéroport, la compagnie doit toujours la prise en charge et le réacheminement même si aucune indemnisation n'est due, et le littoral étant bien desservi par le rail, vous pouvez demander une solution en TGV. Conservez le SMS ou l'e-mail annonçant la perturbation : son horodatage détermine si l'annulation est intervenue dans le délai de 14 jours ou non.",
    },
  },

  lyon: {
    facts: [
      {
        en: "IATA LYS — Lyon–Saint-Exupéry, roughly 20 km east of the city and formerly named Satolas.",
        pt: "IATA LYS — Lyon–Saint-Exupéry, a cerca de 20 km a leste da cidade, chamava-se antes Satolas.",
        fr: "IATA LYS — Lyon–Saint-Exupéry, à environ 20 km à l'est de la ville, anciennement Satolas.",
      },
      {
        en: "Terminals 1 and 2 sit beside a TGV station designed by Santiago Calatrava.",
        pt: "Os Terminais 1 e 2 ficam junto a uma estação TGV projetada por Santiago Calatrava.",
        fr: "Les terminaux 1 et 2 jouxtent une gare TGV signée Santiago Calatrava.",
      },
      {
        en: "The Rhônexpress tram reaches Lyon Part-Dieu in under 30 minutes.",
        pt: "O elétrico Rhônexpress chega a Lyon Part-Dieu em menos de 30 minutos.",
        fr: "Le tram Rhônexpress rejoint Lyon Part-Dieu en moins de 30 minutes.",
      },
    ],
    about: {
      en: "Lyon–Saint-Exupéry is the largest airport in the Auvergne-Rhône-Alpes region and among the busiest in France outside Paris and Nice, with roughly 10 million passengers a year. easyJet, Air France and Transavia lead the traffic, joined each winter by charters serving the Alpine ski resorts. Because a TGV station sits on the airport site, disrupted passengers can often be moved onward by train rather than air.",
      pt: "Lyon–Saint-Exupéry é o maior aeroporto da região Auvergne-Rhône-Alpes e um dos mais movimentados de França fora de Paris e Nice, com cerca de 10 milhões de passageiros por ano. A easyJet, a Air France e a Transavia lideram o tráfego, acompanhadas todos os invernos por charters ao serviço das estações de esqui alpinas. Como existe uma estação TGV no próprio aeroporto, os passageiros afetados podem muitas vezes seguir viagem em comboio em vez de avião.",
      fr: "Lyon–Saint-Exupéry est le premier aéroport de la région Auvergne-Rhône-Alpes et l'un des plus fréquentés de France en dehors de Paris et Nice, avec près de 10 millions de passagers par an. easyJet, Air France et Transavia y dominent le trafic, rejointes chaque hiver par les charters desservant les stations alpines. La gare TGV située sur le site permet souvent de réacheminer par le train les passagers touchés par une perturbation.",
    },
    rights: {
      en: "Departures from Lyon are covered by EC 261/2004 whatever the airline's nationality. A three-hour arrival delay pays €250 on short routes such as Paris, Amsterdam or Barcelona and €400 on longer intra-EU flights to Athens or the Canary Islands. Cancellations notified less than 14 days ahead carry the same amounts unless the airline re-routed you on timings close to the original schedule.",
      pt: "As partidas de Lyon estão abrangidas pelo CE 261/2004, qualquer que seja a nacionalidade da companhia. Um atraso de três horas à chegada dá direito a 250 € em rotas curtas como Paris, Amesterdão ou Barcelona e a 400 € em voos intracomunitários mais longos, para Atenas ou as Canárias. Os cancelamentos comunicados com menos de 14 dias de antecedência dão direito aos mesmos valores, salvo se a companhia o tiver reencaminhado em horários próximos do previsto.",
      fr: "Les départs de Lyon sont couverts par le règlement CE 261/2004, quelle que soit la nationalité de la compagnie. Un retard de trois heures à l'arrivée ouvre droit à 250 € sur les liaisons courtes comme Paris, Amsterdam ou Barcelone et à 400 € sur les vols intracommunautaires plus longs vers Athènes ou les Canaries. Les annulations notifiées moins de 14 jours avant le départ donnent les mêmes montants, sauf réacheminement à des horaires proches de ceux prévus.",
    },
    tips: {
      en: "Winter is Lyon's weak point: de-icing queues and snow closures at Alpine destinations create knock-on delays, and while the weather itself is extraordinary, an airline that ran short of de-icing capacity or crew duty hours may still owe you. With the TGV station inside the airport, ask to be re-routed by rail if flights are grounded, since the regulation allows other modes of transport under comparable conditions. Keep every receipt for meals and hotels during a long wait.",
      pt: "O inverno é o ponto fraco de Lyon: as filas de descongelamento e o fecho de destinos alpinos por neve geram atrasos em cadeia e, embora o próprio mau tempo seja extraordinário, uma companhia que se tenha ficado sem capacidade de descongelamento ou sem horas de serviço da tripulação pode continuar a dever-lhe indemnização. Com a estação TGV dentro do aeroporto, peça reencaminhamento em comboio se os voos estiverem parados, já que o regulamento admite outros meios de transporte em condições equivalentes. Guarde todos os recibos de refeições e alojamento durante uma espera longa.",
      fr: "L'hiver est le point faible de Lyon : files de dégivrage et fermetures pour neige des destinations alpines provoquent des retards en cascade et, si la météo est bien une circonstance extraordinaire, une compagnie à court de capacité de dégivrage ou d'heures de service d'équipage peut rester redevable. La gare TGV se trouvant dans l'aéroport, demandez un réacheminement par le rail si les vols sont cloués au sol : le règlement admet d'autres modes de transport dans des conditions comparables. Conservez tous les justificatifs de repas et d'hôtel pendant une longue attente.",
    },
  },

  frankfurt: {
    facts: [
      {
        en: "IATA FRA — Germany's busiest airport, with four runways and two passenger terminals in use.",
        pt: "IATA FRA — é o aeroporto alemão com mais tráfego, com quatro pistas e dois terminais de passageiros em serviço.",
        fr: "IATA FRA — premier aéroport allemand par le trafic, avec quatre pistes et deux terminaux passagers en service.",
      },
      {
        en: "Lufthansa's main hub and Europe's largest air cargo gateway, operated by Fraport.",
        pt: "É o hub principal da Lufthansa e a maior porta de carga aérea da Europa, operada pela Fraport.",
        fr: "Hub principal de Lufthansa et première porte de fret aérien d'Europe, exploité par Fraport.",
      },
      {
        en: "An ICE long-distance rail station on site connects the terminals to most large German cities.",
        pt: "Uma estação de longo curso ICE no local liga os terminais à maioria das grandes cidades alemãs.",
        fr: "Une gare grandes lignes ICE sur le site relie les terminaux à la plupart des grandes villes allemandes.",
      },
    ],
    about: {
      en: "Frankfurt Airport is the beating heart of Lufthansa's global network and the busiest airport in Germany, handling upwards of 60 million passengers in peak years alongside more than two million tonnes of freight. Terminal 1 carries Lufthansa and its Star Alliance partners across piers A, B, C and Z, Terminal 2 hosts most other carriers, and a third terminal is being added in the south of the site. Minimum connection times are famously short, which is efficient right up to the moment something slips.",
      pt: "O Aeroporto de Frankfurt é o coração da rede mundial da Lufthansa e o aeroporto alemão com mais tráfego, movimentando mais de 60 milhões de passageiros nos anos de maior procura e mais de dois milhões de toneladas de carga. O Terminal 1 acolhe a Lufthansa e os parceiros da Star Alliance nos cais A, B, C e Z, o Terminal 2 recebe a maioria das restantes companhias e está a ser construído um terceiro terminal na zona sul. Os tempos mínimos de ligação são notoriamente curtos, o que é eficiente até ao momento em que algo falha.",
      fr: "L'aéroport de Francfort est le cœur du réseau mondial de Lufthansa et le premier aéroport allemand, avec plus de 60 millions de passagers lors des années record et plus de deux millions de tonnes de fret. Le Terminal 1 accueille Lufthansa et ses partenaires Star Alliance sur les jetées A, B, C et Z, le Terminal 2 la plupart des autres compagnies, et un troisième terminal est en construction au sud du site. Les temps de correspondance minimaux y sont réputés très courts : efficace, jusqu'au moindre grain de sable.",
    },
    rights: {
      en: "Every departure from Frankfurt is covered by EC 261/2004, as is any arrival operated by an EU carrier such as Lufthansa. The long-haul network makes the €600 band common, since Chicago, Delhi and Buenos Aires all lie well beyond 3,500 km, and what counts is being three hours or more late at that final destination. A missed connection in Frankfurt on a single ticket is treated as one delayed journey, so compensation follows the whole distance flown.",
      pt: "Todas as partidas de Frankfurt estão abrangidas pelo CE 261/2004, tal como qualquer chegada operada por uma companhia da UE como a Lufthansa. A rede de longo curso torna comum o patamar dos 600 €, já que Chicago, Deli e Buenos Aires ficam muito além dos 3500 km, e o que conta é chegar a esse destino final com três horas ou mais de atraso. Uma ligação perdida em Frankfurt num único bilhete é tratada como uma só viagem atrasada, pelo que a indemnização acompanha a distância total percorrida.",
      fr: "Tous les départs de Francfort relèvent du règlement CE 261/2004, comme toute arrivée opérée par une compagnie de l'UE telle que Lufthansa. Le réseau long-courrier rend la tranche de 600 € fréquente, Chicago, Delhi et Buenos Aires se situant bien au-delà de 3 500 km, et ce qui compte est d'arriver à cette destination finale avec au moins trois heures de retard. Une correspondance manquée à Francfort sur un billet unique est traitée comme un seul voyage retardé : l'indemnisation suit donc la distance totale parcourue.",
    },
    tips: {
      en: "German carriers are quick to offer vouchers or miles, and accepting them can weaken a cash claim, so ask for the fixed amount in euros instead. Under German law a claim can normally be brought until the end of the third year after the flight, which leaves time to gather evidence. Frankfurt's ICE connections mean Lufthansa may re-route you by train; that discharges its re-routing duty but does not wipe out compensation already earned for the delay.",
      pt: "As companhias alemãs oferecem rapidamente vouchers ou milhas e aceitá-los pode enfraquecer um pedido em dinheiro, pelo que é preferível exigir o valor fixo em euros. Ao abrigo do direito alemão, o pedido pode em regra ser apresentado até ao final do terceiro ano após o voo, o que dá tempo para reunir provas. As ligações ICE de Frankfurt permitem que a Lufthansa o reencaminhe em comboio: isso cumpre o dever de reencaminhamento, mas não anula a indemnização já devida pelo atraso.",
      fr: "Les compagnies allemandes proposent volontiers des bons d'achat ou des miles, et les accepter peut affaiblir une demande en espèces : réclamez plutôt le montant forfaitaire en euros. En droit allemand, la demande peut en principe être introduite jusqu'à la fin de la troisième année suivant le vol, ce qui laisse le temps de rassembler les preuves. Les liaisons ICE de Francfort permettent à Lufthansa de vous réacheminer par le train : cela satisfait son obligation de réacheminement, mais n'efface pas l'indemnisation déjà due pour le retard.",
    },
  },

  munich: {
    facts: [
      {
        en: "IATA MUC — Franz Josef Strauß Airport, 28 km north-east of Munich between Freising and Erding.",
        pt: "IATA MUC — Aeroporto Franz Josef Strauß, a 28 km a nordeste de Munique, entre Freising e Erding.",
        fr: "IATA MUC — aéroport Franz Josef Strauß, à 28 km au nord-est de Munich, entre Freising et Erding.",
      },
      {
        en: "Lufthansa's second hub, where a midfield satellite extends Terminal 2's gate capacity.",
        pt: "É o segundo hub da Lufthansa, onde um satélite central amplia a capacidade de portas do Terminal 2.",
        fr: "Deuxième hub de Lufthansa, où un satellite central augmente la capacité de portes du Terminal 2.",
      },
      {
        en: "S-Bahn lines S1 and S8 link both terminals to the city in about 40 minutes.",
        pt: "As linhas S1 e S8 da S-Bahn ligam os dois terminais à cidade em cerca de 40 minutos.",
        fr: "Les lignes S1 et S8 du S-Bahn relient les deux terminaux à la ville en 40 minutes environ.",
      },
    ],
    about: {
      en: "Munich Airport opened on its present site in 1992 and grew into Germany's second-largest hub, serving close to 48 million passengers before the pandemic. Terminal 2 and its midfield satellite are run jointly by Lufthansa and the airport company, while Terminal 1 handles low-cost and non-alliance carriers, with the covered Munich Airport Center between them. Alpine weather makes winter de-icing and summer thunderstorm holds a routine part of the operation.",
      pt: "O Aeroporto de Munique abriu no local atual em 1992 e tornou-se o segundo maior hub da Alemanha, servindo perto de 48 milhões de passageiros antes da pandemia. O Terminal 2 e o respetivo satélite central são geridos em conjunto pela Lufthansa e pela sociedade aeroportuária, enquanto o Terminal 1 acolhe as low-cost e as companhias fora de alianças, com o coberto Munich Airport Center entre ambos. O clima alpino faz do descongelamento no inverno e das esperas por trovoadas no verão uma rotina da operação.",
      fr: "L'aéroport de Munich a ouvert sur son site actuel en 1992 et est devenu le deuxième hub d'Allemagne, avec près de 48 millions de passagers avant la pandémie. Le Terminal 2 et son satellite central sont exploités conjointement par Lufthansa et la société aéroportuaire, tandis que le Terminal 1 accueille les compagnies low-cost et hors alliance, le Munich Airport Center couvert s'intercalant entre les deux. Le climat alpin fait du dégivrage hivernal et des attentes liées aux orages d'été une routine de l'exploitation.",
    },
    rights: {
      en: "As an EU airport, Munich brings all departures under EC 261/2004 whichever airline operates them. Delays of three hours or more, cancellations with less than 14 days' notice and denied boarding pay €250, €400 or €600 by distance: Munich to Palma or Lisbon falls in the €400 band, while Los Angeles and Singapore reach €600. The airline must also feed you and, where an overnight stay becomes necessary, provide a hotel — whether or not compensation is due.",
      pt: "Como aeroporto da UE, Munique coloca todas as partidas sob o CE 261/2004, qualquer que seja a companhia operadora. Atrasos de três horas ou mais, cancelamentos com menos de 14 dias de aviso e recusas de embarque dão direito a 250 €, 400 € ou 600 € em função da distância: Munique–Palma ou Munique–Lisboa ficam no patamar dos 400 €, enquanto Los Angeles e Singapura chegam aos 600 €. A companhia é também obrigada a fornecer refeições e, se a noite fora se tornar inevitável, alojamento — haja ou não direito a indemnização.",
      fr: "Aéroport de l'Union, Munich place tous ses départs sous le règlement CE 261/2004, quelle que soit la compagnie qui les opère. Retards de trois heures ou plus, annulations notifiées moins de 14 jours avant et refus d'embarquement ouvrent droit à 250 €, 400 € ou 600 € selon la distance : Munich–Palma ou Munich–Lisbonne relèvent des 400 €, tandis que Los Angeles et Singapour atteignent 600 €. La compagnie doit aussi assurer les repas et, si une nuit sur place devient nécessaire, l'hôtel — que l'indemnisation soit due ou non.",
    },
    tips: {
      en: "Snow and thunderstorms are genuine extraordinary circumstances, but the exemption only covers delays actually caused by them: if the weather cleared hours earlier and your flight went late because the crew ran out of duty hours, the claim stands. Ask the service centre in the Munich Airport Center to record the stated cause on your file. Passenger rights complaints in Germany go to the Luftfahrt-Bundesamt, although claiming directly from the airline is usually faster.",
      pt: "A neve e as trovoadas são verdadeiras circunstâncias extraordinárias, mas a isenção só cobre os atrasos por elas efetivamente causados: se o tempo melhorou horas antes e o voo saiu tarde porque a tripulação esgotou as horas de serviço, o pedido mantém-se válido. Peça no centro de atendimento do Munich Airport Center que a causa indicada fique registada no seu processo. Na Alemanha, as queixas sobre direitos dos passageiros seguem para o Luftfahrt-Bundesamt, embora reclamar diretamente à companhia seja normalmente mais rápido.",
      fr: "Neige et orages constituent de véritables circonstances extraordinaires, mais l'exonération ne couvre que les retards réellement causés par eux : si le temps s'était dégagé des heures plus tôt et que votre vol est parti en retard faute d'heures de service d'équipage, la demande reste fondée. Demandez au centre de services du Munich Airport Center que la cause invoquée soit consignée à votre dossier. En Allemagne, les plaintes relatives aux droits des passagers relèvent du Luftfahrt-Bundesamt, même si réclamer directement à la compagnie est généralement plus rapide.",
    },
  },

  berlin: {
    facts: [
      {
        en: "IATA BER — Willy Brandt Airport, opened on 31 October 2020 after years of delay.",
        pt: "IATA BER — Aeroporto Willy Brandt, inaugurado a 31 de outubro de 2020 após anos de atrasos.",
        fr: "IATA BER — aéroport Willy Brandt, inauguré le 31 octobre 2020 après des années de retard.",
      },
      {
        en: "It replaced Tegel and Schönefeld: Terminal 1 takes most traffic, Terminal 2 the low-cost carriers.",
        pt: "Substituiu Tegel e Schönefeld: o Terminal 1 recebe a maior parte do tráfego e o Terminal 2 as low-cost.",
        fr: "Il a remplacé Tegel et Schönefeld : le Terminal 1 absorbe l'essentiel du trafic, le Terminal 2 le low-cost.",
      },
      {
        en: "Airport Express and regional trains reach Berlin Hauptbahnhof in roughly 30 minutes.",
        pt: "O Airport Express e os comboios regionais chegam à Berlin Hauptbahnhof em cerca de 30 minutos.",
        fr: "L'Airport Express et les trains régionaux rejoignent la Berlin Hauptbahnhof en une trentaine de minutes.",
      },
    ],
    about: {
      en: "Berlin Brandenburg finally opened in late 2020, gathering the capital's traffic in one place and closing Tegel a week later. It is a point-to-point airport rather than a connecting hub: easyJet runs one of its largest continental bases here alongside Ryanair, Eurowings and Lufthansa, with only a handful of long-haul routes. That structure matters when things go wrong, because there are fewer alternative flights to move you onto.",
      pt: "Berlim Brandeburgo abriu finalmente no final de 2020, concentrando num só local o tráfego da capital e levando ao fecho de Tegel uma semana depois. É um aeroporto ponto a ponto e não um hub de ligações: a easyJet mantém aqui uma das suas maiores bases continentais, ao lado da Ryanair, da Eurowings e da Lufthansa, com poucas rotas de longo curso. Esta estrutura conta quando algo corre mal, porque há menos voos alternativos para onde o transferir.",
      fr: "Berlin Brandebourg a enfin ouvert fin 2020, regroupant le trafic de la capitale en un seul lieu et entraînant la fermeture de Tegel une semaine plus tard. C'est un aéroport de point à point plutôt qu'un hub de correspondances : easyJet y exploite l'une de ses plus grandes bases continentales, aux côtés de Ryanair, Eurowings et Lufthansa, avec seulement quelques lignes long-courrier. Cette structure compte en cas de problème, car les vols de report disponibles sont moins nombreux.",
    },
    rights: {
      en: "EC 261/2004 covers every flight leaving BER. Most of the network sits in the €250 band — Vienna, Zurich, Amsterdam — with €400 for longer intra-EU routes such as Athens, Málaga or the Canary Islands. If the airline cannot re-route you within a reasonable time you may take a full refund instead, and if you abandon the journey at the departure airport it must, where relevant, also fly you back to your original starting point.",
      pt: "O CE 261/2004 cobre todos os voos que partem de BER. A maior parte da rede fica no patamar dos 250 € — Viena, Zurique, Amesterdão —, com 400 € nas rotas intracomunitárias mais longas, como Atenas, Málaga ou as Canárias. Se a companhia não conseguir reencaminhá-lo num prazo razoável, pode optar pelo reembolso total e, se desistir da viagem no aeroporto de partida, a companhia deve também, quando aplicável, levá-lo de volta ao ponto de partida inicial.",
      fr: "Le règlement CE 261/2004 couvre tous les vols au départ de BER. L'essentiel du réseau relève des 250 € — Vienne, Zurich, Amsterdam — avec 400 € sur les liaisons intracommunautaires plus longues comme Athènes, Málaga ou les Canaries. Si la compagnie ne peut pas vous réacheminer dans un délai raisonnable, vous pouvez opter pour le remboursement intégral et, si vous renoncez au voyage à l'aéroport de départ, elle doit aussi, le cas échéant, vous ramener à votre point de départ initial.",
    },
    tips: {
      en: "With few carriers duplicating each route from Berlin, insist on re-routing with another airline rather than waiting a day for your own carrier's next flight: the regulation requires re-routing at the earliest opportunity, not merely the next seat the airline owns. If you buy a replacement flight after a refusal, keep the correspondence, because reasonable costs can often be recovered. Low-cost carriers here often cite an unspecified technical problem — ask which component failed, since routine faults are not extraordinary.",
      pt: "Como poucas companhias duplicam as rotas a partir de Berlim, insista no reencaminhamento noutra transportadora em vez de esperar um dia pelo voo seguinte da sua: o regulamento exige o reencaminhamento na primeira oportunidade e não apenas no lugar seguinte que a companhia tenha disponível. Se comprar um voo alternativo depois de uma recusa, guarde a troca de mensagens, porque os custos razoáveis podem muitas vezes ser recuperados. As low-cost invocam aqui frequentemente um problema técnico não especificado — pergunte que componente falhou, já que as avarias correntes não são extraordinárias.",
      fr: "Peu de compagnies doublonnent les mêmes liaisons depuis Berlin : insistez sur un réacheminement chez un autre transporteur plutôt que d'attendre un jour le prochain vol du vôtre, car le règlement impose un réacheminement dans les meilleurs délais et non le prochain siège dont dispose la compagnie. Si vous achetez un vol de remplacement après un refus, conservez les échanges, car les frais raisonnables sont souvent récupérables. Les compagnies low-cost invoquent ici volontiers un problème technique non précisé : demandez quelle pièce est en cause, les pannes courantes n'étant pas extraordinaires.",
    },
  },

  dusseldorf: {
    facts: [
      {
        en: "IATA DUS — the main airport for North Rhine-Westphalia, about 8 km from Düsseldorf's centre.",
        pt: "IATA DUS — é o principal aeroporto da Renânia do Norte-Vestefália, a cerca de 8 km do centro de Düsseldorf.",
        fr: "IATA DUS — principal aéroport de Rhénanie-du-Nord-Westphalie, à environ 8 km du centre de Düsseldorf.",
      },
      {
        en: "One terminal with three piers (A, B and C), joined by the SkyTrain suspended monorail.",
        pt: "Um terminal com três cais (A, B e C), ligados pelo monocarril suspenso SkyTrain.",
        fr: "Un terminal à trois jetées (A, B et C), reliées par le monorail suspendu SkyTrain.",
      },
      {
        en: "Eurowings' largest base, with heavy leisure traffic from Condor and TUI fly.",
        pt: "É a maior base da Eurowings, com forte tráfego de lazer da Condor e da TUI fly.",
        fr: "Plus grande base d'Eurowings, avec un fort trafic loisirs de Condor et TUI fly.",
      },
    ],
    about: {
      en: "Düsseldorf is one of Germany's busiest airports and the aviation gateway to the densely populated Rhine-Ruhr region. A single terminal with three piers keeps walking distances short, while the SkyTrain monorail links it to the long-distance railway station at Düsseldorf Flughafen. Its traffic mix is unusually leisure-heavy for a large German airport, which makes summer Saturdays the real pressure point.",
      pt: "Düsseldorf é um dos aeroportos alemães com mais tráfego e a porta aérea da densamente povoada região Reno-Ruhr. Um único terminal com três cais mantém as distâncias a pé reduzidas, enquanto o monocarril SkyTrain o liga à estação de longo curso de Düsseldorf Flughafen. A composição do tráfego é invulgarmente orientada para o lazer para um grande aeroporto alemão, o que faz dos sábados de verão o verdadeiro ponto de tensão.",
      fr: "Düsseldorf est l'un des aéroports allemands les plus fréquentés et la porte aérienne de la région très peuplée Rhin-Ruhr. Un terminal unique à trois jetées limite les distances à pied, tandis que le monorail SkyTrain le relie à la gare grandes lignes de Düsseldorf Flughafen. Son trafic est exceptionnellement orienté loisirs pour un grand aéroport allemand, ce qui fait des samedis d'été le véritable point de tension.",
    },
    rights: {
      en: "All departures from Düsseldorf fall under EC 261/2004. The classic Mediterranean routes — Antalya, Palma, Hurghada — sit in the €400 band, Vienna, London or Zurich pay €250, and the Lufthansa and Discover long-haul services can reach €600. One caveat: compensation is halved if re-routing still gets you to your destination within two, three or four hours of the original arrival, depending on the distance flown.",
      pt: "Todas as partidas de Düsseldorf estão sujeitas ao CE 261/2004. As rotas clássicas do Mediterrâneo — Antália, Palma, Hurghada — ficam no patamar dos 400 €, Viena, Londres ou Zurique dão 250 € e as ligações de longo curso da Lufthansa e da Discover podem chegar aos 600 €. Uma ressalva: a indemnização é reduzida a metade se o reencaminhamento ainda o levar ao destino dentro de duas, três ou quatro horas da chegada inicialmente prevista, conforme a distância do voo.",
      fr: "Tous les départs de Düsseldorf relèvent du règlement CE 261/2004. Les classiques méditerranéennes — Antalya, Palma, Hurghada — se situent dans la tranche des 400 €, Vienne, Londres ou Zurich donnent 250 €, et les long-courriers de Lufthansa et Discover peuvent atteindre 600 €. Une réserve : l'indemnisation est réduite de moitié si le réacheminement vous fait tout de même arriver dans les deux, trois ou quatre heures suivant l'heure prévue, selon la distance du vol.",
    },
    tips: {
      en: "Package holiday passengers often assume the tour operator handles everything, but the compensation claim lies against the operating airline and can be pursued separately from any travel-law remedy against the operator. Note the flight number actually flown, because Eurowings and Condor frequently sub-charter aircraft from other carriers. And if you were moved to a lower cabin class, you are owed a partial refund of the ticket price on top of anything else you claim.",
      pt: "Quem viaja em pacote turístico presume muitas vezes que a operadora resolve tudo, mas o pedido de indemnização é feito contra a companhia operadora do voo e pode ser tratado à parte de qualquer outro direito contra a operadora. Registe o número do voo efetivamente realizado, porque a Eurowings e a Condor subcontratam com frequência aviões de outras transportadoras. E se foi transferido para uma classe inferior, tem direito ao reembolso parcial do preço do bilhete, além de tudo o mais que reclamar.",
      fr: "Les voyageurs à forfait supposent souvent que le tour-opérateur gère tout, mais la demande d'indemnisation se dirige contre le transporteur effectif et peut être menée indépendamment de tout recours contre l'organisateur. Notez le numéro du vol réellement effectué, car Eurowings et Condor affrètent fréquemment des appareils auprès d'autres compagnies. Et si vous avez été placé dans une classe inférieure, un remboursement partiel du prix du billet vous est dû, en plus du reste.",
    },
  },

  hamburg: {
    facts: [
      {
        en: "IATA HAM — Hamburg Airport Helmut Schmidt, in Fuhlsbüttel some 8.5 km from the city centre.",
        pt: "IATA HAM — Aeroporto de Hamburgo Helmut Schmidt, em Fuhlsbüttel, a cerca de 8,5 km do centro da cidade.",
        fr: "IATA HAM — aéroport de Hambourg Helmut Schmidt, à Fuhlsbüttel, à quelque 8,5 km du centre-ville.",
      },
      {
        en: "In operation since 1911, making it the oldest German airport still on its original site.",
        pt: "Em funcionamento desde 1911, é o mais antigo aeroporto alemão ainda no seu local original.",
        fr: "En service depuis 1911, c'est le plus ancien aéroport allemand encore sur son site d'origine.",
      },
      {
        en: "A night flight ban applies from 23:00, with only limited exceptions until midnight.",
        pt: "Vigora uma proibição de voos noturnos a partir das 23h00, com exceções limitadas até à meia-noite.",
        fr: "Une interdiction des vols de nuit s'applique dès 23h00, avec de rares exceptions jusqu'à minuit.",
      },
    ],
    about: {
      en: "Hamburg is northern Germany's largest airport, handling around 17 million passengers on a network built mostly around European city and leisure routes. Terminals 1 and 2 meet at the Airport Plaza, and the S1 S-Bahn runs directly beneath them to Hamburg Hauptbahnhof. Its long history and near-city location come with strict noise rules that bite hardest on late-evening delays.",
      pt: "Hamburgo é o maior aeroporto do norte da Alemanha, com cerca de 17 milhões de passageiros numa rede construída sobretudo em torno de rotas urbanas e de lazer na Europa. Os Terminais 1 e 2 encontram-se na Airport Plaza e a linha S1 da S-Bahn passa diretamente por baixo deles até à Hamburg Hauptbahnhof. A sua longa história e a proximidade da cidade trazem regras de ruído rigorosas que se fazem sentir sobretudo nos atrasos do fim da noite.",
      fr: "Hambourg est le plus grand aéroport du nord de l'Allemagne, avec près de 17 millions de passagers sur un réseau essentiellement composé de liaisons urbaines et de loisirs en Europe. Les terminaux 1 et 2 se rejoignent à l'Airport Plaza, et la ligne S1 du S-Bahn passe directement en dessous jusqu'à la Hamburg Hauptbahnhof. Sa longue histoire et sa proximité avec la ville imposent des règles de bruit strictes, particulièrement sensibles pour les retards de fin de soirée.",
    },
    rights: {
      en: "Departures from Hamburg are protected by EC 261/2004 whichever airline you fly. Short routes to Munich, Amsterdam or London pay €250 and longer intra-EU flights €400 when you land three or more hours late. The duty of care starts earlier than that: meals and refreshments are due after two hours of waiting on short flights, three hours on medium-haul and four hours on long-haul, plus a hotel and transfers whenever an overnight wait cannot be avoided.",
      pt: "As partidas de Hamburgo estão protegidas pelo CE 261/2004, qualquer que seja a companhia. As rotas curtas para Munique, Amesterdão ou Londres dão 250 € e os voos intracomunitários mais longos 400 €, quando aterra com três horas ou mais de atraso. O dever de assistência começa antes disso: refeições e bebidas são devidas após duas horas de espera nos voos curtos, três horas no médio curso e quatro horas no longo curso, além de alojamento e transporte sempre que a noite fora seja inevitável.",
      fr: "Les départs de Hambourg sont protégés par le règlement CE 261/2004, quelle que soit la compagnie. Les liaisons courtes vers Munich, Amsterdam ou Londres donnent 250 € et les vols intracommunautaires plus longs 400 €, dès lors que vous atterrissez avec au moins trois heures de retard. La prise en charge commence plus tôt : rafraîchissements et repas sont dus après deux heures d'attente sur les vols courts, trois heures sur le moyen-courrier et quatre heures sur le long-courrier, avec hôtel et transferts dès qu'une nuit sur place est inévitable.",
    },
    tips: {
      en: "Because of the 23:00 curfew, late evening arrivals that slip can be diverted to Hannover or Bremen, and the airline must then bring you to Hamburg at its own expense, by coach if necessary. Ask the crew where that coach departs from and keep your boarding pass. If you paid for a seat, a bag or a meal on a flight that was cancelled and you took the refund, those extras should be refunded as well.",
      pt: "Devido ao encerramento às 23h00, as chegadas do fim da noite que se atrasam podem ser desviadas para Hanôver ou Bremen, e a companhia é então obrigada a levá-lo até Hamburgo a expensas suas, de autocarro se necessário. Pergunte à tripulação de onde parte esse autocarro e guarde o cartão de embarque. Se pagou lugar marcado, bagagem ou refeição num voo que foi cancelado e optou pelo reembolso, esses extras também devem ser devolvidos.",
      fr: "En raison de la fermeture à 23h00, les arrivées tardives qui glissent peuvent être déroutées vers Hanovre ou Brême, et la compagnie doit alors vous conduire à Hambourg à ses frais, en car si nécessaire. Demandez à l'équipage d'où part ce car et conservez votre carte d'embarquement. Si vous avez payé un siège, un bagage ou un repas sur un vol annulé et que vous avez choisi le remboursement, ces suppléments doivent aussi vous être restitués.",
    },
  },

  "rome-fiumicino": {
    facts: [
      {
        en: "IATA FCO — Leonardo da Vinci Airport at Fiumicino, about 32 km south-west of Rome.",
        pt: "IATA FCO — Aeroporto Leonardo da Vinci, em Fiumicino, a cerca de 32 km a sudoeste de Roma.",
        fr: "IATA FCO — aéroport Leonardo da Vinci à Fiumicino, à environ 32 km au sud-ouest de Rome.",
      },
      {
        en: "Italy's busiest airport and the hub of ITA Airways, operated by Aeroporti di Roma.",
        pt: "É o aeroporto italiano com mais tráfego e o hub da ITA Airways, operado pela Aeroporti di Roma.",
        fr: "Premier aéroport italien par le trafic et hub d'ITA Airways, exploité par Aeroporti di Roma.",
      },
      {
        en: "The Leonardo Express runs non-stop to Roma Termini in about 32 minutes.",
        pt: "O Leonardo Express liga sem paragens a Roma Termini em cerca de 32 minutos.",
        fr: "Le Leonardo Express rejoint Roma Termini sans arrêt en une trentaine de minutes.",
      },
    ],
    about: {
      en: "Fiumicino is Italy's principal international gateway and the base from which ITA Airways flies its long-haul network. Terminals 1 and 3 carry the bulk of the traffic, with Terminal 1 rebuilt for Schengen flights and Terminal 3 handling intercontinental departures. Passenger numbers have climbed back above 40 million, and the airport has become a regular winner of European service-quality awards.",
      pt: "Fiumicino é a principal porta internacional de Itália e a base a partir da qual a ITA Airways opera a sua rede de longo curso. Os Terminais 1 e 3 concentram a maior parte do tráfego: o Terminal 1 foi reconstruído para os voos Schengen e o Terminal 3 acolhe as partidas intercontinentais. O número de passageiros voltou a subir acima dos 40 milhões e o aeroporto tornou-se um vencedor habitual de prémios europeus de qualidade de serviço.",
      fr: "Fiumicino est la principale porte internationale de l'Italie et la base d'où ITA Airways exploite son réseau long-courrier. Les terminaux 1 et 3 concentrent l'essentiel du trafic : le Terminal 1 a été reconstruit pour les vols Schengen et le Terminal 3 accueille les départs intercontinentaux. La fréquentation est repassée au-dessus de 40 millions de passagers et l'aéroport collectionne les prix européens de qualité de service.",
    },
    rights: {
      en: "Every flight departing Fiumicino is covered by EC 261/2004. Rome to Barcelona or Paris pays €250, Rome to Stockholm or Tenerife €400, and ITA's long-haul routes to New York, São Paulo or Tokyo €600 — always measured by how late you reach your final destination. Strikes are a recurring feature of Italian aviation, and where it is the operating airline's own staff on strike, the Court of Justice has held that compensation remains payable.",
      pt: "Todos os voos que partem de Fiumicino estão abrangidos pelo CE 261/2004. Roma–Barcelona ou Roma–Paris dão 250 €, Roma–Estocolmo ou Roma–Tenerife 400 € e as rotas de longo curso da ITA para Nova Iorque, São Paulo ou Tóquio 600 € — sempre em função do atraso com que chega ao destino final. As greves são recorrentes na aviação italiana e, quando quem faz greve é o pessoal da própria companhia operadora, o Tribunal de Justiça já decidiu que a indemnização continua a ser devida.",
      fr: "Tous les vols au départ de Fiumicino relèvent du règlement CE 261/2004. Rome–Barcelone ou Rome–Paris donnent 250 €, Rome–Stockholm ou Rome–Tenerife 400 €, et les long-courriers d'ITA vers New York, São Paulo ou Tokyo 600 € — toujours en fonction du retard constaté à votre destination finale. Les grèves sont récurrentes dans l'aérien italien et, lorsque ce sont les personnels du transporteur effectif qui cessent le travail, la Cour de justice a jugé que l'indemnisation reste due.",
    },
    tips: {
      en: "Italian national strikes are announced in advance and airlines must publish the list of cancelled flights; if you were rebooked more than a day later, ask about re-routing with another carrier or take the full refund. Bear in mind that Italian courts generally apply a two-year limitation period to air passenger claims, far shorter than in France or Spain, so do not let the paperwork sit. ENAC is the national enforcement body for flights departing Italy.",
      pt: "As greves nacionais em Itália são anunciadas com antecedência e as companhias são obrigadas a publicar a lista de voos cancelados; se foi reencaminhado para mais de um dia depois, pergunte por alternativas noutra transportadora ou opte pelo reembolso total. Tenha presente que os tribunais italianos aplicam em regra um prazo de prescrição de dois anos aos pedidos de passageiros aéreos, muito mais curto do que em França ou em Espanha, pelo que não deve deixar a documentação parada. A ENAC é a autoridade nacional competente para os voos com partida em Itália.",
      fr: "Les grèves nationales italiennes sont annoncées à l'avance et les compagnies doivent publier la liste des vols annulés ; si vous avez été reprogrammé plus d'un jour plus tard, demandez un réacheminement chez un autre transporteur ou prenez le remboursement intégral. Gardez à l'esprit que les tribunaux italiens appliquent en général un délai de prescription de deux ans aux réclamations des passagers aériens, bien plus court qu'en France ou en Espagne : ne laissez pas dormir votre dossier. L'ENAC est l'autorité nationale compétente pour les vols au départ d'Italie.",
    },
  },

  "milan-malpensa": {
    facts: [
      {
        en: "IATA MXP — some 45 km north-west of Milan, near the Ticino valley in Lombardy.",
        pt: "IATA MXP — a cerca de 45 km a noroeste de Milão, junto ao vale do Ticino, na Lombardia.",
        fr: "IATA MXP — à environ 45 km au nord-ouest de Milan, près de la vallée du Tessin, en Lombardie.",
      },
      {
        en: "Italy's second-busiest passenger airport and its largest for air cargo.",
        pt: "É o segundo aeroporto italiano em passageiros e o maior do país em carga aérea.",
        fr: "Deuxième aéroport italien pour les passagers et premier pour le fret aérien.",
      },
      {
        en: "Terminal 1 serves most airlines, while Terminal 2 is easyJet's dedicated base.",
        pt: "O Terminal 1 serve a maioria das companhias, enquanto o Terminal 2 é a base dedicada da easyJet.",
        fr: "Le Terminal 1 accueille la plupart des compagnies, le Terminal 2 étant la base dédiée d'easyJet.",
      },
    ],
    about: {
      en: "Malpensa is Milan's intercontinental airport and the biggest freight hub in Italy, run by the operator SEA. Terminal 1 handles legacy and long-haul carriers across three satellites, while easyJet's large Italian base occupies Terminal 2 a short shuttle ride away. The Malpensa Express links both terminals to Milano Cadorna and Centrale, which makes rail a practical fallback when flights stop moving.",
      pt: "Malpensa é o aeroporto intercontinental de Milão e o maior centro de carga de Itália, gerido pela operadora SEA. O Terminal 1 acolhe as companhias tradicionais e de longo curso em três satélites, enquanto a grande base italiana da easyJet ocupa o Terminal 2, a poucos minutos de shuttle. O Malpensa Express liga os dois terminais a Milano Cadorna e Centrale, o que torna a ferrovia uma alternativa prática quando os voos param.",
      fr: "Malpensa est l'aéroport intercontinental de Milan et la première plate-forme de fret d'Italie, exploitée par SEA. Le Terminal 1 accueille les compagnies classiques et long-courrier sur trois satellites, tandis que la grande base italienne d'easyJet occupe le Terminal 2, à quelques minutes de navette. Le Malpensa Express relie les deux terminaux à Milano Cadorna et Centrale, ce qui fait du rail un repli concret quand les vols s'arrêtent.",
    },
    rights: {
      en: "EC 261/2004 applies to all Malpensa departures and to arrivals flown by EU airlines. Expect €250 to Rome, Munich or Paris, €400 to Lisbon, Athens or the Canaries, and €600 on long-haul services to New York, Dubai or Tokyo. What matters is being three hours late on arrival — a flight that pushes back late but makes the time up in the air does not qualify, even if the departure delay was severe.",
      pt: "O CE 261/2004 aplica-se a todas as partidas de Malpensa e às chegadas operadas por companhias da UE. Conte com 250 € para Roma, Munique ou Paris, 400 € para Lisboa, Atenas ou as Canárias e 600 € nas ligações de longo curso para Nova Iorque, Dubai ou Tóquio. O que conta é chegar com três horas de atraso — um voo que parte tarde mas recupera o tempo em voo não dá direito a indemnização, mesmo que o atraso à partida tenha sido grande.",
      fr: "Le règlement CE 261/2004 couvre tous les départs de Malpensa et les arrivées opérées par des compagnies de l'UE. Comptez 250 € vers Rome, Munich ou Paris, 400 € vers Lisbonne, Athènes ou les Canaries, et 600 € sur les long-courriers vers New York, Dubaï ou Tokyo. C'est le retard à l'arrivée de trois heures qui compte : un vol parti tard mais qui rattrape le temps en vol n'ouvre aucun droit, même si le retard au départ a été important.",
    },
    tips: {
      en: "Malpensa's two terminals are physically separated, so a rebooking that moves you between easyJet at Terminal 2 and a legacy carrier at Terminal 1 needs extra time — do not accept a connection you cannot physically make. Fog is a real winter risk in the Po valley and usually excuses compensation, though the airline still owes food, accommodation and re-routing. Written confirmation from gate staff about the cause is worth far more later than any verbal explanation.",
      pt: "Os dois terminais de Malpensa estão fisicamente separados, pelo que uma remarcação que o faça passar da easyJet no Terminal 2 para uma companhia tradicional no Terminal 1 exige tempo extra — não aceite uma ligação que não consegue cumprir. O nevoeiro é um risco real de inverno no vale do Pó e normalmente afasta a indemnização, embora a companhia continue a dever refeições, alojamento e reencaminhamento. Uma confirmação escrita do pessoal da porta de embarque sobre a causa vale muito mais, mais tarde, do que qualquer explicação verbal.",
      fr: "Les deux terminaux de Malpensa sont physiquement séparés : une reprogrammation qui vous fait passer d'easyJet au Terminal 2 à une compagnie classique au Terminal 1 exige du temps supplémentaire — n'acceptez pas une correspondance matériellement impossible. Le brouillard est un risque hivernal réel dans la vallée du Pô et exonère généralement de l'indemnisation, la compagnie devant toutefois repas, hébergement et réacheminement. Une confirmation écrite du personnel de porte sur la cause vaut bien plus, par la suite, qu'une explication orale.",
    },
  },

  "milan-linate": {
    facts: [
      {
        en: "IATA LIN — Milan's city airport, roughly 8 km east of the Duomo.",
        pt: "IATA LIN — é o aeroporto urbano de Milão, a cerca de 8 km a leste do Duomo.",
        fr: "IATA LIN — l'aéroport urbain de Milan, à environ 8 km à l'est du Duomo.",
      },
      {
        en: "Traffic is restricted by law, with a cap on movements and limits on which routes may be served.",
        pt: "O tráfego é limitado por lei, com um limite de movimentos e restrições às rotas que podem ser servidas.",
        fr: "Le trafic est encadré par la loi, avec un plafond de mouvements et des limites sur les liaisons autorisées.",
      },
      {
        en: "Metro line M4 now runs from the terminal into central Milan.",
        pt: "A linha M4 do metro liga agora o terminal ao centro de Milão.",
        fr: "La ligne de métro M4 relie désormais le terminal au centre de Milan.",
      },
    ],
    about: {
      en: "Linate is the compact, business-focused counterpart to Malpensa, with a single terminal and a route network shaped by decades of Italian rules limiting its slots and destinations. ITA Airways dominates, above all on the shuttle to Rome Fiumicino, alongside short-haul European carriers serving business markets. The airport closed for three months in 2019 for a full runway and terminal overhaul, and the M4 metro has since put the city centre little more than a dozen minutes away.",
      pt: "Linate é a contraparte compacta e orientada para negócios de Malpensa, com um único terminal e uma rede de rotas moldada por décadas de regras italianas que limitam as suas faixas horárias e destinos. A ITA Airways domina, sobretudo na ponte aérea para Roma Fiumicino, ao lado de companhias europeias de curto curso ao serviço dos mercados de negócios. O aeroporto fechou três meses em 2019 para uma renovação integral da pista e do terminal, e o metro M4 colocou desde então o centro da cidade a pouco mais de dez minutos.",
      fr: "Linate est le pendant compact et orienté affaires de Malpensa, avec un terminal unique et un réseau façonné par des décennies de règles italiennes limitant ses créneaux et ses destinations. ITA Airways y domine, surtout sur la navette vers Rome Fiumicino, aux côtés de compagnies européennes court-courrier au service des marchés d'affaires. L'aéroport a fermé trois mois en 2019 pour une refonte complète de la piste et du terminal, et le métro M4 place désormais le centre-ville à un peu plus de dix minutes.",
    },
    rights: {
      en: "Linate is an EU departure airport, so EC 261/2004 covers every flight leaving it. Most of the network — Rome, Paris, Frankfurt, London — sits in the €250 band, with €400 reserved for the few longer intra-EU routes. If your flight is cancelled and the airline moves you onto a departure from Malpensa instead, that counts as re-routing via a different airport and it must bear the cost of getting you between the two.",
      pt: "Linate é um aeroporto de partida na UE, pelo que o CE 261/2004 cobre todos os voos que dele partem. A maior parte da rede — Roma, Paris, Frankfurt, Londres — fica no patamar dos 250 €, com 400 € reservados às poucas rotas intracomunitárias mais longas. Se o seu voo for cancelado e a companhia o transferir para uma partida de Malpensa, isso conta como reencaminhamento por outro aeroporto e a companhia tem de suportar o custo do trajeto entre os dois.",
      fr: "Linate est un aéroport de départ de l'UE : le règlement CE 261/2004 couvre donc tous les vols qui en partent. L'essentiel du réseau — Rome, Paris, Francfort, Londres — relève des 250 €, les 400 € étant réservés aux rares liaisons intracommunautaires plus longues. Si votre vol est annulé et que la compagnie vous replace sur un départ de Malpensa, il s'agit d'un réacheminement via un autre aéroport : elle doit prendre en charge le trajet entre les deux.",
    },
    tips: {
      en: "The Rome shuttle runs close to hourly, so an airline that leaves you waiting half a day has probably failed its re-routing duty — ask for the next available seat on any carrier. Business travellers often accept a rebooking and forget the claim, yet compensation is still payable even if you made your meeting, provided you reached your destination three hours or more late. Keep the original booking confirmation, since it shows the scheduled arrival time the claim is measured against.",
      pt: "A ponte aérea para Roma tem frequência quase horária, pelo que uma companhia que o deixe à espera meio dia falhou provavelmente o dever de reencaminhamento — peça o lugar seguinte em qualquer transportadora. Quem viaja em negócios aceita muitas vezes a remarcação e esquece o pedido, mas a indemnização continua a ser devida mesmo que tenha chegado à reunião, desde que tenha atingido o destino com três horas ou mais de atraso. Guarde a confirmação de reserva original, porque é ela que mostra a hora de chegada prevista com que o atraso é comparado.",
      fr: "La navette vers Rome est quasi horaire : une compagnie qui vous laisse attendre une demi-journée a probablement manqué à son obligation de réacheminement — demandez le prochain siège disponible, quel que soit le transporteur. Les voyageurs d'affaires acceptent souvent la reprogrammation et oublient la réclamation, alors que l'indemnisation reste due même si vous avez tenu votre rendez-vous, dès lors que vous êtes arrivé avec au moins trois heures de retard. Conservez la confirmation de réservation initiale : c'est elle qui indique l'heure d'arrivée prévue servant de référence.",
    },
  },

  venice: {
    facts: [
      {
        en: "IATA VCE — Marco Polo Airport at Tessera, on the northern edge of the Venetian lagoon.",
        pt: "IATA VCE — Aeroporto Marco Polo, em Tessera, na margem norte da laguna de Veneza.",
        fr: "IATA VCE — aéroport Marco Polo à Tessera, sur la rive nord de la lagune de Venise.",
      },
      {
        en: "One of the few airports reachable by boat, with Alilaguna services and water taxis from the terminal.",
        pt: "É um dos raros aeroportos acessíveis por barco, com serviços Alilaguna e táxis aquáticos junto ao terminal.",
        fr: "L'un des rares aéroports accessibles en bateau, avec les navettes Alilaguna et des taxis d'eau au départ du terminal.",
      },
      {
        en: "Among Italy's busiest airports, driven by year-round tourism and seasonal transatlantic routes.",
        pt: "Está entre os aeroportos italianos com mais tráfego, impulsionado pelo turismo durante todo o ano e por rotas transatlânticas sazonais.",
        fr: "Parmi les aéroports italiens les plus fréquentés, porté par un tourisme continu et des lignes transatlantiques saisonnières.",
      },
    ],
    about: {
      en: "Venice Marco Polo sits on the lagoon shore some 8 km from the historic centre and is operated by SAVE. A single passenger terminal handles a distinctly tourist-led mix: Ryanair, easyJet, Volotea and Wizz Air on European routes, plus summer long-haul flights to North America. A separate water terminal a few minutes' walk away connects to Venice by Alilaguna line or private water taxi.",
      pt: "Veneza Marco Polo fica na margem da laguna, a cerca de 8 km do centro histórico, e é operado pela SAVE. Um único terminal de passageiros acolhe uma combinação claramente turística: Ryanair, easyJet, Volotea e Wizz Air nas rotas europeias, além de voos de longo curso no verão para a América do Norte. Um terminal aquático separado, a poucos minutos a pé, liga a Veneza por linha Alilaguna ou táxi aquático privado.",
      fr: "Venise Marco Polo se trouve au bord de la lagune, à quelque 8 km du centre historique, et est exploité par SAVE. Un terminal passagers unique accueille un trafic nettement touristique : Ryanair, easyJet, Volotea et Wizz Air sur les lignes européennes, plus des long-courriers estivaux vers l'Amérique du Nord. Un terminal maritime distinct, à quelques minutes à pied, relie Venise par les lignes Alilaguna ou en taxi d'eau privé.",
    },
    rights: {
      en: "All departures from Venice come under EC 261/2004. Compensation runs at €250 for flights under 1,500 km such as Vienna or Munich, €400 for longer intra-EU routes, and €600 for the transatlantic services to New York or Montreal, paid when you arrive three or more hours late. Where a cancellation is announced between seven and fourteen days ahead, the airline escapes payment only if the replacement leaves no more than two hours earlier and lands less than four hours later than planned.",
      pt: "Todas as partidas de Veneza estão sujeitas ao CE 261/2004. A indemnização é de 250 € nos voos inferiores a 1500 km, como Viena ou Munique, de 400 € nas rotas intracomunitárias mais longas e de 600 € nas ligações transatlânticas para Nova Iorque ou Montreal, sempre que chegue com três horas ou mais de atraso. Se o cancelamento for anunciado entre sete e catorze dias antes, a companhia só escapa ao pagamento se o voo alternativo partir no máximo duas horas mais cedo e aterrar menos de quatro horas depois do previsto.",
      fr: "Tous les départs de Venise relèvent du règlement CE 261/2004. L'indemnisation est de 250 € pour les vols de moins de 1 500 km comme Vienne ou Munich, de 400 € sur les liaisons intracommunautaires plus longues et de 600 € sur les services transatlantiques vers New York ou Montréal, dès trois heures de retard à l'arrivée. Lorsque l'annulation est annoncée entre sept et quatorze jours avant le départ, la compagnie n'échappe au paiement que si le vol de remplacement part au plus deux heures plus tôt et atterrit moins de quatre heures plus tard que prévu.",
    },
    tips: {
      en: "Low-cost carriers here sometimes rebook passengers onto Treviso, roughly 30 km away; that is a different airport, so the transfer is at the airline's expense. Overnight capacity in the terminal is limited and lagoon hotels are expensive in season, so book something reasonable and claim it back rather than sleeping on a bench. Keep the water taxi or bus ticket you could not use, since consequential losses can sometimes be pursued separately from the fixed compensation.",
      pt: "As low-cost transferem aqui por vezes os passageiros para Treviso, a cerca de 30 km; trata-se de um aeroporto diferente, pelo que a deslocação é a expensas da companhia. A capacidade para passar a noite no terminal é limitada e os hotéis na laguna são caros em época alta, por isso reserve algo razoável e peça o reembolso em vez de dormir num banco. Guarde o bilhete de táxi aquático ou de autocarro que não pôde usar, já que os prejuízos consequentes podem, em certos casos, ser reclamados em separado da indemnização fixa.",
      fr: "Les compagnies low-cost reprogramment parfois les passagers au départ de Trévise, à une trentaine de kilomètres ; il s'agit d'un autre aéroport, le transfert est donc aux frais de la compagnie. La capacité d'attente nocturne du terminal est limitée et les hôtels de la lagune sont chers en saison : réservez une solution raisonnable et faites-la rembourser plutôt que de dormir sur un banc. Conservez le billet de taxi d'eau ou de bus que vous n'avez pas pu utiliser, car les préjudices consécutifs peuvent parfois être réclamés en plus de l'indemnisation forfaitaire.",
    },
  },

  amsterdam: {
    facts: [
      {
        en: "IATA AMS — Schiphol, about 9 km south-west of Amsterdam and some four metres below sea level.",
        pt: "IATA AMS — Schiphol, a cerca de 9 km a sudoeste de Amesterdão e cerca de quatro metros abaixo do nível do mar.",
        fr: "IATA AMS — Schiphol, à environ 9 km au sud-ouest d'Amsterdam et à quelque quatre mètres sous le niveau de la mer.",
      },
      {
        en: "One terminal with three departure halls, and six runways including the distant Polderbaan.",
        pt: "Um terminal com três salas de partidas e seis pistas, incluindo a distante Polderbaan.",
        fr: "Un terminal à trois halls de départ et six pistes, dont la lointaine Polderbaan.",
      },
      {
        en: "A KLM, Transavia and Delta hub, with Schiphol Plaza's rail station directly beneath the terminal.",
        pt: "É um hub da KLM, da Transavia e da Delta, com a estação ferroviária da Schiphol Plaza diretamente sob o terminal.",
        fr: "Hub de KLM, Transavia et Delta, avec la gare de Schiphol Plaza directement sous le terminal.",
      },
    ],
    about: {
      en: "Schiphol is the Netherlands' only large airport and one of Europe's biggest hubs, built as a single terminal with three departure halls so that transferring passengers never leave the secure area. KLM and its partners drive the connecting traffic while Transavia covers leisure routes. Six runways spread across a wide polder site mean the taxi out to the Polderbaan can add twenty minutes to a departure, and the airport operates under a statutory cap on annual aircraft movements.",
      pt: "Schiphol é o único grande aeroporto dos Países Baixos e um dos maiores hubs da Europa, concebido como um terminal único com três salas de partidas, para que os passageiros em trânsito nunca saiam da zona restrita. A KLM e os seus parceiros sustentam o tráfego de ligação, enquanto a Transavia cobre as rotas de lazer. As seis pistas espalhadas por um vasto pólder fazem com que a rolagem até à Polderbaan possa acrescentar vinte minutos a uma partida, e o aeroporto opera sob um limite legal de movimentos anuais de aeronaves.",
      fr: "Schiphol est le seul grand aéroport des Pays-Bas et l'un des principaux hubs européens, conçu comme un terminal unique à trois halls de départ afin que les passagers en transit ne quittent jamais la zone sécurisée. KLM et ses partenaires portent le trafic de correspondance, tandis que Transavia couvre les liaisons loisirs. Les six pistes réparties sur un vaste polder font que le roulage jusqu'à la Polderbaan peut ajouter vingt minutes à un départ, et l'aéroport est soumis à un plafond légal de mouvements annuels.",
    },
    rights: {
      en: "Departures from Schiphol are covered by EC 261/2004, and arrivals are too when flown by KLM or another EU carrier. KLM's long-haul network puts many claims in the €600 band, with €400 for longer European routes and €250 for short hops to London, Paris or Hamburg. Dutch courts have been notably willing to enforce these entitlements, and compliance is supervised by the Inspectie Leefomgeving en Transport.",
      pt: "As partidas de Schiphol estão abrangidas pelo CE 261/2004 e as chegadas também, quando operadas pela KLM ou por outra companhia da UE. A rede de longo curso da KLM coloca muitos pedidos no patamar dos 600 €, com 400 € nas rotas europeias mais longas e 250 € nos trajetos curtos para Londres, Paris ou Hamburgo. Os tribunais neerlandeses têm-se mostrado particularmente disponíveis para fazer cumprir estes direitos, e a fiscalização cabe à Inspectie Leefomgeving en Transport.",
      fr: "Les départs de Schiphol relèvent du règlement CE 261/2004, et les arrivées également lorsqu'elles sont opérées par KLM ou une autre compagnie de l'UE. Le réseau long-courrier de KLM place de nombreuses demandes dans la tranche des 600 €, avec 400 € sur les liaisons européennes plus longues et 250 € sur les courts trajets vers Londres, Paris ou Hambourg. Les tribunaux néerlandais se montrent particulièrement enclins à faire respecter ces droits, et le contrôle est assuré par l'Inspectie Leefomgeving en Transport.",
    },
    tips: {
      en: "Schiphol's transfer desks are efficient but tend to offer the next KLM option first; you can ask to be re-routed on another airline if it gets you there sooner. If you miss a connection because of a long taxi or a security queue, the operating carrier remains responsible as long as both legs are on one ticket. Claims under Dutch law are usually subject to a two-year limitation period, so start early and keep the automated delay notifications KLM sends by app or email.",
      pt: "Os balcões de trânsito de Schiphol são eficientes, mas tendem a propor primeiro a opção seguinte da KLM; pode pedir reencaminhamento noutra companhia se esta o levar mais depressa ao destino. Se perder uma ligação por causa de uma rolagem longa ou de uma fila na segurança, a transportadora operadora continua responsável, desde que ambos os trechos estejam no mesmo bilhete. Ao abrigo do direito neerlandês, os pedidos estão em regra sujeitos a um prazo de prescrição de dois anos, pelo que convém começar cedo e guardar as notificações automáticas de atraso que a KLM envia por aplicação ou e-mail.",
      fr: "Les comptoirs de transit de Schiphol sont efficaces mais proposent d'abord la prochaine option KLM ; vous pouvez demander un réacheminement sur une autre compagnie si elle vous fait arriver plus tôt. Si vous manquez une correspondance à cause d'un long roulage ou d'une file au contrôle de sûreté, le transporteur effectif reste responsable dès lors que les deux tronçons figurent sur un même billet. En droit néerlandais, les demandes sont généralement soumises à un délai de prescription de deux ans : agissez tôt et conservez les notifications automatiques de retard envoyées par KLM via l'application ou par e-mail.",
    },
  },
};
