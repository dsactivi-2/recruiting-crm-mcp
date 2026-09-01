---
name: recruiting-crm
description: >
  Recruiting-CRM über Supabase-RPCs steuern. Immer nutzen bei Bewerber, Kandidat,
  CRM-Suche, Filter, Ausbildung, Alter, Führerschein, Region, Sprache, Beruf
  ummappen, Occupation, Nalog, Projekt, Visum, Slobodan, Automehaničar,
  search_candidates, get_candidate, remap. Auch bei einfacher Sprache.
  Nicht nutzen für LiveKit-Calls, Dograh-Deploy oder allgemeines SQL.
---

# Recruiting CRM

1. Bei Unsicherheit `references/commands.md` nach Synonymen durchsuchen.
2. Nur `crm_api.*`. Nie Raw-SQL. Nie JMBG, Passwort, LK, Pass.
3. Erst zählen, dann suchen, dann Profil. Remap nur nach `list_candidate_jobs`.

| User sagt | Befehl |
|---|---|
| such / zeig Bewerber / filter | count dann search_candidates_filtered |
| wie viele | count_candidates_filtered |
| Profil / Details ID | get_candidate |
| falscher Beruf / ummappen | list_candidate_jobs → list_occupations → remap_job_occupation |
| welche Berufe | list_occupations |
| Queue / unklare Titel | list_occupation_review_queue |
| mind. X Jahre als Beruf Y | occupation + occupation_years oder search_candidates_by_occupation |

Land: BiH=`BA`, Srbija=`RS`, Hrvatska=`HR`, CG=`ME`, DE=`DE`.
Deutsch → `language.code=de`.
