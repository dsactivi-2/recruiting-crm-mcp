# Recruiting CRM MCP Worker

Auth: Authorization Bearer MCP_READ_KEY oder MCP_WRITE_KEY.
Tools rufen crm_api.* auf. Kein SQL.

```bash
cd worker
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SECRET
npx wrangler secret put MCP_READ_KEY
npx wrangler secret put MCP_WRITE_KEY
npx wrangler dev
```

Inspector: POST http://127.0.0.1:8787/mcp

```json
{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"count_candidates","arguments":{"filters":[{"field":"has_license","op":"eq","value":true},{"field":"country","op":"in","value":["BA"]}]}}}
```

Soll: Zahl > 0. Deploy: npx wrangler deploy (braucht Cloudflare-Login).
