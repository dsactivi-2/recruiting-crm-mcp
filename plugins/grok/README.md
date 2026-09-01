# Grok-Plugin (Recruiting CRM)

Das ist **kein** Store-Plugin, das Grok nach einem GitHub-Klick von selbst kann.
Eine andere Session funktioniert nur, wenn **Skill + Leitung** dort wirklich liegen.

## Warum „in der anderen Session ging nichts“

| Was du gemacht hast | Was Grok davon hat |
|---|---|
| Repo / `plugins/grok` geöffnet | Nur Text. Keine DB. |
| Nur SKILL.md eingefügt | Anleitung ohne Hände. |
| Dieselbe Session weitergenutzt | Alte Tool-Liste, kein Reload. |

Grok sucht Bewerber nur, wenn in **dieser** Session eines da ist:

- MCP-Tools `count_candidates` …, **oder**
- Supabase-Connector → Aufruf `crm_api.*`

## Richtig einhängen

1. Skill kopieren: `skills/recruiting-crm` nach `~/.grok/skills/recruiting-crm`
   (in einem Grok-**Projekt**: Projekt-Skills-Ordner).
2. Leitung:
   - Supabase an **dieses** Grok-Projekt verbinden, **oder**
   - Custom MCP
     `https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp`
     Header `Authorization: Bearer <MCP_READ_KEY>`
3. **Neue** Session starten.
4. Test: „Wie viele mit Führerschein in BiH?“

Details: [SKILL.md](SKILL.md)

Key nicht ins öffentliche Repo schreiben. Cloudflare Worker `recruiting-crm-mcp` → Secrets `MCP_READ_KEY`.
