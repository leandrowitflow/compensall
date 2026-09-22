import type { LegalDocument } from "./types";

export const termsEs: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Resumen:" },
      { type: "text", text: " Estos Términos y Condiciones rigen su relación con " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Trabajamos con No win, no fee: nuestra asistencia jurídica no le cuesta nada salvo que recuperemos con éxito su compensación. Si la reclamación tiene que ir a litigio, se aplica una comisión adicional de éxito del 20 %, pagadera solo si el caso prospera. Todas las comisiones figuran en la ",
      },
      { type: "link", href: "/prices", label: "Lista de precios" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Definiciones",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Salvo que el contexto de estas Condiciones Generales exija otra interpretación, los términos con mayúscula inicial usados en estas Condiciones («CG») tendrán el significado indicado a continuación:',
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "«Contrato»:" },
              { type: "text", text: " un acuerdo entre el Cliente y " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", formado cuando el Cliente acepta las CG. Para la prestación de los Servicios de Asistencia Jurídica, el Contrato se considera válido cuando el Cliente ha firmado el Formulario de Encargo, además de aceptar estas CG.",
              },
            ],
            [
              { type: "strong", text: "«Compensall»:" },
              { type: "text", text: " significa una persona jurídica (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", registro legal " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), con sede en " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", y correo de oficina " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Normativa de derechos de los pasajeros aéreos»:" },
              {
                type: "text",
                text: " cualquier ley, reglamento, directiva o instrumento similar, dictado a nivel estatal, de la UE, federal, nacional o regional, que establezca normas de compensación dineraria, indemnización o reembolso de pasajeros en casos de overbooking, retraso o cancelación de vuelos.",
              },
            ],
            [
              { type: "strong", text: "«Formulario de Encargo»:" },
              {
                type: "text",
                text: " el acuerdo entre el Cliente y ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " que se celebra después de que el Cliente haya conocido y aceptado las CG, y que se firma electrónicamente o por escrito. En virtud de este Contrato, el Cliente nos otorga autorización exclusiva e irrevocable para iniciar y tramitar una reclamación basada en sus derechos según el Reglamento (CE) n.º 261/2004 del Parlamento Europeo y del Consejo y las resoluciones relacionadas, y para realizar todas las actuaciones necesarias, incluida ceder o transferir la reclamación, recibir pagos y tratar, solicitar o facilitar datos personales si es necesario, aunque exclusivamente con entidades relacionadas y solo para esta finalidad.",
              },
            ],
            [
              { type: "strong", text: "«Cliente(s)»:" },
              {
                type: "text",
                text: " una persona que ha firmado el Formulario de Encargo, ha aceptado las CG y reclama una compensación de vuelo.",
              },
            ],
            [
              { type: "strong", text: "«Compensación»:" },
              { type: "text", text: " el importe total pagado por una aerolínea por una reclamación, ya sea como compensación, transacción extrajudicial, gesto comercial u otro concepto, transferido al Cliente o a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " después de que el Cliente haya aceptado las CG." },
            ],
            [
              { type: "strong", text: "«Servicio de información»:" },
              { type: "text", text: " la prestación de información relacionada con vuelos por " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", incluidos datos sobre aerolíneas, aeropuertos, derechos de los pasajeros aéreos, normas de consumo y otra información de viaje. La información será pertinente para los viajes del Cliente y puede incluir un contexto más amplio, como clasificaciones de aeropuertos o aerolíneas o novedades sobre cambios en los derechos de los pasajeros. Se presta mediante comunicaciones electrónicas, incluido el correo, paneles electrónicos personalizados, sitios web controlados por ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", o aplicaciones móviles." },
            ],
            [
              { type: "strong", text: "«Litigio»:" },
              {
                type: "text",
                text: " si la aerolínea no responde en dos meses, o si su respuesta se considera insatisfactoria tras una valoración interna, la reclamación pasará a litigio. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se reserva el derecho exclusivo de determinar el curso de actuación más adecuado, sin obligación de justificar sus decisiones, aunque el Cliente será informado durante el proceso. Dado el tiempo y los recursos que exige el litigio, se aplicará una comisión adicional de éxito del 20 %, pagadera solo si el resultado es favorable. No se exigirá la presencia del Cliente en el juzgado; sí se esperará su colaboración con los documentos, la información o las pruebas necesarias para sostener el procedimiento.",
              },
            ],
            [
              { type: "strong", text: "«Lista de precios»:" },
              {
                type: "text",
                text: " el anexo de estas CG que concreta las divisas aceptadas, los métodos de pago y todas las comisiones cobradas por ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". La Lista de precios se publica en " },
              { type: "link", href: "/prices", label: "nuestra página de Precios" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "«Reglamento 261/04»:" },
              {
                type: "text",
                text: " Reglamento (CE) n.º 261/2004 del Parlamento Europeo y del Consejo, de 11 de febrero de 2004, por el que se establecen normas comunes sobre compensación y asistencia a los pasajeros aéreos en caso de denegación de embarque y de cancelación o gran retraso de los vuelos.",
              },
            ],
            [
              { type: "strong", text: "«Reclamación»:" },
              {
                type: "text",
                text: " cualquier reclamación de compensación económica frente a una aerolínea al amparo del Reglamento (CE) n.º 261/2004 del Parlamento Europeo y del Consejo.",
              },
            ],
            [
              { type: "strong", text: "«Requisitos de privacidad y protección de datos»:" },
              {
                type: "text",
                text: " todas las leyes y normas aplicables al tratamiento de datos personales y a la privacidad, incluidas, cuando proceda, las orientaciones y códigos de conducta (si los hay) de las autoridades de control competentes, y sus equivalentes en cualquier jurisdicción relevante.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Las definiciones anteriores se usarán al celebrar y ejecutar cualquier documento o transacción relacionado con las CG.",
            },
          ],
        },
      ],
    },
    {
      title: "Artículo 1. Formulario de Encargo",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              {
                type: "text",
                text: " El Cliente acepta las CG (el Formulario de Encargo), que se consideran la base de cualquier otro documento que se celebre entre el Cliente y ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " de forma libre y voluntaria." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " usa un servicio de autenticación en línea para firmas electrónicas avanzadas que cumple los requisitos del artículo 26 del Reglamento de identificación electrónica, reconocido internacionalmente e incluso aceptado por los tribunales, de modo que el Cliente no tiene que imprimir, firmar y devolver el Formulario de Encargo por correo certificado.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " Al celebrar un Contrato, el Cliente confirma que está autorizado y tiene capacidad legal para firmar documentos que vinculen tanto a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " como al Cliente o, si procede, que tiene derecho a firmar en nombre de otra persona (por ejemplo, un menor).",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " El Cliente se compromete a facilitar a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " todos los datos e información necesarios para cobrar la Compensación de Vuelo al transportista aéreo operador.",
              },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " solo estará legitimada para aceptar Compensaciones de Vuelo; no se aceptarán bonos de viaje ni otros servicios ofrecidos por el transportista aéreo operador.",
              },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " El Cliente garantiza que la compensación no se ha cedido a terceros y que no hay ni habrá un litigio pendiente entre el Cliente y la aerolínea sobre el mismo asunto.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " Tras firmar el Formulario de Encargo, el Cliente deberá cesar las negociaciones con la aerolínea respectiva y dirigir cualquier contacto de la aerolínea a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", para que " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " obtenga el mejor resultado posible." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " El Cliente confirma y declara que las CG son prueba directa y expresión de su voluntad real, que deben respetar los transportistas aéreos operadores. El Cliente acuerda con ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " que todos los pagos de Compensación de Vuelo hechos por los transportistas operadores en Reclamaciones de " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " se realicen directamente a las cuentas bancarias de " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " o a otras cuentas acordadas entre " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " y el Cliente." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " El Cliente también acepta que " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " le asista en el ejercicio del derecho a defender al Cliente en el cobro de la Compensación de Vuelo.",
              },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Si el Cliente recibe pagos directos o cualquier otra compensación de la aerolínea respectiva después de celebrar el Contrato, está obligado a informar de ello a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " sin demora. Esos pagos se consideran compensación y dan a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " derecho a reclamar la comisión del servicio y la comisión de litigio si ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ha presentado demanda antes de que el Cliente recibiera el pago de la aerolínea.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Artículo 2. Descripción del Servicio de Asistencia Jurídica",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "2.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " presenta la reclamación de compensación del Cliente a la aerolínea que operó el vuelo, con base en el Reglamento 261/2004 o en cualquier otra normativa de derechos de los pasajeros aéreos aplicable a ese vuelo concreto.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Los datos e información del vuelo pueden enviarse a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " a través del sitio web, por correo electrónico o por teléfono." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Para continuar con la reclamación, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " necesita que el Cliente firme el Formulario de Encargo, que puede enviarse por el formulario web, por correo electrónico o por correo postal. Una vez recibido el Formulario de Encargo, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " actuará en su propio nombre y por cuenta propia para reclamar la cesión frente a la aerolínea.",
              },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Si no se alcanza un acuerdo con el transportista aéreo operador respecto de la Reclamación, o en otros casos en los que, a juicio de ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", el cobro de la Compensación de Vuelo sería más eficaz o rápido, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " estará legitimada para emprender acciones legales, lo que aumentará la parte de la Compensación de Vuelo que corresponde a ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", según la " },
              { type: "link", href: "/prices", label: "Lista de precios" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              {
                type: "text",
                text: " Si interviene un representante legal contratado en el litigio, el Cliente acepta otorgar a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " permiso para facilitar al representante legal el acceso a toda la información relevante del caso, y para que el representante legal informe a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " del avance del asunto. Si el tribunal exige certificados de autenticación, poderes, declaraciones, Formularios de Encargo u otra documentación, el Cliente acepta firmarlos. Si el Cliente ya ha firmado un Formulario de Encargo, se acuerda que la reclamación se transfiere automáticamente de nuevo al Cliente antes de firmar esos documentos adicionales.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Si " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " o su representante legal contratado determina que la reclamación no tiene mérito suficiente, el caso se cerrará y se informará al Cliente.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Si " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " o el representante legal contratado inicia un procedimiento judicial, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " cubrirá las costas si se pierde la demanda. Si la demanda prospera o se alcanza una transacción, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " cubrirá las costas que no reembolse la aerolínea." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " El Cliente reconoce que la tramitación de la Reclamación puede llevar bastante tiempo y que " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " no puede influir en la rapidez con la que se haga valer la Reclamación." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artículo 3. Comisiones y pagos",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Nuestro servicio se presta con " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: ", según el " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Acuerdo No win, no fee" },
            { type: "text", text: ". Todas las comisiones aplicables figuran en la " },
            { type: "link", href: "/prices", label: "Lista de precios" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "3.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ofrece asistencia jurídica gratuita, salvo cuando " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " cobra con éxito la compensación. Si la reclamación tiene éxito, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " transferirá al Cliente la parte acordada de la compensación, sujeta a las comisiones aplicables de la Lista de precios.",
              },
            ],
            [
              { type: "strong", text: "3.2." },
              {
                type: "text",
                text: " La parte acordada de la compensación se pagará al Cliente según las opciones de la Lista de precios.",
              },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Si el Cliente ha facilitado información incorrecta o insuficiente necesaria para el pago de la compensación, el pago se devuelve a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", y el Cliente no responde tras varios avisos y esfuerzos razonables de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " para contactarle por medios distintos del correo facilitado, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " tendrá derecho a retener la parte de la compensación que se habría transferido al Cliente.",
              },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Una vez que " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " haya pagado la compensación acordada según las instrucciones y el método de pago elegido por el Cliente, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " no responde de: (i) incidencias con cheques, tarjetas prepago, tarjetas de crédito u otras pérdidas durante el envío al Cliente; ni (ii) las consecuencias de que el Cliente facilite datos bancarios incorrectos, una dirección incorrecta o errores similares, incluida, entre otras, la compensación pagada a un destinatario equivocado. Si la compensación se paga a un destinatario equivocado por error del Cliente, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " no está obligada a recuperarla de forma activa." },
            ],
            [
              { type: "strong", text: "3.5." },
              {
                type: "text",
                text: " No pueden reclamarse intereses por el periodo entre la recepción y el pago de la compensación. ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " se reserva el derecho a retener cualquier interés recuperado de la aerolínea." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " no responde de ninguna compensación, daño o reclamación relacionada si no puede transferir el pago al Cliente por un acontecimiento fuera de su control razonable, incluidas, entre otras, huelgas, conflictos laborales, catástrofes naturales, guerra, disturbios, sabotaje intencionado, cumplimiento de leyes u órdenes gubernamentales, reglamentos, disposiciones o instrucciones, accidentes, fallos de instalaciones o maquinaria, incendios, inundaciones o tormentas.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Como el domicilio social de " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " está en Portugal, el importe del impuesto sobre el valor añadido (IVA), si procede, lo determina la legislación portuguesa según el tipo legalmente establecido.",
              },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " En cuentas de la Zona Única de Pagos en Euros (SEPA), todos los pagos se enviarán a la cuenta por transferencia. En una transferencia internacional al Cliente, todas las comisiones bancarias se deducen de la parte de la Compensación de Vuelo del Cliente.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              {
                type: "text",
                text: " Para ahorrar costes bancarios, en una reserva compartida o en otros casos (por ejemplo, padres que cobran por los hijos), ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " transferirá todos los pagos a una sola cuenta si el Cliente lo permite, o si se indica una sola cuenta al enviar los datos a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ". Quien reciba dinero por otras personas está obligado a liquidar con ellas y, en ese caso, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " no asume el riesgo de impago." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " La Compensación de Vuelo y cualquier otro pago solo los hará " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a los beneficiarios finales legitimados para reclamar la Compensación de Vuelo. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " no hará pagos a intermediarios, agencias, representantes u otros terceros salvo que aporten documentación escrita específica que confirme de forma clara e inequívoca su autoridad para aceptar pagos en nombre del beneficiario final. Si hay duda sobre el derecho a recibir pagos, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se reserva el derecho a pedir pruebas adicionales y puede, a su discreción, negarse a pagar directamente a esas personas.",
              },
            ],
            [
              { type: "strong", text: "3.11." },
              {
                type: "text",
                text: " Si el Cliente recibe cualquier pago o cualquier otro tipo de Compensación de Vuelo, por ejemplo un bono de vuelo, del transportista aéreo operador después de contratar los servicios de ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", el Cliente está obligado a informar a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " de inmediato. En ese caso, el Cliente pagará a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " la remuneración indicada en la Lista de precios en un plazo de 10 (diez) días desde el día en que reciba la Compensación de Vuelo del transportista aéreo operador, a la cuenta bancaria indicada en el sitio web de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " o a cualquier otra cuenta que " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " facilite por escrito." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artículo 4. Protección de datos personales",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " El Cliente garantiza que los datos e información facilitados a " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " en relación con la Reclamación son correctos, completos, verdaderos y no engañosos. El Cliente mantendrá indemne a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " frente a cualquier reclamación derivada de información incorrecta facilitada por el Cliente o de una falta de cooperación o una cooperación inadecuada del Cliente.",
              },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " también puede recoger datos personales para fines adicionales, como análisis estadístico, administración, comunicación, gestión informática y seguridad, seguridad física, procesos de autenticación y autorización, sistemas de soporte, coordinación interna de proyectos y equipos, y actividades organizativas. Todos los datos personales se recogen conforme al Reglamento general de protección de datos, Reglamento (UE) 2016/679 (véase nuestra ",
              },
              { type: "link", href: "/privacy-policy", label: "Política de privacidad" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " El Cliente facilita a " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " datos personales conforme al Reglamento general de protección de datos u otras leyes de protección de datos pertinentes, otorgando consentimiento explícito para el tratamiento y uso de estos datos en el marco del Contrato. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " solo compartirá datos personales con terceros cuando: (i) el Cliente haya dado su consentimiento; (ii) sea necesario para una finalidad directamente vinculada al motivo inicial de la recogida; (iii) sea necesario para preparar, negociar y ejecutar el acuerdo con el Cliente; (iv) lo exija una obligación legal, una orden administrativa o judicial; (v) sea necesario para formular o defender pretensiones jurídicas o responder a acciones legales; o (vi) sea necesario para prevenir un uso indebido u otras actividades ilícitas, como ataques deliberados, a fin de garantizar la protección de los datos.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Como parte de la relación contractual establecida en estas CG, " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " puede, de vez en cuando, enviar al Cliente comunicaciones relacionadas con el servicio usando los datos de contacto facilitados, incluido el correo electrónico. Esas comunicaciones pueden incluir información sobre otras reclamaciones potenciales a las que el Cliente pueda tener derecho según la normativa de derechos de los pasajeros aéreos, a partir del análisis de ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " de datos de casos anteriores o de información de vuelos de acceso público. Esos mensajes pretenden únicamente ayudar al Cliente a ejercer sus derechos y se consideran dentro del interés legítimo de ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " en prestar servicios pertinentes y relacionados.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "El Cliente puede darse de baja de estas comunicaciones en cualquier momento pulsando el enlace de cancelación de cada mensaje o contactando con ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " en " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Artículo 5. Derecho de desistimiento",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              {
                type: "text",
                text: " La relación contractual entre las partes termina cuando el Contrato se ha ejecutado por completo, es decir, cuando el pago previsto en el Contrato se ha realizado íntegramente.",
              },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Si usted tiene la condición de consumidor según la normativa de consumo de la UE, es decir, es una persona física que realiza un acto jurídico con un fin que no es comercial ni una actividad profesional independiente, tiene un derecho legal de desistimiento.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " El Contrato se resuelve de inmediato: (i) cuando " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " considera que la Reclamación puede no prosperar tras una revisión en profundidad, y se informa al Cliente de esa decisión; (ii) en caso de datos o información incorrectos y de conducta fraudulenta del Cliente, por decisión de ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: "; o (iii) si, en un plazo de 14 (catorce) días desde la celebración del Contrato, el Cliente, siendo consumidor, presenta un aviso de desistimiento por correo electrónico. El derecho a resolver el Contrato por este motivo se extingue de forma anticipada si el Contrato se ha ejecutado por completo antes de que venza ese plazo.",
              },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " Puede desistir de su aceptación de nuestro Contrato en un plazo de 14 días desde su celebración (por ejemplo, por carta o correo electrónico) sin necesidad de indicar motivos. Para ejercer el derecho de desistimiento, debe comunicarse dentro de ese plazo de 14 días y debe indicar claramente que desea desistir del Contrato. Por la naturaleza del servicio prestado, no puede desistir de nuestro Contrato una vez que le hayamos informado de que la aerolínea ha aceptado la reclamación, porque en ese caso ya hemos prestado el servicio solicitado. El desistimiento puede enviarse a nuestro correo ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Artículo 6. Disposiciones finales",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "6.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " está autorizada a modificar las CG y a establecer condiciones adicionales en cualquier momento y sin preaviso, pero se esforzará por mantener informado al Cliente de esos cambios. Si algún cambio es negativo desde la perspectiva del Cliente, el Cliente deberá aprobarlo para que las CG modificadas le resulten aplicables.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " A las CG, al Contrato y a cualquier otro documento celebrado en relación con las CG y el Contrato se les aplica el Derecho de la República de Portugal, salvo pacto en contrario en el documento concreto. El Cliente, como consumidor, también tiene derecho a reclamar la protección de las normas imperativas del país en el que reside.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " usará los datos personales del Cliente y, si procede, de sus empleados, exclusivamente para hacer valer la Reclamación. Toda la información sobre el alcance y la forma de la recogida, el almacenamiento y el uso de datos personales figura en nuestra ",
              },
              { type: "link", href: "/privacy-policy", label: "Política de privacidad" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              {
                type: "text",
                text: " Cuando el Cliente sea una persona jurídica, garantiza y declara que: (i) los datos personales facilitados a ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se han recogido y se facilitan en todo momento conforme a los Requisitos de privacidad y protección de datos; y (ii) a efectos de este Contrato, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " actuará como encargado del tratamiento y no como responsable (en el sentido de esos Requisitos) respecto de todas las actividades de tratamiento realizadas al amparo de este Contrato.",
              },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Si un tribunal o un tribunal arbitral declara ilegal, nula o inaplicable alguna disposición de las CG, las demás disposiciones seguirán en pleno vigor. Cualquier disposición declarada ilegal, nula o inaplicable solo en parte, o en cierto grado, seguirá en vigor en la medida en que no se haya declarado ilegal, nula o inaplicable. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " modificará las CG sustituyendo esas disposiciones por otras legales, válidas y aplicables que produzcan un resultado lo más próximo posible a la intención de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " y del Cliente." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " está autorizada a modificar estas CG y la Lista de precios y a establecer condiciones adicionales en cualquier momento y sin notificación. No obstante, los cambios con un efecto negativo para el Cliente no le serán aplicables salvo que el Cliente los acepte.",
              },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Cuando las leyes nacionales restrinjan o prohíban la cesión de reclamaciones, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " actuará en cooperación con representantes legales locales conforme a la normativa local aplicable.",
              },
            ],
            [
              { type: "strong", text: "6.8." },
              {
                type: "text",
                text: " Los derechos y obligaciones relacionados total o parcialmente con cualquier reclamación presentada pueden transferirse sin restricción por ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " a cualquier entidad del grupo de empresas de " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", y por " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " a terceros." },
            ],
          ],
        },
      ],
    },
    {
      title: "Anexo n.º 1 - Lista de precios",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "La Lista de precios forma parte integrante de estas CG y se publica en " },
            { type: "link", href: "/prices", label: "nuestra página de Precios" },
            {
              type: "text",
              text: ". Concreta las divisas aceptadas, los métodos de pago disponibles y todas las comisiones cobradas por ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: ", incluida la comisión de éxito y la comisión adicional de litigio del 20 %." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Las condiciones comerciales de nuestro régimen de comisiones figuran en el " },
            { type: "link", href: "/documents/no-win-no-fee", label: "Acuerdo No win, no fee" },
            { type: "text", text: ". Las preguntas sobre estas CG pueden enviarse a " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Versión del documento 4.0. Última actualización: septiembre de 2026",
};
