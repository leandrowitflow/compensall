import type { LegalDocument } from "./types";

export const cookiesEs: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Última actualización:" },
      {
        type: "text",
        text: " julio de 2026. Esta Política de cookies explica cómo Compensall usa cookies y tecnologías similares en nuestro sitio web.",
      },
    ],
  },
  sections: [
    {
      title: "1. ¿Qué son las cookies?",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas un sitio web. Ayudan a que las páginas funcionen, recuerden preferencias y entiendan cómo las usan los visitantes. Tecnologías similares incluyen el almacenamiento local y el de sesión.",
            },
          ],
        },
      ],
    },
    {
      title: "2. Cómo usamos las cookies",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Compensall usa cookies en las siguientes categorías:" }],
        },
        {
          type: "table",
          headers: ["Categoría", "Finalidad"],
          rows: [
            {
              category: "Estrictamente necesarias",
              purpose:
                "Imprescindibles para funciones básicas como la seguridad, el equilibrio de carga, la continuidad de la sesión de reclamación y recordar las elecciones necesarias para prestar el servicio que solicitas.",
            },
            {
              category: "Funcionales",
              purpose:
                "Recuerdan preferencias que mejoran tu experiencia, como el progreso de un formulario o ajustes de visualización, cuando están activadas.",
            },
            {
              category: "Analíticas",
              purpose:
                "Nos ayudan a entender cómo usan el sitio los visitantes para mejorar el rendimiento y el contenido. Solo se usan cuando está permitido y, si hace falta, tras el consentimiento.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Cookies de terceros",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Algunas cookies las pueden establecer proveedores de infraestructura o de servicios que nos ayudan a alojar y operar el sitio, como hosting, seguridad y rendimiento. Cuando aceptas las cookies analíticas, usamos Google Tag Manager y las etiquetas de medición de Google relacionadas (Google Ireland Limited / Google LLC), que pueden incluir Google Analytics, para entender cómo usan el sitio los visitantes. Google puede establecer cookies como _ga y _ga_* y tratar datos de uso según sus políticas. Las cookies analíticas solo se colocan si eliges «Aceptar todas».",
            },
          ],
        },
      ],
    },
    {
      title: "4. Gestión de cookies",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Puedes controlar las cookies desde la configuración del navegador. La mayoría de navegadores permiten bloquearlas o eliminarlas. Bloquear las cookies estrictamente necesarias puede impedir que partes del sitio, incluido el flujo de reclamación, funcionen correctamente.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Cuando las cookies no esenciales requieran consentimiento según la ley aplicable, te pediremos tu elección antes de colocarlas.",
            },
          ],
        },
      ],
    },
    {
      title: "5. Conservación",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Las cookies de sesión caducan cuando cierras el navegador. Las cookies persistentes permanecen durante un periodo definido o hasta que las elimines. La conservación depende de la finalidad de la cookie y del proveedor.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Más información",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Para saber cómo tratamos los datos personales, consulta nuestra " },
            { type: "link", href: "/privacy-policy", label: "Política de privacidad" },
            { type: "text", text: ". Consultas de privacidad: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "7. Cambios",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Podemos actualizar esta Política de cookies cuando cambie nuestro uso de cookies. La versión más reciente estará siempre disponible en esta página.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versión del documento 1.0. Última actualización: julio de 2026",
};
