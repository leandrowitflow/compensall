import type { LegalDocument } from "./types";

export const termsPt: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Resumo:" },
      { type: "text", text: " Estes Termos e Condições regem a sua relação com a " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Trabalhamos numa base No win, no fee: a nossa assistência jurídica nada lhe custa, salvo se recuperarmos com sucesso a sua indemnização. Se a reclamação tiver de seguir para contencioso, aplica-se uma taxa adicional de 20% dependente do êxito, devida apenas em caso de resultado favorável. Todas as taxas constam da ",
      },
      { type: "link", href: "/prices", label: "Tabela de Preços" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Definições",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Salvo se o contexto destas Condições Gerais exigir interpretação diversa, os termos iniciados por maiúscula utilizados nestes Termos e Condições ("T&C") têm o significado abaixo indicado:',
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: '"Contrato":' },
              { type: "text", text: " o acordo celebrado entre o Cliente e a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", constituído com a aceitação dos T&C pelo Cliente. Para a prestação dos Serviços de Assistência Jurídica, o Contrato considera-se válido a partir do momento em que o Cliente assina o Formulário de Cessão, para além de aceitar os presentes T&C.",
              },
            ],
            [
              { type: "strong", text: '"Compensall":' },
              { type: "text", text: " a pessoa coletiva (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", registo legal " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), com sede em " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", e endereço de correio eletrónico " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: '"Regulamentação dos Direitos dos Passageiros Aéreos":' },
              {
                type: "text",
                text: " qualquer lei, regulamento, diretiva ou instrumento semelhante, emitido a nível estadual, da UE, federal, nacional ou regional, que estabeleça regras de indemnização, compensação ou reembolso de passageiros em casos de sobrerreserva, atraso ou cancelamento de voos.",
              },
            ],
            [
              { type: "strong", text: '"Formulário de Cessão":' },
              { type: "text", text: " o acordo entre o Cliente e a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " celebrado depois de o Cliente ter tomado conhecimento e aceitado os T&C, assinado por meios eletrónicos ou por escrito. Ao abrigo deste Contrato, o Cliente confere-nos autorização exclusiva e irrevogável para iniciar e concretizar uma reclamação com base nos seus direitos previstos no Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho e na jurisprudência relacionada, bem como para praticar todos os atos necessários, incluindo delegar ou transferir a reclamação, receber pagamentos e tratar, solicitar ou fornecer dados pessoais, quando necessário, exclusivamente junto de entidades relacionadas e apenas para esta finalidade.",
              },
            ],
            [
              { type: "strong", text: '"Cliente(s)":' },
              {
                type: "text",
                text: " a pessoa que assinou o Formulário de Cessão, aceitou os T&C e pretende obter uma indemnização por voo.",
              },
            ],
            [
              { type: "strong", text: '"Indemnização":' },
              {
                type: "text",
                text: " o montante total pago por uma companhia aérea relativamente a uma reclamação, a título de indemnização, acordo extrajudicial, gesto comercial ou outro, transferido para o Cliente ou para a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " após a aceitação dos T&C pelo Cliente." },
            ],
            [
              { type: "strong", text: '"Serviço de Informação":' },
              { type: "text", text: " a disponibilização, pela " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", de informação relacionada com voos, incluindo dados sobre companhias aéreas, aeroportos, direitos dos passageiros aéreos, legislação de defesa do consumidor e outra informação de viagem. A informação será relevante para as viagens do Cliente e pode incluir contexto mais amplo, como classificações de aeroportos ou companhias aéreas ou atualizações sobre alterações aos direitos dos passageiros aéreos. É prestada através de comunicações eletrónicas, incluindo correio eletrónico, painéis eletrónicos personalizados, websites controlados pela ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou aplicações móveis." },
            ],
            [
              { type: "strong", text: '"Contencioso":' },
              {
                type: "text",
                text: " se a companhia aérea não responder no prazo de dois meses, ou se a sua resposta for considerada insatisfatória na sequência de avaliação interna, a reclamação seguirá para contencioso. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " reserva-se o direito exclusivo de determinar a via mais adequada, sem obrigação de justificar as suas decisões, mantendo, porém, o Cliente informado ao longo do processo. Dado o tempo e os recursos significativos exigidos pelo contencioso, aplica-se uma taxa adicional de 20% dependente do êxito, devida apenas em caso de resultado favorável. Não será exigida a presença do Cliente em tribunal; espera-se, contudo, a sua colaboração no fornecimento de documentos, informações ou provas necessários ao processo.",
              },
            ],
            [
              { type: "strong", text: '"Tabela de Preços":' },
              {
                type: "text",
                text: " o anexo aos presentes T&C, que especifica as moedas aceites, os métodos de pagamento e todas as taxas cobradas pela ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". A Tabela de Preços está publicada na " },
              { type: "link", href: "/prices", label: "nossa página de Preços" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: '"Regulamento 261/04":' },
              {
                type: "text",
                text: " o Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho, de 11 de fevereiro de 2004, que estabelece regras comuns para a indemnização e a assistência aos passageiros dos transportes aéreos em caso de recusa de embarque e de cancelamento ou atraso considerável dos voos.",
              },
            ],
            [
              { type: "strong", text: '"Reclamação":' },
              {
                type: "text",
                text: " qualquer pedido de indemnização apresentado contra uma companhia aérea ao abrigo do Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho.",
              },
            ],
            [
              { type: "strong", text: '"Requisitos de Privacidade e Proteção de Dados":' },
              {
                type: "text",
                text: " todas as leis e regulamentos aplicáveis relativos ao tratamento de dados pessoais e à privacidade, incluindo, quando aplicável, as orientações e códigos de conduta emitidos pelas autoridades de controlo competentes, bem como quaisquer instrumentos equivalentes em qualquer jurisdição relevante.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "As definições acima aplicam-se à celebração e à execução de qualquer documento ou transação relacionados com os T&C.",
            },
          ],
        },
      ],
    },
    {
      title: "Artigo 1.º Formulário de Cessão",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              {
                type: "text",
                text: " O Cliente aceita os T&C (o Formulário de Cessão), que constituem a base de qualquer outro documento a celebrar livremente entre o Cliente e a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " utiliza um serviço de autenticação em linha para assinaturas eletrónicas avançadas que cumpre os requisitos do artigo 26.º do Regulamento relativo à Identificação Eletrónica, reconhecido e aceite internacionalmente, incluindo pelos tribunais, pelo que o Cliente não tem de imprimir, assinar e devolver o Formulário de Cessão por correio registado.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " Ao celebrar o Contrato, o Cliente confirma que está autorizado e tem capacidade jurídica para assinar documentos vinculativos para si e para a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ou, se aplicável, que tem o direito de assinar em nome de outra pessoa (por exemplo, um menor).",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " O Cliente compromete-se a fornecer à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " todos os dados e informações necessários à cobrança da Indemnização junto da transportadora aérea operadora.",
              },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " apenas pode aceitar Indemnizações em dinheiro, não sendo aceites vales de viagem ou outros serviços oferecidos pela transportadora aérea operadora.",
              },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " O Cliente garante que a indemnização não foi cedida a terceiros e que não está nem estará pendente qualquer litígio entre o Cliente e a companhia aérea sobre a mesma matéria.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " Após a assinatura do Formulário de Cessão, o Cliente deve cessar as negociações com a companhia aérea em causa e encaminhar qualquer contacto da companhia aérea para a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", de forma a que a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " obtenha o melhor resultado possível." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " O Cliente confirma e declara que os T&C constituem prova direta e expressão da sua vontade real, devendo ser respeitados pelas transportadoras aéreas operadoras. O Cliente acorda com a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " que todos os pagamentos de Indemnização efetuados pelas transportadoras operadoras no âmbito de Reclamações da ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sejam feitos diretamente para contas bancárias tituladas pela " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou para outras contas acordadas entre a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " e o Cliente." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " O Cliente aceita igualmente que a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " o assista no exercício do seu direito de defesa na cobrança da Indemnização.",
              },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Caso o Cliente receba pagamentos diretos ou qualquer outra compensação da companhia aérea após a celebração do Contrato, fica obrigado a informar de imediato a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Esses pagamentos são considerados indemnização e conferem à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " o direito de cobrar a taxa de serviço e a taxa de contencioso, se a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " tiver intentado ação judicial antes de o Cliente ter recebido o pagamento da companhia aérea.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Artigo 2.º Descrição do Serviço de Assistência Jurídica",
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
                text: " apresenta o pedido de indemnização do Cliente à companhia aérea que opera o voo, com base no Regulamento 261/2004 ou noutra regulamentação de direitos dos passageiros aéreos aplicável ao voo em causa.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Os dados e informações do voo podem ser enviados à " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " através do website, por correio eletrónico ou por telefone." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Para dar seguimento à reclamação, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " exige que o Cliente assine o Formulário de Cessão, que pode ser submetido através do formulário web, por correio eletrónico ou por via postal. Recebido o Formulário de Cessão, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " atuará em nome próprio e por conta própria na cobrança do crédito cedido junto da companhia aérea.",
              },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Se não for alcançado acordo com a transportadora aérea operadora quanto à Reclamação, ou noutros casos em que, no entender da ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", o processo de recuperação da Indemnização seja mais eficaz ou mais rápido por essa via, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " tem o direito de recorrer a ação judicial, o que implicará o aumento da parte da Indemnização que lhe pertence, conforme especificado na ",
              },
              { type: "link", href: "/prices", label: "Tabela de Preços" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              {
                type: "text",
                text: " Se um representante legal contratado intervier no contencioso, o Cliente aceita autorizar a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a facultar-lhe acesso a toda a informação relevante do processo e permitir que esse representante mantenha a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " informada sobre o andamento do processo. Caso o tribunal exija certificados de autenticação, procurações, declarações sob compromisso de honra, Formulários de Cessão ou outra documentação, o Cliente aceita assiná-los. Se o Cliente já tiver assinado um Formulário de Cessão, fica acordado que a reclamação é automaticamente retransmitida ao Cliente antes da assinatura de tais documentos adicionais.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Se a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ou o representante legal contratado concluir que a reclamação não tem mérito suficiente, o processo será encerrado e o Cliente informado em conformidade.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Se a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou o representante legal contratado intentar ação judicial, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " suportará os custos incorridos em caso de improcedência da ação. Em caso de procedência ou de acordo, a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " suportará os custos não reembolsados pela companhia aérea." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " O Cliente reconhece que o tratamento da Reclamação pode demorar um tempo considerável e que a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " não pode influenciar a rapidez com que a Reclamação é resolvida." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artigo 3.º Taxas e Pagamentos",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "O nosso serviço é prestado numa base " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: ", nos termos do " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Acordo No win, no fee" },
            { type: "text", text: ". Todas as taxas aplicáveis constam da " },
            { type: "link", href: "/prices", label: "Tabela de Preços" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "3.1." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " presta assistência jurídica gratuitamente, exceto quando a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " obtém com sucesso a indemnização. Em caso de êxito, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " transferirá para o Cliente a parte acordada da indemnização, sujeita às taxas aplicáveis previstas na Tabela de Preços.",
              },
            ],
            [
              { type: "strong", text: "3.2." },
              {
                type: "text",
                text: " A parte acordada da indemnização será paga ao Cliente de acordo com as opções especificadas na Tabela de Preços.",
              },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Se o Cliente tiver fornecido informação incorreta ou insuficiente para o pagamento da indemnização, o pagamento for devolvido à ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " e o Cliente não responder após várias notificações e esforços razoáveis da ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " para o contactar por meios distintos do correio eletrónico indicado, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " tem o direito de reter a parte da indemnização que teria sido transferida para o Cliente.",
              },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Uma vez paga pela " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a indemnização acordada de acordo com as instruções e o método de pagamento escolhidos pelo Cliente, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " não é responsável por: (i) problemas com cheques, cartões de débito pré-pagos, cartões de crédito ou outras perdas ocorridas no trânsito até ao Cliente; nem (ii) quaisquer consequências resultantes do fornecimento pelo Cliente de dados bancários incorretos, morada incorreta ou erros semelhantes, incluindo, entre outros, o pagamento da indemnização a destinatário errado. Se a indemnização for paga a destinatário errado por erro do Cliente, a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " não fica obrigada a diligenciar ativamente pela sua recuperação." },
            ],
            [
              { type: "strong", text: "3.5." },
              {
                type: "text",
                text: " Não podem ser reclamados juros relativos ao período entre a receção e o pagamento da indemnização. A ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " reserva-se o direito de reter os juros recuperados junto da companhia aérea." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " não é responsável por qualquer indemnização, dano ou pedido relacionado se não puder transferir o pagamento ao Cliente por facto alheio ao seu controlo razoável, incluindo, entre outros, greves, conflitos laborais, catástrofes naturais, guerra, motins, distúrbios civis, sabotagem intencional, cumprimento de leis ou ordens, regulamentos, disposições ou instruções governamentais, acidentes, falhas de instalações ou equipamentos, incêndios, inundações ou tempestades.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Uma vez que a sede da " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se situa em Portugal, o montante do imposto sobre o valor acrescentado (IVA), quando aplicável, é determinado pela lei portuguesa, à taxa legalmente estabelecida.",
              },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " Para contas na Área Única de Pagamentos em Euros (SEPA), todos os pagamentos serão enviados por transferência bancária. Em transferências internacionais para o Cliente, todos os encargos bancários são deduzidos à parte da Indemnização que lhe cabe.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              {
                type: "text",
                text: " Para poupar custos bancários, em caso de reserva partilhada ou noutros casos (por exemplo, pais que recebem por conta de filhos), a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " transferirá todos os pagamentos para uma única conta, se o Cliente o autorizar ou se for indicada uma única conta no momento da submissão dos dados à ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ". A pessoa que receba valores por conta de outras fica obrigada a acertar contas com estas, não assumindo a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", nesse caso, o risco de não pagamento." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " A Indemnização e quaisquer outros pagamentos serão efetuados pela " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " apenas aos beneficiários finais com direito a reclamá-la. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " não efetuará pagamentos a intermediários, agências, representantes ou outros terceiros, salvo se estes apresentarem documentação escrita específica que confirme, de forma clara e inequívoca, os seus poderes para receber pagamentos em nome do beneficiário final. Havendo qualquer dúvida quanto ao direito de receber pagamentos, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " reserva-se o direito de solicitar prova adicional e pode, discricionariamente, recusar efetuar pagamentos diretos a essas pessoas.",
              },
            ],
            [
              { type: "strong", text: "3.11." },
              {
                type: "text",
                text: " Se o Cliente receber qualquer pagamento ou outra forma de Indemnização, por exemplo um voucher de voo, da transportadora aérea operadora após ter contratado os serviços da ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", fica obrigado a informar de imediato a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Nesse caso, o Cliente deve pagar à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a remuneração indicada na Tabela de Preços no prazo de 10 (dez) dias a contar da data em que recebeu a Indemnização da transportadora aérea operadora, para a conta bancária indicada no website da ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou para qualquer outra conta indicada por escrito pela " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artigo 4.º Proteção de Dados Pessoais",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " O Cliente garante que os dados e informações fornecidos à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " no âmbito da Reclamação são corretos, completos, verdadeiros e não enganosos. O Cliente manterá a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " indemnizada relativamente a quaisquer pretensões decorrentes de informação incorreta prestada pelo Cliente ou da falta de cooperação ou cooperação indevida deste.",
              },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " pode também recolher dados pessoais para finalidades adicionais, como análise estatística, administração, comunicação, gestão e segurança informática, segurança física, processos de autenticação e autorização, sistemas de apoio, coordenação interna de projetos e equipas e atividades organizacionais. Todos os dados pessoais são recolhidos em conformidade com o Regulamento Geral sobre a Proteção de Dados, Regulamento (UE) 2016/679 (ver a nossa ",
              },
              { type: "link", href: "/privacy-policy", label: "Política de Privacidade" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " O Cliente fornece à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados ou outra legislação de proteção de dados aplicável, dando consentimento expresso para o tratamento e utilização destes dados no âmbito do Contrato. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " apenas partilhará dados pessoais com terceiros quando: (i) o Cliente tenha dado o seu consentimento; (ii) tal seja necessário para uma finalidade diretamente relacionada com o motivo inicial da recolha dos dados; (iii) tal seja necessário para a preparação, negociação e execução do contrato com o Cliente; (iv) tal seja exigido por obrigação legal ou por ordem administrativa ou judicial; (v) tal seja necessário para exercer ou defender direitos em juízo ou responder a ações judiciais; ou (vi) tal seja necessário para prevenir utilizações abusivas ou outras atividades ilícitas, como ataques deliberados, de modo a assegurar a proteção dos dados.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "No âmbito da relação contratual estabelecida ao abrigo dos presentes T&C, a " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " pode, pontualmente, enviar ao Cliente comunicações relacionadas com o serviço, utilizando os contactos fornecidos, incluindo por correio eletrónico. Estas comunicações podem incluir informação sobre outras eventuais reclamações que o Cliente possa ter direito a apresentar ao abrigo da regulamentação aplicável aos direitos dos passageiros aéreos, com base na análise, pela ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: ", de dados de processos anteriores ou de informação de voos publicamente disponível. Estas mensagens destinam-se exclusivamente a auxiliar o Cliente no exercício dos seus direitos e consideram-se abrangidas pelo interesse legítimo da ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " na prestação de serviços relevantes e conexos." },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "O Cliente pode opor-se à receção destas comunicações a qualquer momento, clicando na ligação de cancelamento de subscrição incluída em cada mensagem ou contactando a ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " através de " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Artigo 5.º Direito de livre resolução",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              {
                type: "text",
                text: " A relação contratual entre as partes termina com o cumprimento integral do Contrato, ou seja, com a realização integral do pagamento devido ao abrigo do Contrato.",
              },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Se for qualificado como consumidor ao abrigo da legislação de defesa do consumidor da UE, isto é, se for pessoa singular que celebra um negócio jurídico com finalidade alheia à sua atividade comercial ou profissional independente, dispõe de um direito legal de livre resolução.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " O Contrato cessa de imediato: (i) quando a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " considere, após análise aprofundada da Reclamação, que esta poderá não ter êxito, sendo o Cliente informado dessa decisão; (ii) em caso de dados ou informações incorretos e de conduta fraudulenta do Cliente, mediante decisão da ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: "; ou (iii) se, no prazo de 14 (catorze) dias a contar da celebração do Contrato, o Cliente, na qualidade de consumidor, enviar declaração de resolução por correio eletrónico. Este direito de resolução cessa antecipadamente se o Contrato for integralmente cumprido antes do termo do referido prazo.",
              },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " Pode revogar a sua aceitação do nosso Contrato no prazo de 14 dias a contar da sua celebração (por exemplo, por carta ou correio eletrónico), sem necessidade de indicar motivos. Para exercer o direito de livre resolução, esta deve ser comunicada dentro do referido prazo de 14 dias e indicar claramente que pretende resolver o Contrato. Dada a natureza do serviço prestado, não pode resolver o Contrato depois de o termos informado de que a companhia aérea em causa aceitou a reclamação, uma vez que, nesse caso, já prestámos o serviço solicitado. A declaração de resolução pode ser enviada para o nosso endereço de correio eletrónico ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artigo 6.º Disposições Finais",
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
                text: " pode alterar os T&C e estabelecer condições adicionais a qualquer momento e sem aviso prévio, envidando, contudo, esforços para manter o Cliente informado de tais alterações. Se essas alterações forem desfavoráveis para o Cliente, este terá de as aprovar para que os T&C alterados lhe sejam aplicáveis.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " Aos T&C, ao Contrato e a qualquer outro documento celebrado em relação com os T&C e o Contrato aplica-se a lei da República Portuguesa, salvo acordo em contrário no documento específico. O Cliente, enquanto consumidor, pode também invocar a proteção conferida pelas disposições imperativas da lei do país onde reside.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " utilizará os dados pessoais do Cliente e, se aplicável, dos seus colaboradores, exclusivamente para efeitos de exercício da Reclamação. Toda a informação sobre a extensão e a forma de recolha, conservação e utilização dos dados pessoais consta da nossa ",
              },
              { type: "link", href: "/privacy-policy", label: "Política de Privacidade" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              {
                type: "text",
                text: " Caso o Cliente seja uma pessoa coletiva, garante e declara que: (i) os dados pessoais fornecidos à ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " foram recolhidos e são fornecidos, em qualquer momento, em conformidade com os Requisitos de Privacidade e Proteção de Dados; e (ii) para efeitos do presente Contrato, a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " atuará como subcontratante e não como responsável pelo tratamento (na aceção dos Requisitos de Privacidade e Proteção de Dados), relativamente a todas as atividades de tratamento realizadas ao abrigo do presente Contrato.",
              },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Se qualquer disposição dos T&C for considerada ilegal, inválida ou inexequível por um tribunal judicial ou arbitral, as restantes disposições mantêm-se em pleno vigor. Qualquer disposição considerada ilegal, inválida ou inexequível apenas em parte, ou em certa medida, mantém-se em pleno vigor na parte não afetada. A ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " alterará os T&C substituindo tais disposições por disposições legais, válidas e exequíveis que produzam um resultado o mais próximo possível das intenções da ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " e do Cliente." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " A " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " pode alterar os presentes T&C e a Tabela de Preços e estabelecer condições adicionais a qualquer momento e sem aviso prévio. Contudo, as alterações com efeito desfavorável para o Cliente não lhe serão aplicáveis, salvo se este as aceitar.",
              },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Sempre que a lei nacional restrinja ou proíba a cessão de créditos, a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " atuará em cooperação com representantes legais locais, em conformidade com a regulamentação local aplicável.",
              },
            ],
            [
              { type: "strong", text: "6.8." },
              {
                type: "text",
                text: " Os direitos e obrigações relacionados, total ou parcialmente, com qualquer reclamação apresentada podem ser transmitidos sem restrições pela ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " a qualquer entidade do grupo de sociedades " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " e pela " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " a terceiros." },
            ],
          ],
        },
      ],
    },
    {
      title: "Anexo n.º 1 - Tabela de Preços",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A Tabela de Preços faz parte integrante dos presentes T&C e está publicada na " },
            { type: "link", href: "/prices", label: "nossa página de Preços" },
            {
              type: "text",
              text: ". Especifica as moedas aceites, os métodos de pagamento disponíveis e todas as taxas cobradas pela ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: ", incluindo a taxa de êxito e a taxa adicional de 20% em caso de contencioso." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "As condições comerciais do nosso regime de honorários constam do " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Acordo No win, no fee" },
            { type: "text", text: ". Questões sobre estes T&C podem ser enviadas para " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Versão 4.0 do documento. Última atualização: setembro de 2026",
};
