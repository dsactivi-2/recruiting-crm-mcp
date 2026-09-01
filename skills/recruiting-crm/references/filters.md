# Filter in search_candidates_filtered

Nur diese field-IDs.

| field | ops | value | Alltag |
|---|---|---|---|
| age | gte, lte, between | Zahl oder [min,max] | 21 bis 40 |
| birth_date | eq, gte, lte, between | ISO-Datum | eq = genau dieser Tag; gte = an/nach |
| education_level | in | srednje / visoko / ostalo | Lehre, Hochschule |
| education_program | contains | Text | Smjer |
| school | contains | Text | Schule / Uni |
| profession | in | Struka-IDs | Kfz-Struka |
| has_trade_experience | eq | true/false | Erfahrung in der Struka |
| trade_experience_years | gte | int | Jahre Struka-Flag |
| job_title | contains | Text | Freitext-Job |
| employer | contains | Text | Firma |
| occupation | in | Slug(s) | nur dieser Beruf |
| occupation_family | in | Slug(s) | Beruf + Kinder (parent_slug) |
| occupation_years | gte | Zahl | Jahre im gemappten Beruf |
| country | in | BA RS HR ME DE SI | aus BiH |
| city | contains | Text | Tuzla |
| citizenship | contains | Text | bosnisch |
| desired_region_de | in | Region-IDs | NRW |
| has_license | eq | true/false | Führerschein |
| license_category | in | B C CE | Klasse B |
| language | has | {code, min_level} | Deutsch A2 |
| skill | contains | Text | Schweißen |
| processing_status | in, not_in | 0–8 | |
| application_status | in, not_in | 1… | Slobodan |
| nalog_id | in | int | Auftrag |
| project_id | in | int | Projekt |
| has_visa | eq | true/false | |
| gender | in | m / f | |
| available | eq | true | erreichbar |

p_query: Name, Mail, Tel, Job, Abschluss. Reine Ziffern = candidate_id.
