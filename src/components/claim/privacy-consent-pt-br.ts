const privacyConsentPtBr = {
  noticeLabel: "Aviso de privacidade:",
  notice:
    "A Compensall trata seus dados pessoais de acordo com o RGPD e, quando a lei brasileira se aplica, com a LGPD. Este texto explica como e por que tratamos esses dados.",
  controllerTitle: "1. Responsável pelo tratamento",
  controllerBody: (name: string, nif: string, brand: string, address: string) =>
    `${name} (NIF ${nif}), que atua como ${brand}, é a responsável pelos seus dados pessoais. Endereço: ${address}. Contato:`,
  collectTitle: "2. Dados que coletamos",
  collectIntro: "Para cuidar do seu pedido de direitos de passageiro, coletamos:",
  identity: ["Identificação:", "Nome, data de nascimento e documento."],
  contact: ["Contato:", "E-mail, telefone e endereço."],
  flight: ["Voo:", "Cartão de embarque, número do voo, rota, localizador e o que aconteceu."],
  financial: ["Dados financeiros:", "Conta bancária para transferir o que for recuperado."],
  technical: ["Dados técnicos:", "Endereço IP, navegador e identificadores do aparelho, coletados automaticamente."],
  basisTitle: "3. Base do tratamento",
  basisIntro: "Tratamos seus dados com estas bases:",
  contract: ["Contrato:", "Para cumprir o acordo No win, no fee."],
  interests: ["Interesse legítimo:", "Para buscar assistência, reembolso, reacomodação ou a compensação da ANAC em seu nome."],
  obligation: ["Obrigação legal:", "Para cumprir a lei aplicável."],
  consent: ["Consentimento:", "Para mensagens de marketing, que você pode cancelar."],
  sharingTitle: "4. Com quem compartilhamos",
  sharingIntro: "Podemos compartilhar seus dados com:",
  sharing: [
    "Empresas aéreas e autoridades de aviação, para o pedido.",
    "Advogados e representantes.",
    "Quem processa o pagamento do valor recuperado.",
    "Fornecedores de tecnologia, com contrato de tratamento de dados.",
  ],
  neverSell: "Não vendemos seus dados pessoais.",
  retentionTitle: "5. Por quanto tempo guardamos",
  retention:
    "Guardamos os dados por 7 anos depois de encerrado o caso, para obrigações legais e contábeis. Registros técnicos ficam por 12 meses.",
  rightsTitle: "6. Seus direitos",
  rightsIntro: "Você pode pedir:",
  rights: [
    { right: "Acesso", desc: "Uma cópia dos seus dados." },
    { right: "Correção", desc: "Corrigir o que estiver errado." },
    { right: "Eliminação", desc: "Apagar os dados, quando a lei permitir." },
    { right: "Limitação", desc: "Limitar o uso dos dados." },
    { right: "Portabilidade", desc: "Receber os dados em formato legível por máquina." },
    { right: "Oposição", desc: "Se opor a um tratamento baseado em interesse legítimo." },
  ],
  rightsContact: "Para exercer esses direitos, escreva para",
  rightsAuthority:
    "Você também pode reclamar a uma autoridade de proteção de dados. No Brasil, a ANPD. A Compensall, empresa em Portugal, também responde perante a CNPD.",
  consentTitle: "7. Consentimento",
  consentBody:
    "Ao enviar o pedido pela Compensall, você confirma que leu este aviso e consente no tratamento dos seus dados para buscar os direitos do voo, inclusive os da Resolução ANAC nº 400 quando ela se aplica.",
  footer: "Versão 1.4 do documento. Atualizado em janeiro de 2026.",
};

export default privacyConsentPtBr;
