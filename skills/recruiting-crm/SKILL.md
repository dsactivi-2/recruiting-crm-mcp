---
name: recruiting-crm
description: >
  IMMER nutzen bei Bewerber, Kandidat, CRM, Filter, Ausbildung, Alter,
  Führerschein, Region, Sprache, Beruf ummappen, Occupation, Nalog, Projekt,
  Visum, Slobodan, Automehaničar, search_candidates, remap, unmap.
  IMMER nutzen wenn der User sagt Plugin, Skill installieren, recruiting-crm
  einrichten, MCP verbinden, Grok-Plugin, Hermes-Skill — dann zuerst
  Selbst-Installation und Checkliste, nicht erst suchen.
  Auch bei Alltagssprache („Elektriker aus Tuzla, B-Führerschein, Deutsch A2“).
  Nicht für LiveKit, Dograh oder SQL auf Tabellen.
---

# Recruiting CRM

Skill = Anleitung. Leitung = MCP-Tools oder Supabase-RPCs. Ohne Leitung nicht suchen.

## A. Selbst-Installation (sofort, wenn User Skill/Plugin einfügt oder „installieren“ sagt)

1. Lege den Skill lokal an, falls der Ordner fehlt:
   - Grok: `~/.grok/skills/recruiting-crm/SKILL.md` (diese Datei).
   - Hermes: `~/.hermes/skills/recruiting-crm/SKILL.md`.
2. Sage in einem Satz: „Skill liegt. Jetzt prüfen wir die Leitung.“
3. Prüfe Tools in DIESER Session (nicht raten):

| Leitung | Erkannt wenn |
|---|---|
| MCP | Tools `count_candidates`, `search_candidates`, `get_candidate`, `list_occupations`, `list_candidate_jobs`, `list_occupation_review_queue`, `search_candidates_by_occupation`, `remap_job_occupation`, `unmap_job_occupation` |
| Grok-Supabase | Tool wie `supabase___execute_sql` — dann nur `SELECT … FROM crm_api.<rpc>(…)` |
| Nichts | Nächster Schritt B, dann fragen |

4. Fehlt etwas: **eine Frage nach der anderen**, nicht alles auf einmal.
5. Erst suchen, wenn eine Leitung steht.

## B. Was du den User fragen musst (nur Fehlendes)

Reihenfolge:

1. „Ist der Supabase-Connector in DIESEM Grok-Projekt / dieser Hermes-Session angeschlossen?“ (ja/nein)
2. Wenn nein und keine MCP-Tools: „Gib den MCP_READ_KEY. Den findest du bei Cloudflare → Worker `recruiting-crm-mcp` → Settings → Variables / Secrets. Nicht den Supabase-service_role hierher posten, wenn der Worker schon läuft.“
3. Optional: „Soll Remap in dieser Session gehen? Read-Key reicht.“

Nicht fragen, was schon da ist.

### Fertige Werte (nicht neu erfinden)

| Stück | Wert |
|---|---|
| MCP-URL | `https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp` |
| Auth | Header `Authorization: Bearer <MCP_READ_KEY>` |
| Read-Key | Cloudflare Worker `recruiting-crm-mcp` Secret `MCP_READ_KEY` |
| Write-Key | Secret `MCP_WRITE_KEY` (optional) |
| Repo | https://github.com/dsactivi-2/recruiting-crm-mcp |

### Hermes-Block

```yaml
mcp_servers:
  recruiting-crm:
    url: "https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp"
    headers:
      Authorization: "Bearer MCP_READ_KEY_HIER"
    enabled: true
    timeout: 120
    connect_timeout: 30
```

Danach: `/reload-mcp` oder neue Session.

### Leitung-fehlt-Satz

> Skill ist da. Leitung zur CRM-DB fehlt in dieser Session.
> Variante 1: Supabase an dieses Projekt hängen.
> Variante 2: MCP-URL plus Bearer MCP_READ_KEY.
> Key: Cloudflare → recruiting-crm-mcp → Secrets. Danach neue Session.

## C. Suche und Mapping (nur mit Leitung)

Zählen → Liste → Profil. Remap/Unmap nach list_candidate_jobs.
Filter: references/filters.md. Befehle: references/commands.md.
Kein JOIN auf Tabellen. Kein JMBG/Passwort/Ausweis.
