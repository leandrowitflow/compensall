import type { LegalDocument } from "./types";

export const noWinNoFeePt: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Resumo:" },
      {
        type: "text",
        text: " Não paga nada adiantado e não paga nada se não recuperarmos compensação em seu nome. A nossa taxa de sucesso só é cobrada quando o seu pedido for bem-sucedido.",
      },
    ],
  },
  sections: [
    {
      title: "1. Visão geral do acordo",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Este Acordo Só Paga Se Ganharmos ("Acordo") é celebrado entre o reclamante (si) e a ',
            },
            { type: "strongBrand", field: "brandName" },
            {
              type: "text",
              text: ' ("a Empresa"). Ao avançar com um pedido através da plataforma Compensall, concorda com estes termos.',
            },
          ],
        },
      ],
    },
    {
      title: "2. Sem custos iniciais",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Não existem taxas iniciais, de registo ou de administração para submeter o seu pedido. Não incorre em quaisquer custos se não conseguirmos recuperar compensação em seu nome.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Taxa de sucesso",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Uma taxa de sucesso será deduzida da compensação recuperada em seu nome:",
            },
          ],
        },
        {
          type: "table",
          headers: ["Montante da compensação", "Taxa de sucesso"],
          rows: [
            { category: "Até 250€", purpose: "25% + IVA" },
            { category: "251€ – 400€", purpose: "25% + IVA" },
            { category: "401€ – 600€", purpose: "25% + IVA" },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "A taxa de sucesso é deduzida antes de o restante da compensação lhe ser transferido. Receberá sempre pelo menos 75% do montante recuperado antes de ajustes de IVA.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Processo de pagamento",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Assim que a companhia aérea pagar a compensação, a Compensall deduzirá a taxa de sucesso acordada e transferirá o saldo restante para a conta bancária indicada no prazo de 5 a 10 dias úteis. Receberá um detalhe completo do acordo e das deduções.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Cancelamento",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pode cancelar este acordo a qualquer momento antes da conclusão do pedido, notificando-nos por escrito para ",
            },
            { type: "strong", text: "cancel@compensall.com" },
            {
              type: "text",
              text: ". Se já tiver sido realizado trabalho substancial e a companhia aérea tiver feito uma proposta, poderá aplicar-se uma taxa de cancelamento reduzida.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Lei aplicável",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Este Acordo rege-se pelas leis de Inglaterra e do País de Gales. Quaisquer litígios ficam sujeitos à jurisdição exclusiva dos tribunais de Inglaterra e do País de Gales.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versão do documento 3.0. Última atualização: janeiro de 2026",
};
