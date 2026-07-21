import type { LegalDocument } from "./types";

export const termsPt: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Resumo:" },
      {
        type: "text",
        text: " Ao utilizar a Compensall, concorda com estes Termos de Serviço. O nosso trabalho de reclamação é prestado numa base sem vitória, sem taxa, sujeito ao acordo de taxas separado que assina ao submeter um pedido.",
      },
    ],
  },
  sections: [
    {
      title: "1. Acordo",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Estes Termos de Serviço ("Termos") regem o seu acesso e utilização do website, ferramentas e serviços relacionados da Compensall (o "Serviço"). Ao utilizar o Serviço, concorda com estes Termos e com a nossa ',
            },
            { type: "link", href: "/privacy-policy", label: "Política de Privacidade" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "2. Quem pode utilizar o Serviço",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Deve ter pelo menos 18 anos e capacidade legal para celebrar contratos vinculativos. Se submeter um pedido em nome de outro passageiro, confirma que tem autoridade para agir em seu nome.",
            },
          ],
        },
      ],
    },
    {
      title: "3. O nosso Serviço",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " ajuda passageiros aéreos a avaliar e prosseguir pedidos de compensação por voos, principalmente ao abrigo do Regulamento UK261 do Reino Unido e do Regulamento CE 261/2004 da UE e regras relacionadas de direitos dos passageiros. Fornecemos ferramentas digitais, verificações assistidas, preparação de documentos e gestão de pedidos com apoio humano.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Não garantimos que um pedido será bem-sucedido. A elegibilidade depende dos factos da sua viagem, da resposta da companhia aérea e da lei aplicável.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Submissão de um pedido",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Ao submeter um pedido, concorda em:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Fornecer informação exacta e completa." }],
            [
              {
                type: "text",
                text: "Carregar documentos que tem direito a partilhar e que se relacionam com o seu pedido.",
              },
            ],
            [
              {
                type: "text",
                text: "Assinar os documentos legais necessários, incluindo a Autorização para Agir, o Acordo Sem Vitória, Sem Taxa e o Consentimento de Privacidade e Dados.",
              },
            ],
            [
              {
                type: "text",
                text: "Não prosseguir o mesmo pedido de forma independente junto da companhia aérea enquanto estivermos a actuar em seu nome, salvo acordo escrito em contrário.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Consulte os nossos documentos de pedido em " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Sem Vitória, Sem Taxa" },
            { type: "text", text: ", " },
            { type: "link", href: "/documents/authority-to-act", label: "Autorização para Agir" },
            { type: "text", text: " e " },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Privacidade e Consentimento de Dados",
            },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "5. Taxas",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "O acesso ao website e as verificações de elegibilidade são gratuitos. Se nos nomear para prosseguir a compensação, as nossas taxas aplicam-se apenas em caso de sucesso, conforme estabelecido no Acordo Sem Vitória, Sem Taxa. Não paga nada se não recuperarmos compensação para si, sujeito aos termos desse acordo.",
            },
          ],
        },
      ],
    },
    {
      title: "6. As suas responsabilidades",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Concorda em não:" }],
        },
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "Utilizar indevidamente o Serviço ou tentar aceder aos nossos sistemas sem autorização.",
              },
            ],
            [
              {
                type: "text",
                text: "Submeter pedidos ou documentos falsos, enganosos ou fraudulentos.",
              },
            ],
            [
              {
                type: "text",
                text: "Utilizar o Serviço em violação da lei aplicável ou de direitos de terceiros.",
              },
            ],
            [
              {
                type: "text",
                text: "Copiar, extrair ou explorar comercialmente o nosso conteúdo sem permissão.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "7. Propriedade intelectual",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "O nome Compensall, a marca, o conteúdo do website, o software e os materiais pertencem ou estão licenciados à Compensall. Recebe uma licença limitada e não exclusiva para utilizar o Serviço para fins pessoais de reclamação.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Exclusão de responsabilidade",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "O Serviço fornece informação geral e assistência na reclamação. Não constitui aconselhamento jurídico. O conteúdo do website é disponibilizado para fins informativos e pode não reflectir os desenvolvimentos legais mais recentes em todas as jurisdições.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Limitação de responsabilidade",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Na máxima extensão permitida por lei, a Compensall não é responsável por perdas indirectas, incidentais ou consequenciais, nem por decisões das companhias aéreas, resultados judiciais ou atrasos fora do nosso controlo razoável. Nada nestes Termos limita responsabilidade que não possa ser limitada ao abrigo da lei aplicável, incluindo responsabilidade por fraude ou morte ou lesões pessoais causadas por negligência.",
            },
          ],
        },
      ],
    },
    {
      title: "10. Suspensão e rescisão",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Podemos suspender ou terminar o acesso ao Serviço se violar estes Termos ou se a continuação do serviço criar risco legal ou de segurança. Pode deixar de utilizar o Serviço a qualquer momento. Os direitos de cancelamento específicos do pedido estão descritos nos documentos de pedido assinados.",
            },
          ],
        },
      ],
    },
    {
      title: "11. Lei aplicável",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Estes Termos são regidos pelas leis de Inglaterra e País de Gales. Os tribunais de Inglaterra e País de Gales têm jurisdição exclusiva, excepto quando as leis imperativas de proteção do consumidor no seu país de residência lhe conferem o direito de intentar acções noutro local.",
            },
          ],
        },
      ],
    },
    {
      title: "12. Contacto",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Questões sobre estes Termos: " },
            { type: "email" },
          ],
        },
      ],
    },
  ],
  footer: "Versão do documento 1.0. Última atualização: julho de 2026",
};
