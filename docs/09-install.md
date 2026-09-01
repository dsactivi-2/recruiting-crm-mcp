# Install

Repo: https://github.com/dsactivi-2/recruiting-crm-mcp

Voraussetzung: Supabase mit crm_api.* und Connector am Agenten.

## Grok

```bash
git clone https://github.com/dsactivi-2/recruiting-crm-mcp.git
mkdir -p ~/.grok/skills
cp -R recruiting-crm-mcp/skills/recruiting-crm ~/.grok/skills/recruiting-crm
```

## Hermes

```bash
cp -R skills/recruiting-crm ~/.hermes/skills/recruiting-crm
```

## Codex

plugins/codex/.codex-plugin/plugin.json plus Skill-Ordner.

## Test

1. Wie viele mit Führerschein in BiH, 21–40, Deutsch A2?
2. Zeig Automehaničare → list_occupations dann search mit Slug
3. get_candidate ohne Ausweisfelder
4. Remap nur nach list_candidate_jobs
