# Filter in search_candidates_filtered

| field | ops | value | Alltag |
|---|---|---|---|
| age | gte, lte, between | Zahl oder [min,max] | 21 bis 40 |
| birth_date | eq, gte, lte, between | ISO-Datum | geboren nach 1990 |
| education_level | in | srednje / visoko / ostalo | Lehre, Hochschule |
| education_program | contains | Text | Smjer Automehaničar |
| school | contains | Text | Schule / Uni |
| profession | in | Struka-IDs | Kfz, Solar |
| has_trade_experience | eq | true/false | Erfahrung in der Struka |
| trade_experience_years | gte | int | mind. 3 Jahre |
| job_title | contains | Text | Freitext Position |
| employer | contains | Text | Firma |
| occupation | in | Slug(s) | als Automehaničar |
| occupation_years | gte | Zahl | Jahre im gemappten Beruf |
| country | in | BA RS HR ME DE SI | aus BiH |
| city | contains | Text | Tuzla |
| citizenship | contains | Text | bosnisch |
| desired_region_de | in | Region-IDs | NRW, Bayern |
| has_license | eq | true/false | mit Führerschein |
| license_category | in | B C CE C1 | Klasse B |
| language | has | {code, min_level} | Deutsch A2 |
| skill | contains | Text | CNC |
| processing_status | in, not_in | 0–8 | in Bearbeitung |
| application_status | in, not_in | 1 Slobodan … | frei |
| nalog_id | in | int | Auftrag |
| project_id | in | int | Projekt |
| has_visa | eq | true/false | Visum |
| gender | in | m / f | |
| available | eq | true | erreichbar |
