---
name: recruiting-crm
description: >
  Recruiting-CRM suchen und Berufe mappen. Immer nutzen bei Bewerber, Kandidat,
  CRM-Suche, Filter, Ausbildung, Alter, Führerschein, Region, Sprache, Beruf
  ummappen, Occupation, Nalog, Projekt, Visum, Slobodan, Automehaničar,
  search_candidates, get_candidate, remap. Auch bei einfacher Sprache
  („zeig mir Elektriker aus Tuzla mit B-Führerschein und Deutsch A2“).
  Nicht nutzen für LiveKit-Calls, Dograh-Deploy oder allgemeines SQL.
---

# Recruiting CRM

Skill allein sucht **keine** Bewerber. Die Leitung ist der MCP-Server
`recruiting-crm`. Fehlt er, verbindest du ihn **sofort** — nicht erst „ich kann nicht“.

## 0. Verbindung prüfen (immer zuerst)

Tools die da sein müssen: `count_candidates`, `search_candidates`, `get_candidate`,
`list_occupations`, `list_candidate_jobs`, `list_occupation_review_queue`,
`search_candidates_by_occupation`, `remap_job_occupation`, `unmap_job_occupation`.

**Wenn eines der Lese-Tools fehlt:**

1. Sag in einem Satz: Skill ist Anleitung, MCP ist die Leitung — Leitung fehlt.
2. Gib den Block unten zum Einfügen. Biete an, `~/.hermes/config.yaml` zu ergänzen.
3. Danach: `hermes mcp list` oder `/reload-mcp` / neue Session.
4. Nicht auf den nackten Supabase-MCP ausweichen (`execute_sql` auf Kandidaten verboten).

### Was wohin

| Was | Wert | Wohin |
|---|---|---|
| MCP-URL | `https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp` | `mcp_servers.recruiting-crm.url` in `~/.hermes/config.yaml` |
| Read-Key | vom Betreiber, Secret `MCP_READ_KEY` | Header `Authorization: Bearer …` |
| Write-Key | Secret `MCP_WRITE_KEY` | gleicher Header; Remap/Unmap gehen jetzt auch mit Read-Key |
| Reload | `hermes mcp list` dann neue Session oder `/reload-mcp` | Terminal / Chat |

Key nicht aus dem öffentlichen Repo lesen. Fehlt er: „Gib MCP_READ_KEY (Cloudflare Worker recruiting-crm-mcp → Variables).“

### In `~/.hermes/config.yaml` einfügen

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

Nach dem Speichern: Session neu oder `/reload-mcp`.

### Tool-Namen am MCP

| MCP-Tool | Argumente |
|---|---|
| `count_candidates` | `filters` (Array), `query` |
| `search_candidates` | `filters`, `query`, `limit`, `cursor` |
| `get_candidate` | `candidate_id` |
| `list_occupations` | `query`, `limit` |
| `list_candidate_jobs` | `candidate_id` |
| `list_occupation_review_queue` | `limit` |
| `search_candidates_by_occupation` | `occupation_slug`, `min_years`, `limit` |
| `remap_job_occupation` | `kri_id` + `occupation_slug` (oder id / new_label_bs) |
| `unmap_job_occupation` | `kri_id`, optional `remove_alias` |

## Ablauf

1. Verbindung wie oben.
2. Unsicher → `references/commands.md`.
3. Nur MCP-Tools. Nie Raw-SQL. Nie JMBG, Passwort, LK, Pass.
4. Erst zählen, dann suchen, dann Profil. Remap/Unmap nur nach `list_candidate_jobs`.

## Intent → Befehl

| User sagt ungefähr | Tool |
|---|---|
| such / find / wer hat / filter | `count_candidates` dann `search_candidates` |
| wie viele | nur `count_candidates` |
| Profil / Details zu ID | `get_candidate` |
| falsch gemappt / ummappen | `list_candidate_jobs` → `list_occupations` → `remap_job_occupation` |
| Mapping löschen / unmap / zurück in Queue | `list_candidate_jobs` → `unmap_job_occupation` |
| welche Berufe / Slug | `list_occupations` |
| Queue / unklare Titel | `list_occupation_review_queue` |
| mind. X Jahre als Beruf Y | `occupation` + `occupation_years` oder `search_candidates_by_occupation` |

## Beruf ummappen

1. `list_candidate_jobs` → `kri_id`
2. `list_occupations` → Slug
3. `remap_job_occupation` mit `kri_id` + Slug
4. Mapping weg: `unmap_job_occupation` mit derselben `kri_id`
5. Kurz bestätigen

## Harte Grenzen

- Kein `execute_sql` zum Filtern.
- Status-RPCs nur wenn der User das klar will (am Worker oft gar nicht sichtbar).
- Kein Massen-Remap ohne „alle mit diesem Titel“.
