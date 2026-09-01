# Architektur

```
Recruiter (Alltagssprache)
        |
        v
Skill recruiting-crm          references/commands.md + filters.md + intents.md
        |
        v
crm_api.*  (SECURITY DEFINER, Grant authenticated)
        |
        v
crm.*      Tabellen + Mapping + Trigger
```

## Schemas

| Schema | Rolle |
|---|---|
| `crm` | Originaldaten + neue Mapping-Tabellen. RLS deny anon/authenticated. Zugriff nur über Funktionen. |
| `crm_api` | Stabile RPC-Oberfläche für Agenten. |

## Stammdaten (Auswahl)

- `idk_kandidati` — Person, Status, FS, Visum, Nalog
- `idk_kandidat_edukacija` + `idk_skole` + `idk_skole_smjerovi` + `idk_struke`
- `idk_kandidat_radno_iskustvo` — Jobs, Freitext `kri_pozicija`, Datumsspalte `kri_darum_od` (Tippfehler im Quellschema, so lassen)
- `idk_kandidat_jezici` — Sprache + CEFR-Spalten
- `idk_kandidat_vjestine` — Skills
- `idk_project_kandidati` — `pk_projectid`, `pk_kandidatid`
- `idk_kandidat_pozicija` — alter Positionskatalog (133), als Seed genutzt
- `idk_profil_kriterij` — echte Auftragsfilter der alten UI

## Neu angelegt

| Tabelle | Zweck |
|---|---|
| `crm.occupation` | Kanonischer Beruf (slug, label_bs, label_de) |
| `crm.occupation_alias` | Schreibweisen, unique `alias_norm` |
| `crm.job_occupation_map` | 1:1 auf `kri_id`, Methode, Review-Flag |
| `crm.occupation_remap_audit` | Wer hat wann umgemappt |

Hilfsfunktionen: `crm.norm_title`, `crm.slugify`, `crm.country_code`, `crm.cefr_rank`, `crm.lang_codes`, `crm.gender_code`, `crm.like_pat`.

Trigger `trg_auto_map_job_occupation` auf INSERT/UPDATE von `kri_pozicija`.

## Filterlauf

`crm.filter_candidate_ids(filters jsonb, query text)`:

1. Temp-Tabelle aller IDs (bzw. Freitext-Treffer).
2. Pro Filter-Element DELETE WHERE NOT EXISTS.
3. Unbekanntes field → Exception.

Darauf sitzen `search_candidates_filtered` und `count_candidates_filtered`.
