import { GoogleGenAI, Type } from '@google/genai';
import { Level, Language, LessonContent } from '../types';

const SUPPORTED_LANGUAGES: Language[] = ['ar', 'fr', 'en'];
const SUPPORTED_LEVELS = new Set(Object.values(Level));

const parseRequestBody = async (req: any) => {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
};

const validatePayload = (body: any) => {
  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  const levelId = body.levelId as Level;
  const lang = body.lang as Language;

  if (topic.length < 3 || topic.length > 240) {
    throw new Error('Invalid topic');
  }

  if (!SUPPORTED_LEVELS.has(levelId)) {
    throw new Error('Invalid levelId');
  }

  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    throw new Error('Invalid lang');
  }

  return { topic, levelId, lang };
};

const languageLabel = (lang: Language) => {
  if (lang === 'fr') return 'francais';
  if (lang === 'en') return 'English';
  return 'العربية';
};

const buildPrompt = (topic: string, levelId: Level, lang: Language) => `
أنت مدرس فقه مالكي متخصص. أنشئ درسا منظما وآمنا تعليميا.

الموضوع: "${topic}"
المستوى: "${levelId}"
لغة الشرح: ${languageLabel(lang)}

القواعد:
- لا تذكر أنك نموذج ذكاء اصطناعي.
- التزم بالفقه المالكي في عرض القاعدة الأساسية.
- إذا ذكرت خلافا فاذكره باختصار شديد بعد ضبط الأصل.
- اجعل المحتوى مناسبا للتعلم الذاتي.
- أعد JSON فقط مطابقا للبنية المطلوبة.
- يجب أن يحتوي quiz على 5 أسئلة على الأقل.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    matn: { type: Type.STRING },
    body: { type: Type.STRING },
    detailedExamples: { type: Type.ARRAY, items: { type: Type.STRING } },
    fiqhIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
    fiqhRiddles: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          riddle: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ['riddle', 'answer'],
      },
    },
    evidence: { type: Type.STRING },
    comparativeFiqh: { type: Type.STRING },
    references: { type: Type.ARRAY, items: { type: Type.STRING } },
    quiz: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
        },
        required: ['question', 'options', 'correctAnswer', 'explanation'],
      },
    },
  },
  required: [
    'title',
    'matn',
    'body',
    'detailedExamples',
    'fiqhIssues',
    'fiqhRiddles',
    'evidence',
    'comparativeFiqh',
    'references',
    'quiz',
  ],
};

const assertLessonContent = (data: LessonContent) => {
  if (!Array.isArray(data.quiz) || data.quiz.length < 3) {
    throw new Error('Generated lesson has an invalid quiz');
  }

  for (const question of data.quiz) {
    if (!Array.isArray(question.options) || question.options.length < 2) {
      throw new Error('Generated quiz question has invalid options');
    }
    if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
      throw new Error('Generated quiz question has invalid answer index');
    }
  }
};

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'replace_with_server_side_key') {
    return res.status(503).json({ error: 'Lesson generation is not configured' });
  }

  try {
    const { topic, levelId, lang } = validatePayload(await parseRequestBody(req));
    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const result = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: buildPrompt(topic, levelId, lang) }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const data = JSON.parse(result.text || '{}') as LessonContent;
    assertLessonContent(data);

    return res.status(200).json(data);
  } catch (error) {
    console.error('generate-lesson failed:', error);
    return res.status(400).json({ error: 'Unable to generate lesson' });
  }
}
