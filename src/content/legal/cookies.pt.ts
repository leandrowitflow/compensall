import type { LegalDocument } from "./types";

export const cookiesPt: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Última atualização:" },
      {
        type: "text",
        text: " julho de 2026. Esta Política de Cookies explica como a Compensall utiliza cookies e tecnologias semelhantes no nosso website.",
      },
    ],
  },
  sections: [
    {
      title: "1. O que são cookies?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. Ajudam os sites a funcionar, a recordar preferências e a compreender como os visitantes utilizam as páginas. Tecnologias semelhantes incluem armazenamento local e armazenamento de sessão.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Como utilizamos cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A Compensall utiliza cookies nas seguintes categorias:" },
          ],
        },
        {
          type: "table",
          headers: ["Categoria", "Finalidade"],
          rows: [
            {
              category: "Estritamente necessários",
              purpose:
                "Necessários para funções essenciais do site, como segurança, balanceamento de carga, continuidade da sessão de pedido e memorização de escolhas necessárias para prestar o serviço que solicita.",
            },
            {
              category: "Funcionais",
              purpose:
                "Recordam preferências que melhoram a sua experiência, como progresso de formulários ou definições de visualização, quando activadas.",
            },
            {
              category: "Analíticos",
              purpose:
                "Ajudam-nos a compreender como os visitantes utilizam o site para podermos melhorar o desempenho e o conteúdo. Só são utilizados quando permitido e, quando exigido, após consentimento.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookies de terceiros",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Alguns cookies podem ser definidos por prestadores de infraestrutura ou serviços que nos ajudam a alojar e operar o website, como fornecedores de alojamento, segurança e desempenho. Se activarmos ferramentas analíticas ou de marketing no futuro, esta política será actualizada para listar os prestadores e períodos de conservação relevantes.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Gestão de cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pode controlar cookies através das definições do seu navegador. A maioria dos navegadores permite bloquear ou eliminar cookies. Bloquear cookies estritamente necessários pode impedir que partes do site, incluindo o fluxo de pedido, funcionem correctamente.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Quando cookies não essenciais exigem consentimento ao abrigo da lei aplicável, pediremos a sua escolha antes de os colocar.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Conservação",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Os cookies de sessão expiram quando fecha o navegador. Os cookies persistentes permanecem durante um período definido ou até os eliminar. A conservação depende da finalidade do cookie e do prestador.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Mais informações",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Para detalhes sobre como tratamos dados pessoais, consulte a nossa ",
            },
            { type: "link", href: "/privacy-policy", label: "Política de Privacidade" },
            { type: "text", text: ". Questões de privacidade: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Alterações",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Podemos actualizar esta Política de Cookies quando a nossa utilização de cookies mudar. A versão mais recente estará sempre disponível nesta página.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versão do documento 1.0. Última atualização: julho de 2026",
};
