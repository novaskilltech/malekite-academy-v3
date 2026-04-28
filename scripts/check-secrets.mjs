import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const ignoredDirs = new Set(['.git', '.vercel', 'node_modules', 'dist', 'dist-ssr']);
const ignoredFiles = new Set(['.env', '.env.local', '.env.production', '.env.development']);
const extensions = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.md',
  '.html',
  '.css',
  '.mjs',
  '.cjs',
  '.yml',
  '.yaml',
]);

const secretPatterns = [
  { name: 'Google API key', pattern: /AIza[0-9A-Za-z_-]{30,}/ },
  { name: 'OpenAI-style key', pattern: /sk-[0-9A-Za-z_-]{20,}/ },
  { name: 'Gemini key assignment', pattern: /GEMINI_API_KEY\s*=\s*(?!replace_with_|your_|example|$)[^\s"']+/ },
  { name: 'Generic API key assignment', pattern: /API_KEY\s*=\s*(?!replace_with_|your_|example|$)[^\s"']+/ },
];

const findings = [];

const shouldScanFile = (path) => {
  const name = path.split(/[\\/]/).pop();
  if (ignoredFiles.has(name)) return false;
  const dot = name.lastIndexOf('.');
  const ext = dot === -1 ? '' : name.slice(dot);
  return extensions.has(ext);
};

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      if (!ignoredDirs.has(entry)) walk(path);
      continue;
    }

    if (!stats.isFile() || !shouldScanFile(path)) continue;

    const content = readFileSync(path, 'utf8');
    for (const { name, pattern } of secretPatterns) {
      if (pattern.test(content)) {
        findings.push(`${relative(root, path)}: ${name}`);
      }
    }
  }
};

walk(root);

if (findings.length > 0) {
  console.error('Potential secrets found:');
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log('No committed secret patterns found.');
