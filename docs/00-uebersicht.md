# Übersicht

## Problem

Das Recruiting-CRM hat ~122.000 Bewerber und ~88.000 Jobzeilen. Filter und Suche saßen in der alten UI / in Freitextfeldern. Ziel: denselben Suchraum einem AI-Agenten geben, ohne dass der Agent SQL schreibt oder Ausweisdaten sieht.

## Lösung

1. Live-Schema in Supabase (`crm`) auslesen.
2. Erlaubte Filter als Katalog festnageln (`catalog.json`).
3. Struktur-RPCs in `crm_api` bauen. Der Agent schickt nur JSON `{field, op, value}`.
4. Freitext-Berufe (`kri_pozicija`) daneben auf kanonische Occupations mappen.
5. Skill mit Befehlskatalog + Synonymen, damit Alltagssprache den richtigen RPC trifft.

## Wichtige Zahlen (2026-09-01)

| Objekt | Zahl |
|---|---:|
| `idk_kandidati` | 122.004 |
| `idk_project_kandidati` | 207.679 |
| Jobzeilen `idk_kandidat_radno_iskustvo` | 87.844 |
| Distinct Jobtitel | 36.861 |
| Titel ≥ 10× | 649 (~49 % der Zeilen) |
| Occupations nach Seed | 702 |
| Jobs exact gemappt | 45.203 |
| Jobs trgm / Review | 2.892 |
| Jobs unmapped (Queue) | 39.688 |
| Mit Geburtsdatum | 73.740 |
| Mit Land/Stadt | ~42.000 |
| Führerschein „Da“ | 51.556 |

## Nicht dieses Repo

`old_crm_updated` / `old-crm-mcp` war ein anderes, kleines Kunden-CRM mit Voice-Modul. Die Filterlogik dort gilt nicht für die 200k Bewerber.
