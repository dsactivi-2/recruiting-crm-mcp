# Runbook — Recruiting CRM MCP

Stand 2026-09-01. Repo: https://github.com/dsactivi-2/recruiting-crm-mcp

## Live

- MCP-URL: https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp
- Worker: recruiting-crm-mcp
- Supabase: Schema crm / crm_api
- Smoke: Count FS + BA = 24538

## Hermes

In ~/.hermes/config.yaml:

```yaml
mcp_servers:
  recruiting-crm:
    url: "https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp"
    headers:
      Authorization: "Bearer <MCP_READ_KEY>"
    enabled: true
    timeout: 120
```

Neue Session oder /reload-mcp. hermes mcp list muss recruiting-crm zeigen.
Keys nur in Cloudflare Variables.

## Störung

| Symptom | Fix |
|---|---|
| 401 | Read-Key |
| SECRET missing | Variable + Redeploy inherit |
| function public.count | Header content-profile crm_api |
| Hermes keine Tools | YAML + reload, nicht nur Skill |
| Remap fehlt | Write-Key |

Kein SQL, kein PII, Keys nicht committen.
