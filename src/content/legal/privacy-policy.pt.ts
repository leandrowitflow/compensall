import type { LegalDocument } from "./types";

export const privacyPolicyPt: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Última atualização:" },
      {
        type: "text",
        text: " julho de 2026. Esta Política de Privacidade explica como a Compensall recolhe, utiliza e protege dados pessoais quando utiliza o nosso website e serviços de reclamação.",
      },
    ],
  },
  sections: [
    {
      title: "1. Quem somos",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), a operar como " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' ("' },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: '", "nós", "nos"), é a entidade responsável pelo tratamento dos dados pessoais processados através deste website e serviços relacionados. Morada registada: ',
            },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Questões de privacidade: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Âmbito desta política",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Esta política aplica-se a visitantes do nosso website, a pessoas que iniciam ou submetem um pedido de compensação e a quem nos contacta. Se submeter um pedido, também lhe será pedido que reveja o nosso documento específico de ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Privacidade e Consentimento de Dados",
            },
            { type: "text", text: " antes de assinar." },
          ],
        },
      ],
    },
    {
      title: "3. Dados que recolhemos",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Consoante a forma como utiliza a Compensall, podemos tratar:" },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Dados de identificação e contacto:" },
              { type: "text", text: " nome, endereço de email, número de telefone, morada postal." },
            ],
            [
              { type: "strong", text: "Dados do pedido:" },
              {
                type: "text",
                text: " carregamentos de cartões de embarque, número de voo, rota, referência de reserva, detalhes da perturbação, informação dos passageiros e assinaturas.",
              },
            ],
            [
              { type: "strong", text: "Dados financeiros:" },
              {
                type: "text",
                text: " dados bancários utilizados para pagar a compensação recuperada.",
              },
            ],
            [
              { type: "strong", text: "Dados técnicos:" },
              {
                type: "text",
                text: " endereço IP, tipo de navegador, informação do dispositivo, páginas visitadas e origem de referência.",
              },
            ],
            [
              { type: "strong", text: "Comunicações:" },
              {
                type: "text",
                text: " mensagens que envia ao apoio e registos de correspondência relacionada com o pedido.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Como utilizamos os seus dados",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Utilizamos dados pessoais para:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Operar o website e prestar o nosso serviço de reclamação." }],
            [
              {
                type: "text",
                text: "Ler informação do cartão de embarque e avaliar elegibilidade ao abrigo do UK261, do CE 261/2004 e regras relacionadas.",
              },
            ],
            [
              {
                type: "text",
                text: "Preparar, submeter e gerir pedidos de compensação junto das companhias aéreas em seu nome.",
              },
            ],
            [
              {
                type: "text",
                text: "Comunicar consigo sobre o estado do pedido, documentos e pagamentos.",
              },
            ],
            [{ type: "text", text: "Cumprir obrigações legais, regulamentares e contabilísticas." }],
            [
              {
                type: "text",
                text: "Melhorar a segurança, prevenir fraude e manter a qualidade do serviço.",
              },
            ],
            [
              {
                type: "text",
                text: "Enviar atualizações relacionadas com o serviço e, quando permitido, comunicações de marketing.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Bases legais",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Ao abrigo do RGPD do Reino Unido e do RGPD da UE, baseamo-nos em:" },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Contrato:" },
              { type: "text", text: " para prestar o serviço de reclamação que solicita." },
            ],
            [
              { type: "strong", text: "Interesses legítimos:" },
              {
                type: "text",
                text: " para operar, proteger e melhorar a nossa plataforma e prosseguir pedidos de forma eficiente.",
              },
            ],
            [
              { type: "strong", text: "Obrigação legal:" },
              {
                type: "text",
                text: " quando a conservação ou divulgação é exigida por lei.",
              },
            ],
            [
              { type: "strong", text: "Consentimento:" },
              {
                type: "text",
                text: " para marketing opcional e cookies não essenciais, quando aplicável.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Partilha dos seus dados",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Podemos partilhar dados com:" }],
        },
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "Companhias aéreas, reguladores e organismos de resolução de litígios envolvidos no seu pedido.",
              },
            ],
            [
              {
                type: "text",
                text: "Consultores jurídicos e representantes que atuam no seu pedido.",
              },
            ],
            [
              {
                type: "text",
                text: "Prestadores de pagamento e bancos que processam transferências de compensação.",
              },
            ],
            [
              {
                type: "text",
                text: "Fornecedores de alojamento, email, armazenamento e TI sob acordos de tratamento de dados.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Não vendemos os seus dados pessoais." }],
        },
      ],
    },
    {
      title: "7. Transferências internacionais",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Alguns prestadores de serviços podem tratar dados fora do Reino Unido ou do EEE. Quando isso acontece, utilizamos salvaguardas adequadas, como Cláusulas Contratuais-Tipo ou proteções equivalentes exigidas pela lei aplicável.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Conservação",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Os registos de pedidos são geralmente conservados até 7 anos após o encerramento do assunto. Os registos técnicos são mantidos por um período mais curto, salvo se forem necessários para investigações de segurança. Eliminamos ou anonimizamos dados quando deixam de ser necessários.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Os seus direitos",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pode ter direito a aceder, retificar, apagar, restringir, opor-se ou portar os seus dados pessoais, e a retirar o consentimento quando o tratamento se baseia no consentimento. Contacte ",
            },
            { type: "email" },
            {
              type: "text",
              text: ". Também pode apresentar reclamação junto da autoridade de proteção de dados local.",
            },
          ],
        },
      ],
    },
    {
      title: "10. Segurança",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Utilizamos encriptação, controlos de acesso e infraestrutura segura para proteger dados pessoais. Nenhum serviço online pode ser garantido como completamente seguro, mas trabalhamos para reduzir o risco de forma proporcional à sensibilidade da informação que tratamos.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Utilizamos cookies e tecnologias semelhantes conforme descrito na nossa " },
            { type: "link", href: "/cookies", label: "Política de Cookies" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Alterações",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Podemos atualizar esta política periodicamente. Alterações materiais serão publicadas nesta página com uma data atualizada.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versão do documento 1.0. Última atualização: julho de 2026",
};
