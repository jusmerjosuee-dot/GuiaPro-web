# GuíaPro 2.0 Stable

Web first; Android parity afterwards. Preserve main, local storage keys, backups, existing Calendar settings; no new Calendar integration yet.

## Scope
- Simplified tour form: date, contractor (colleague/agency/direct), contact, passenger, quantity, optional phone, optional circuit 1–3 and route A–D, hour 06:00–15:00, optional hotel and notes, agreed amount. Notes on Home; preserve passenger WhatsApp.
- Finance assistant above account lists, no hardcoded personal names; closed accounts separated by derived balance.
- Simple liquidation text and batch payments with selection, partial allocation, excess handling, reversal and no duplicate accounting.
- Professional responsive interface, offline operation, compatible backups; no production release before tests and approval.

## Initial audit
Web main v0.4.13, monolithic HTML with inline JavaScript and CSS. Existing payment entries use cents helpers; retain schema and keys. No package.json found at audit.
