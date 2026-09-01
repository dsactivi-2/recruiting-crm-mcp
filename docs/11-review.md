# Review 2026-09-01 (nach Fixes)

| Punkt | Fix | Nachweis |
|---|---|---|
| birth_date eq = gte | eq ist genau der Tag | eq 1990-01-01 = 64; gte = 35173 |
| p_query findet keine ID | reine Ziffern = candidate_id | 198797 ergibt 1 |
| PUBLIC EXECUTE | REVOKE PUBLIC | authenticated + service_role |
| occupation + parent_slug | occupation nur Slug; occupation_family = Familie | RPC + Skill |
| Status nicht getestet | dry_run ohne Claim = forbidden | kein Status geschrieben |
| kein Worker | worker/ Bearer-MCP im Repo | Deploy nur mit Cloudflare-Login |
