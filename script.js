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
  course.close();
  window.STCAssistant.open();
  window.STCAssistant.input.value=`Help me study ${subject||'my subject'}${faculty?` in ${faculty}`:''} at ${level||'my study level'}.`;
});
document.querySelector('#menuToggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
let toastTimer;function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3400)}

// Sewingo AI is provided by the shared assistant-widget.js on every page.
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

