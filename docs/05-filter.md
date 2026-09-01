# Filteroptionen für den Recruiting-MCP

Nummeriert. Spalte RPC = schon in search_candidates_filtered / count_candidates_filtered.

## Bereits in der RPC (1–28)

1 q — Freitext Name/Mail/Tel/Job/Abschluss (p_query)
2 age — Alter, gte/lte/between
3 birth_date — Geburtsdatum
4 education_level — srednje / visoko / ostalo
5 education_program — Smjer / Abschluss
6 school — Schule / Uni
7 profession — Struka-IDs
8 has_trade_experience
9 trade_experience_years
10 job_title — Freitext Position
11 employer
12 occupation — kanonischer Slug
13 occupation_years
14 country — BA RS HR ME DE SI
15 city
16 citizenship
17 desired_region_de
18 has_license
19 license_category — B C CE C1
20 language — {code, min_level}
21 skill
22 processing_status 0–8
23 application_status (1 Slobodan …)
24 nalog_id
25 project_id
26 has_visa
27 gender m/f
28 available

## Einbaubar (29–70)

29 birth_place · 30 birth_country · 31 postal_code · 32 marital_status
33 visa_valid_from/to · 34 eu_residence · 35 nostrification (fast leer)
36 tf_status · 37 departure_mode · 38 desired_city_de · 39 destination_city
40 application_date · 41 appointment_date · 42 attended_appointment
43 contract_date · 44 work_start · 45 partner_id · 46 partner_status
47 partner_lead_status · 48 makler_id · 49 assigned_to_makler
50 origin · 51 candidate_group · 52/53 CV/Profil BA|DE
54 connected_to_dipl · 55 glossa · 56 messenger_status
57 wrong_number · 58 unreachable · 59 atu_package · 60 parallel_zb
61 has_documents · 62 verified_language · 63 in_queue
64 currently_working · 65 education_country · 66 work_country
67 has_notes · 68 reject_reason · 69 pp_position/location · 70 created_at

PII nie als Filter: JMBG, Passwort, LK, Pass.

Maschinenlesbar: catalog.json im Repo-Root.
