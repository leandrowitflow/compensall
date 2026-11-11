import type { LegalDocument, LegalTableBlock } from "./types";

const PHRASES: Array<[string, string]> = [
  [
    "previstos no Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho e na jurisprudência relacionada",
    "previstos na Resolução ANAC nº 400, de 13 de dezembro de 2016, e no Código de Defesa do Consumidor",
  ],
  [
    "o Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho, de 11 de fevereiro de 2004, que estabelece regras comuns para a indemnização e a assistência aos passageiros dos transportes aéreos em caso de recusa de embarque e de cancelamento ou atraso considerável dos voos.",
    "a Resolução ANAC nº 400, de 13 de dezembro de 2016, que dispõe sobre as condições gerais de transporte aéreo, incluindo assistência material, reacomodação, reembolso e a compensação por preterição de embarque.",
  ],
  [
    "qualquer pedido de indemnização apresentado contra uma companhia aérea ao abrigo do Regulamento (CE) n.º 261/2004 do Parlamento Europeu e do Conselho.",
    "qualquer pedido apresentado contra uma companhia aérea com base na Resolução ANAC nº 400 e no Código de Defesa do Consumidor.",
  ],
  [
    "com base no Regulamento 261/2004 ou noutra regulamentação de direitos dos passageiros aéreos aplicável ao voo em causa.",
    "com base na Resolução ANAC nº 400 ou noutra regulamentação de direitos dos passageiros aéreos aplicável ao voo em causa.",
  ],
  ['"Regulamento 261/04":', '"Resolução ANAC nº 400":'],
  [
    "Ler informação do cartão de embarque e avaliar elegibilidade ao abrigo do UK261, do CE 261/2004 e regras relacionadas.",
    "Ler as informações do cartão de embarque e avaliar os direitos com base na Resolução ANAC nº 400 e nas regras aplicáveis ao voo.",
  ],
];

function brazilianWording(text: string): string {
  let next = text;
  for (const [from, to] of PHRASES) {
    next = next.replaceAll(from, to);
  }
  return next
    .replaceAll("indemnização", "indenização")
    .replaceAll("Indemnização", "Indenização")
    .replaceAll("ao abrigo do", "com base no")
    .replaceAll("ao abrigo da", "com base na")
    .replaceAll("ao abrigo de", "com base em")
    .replaceAll("contacto", "contato")
    .replaceAll("Contacto", "Contato")
    .replaceAll("connosco", "conosco")
    .replaceAll("equipa", "equipe")
    .replaceAll("ficheiro", "arquivo")
    .replaceAll("Ficheiro", "Arquivo")
    .replaceAll("registo", "registro")
    .replaceAll("ecrã", "tela");
}

function isFeeTable(block: LegalTableBlock): boolean {
  return block.rows.some((row) => row.category.includes("€"));
}

/** Portuguese legal text, rewritten so a Brazilian reader is not told the claim is an EC 261 tariff. */
export function toBrazilianLegalDocument(document: LegalDocument): LegalDocument {
  const copy = structuredClone(document);

  const walk = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (!value || typeof value !== "object") return;

    const record = value as Record<string, unknown>;
    if (record.type === "table" && Array.isArray(record.rows) && isFeeTable(record as LegalTableBlock)) {
      record.headers = ["Valor recuperado", "Taxa de sucesso"];
      record.rows = [{ category: "Qualquer valor recuperado para você", purpose: "30% + IVA" }];
    }

    for (const key of Object.keys(record)) {
      const child = record[key];
      if (typeof child === "string") {
        record[key] = brazilianWording(child);
      } else {
        walk(child);
      }
    }
  };

  walk(copy);
  return copy;
}
