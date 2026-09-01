# Automatisierung — Architektur

Stand 2026-09-01.

Wir bauen kein zweites CRM. MCP setzt denselben DB-Stand, den PHP und Crons lesen.
Sofort-Nebenwirkungen bleiben PHP oder HTTP an PHP.

Drei Sorten: Request (RPC/HTTP), Cron (nicht klonen), andere Module (eigene Tools).

Live: 9-Arg RPC, *_safe + dry_run, 14 Draft-Kanten, Worker 1.3 Status-Tools.
Offen: PHP-Zitat changeStatusAndInsertLog + do.php, HTTP ugovor/TF/go_online.
