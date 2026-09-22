import type { LegalDocument } from "./types";

export const privacyPolicyEs: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Última actualización:" },
      {
        type: "text",
        text: " julio de 2026. Esta Política de privacidad explica cómo Compensall recoge, usa y protege los datos personales cuando usa nuestro sitio web y nuestros servicios de reclamación.",
      },
    ],
  },
  sections: [
    {
      title: "1. Quiénes somos",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "strongBrand", field: "legalEntityName" },
            { type: "text", text: " (NIF " },
            { type: "brand", field: "legalEntityNif" },
            { type: "text", text: "), que opera como " },
            { type: "strongBrand", field: "brandName" },
            { type: "text", text: ' («' },
            { type: "brand", field: "brandName" },
            { type: "text", text: '", «nosotros»), es el responsable del tratamiento de los datos personales tratados a través de este sitio web y de los servicios relacionados. Domicilio social: ' },
            { type: "brand", field: "legalEntityAddress" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Consultas de privacidad: " },
            { type: "email" },
          ],
        },
      ],
    },
    {
      title: "2. Ámbito de esta política",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Esta política se aplica a los visitantes del sitio, a quienes inician o presentan una reclamación de compensación y a cualquiera que nos contacte. Si presenta una reclamación, también se le pedirá que revise nuestro documento de ",
            },
            {
              type: "link",
              href: "/documents/privacy-data-consent",
              label: "Privacidad y consentimiento de datos",
            },
            { type: "text", text: " específico de la reclamación antes de firmar." },
          ],
        },
      ],
    },
    {
      title: "3. Datos que recogemos",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Según cómo use Compensall, podemos tratar:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Datos de identidad y contacto:" },
              { type: "text", text: " nombre, correo electrónico, teléfono y dirección postal." },
            ],
            [
              { type: "strong", text: "Datos de la reclamación:" },
              {
                type: "text",
                text: " subidas de la tarjeta de embarque, número de vuelo, ruta, localizador, detalles de la incidencia, información de pasajeros y firmas.",
              },
            ],
            [
              { type: "strong", text: "Datos financieros:" },
              { type: "text", text: " datos bancarios usados para pagar la compensación recuperada." },
            ],
            [
              { type: "strong", text: "Datos técnicos:" },
              {
                type: "text",
                text: " dirección IP, tipo de navegador, información del dispositivo, páginas visitadas y origen de la visita.",
              },
            ],
            [
              { type: "strong", text: "Comunicaciones:" },
              { type: "text", text: " mensajes que envía a soporte y registros de la correspondencia de la reclamación." },
            ],
          ],
        },
      ],
    },
    {
      title: "4. Cómo usamos sus datos",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Usamos los datos personales para:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Operar el sitio web y prestar nuestro servicio de reclamación." }],
            [
              {
                type: "text",
                text: "Leer la información de la tarjeta de embarque y valorar el derecho según UK261, el Reglamento CE 261/2004 y normas relacionadas.",
              },
            ],
            [
              {
                type: "text",
                text: "Preparar, presentar y gestionar reclamaciones de compensación ante las aerolíneas en su nombre.",
              },
            ],
            [{ type: "text", text: "Comunicarnos con usted sobre el estado de la reclamación, documentos y pagos." }],
            [{ type: "text", text: "Cumplir obligaciones legales, regulatorias y contables." }],
            [{ type: "text", text: "Mejorar la seguridad, prevenir el fraude y mantener la calidad del servicio." }],
            [
              {
                type: "text",
                text: "Enviar actualizaciones del servicio y, cuando esté permitido, comunicaciones de marketing.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "5. Bases jurídicas",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Según el RGPD del Reino Unido y el RGPD de la UE, nos basamos en:" }],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "Contrato:" },
              { type: "text", text: " para prestar el servicio de reclamación que solicita." },
            ],
            [
              { type: "strong", text: "Intereses legítimos:" },
              {
                type: "text",
                text: " para operar, proteger y mejorar la plataforma y tramitar las reclamaciones con eficacia.",
              },
            ],
            [
              { type: "strong", text: "Obligación legal:" },
              { type: "text", text: " cuando la conservación o la comunicación sea exigida por ley." },
            ],
            [
              { type: "strong", text: "Consentimiento:" },
              {
                type: "text",
                text: " para marketing opcional y cookies no esenciales, cuando proceda.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "6. Cesión de sus datos",
      blocks: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Podemos compartir datos con:" }],
        },
        {
          type: "list",
          items: [
            [{ type: "text", text: "Aerolíneas, reguladores y organismos de resolución implicados en su reclamación." }],
            [{ type: "text", text: "Asesores y representantes legales que actúen en su reclamación." }],
            [{ type: "text", text: "Proveedores de pago y bancos que gestionen las transferencias de compensación." }],
            [{ type: "text", text: "Proveedores de hosting, email, almacenamiento e informática, bajo encargos de tratamiento." }],
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "No vendemos sus datos personales." }],
        },
      ],
    },
    {
      title: "7. Transferencias internacionales",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Algunos proveedores pueden tratar datos fuera del Reino Unido o del EEE. En ese caso, usamos garantías adecuadas, como las cláusulas contractuales tipo u otras protecciones exigidas por la ley aplicable.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Conservación",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Los expedientes de reclamación se conservan en general hasta 7 años después de cerrar el asunto. Los registros técnicos se guardan menos tiempo, salvo que se necesiten para investigaciones de seguridad. Eliminamos o anonimizamos los datos cuando ya no son necesarios.",
            },
          ],
        },
      ],
    },
    {
      title: "9. Sus derechos",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Puede tener derecho a acceder, rectificar, suprimir, limitar, oponerse o portar sus datos personales, y a retirar el consentimiento cuando el tratamiento se base en él. Contacte con ",
            },
            { type: "email" },
            { type: "text", text: ". También puede presentar una reclamación ante su autoridad de protección de datos." },
          ],
        },
      ],
    },
    {
      title: "10. Seguridad",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Usamos cifrado, controles de acceso e infraestructura segura para proteger los datos personales. Ningún servicio en línea puede garantizarse como completamente seguro, pero trabajamos para reducir el riesgo de forma proporcional a la sensibilidad de la información que tratamos.",
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
            { type: "text", text: "Usamos cookies y tecnologías similares, como se describe en nuestra " },
            { type: "link", href: "/cookies", label: "Política de cookies" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "12. Cambios",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Podemos actualizar esta política de vez en cuando. Los cambios relevantes se publicarán en esta página con una fecha actualizada.",
            },
          ],
        },
      ],
    },
  ],
  footer: "Versión del documento 1.0. Última actualización: julio de 2026",
};
