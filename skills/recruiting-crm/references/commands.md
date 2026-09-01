# Befehlskatalog (semantisch durchsuchen)

Wenn unsicher: diese Datei nach Verben und Synonymen des Users scannen. Nur diese RPCs.

## search_candidates_filtered
- RPC: `crm_api.search_candidates_filtered(p_filters jsonb, p_query text, p_limit int, p_cursor int)`
- Tut: Bewerberzeilen zu Filtern + Freitext.
- Synonyme: such, finde, zeig Bewerber, filter, Elektriker aus Tuzla, Automehaničar mit Deutsch, Slobodan

## count_candidates_filtered
- RPC: `crm_api.count_candidates_filtered(p_filters jsonb, p_query text)`
- Synonyme: wie viele, Anzahl, reicht der Pool

## get_candidate
- RPC: `crm_api.get_candidate(p_candidate_id int)`
- Tut: Profil ohne JMBG/Passwort/Pass/LK
- Synonyme: Profil, Details, öffne Kandidat

## list_occupations
- RPC: `crm_api.list_occupations(p_query text, p_limit int)`
- Synonyme: welche Berufe, Slug, Berufskatalog

## list_candidate_jobs
- RPC: `crm_api.list_candidate_jobs(p_candidate_id int)`
- Tut: Jobzeilen + kri_id. Immer vor remap.

## remap_job_occupation
- RPC: `crm_api.remap_job_occupation(p_kri_id, p_occupation_id, p_occupation_slug, p_new_label_bs, p_new_label_de, p_add_alias)`
- Synonyme: falsch gemappt, ummappen, zuordnen, neuer Beruf
- Pflicht: kri_id. Genau ein Ziel: id ODER slug ODER new_label_bs.

## list_occupation_review_queue
- RPC: `crm_api.list_occupation_review_queue(p_limit int)`
- Synonyme: Queue, unmapped, was muss ich prüfen

## search_candidates_by_occupation
- RPC: `crm_api.search_candidates_by_occupation(p_occupation_slug, p_min_years, p_limit)`
- Synonyme: mind. 2 Jahre als, Erfahrung als
