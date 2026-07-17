import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal(): void {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional for this script
  }
}

loadEnvLocal();

const url = process.env.ODOO_URL?.replace(/\/$/, "");
const db = process.env.ODOO_DB;
const login = process.env.ODOO_LOGIN;
const password = process.env.ODOO_PASSWORD;

if (!url || !db || !login || !password) {
  console.error("Missing ODOO_URL, ODOO_DB, ODOO_LOGIN, or ODOO_PASSWORD in .env.local");
  process.exit(1);
}

type JsonRpcResponse<T> = {
  result?: T;
  error?: { message: string; data?: { message?: string } };
};

async function jsonRpc<T>(service: string, method: string, args: unknown[]): Promise<T> {
  const response = await fetch(`${url}/jsonrpc`, {
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

async function main() {
  const uid = await jsonRpc<number | false>("common", "authenticate", [db, login, password, {}]);
  console.log("Authenticated uid:", uid);
  if (!uid) {
    console.error("Authentication failed. Check login/password and database name.");
    process.exit(1);
  }

  const companies = await jsonRpc<Array<{ id: number; name: string }>>(
    "object",
    "execute_kw",
    [db, uid, password, "res.company", "search_read", [[], ["id", "name"]]],
  );
  console.log("Companies:", companies);

  const leadFields = await jsonRpc<Record<string, { string: string; type: string }>>(
    "object",
    "execute_kw",
    [db, uid, password, "crm.lead", "fields_get", [[], { attributes: ["string", "type"] }]],
  );

  const interesting = Object.entries(leadFields)
    .filter(([name]) => /name|email|contact|company|source|medium|campaign|description|website|flight|utm|tracking|brand/i.test(name))
    .map(([name, meta]) => `${name} (${meta.type})`)
    .sort();
  console.log("crm.lead fields:", interesting.join("\n  "));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
