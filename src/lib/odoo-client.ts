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
  companyName: string;
  brandName: string;
  brandTagName: string;
  utmSourceName: string;
  utmMediumName: string;
  utmCampaignName: string;
  utmMediumIncompleteName: string;
  incompleteTagName: string | null;
  submittedTagName: string | null;
};

type TagModel = "crm.tag" | "helpdesk.tag";

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
    companyName: process.env.ODOO_COMPANY_NAME?.trim() || "Compensall",
    brandName: process.env.ODOO_BRAND?.trim() || "Compensall",
    brandTagName: process.env.ODOO_BRAND_TAG?.trim() || "AA",
    utmSourceName: process.env.ODOO_UTM_SOURCE?.trim() || "Compensall Website",
    utmMediumName: process.env.ODOO_UTM_MEDIUM?.trim() || "Claim Form",
    utmCampaignName: process.env.ODOO_UTM_CAMPAIGN?.trim() || "Website Claim",
    utmMediumIncompleteName:
      process.env.ODOO_UTM_MEDIUM_INCOMPLETE?.trim() || "Claim Form - Incomplete",
    incompleteTagName: process.env.ODOO_TAG_INCOMPLETE?.trim() || "Form Incomplete",
    submittedTagName: process.env.ODOO_TAG_SUBMITTED?.trim() || "Claim Submitted",
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

async function companyKwargs(
  config: OdooConfig,
  uid: number,
  companyId: number | undefined,
): Promise<Record<string, unknown>> {
  if (!companyId) {
    return {};
  }

  const users = await executeKw<Array<{ company_ids: number[] }>>(
    config,
    uid,
    "res.users",
    "read",
    [[uid], ["company_ids"]],
  );

  const allowedCompanyIds = users[0]?.company_ids ?? [companyId];
  return {
    context: {
      allowed_company_ids: allowedCompanyIds,
      company_id: companyId,
      force_company: companyId,
    },
  };
}

async function resolveCompanyId(config: OdooConfig, uid: number): Promise<number | undefined> {
  if (config.companyId) {
    return config.companyId;
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

async function resolveAccessibleCompanyId(
  config: OdooConfig,
  uid: number,
): Promise<number | undefined> {
  const companyId = await resolveCompanyId(config, uid);
  if (!companyId) {
    return undefined;
  }

  const users = await executeKw<Array<{ company_ids: number[] }>>(
    config,
    uid,
    "res.users",
    "read",
    [[uid], ["company_ids"]],
  );

  const allowedCompanyIds = users[0]?.company_ids ?? [];
  if (!allowedCompanyIds.includes(companyId)) {
    console.warn(
      `Odoo user lacks access to company_id=${companyId} (${config.companyName}). ` +
        `Records will still be tagged with brand "${config.brandName}" and tag "${config.brandTagName}". ` +
        `Grant the integration user access to the Compensall company to populate company_id.`,
    );
    return undefined;
  }

  return companyId;
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

async function resolveTagId(
  config: OdooConfig,
  uid: number,
  model: TagModel,
  name: string | null | undefined,
): Promise<number | undefined> {
  if (!name) {
    return undefined;
  }

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

async function applyCompensallIdentity(
  config: OdooConfig,
  uid: number,
  values: Record<string, unknown>,
  options: {
    tagModel: TagModel;
    extraTagNames?: Array<string | null | undefined>;
    includeBrand?: boolean;
  },
): Promise<Record<string, unknown>> {
  const companyId = await resolveAccessibleCompanyId(config, uid);
  const tagNames = [config.brandTagName, ...(options.extraTagNames ?? [])];
  const tagIds = (
    await Promise.all(tagNames.map((name) => resolveTagId(config, uid, options.tagModel, name)))
  ).filter((id): id is number => typeof id === "number");

  const identityValues: Record<string, unknown> = {
    ...values,
  };

  if (companyId) {
    identityValues.company_id = companyId;
  }

  if (options.includeBrand) {
    identityValues.brand = config.brandName;
  }

  if (tagIds.length > 0) {
    identityValues.tag_ids = [[6, 0, [...new Set(tagIds)]]];
  }

  return identityValues;
}

export type OdooCrmLeadSummary = {
  id: number;
  name: string;
  contactName: string | null;
  emailFrom: string | null;
  stageName: string | null;
  companyId: number | null;
  companyName: string | null;
  tagIds: number[];
  crmUrl: string;
};

export type OdooHelpdeskTicketSummary = {
  id: number;
  name: string;
  brand: string | null;
  companyId: number | null;
  companyName: string | null;
  tagIds: number[];
  ticketUrl: string;
  partnerName: string | null;
  partnerEmail: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  flightNumber: string | null;
  flightDate: string | null;
  departedFrom: string | null;
  finalDestination: string | null;
  disruptionType: string | null;
  delayDuration: string | null;
  airline: string | null;
};

async function readCrmLead(config: OdooConfig, uid: number, leadId: number): Promise<OdooCrmLeadSummary> {
  const rows = await executeKw<
    Array<{
      id: number;
      name: string;
      contact_name: string | false;
      email_from: string | false;
      stage_id: [number, string] | false;
      company_id: [number, string] | false;
      tag_ids: number[];
    }>
  >(
    config,
    uid,
    "crm.lead",
    "read",
    [[leadId], ["id", "name", "contact_name", "email_from", "stage_id", "company_id", "tag_ids"]],
  );

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
    companyId: Array.isArray(lead.company_id) ? lead.company_id[0] : null,
    companyName: Array.isArray(lead.company_id) ? lead.company_id[1] : null,
    tagIds: Array.isArray(lead.tag_ids) ? lead.tag_ids : [],
    crmUrl: `${config.url}/odoo/crm/${lead.id}`,
  };
}

async function readHelpdeskTicket(
  config: OdooConfig,
  uid: number,
  ticketId: number,
): Promise<OdooHelpdeskTicketSummary> {
  const rows = await executeKw<
    Array<{
      id: number;
      name: string;
      brand: string | false;
      company_id: [number, string] | false;
      tag_ids: number[];
      partner_name: string | false;
      partner_email: string | false;
      x_studio_first_name: string | false;
      x_studio_last_name: string | false;
      x_studio_email: string | false;
      x_studio_flight_number: string | false;
      x_studio_flight_date: string | false;
      x_studio_departed_from: string | false;
      x_studio_final_destination: string | false;
      x_studio_disruption_type: string | false;
      x_studio_delay_duration: string | false;
      x_studio_airline: string | false;
    }>
  >(
    config,
    uid,
    "helpdesk.ticket",
    "read",
    [
      [ticketId],
      [
        "id",
        "name",
        "brand",
        "company_id",
        "tag_ids",
        "partner_name",
        "partner_email",
        "x_studio_first_name",
        "x_studio_last_name",
        "x_studio_email",
        "x_studio_flight_number",
        "x_studio_flight_date",
        "x_studio_departed_from",
        "x_studio_final_destination",
        "x_studio_disruption_type",
        "x_studio_delay_duration",
        "x_studio_airline",
      ],
    ],
  );

  const ticket = rows[0];
  if (!ticket) {
    throw new Error(`Odoo helpdesk ticket ${ticketId} was not found after creation.`);
  }

  const asString = (value: string | false): string | null =>
    typeof value === "string" && value.length > 0 ? value : null;

  return {
    id: ticket.id,
    name: ticket.name,
    brand: asString(ticket.brand),
    companyId: Array.isArray(ticket.company_id) ? ticket.company_id[0] : null,
    companyName: Array.isArray(ticket.company_id) ? ticket.company_id[1] : null,
    tagIds: Array.isArray(ticket.tag_ids) ? ticket.tag_ids : [],
    ticketUrl: `${config.url}/odoo/helpdesk/${ticket.id}`,
    partnerName: asString(ticket.partner_name),
    partnerEmail: asString(ticket.partner_email),
    firstName: asString(ticket.x_studio_first_name),
    lastName: asString(ticket.x_studio_last_name),
    email: asString(ticket.x_studio_email),
    flightNumber: asString(ticket.x_studio_flight_number),
    flightDate: asString(ticket.x_studio_flight_date),
    departedFrom: asString(ticket.x_studio_departed_from),
    finalDestination: asString(ticket.x_studio_final_destination),
    disruptionType: asString(ticket.x_studio_disruption_type),
    delayDuration: asString(ticket.x_studio_delay_duration),
    airline: asString(ticket.x_studio_airline),
  };
}

type CreateLeadOptions = {
  utmMediumName?: string;
  extraTagNames?: Array<string | null | undefined>;
};

export async function odooUpdateCrmLead(
  leadId: number,
  values: Record<string, unknown>,
  options: CreateLeadOptions = {},
): Promise<OdooCrmLeadSummary> {
  const config = getOdooConfig();
  if (!config) {
    throw new Error("Odoo is not configured.");
  }

  const uid = await authenticate(config);
  const identityValues = await applyCompensallIdentity(config, uid, values, {
    tagModel: "crm.tag",
    extraTagNames: options.extraTagNames,
  });
  const companyId =
    typeof identityValues.company_id === "number" ? identityValues.company_id : undefined;

  await executeKw<boolean>(
    config,
    uid,
    "crm.lead",
    "write",
    [[leadId], identityValues],
    await companyKwargs(config, uid, companyId),
  );
  return readCrmLead(config, uid, leadId);
}

export async function odooFindLeadBySessionId(sessionId: string): Promise<number | null> {
  const config = getOdooConfig();
  if (!config) {
    return null;
  }

  const uid = await authenticate(config);
  const matches = await executeKw<number[]>(
    config,
    uid,
    "crm.lead",
    "search",
    [[["description", "ilike", `Session: ${sessionId}`]]],
    { limit: 1, order: "id desc" },
  );

  return matches[0] ?? null;
}

export async function resolveOdooTagId(
  name: string | null | undefined,
  tagModel: TagModel = "crm.tag",
): Promise<number | undefined> {
  const config = getOdooConfig();
  if (!config || !name) {
    return undefined;
  }

  const uid = await authenticate(config);
  return resolveTagId(config, uid, tagModel, name);
}

export async function odooCreateCrmLead(
  values: Record<string, unknown>,
  options: CreateLeadOptions = {},
): Promise<OdooCrmLeadSummary> {
  const config = getOdooConfig();
  if (!config) {
    throw new Error("Odoo is not configured.");
  }

  const uid = await authenticate(config);

  const [sourceId, mediumId, campaignId, identityValues] = await Promise.all([
    resolveUtmId(config, uid, "utm.source", config.utmSourceName),
    resolveUtmId(config, uid, "utm.medium", options.utmMediumName ?? config.utmMediumName),
    resolveUtmId(config, uid, "utm.campaign", config.utmCampaignName),
    applyCompensallIdentity(config, uid, values, {
      tagModel: "crm.tag",
      extraTagNames: options.extraTagNames,
    }),
  ]);

  const leadValues: Record<string, unknown> = {
    ...identityValues,
    type: "lead",
  };

  if (sourceId) {
    leadValues.source_id = sourceId;
  }
  if (mediumId) {
    leadValues.medium_id = mediumId;
  }
  if (campaignId) {
    leadValues.campaign_id = campaignId;
  }

  const leadId = await executeKw<number>(
    config,
    uid,
    "crm.lead",
    "create",
    [leadValues],
    await companyKwargs(
      config,
      uid,
      typeof leadValues.company_id === "number" ? leadValues.company_id : undefined,
    ),
  );
  return readCrmLead(config, uid, leadId);
}

export async function odooFindHelpdeskTicketByTrackingNumber(
  trackingNumber: string,
): Promise<number | null> {
  const config = getOdooConfig();
  if (!config) {
    return null;
  }

  const uid = await authenticate(config);
  const matches = await executeKw<number[]>(
    config,
    uid,
    "helpdesk.ticket",
    "search",
    [[["name", "ilike", `Compensall claim ${trackingNumber}`]]],
    { limit: 1, order: "id desc" },
  );

  return matches[0] ?? null;
}

export async function odooCreateHelpdeskTicket(
  values: Record<string, unknown>,
  options: { extraTagNames?: Array<string | null | undefined> } = {},
): Promise<OdooHelpdeskTicketSummary> {
  const config = getOdooConfig();
  if (!config) {
    throw new Error("Odoo is not configured.");
  }

  const uid = await authenticate(config);
  const ticketValues = await applyCompensallIdentity(config, uid, values, {
    tagModel: "helpdesk.tag",
    extraTagNames: options.extraTagNames,
    includeBrand: true,
  });
  const companyId =
    typeof ticketValues.company_id === "number" ? ticketValues.company_id : undefined;
  const kwargs = await companyKwargs(config, uid, companyId);

  const ticketId = await executeKw<number>(
    config,
    uid,
    "helpdesk.ticket",
    "create",
    [ticketValues],
    kwargs,
  );

  // Helpdesk defaults may inherit the team company; force Compensall when accessible.
  if (companyId) {
    await executeKw<boolean>(
      config,
      uid,
      "helpdesk.ticket",
      "write",
      [[ticketId], { company_id: companyId }],
      kwargs,
    );
  }

  return readHelpdeskTicket(config, uid, ticketId);
}

export async function odooUpdateHelpdeskTicket(
  ticketId: number,
  values: Record<string, unknown>,
  options: { extraTagNames?: Array<string | null | undefined> } = {},
): Promise<OdooHelpdeskTicketSummary> {
  const config = getOdooConfig();
  if (!config) {
    throw new Error("Odoo is not configured.");
  }

  const uid = await authenticate(config);
  const ticketValues = await applyCompensallIdentity(config, uid, values, {
    tagModel: "helpdesk.tag",
    extraTagNames: options.extraTagNames,
    includeBrand: true,
  });
  const companyId =
    typeof ticketValues.company_id === "number" ? ticketValues.company_id : undefined;

  await executeKw<boolean>(
    config,
    uid,
    "helpdesk.ticket",
    "write",
    [[ticketId], ticketValues],
    await companyKwargs(config, uid, companyId),
  );
  return readHelpdeskTicket(config, uid, ticketId);
}
