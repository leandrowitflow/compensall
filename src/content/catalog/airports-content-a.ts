import type { CatalogContentMap } from "./types";

/**
 * Airports batch A: UK majors, Portugal and Spain.
 * UK departures are framed under UK261, EU departures under EC 261/2004.
 */
export const airportsContentA: CatalogContentMap = {
  heathrow: {
    facts: [
      {
        en: "IATA code: LHR",
        pt: "Código IATA: LHR",
        fr: "Code IATA : LHR",
      },
      {
        en: "London, United Kingdom",
        pt: "Londres, Reino Unido",
        fr: "Londres, Royaume-Uni",
      },
      {
        en: "The UK's busiest hub and main base for British Airways",
        pt: "O maior hub do Reino Unido e base principal da British Airways",
        fr: "Le principal hub du Royaume-Uni et la base de British Airways",
      },
    ],
    about: {
      en: "Heathrow is the United Kingdom's largest airport, handling around 80 million passengers a year across four terminals. Its two runways operate close to capacity, so a single morning thunderstorm or an air traffic restriction can ripple through the rest of the day. Most long-haul departures leave from Terminal 5 (British Airways) and Terminal 2 (Star Alliance).",
      pt: "Heathrow é o maior aeroporto do Reino Unido, com cerca de 80 milhões de passageiros por ano distribuídos por quatro terminais. As duas pistas funcionam praticamente no limite da capacidade, pelo que uma trovoada matinal ou uma restrição do controlo de tráfego aéreo pode desregular o resto do dia. A maioria dos voos de longo curso parte do Terminal 5 (British Airways) e do Terminal 2 (Star Alliance).",
      fr: "Heathrow est le plus grand aéroport du Royaume-Uni, avec près de 80 millions de passagers par an répartis sur quatre terminaux. Ses deux pistes fonctionnent quasiment à saturation : un orage matinal ou une restriction du contrôle aérien peut désorganiser toute la journée. La plupart des vols long-courriers partent du terminal 5 (British Airways) et du terminal 2 (Star Alliance).",
    },
    rights: {
      en: "If you departed from Heathrow, UK261 applies whatever airline you flew and whatever passport you hold: £220 to £520 per passenger once you land three or more hours late, plus a refund or re-routing if the flight was cancelled. Arriving flights are covered too when the operating carrier is a UK or EU airline; if you arrived from outside the UK on a carrier that is neither, UK261 does not apply. Long-haul routes over 3,500 km sit in the top £520 band, which is where most Heathrow claims land.",
      pt: "Se partiu de Heathrow, aplica-se o UK261 independentemente da companhia aérea ou da sua nacionalidade: 220 £ a 520 £ por passageiro quando a chegada tem três ou mais horas de atraso, além do reembolso ou reencaminhamento em caso de cancelamento. Os voos que chegam também estão cobertos quando a transportadora operadora é britânica ou da UE; se chegou de fora do Reino Unido numa companhia que não é britânica nem europeia, o UK261 não se aplica. As rotas de longo curso acima de 3500 km caem no escalão máximo de 520 £, onde se concentra a maior parte das reclamações em Heathrow.",
      fr: "Au départ de Heathrow, le règlement UK261 s'applique quelle que soit la compagnie et quelle que soit votre nationalité : de 220 £ à 520 £ par passager dès que vous atterrissez avec trois heures de retard ou plus, plus le remboursement ou le réacheminement en cas d'annulation. Les vols à l'arrivée sont également couverts lorsque le transporteur effectif est britannique ou européen ; si vous arrivez de l'extérieur du Royaume-Uni sur une compagnie ni britannique ni européenne, UK261 ne s'applique pas. Les liaisons de plus de 3 500 km relèvent de la tranche maximale de 520 £, celle de la plupart des dossiers Heathrow.",
    },
    tips: {
      en: "Heathrow publishes live disruption notices, but a claim needs the airline's version of events: ask at the ticket or transfer desk for the delay reason in writing before you leave the terminal. Keep your boarding pass and, if you waited more than two hours, the receipts for the meals and drinks the airline should have covered under its duty of care. Note the actual arrival time at the gate rather than the scheduled one, because the three-hour threshold is measured when the doors open.",
      pt: "Heathrow publica avisos de perturbação em tempo real, mas uma reclamação precisa da versão da companhia: peça no balcão de bilhetes ou de trânsito o motivo do atraso por escrito antes de sair do terminal. Guarde o cartão de embarque e, se esperou mais de duas horas, os recibos das refeições e bebidas que a companhia deveria ter pago a título de assistência. Registe a hora real de chegada à porta, e não a prevista, porque o limite das três horas conta a partir da abertura das portas.",
      fr: "Heathrow diffuse des avis de perturbation en temps réel, mais un dossier a besoin de la version de la compagnie : demandez au comptoir le motif du retard par écrit avant de quitter le terminal. Conservez votre carte d'embarquement et, au-delà de deux heures d'attente, les justificatifs des repas et boissons que la compagnie devait prendre en charge au titre de l'assistance. Notez l'heure réelle d'arrivée à la porte, et non l'heure prévue : le seuil de trois heures se calcule à l'ouverture des portes.",
    },
  },

  gatwick: {
    facts: [
      {
        en: "IATA code: LGW",
        pt: "Código IATA: LGW",
        fr: "Code IATA : LGW",
      },
      {
        en: "London, United Kingdom",
        pt: "Londres, Reino Unido",
        fr: "Londres, Royaume-Uni",
      },
      {
        en: "The world's busiest single-runway airport and easyJet's largest base",
        pt: "O aeroporto de pista única mais movimentado do mundo e a maior base da easyJet",
        fr: "L'aéroport à piste unique le plus fréquenté au monde et la plus grande base d'easyJet",
      },
    ],
    about: {
      en: "Gatwick sits 45 km south of central London and runs the world's busiest single runway from two terminals, North and South. Its schedule is built around dense easyJet and British Airways short-haul waves, plus leisure long-haul to the United States, the Caribbean and Asia. With almost no runway slack, a delay in the first wave of the morning tends to follow the aircraft around all day.",
      pt: "Gatwick fica a 45 km a sul do centro de Londres e opera a pista única mais movimentada do mundo, a partir dos terminais Norte e Sul. O horário está construído em torno de vagas densas de voos de curto curso da easyJet e da British Airways, além de longo curso de lazer para os Estados Unidos, as Caraíbas e a Ásia. Como quase não há margem na pista, um atraso na primeira vaga da manhã tende a acompanhar o avião durante todo o dia.",
      fr: "Gatwick se trouve à 45 km au sud du centre de Londres et exploite la piste unique la plus fréquentée au monde, depuis les terminaux Nord et Sud. Le programme repose sur des vagues denses de vols court-courriers easyJet et British Airways, complétées par du long-courrier loisir vers les États-Unis, les Caraïbes et l'Asie. La piste n'offrant presque aucune marge, un retard pris à la première vague du matin suit l'avion toute la journée.",
    },
    rights: {
      en: "Every departure from Gatwick falls under UK261, so a Ryanair, Norse or Emirates flight leaving the South Terminal is treated exactly like a British Airways one: £220 for journeys up to 1,500 km, £350 up to 3,500 km and £520 beyond that. A cancellation with less than 14 days' notice adds the right to a refund or a seat on the next available flight, including on another airline. Knock-on delays caused by an aircraft that arrived late the night before are an operational problem for the airline, not an extraordinary circumstance.",
      pt: "Todas as partidas de Gatwick estão sujeitas ao UK261, pelo que um voo da Ryanair, da Norse ou da Emirates a partir do Terminal Sul é tratado como um da British Airways: 220 £ até 1500 km, 350 £ até 3500 km e 520 £ acima disso. O cancelamento com menos de 14 dias de aviso acrescenta o direito a reembolso ou a lugar no primeiro voo disponível, mesmo noutra companhia. Os atrasos em cadeia provocados por um avião que chegou tarde na noite anterior são um problema operacional da companhia e não uma circunstância extraordinária.",
      fr: "Tout départ de Gatwick relève d'UK261 : un vol Ryanair, Norse ou Emirates au départ du terminal Sud est traité comme un vol British Airways, soit 220 £ jusqu'à 1 500 km, 350 £ jusqu'à 3 500 km et 520 £ au-delà. Une annulation notifiée moins de 14 jours avant le départ ouvre en plus droit au remboursement ou à une place sur le prochain vol disponible, y compris sur une autre compagnie. Les retards en cascade dus à un avion arrivé tard la veille relèvent de l'exploitation de la compagnie, pas des circonstances extraordinaires.",
    },
    tips: {
      en: "The North and South terminals are linked by a shuttle that takes several minutes, so if the airline rebooks you, check which terminal your replacement flight leaves from before you clear security. Photograph the departure board showing the delay and keep the airline's text and email notifications, since Gatwick's own disruption alerts never name a cause. If you were denied boarding on an overbooked morning flight, ask for the written confirmation the airline is required to give you.",
      pt: "Os terminais Norte e Sul estão ligados por um shuttle de alguns minutos, por isso, se a companhia o reencaminhar, confirme de que terminal parte o novo voo antes de passar o controlo de segurança. Fotografe o painel de partidas com o atraso e guarde as SMS e os e-mails da companhia, já que os alertas do próprio aeroporto nunca indicam a causa. Se lhe foi recusado o embarque num voo da manhã com overbooking, exija a confirmação escrita que a companhia é obrigada a entregar.",
      fr: "Les terminaux Nord et Sud sont reliés par une navette de quelques minutes : si la compagnie vous replace sur un autre vol, vérifiez le terminal de départ avant de passer les contrôles. Photographiez l'écran des départs affichant le retard et conservez les SMS et courriels de la compagnie, car les alertes de l'aéroport n'indiquent jamais la cause. En cas de refus d'embarquement sur un vol du matin surbooké, réclamez la confirmation écrite que la compagnie doit vous remettre.",
    },
  },

  manchester: {
    facts: [
      {
        en: "IATA code: MAN",
        pt: "Código IATA: MAN",
        fr: "Code IATA : MAN",
      },
      {
        en: "Manchester, United Kingdom",
        pt: "Manchester, Reino Unido",
        fr: "Manchester, Royaume-Uni",
      },
      {
        en: "The largest UK airport outside London, with long-haul and low-cost side by side",
        pt: "O maior aeroporto do Reino Unido fora de Londres, com longo curso e low-cost lado a lado",
        fr: "Le plus grand aéroport britannique hors de Londres, mêlant long-courrier et low-cost",
      },
    ],
    about: {
      en: "Manchester is the main gateway for the north of England, combining Jet2, Ryanair, easyJet and TUI short-haul with long-haul services from Emirates, Singapore Airlines and Virgin Atlantic. Terminal 2 has been rebuilt as the airport's long-haul home while the older terminals are progressively retired. Winter fog and de-icing queues are the classic local causes of a morning delay.",
      pt: "Manchester é a principal porta de entrada do norte de Inglaterra e combina os voos de curto curso da Jet2, Ryanair, easyJet e TUI com o longo curso da Emirates, Singapore Airlines e Virgin Atlantic. O Terminal 2 foi reconstruído para acolher os voos de longo curso, enquanto os terminais mais antigos vão sendo desativados. O nevoeiro de inverno e as filas para descongelamento são as causas locais clássicas de atraso matinal.",
      fr: "Manchester est la principale porte d'entrée du nord de l'Angleterre : court-courrier Jet2, Ryanair, easyJet et TUI, long-courrier Emirates, Singapore Airlines et Virgin Atlantic. Le terminal 2, reconstruit, accueille désormais le long-courrier, tandis que les terminaux plus anciens sont progressivement retirés du service. Le brouillard hivernal et les files de dégivrage sont les causes locales classiques de retard matinal.",
    },
    rights: {
      en: "Departures from Manchester are UK261 territory: three hours or more late at your destination and the operating airline owes £220 to £520, whether the flight is a two-hour hop to Palma or a nine-hour service to Dubai. If you were flying into Manchester from an EU airport, EC 261/2004 governs the claim instead and the amounts are set in euros. De-icing and a snow-closed runway usually count as extraordinary, but a crew shortage or a technical fault found at the gate does not.",
      pt: "As partidas de Manchester regem-se pelo UK261: com três horas ou mais de atraso no destino, a companhia operadora deve 220 £ a 520 £, tanto num salto de duas horas para Palma como num voo de nove horas para o Dubai. Se voava para Manchester a partir de um aeroporto da UE, a reclamação rege-se pelo Regulamento CE 261/2004 e os montantes são fixados em euros. O descongelamento e o fecho da pista por neve costumam ser considerados extraordinários, ao contrário da falta de tripulação ou de uma avaria detetada na porta de embarque.",
      fr: "Les départs de Manchester relèvent d'UK261 : à partir de trois heures de retard à destination, le transporteur effectif doit de 220 £ à 520 £, qu'il s'agisse d'un saut de deux heures vers Palma ou d'un vol de neuf heures vers Dubaï. Si vous voliez vers Manchester au départ d'un aéroport de l'UE, c'est le règlement CE 261/2004 qui s'applique, avec des montants en euros. Le dégivrage et une piste fermée par la neige sont généralement extraordinaires ; un manque d'équipage ou une panne constatée en porte ne le sont pas.",
    },
    tips: {
      en: "Terminal transfers at Manchester are not quick, so if you are re-routed from T3 to T2, ask the airline to note the change on your new booking. Airlines here often blame air traffic control restrictions for delays that were really aircraft rotation problems: request the specific reason and the aircraft registration, which lets you check the inbound flight yourself. Hold on to parking and hotel receipts if an overnight cancellation left you stranded, because accommodation is the airline's cost, not yours.",
      pt: "As mudanças de terminal em Manchester não são rápidas, por isso, se for reencaminhado do T3 para o T2, peça à companhia para registar a alteração na nova reserva. É frequente as companhias atribuírem a restrições do controlo de tráfego aéreo atrasos que resultaram da rotação do avião: peça o motivo concreto e a matrícula da aeronave, o que lhe permite verificar o voo de chegada. Guarde os recibos do estacionamento e do hotel se um cancelamento noturno o deixou retido, porque o alojamento é um custo da companhia e não seu.",
      fr: "Les changements de terminal ne sont pas rapides à Manchester : si vous êtes réacheminé du T3 vers le T2, demandez que la modification figure sur votre nouvelle réservation. Les compagnies invoquent souvent des restrictions du contrôle aérien alors que le problème venait de la rotation de l'avion : demandez le motif précis et l'immatriculation de l'appareil, ce qui vous permet de vérifier le vol d'arrivée. Conservez les justificatifs de parking et d'hôtel si une annulation nocturne vous a immobilisé : l'hébergement est à la charge de la compagnie.",
    },
  },

  lisbon: {
    facts: [
      {
        en: "IATA code: LIS",
        pt: "Código IATA: LIS",
        fr: "Code IATA : LIS",
      },
      {
        en: "Lisbon, Portugal",
        pt: "Lisboa, Portugal",
        fr: "Lisbonne, Portugal",
      },
      {
        en: "TAP Air Portugal's hub and gateway to Brazil and Africa",
        pt: "Hub da TAP Air Portugal e porta de entrada para o Brasil e para África",
        fr: "Hub de TAP Air Portugal et porte d'entrée vers le Brésil et l'Afrique",
      },
    ],
    about: {
      en: "Lisbon Humberto Delgado is Portugal's busiest airport and TAP Air Portugal's hub, feeding Brazil, Africa and North America from a site hemmed in by the city. One runway handles more than 30 million passengers a year, and Terminal 2 is used for low-cost departures with no direct walkway back to Terminal 1. Peak-hour congestion is why Lisbon regularly appears near the top of Europe's punctuality tables, from the wrong end.",
      pt: "O aeroporto Humberto Delgado é o mais movimentado de Portugal e o hub da TAP Air Portugal, alimentando ligações ao Brasil, a África e à América do Norte a partir de um recinto encaixado na cidade. Uma única pista serve mais de 30 milhões de passageiros por ano e o Terminal 2 é usado para partidas low-cost, sem ligação pedonal direta ao Terminal 1. O congestionamento nas horas de ponta coloca Lisboa com frequência no topo das tabelas europeias de pontualidade, mas pelo lado errado.",
      fr: "Humberto Delgado est l'aéroport le plus fréquenté du Portugal et le hub de TAP Air Portugal, qui y alimente ses lignes vers le Brésil, l'Afrique et l'Amérique du Nord depuis un site enserré par la ville. Une seule piste absorbe plus de 30 millions de passagers par an, et le terminal 2 accueille les départs low-cost, sans liaison piétonne directe avec le terminal 1. La congestion aux heures de pointe place régulièrement Lisbonne en tête des classements européens de ponctualité, mais du mauvais côté.",
    },
    rights: {
      en: "Lisbon is an EU airport, so EC 261/2004 covers every departure regardless of the airline's nationality: €250, €400 or €600 per passenger by distance once you arrive three hours late, and a choice between a refund and re-routing when a flight is cancelled. Arrivals into Lisbon from outside the EU are only covered when the operating carrier is an EU airline, which includes TAP. Portugal's enforcement body is ANAC, and the airline must have the chance to answer a written complaint before you escalate.",
      pt: "Lisboa é um aeroporto da UE, pelo que o Regulamento CE 261/2004 cobre todas as partidas, independentemente da nacionalidade da companhia: 250 €, 400 € ou 600 € por passageiro em função da distância quando a chegada tem três horas de atraso, e a escolha entre reembolso e reencaminhamento em caso de cancelamento. As chegadas a Lisboa provenientes de fora da UE só estão cobertas se a transportadora operadora for europeia, o que inclui a TAP. A autoridade competente em Portugal é a ANAC e a companhia tem de ter oportunidade de responder à reclamação escrita antes de a poder escalar.",
      fr: "Lisbonne étant un aéroport de l'UE, le règlement CE 261/2004 couvre tous les départs, quelle que soit la nationalité de la compagnie : 250 €, 400 € ou 600 € par passager selon la distance dès trois heures de retard à l'arrivée, avec le choix entre remboursement et réacheminement en cas d'annulation. Les arrivées à Lisbonne en provenance de pays tiers ne sont couvertes que si le transporteur effectif est une compagnie européenne, ce qui inclut TAP. L'autorité portugaise compétente est l'ANAC, et la compagnie doit pouvoir répondre à votre réclamation écrite avant toute escalade.",
    },
    tips: {
      en: "Missed connections are common in Lisbon: if you lost a connection here, compensation is calculated on the delay reaching your final destination, not on the leg that went wrong. Ask ground staff for the printed delay statement, because it names the flight, the length of the delay and often the cause. If you are sent to Terminal 2 for a rebooked low-cost flight, allow extra time for the shuttle bus between terminals.",
      pt: "As perdas de ligação são frequentes em Lisboa: se falhou aqui uma conexão, a indemnização calcula-se pelo atraso até ao destino final e não pelo trecho que correu mal. Peça ao pessoal de terra a declaração de atraso impressa, porque identifica o voo, o tempo de atraso e, muitas vezes, a causa. Se for reencaminhado para um voo low-cost no Terminal 2, conte com tempo extra para o autocarro de ligação entre terminais.",
      fr: "Les correspondances manquées sont fréquentes à Lisbonne : l'indemnisation se calcule sur le retard à votre destination finale, pas sur le tronçon défaillant. Demandez au personnel au sol l'attestation de retard imprimée : elle mentionne le vol, la durée du retard et souvent la cause. Si vous êtes replacé sur un vol low-cost au terminal 2, prévoyez du temps pour la navette entre les deux terminaux.",
    },
  },

  stansted: {
    facts: [
      {
        en: "IATA code: STN",
        pt: "Código IATA: STN",
        fr: "Code IATA : STN",
      },
      {
        en: "London, United Kingdom",
        pt: "Londres, Reino Unido",
        fr: "Londres, Royaume-Uni",
      },
      {
        en: "The UK's leading low-cost airport and Ryanair's largest base",
        pt: "O principal aeroporto low-cost do Reino Unido e a maior base da Ryanair",
        fr: "Premier aéroport low-cost du Royaume-Uni et plus grande base de Ryanair",
      },
    ],
    about: {
      en: "Stansted lies 60 km north-east of London and runs a single runway and a single terminal at low-cost tempo, with Ryanair far ahead of easyJet, Jet2 and Wizz Air. Aircraft based here fly four or five sectors a day, so a 40-minute problem at breakfast can become a three-hour delay by the evening. The airport is also a major freight and business-jet base, which adds to runway pressure at peak times.",
      pt: "Stansted fica a 60 km a nordeste de Londres e opera uma única pista e um único terminal ao ritmo do low-cost, com a Ryanair muito à frente da easyJet, da Jet2 e da Wizz Air. Os aviões aqui baseados fazem quatro ou cinco etapas por dia, pelo que um problema de 40 minutos ao início da manhã pode transformar-se num atraso de três horas ao fim do dia. O aeroporto é também uma base importante de carga e de aviação executiva, o que aumenta a pressão sobre a pista nas horas de ponta.",
      fr: "Stansted, à 60 km au nord-est de Londres, exploite une piste et un terminal uniques au rythme du low-cost, avec Ryanair loin devant easyJet, Jet2 et Wizz Air. Les avions basés y enchaînent quatre ou cinq étapes par jour : un incident de 40 minutes au petit matin peut devenir un retard de trois heures le soir. L'aéroport est aussi une base importante de fret et d'aviation d'affaires, ce qui accroît la pression sur la piste aux heures de pointe.",
    },
    rights: {
      en: "A £19 Ryanair ticket carries exactly the same UK261 rights as a full-fare business seat: compensation is fixed by distance, not by what you paid, so it is often several times the fare. Departures from Stansted are covered whoever operates them, and the airline may only halve the amount if it re-routes you and you still arrive within two to four hours of the original time, depending on distance. Cancellations also give you a straight choice between a full refund and a seat on the next available flight, even if that means the airline buying you a ticket on a rival.",
      pt: "Um bilhete de 19 £ na Ryanair dá exatamente os mesmos direitos ao abrigo do UK261 que um lugar em executiva a tarifa cheia: a indemnização é fixada pela distância e não pelo preço pago, sendo por isso muitas vezes várias vezes superior à tarifa. As partidas de Stansted estão cobertas seja qual for a companhia operadora, e esta só pode reduzir o valor a metade se o reencaminhar e mesmo assim chegar entre duas e quatro horas depois da hora prevista, conforme a distância. Nos cancelamentos, tem direito a escolher entre o reembolso integral e um lugar no primeiro voo disponível, mesmo que isso obrigue a companhia a comprar-lhe bilhete noutra transportadora.",
      fr: "Un billet Ryanair à 19 £ ouvre exactement les mêmes droits UK261 qu'un siège affaires plein tarif : l'indemnisation dépend de la distance, pas du prix payé, et dépasse donc souvent plusieurs fois le montant du billet. Les départs de Stansted sont couverts quel que soit le transporteur, qui ne peut réduire la somme de moitié que s'il vous réachemine et que vous arrivez malgré tout dans un délai de deux à quatre heures selon la distance. En cas d'annulation, vous choisissez librement entre le remboursement intégral et une place sur le prochain vol disponible, quitte à ce que la compagnie vous achète un billet chez un concurrent.",
    },
    tips: {
      en: "Low-cost carriers at Stansted push you towards their own online claim form; use it, but keep a dated copy of what you submitted and of the reference number they issue. Nothing obliges you to accept a travel voucher — cash is the default and a voucher only counts if you agreed to it in writing. In England and Wales you have six years to bring a claim, so a Stansted delay from three summers ago is very likely still live.",
      pt: "As companhias low-cost em Stansted encaminham-no para o formulário próprio de reclamação; use-o, mas guarde uma cópia datada do que submeteu e do número de referência atribuído. Nada o obriga a aceitar um voucher de viagem: o pagamento em dinheiro é a regra e o voucher só vale se o tiver aceitado por escrito. Em Inglaterra e no País de Gales tem seis anos para apresentar a reclamação, pelo que um atraso em Stansted de há três verões continua, muito provavelmente, válido.",
      fr: "À Stansted, les compagnies low-cost vous renvoient vers leur propre formulaire : utilisez-le, mais gardez une copie datée de votre envoi et le numéro de dossier communiqué. Rien ne vous oblige à accepter un bon de voyage : le paiement en espèces est la règle et un bon n'est valable que si vous l'avez accepté par écrit. En Angleterre et au pays de Galles, le délai pour agir est de six ans : un retard subi à Stansted il y a trois étés reste très probablement réclamable.",
    },
  },

  luton: {
    facts: [
      {
        en: "IATA code: LTN",
        pt: "Código IATA: LTN",
        fr: "Code IATA : LTN",
      },
      {
        en: "London, United Kingdom",
        pt: "Londres, Reino Unido",
        fr: "Londres, Royaume-Uni",
      },
      {
        en: "Low-cost base for Wizz Air UK, easyJet and Ryanair",
        pt: "Base low-cost da Wizz Air UK, da easyJet e da Ryanair",
        fr: "Base low-cost de Wizz Air UK, easyJet et Ryanair",
      },
    ],
    about: {
      en: "Luton is 55 km north of London and reaches the rail network through the short DART shuttle from Luton Airport Parkway. It is compact, busy and heavily low-cost: Wizz Air UK, easyJet, Ryanair and TUI account for almost all of its traffic to central and eastern Europe and the Mediterranean. One terminal and a tight apron mean that when weather or air traffic restrictions hit, aircraft queue rather than absorb the delay.",
      pt: "Luton fica a 55 km a norte de Londres e liga-se à rede ferroviária pelo curto shuttle DART a partir de Luton Airport Parkway. É compacto, movimentado e fortemente low-cost: a Wizz Air UK, a easyJet, a Ryanair e a TUI concentram quase todo o tráfego para a Europa central e de leste e para o Mediterrâneo. Com um só terminal e uma placa de estacionamento apertada, quando surgem restrições meteorológicas ou de tráfego aéreo os aviões acumulam-se em fila em vez de absorverem o atraso.",
      fr: "Luton, à 55 km au nord de Londres, rejoint le réseau ferroviaire par la courte navette DART depuis Luton Airport Parkway. Compact, très fréquenté et largement low-cost, l'aéroport concentre son trafic vers l'Europe centrale et orientale et la Méditerranée sur Wizz Air UK, easyJet, Ryanair et TUI. Avec un seul terminal et une aire de stationnement réduite, dès qu'une restriction météo ou de contrôle aérien survient, les avions s'accumulent au lieu d'absorber le retard.",
    },
    rights: {
      en: "UK261 applies to all departures from Luton, and its most useful clause here is not the money but the duty of care: past a two-hour delay the airline must provide food and drink, and for a long wait a hotel and transfers, for as long as you are stuck. Compensation itself runs from £220 on short hops to £350 for the Canaries and Turkey, payable once you land three hours late. If the airline refuses to arrange a hotel and you book your own, keep the invoice — reasonable costs are recoverable separately from the compensation.",
      pt: "O UK261 aplica-se a todas as partidas de Luton e a cláusula mais útil aqui não é o dinheiro, mas o dever de assistência: a partir de duas horas de atraso a companhia tem de fornecer comida e bebida e, numa espera longa, hotel e transporte, enquanto durar a situação. A indemnização vai de 220 £ nas rotas curtas a 350 £ para as Canárias e a Turquia, devida quando aterra com três horas de atraso. Se a companhia se recusar a providenciar hotel e o reservar por sua conta, guarde a fatura: os custos razoáveis são reembolsáveis à parte da indemnização.",
      fr: "UK261 s'applique à tous les départs de Luton et la clause la plus utile ici n'est pas l'argent mais l'obligation d'assistance : au-delà de deux heures de retard, la compagnie doit fournir boissons et repas, et lors d'une longue attente un hôtel et les transferts, aussi longtemps que vous êtes bloqué. L'indemnisation va de 220 £ sur les liaisons courtes à 350 £ vers les Canaries et la Turquie, dès trois heures de retard à l'atterrissage. Si la compagnie refuse de réserver un hôtel et que vous avancez les frais, conservez la facture : les dépenses raisonnables sont remboursables en plus de l'indemnisation.",
    },
    tips: {
      en: "Luton's late-night schedule is where claims are won: a cancelled 23:00 departure often becomes a next-day flight, which triggers both compensation and overnight accommodation. Screenshot the airline's app showing the new departure time, because low-cost carriers reissue bookings quickly and the original times vanish from your account. Add the DART and rail fares you had to buy a second time to your out-of-pocket list.",
      pt: "É no horário noturno de Luton que muitas reclamações se ganham: um voo cancelado às 23h00 transforma-se frequentemente num voo do dia seguinte, o que dá direito a indemnização e a alojamento. Faça uma captura de ecrã da aplicação da companhia com a nova hora de partida, pois as low-cost reemitem as reservas depressa e as horas originais desaparecem da sua conta. Junte à lista de despesas os bilhetes do DART e do comboio que teve de comprar uma segunda vez.",
      fr: "C'est sur les vols de fin de soirée que les dossiers Luton se gagnent : un départ de 23 h annulé devient souvent un vol du lendemain, ce qui ouvre droit à la fois à l'indemnisation et à l'hébergement. Faites une capture d'écran de l'application de la compagnie avec le nouvel horaire, car les low-cost réémettent vite les réservations et les heures d'origine disparaissent de votre compte. Ajoutez à vos frais les billets DART et de train rachetés.",
    },
  },

  birmingham: {
    facts: [
      {
        en: "IATA code: BHX",
        pt: "Código IATA: BHX",
        fr: "Code IATA : BHX",
      },
      {
        en: "Birmingham, United Kingdom",
        pt: "Birmingham, Reino Unido",
        fr: "Birmingham, Royaume-Uni",
      },
      {
        en: "The Midlands' main airport, mixing low-cost, charter and Gulf long-haul",
        pt: "O principal aeroporto das Midlands, entre low-cost, charter e longo curso do Golfo",
        fr: "Le principal aéroport des Midlands, entre low-cost, charter et long-courrier du Golfe",
      },
    ],
    about: {
      en: "Birmingham serves the Midlands from a single runway extended in the 2010s to take long-haul aircraft, so Emirates, Qatar Airways and Air India now sit alongside Ryanair, Jet2, TUI and Wizz Air. It is also one of the UK's biggest airports for Hajj and Umrah charters and summer package flights. The terminal is compact, but security queues and a limited number of stands make morning turnarounds tight.",
      pt: "Birmingham serve as Midlands a partir de uma pista única prolongada na década de 2010 para receber aviões de longo curso, pelo que a Emirates, a Qatar Airways e a Air India convivem hoje com a Ryanair, a Jet2, a TUI e a Wizz Air. É também um dos maiores aeroportos do Reino Unido em voos charter para o Hajj e a Umrah e em voos de pacotes de verão. O terminal é compacto, mas as filas na segurança e o número limitado de posições de estacionamento tornam apertadas as escalas da manhã.",
      fr: "Birmingham dessert les Midlands depuis une piste unique allongée dans les années 2010 pour accueillir le long-courrier : Emirates, Qatar Airways et Air India y côtoient désormais Ryanair, Jet2, TUI et Wizz Air. C'est aussi l'un des principaux aéroports britanniques pour les charters du Hadj et de la Omra et les vols de forfaits estivaux. Le terminal est compact, mais les files de sûreté et le nombre limité de postes de stationnement rendent les rotations matinales serrées.",
    },
    rights: {
      en: "For flights leaving Birmingham the operating airline owes UK261 compensation of £220, £350 or £520 once the arrival delay reaches three hours, and it owes it even if you were travelling on a package holiday booked through a tour operator. Charter and holiday flights are covered exactly like scheduled ones: the tour operator answers for the holiday, the airline answers for the flight. Where the airline claims an extraordinary circumstance it has to prove it, and a vague reference to operational reasons is not proof.",
      pt: "Nos voos que partem de Birmingham, a companhia operadora deve a indemnização do UK261 de 220 £, 350 £ ou 520 £ quando o atraso na chegada atinge três horas, e deve-a mesmo que viajasse num pacote turístico comprado a um operador. Os voos charter e de férias estão cobertos exatamente como os regulares: o operador responde pela viagem, a companhia responde pelo voo. Se a companhia invocar uma circunstância extraordinária, tem de a provar, e uma referência vaga a motivos operacionais não é prova.",
      fr: "Au départ de Birmingham, le transporteur effectif doit l'indemnisation UK261 de 220 £, 350 £ ou 520 £ dès trois heures de retard à l'arrivée, y compris si vous voyagiez dans le cadre d'un forfait acheté auprès d'un tour-opérateur. Les vols charter et vacances sont couverts comme les vols réguliers : le tour-opérateur répond du séjour, la compagnie du vol. Si la compagnie invoque une circonstance extraordinaire, c'est à elle de le prouver, et une allusion vague à des raisons opérationnelles n'est pas une preuve.",
    },
    tips: {
      en: "If staff mention a late inbound aircraft, ask for the flight number and date of its previous rotation: that single detail often decides a Birmingham claim. Keep the tour operator's paperwork separate from the airline's, because compensation is claimed from the carrier and not from the holiday company. If the airline goes quiet for eight weeks, you can take the case to its alternative dispute resolution scheme, which is free for passengers.",
      pt: "Se o pessoal mencionar um avião que chegou atrasado, peça o número e a data do voo anterior dessa aeronave: esse único detalhe decide muitas reclamações em Birmingham. Mantenha a documentação do operador turístico separada da da companhia, porque a indemnização é pedida à transportadora e não à agência de viagens. Se a companhia não responder durante oito semanas, pode levar o caso ao mecanismo de resolução alternativa de litígios, gratuito para os passageiros.",
      fr: "Si le personnel évoque un avion arrivé en retard, demandez le numéro et la date du vol précédent de l'appareil : ce seul détail tranche beaucoup de dossiers à Birmingham. Conservez séparément les documents du tour-opérateur et ceux de la compagnie, car l'indemnisation se réclame au transporteur et non à l'agence. Si la compagnie reste muette pendant huit semaines, vous pouvez saisir son organisme de règlement extrajudiciaire des litiges, gratuit pour les passagers.",
    },
  },

  edinburgh: {
    facts: [
      {
        en: "IATA code: EDI",
        pt: "Código IATA: EDI",
        fr: "Code IATA : EDI",
      },
      {
        en: "Edinburgh, Scotland, United Kingdom",
        pt: "Edimburgo, Escócia, Reino Unido",
        fr: "Édimbourg, Écosse, Royaume-Uni",
      },
      {
        en: "Scotland's busiest airport and a year-round easyJet and Ryanair base",
        pt: "O aeroporto mais movimentado da Escócia e base anual da easyJet e da Ryanair",
        fr: "L'aéroport le plus fréquenté d'Écosse et base annuelle d'easyJet et Ryanair",
      },
    ],
    about: {
      en: "Edinburgh handles more passengers than any other Scottish airport, with easyJet, Ryanair, Jet2 and Loganair short-haul plus transatlantic services to the United States and Canada. A tram links the terminal to the city centre in about half an hour, which matters when a late arrival costs you the last connection onwards. August, with the Festival in full swing, is the airport's stress test: full aircraft, full hotels and very little room to recover.",
      pt: "Edimburgo é o aeroporto escocês com mais passageiros, com voos de curto curso da easyJet, Ryanair, Jet2 e Loganair e ligações transatlânticas aos Estados Unidos e ao Canadá. Um elétrico liga o terminal ao centro da cidade em cerca de meia hora, o que conta quando uma chegada tardia lhe faz perder a última ligação. Agosto, em pleno Festival, é o teste de esforço do aeroporto: aviões cheios, hotéis cheios e muito pouca margem de recuperação.",
      fr: "Édimbourg accueille plus de passagers que tout autre aéroport écossais, avec le court-courrier d'easyJet, Ryanair, Jet2 et Loganair et des liaisons transatlantiques vers les États-Unis et le Canada. Un tramway relie le terminal au centre-ville en une demi-heure environ, ce qui compte lorsqu'une arrivée tardive vous fait perdre votre dernière correspondance. Le mois d'août, en pleine période du Festival, est l'épreuve de vérité : avions complets, hôtels complets et très peu de marge de récupération.",
    },
    rights: {
      en: "Departures from Edinburgh are covered by UK261, so a three-hour arrival delay is worth £220 on European routes and £520 on a transatlantic sector. One local difference matters: because the contract is governed by Scots law, the time limit for court action is five years rather than the six that applies in England and Wales. Flights into Edinburgh from an EU airport are handled under EC 261/2004 instead, with the same thresholds expressed in euros.",
      pt: "As partidas de Edimburgo estão cobertas pelo UK261, pelo que um atraso de três horas na chegada vale 220 £ nas rotas europeias e 520 £ num voo transatlântico. Há uma diferença local importante: como o contrato se rege pelo direito escocês, o prazo para recorrer aos tribunais é de cinco anos e não de seis, como em Inglaterra e no País de Gales. Os voos que chegam a Edimburgo a partir de um aeroporto da UE seguem o Regulamento CE 261/2004, com os mesmos limiares expressos em euros.",
      fr: "Les départs d'Édimbourg relèvent d'UK261 : trois heures de retard à l'arrivée valent 220 £ sur les liaisons européennes et 520 £ sur un vol transatlantique. Une particularité locale compte : le contrat étant régi par le droit écossais, le délai pour saisir la justice est de cinq ans, et non de six comme en Angleterre et au pays de Galles. Les vols arrivant à Édimbourg au départ d'un aéroport de l'UE relèvent en revanche du règlement CE 261/2004, avec les mêmes seuils exprimés en euros.",
    },
    tips: {
      en: "Scottish weather is a genuine defence, but only for the flights it actually affected: if other aircraft kept departing in the same window, say so in your claim. During Festival weeks airlines often re-route passengers via Glasgow or Newcastle with a coach transfer, which still counts as re-routing and leaves the compensation payable. Keep the tram or taxi receipt for the leg you ended up paying for twice.",
      pt: "O tempo na Escócia é uma defesa legítima, mas apenas para os voos que realmente afetou: se outros aviões continuaram a partir na mesma janela horária, refira-o na reclamação. Nas semanas do Festival, as companhias reencaminham muitas vezes os passageiros por Glasgow ou Newcastle com transporte de autocarro, o que continua a ser reencaminhamento e mantém a indemnização devida. Guarde o recibo do elétrico ou do táxi que acabou por pagar duas vezes.",
      fr: "La météo écossaise est une défense légitime, mais seulement pour les vols réellement touchés : si d'autres appareils ont décollé dans le même créneau, mentionnez-le dans votre dossier. Pendant le Festival, les compagnies réacheminent souvent les passagers via Glasgow ou Newcastle avec un transfert en autocar : cela reste un réacheminement et l'indemnisation demeure due. Conservez le reçu du tramway ou du taxi que vous avez payé deux fois.",
    },
  },

  glasgow: {
    facts: [
      {
        en: "IATA code: GLA",
        pt: "Código IATA: GLA",
        fr: "Code IATA : GLA",
      },
      {
        en: "Glasgow, Scotland, United Kingdom",
        pt: "Glasgow, Escócia, Reino Unido",
        fr: "Glasgow, Écosse, Royaume-Uni",
      },
      {
        en: "Western Scotland's gateway, with leisure charters and Highlands and Islands routes",
        pt: "A porta de entrada do oeste da Escócia, com charters de lazer e rotas para as Terras Altas e as ilhas",
        fr: "La porte d'entrée de l'ouest de l'Écosse, entre charters loisir et lignes vers les Highlands et les îles",
      },
    ],
    about: {
      en: "Glasgow Airport sits 15 km west of the city and mixes easyJet, Ryanair, Jet2 and TUI leisure flying with Loganair's network to the Highlands and Islands and seasonal transatlantic services. It is the main long-haul and charter airport for the west of Scotland and a busy base for offshore and energy-sector charters. Atlantic weather systems arrive here first, which is why winter cancellations cluster on the west coast.",
      pt: "O aeroporto de Glasgow fica 15 km a oeste da cidade e combina os voos de lazer da easyJet, Ryanair, Jet2 e TUI com a rede da Loganair para as Terras Altas e as ilhas e ligações transatlânticas sazonais. É o principal aeroporto de longo curso e de charters do oeste da Escócia e uma base ativa de voos para plataformas e para o setor da energia. Os sistemas meteorológicos do Atlântico chegam aqui primeiro, razão pela qual os cancelamentos de inverno se concentram na costa oeste.",
      fr: "L'aéroport de Glasgow, à 15 km à l'ouest de la ville, associe les vols loisir d'easyJet, Ryanair, Jet2 et TUI au réseau de Loganair vers les Highlands et les îles, ainsi que des liaisons transatlantiques saisonnières. C'est le principal aéroport long-courrier et charter de l'ouest de l'Écosse et une base active pour les vols offshore et du secteur énergétique. Les systèmes météorologiques atlantiques y arrivent en premier, d'où la concentration des annulations hivernales sur la côte ouest.",
    },
    rights: {
      en: "UK261 covers everything that leaves Glasgow, including the short Loganair hops to Barra, Islay and Campbeltown, since aircraft size makes no difference to your rights. Compensation starts at £220 for journeys up to 1,500 km, which captures almost all domestic and European flying from Glasgow. Storms and closed island airfields are extraordinary circumstances, but the airline still owes you care, a refund or a re-route even when no compensation is due.",
      pt: "O UK261 cobre tudo o que parte de Glasgow, incluindo os voos curtos da Loganair para Barra, Islay e Campbeltown, já que o tamanho do avião não altera os seus direitos. A indemnização começa em 220 £ nas viagens até 1500 km, o que abrange quase todos os voos domésticos e europeus a partir de Glasgow. As tempestades e o fecho dos aeródromos das ilhas são circunstâncias extraordinárias, mas a companhia continua a dever-lhe assistência, reembolso ou reencaminhamento, mesmo quando não há indemnização.",
      fr: "UK261 couvre tous les départs de Glasgow, y compris les courtes liaisons Loganair vers Barra, Islay ou Campbeltown, la taille de l'appareil ne changeant rien à vos droits. L'indemnisation commence à 220 £ pour les trajets jusqu'à 1 500 km, ce qui englobe presque tous les vols intérieurs et européens au départ de Glasgow. Tempêtes et aérodromes insulaires fermés sont des circonstances extraordinaires, mais la compagnie vous doit toujours l'assistance, le remboursement ou le réacheminement, même sans indemnisation.",
    },
    tips: {
      en: "When a Glasgow flight is cancelled for weather, check what happened to the two or three flights either side of yours before you accept the explanation. Loganair and the leisure carriers here rebook by phone and text rather than at a desk, so save those messages: they are your proof of the new times. If the airline offers only a refund on a cancelled outbound, remember you can insist on re-routing instead, including on another carrier the same day.",
      pt: "Quando um voo de Glasgow é cancelado por causa do tempo, verifique o que aconteceu aos dois ou três voos antes e depois do seu antes de aceitar a explicação. A Loganair e as companhias de lazer aqui presentes reencaminham por telefone e SMS em vez de o fazerem no balcão, por isso guarde essas mensagens: são a prova das novas horas. Se a companhia oferecer apenas o reembolso num voo de ida cancelado, lembre-se de que pode exigir o reencaminhamento, inclusive noutra transportadora no mesmo dia.",
      fr: "Quand un vol de Glasgow est annulé pour cause de météo, regardez ce qu'ont fait les deux ou trois vols encadrant le vôtre avant d'accepter l'explication. Loganair et les compagnies loisir replacent les passagers par téléphone et SMS plutôt qu'au comptoir : conservez ces messages, ils prouvent les nouveaux horaires. Si la compagnie ne propose qu'un remboursement sur un aller annulé, vous pouvez exiger un réacheminement, y compris sur une autre compagnie le jour même.",
    },
  },

  bristol: {
    facts: [
      {
        en: "IATA code: BRS",
        pt: "Código IATA: BRS",
        fr: "Code IATA : BRS",
      },
      {
        en: "Bristol, United Kingdom",
        pt: "Bristol, Reino Unido",
        fr: "Bristol, Royaume-Uni",
      },
      {
        en: "The South West's busiest airport and a long-standing easyJet base",
        pt: "O aeroporto mais movimentado do sudoeste de Inglaterra e base histórica da easyJet",
        fr: "L'aéroport le plus fréquenté du sud-ouest de l'Angleterre et base historique d'easyJet",
      },
    ],
    about: {
      en: "Bristol Airport serves the South West and South Wales from a hilltop site 13 km from the city, with easyJet as its anchor airline alongside Ryanair, TUI and Jet2. Its network is almost entirely European leisure and city-break flying, peaking hard in July and August. There is no rail link, so a diverted or heavily delayed arrival can leave passengers dependent on late-night coaches.",
      pt: "O aeroporto de Bristol serve o sudoeste de Inglaterra e o sul do País de Gales a partir de um planalto a 13 km da cidade, tendo a easyJet como companhia de referência, ao lado da Ryanair, da TUI e da Jet2. A rede é quase toda de lazer e de escapadinhas europeias, com um pico acentuado em julho e agosto. Não existe ligação ferroviária, pelo que uma chegada desviada ou muito atrasada deixa os passageiros dependentes dos autocarros da madrugada.",
      fr: "L'aéroport de Bristol dessert le sud-ouest de l'Angleterre et le sud du pays de Galles depuis un plateau situé à 13 km de la ville, avec easyJet comme compagnie de référence aux côtés de Ryanair, TUI et Jet2. Son réseau est presque exclusivement loisir et city-breaks européens, avec un pic marqué en juillet et août. Faute de liaison ferroviaire, une arrivée détournée ou très retardée laisse les passagers dépendants des autocars de fin de nuit.",
    },
    rights: {
      en: "Bristol departures fall under UK261, with £220 or £350 payable for a three-hour arrival delay across the airport's short and medium-haul network. Two rights are worth remembering here: if you are downgraded, the airline must refund 30% to 75% of the ticket price for that flight, and once a delay passes five hours you can abandon the trip and claim a full refund instead of travelling. Compensation and refunds are separate remedies, so accepting a refund does not cancel your right to the £220 or £350.",
      pt: "As partidas de Bristol regem-se pelo UK261, com 220 £ ou 350 £ devidos por um atraso de três horas na chegada na rede de curto e médio curso do aeroporto. Vale a pena reter dois direitos: em caso de despromoção de classe, a companhia tem de reembolsar entre 30% e 75% do preço do bilhete desse voo; e, se o atraso passar as cinco horas, pode desistir da viagem e exigir o reembolso integral em vez de voar. Indemnização e reembolso são remédios distintos, pelo que aceitar o reembolso não elimina o direito aos 220 £ ou 350 £.",
      fr: "Les départs de Bristol relèvent d'UK261, avec 220 £ ou 350 £ dus pour trois heures de retard à l'arrivée sur le réseau court et moyen-courrier de l'aéroport. Deux droits méritent d'être retenus : en cas de déclassement, la compagnie doit rembourser de 30 % à 75 % du prix du billet pour ce vol ; et au-delà de cinq heures de retard, vous pouvez renoncer au voyage et exiger le remboursement intégral. Indemnisation et remboursement sont deux recours distincts : accepter l'un ne supprime pas le droit aux 220 £ ou 350 £.",
    },
    tips: {
      en: "Bristol's peak-summer evening departures are the ones that slip, and staff often hand out a printed disruption leaflet: take it, but also ask for the specific cause. Because there is no train, keep the receipts for the taxi or the long-stay parking overrun caused by a delayed arrival. If you booked through a comparison site, claim from the airline that actually operated the flight rather than from the agent.",
      pt: "São as partidas de fim de dia no pico do verão que mais escorregam em Bristol, e o pessoal costuma distribuir um folheto impresso sobre a perturbação: aceite-o, mas peça também a causa concreta. Como não há ligação ferroviária, guarde os recibos do táxi ou do excesso de estacionamento provocado por uma chegada atrasada. Se comprou num comparador, reclame junto da companhia que operou efetivamente o voo e não junto da agência.",
      fr: "À Bristol, ce sont les départs de fin de journée en pleine saison qui dérapent, et le personnel distribue souvent un dépliant d'information : prenez-le, mais demandez aussi la cause précise. Faute de liaison ferroviaire, conservez les reçus du taxi ou du dépassement de parking causé par une arrivée tardive. Si vous avez réservé via un comparateur, réclamez auprès de la compagnie qui a réellement opéré le vol, pas auprès de l'agence.",
    },
  },

  porto: {
    facts: [
      {
        en: "IATA code: OPO",
        pt: "Código IATA: OPO",
        fr: "Code IATA : OPO",
      },
      {
        en: "Porto, Portugal",
        pt: "Porto, Portugal",
        fr: "Porto, Portugal",
      },
      {
        en: "Northern Portugal's main airport and a Ryanair and easyJet base",
        pt: "O principal aeroporto do norte de Portugal e base da Ryanair e da easyJet",
        fr: "Le principal aéroport du nord du Portugal et une base Ryanair et easyJet",
      },
    ],
    about: {
      en: "Francisco Sá Carneiro Airport is 11 km from central Porto and connects to the city by metro Line E, which makes it unusually easy to reach. Ryanair and easyJet base aircraft here for routes across western Europe, while TAP feeds Lisbon and the Azores and seasonal flights link Brazil and Canada. Traffic is concentrated in early morning and late evening waves, so cancellations tend to strand passengers overnight.",
      pt: "O aeroporto Francisco Sá Carneiro fica a 11 km do centro do Porto e liga-se à cidade pela Linha E do metro, o que o torna invulgarmente acessível. A Ryanair e a easyJet têm aviões aqui baseados para rotas por toda a Europa ocidental, enquanto a TAP alimenta Lisboa e os Açores e há ligações sazonais ao Brasil e ao Canadá. O tráfego concentra-se em vagas de madrugada e de fim de noite, pelo que os cancelamentos deixam frequentemente os passageiros retidos até ao dia seguinte.",
      fr: "L'aéroport Francisco Sá Carneiro se trouve à 11 km du centre de Porto et est relié à la ville par la ligne E du métro, ce qui le rend particulièrement accessible. Ryanair et easyJet y basent des avions pour des lignes dans toute l'Europe de l'Ouest, tandis que TAP alimente Lisbonne et les Açores et que des vols saisonniers rejoignent le Brésil et le Canada. Le trafic se concentre en vagues de petit matin et de fin de soirée : une annulation immobilise souvent les passagers jusqu'au lendemain.",
    },
    rights: {
      en: "As an EU airport, Porto puts every departure under EC 261/2004: €250 up to 1,500 km, €400 on most other intra-European routes and €600 beyond 3,500 km, once the arrival delay reaches three hours. Article 9 care applies from the second hour of waiting, covering meals, two phone calls or emails, and a hotel with transfers if you have to stay overnight. The airline must also hand you a written notice of your rights when a flight is cancelled or heavily delayed.",
      pt: "Sendo um aeroporto da UE, o Porto coloca todas as partidas sob o Regulamento CE 261/2004: 250 € até 1500 km, 400 € na maioria das restantes rotas europeias e 600 € acima de 3500 km, quando o atraso na chegada atinge três horas. A assistência do artigo 9.º aplica-se a partir da segunda hora de espera e abrange refeições, duas chamadas ou mensagens e hotel com transporte se tiver de pernoitar. A companhia é ainda obrigada a entregar-lhe um aviso escrito com os seus direitos quando o voo é cancelado ou sofre um atraso longo.",
      fr: "Aéroport de l'UE, Porto place tous ses départs sous le règlement CE 261/2004 : 250 € jusqu'à 1 500 km, 400 € sur la plupart des autres liaisons européennes et 600 € au-delà de 3 500 km, dès trois heures de retard à l'arrivée. L'assistance de l'article 9 démarre à la deuxième heure d'attente : repas, deux appels ou messages, et hôtel avec transferts en cas de nuitée imposée. La compagnie doit également vous remettre une notice écrite rappelant vos droits en cas d'annulation ou de retard important.",
    },
    tips: {
      en: "Porto's last departures of the day leave little room for recovery: if yours is cancelled after 22:00, ask for accommodation at the desk before the staff finish their shift, and if nobody is left, book a hotel yourself and keep the invoice. Metro tickets and airport parking are recoverable when the disruption forced you to pay for them twice. Claims against Portuguese carriers should go in writing first, with ANAC as the backstop if the airline does not answer.",
      pt: "As últimas partidas do dia no Porto deixam pouca margem: se a sua for cancelada depois das 22h00, peça alojamento no balcão antes de o turno do pessoal terminar e, se já não houver ninguém, reserve o hotel por sua conta e guarde a fatura. Os bilhetes de metro e o estacionamento são reembolsáveis quando a perturbação o obrigou a pagá-los duas vezes. As reclamações contra companhias portuguesas devem ser apresentadas primeiro por escrito, com a ANAC como recurso se a companhia não responder.",
      fr: "Les derniers départs de la journée à Porto laissent peu de marge : si le vôtre est annulé après 22 h, demandez un hébergement au comptoir avant la fin du service du personnel, et s'il n'y a plus personne, réservez vous-même un hôtel en conservant la facture. Tickets de métro et parking sont remboursables si la perturbation vous a obligé à les payer deux fois. Face à une compagnie portugaise, adressez d'abord une réclamation écrite, l'ANAC servant de recours en cas de silence.",
    },
  },

  faro: {
    facts: [
      {
        en: "IATA code: FAO",
        pt: "Código IATA: FAO",
        fr: "Code IATA : FAO",
      },
      {
        en: "Faro, Algarve, Portugal",
        pt: "Faro, Algarve, Portugal",
        fr: "Faro, Algarve, Portugal",
      },
      {
        en: "The Algarve's leisure gateway, with heavy summer and golf-season peaks",
        pt: "A porta de entrada de lazer do Algarve, com picos fortes no verão e na época do golfe",
        fr: "La porte d'entrée loisir de l'Algarve, avec de forts pics en été et en saison de golf",
      },
    ],
    about: {
      en: "Faro is the airport of the Algarve, handling around nine million passengers a year with a summer schedule several times heavier than its winter one. Ryanair, easyJet, Jet2, TUI and British Airways carry most of the traffic from the UK, Ireland, Germany and the Netherlands, alongside TAP's Lisbon shuttle. One runway and a single terminal mean that a mid-afternoon thunderstorm in August can back up departures for hours.",
      pt: "Faro é o aeroporto do Algarve, com cerca de nove milhões de passageiros por ano e um programa de verão várias vezes mais intenso do que o de inverno. A Ryanair, a easyJet, a Jet2, a TUI e a British Airways transportam a maior parte do tráfego do Reino Unido, da Irlanda, da Alemanha e dos Países Baixos, a par da ponte aérea da TAP para Lisboa. Com uma pista e um único terminal, uma trovoada de meio da tarde em agosto pode atrasar as partidas durante horas.",
      fr: "Faro est l'aéroport de l'Algarve, avec près de neuf millions de passagers par an et un programme estival plusieurs fois plus dense que l'hivernal. Ryanair, easyJet, Jet2, TUI et British Airways assurent l'essentiel du trafic depuis le Royaume-Uni, l'Irlande, l'Allemagne et les Pays-Bas, aux côtés de la navette TAP vers Lisbonne. Avec une piste et un seul terminal, un orage de milieu d'après-midi en août peut décaler les départs pendant des heures.",
    },
    rights: {
      en: "Faro is in the EU, so EC 261/2004 governs every departure: €250 or €400 by distance for an arrival delay of three hours or more, plus full refund or re-routing rights when a flight is cancelled less than 14 days before departure. Package-holiday flights are covered like any other, so a TUI or Jet2 charter from Faro carries the same entitlement as a scheduled ticket. If you were flying home to the UK from Faro, the claim is an EC 261 one: the flight left an EU airport, so the UK rules do not decide it.",
      pt: "Faro está na UE, pelo que o Regulamento CE 261/2004 rege todas as partidas: 250 € ou 400 €, em função da distância, para atrasos de três ou mais horas na chegada, além do direito a reembolso integral ou reencaminhamento nos cancelamentos comunicados a menos de 14 dias da partida. Os voos de pacotes turísticos estão cobertos como qualquer outro, pelo que um charter da TUI ou da Jet2 a partir de Faro dá exatamente os mesmos direitos que um bilhete regular. Se regressava ao Reino Unido a partir de Faro, a reclamação é ao abrigo do CE 261: o voo saiu de um aeroporto da UE, pelo que não são as regras britânicas a decidir.",
      fr: "Faro étant dans l'UE, le règlement CE 261/2004 régit tous les départs : 250 € ou 400 € selon la distance dès trois heures de retard à l'arrivée, et droit au remboursement intégral ou au réacheminement lorsqu'un vol est annulé moins de 14 jours avant le départ. Les vols de forfaits touristiques sont couverts comme les autres : un charter TUI ou Jet2 au départ de Faro ouvre les mêmes droits qu'un billet régulier. Si vous rentriez au Royaume-Uni depuis Faro, le dossier relève du CE 261 : le vol partant d'un aéroport de l'UE, ce ne sont pas les règles britanniques qui s'appliquent.",
    },
    tips: {
      en: "In high season Faro's handling agents are stretched, so the fastest way to document a delay is the airline's own app notification plus a photo of the departure screen. Air traffic control strikes in France or Spain often show up as Faro delays; those are usually extraordinary, but the airline still owes you food, drinks and a hotel. Check whether your holiday flight was operated by a different carrier from the one on your booking, because the operating airline is the one that pays.",
      pt: "Na época alta, os agentes de handling em Faro estão sobrecarregados, pelo que a forma mais rápida de documentar um atraso é a notificação da aplicação da companhia mais uma fotografia do painel de partidas. As greves do controlo de tráfego aéreo em França ou em Espanha aparecem muitas vezes como atrasos em Faro; são normalmente extraordinárias, mas a companhia continua a dever comida, bebidas e hotel. Verifique se o seu voo de férias foi operado por uma companhia diferente da que consta na reserva, porque quem paga é a transportadora operadora.",
      fr: "En haute saison, les agents d'assistance de Faro sont saturés : le plus rapide pour documenter un retard reste la notification de l'application de la compagnie, complétée par une photo de l'écran des départs. Les grèves du contrôle aérien en France ou en Espagne se traduisent souvent par des retards à Faro ; elles sont généralement extraordinaires, mais la compagnie doit toujours repas, boissons et hôtel. Vérifiez si votre vol vacances a été opéré par une compagnie différente de celle indiquée sur la réservation : c'est le transporteur effectif qui paie.",
    },
  },

  madrid: {
    facts: [
      {
        en: "IATA code: MAD",
        pt: "Código IATA: MAD",
        fr: "Code IATA : MAD",
      },
      {
        en: "Madrid, Spain",
        pt: "Madrid, Espanha",
        fr: "Madrid, Espagne",
      },
      {
        en: "Iberia's hub at Barajas and Europe's main gateway to Latin America",
        pt: "O hub da Iberia em Barajas e a principal porta europeia para a América Latina",
        fr: "Le hub d'Iberia à Barajas et la principale porte européenne vers l'Amérique latine",
      },
    ],
    about: {
      en: "Adolfo Suárez Madrid-Barajas has four runways and five terminals, with Iberia and its partners concentrated in T4 and the T4S satellite used for long-haul boarding. It is the busiest airport in Spain and the primary European gateway to Latin America, so a misconnection here often involves a flight of eight hours or more. Transfers between T1-T3 and T4 need a shuttle bus and a good half hour, which is why tight connections fail.",
      pt: "O Adolfo Suárez Madrid-Barajas tem quatro pistas e cinco terminais, com a Iberia e os seus parceiros concentrados no T4 e no satélite T4S, usado para o embarque de longo curso. É o aeroporto mais movimentado de Espanha e a principal porta europeia para a América Latina, pelo que uma ligação perdida aqui envolve muitas vezes um voo de oito ou mais horas. As transferências entre o T1-T3 e o T4 exigem autocarro e uma boa meia hora, razão pela qual as ligações apertadas falham.",
      fr: "Adolfo Suárez Madrid-Barajas compte quatre pistes et cinq terminaux, Iberia et ses partenaires étant regroupés au T4 et au satellite T4S utilisé pour l'embarquement long-courrier. C'est l'aéroport le plus fréquenté d'Espagne et la principale porte européenne vers l'Amérique latine : une correspondance manquée y concerne souvent un vol de huit heures ou plus. Le trajet entre les T1-T3 et le T4 impose une navette et une bonne demi-heure, d'où l'échec des correspondances trop courtes.",
    },
    rights: {
      en: "Every departure from Madrid is an EC 261/2004 case, and Barajas is where the €600 band matters most: any flight over 3,500 km outside the EU, such as Bogotá, Buenos Aires or Mexico City, pays €600 per passenger for a three-hour arrival delay. A missed connection counts when both flights were on one booking, and the delay is measured at your final destination rather than in Madrid. Spain's enforcement authority is AESA, which can step in once the airline has had the chance to answer your written claim.",
      pt: "Todas as partidas de Madrid são casos do Regulamento CE 261/2004, e é em Barajas que o escalão de 600 € mais conta: qualquer voo com mais de 3500 km fora da UE, como Bogotá, Buenos Aires ou Cidade do México, paga 600 € por passageiro num atraso de três horas na chegada. A perda de ligação conta quando ambos os voos estavam na mesma reserva, e o atraso mede-se no destino final e não em Madrid. A autoridade espanhola competente é a AESA, que pode intervir depois de a companhia ter tido oportunidade de responder à sua reclamação escrita.",
      fr: "Tout départ de Madrid relève du règlement CE 261/2004, et c'est à Barajas que la tranche de 600 € pèse le plus : tout vol de plus de 3 500 km hors UE, comme Bogota, Buenos Aires ou Mexico, donne droit à 600 € par passager pour trois heures de retard à l'arrivée. Une correspondance manquée compte si les deux vols figuraient sur une même réservation, le retard étant mesuré à destination finale et non à Madrid. L'autorité espagnole compétente est l'AESA, qui peut intervenir une fois que la compagnie a pu répondre à votre réclamation écrite.",
    },
    tips: {
      en: "If you missed a long-haul connection in T4, ask Iberia or the operating carrier for the re-routing options in writing and note the arrival time you were finally given. Keep the onward boarding pass even if you never used it, because it proves you were booked on a single itinerary. Spanish carriers usually answer a written claim within a month; if yours does not, the AESA complaint form is free and accepts submissions in English.",
      pt: "Se perdeu uma ligação de longo curso no T4, peça à Iberia ou à companhia operadora as opções de reencaminhamento por escrito e registe a hora de chegada que lhe acabou por ser dada. Guarde o cartão de embarque do voo seguinte mesmo que nunca o tenha usado, porque prova que estava numa única reserva. As companhias espanholas costumam responder por escrito no prazo de um mês; se a sua não responder, o formulário de reclamação da AESA é gratuito e aceita pedidos em inglês.",
      fr: "Si vous avez manqué une correspondance long-courrier au T4, demandez à Iberia ou au transporteur effectif les options de réacheminement par écrit et notez l'heure d'arrivée finalement retenue. Conservez la carte d'embarquement du vol suivant même inutilisée : elle prouve que vous voyagiez sur un seul itinéraire. Les compagnies espagnoles répondent généralement sous un mois à une réclamation écrite ; à défaut, le formulaire de l'AESA est gratuit et accepte les dossiers en anglais.",
    },
  },

  barcelona: {
    facts: [
      {
        en: "IATA code: BCN",
        pt: "Código IATA: BCN",
        fr: "Code IATA : BCN",
      },
      {
        en: "Barcelona, Spain",
        pt: "Barcelona, Espanha",
        fr: "Barcelone, Espagne",
      },
      {
        en: "El Prat: Vueling's base and Spain's second-largest airport",
        pt: "El Prat: base da Vueling e o segundo maior aeroporto de Espanha",
        fr: "El Prat : base de Vueling et deuxième aéroport d'Espagne",
      },
    ],
    about: {
      en: "Josep Tarradellas Barcelona-El Prat is 15 km south-west of the city and split between a large modern T1 and the older T2, which still handles Ryanair and several other low-cost carriers. Vueling bases most of its fleet here, and the airport mixes dense intra-European flying with long-haul to the Americas and the Gulf. The terminals are linked only by shuttle bus, and the two close-parallel runways lose capacity quickly in strong winds or low visibility.",
      pt: "O Josep Tarradellas Barcelona-El Prat fica 15 km a sudoeste da cidade e divide-se entre um T1 grande e moderno e o T2 mais antigo, que continua a receber a Ryanair e várias outras companhias low-cost. A Vueling tem aqui a maior parte da sua frota e o aeroporto combina voos europeus muito densos com longo curso para as Américas e o Golfo. Os terminais estão ligados apenas por autocarro e as duas pistas paralelas muito próximas perdem capacidade rapidamente com vento forte ou visibilidade reduzida.",
      fr: "Josep Tarradellas Barcelone-El Prat se situe à 15 km au sud-ouest de la ville et se partage entre un T1 vaste et moderne et le T2 plus ancien, qui accueille encore Ryanair et plusieurs autres compagnies low-cost. Vueling y base l'essentiel de sa flotte et l'aéroport associe un trafic intra-européen très dense à du long-courrier vers les Amériques et le Golfe. Les terminaux ne sont reliés que par navette, et les deux pistes parallèles rapprochées perdent vite de la capacité par vent fort ou faible visibilité.",
    },
    rights: {
      en: "Barcelona departures are covered by EC 261/2004 whoever operates the flight: €250, €400 or €600 by distance for arrival delays of three hours or more, with cancellations adding a refund or re-routing at the earliest opportunity. Compensation is per passenger, so a family of four on the same disrupted flight claims four times over, and children with their own seat count. Being re-routed the next morning does not remove the entitlement; it only reduces it if you arrive within the short re-routing windows the regulation sets out.",
      pt: "As partidas de Barcelona estão cobertas pelo Regulamento CE 261/2004, seja qual for a companhia operadora: 250 €, 400 € ou 600 € em função da distância para atrasos de três ou mais horas na chegada, acrescendo o reembolso ou o reencaminhamento na primeira oportunidade nos cancelamentos. A indemnização é por passageiro, pelo que uma família de quatro no mesmo voo perturbado reclama quatro vezes, contando as crianças com lugar próprio. Ser reencaminhado na manhã seguinte não elimina o direito; só o reduz se chegar dentro das janelas curtas previstas no regulamento.",
      fr: "Les départs de Barcelone relèvent du règlement CE 261/2004, quelle que soit la compagnie : 250 €, 400 € ou 600 € selon la distance pour trois heures de retard ou plus à l'arrivée, avec remboursement ou réacheminement au plus tôt en cas d'annulation. L'indemnisation est due par passager : une famille de quatre sur le même vol perturbé réclame quatre fois, enfants disposant d'un siège compris. Être réacheminé le lendemain matin ne supprime pas le droit ; cela ne le réduit que si vous arrivez dans les brefs délais prévus par le règlement.",
    },
    tips: {
      en: "T1 and T2 are far apart at El Prat, so if you are rebooked onto a different carrier, confirm the terminal and allow 20 minutes for the free shuttle. Save the text or email that announced the cancellation, because its timestamp decides whether the airline gave you the 14 days' notice that removes compensation. For claims against Vueling and other Spanish carriers, write in Spanish or English and keep the case reference for AESA.",
      pt: "No El Prat, o T1 e o T2 ficam distantes, por isso, se for reencaminhado para outra companhia, confirme o terminal e conte 20 minutos para o autocarro gratuito. Guarde a SMS ou o e-mail que anunciou o cancelamento, porque é a data e a hora dessa mensagem que determinam se a companhia deu o aviso de 14 dias que afasta a indemnização. Nas reclamações contra a Vueling e outras transportadoras espanholas, escreva em espanhol ou em inglês e guarde a referência do processo para a AESA.",
      fr: "À El Prat, T1 et T2 sont éloignés : en cas de report sur une autre compagnie, vérifiez le terminal et comptez 20 minutes de navette gratuite. Conservez le SMS ou le courriel annonçant l'annulation, car son horodatage détermine si la compagnie a respecté le préavis de 14 jours qui supprime l'indemnisation. Pour réclamer auprès de Vueling ou d'une autre compagnie espagnole, écrivez en espagnol ou en anglais et gardez la référence du dossier pour l'AESA.",
    },
  },

  malaga: {
    facts: [
      {
        en: "IATA code: AGP",
        pt: "Código IATA: AGP",
        fr: "Code IATA : AGP",
      },
      {
        en: "Málaga, Spain",
        pt: "Málaga, Espanha",
        fr: "Malaga, Espagne",
      },
      {
        en: "Costa del Sol leisure airport, dominated by UK, Irish and Nordic traffic",
        pt: "Aeroporto de lazer da Costa del Sol, dominado pelo tráfego britânico, irlandês e nórdico",
        fr: "Aéroport loisir de la Costa del Sol, dominé par le trafic britannique, irlandais et nordique",
      },
    ],
    about: {
      en: "Málaga-Costa del Sol is the busiest airport in Andalusia and the fourth busiest in Spain, with Ryanair, easyJet, Jet2, British Airways and the Nordic leisure carriers filling Terminal 3 through the summer. Trains run along the coast to Fuengirola and into central Málaga, so most passengers are not dependent on transfers. Traffic roughly doubles between February and August, and it is in those peak weeks that turnaround times slip.",
      pt: "O Málaga-Costa del Sol é o aeroporto mais movimentado da Andaluzia e o quarto de Espanha, com a Ryanair, a easyJet, a Jet2, a British Airways e as companhias de lazer nórdicas a encher o Terminal 3 durante o verão. Há comboios ao longo da costa até Fuengirola e para o centro de Málaga, pelo que a maioria dos passageiros não depende de transferes. O tráfego praticamente duplica entre fevereiro e agosto e é nessas semanas de pico que os tempos de escala derrapam.",
      fr: "Malaga-Costa del Sol est le premier aéroport d'Andalousie et le quatrième d'Espagne, Ryanair, easyJet, Jet2, British Airways et les compagnies loisir nordiques remplissant le terminal 3 tout l'été. Des trains longent la côte jusqu'à Fuengirola et rejoignent le centre de Malaga, de sorte que la plupart des passagers ne dépendent pas des transferts. Le trafic double presque entre février et août, et c'est durant ces semaines de pointe que les temps d'escale dérapent.",
    },
    rights: {
      en: "Every flight leaving Málaga is an EC 261/2004 case: €250 on routes up to 1,500 km, which covers most of Spain, Portugal, France and Italy, and €400 for the UK, Ireland and Scandinavia. Past three hours' delay you can claim compensation, and past five you can abandon the trip altogether and demand a full refund, including for the segments you no longer want. Airlines cannot make you choose between the compensation and the refund, because the regulation gives you both.",
      pt: "Todos os voos que partem de Málaga são casos do Regulamento CE 261/2004: 250 € nas rotas até 1500 km, o que abrange a maior parte de Espanha, Portugal, França e Itália, e 400 € para o Reino Unido, a Irlanda e a Escandinávia. Acima de três horas de atraso pode pedir indemnização e, acima de cinco, pode desistir da viagem e exigir o reembolso integral, incluindo dos trechos que já não pretende usar. As companhias não podem obrigá-lo a escolher entre a indemnização e o reembolso, porque o regulamento lhe dá direito a ambos.",
      fr: "Tout vol au départ de Malaga relève du règlement CE 261/2004 : 250 € sur les liaisons jusqu'à 1 500 km, ce qui couvre l'essentiel de l'Espagne, du Portugal, de la France et de l'Italie, et 400 € vers le Royaume-Uni, l'Irlande et la Scandinavie. Au-delà de trois heures de retard, l'indemnisation est due ; au-delà de cinq, vous pouvez renoncer au voyage et exiger le remboursement intégral, y compris des tronçons dont vous ne voulez plus. Une compagnie ne peut pas vous faire choisir entre indemnisation et remboursement : le règlement accorde les deux.",
    },
    tips: {
      en: "Summer evening departures from Málaga are the ones that run late, and the boarding gate rarely explains why, so ask the handling agent for the delay code or the reason in writing. If you are stuck overnight in August, hotels along the coast fill fast: take the room the airline offers, and if it offers none, book something reasonable and claim it back. Keep your booking reference and boarding pass even after the flight, because Spanish carriers ask for both before paying.",
      pt: "As partidas de fim de dia no verão são as que mais atrasam em Málaga, e na porta de embarque raramente explicam o motivo, por isso peça ao agente de handling o código do atraso ou a razão por escrito. Se ficar retido de um dia para o outro em agosto, os hotéis da costa esgotam depressa: aceite o quarto que a companhia oferecer e, se não houver oferta, reserve algo razoável e peça o reembolso. Guarde a referência da reserva e o cartão de embarque mesmo depois do voo, porque as companhias espanholas pedem ambos antes de pagar.",
      fr: "À Malaga, ce sont les départs de fin de journée en été qui prennent du retard, et la porte d'embarquement en explique rarement la cause : demandez à l'agent d'assistance le code retard ou le motif par écrit. Si vous êtes bloqué une nuit en août, les hôtels de la côte se remplissent vite : acceptez la chambre proposée par la compagnie et, à défaut, réservez raisonnablement et réclamez le remboursement. Conservez la référence de réservation et la carte d'embarquement après le vol, car les compagnies espagnoles exigent les deux avant de payer.",
    },
  },
};
