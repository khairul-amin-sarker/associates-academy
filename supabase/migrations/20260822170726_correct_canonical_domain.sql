-- Correct the historical placeholder domain without rewriting an applied seed migration.
update public.site_settings
set value = jsonb_set(
  coalesce(value, '{}'::jsonb),
  '{domain}',
  to_jsonb('associatesacademy.bd'::text),
  true
)
where key = 'brand'
  and coalesce(value ->> 'domain', '') <> 'associatesacademy.bd';
