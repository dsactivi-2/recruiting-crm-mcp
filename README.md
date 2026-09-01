# Recruiting CRM MCP

Filterkatalog, Occupation-Mapping und Agent-Skills für das IDK/Step2Job Recruiting-CRM auf Supabase.

Repo: https://github.com/dsactivi-2/recruiting-crm-mcp

Die RPCs laufen live im verbundenen Supabase-Projekt (`crm`, `crm_api`). Dieser Repo enthält die Spezifikation, den Filterkatalog und die Skills für Grok, Hermes und Codex — keine Bewerberdaten.

## Was der Agent kann

Einfache Sprache → RPC:

- Bewerber suchen und zählen (`search_candidates_filtered`, `count_candidates_filtered`)
- Profil laden (`get_candidate`, ohne JMBG/Passwort/Ausweis)
- Freitext-Jobs einem Beruf zuordnen (`remap_job_occupation`)
- Berufskatalog und Review-Queue

## Struktur

```
docs/          Filterkatalog, Occupation-Mapping, Tool-Verträge
catalog.json   Maschinenlesbare Filter + Lookups
skills/        SKILL.md + references (commands, filters, intents)
plugins/       Grok / Hermes / Codex Hinweise
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
