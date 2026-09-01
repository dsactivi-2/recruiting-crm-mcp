# Was gebaut ist

## In Supabase (Produktion)

- Extension-Nutzung: `pg_trgm`, `vector` (vorhanden), Diakritik über `crm.norm_title`
- Occupation-Katalog + Aliase + Job-Map + Audit
- Seed aus `idk_kandidat_pozicija` + Titel ≥ 10×
- Exact-Mapping über Slug, danach Trigramm ≥ 0.42 für häufige Resttitel
- Unmapped-Zeilen in der Map mit `method=unmapped`, `needs_review=true`
- Trigger für neue Jobzeilen
- RPCs siehe 04-rpcs.md

Geprüfte Smoke-Tests:

- Führerschein ja → 51.974
- Alter 21–40 + FS + Land BA + Deutsch ≥ A2 → 5.015
- Occupation `automehanicar` liefert gemappte Kandidaten
- remap_job_occupation auf kri_id 1931 → Slug automehanicar
- get_candidate Keys ohne JMBG/Passwort/Pass/LK

## In diesem Repo

- Maschinenkatalog catalog.json
- Doku unter docs/
- Skill skills/recruiting-crm
- Plugin-Hinweise Grok / Hermes / Codex

## Bewusst nicht gebaut

- Eigenes Python-MCP-Paket als Pflichtweg
- Überschreiben von kri_pozicija
- Filter 29–70 in der RPC
- Embedding-Schritt für den Long Tail
