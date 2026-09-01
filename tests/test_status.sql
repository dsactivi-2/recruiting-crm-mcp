-- Phase-1 Status tests. See docs/21-checklisten-automation.md
SELECT crm_api.count_candidates_filtered('[]'::jsonb, null) > 0 AS ok_count;
SELECT count(*) >= 14 AS ok_rules FROM crm.candidate_status_transition_rules WHERE is_active;
