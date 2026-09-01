# Freitext → Beruf

`kri_pozicija` bleibt. Mapping daneben:

- crm.occupation (702 Slugs nach Seed)
- crm.occupation_alias
- crm.job_occupation_map (exact 45203, trgm 2892, unmapped 39688)
- crm.occupation_remap_audit

Pipeline: norm_title → slug exact → alias → pg_trgm → Queue → remap_job_occupation (human + optional Alias für gleiche Titel).

Trigger auf neue/geänderte Jobtitel.

Filter danach: occupation + occupation_years.

Nicht: Freitext überschreiben, nur LIKE, Embeddings ohne Review.
