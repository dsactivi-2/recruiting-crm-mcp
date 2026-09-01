# Filterkatalog Recruiting-CRM (Supabase `crm`)

Quelle: Live-Schema + Lookup-Tabellen + `crm.idk_profil_kriterij`.
Stand: 2026-09-01. Basis: `crm.idk_kandidati` (122.004), Projekte 207.679.

Strukturfilter laufen über `crm_api.search_candidates_filtered`.

Priorität: Ausbildung, Alter, Berufserfahrung, Region, Führerschein, Sprachen, Status.

Verboten in Tool-Output: JMBG, Passwort, LK, Pass.

Siehe `FILTER_OPTIONS.md` für die nummerierte Liste 1–70 und `catalog.json` für die maschinenlesbare Form.
