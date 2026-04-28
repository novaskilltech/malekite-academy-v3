import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required to run database migrations.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const migration = readFileSync(new URL('../db/lesson-cache.sql', import.meta.url), 'utf8');
const statements = migration
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}
console.log('Database migration completed.');
