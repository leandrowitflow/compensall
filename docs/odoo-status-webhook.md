# Odoo Helpdesk → Compensall claim status webhook

When a Helpdesk ticket stage changes, Odoo should POST to Compensall so the track page timeline updates. Client notification emails stay in Helpdesk.

## Endpoint

- **URL:** `https://www.compensall.com/api/claim/odoo-status`
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
- Only mapped stages update the website tracker; unmapped stages return HTTP 422.

## Stage mapping

| Compensall track status | Odoo Helpdesk stages | Message (EN) |
|-------------------------|----------------------|--------------|
| Received | New, Submeter | We've received your claim and our team is reviewing it… |
| Documents needed | Falta algo, Legal - falta algo | We need a few more documents… |
| With the airline | Submetido, Insistidos, Legal, Aceite - cobranças al, Aceite - recebido al / Aceite - recebido da al | Your claim has been submitted to the airline… |
| Following up | Nega - a refutar | The airline has responded, and we're following up… |
| Payment processing | Aceite - em pagamento | Great news — the airline has approved… |
| Service fee | Aceite - cobrança cli | Congratulations, your claim was successful… |
| Paid | Aceite - pago ao cliente | Your payment has been completed!… |
| Closed (NTD) | NTD | Unfortunately, we're unable to pursue… |
| Paused | Não responde - congelado | Your case has been paused… |
| Closed (declined) | Closed | Unfortunately, the airline has declined… |

## Odoo Automated Action (suggested)

1. Model: `helpdesk.ticket`
2. Trigger: On update, when `stage_id` is modified
3. Action: Execute Python code / HTTP webhook that posts the JSON above
4. Include:
   - ticket `id` as `odooTicketId`
   - ticket stage display name as `stageName`
   - tracking number parsed from ticket name (`Compensall claim CMP-...`) if available

## Env vars

```bash
ODOO_WEBHOOK_SECRET=replace-with-a-long-random-secret
ODOO_HELPDESK_TEAM_ID=2
RESEND_FROM_EMAIL=Compensall <help@compensall.com>
```

Helpdesk tickets created from the website must use `team_id: 2` (Compensall), not `1` (Aireclaim).

## Behaviour

- Same stage again → `changed: false`
- Mapped stage change → updates claim status for the track page (`emailSent: false` — Helpdesk already notifies)
- Unknown stage → HTTP 422
- Bad secret → HTTP 401
