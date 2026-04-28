CREATE TABLE IF NOT EXISTS lesson_cache (
  id BIGSERIAL PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  topic TEXT NOT NULL,
  level_id TEXT NOT NULL,
  lang TEXT NOT NULL CHECK (lang IN ('ar', 'fr', 'en')),
  content JSONB NOT NULL,
  model TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lesson_cache_lookup_idx
  ON lesson_cache (topic, level_id, lang);
