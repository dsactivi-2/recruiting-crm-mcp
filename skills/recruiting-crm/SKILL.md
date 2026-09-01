---
name: recruiting-crm
description: >
  IMMER nutzen bei Bewerber, Kandidat, CRM, Filter, Ausbildung, Alter,
  Führerschein, Region, Sprache, Beruf ummappen, Occupation, Nalog, Projekt,
  Visum, Slobodan, Automehaničar, search_candidates, remap, unmap, trade.
  IMMER nutzen wenn der User sagt Plugin, Skill installieren, recruiting-crm
  einrichten, MCP verbinden, Grok-Plugin, Hermes-Skill — dann zuerst
  Selbst-Installation und Checkliste, nicht erst suchen.
  Auch bei Alltagssprache („Elektriker aus Tuzla, B-Führerschein, Deutsch A2“).
  Nicht für LiveKit, Dograh oder SQL auf Tabellen.
---

# Recruiting CRM

Skill = Anleitung. Leitung = MCP-Tools oder Supabase-RPCs. Ohne Leitung nicht suchen.

## A. Selbst-Installation

1. Skill lokal anlegen: Grok `~/.grok/skills/recruiting-crm/SKILL.md`, Hermes `~/.hermes/skills/recruiting-crm/SKILL.md`.
2. „Skill liegt. Jetzt prüfen wir die Leitung.“
3. MCP-Tools: count_candidates, search_candidates, get_candidate, list_occupations, list_candidate_jobs, list_occupation_review_queue, search_candidates_by_occupation, remap_job_occupation, unmap_job_occupation.
4. Oder Grok-Supabase: nur `crm_api.*`.

MCP-URL: `https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp`
Header: `Authorization: Bearer <MCP_READ_KEY>`

## C. Beruf wie der User spricht

- Ausbildung **und** X Jahre Job → `trade` `op=all` + `min_years`
- Ausbildung egal, eins reicht → `trade` `op=any`

```json
{"field":"trade","op":"all","value":{"title":"elektr","min_years":2}}
{"field":"trade","op":"any","value":{"title":"elektr"}}
```

`trained_as` + `worked_as` nebeneinander = immer UND. Bei „egal“ nur any.

Filterliste: `references/filters.md`. Befehle: `references/commands.md`.
