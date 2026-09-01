---
name: recruiting-crm
description: >
  Recruiting-CRM suchen und Berufe mappen. Immer nutzen bei Bewerber, Kandidat,
  CRM-Suche, Filter, Ausbildung, Alter, Führerschein, Region, Sprache, Beruf
  ummappen. In Grok-Sessions ohne MCP-Tools die RPCs über den Supabase-Connector aufrufen.
---

# Recruiting CRM — Grok

Skill allein sucht keine Bewerber. Leitung: MCP-Tools oder Supabase-Connector auf crm_api.*.
Ohne beides: Block ausgeben, nicht raten.

Grok-Weg:
SELECT crm_api.count_candidates_filtered(filters, query);
SELECT * FROM crm_api.search_candidates_filtered(filters, query, 20, NULL);
SELECT crm_api.get_candidate(id);
SELECT * FROM crm_api.list_occupations(q, 20);
SELECT * FROM crm_api.list_candidate_jobs(id);
SELECT * FROM crm_api.remap_job_occupation(kri_id, NULL, 'slug', NULL, NULL, true);
SELECT * FROM crm_api.unmap_job_occupation(kri_id, false);

MCP-URL: https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp
Header: Authorization Bearer MCP_READ_KEY
Danach neue Session.
