type JsonRpcResponse<T> = {
  result?: T;
  error?: { message: string; data?: { message?: string } };
};

export type OdooConfig = {
  url: string;
  db: string;
  login: string;
  password: string;
  companyId: number | null;
  companyName: string | null;
  utmSourceName: string;
  utmMediumName: string;
  utmCampaignName: string;
};

export function getOdooConfig(): OdooConfig | null {
  const url = process.env.ODOO_URL?.replace(/\/$/, "");
  const db = process.env.ODOO_DB?.trim();
  const login = process.env.ODOO_LOGIN?.trim();
  const password = process.env.ODOO_PASSWORD;

  if (!url || !db || !login || !password) {
    return null;
  }

  const companyIdRaw = process.env.ODOO_COMPANY_ID?.trim();
  const companyId = companyIdRaw ? Number.parseInt(companyIdRaw, 10) : null;

  return {
    url,
    db,
    login,
    password,
    companyId: Number.isFinite(companyId) ? companyId : null,
    companyName: process.env.ODOO_COMPANY_NAME?.trim() || null,
    utmSourceName: process.env.ODOO_UTM_SOURCE?.trim() || "Compensall Website",
    utmMediumName: process.env.ODOO_UTM_MEDIUM?.trim() || "Claim Form",
    utmCampaignName: process.env.ODOO_UTM_CAMPAIGN?.trim() || "Website Claim",
  };
}

export function isOdooConfigured(): boolean {
  return getOdooConfig() !== null;
}

async function jsonRpc<T>(config: OdooConfig, service: string, method: string, args: unknown[]): Promise<T> {
  const response = await fetch(`${config.url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Date.now(),
    }),
  });

  const payload = (await response.json()) as JsonRpcResponse<T>;
  if (payload.error) {
    throw new Error(payload.error.data?.message ?? payload.error.message);
  }

  return payload.result as T;
}

async function authenticate(config: OdooConfig): Promise<number> {
  const uid = await jsonRpc<number | false>(config, "common", "authenticate", [
    config.db,
    config.login,
    config.password,
    {},
  ]);

  if (!uid) {
    throw new Error("Odoo authentication failed.");
  }

  return uid;
}

async function executeKw<T>(
  config: OdooConfig,
  uid: number,
  model: string,
  method: string,
  args: unknown[] = [],
  kwargs: Record<string, unknown> = {},
): Promise<T> {
  return jsonRpc<T>(config, "object", "execute_kw", [
    config.db,
    uid,
    config.password,
    model,
    method,
    args,
    kwargs,
  ]);
}

async function resolveCompanyId(config: OdooConfig, uid: number): Promise<number | undefined> {
  if (config.companyId) {
    return config.companyId;
  }

  if (!config.companyName) {
    return undefined;
  }

  const matches = await executeKw<Array<{ id: number; name: string }>>(
    config,
    uid,
    "res.company",
    "search_read",
    [[["name", "ilike", config.companyName]]],
    { fields: ["id", "name"], limit: 1 },
  );

  return matches[0]?.id;
}

async function resolveUtmId(
  config: OdooConfig,
  uid: number,
  model: "utm.source" | "utm.medium" | "utm.campaign",
  name: string,
): Promise<number | undefined> {
  const matches = await executeKw<Array<{ id: number }>>(
    config,
    uid,
    model,
    "search_read",
    [[["name", "=", name]]],
    { fields: ["id"], limit: 1 },
  );

  if (matches[0]?.id) {
    return matches[0].id;
  }

  return executeKw<number>(config, uid, model, "create", [{ name }]);
}

export type OdooCrmLeadSummary = {
  id: number;
  name: string;
  contactName: string | null;
  emailFrom: string | null;
  stageName: string | null;
  crmUrl: string;
};

async function readCrmLead(config: OdooConfig, uid: number, leadId: number): Promise<OdooCrmLeadSummary> {
  const rows = await executeKw<
    Array<{
      id: number;
      name: string;
      contact_name: string | false;
      email_from: string | false;
      stage_id: [number, string] | false;
    }>
  >(config, uid, "crm.lead", "read", [[leadId], ["id", "name", "contact_name", "email_from", "stage_id"]]);

  const lead = rows[0];
  if (!lead) {
    throw new Error(`Odoo lead ${leadId} was not found after creation.`);
  }

  return {
    id: lead.id,
    name: lead.name,
    contactName: typeof lead.contact_name === "string" ? lead.contact_name : null,
    emailFrom: typeof lead.email_from === "string" ? lead.email_from : null,
    stageName: Array.isArray(lead.stage_id) ? lead.stage_id[1] : null,
    crmUrl: `${config.url}/odoo/crm/${lead.id}`,
  };
}

export async function odooCreateCrmLead(values: Record<string, unknown>): Promise<OdooCrmLeadSummary> {
  const config = getOdooConfig();
  if (!config) {
    throw new Error("Odoo is not configured.");
  }

  const uid = await authenticate(config);
  const companyId = await resolveCompanyId(config, uid);

  const [sourceId, mediumId, campaignId] = await Promise.all([
    resolveUtmId(config, uid, "utm.source", config.utmSourceName),
    resolveUtmId(config, uid, "utm.medium", config.utmMediumName),
    resolveUtmId(config, uid, "utm.campaign", config.utmCampaignName),
  ]);

  const leadValues: Record<string, unknown> = {
    ...values,
    type: "lead",
  };

  if (companyId) {
    leadValues.company_id = companyId;
  }
  if (sourceId) {
    leadValues.source_id = sourceId;
  }
  if (mediumId) {
    leadValues.medium_id = mediumId;
  }
  if (campaignId) {
    leadValues.campaign_id = campaignId;
  }

  const leadId = await executeKw<number>(config, uid, "crm.lead", "create", [leadValues]);
  return readCrmLead(config, uid, leadId);
}
