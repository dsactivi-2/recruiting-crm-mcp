# In Grok / Hermes einfügen (Installer)

Diesen Block als erste Nachricht in eine neue Session kleben.

---

```
Installiere jetzt den Skill recruiting-crm.

1. Lege ~/.grok/skills/recruiting-crm/SKILL.md an (Grok)
   bzw. ~/.hermes/skills/recruiting-crm/SKILL.md (Hermes).
   Quelle: https://github.com/dsactivi-2/recruiting-crm-mcp/blob/main/skills/recruiting-crm/SKILL.md
   References: filters.md, commands.md, intents.md

2. Sage: „Skill liegt. Ich prüfe die Leitung.“

3. Tools in DIESER Session prüfen:
   MCP count_candidates … remap/unmap
   oder Supabase execute_sql → nur crm_api.*

4. Fehlt Leitung, nacheinander fragen:
   a) Ist Supabase in DIESEM Projekt verbunden?
   b) Wenn nein: MCP_READ_KEY
      Cloudflare → Worker recruiting-crm-mcp → Secrets
   URL: https://recruiting-crm-mcp.6f484zn9bd.workers.dev/mcp
   Header: Authorization: Bearer <MCP_READ_KEY>

5. Hermes-Config anbieten, dann /reload-mcp.

6. Nicht suchen ohne Leitung. Keine Keys aus dem Repo erfinden.
```
