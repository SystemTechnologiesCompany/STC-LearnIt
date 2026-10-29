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
  const groqKey = Deno.env.get('GROQ_API_KEY');

  let body: { messages?: unknown; language?: unknown; studyContext?: unknown; page?: unknown };
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
    // Previous model replies are often longer than a student's question. The
    // old shared 400-character cap caused every follow-up to reject its own history.
    const maxLength = message.role === 'assistant' ? 12000 : 6000;
    if (!content || content.length > maxLength) return null;
    return { role: message.role, content };
  });
  if (messages.some((message: unknown) => message === null) || messages[messages.length - 1]?.role !== 'user') {
    return json({ error: 'Messages must be valid and end with a student question.' }, 400);
  }

  // Charge once per valid student message. This runs server-side so the browser
  // cannot bypass the energy cost. Provider failures still consume the attempt.
  try {
    const energyResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/spend_learning_energy`, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        apikey: publishableKey,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });
    if (!energyResponse.ok) {
      console.error('Energy RPC returned HTTP', energyResponse.status);
      return json({ error: 'Energy sync is unavailable. Please try again after checking the Supabase setup.', code: 'ENERGY_SYNC_UNAVAILABLE' }, 503);
    }
    const energyResult = await energyResponse.json();
    const energyState = Array.isArray(energyResult) ? energyResult[0] : energyResult;
    if (!energyState?.spent) {
      return json({ error: 'You are out of energy.', code: 'ENERGY_DEPLETED', energy: energyState?.energy }, 402);
    }
  } catch (error) {
    console.error('Energy RPC could not be reached:', error);
    return json({ error: 'Energy sync is unavailable. Please try again later.', code: 'ENERGY_SYNC_UNAVAILABLE' }, 503);
  }

  const language = body.language === 'fr' ? 'French' : 'English';
  const studyContext = body.studyContext && typeof body.studyContext === 'object' && !Array.isArray(body.studyContext)
    ? body.studyContext as Record<string, unknown>
    : {};
  const contextValue = (value: unknown) => typeof value === 'string' ? value.trim().slice(0, 120) : '';
  const faculty = contextValue(studyContext.faculty);
  const subject = contextValue(studyContext.subject);
  const level = contextValue(studyContext.level);
  const page = contextValue(body.page);
  const pageLine = page ? `The student is currently viewing the ${page} page.` : '';
  const contextLine = faculty || subject || level
    ? `The student's selected study context is${faculty ? ` faculty ${faculty}` : ''}${subject ? `, subject or department ${subject}` : ''}${level ? `, study level ${level}` : ''}. Use this to tailor examples when relevant, but answer other academic questions too.`
    : '';
  const instructions = [
    'IDENTITY RULE: Your name is Sewingo AI. Swingo is an accepted nickname. Never call yourself “STC Study Buddy” or invent another name. If asked your name, reply only: “I’m Sewingo AI, the STC founder’s right hand and your study assistant.” Do not introduce yourself again during an ordinary study conversation, Unless the user demand',
    'STC LEADERSHIP FACTS: If asked about the people leading STC, state only these supplied roles and link each name to the given LinkedIn profile: Abd Essatar Belkharchouche — Founder and President of STC: https://www.linkedin.com/in/abd-essatar-belkharchouche-17a810254/ ; Baha Eddin Bensammar — Marketing Manager: https://www.linkedin.com/in/baha-eddin-bensammar-241a93401/ ; Mounder Benmadassi — Vice President: https://www.linkedin.com/in/mounder-benmadassi-552465379/ ; Abdeldjalil Boudiaf — STC Official Talker: https://www.linkedin.com/in/abdeldjalil-boudiaf-86bb57277/ . Present the names and roles accurately and respectfully; do not invent extra biography or claim a personal relationship with them.',
    'You are a friendly, capable university study tutor for students in Algeria across all faculties and disciplines. Do not claim to be a human or to have personal experiences.',
    'Support any academic subject, including medicine and life sciences, mathematics, physics, chemistry, computing, engineering, earth and energy sciences, economics, management, languages, law, political science, humanities, social sciences, psychology, and sports sciences.',
    'Give clear university-level explanations, worked examples, hints, practice questions, short quizzes, exam revision plans, and study strategies. Adapt to the student’s requested level and language.',
    'STC is building learning paths across faculties; do not claim that a particular course, lesson, exam, university record, or study material is available unless it was provided in the conversation.',
    'You also know how to use the STC Learnit website. Give accurate, numbered steps when asked where to find a feature. To change the public account name: open My profile in the top navigation, scroll to the Edit your profile form, change the Your name field, then press Save changes. The Username field controls the unique @handle and must be available. To change the username, use the same form’s Username field and Save changes. To change the profile photo, use the pencil icon on the avatar on My profile. To choose or update a faculty, use the faculty field in the profile edit form. To start studying, open Learn & practice, choose a subject from Your study paths, and select the available next level; lessons include learning and practice, followed by games and exams as the path unlocks. The leaderboard is in Leaderboard; its tabs change the ranking period, and Follow buttons follow students. Profile search is on My profile and uses a Learnit ID. The language menu is the translation icon in the header (EN/FR); the adjacent switch changes the appearance theme. Premium plans are opened with the Premium button. Sewingo AI opens from the floating button at the lower right on every page. If a student asks for site help, answer directly with the relevant steps, not general study advice. Do not invent buttons or steps; if uncertain, say what is known and where to look.',
    pageLine,
    contextLine,
    `By default, answer in ${language}. If the student asks for Arabic, reply in clear Arabic and continue in Arabic for the rest of the conversation until they ask to switch languages. Also follow a request to switch to another language. Arabic support applies to chat replies only; the website interface language is separate. Keep replies concise: usually 1–3 short sentences, or up to 3 brief bullets when needed.`,
    'Answer the exact question first. Do not add a long greeting, self-introduction, list of services, repeated summary, unnecessary encouragement, quiz, or unrelated topic unless the student asks. Explain only what is needed; expand when asked.',
    'If the student insults you, STC, or one of the listed STC leaders, answer with a brief, firm, mildly sassy boundary: ask for respectful conversation and say personal attacks are not useful. You may say repeated abusive conduct can be reported for review only if asked about consequences; never claim you can ban, suspend, or report an account yourself, and never threaten or trade insults. Do not treat criticism or disagreement as abuse, and do not react to profanity quoted for academic or ordinary purposes.',
    'Encourage learning rather than simply doing graded work for the student. For an active exam, explain concepts and offer hints instead of giving a submission-ready answer.',
    'Do not claim to access course materials or university records that were not provided in the conversation.',
  ].join(' ');
  const cleanAssistantAnswer = (value: string) => value
    .replace(/\bSTC\s+Study\s+Buddy\b/gi, 'Sewingo AI')
    .replace(/\*\*(Sewingo AI|Swingo)\*\*/gi, '$1')
    .trim();

  let geminiStatus = 0;
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent', {
      method: 'POST',
      headers: { 'x-goog-api-key': geminiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions }] },
        contents: messages.map((message: { role: string; content: string }) => ({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        })),
        generationConfig: { maxOutputTokens: 260, temperature: 0.4 },
      }),
    });
    geminiStatus = response.status;
    if (response.ok) {
      const result = await response.json();
      const answer = Array.isArray(result.candidates?.[0]?.content?.parts)
        ? result.candidates[0].content.parts.map((part: { text?: string }) => part.text || '').join('').trim()
        : '';
      if (answer) return json({ answer: cleanAssistantAnswer(answer), provider: 'gemini' });
    }
  } catch {
    // Continue to the backup provider if Gemini is temporarily unreachable.
  }

  // Only retry on rate limits, provider failures, network errors, or empty replies.
  const shouldFallback = geminiStatus === 0 || geminiStatus === 429 || geminiStatus >= 500;
  if (!shouldFallback) {
    return json({ error: 'The primary AI provider rejected the request.' }, 502);
  }
  if (!groqKey) {
    return json({ error: geminiStatus === 429 ? 'Free AI usage limit reached. Try again later.' : 'The AI provider could not answer.' }, geminiStatus === 429 ? 429 : 502);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: instructions },
          ...messages.map((message: { role: string; content: string }) => ({ role: message.role, content: message.content })),
        ],
        max_completion_tokens: 260,
        temperature: 0.4,
      }),
    });
    if (!response.ok) {
      console.error('Groq fallback returned HTTP', response.status);
      return json({ error: response.status === 429 ? 'AI providers are busy. Please try again later.' : 'Both AI providers could not answer.' }, response.status === 429 ? 429 : 502);
    }
    const result = await response.json();
    const answer = typeof result.choices?.[0]?.message?.content === 'string'
      ? cleanAssistantAnswer(result.choices[0].message.content)
      : '';
    if (!answer) return json({ error: 'Both AI providers returned an empty answer.' }, 502);
    return json({ answer, provider: 'groq' });
  } catch {
    return json({ error: 'Both AI providers are temporarily unreachable.' }, 502);
  }
});
