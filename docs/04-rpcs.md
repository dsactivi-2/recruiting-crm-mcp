# RPCs

Alle unter `crm_api`, SECURITY DEFINER, Grant authenticated.

## search_candidates_filtered

`crm_api.search_candidates_filtered(p_filters jsonb, p_query text, p_limit int, p_cursor int)`

Limit 1–50. Cursor = letztes candidate_id, Seite abwärts. Unbekanntes field → Fehler.

## count_candidates_filtered

Gleiche Filter, Rückgabe bigint. Erst count, dann search.

## search_candidates (alt)

Nur Freitext. Nicht für Strukturfilter.

## search_candidates_by_occupation

`crm_api.search_candidates_by_occupation(p_occupation_slug, p_min_years, p_limit)`

Jahre aus kri_darum_od / kri_datum_do.

## get_candidate

`crm_api.get_candidate(p_candidate_id) → jsonb`

Stammdaten, education[], jobs[] inkl. kri_id, languages[], skills[]. Keine Ausweisdaten.

## Occupation

- list_occupations(p_query, p_limit)
- list_candidate_jobs(p_candidate_id) — liefert kri_id
- list_occupation_review_queue(p_limit)
- remap_job_occupation(p_kri_id, p_occupation_id, p_occupation_slug, p_new_label_bs, p_new_label_de, p_add_alias)

Genau ein Zielweg: id oder slug oder new_label_bs. add_alias default true.

## Status nur auf klare Anweisung

set_candidate_application_status_safe, set_candidate_processing_status_safe, set_candidate_tf_status_safe.
