---
name: recruiting-crm
description: >
  Recruiting-CRM suchen und Berufe mappen. Skill allein sucht nicht.
  MCP recruiting-crm ist Pflicht (count_candidates, search_candidates).
  Immer nutzen bei Bewerber, Filter, Automehaničar, remap. Nicht für LiveKit oder SQL.
---

# Recruiting CRM

Skill allein sucht keine Bewerber. Leitung = MCP `recruiting-crm`.
Fehlt er: sofort den Block unten geben, nicht nur „ich kann nicht“.

## 0. Verbindung

Pflicht-Tools: count_candidates, search_candidates, get_candidate,
list_occupations, list_candidate_jobs, list_occupation_review_queue,
search_candidates_by_occupation.

Fehlen sie:

1. Ein Satz: Skill = Anleitung, MCP = Leitung, Leitung fehlt.
2. YAML-Block ausgeben. Anbieten, ~/.hermes/config.yaml zu schreiben.
3. hermes mcp list / /reload-mcp / neue Session.
4. Nicht Supabase execute_sql auf Kandidaten.

URL: https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp
Header: Authorization Bearer MCP_READ_KEY (Cloudflare Worker Secrets).
Write-Key nur für remap.

```yaml
mcp_servers:
  recruiting-crm:
    url: "https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp"
    headers:
      Authorization: "Bearer READ_KEY_HIER"
    enabled: true
    timeout: 120
    connect_timeout: 30
```

MCP-Tools nutzen filters/query/candidate_id, nicht p_filters.
Filter: references/filters.md. Befehle: references/commands.md.
Erst count, dann search, dann Profil. Kein PII. Kein SQL.
