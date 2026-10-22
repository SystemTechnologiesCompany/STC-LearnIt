const departments = [
  {name:'Faculty of Medicine',type:'faculty',icon:'✚',iconFile:'medicine.svg',departments:['Medicine']},
  {name:'Faculty of New Information Technologies & Communication',type:'faculty',icon:'⌘',iconFile:'computer.svg',departments:['Computer and Information Technology','Electronics and Telecommunication']},
  {name:'Faculty of Hydrocarbons, Renewable Energy, Earth & Universe Sciences',type:'faculty',icon:'◈',iconFile:'earth-energy.svg',departments:['Earth Science and Universe','Renewable Energy','Hydrocarbon Production','Drilling and Oil Mechanics'],featured:true},
  {name:'Institute of Technology',type:'institute',icon:'⚙',iconFile:'technology.svg',departments:['Technology']},
  {name:'Faculty of Natural Sciences and Life',type:'faculty',icon:'❋',iconFile:'biology.svg',departments:['Biological Sciences','Agricultural Sciences']},
  {name:'Faculty of Applied Sciences',type:'faculty',icon:'⌬',iconFile:'engineering.svg',departments:['Process Engineering','Mechanical Engineering','Civil and Hydraulic Engineering','Electrical Engineering']},
  {name:'Faculty of Mathematics and Matter Sciences',type:'faculty',icon:'∑',iconFile:'mathematics.svg',departments:['Mathematics','Physics','Chemistry']},
  {name:'Faculty of Economics, Commercial Sciences and Management',type:'faculty',icon:'▤',iconFile:'economics.svg',departments:['Economics','Commercial Sciences','Management Sciences']},
  {name:'Faculty of Arts and Languages',type:'faculty',icon:'文',iconFile:'languages.svg',departments:['Arabic Language and Literature','French Language and Literature','English Language and Literature']},
  {name:'Faculty of Law and Political Sciences',type:'faculty',icon:'⚖',iconFile:'law.svg',departments:['Law','Political Sciences']},
  {name:'Faculty of Humanities and Social Sciences',type:'faculty',icon:'◎',iconFile:'social-sciences.svg',departments:['Sociology and Demography','Humanities','Information and Communication','Psychology and Educational Sciences']},
  {name:'Institute of Science and Techniques of Physical and Sporting Activities',type:'institute',icon:'◉',iconFile:'sports.svg',departments:['Physical and Sporting Activities']}
];

const grid=document.querySelector('#facultyGrid');
const search=document.querySelector('#facultySearch');
let selectedFaculty=null,activeFilter='all';
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-');
function renderFaculties(){
  const query=search.value.trim().toLowerCase();
  grid.innerHTML='';
  departments.forEach((faculty,index)=>{
    const matchesFilter=activeFilter==='all'||faculty.type===activeFilter;
    const matchesText=`${faculty.name} ${faculty.departments.join(' ')}`.toLowerCase().includes(query);
    const card=document.createElement('button');card.type='button';card.className='faculty-card';card.dataset.index=index;card.hidden=!(matchesFilter&&matchesText);
    const picked=selectedFaculty===index;
    card.innerHTML=`<span class="faculty-icon"><img src="assets/icons/${faculty.iconFile}" alt=""></span><span><span class="faculty-name">${faculty.name}</span><span class="faculty-type">${faculty.type==='faculty'?'Faculty':'Institute'} · ${faculty.departments.length} ${faculty.departments.length===1?'department':'departments'}</span></span><span class="faculty-arrow">↗</span>${picked?'<span class="selected-mark">✓</span>':''}`;
    card.addEventListener('click',()=>selectFaculty(index));grid.appendChild(card);
  });
}
function selectFaculty(index){
  selectedFaculty=index;const f=departments[index],panel=document.querySelector('#selectionPanel');
  document.querySelectorAll('.faculty-card').forEach(c=>c.classList.toggle('selected',Number(c.dataset.index)===index));
  renderFaculties();
  document.querySelector('#selectionIcon').innerHTML=`<img src="assets/icons/${f.iconFile}" alt="">`;
  document.querySelector('#selectionTitle').textContent=f.name;
  const subjectSelect=document.querySelector('#subjectSelect');
  subjectSelect.innerHTML=f.departments.map(subject=>`<option value="${subject}">${subject}</option>`).join('');
  document.querySelector('#selectionDescription').textContent='Choose a study area and level. The AI assistant can help with any subject.';
  updateStudyContext();
  panel.hidden=false;panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function updateStudyContext(){
  if(selectedFaculty===null)return;
  window.stcStudyContext={faculty:departments[selectedFaculty].name,subject:document.querySelector('#subjectSelect').value,level:document.querySelector('#yearSelect').value};
}
document.querySelector('#subjectSelect').addEventListener('change',updateStudyContext);
document.querySelector('#yearSelect').addEventListener('change',updateStudyContext);
search.addEventListener('input',renderFaculties);
const filterGroup=document.querySelector('.filters');
function moveFilterHighlight(){const active=filterGroup?.querySelector('.filter.active');if(!active)return;filterGroup.style.setProperty('--filter-x',`${active.offsetLeft}px`);filterGroup.style.setProperty('--filter-width',`${active.offsetWidth}px`)}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));moveFilterHighlight();renderFaculties()}));
window.addEventListener('resize',moveFilterHighlight);
window.addEventListener('stc:language-change',()=>requestAnimationFrame(moveFilterHighlight));
moveFilterHighlight();
renderFaculties();

const course=document.querySelector('#courseDialog');
document.querySelector('#startBtn').addEventListener('click',()=>document.querySelector('#faculties').scrollIntoView({behavior:'smooth'}));
document.querySelector('#ctaStart').addEventListener('click',()=>document.querySelector('#faculties').scrollIntoView({behavior:'smooth'}));
document.querySelector('#levelStart').addEventListener('click',()=>document.querySelector('#faculties').scrollIntoView({behavior:'smooth'}));
document.querySelector('#launchCourse').addEventListener('click',()=>{
  if(selectedFaculty===null){showToast('Choose a study area first.');return}
  updateStudyContext();
  const context=window.stcStudyContext;
  document.querySelector('#courseContext').textContent=`${context.faculty} · ${context.subject} · ${context.level}`;
  document.querySelector('#courseTitle').textContent=`Your ${context.subject} study path`;
  document.querySelector('#courseDescription').textContent='Choose your subject, follow focused lessons, and practice with quizzes before your exams. Your learning path is ready to explore.';
  course.showModal();
});
document.querySelector('#courseClose').addEventListener('click',()=>course.close());
document.querySelector('#openSelectedPath').addEventListener('click',()=>{
  updateStudyContext();
  const destination=new URL('learn.html',window.location.href);
  destination.searchParams.set('faculty',window.stcStudyContext.faculty);
  destination.searchParams.set('subject',window.stcStudyContext.subject);
  destination.searchParams.set('level',window.stcStudyContext.level);
  window.location.href=destination.href;
});
document.querySelector('#askCourseAssistant').addEventListener('click',()=>{
  const {faculty,subject,level}=window.stcStudyContext||{};
  course.close();openStudyAssistant();
  assistantInput.value=`Help me study ${subject||'my subject'}${faculty?` in ${faculty}`:''} at ${level||'my study level'}.`; 
  assistantInput.focus();
});
document.querySelector('#menuToggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
let toastTimer;function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3400)}

// The assistant calls a protected Supabase Edge Function; provider keys stay server-side.
const assistantPanel=document.querySelector('#assistantPanel');
const assistantMessages=document.querySelector('#assistantMessages');
const assistantInput=document.querySelector('#assistantInput');
const assistantLauncher=document.querySelector('#assistantLauncher');
const assistantHistory=[];
let assistantCloseTimer;
assistantLauncher.addEventListener('click',()=>{
  if(assistantPanel.classList.contains('is-open'))closeStudyAssistant();
  else openStudyAssistant();
});
document.querySelector('#assistantClose').addEventListener('click',closeStudyAssistant);
function openStudyAssistant(){
  clearTimeout(assistantCloseTimer);
  assistantPanel.hidden=false;
  assistantPanel.setAttribute('aria-hidden','false');
  assistantLauncher.classList.add('is-open');
  assistantLauncher.setAttribute('aria-expanded','true');
  requestAnimationFrame(()=>requestAnimationFrame(()=>assistantPanel.classList.add('is-open')));
  window.setTimeout(()=>assistantInput.focus(),120);
}
function closeStudyAssistant(){
  clearTimeout(assistantCloseTimer);
  assistantPanel.classList.remove('is-open');
  assistantPanel.setAttribute('aria-hidden','true');
  assistantLauncher.classList.remove('is-open');
  assistantLauncher.setAttribute('aria-expanded','false');
  assistantCloseTimer=window.setTimeout(()=>{assistantPanel.hidden=true;assistantLauncher.focus()},340);
}
function addChatMessage(text,role='assistant',label='SEWINGO AI'){
  const row=document.createElement('div');
  row.className=`chat-row ${role==='user'?'user-row':'assistant-row'}`;
  const avatar=document.createElement('div');
  avatar.className='chat-avatar';
  if(role==='user') avatar.textContent='🙂';
  else{
    const mark=document.createElement('img');
    mark.className='logo-glyph';mark.src='logo%20only%20head.png';mark.alt='';
    avatar.appendChild(mark);
  }
  const bubble=document.createElement('div');bubble.className='chat-bubble';bubble.textContent=text;
  if(role==='assistant'){
    const meta=document.createElement('small');meta.textContent=label;bubble.appendChild(meta);
  }
  row.append(avatar,bubble);assistantMessages.appendChild(row);
  assistantMessages.scrollTop=assistantMessages.scrollHeight;
}
async function getAssistantError(error){
  const french=document.documentElement.dataset.language==='fr';
  let message=String(error?.message||'');
  try{const response=error?.context;if(response?.clone){const payload=await response.clone().json();if(payload?.error)message+=` ${payload.error}`;if(payload?.code==='ENERGY_DEPLETED'){window.STCPlans?.open({depleted:true});return french?'Votre énergie est épuisée. Découvrez les offres disponibles.':'You are out of energy. View the available plans.'}if(payload?.code==='ENERGY_SYNC_UNAVAILABLE')return french?'La synchronisation de l’énergie est indisponible. Vérifiez la configuration Supabase.':'Energy sync is unavailable. Check the Supabase setup.'}}catch{}
  if(/FunctionsFetchError|Failed to fetch|NetworkError/i.test(message))return french?'Impossible de joindre l’assistant. Vérifiez que la fonction study-assistant a été déployée.':'I couldn’t reach the assistant. Check that the study-assistant function has been deployed.';
  if(/401|JWT|unauthorized/i.test(message))return french?'Reconnectez-vous pour utiliser l’assistant.':'Please sign in again to use the study assistant.';
  if(/429|rate limit/i.test(message))return french?'Trop de questions en peu de temps. Réessayez dans un instant.':'Too many questions in a short time. Please try again shortly.';
  if(/GEMINI_API_KEY|not configured/i.test(message))return french?'L’assistant IA n’est pas encore configuré dans Supabase.':'The AI assistant is not configured in Supabase yet.';
  return french?'Désolé, je n’ai pas pu répondre. Réessayez dans un instant.':'Sorry, I couldn’t get an answer. Please try again in a moment.';
}
function askStudyBuddy(prompt){
  const question=prompt.trim();if(!question)return;
  addChatMessage(question,'user');assistantInput.value='';
  const typing=document.createElement('div');typing.className='chat-row assistant-row chat-typing';typing.innerHTML='<div class="chat-avatar"><img class="logo-glyph" src="logo only head.png" alt=""></div><div class="chat-bubble"><div class="book-loader" role="status" aria-label="Preparing your study answer"><div class="book"><div class="book__pg-shadow"></div><div class="book__pg"></div><div class="book__pg book__pg--2"></div><div class="book__pg book__pg--3"></div><div class="book__pg book__pg--4"></div><div class="book__pg book__pg--5"></div></div></div></div>';assistantMessages.appendChild(typing);assistantMessages.scrollTop=assistantMessages.scrollHeight;
  (async()=>{
    try{
      const client=window.stcSupabase;
      if(!client)throw new Error('Supabase is not configured');
      const {data:{session}}=await client.auth.getSession();
      if(!session){typing.remove();addChatMessage(document.documentElement.dataset.language==='fr'?'Connectez-vous pour discuter avec l’assistant.':'Sign in to chat with the study assistant.');document.querySelector('#loginBtn')?.click();return;}
      const nextHistory=[...assistantHistory,{role:'user',content:question}].slice(-8);
      const {data,error}=await client.functions.invoke('study-assistant',{body:{messages:nextHistory,language:document.documentElement.dataset.language==='fr'?'fr':'en',studyContext:window.stcStudyContext||null}});
      if(error)throw error;
      if(typeof data?.answer!=='string'||!data.answer.trim())throw new Error('Empty assistant reply');
      assistantHistory.push({role:'user',content:question},{role:'assistant',content:data.answer});
      if(assistantHistory.length>12)assistantHistory.splice(0,assistantHistory.length-12);
      typing.remove();addChatMessage(data.answer,'assistant','SEWINGO AI');
    }catch(error){typing.remove();addChatMessage(await getAssistantError(error),'assistant','SEWINGO AI');}
  })();
}
document.querySelector('#assistantForm').addEventListener('submit',event=>{event.preventDefault();askStudyBuddy(assistantInput.value)});
document.querySelectorAll('.assistant-suggestions button').forEach(button=>button.addEventListener('click',()=>askStudyBuddy(button.dataset.prompt)));

// Interactive learning feature deck
const featureDeck=document.querySelector('#featureDeck');
if(featureDeck){
  const featureCards=[...featureDeck.querySelectorAll('[data-feature-card]')];
  const featureDots=document.querySelector('#featureDots');
  const featureCounter=document.querySelector('#featureCounter');
  let activeFeature=0;
  const featureDotButtons=featureCards.map((card,index)=>{
    const dot=document.createElement('button');dot.type='button';dot.className='deck-dot';
    dot.setAttribute('aria-label',`Show feature ${index+1}`);dot.addEventListener('click',()=>showFeature(index));
    featureDots.appendChild(dot);return dot;
  });
  function showFeature(index){
    activeFeature=(index+featureCards.length)%featureCards.length;
    featureCards.forEach((card,i)=>{
      const stack=(i-activeFeature+featureCards.length)%featureCards.length;
      card.dataset.stack=String(stack);card.setAttribute('aria-current',stack===0?'true':'false');
      card.setAttribute('aria-label',`Feature ${i+1} of ${featureCards.length}${stack===0?', currently in front':''}`);
    });
    featureDotButtons.forEach((dot,i)=>{dot.classList.toggle('is-active',i===activeFeature);dot.setAttribute('aria-current',i===activeFeature?'true':'false')});
    featureCounter.textContent=`${String(activeFeature+1).padStart(2,'0')} / ${String(featureCards.length).padStart(2,'0')}`;
  }
  featureCards.forEach((card,index)=>{
    card.addEventListener('click',event=>{if(event.target.closest('a'))return;showFeature(index===activeFeature?activeFeature+1:index)});
    card.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&!event.target.closest('a')){event.preventDefault();showFeature(index===activeFeature?activeFeature+1:index)}});
  });
  document.querySelector('#featurePrevious').addEventListener('click',()=>showFeature(activeFeature-1));
  document.querySelector('#featureNext').addEventListener('click',()=>showFeature(activeFeature+1));
  showFeature(0);
}

const assistantLaunchParams=new URLSearchParams(window.location.search);
if(assistantLaunchParams.get('assistant')==='1'){
  const candidateFaculty=assistantLaunchParams.get('faculty')||'';
  const facultyEntry=departments.find(item=>item.name===candidateFaculty);
  const faculty=facultyEntry?.name||'';
  const candidateSubject=assistantLaunchParams.get('subject')||'';
  const subject=facultyEntry?.departments.includes(candidateSubject)?candidateSubject:'';
  const candidateLevel=assistantLaunchParams.get('level')||'';
  const level=['Licence · Year 1','Licence · Year 2','Licence · Year 3','Master · Year 1','Master · Year 2'].includes(candidateLevel)?candidateLevel:'';
  window.stcStudyContext={faculty,subject,level};
  openStudyAssistant();
  assistantInput.value=`Help me study ${subject||'my subject'}${faculty?` in ${faculty}`:''}${level?` at ${level}`:''}. Give me a clear explanation and a short practice quiz.`;
}

