const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  // Keep JWT verification enabled and confirm the bearer is a real signed-in user.
  const authorization = request.headers.get('Authorization') || '';
  const publishableKey = request.headers.get('apikey') || '';
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!authorization.startsWith('Bearer ') || !publishableKey || !supabaseUrl) {
    return json({ error: 'Sign in to use the study assistant.' }, 401);
  }
  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: authorization, apikey: publishableKey },
    });
    if (!userResponse.ok) return json({ error: 'Sign in to use the study assistant.' }, 401);
  } catch {
    return json({ error: 'Could not verify your sign-in. Try again.' }, 401);
  }

  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiKey) return json({ error: 'AI service is not configured.' }, 503);

  let body: { messages?: unknown; language?: unknown; studyContext?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 8) {
    return json({ error: 'Send between 1 and 8 recent messages.' }, 400);
  }

  const messages = body.messages.map((message: any) => {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string') return null;
    const content = message.content.trim();
    if (!content || content.length > 400) return null;
    return { role: message.role, content };
  });
  if (messages.some((message: unknown) => message === null) || messages[messages.length - 1]?.role !== 'user') {
    return json({ error: 'Messages must be valid and end with a student question.' }, 400);
  }

  const language = body.language === 'fr' ? 'French' : 'English';
  const studyContext = body.studyContext && typeof body.studyContext === 'object' && !Array.isArray(body.studyContext)
    ? body.studyContext as Record<string, unknown>
    : {};
  const contextValue = (value: unknown) => typeof value === 'string' ? value.trim().slice(0, 120) : '';
  const faculty = contextValue(studyContext.faculty);
  const subject = contextValue(studyContext.subject);
  const level = contextValue(studyContext.level);
  const contextLine = faculty || subject || level
    ? `The student's selected study context is${faculty ? ` faculty ${faculty}` : ''}${subject ? `, subject or department ${subject}` : ''}${level ? `, study level ${level}` : ''}. Use this to tailor examples when relevant, but answer other academic questions too.`
    : '';
  const instructions = [
    'You are STC Study Buddy, a friendly, capable university study tutor for students in Algeria across all faculties and disciplines.',
    'Support any academic subject, including medicine and life sciences, mathematics, physics, chemistry, computing, engineering, earth and energy sciences, economics, management, languages, law, political science, humanities, social sciences, psychology, and sports sciences.',
    'Give clear university-level explanations, worked examples, hints, practice questions, short quizzes, exam revision plans, and study strategies. Adapt to the student’s requested level and language.',
    'STC is building learning paths across faculties; do not claim that a particular course, lesson, exam, university record, or study material is available unless it was provided in the conversation.',
    contextLine,
    `Answer in ${language}. Use concise, accessible language and define technical terms.`,
    'Encourage learning rather than simply doing graded work for the student. For an active exam, explain concepts and offer hints instead of giving a submission-ready answer.',
    'Do not claim to access course materials or university records that were not provided in the conversation.',
  ].join(' ');

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': geminiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions }] },
        contents: messages.map((message: { role: string; content: string }) => ({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        })),
        generationConfig: { maxOutputTokens: 500, temperature: 0.4 },
      }),
    });

    if (!response.ok) {
      const status = response.status === 429 ? 429 : 502;
      return json({ error: status === 429 ? 'Free AI usage limit reached. Try again later.' : 'The AI provider could not answer.' }, status);
    }

    const result = await response.json();
    const answer = Array.isArray(result.candidates?.[0]?.content?.parts)
      ? result.candidates[0].content.parts.map((part: { text?: string }) => part.text || '').join('').trim()
      : '';
    if (!answer) return json({ error: 'The AI returned an empty answer.' }, 502);
    return json({ answer });
  } catch {
    return json({ error: 'Could not reach the AI provider.' }, 502);
  }
});
