# Odoo Helpdesk → Compensall claim status webhook

When a Helpdesk ticket stage changes, Odoo should POST to Compensall so the track page timeline updates. Client notification emails stay in Helpdesk.

## Endpoint

- **URL:** `https://compensall.com/api/claim/odoo-status`
- **Method:** `POST`
- **Header:** `x-odoo-webhook-secret: <ODOO_WEBHOOK_SECRET>`
- **Content-Type:** `application/json`

## Body

```json
{
  "odooTicketId": 5778,
  "trackingNumber": "CMP-260723-ABCD1",
  "stageName": "Submetido",
  "stageId": 2
}
```

Notes:

- Prefer `odooTicketId` (stored on the claim when the ticket is created).
- `trackingNumber` is a fallback if the ticket id is missing.
- `stageName` is required and must match an Odoo Helpdesk stage name exactly.
- `stageId` is optional.

## Stage mapping

| Compensall timeline | Odoo Helpdesk stages |
|---------------------|----------------------|
| Submitted | New |
| Under review | Submeter, Submeter expenses, Falta algo, Legal - falta algo, Legal - submeter, Legal, NTD, teste, vimax |
| Airline contacted | Submetido, Insistidos, Nega - a refutar |
| Compensated | Aceite - cobranças al, Aceite - em pagamento, Aceite - recebido da al, Aceite - cobrança cli, Aceite - pago ao cliente |
| Closed | Closed, Congelado, Não responde - congelado |

## Odoo Automated Action (suggested)

1. Model: `helpdesk.ticket`
2. Trigger: On update, when `stage_id` is modified
3. Action: Execute Python code / HTTP webhook that posts the JSON above
4. Include:
   - ticket `id` as `odooTicketId`
   - ticket stage display name as `stageName`
   - tracking number parsed from ticket name (`Compensall claim CMP-...`) if available

## Env var required on Compensall

```bash
ODOO_WEBHOOK_SECRET=replace-with-a-long-random-secret
```

## Behaviour

- Same stage again → `changed: false`, no email
- Mapped stage change → updates Supabase claim status for the track page (no client email — Helpdesk already notifies)
- Unknown stage → HTTP 422
- Bad secret → HTTP 401
