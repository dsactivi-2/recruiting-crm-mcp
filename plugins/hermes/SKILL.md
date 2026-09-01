---
name: recruiting-crm
description: Recruiting-CRM. Ohne MCP recruiting-crm keine Suche. Sofort Config-Block ausgeben.
---

Kopieren nach ~/.hermes/skills/recruiting-crm

In ~/.hermes/config.yaml:

```yaml
mcp_servers:
  recruiting-crm:
    url: "https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp"
    headers:
      Authorization: "Bearer ${MCP_READ_KEY}"
    enabled: true
    timeout: 120
```

Key = Cloudflare Secret MCP_READ_KEY. Dann /reload-mcp.
