import type { BlogPost } from "./types";

export const blogPostsPt: BlogPost[] = [
  {
    slug: "flight-cancellation",
    category: "Conheça os seus direitos",
    date: "28 May 2026",
    readTime: "6 min de leitura",
    title: "Voo cancelado? Pode ter direito a até 600 €. Saiba como reclamar",
    excerpt:
      "Cancelamentos com pouco aviso prévio frequentemente dão direito a compensação fixa ao abrigo do EU261, para além do reembolso ou reencaminhamento. Veja se o seu voo se qualifica.",
    image: "/assets/blog/flight-cancellation.jpg",
    imageAlt: "Passageiro a verificar um voo cancelado no painel de partidas do aeroporto",
    body: [
      {
        type: "paragraph",
        text: "Tinha planos. A companhia aérea tinha outros. Se o seu voo foi cancelado com pouco aviso, não está desamparado. O regulamento europeu CE 261/2004 pode dar-lhe direito a compensação monetária de até 600 € por passageiro, independentemente de qualquer reembolso ou voo alternativo que a companhia ofereça.",
      },
      {
        type: "heading",
        text: "Quando é que um cancelamento dá direito a compensação?",
      },
      {
        type: "paragraph",
        text: "A regra geral: se a companhia aérea cancelar com menos de 14 dias de antecedência e não conseguir provar circunstâncias extraordinárias (mau tempo severo, encerramento do controlo de tráfego aéreo, emergências de segurança), a compensação é devida. O montante depende da distância, não do preço do bilhete:",
      },
      {
        type: "list",
        items: [
          "Até 1.500 km → 250 € por passageiro",
          "1.500–3.500 km → 400 € por passageiro",
          "Mais de 3.500 km → 600 € por passageiro",
        ],
      },
      {
        type: "callout",
        text: "Dica: Um bilhete Ryanair de 29 € confere os mesmos direitos de compensação que um bilhete de business class na mesma rota.",
      },
      {
        type: "heading",
        text: "O que a companhia aérea deve oferecer no dia",
      },
      {
        type: "paragraph",
        text: "A compensação é apenas parte da equação. Enquanto espera, a transportadora deve prestar assistência: refeições, bebidas, duas chamadas ou e-mails gratuitos, alojamento hoteleiro e transfers aeroportuários se uma pernoita for inevitável. Também pode escolher entre reembolso integral ou o reencaminhamento mais cedo possível para o seu destino.",
      },
      {
        type: "heading",
        text: "Porque é que as companhias aéreas rejeitam reclamações válidas",
      },
      {
        type: "paragraph",
        text: "As transportadoras invocam frequentemente \"circunstâncias extraordinárias\" sem provas, ou oferecem vouchers em vez do dinheiro que lhe é legalmente devido. As cartas de rejeição são muitas vezes respostas-padrão concebidas para desencorajar os passageiros de exercerem os seus direitos.",
      },
      {
        type: "list",
        items: [
          "Guarde todos os e-mails, SMS e notificações push sobre o cancelamento",
          "Conserve os cartões de embarque e confirmações de reserva",
          "Anote a hora exata em que foi informado. O prazo de 14 dias é relevante",
          "Não renuncie a direitos em troca de um voucher sem ler as condições",
        ],
      },
      {
        type: "heading",
        text: "Como verificar a sua reclamação em minutos",
      },
      {
        type: "paragraph",
        text: "Carregue o seu cartão de embarque na Compensall e o nosso assistente verifica o cancelamento ao abrigo do CE 261/2004. Se tiver uma reclamação válida, a nossa equipa humana trata da companhia aérea em seu nome, sem custos iniciais e só cobramos se ganhar.",
      },
    ],
  },
  {
    slug: "denied-boarding",
    category: "Conheça os seus direitos",
    date: "26 May 2026",
    readTime: "5 min de leitura",
    title: "Embarque recusado na porta: os seus direitos quando a companhia diz não",
    excerpt:
      "Recusaram-lhe um lugar apesar de ter bilhete válido? A recusa de embarque involuntária pode dar direito a até 600 € de compensação, mais assistência e reencaminhamento.",
    image: "/assets/blog/denied-boarding.jpg",
    imageAlt: "Viajante a falar com pessoal da companhia aérea na porta de embarque",
    body: [
      {
        type: "paragraph",
        text: "Fez o check-in a tempo. Tinha lugar confirmado. Depois o agente na porta disse-lhe que o voo estava cheio. Se lhe recusaram o embarque contra a sua vontade, na maioria das vezes por overbooking, a lei europeia trata isto com a mesma seriedade que um cancelamento.",
      },
      {
        type: "heading",
        text: "Voluntários vs. recusa de embarque involuntária",
      },
      {
        type: "paragraph",
        text: "As companhias aéreas devem primeiro pedir voluntários e oferecer benefícios (vouchers, milhas, hotel) em troca de ceder o lugar. Isso é um acordo voluntário. Se não se voluntariou e mesmo assim foi impedido de embarcar, pode ter direito a compensação monetária fixa ao abrigo do CE 261/2004, até 600 € consoante a distância do voo.",
      },
      {
        type: "callout",
        text: "Importante: Aceitar um voucher na porta não anula automaticamente o seu direito legal à compensação. Leia sempre o que está a assinar.",
      },
      {
        type: "heading",
        text: "A que tem direito imediatamente",
      },
      {
        type: "list",
        items: [
          "Compensação monetária de 250 €, 400 € ou 600 € consoante a distância",
          "Escolha entre reembolso integral ou reencaminhamento para o destino",
          "Refeições, refrescos e alojamento enquanto espera",
          "Comunicação — chamadas ou e-mails para reorganizar os seus planos",
        ],
      },
      {
        type: "heading",
        text: "Provas que fortalecem a sua reclamação",
      },
      {
        type: "paragraph",
        text: "Reclamações bem-sucedidas de recusa de embarque demonstram normalmente que tinha reserva confirmada, chegou ao check-in dentro do prazo e foi impedido de embarcar sem culpa sua. Peça confirmação escrita na porta, se possível.",
      },
      {
        type: "heading",
        text: "Próximos passos",
      },
      {
        type: "paragraph",
        text: "Não deixe que uma experiência stressante na porta lhe custe o dinheiro que lhe é devido. Carregue o seu cartão de embarque na Compensall. O nosso assistente e equipa avaliam se tem direito a compensação monetária, sem custos iniciais.",
      },
    ],
  },
  {
    slug: "flight-delay",
    category: "Conheça os seus direitos",
    date: "24 May 2026",
    readTime: "6 min de leitura",
    title: "A regra das 3 horas: quando um voo atrasado se torna uma reclamação",
    excerpt:
      "Nem todos os atrasos dão direito a compensação, mas se chegou com mais de 3 horas de atraso ao destino final, pode ter direito a até 600 € ao abrigo do EU261.",
    image: "/assets/blog/flight-delay.jpg",
    imageAlt: "Passageiros à espera num terminal de aeroporto durante um atraso de voo",
    body: [
      {
        type: "paragraph",
        text: "Três horas parecem longas na porta de embarque. Ao abrigo do EU261, três horas à chegada podem significar centenas de euros no seu bolso — se o atraso foi culpa da companhia aérea e o voo se qualificar.",
      },
      {
        type: "heading",
        text: "Conta a hora de chegada, não a de partida",
      },
      {
        type: "paragraph",
        text: "Os tribunais medem o atraso no destino final, não quando o avião descolou. Um voo que parte cinco horas atrasado mas recupera tempo durante o trajeto pode não se qualificar. Por outro lado, um pequeno atraso na partida que se transforma numa chegada muito tardia frequentemente qualifica.",
      },
      {
        type: "heading",
        text: "Montantes de compensação por distância",
      },
      {
        type: "list",
        items: [
          "Voos até 1.500 km → 250 €",
          "Voos intra-UE acima de 1.500 km e outras rotas entre 1.500–3.500 km → 400 €",
          "Voos acima de 3.500 km → 600 €",
        ],
      },
      {
        type: "heading",
        text: "Direitos de assistência enquanto espera",
      },
      {
        type: "paragraph",
        text: "Antes mesmo de se falar em compensação, atrasos de duas horas ou mais (consoante a distância) activam obrigações de assistência: comida, bebidas e estadia hoteleira quando necessário. Peça no balcão da companhia. Não assuma que a oferecerão automaticamente.",
      },
      {
        type: "heading",
        text: "Quando as companhias invocam \"circunstâncias extraordinárias\"",
      },
      {
        type: "paragraph",
        text: "Mau tempo extremo, instabilidade política e certos eventos de segurança podem isentar as transportadoras. Mas as companhias aéreas abusam frequentemente desta defesa. Uma avaria técnica num voo anterior, falta de pessoal ou uma falha operacional evitável geralmente não são extraordinárias.",
      },
      {
        type: "callout",
        text: "Ponto-chave: Faça captura de ecrã da hora real de chegada do voo na app da companhia ou no painel do aeroporto. É a prova que ganha ou perde reclamações.",
      },
      {
        type: "heading",
        text: "Verifique a sua reclamação de atraso rapidamente",
      },
      {
        type: "paragraph",
        text: "A Compensall compara as horas de chegada previstas e reais com o CE 261/2004. Carregue o seu cartão de embarque e o nosso assistente indica a elegibilidade em minutos. A nossa equipa contesta rejeições injustas, sem custos iniciais e só cobramos se ganhar.",
      },
    ],
  },
  {
    slug: "missed-connection",
    category: "Conheça os seus direitos",
    date: "22 May 2026",
    readTime: "7 min de leitura",
    title: "Perdeu o voo de ligação? Ainda pode reclamar 600 €",
    excerpt:
      "Viagens com escalas confundem passageiros e companhias aéreas. Se ambos os voos estavam numa única reserva e chegou com mais de 3 horas de atraso, a compensação pode aplicar-se.",
    image: "/assets/blog/missed-connection.jpg",
    imageAlt: "Viajante a apressar-se num terminal de aeroporto para apanhar um voo de ligação",
    body: [
      {
        type: "paragraph",
        text: "Correu pelo terminal. Mesmo assim perdeu a ligação. A pergunta que os passageiros mais fazem: o EU261 cobre isto? Muitas vezes sim — mas apenas quando os voos foram reservados juntos numa única reserva.",
      },
      {
        type: "heading",
        text: "Reserva única vs. bilhetes separados",
      },
      {
        type: "paragraph",
        text: "O EU261 trata uma viagem com vários troços numa única reserva como uma viagem única até ao destino final. Um atraso no primeiro troço que o faça chegar com mais de três horas de atraso ao fim pode dar direito à mesma compensação que um atraso directo.",
      },
      {
        type: "list",
        items: [
          "Mesma referência de reserva em todos os troços → geralmente coberto",
          "Bilhetes separados com companhias diferentes → normalmente não coberto para a ligação em si",
          "Primeiro voo de transportadora da UE causando ligação perdida na UE na mesma reserva → coberto",
        ],
      },
      {
        type: "heading",
        text: "O que a companhia aérea deve fazer após uma ligação perdida",
      },
      {
        type: "paragraph",
        text: "A transportadora responsável pelo atraso deve reencaminhá-lo para o destino o mais rapidamente possível. Enquanto espera, tem direito a refeições, comunicação e alojamento se uma pernoita for inevitável.",
      },
      {
        type: "heading",
        text: "Lista de documentação",
      },
      {
        type: "list",
        items: [
          "Cartão de embarque de cada troço da viagem",
          "Hora real de chegada ao destino final (não apenas ao aeroporto de ligação)",
          "Capturas de ecrã de notificações de atraso",
          "Qualquer confirmação de reencaminhamento da companhia aérea",
        ],
      },
      {
        type: "callout",
        text: "Dica profissional: O relógio das três horas corre até ao destino final, não ao aeroporto onde perdeu a ligação.",
      },
      {
        type: "heading",
        text: "Deixe-nos mapear o seu itinerário",
      },
      {
        type: "paragraph",
        text: "Casos de ligação perdida vivem ou morrem nos detalhes. A Compensall lê cartões de embarque multi-troço, mapeia a sua rota e indica se se qualifica — com o apoio do nosso assistente e equipa humana.",
      },
    ],
  },
  {
    slug: "overbooking",
    category: "Conheça os seus direitos",
    date: "20 May 2026",
    readTime: "5 min de leitura",
    title: "Overbooking: o que as companhias devem quando não há lugares",
    excerpt:
      "As companhias aéreas vendem mais bilhetes do que lugares de propósito. Se foi impedido de embarcar sem se voluntariar, pode ter uma reclamação forte.",
    image: "/assets/blog/overbooking.jpg",
    imageAlt: "Área de porta de embarque cheia com passageiros à espera de embarcar num voo lotado",
    body: [
      {
        type: "paragraph",
        text: "O overbooking é prática standard da indústria. As companhias aéreas apostam que alguns passageiros não aparecem. Quando todos aparecem, alguém fica de fora — e a lei europeia traça uma linha clara entre passageiros voluntários e os que são impedidos de embarcar contra a sua vontade.",
      },
      {
        type: "heading",
        text: "Impedimento involuntário = direitos fortes",
      },
      {
        type: "paragraph",
        text: "Se não concordou em apanhar um voo posterior em troca de benefícios, e a companhia aérea recusou o seu embarque porque o voo estava cheio, pode ter direito a até 600 € de compensação monetária, mais reencaminhamento ou reembolso e assistência enquanto espera.",
      },
      {
        type: "heading",
        text: "Vouchers não substituem direitos legais",
      },
      {
        type: "paragraph",
        text: "As companhias aéreas frequentemente pressionam vouchers, milhas ou acesso a lounges na porta. Estes acordos voluntários são separados da compensação fixa prevista no CE 261/2004. Antes de assinar qualquer coisa, confirme se está a aceitar uma oferta voluntária ou a ser recusado involuntariamente.",
      },
      {
        type: "list",
        items: [
          "Reserva confirmada em seu nome",
          "Check-in dentro do prazo da companhia aérea",
          "Embarque recusado sem culpa sua",
          "Registo escrito ou digital da recusa, se possível",
        ],
      },
      {
        type: "heading",
        text: "Defenda-se com provas",
      },
      {
        type: "paragraph",
        text: "Reclamações de overbooking têm sucesso quando os factos são claros. A Compensall ajuda-o a documentar o que aconteceu e a obter a compensação que lhe é legalmente devida — sem custos iniciais e só cobramos se ganhar.",
      },
    ],
  },
  {
    slug: "airline-strike",
    category: "Conheça os seus direitos",
    date: "18 May 2026",
    readTime: "6 min de leitura",
    title: "Greve na companhia aérea: ainda pode reclamar compensação por um voo perturbado?",
    excerpt:
      "As greves são a desculpa que as companhias mais usam, mas nem todas eliminam o seu direito à compensação. Veja como os tribunais traçam a linha.",
    image: "/assets/blog/airline-strike.jpg",
    imageAlt: "Aviões estacionados na pista durante uma greve na companhia aérea",
    body: [
      {
        type: "paragraph",
        text: "O seu voo foi cancelado. A companhia aérea culpou uma greve. Caso encerrado? Nem sempre. Ao abrigo do CE 261/2004, quem está em greve importa mais do que a palavra \"greve\" numa carta de rejeição.",
      },
      {
        type: "heading",
        text: "Greves de pessoal da companhia vs. greves de terceiros",
      },
      {
        type: "list",
        items: [
          "Greve de pilotos, tripulação de cabina ou pessoal de terra da própria companhia → compensação pode ainda ser devida",
          "Greve de controladores de tráfego aéreo, segurança aeroportuária ou handling não empregados pela companhia → frequentemente classificada como circunstâncias extraordinárias",
          "Existem zonas cinzentas — os tribunais analisam quem empregava os grevistas e se a companhia podia ter evitado a perturbação",
        ],
      },
      {
        type: "heading",
        text: "O que ainda recebe quando a compensação não se aplica",
      },
      {
        type: "paragraph",
        text: "Mesmo quando uma greve de terceiros impede a compensação, mantém direitos a assistência (refeições, hotéis) e reencaminhamento ou reembolso. Não aceite o silêncio da companhia aérea como resposta final.",
      },
      {
        type: "callout",
        text: "As companhias aéreas frequentemente confundem a distinção nas cartas de rejeição. Envie-nos a resposta da companhia — os factos específicos de cada caso importam.",
      },
      {
        type: "heading",
        text: "Como a Compensall trata casos de greve",
      },
      {
        type: "paragraph",
        text: "Reclamações por greve exigem análise cuidadosa do timing, de quem estava em greve e do que a companhia aérea sabia antecipadamente. Carregue o seu cartão de embarque e qualquer correspondência com a companhia — o nosso assistente e equipa analisam as circunstâncias e prosseguem a reclamação quando a lei o suporta.",
      },
    ],
  },
  {
    slug: "passenger-rights",
    category: "Conheça os seus direitos",
    date: "16 May 2026",
    readTime: "8 min de leitura",
    title: "Direitos dos passageiros aéreos na UE explicados: o que as companhias devem quando algo corre mal",
    excerpt:
      "O CE 261/2004 é o manual que as companhias aéreas esperam que nunca leia. Aqui está um guia claro sobre compensação, reembolsos e assistência.",
    image: "/assets/blog/passenger-rights.jpg",
    imageAlt: "Passageiro na cabine de um avião a segurar documentos de viagem",
    body: [
      {
        type: "paragraph",
        text: "Cerca de 85% dos passageiros nunca reclamam a compensação a que têm direito, muitas vezes porque as regras parecem feitas para confundir. O CE 261/2004 é mais simples do que as companhias aéreas querem que acredite. Eis o que garante de facto.",
      },
      {
        type: "heading",
        text: "Que voos estão cobertos?",
      },
      {
        type: "list",
        items: [
          "Qualquer voo a partir de um aeroporto da UE — qualquer companhia, qualquer nacionalidade",
          "Voos com chegada na UE em transportadora com sede na UE",
          "Tarifas low-cost, bilhetes de recompensa e bilhetes de crianças qualificam-se",
        ],
      },
      {
        type: "heading",
        text: "Três pilares da protecção dos passageiros",
      },
      {
        type: "paragraph",
        text: "Quando ocorre uma perturbação qualificável, pode ter direitos em três categorias — e acumulam-se:",
      },
      {
        type: "list",
        items: [
          "Compensação financeira fixa (250 € / 400 € / 600 €) por atrasos, cancelamentos e recusa de embarque",
          "Escolha entre reembolso integral ou reencaminhamento para o destino",
          "Assistência durante a espera — refeições, bebidas, hotel e transporte entre aeroporto e hotel",
        ],
      },
      {
        type: "heading",
        text: "Quanto tempo tem para reclamar?",
      },
      {
        type: "paragraph",
        text: "Na maioria dos países da UE tem até três anos a partir da data do voo. No Reino Unido, geralmente seis anos (cinco na Escócia). Quanto mais cedo submeter, mais fácil é reunir provas.",
      },
      {
        type: "callout",
        text: "Não precisa de ser europeu nem estar de férias na Europa — uma partida perturbada de Lisboa, Madrid ou Paris chega.",
      },
      {
        type: "heading",
        text: "Porque é que a maioria nunca reclama — e como resolvemos isso",
      },
      {
        type: "paragraph",
        text: "As companhias aéreas atrasam respostas, rejeitam reclamações válidas e escondem-se atrás de jargão jurídico. A Compensall fecha essa lacuna: carregue o seu cartão de embarque, confirme os seus dados e deixe o nosso assistente e equipa humana tratar do resto — sem custos iniciais e só cobramos se ganhar.",
      },
    ],
  },
  {
    slug: "passengers-with-disabilities",
    category: "Conheça os seus direitos",
    date: "14 May 2026",
    readTime: "6 min de leitura",
    title: "Voar com deficiência: assistência, acessibilidade e direitos de compensação",
    excerpt:
      "A lei europeia garante assistência gratuita em todas as fases da viagem, e os direitos por deficiência coexistem com reclamações standard por atraso e cancelamento.",
    image: "/assets/blog/passengers-with-disabilities.jpg",
    imageAlt: "Pessoal de aeroporto a assistir um passageiro em cadeira de rodas no embarque",
    body: [
      {
        type: "paragraph",
        text: "Viajar de avião com deficiência ou mobilidade reduzida traz protecções dedicadas ao abrigo da lei europeia — separadas, mas paralelas, às regras de compensação do CE 261/2004. Conhecer ambos os conjuntos de direitos pode fazer a diferença entre uma viagem stressante e uma viagem digna.",
      },
      {
        type: "heading",
        text: "Assistência gratuita ao abrigo do Regulamento 1107/2006",
      },
      {
        type: "paragraph",
        text: "Aeroportos e companhias aéreas devem prestar ajuda gratuita ao longo de toda a viagem — do check-in ao embarque, ligações e chegada. Isto inclui apoio em cadeira de rodas, embarque assistido e ajuda a deslocar-se entre portas.",
      },
      {
        type: "list",
        items: [
          "Notifique a companhia aérea pelo menos 48 horas antes da partida, quando possível",
          "A assistência deve ser prestada mesmo em pedidos de última hora",
          "A ajuda aplica-se nos aeroportos de partida, ligação e chegada dentro da UE",
        ],
      },
      {
        type: "heading",
        text: "Equipamento de mobilidade danificado ou perdido",
      },
      {
        type: "paragraph",
        text: "Se a sua cadeira de rodas ou dispositivo de mobilidade for danificado ou perdido durante o transporte, pode ter direito a custos de reparação ou substituição. Reporte danos imediatamente no aeroporto e guarde toda a documentação.",
      },
      {
        type: "heading",
        text: "Quando falhas de assistência causam um voo perdido",
      },
      {
        type: "paragraph",
        text: "Se a falta de assistência prometida o fez perder um voo ou ligação, a companhia aérea pode ser responsável pelo reencaminhamento e custos relacionados — para além de qualquer compensação standard do CE 261/2004 se a viagem global foi perturbada.",
      },
      {
        type: "callout",
        text: "Direitos por deficiência e compensação por atraso podem sobrepor-se. Um voo cancelado que também o deixou sem o apoio prometido em cadeira de rodas pode activar reclamações ao abrigo de ambos os regulamentos.",
      },
      {
        type: "heading",
        text: "Obtenha uma análise completa do seu caso",
      },
      {
        type: "paragraph",
        text: "Cada situação é diferente. Partilhe o seu cartão de embarque com a Compensall e a nossa equipa analisará o panorama completo — falhas de assistência, atrasos e cancelamentos em conjunto.",
      },
    ],
  },
];
