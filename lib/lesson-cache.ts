import { neon } from '@neondatabase/serverless';
import { LessonContent, Level, Language } from '../types';

const createCacheKey = (topic: string, levelId: Level, lang: Language) =>
  `${lang}:${levelId}:${topic.trim().toLowerCase()}`;

const getSql = () => {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
};

export const getCachedLesson = async (
  topic: string,
  levelId: Level,
  lang: Language
): Promise<LessonContent | null> => {
  const sql = getSql();
  if (!sql) return null;

  const cacheKey = createCacheKey(topic, levelId, lang);
  const rows = await sql`
    SELECT content
    FROM lesson_cache
    WHERE cache_key = ${cacheKey}
    LIMIT 1
  `;

  return (rows[0]?.content as LessonContent | undefined) ?? null;
};

export const saveCachedLesson = async (
  topic: string,
  levelId: Level,
  lang: Language,
  content: LessonContent,
  model: string
) => {
  const sql = getSql();
  if (!sql) return;

  const cacheKey = createCacheKey(topic, levelId, lang);
  await sql`
    INSERT INTO lesson_cache (cache_key, topic, level_id, lang, content, model)
    VALUES (${cacheKey}, ${topic}, ${levelId}, ${lang}, ${JSON.stringify(content)}::jsonb, ${model})
    ON CONFLICT (cache_key)
    DO UPDATE SET
      content = EXCLUDED.content,
      model = EXCLUDED.model,
      updated_at = NOW()
  `;
};
