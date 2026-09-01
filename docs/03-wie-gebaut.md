# Wie es gebaut und gelöst wurde

## 1. Falsches GitHub-Repo

Zuerst wurde `dsactivi-2/old_crm_updated` gelesen (`app.py`, Voice-Modul). Das ist ein kleines Kunden-CRM, nicht die 200k Bewerber. Lösung: Live-Supabase durchsuchen (`information_schema`, Schema `crm`, nicht `public`).

## 2. Filterlogik der alten UI

Nicht aus dem Falsch-Repo, sondern aus Spalten von `idk_kandidati`, Kind-Tabellen, `idk_profil_kriterij` und Lookups. Agent darf nur Katalog-Felder.

## 3. Freitext-Berufe

36.861 Schreibweisen. Hybrid: normalisieren → Katalog aus Positionen + häufigen Titeln → Exact-Slug → Trigramm ≥ 0.42 → Review-Queue → menschliches Remap schreibt Alias und zieht gleiche Titel nach.

Freitext bleibt. Filter `occupation` geht über die Map.

## 4. RPC-Compiler ohne dynamisches SQL

Whitelist-field in PL/pgSQL, Werte gecastet, LIKE über `crm.like_pat`. Temp-Tabelle in `filter_candidate_ids` ist VOLATILE (`CREATE TEMP` geht nicht in STABLE).

## 5. Land und Sprache

`crm.country_code` mapped Bosna/BiH → BA usw. `Njemački` → de, CEFR-Rang für min_level.

## 6. Alltagssprache

Skill + references/commands.md: jedes RPC hat Beschreibung und Synonyme. Unsicher → Datei scannen.

## 7. Remap-Bug

RETURNS TABLE(kri_id) + ON CONFLICT (kri_id) war ambiguous. Lösung: Constraint-Name / andere Out-Spalten.

## 8. Sicherheit

RLS deny, SECURITY DEFINER, search_path fest, get_candidate ohne Ausweisspalten.
