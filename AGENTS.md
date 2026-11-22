# GuíaPro engineering instructions

- Prefer small verified changes, preserve localStorage keys and backups (v2–v5), no external data/telemetry or dependencies without a demonstrated need.
- Work on development branches and keep main and production unchanged until approval. Use synthetic test data. Google Calendar expansion is deferred.
- Run `node --test tests/regression.cjs` after changes. Test app in a browser on mobile and desktop, including offline and JSON restoration. Distinguish executed tests from pending tests.
- Monetary amounts are integer cents internally. Account balance determines pending/settled status. Batch allocation must not exceed a balance or duplicate a batch; extra funds remain clearly unassigned until a later allocation feature. Preserve prior payments and block deletion of accounts with batch payments. Review multi-tab persistence.
- Keep the tour form short; preserve old values when editing. Use accessible native controls, 16px inputs, comfortable touch targets and reduced-motion preferences. Keep advanced finance inside Finance.
- Review security and UX in separate passes; report exact commit, CI and outstanding risks.
