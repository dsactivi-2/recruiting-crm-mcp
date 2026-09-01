# Recruiting CRM MCP

Filterkatalog, Occupation-Mapping und Agent-Skills für das IDK/Step2Job Recruiting-CRM auf Supabase.

Repo: https://github.com/dsactivi-2/recruiting-crm-mcp

Die RPCs laufen live im verbundenen Supabase-Projekt (`crm`, `crm_api`). Dieser Repo enthält Spezifikation, Filterkatalog und Skills für Grok, Hermes und Codex — keine Bewerberdaten.

## Was der Agent kann

Einfache Sprache → RPC:

- Bewerber suchen und zählen (`search_candidates_filtered`, `count_candidates_filtered`)
- Profil laden (`get_candidate`, ohne JMBG/Passwort/Ausweis)
- Freitext-Jobs einem Beruf zuordnen (`remap_job_occupation`)
- Berufskatalog und Review-Queue

## Dokumentation

| Datei | Inhalt |
|---|---|
| [docs/00-uebersicht.md](docs/00-uebersicht.md) | Was das System ist, Zahlen |
| [docs/01-architektur.md](docs/01-architektur.md) | Schichten, Tabellen, Datenfluss |
| [docs/02-was-gebaut.md](docs/02-was-gebaut.md) | Fertige Bausteine |
| [docs/03-wie-gebaut.md](docs/03-wie-gebaut.md) | Entscheidungen, wie es gelöst wurde |
| [docs/04-rpcs.md](docs/04-rpcs.md) | Alle RPCs und Beispiele |
| [docs/05-filter.md](docs/05-filter.md) | Filter 1–28 live, 29–70 offen |
| [docs/06-occupation.md](docs/06-occupation.md) | Freitext → Beruf |
| [docs/07-skills.md](docs/07-skills.md) | Grok / Hermes / Codex |
| [docs/08-offen.md](docs/08-offen.md) | Backlog nach Priorität |
| [docs/09-install.md](docs/09-install.md) | Skill installieren |
| [docs/10-sicherheit.md](docs/10-sicherheit.md) | PII, RLS, Verbote |
| [catalog.json](catalog.json) | Maschinenlesbarer Katalog |

## Status

| Block | Stand |
|---|---|
| Schema-Analyse | fertig |
| Filterkatalog + RPCs search/count/get | fertig in Supabase |
| Occupation-Map + Remap + Trigger | fertig in Supabase |
| Skills Grok/Hermes/Codex | fertig |
| Filter 29–70, Embeddings | offen |

## Struktur

```
docs/                      Doku 00–10
catalog.json               Filter + Lookups
skills/recruiting-crm/     Canonical Skill
plugins/grok|hermes|codex
.grok-plugin/
```

## Install Skill

Grok:

```bash
git clone https://github.com/dsactivi-2/recruiting-crm-mcp.git
mkdir -p ~/.grok/skills
cp -R recruiting-crm-mcp/skills/recruiting-crm ~/.grok/skills/recruiting-crm
```

Hermes:

```bash
cp -R skills/recruiting-crm ~/.hermes/skills/recruiting-crm
```

## Harte Regeln

- Kein Raw-SQL für Suche
- Unbekanntes Filterfeld = Fehler
- Status nur ändern, wenn der User das klar sagt
