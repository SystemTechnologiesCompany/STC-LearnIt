(() => {
  let root = document.querySelector('#studyAssistant');
  if (!root) {
    root = document.createElement('aside');
    root.className = 'study-assistant';
    root.id = 'studyAssistant';
    root.setAttribute('aria-label', 'Sewingo AI study assistant');
    root.innerHTML = `
    <button class="assistant-launcher" id="assistantLauncher" aria-expanded="false" aria-controls="assistantPanel">
      <span class="assistant-launch-icon"><img class="logo-glyph" src="logo only head.png" alt=""></span>
      <span class="assistant-launch-copy"><strong>Need a study buddy?</strong><small>Ask Sewingo AI</small></span><span class="assistant-launch-arrow">↗</span>
    </button>
    <section class="assistant-panel" id="assistantPanel" aria-label="Sewingo AI chat" aria-hidden="true" hidden>
      <header class="assistant-header"><div class="assistant-avatar"><img class="logo-glyph" src="logo only head.png" alt=""></div><div class="assistant-heading"><strong>Sewingo AI</strong><span><i></i> AI study assistant</span></div><button class="assistant-close" id="assistantClose" aria-label="Close study assistant">×</button></header>
      <div class="assistant-context"><span><img class="ui-icon" src="assets/icons/assistant.svg" alt=""></span> Ask for study help or help using STC Learnit.</div>
      <div class="assistant-messages" id="assistantMessages" aria-live="polite" aria-relevant="additions"><div class="chat-row assistant-row"><div class="chat-avatar"><img class="logo-glyph" src="logo only head.png" alt=""></div><div class="chat-bubble"><strong>Hi! I’m Sewingo AI, the STC founder’s right hand.</strong><br>Ask me about your studies or how to use STC Learnit. I can guide you step by step.<small>SEWINGO AI</small></div></div></div>
      <div class="assistant-suggestions"><button type="button" data-prompt="How do I change my account name? Give me the steps.">Change my name</button><button type="button" data-prompt="How do I start a lesson and practice?">Start a lesson</button><button type="button" data-prompt="How do I choose my faculty and subject?">Find my subject</button></div>
      <form class="assistant-composer" id="assistantForm"><label class="sr-only" for="assistantInput">Ask Sewingo AI</label><input id="assistantInput" maxlength="400" placeholder="Ask Sewingo AI…" autocomplete="off" required><button type="submit" aria-label="Send message"><img class="send-icon" src="assets/icons/send.svg" alt=""></button></form>
      <div class="assistant-disclaimer">AI responses can make mistakes. Verify important information.</div>
    </section>`;
    document.body.appendChild(root);
  }

  const panel = root.querySelector('#assistantPanel');
  const messages = root.querySelector('#assistantMessages');
  const input = root.querySelector('#assistantInput');
  const launcher = root.querySelector('#assistantLauncher');
  const history = [];
  let closeTimer;

  function open() {
    clearTimeout(closeTimer);
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    launcher.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-open')));
    setTimeout(() => input.focus(), 120);
  }
  function close() {
    clearTimeout(closeTimer);
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    closeTimer = setTimeout(() => { panel.hidden = true; launcher.focus(); }, 340);
  }
  function addMessage(text, role = 'assistant', label = 'SEWINGO AI') {
    const row = document.createElement('div');
    row.className = `chat-row ${role === 'user' ? 'user-row' : 'assistant-row'}`;
    const avatar = document.createElement('div'); avatar.className = 'chat-avatar';
    if (role === 'user') avatar.textContent = '🙂';
    else { const img = document.createElement('img'); img.className = 'logo-glyph'; img.src = 'logo only head.png'; img.alt = ''; avatar.appendChild(img); }
    const bubble = document.createElement('div'); bubble.className = 'chat-bubble';
    if (role === 'assistant') {
      for (const part of text.split(/(\*\*[^*]+\*\*)/g)) {
        if (part.startsWith('**') && part.endsWith('**')) { const strong = document.createElement('strong'); strong.textContent = part.slice(2, -2); bubble.appendChild(strong); }
        else bubble.appendChild(document.createTextNode(part));
      }
      const meta = document.createElement('small'); meta.textContent = label; bubble.appendChild(meta);
    } else bubble.textContent = text;
    row.append(avatar, bubble); messages.appendChild(row); messages.scrollTop = messages.scrollHeight;
  }
  async function errorText(error) {
    const fr = document.documentElement.dataset.language === 'fr';
    let message = String(error?.message || '');
    try {
      const response = error?.context;
      if (response?.clone) {
        const payload = await response.clone().json();
        if (payload?.error) message += ` ${payload.error}`;
        if (payload?.code === 'ENERGY_DEPLETED') { window.STCPlans?.open({ depleted: true }); return fr ? 'Votre énergie est épuisée. Découvrez les offres disponibles.' : 'You are out of energy. View the available plans.'; }
        if (payload?.code === 'ENERGY_SYNC_UNAVAILABLE') return fr ? 'La synchronisation de l’énergie est indisponible. Vérifiez la configuration Supabase.' : 'Energy sync is unavailable. Check the Supabase setup.';
      }
    } catch {}
    if (/FunctionsFetchError|Failed to fetch|NetworkError/i.test(message)) return fr ? 'Impossible de joindre l’assistant. Vérifiez que la fonction study-assistant a été déployée.' : 'I couldn’t reach the assistant. Check that the study-assistant function has been deployed.';
    if (/401|JWT|unauthorized/i.test(message)) return fr ? 'Reconnectez-vous pour utiliser l’assistant.' : 'Please sign in again to use the study assistant.';
    if (/429|rate limit/i.test(message)) return fr ? 'Trop de questions en peu de temps. Réessayez dans un instant.' : 'Too many questions in a short time. Please try again shortly.';
    if (/GEMINI_API_KEY|not configured/i.test(message)) return fr ? 'L’assistant IA n’est pas encore configuré dans Supabase.' : 'The AI assistant is not configured in Supabase yet.';
    return fr ? 'Désolé, je n’ai pas pu répondre. Réessayez dans un instant.' : 'Sorry, I couldn’t get an answer. Please try again in a moment.';
  }
  async function ask(prompt) {
    const question = String(prompt || '').trim(); if (!question) return;
    addMessage(question, 'user'); input.value = '';
    const typing = document.createElement('div'); typing.className = 'chat-row assistant-row chat-typing';
    typing.innerHTML = '<div class="chat-avatar"><img class="logo-glyph" src="logo only head.png" alt=""></div><div class="chat-bubble"><div class="book-loader" role="status" aria-label="Preparing your study answer"><div class="book"><div class="book__pg-shadow"></div><div class="book__pg"></div><div class="book__pg book__pg--2"></div><div class="book__pg book__pg--3"></div><div class="book__pg book__pg--4"></div><div class="book__pg book__pg--5"></div></div></div></div>';
    messages.appendChild(typing); messages.scrollTop = messages.scrollHeight;
    try {
      const client = window.stcSupabase;
      if (!client) throw new Error('Supabase is not configured');
      const { data: { session } } = await client.auth.getSession();
      if (!session) {
        typing.remove(); addMessage(document.documentElement.dataset.language === 'fr' ? 'Connectez-vous pour discuter avec Sewingo AI.' : 'Sign in to chat with Sewingo AI.');
        if (document.querySelector('#loginBtn')) document.querySelector('#loginBtn').click();
        else window.location.href = 'index.html?auth=login';
        return;
      }
      const nextHistory = [...history, { role: 'user', content: question }].slice(-8);
      const page = ({ 'learn.html': 'Learn & practice', 'profile.html': 'My profile', 'leaderboard.html': 'Leaderboard' })[location.pathname.split('/').pop()] || 'Home';
      const { data, error } = await client.functions.invoke('study-assistant', { body: {
        messages: nextHistory,
        language: document.documentElement.dataset.language === 'fr' ? 'fr' : 'en',
        page,
        studyContext: window.stcStudyContext || null,
      } });
      if (error) throw error;
      if (typeof data?.answer !== 'string' || !data.answer.trim()) throw new Error('Empty assistant reply');
      history.push({ role: 'user', content: question }, { role: 'assistant', content: data.answer });
      if (history.length > 12) history.splice(0, history.length - 12);
      typing.remove(); addMessage(data.answer);
    } catch (error) { typing.remove(); addMessage(await errorText(error)); }
  }
  launcher.addEventListener('click', () => panel.classList.contains('is-open') ? close() : open());
  root.querySelector('#assistantClose').addEventListener('click', close);
  root.querySelector('#assistantForm').addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  root.querySelectorAll('.assistant-suggestions button').forEach(button => button.addEventListener('click', () => ask(button.dataset.prompt)));
  window.STCAssistant = { open, close, ask, get input() { return input; } };

  const params = new URLSearchParams(location.search);
  if (params.get('assistant') === '1') {
    const subject = params.get('subject') || 'my subject';
    const faculty = params.get('faculty');
    const level = params.get('level');
    open(); input.value = `Help me study ${subject}${faculty ? ` in ${faculty}` : ''}${level ? ` at ${level}` : ''}. Give me a clear explanation and a short practice quiz.`;
  }
})();
