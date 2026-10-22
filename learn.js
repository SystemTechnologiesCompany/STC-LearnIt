const subjectGroups=[
  {faculty:'Faculty of Medicine',subjects:['Medicine']},
  {faculty:'Faculty of New Information Technologies & Communication',subjects:['Computer and Information Technology','Electronics and Telecommunication']},
  {faculty:'Faculty of Hydrocarbons, Renewable Energy, Earth & Universe Sciences',subjects:['Earth Science and Universe','Renewable Energy','Hydrocarbon Production','Drilling and Oil Mechanics']},
  {faculty:'Institute of Technology',subjects:['Technology']},
  {faculty:'Faculty of Natural Sciences and Life',subjects:['Biological Sciences','Agricultural Sciences']},
  {faculty:'Faculty of Applied Sciences',subjects:['Process Engineering','Mechanical Engineering','Civil and Hydraulic Engineering','Electrical Engineering']},
  {faculty:'Faculty of Mathematics and Matter Sciences',subjects:['Mathematics','Physics','Chemistry']},
  {faculty:'Faculty of Economics, Commercial Sciences and Management',subjects:['Economics','Commercial Sciences','Management Sciences']},
  {faculty:'Faculty of Arts and Languages',subjects:['Arabic Language and Literature','French Language and Literature','English Language and Literature']},
  {faculty:'Faculty of Law and Political Sciences',subjects:['Law','Political Sciences']},
  {faculty:'Faculty of Humanities and Social Sciences',subjects:['Sociology and Demography','Humanities','Information and Communication','Psychology and Educational Sciences']},
  {faculty:'Institute of Science and Techniques of Physical and Sporting Activities',subjects:['Physical and Sporting Activities']}
];

const geologyStages=[
  {id:'earth-layers',type:'LESSON 01',title:'Inside planet Earth',summary:'Discover the layers beneath your feet.',duration:'5 min',xp:20,intro:'Earth is built in layers. The thin, solid crust is broken into tectonic plates. Beneath it, the mantle is hot rock that moves very slowly. The liquid outer core surrounds a solid inner core.',questions:[{q:'Which layer is the thin, solid outer surface of Earth?',options:['The crust','The outer core','The mantle'],answer:0,why:'The crust is Earth’s thin, solid outer layer. It forms the surface we live on.'},{q:'Which layer surrounds the solid inner core?',options:['The crust','The liquid outer core','The mantle'],answer:1,why:'Earth’s liquid outer core surrounds the solid inner core.'}]},
  {id:'rocks-minerals',type:'LESSON 02',title:'Rocks & minerals',summary:'Learn what rocks are made of.',duration:'6 min',xp:20,intro:'A mineral is a naturally occurring solid with a consistent chemical composition and crystal structure. A rock is a natural material made of one or more minerals. Geologists use properties such as hardness, streak and lustre to identify minerals.',questions:[{q:'What is the key difference between a mineral and a rock?',options:['A rock is always one pure substance','A mineral has a consistent composition and crystal structure','Minerals are made only by people'],answer:1,why:'Minerals have a defined composition and crystal structure; rocks are mixtures of one or more minerals.'},{q:'Which property can help identify a mineral?',options:['Its streak','Its country of origin','Its age in years'],answer:0,why:'Streak, hardness, lustre and cleavage are useful clues when identifying minerals.'}]},
  {id:'plate-tectonics',type:'LESSON 03',title:'A moving planet',summary:'See how tectonic plates shape Earth.',duration:'7 min',xp:20,intro:'Earth’s outer shell is divided into large plates that move slowly over the softer mantle. Plates can move apart, collide or slide past each other. Their boundaries help explain earthquakes, volcanoes and mountain building.',questions:[{q:'What can happen when two tectonic plates collide?',options:['They may build mountains','Earth stops rotating','The mantle disappears'],answer:0,why:'When plates converge, the crust can crumple into mountain ranges, or one plate can move beneath another.'},{q:'What is one result of plates sliding past each other?',options:['Earthquakes','A new inner core','The oceans vanish'],answer:0,why:'Friction and sudden movement along plate boundaries can produce earthquakes.'}]},
  {id:'unit-checkpoint',type:'UNIT CHECKPOINT',title:'Earth basics checkpoint',summary:'Bring the first three lessons together.',duration:'3 questions',xp:30,intro:'Quick review! You need at least 2 correct answers to pass this checkpoint. Take your time and use what you have learned.',pass:2,questions:[{q:'Which part of Earth is liquid?',options:['The inner core','The outer core','The crust'],answer:1,why:'The outer core is liquid; the inner core is solid.'},{q:'A rock is usually…',options:['A mixture of minerals','A single tectonic plate','A type of earthquake'],answer:0,why:'Rocks are natural materials made of one or more minerals.'},{q:'Plates move slowly over the…',options:['Outer core','Mantle','Atmosphere'],answer:1,why:'Tectonic plates move over the softer, slowly moving mantle.'}]},
  {id:'final-exam',type:'FINAL EXAM',title:'Earth science level exam',summary:'Pass the exam to complete this level.',duration:'5 questions',xp:50,intro:'Your first level finale! Get at least 4 out of 5 correct to pass. You can retry if you need another round.',pass:4,questions:[{q:'Which layer forms Earth’s thin, solid surface?',options:['Crust','Mantle','Outer core'],answer:0,why:'The crust is Earth’s thin, solid surface.'},{q:'What is a mineral?',options:['A naturally occurring solid with a consistent composition and structure','Any piece of broken rock','A type of tectonic plate'],answer:0,why:'Minerals have a consistent chemical composition and crystal structure.'},{q:'What surrounds the inner core?',options:['The crust','The liquid outer core','The atmosphere'],answer:1,why:'The liquid outer core surrounds the solid inner core.'},{q:'What can happen where tectonic plates meet?',options:['Earthquakes','Earth stops changing','All rocks melt'],answer:0,why:'Plate boundaries are associated with earthquakes, volcanoes and mountain building.'},{q:'A rock is made of…',options:['One or more minerals','Only liquid metal','A single layer of Earth'],answer:0,why:'Rocks are made from one or more minerals.'}]}
];

const subjectBlueprints={
  'Medicine':{unit:'Foundations of human biology',lessons:[['Cells: the body’s building blocks','Cells are the smallest living units. The cell membrane controls what enters and leaves; the nucleus stores DNA; mitochondria release usable energy.','Which structure controls what enters a cell?','Cell membrane','Mitochondria release energy for the cell.'],['From tissues to organ systems','Similar cells form tissues, tissues combine into organs, and organs work together in systems. The cardiovascular system transports oxygen and nutrients.','What is formed when similar cells work together?','A tissue','An organ system is made of organs working together.'],['Homeostasis keeps balance','Homeostasis maintains stable internal conditions. Feedback systems detect a change and trigger a response, such as sweating when body temperature rises.','What is homeostasis?','Keeping internal conditions stable','Sweating helps return body temperature toward its normal range.']]},
  'Computer and Information Technology':{unit:'Core ideas in computing',lessons:[['Representing information','Computers represent information using bits: 0 and 1. Eight bits form a byte. Text, images and sound are encoded as patterns of bits.','How many bits are in a byte?','Eight','A byte contains eight bits.'],['Algorithms and programs','An algorithm is a clear sequence of steps for solving a problem. A program expresses those steps in a language a computer can execute.','What is an algorithm?','A sequence of steps to solve a problem','Programs implement algorithms using code.'],['Data and networks','A network connects devices so they can exchange data. Protocols define the rules for sending and receiving information.','What do network protocols define?','Rules for exchanging data','Protocols help connected devices communicate reliably.']]},
  'Mathematics':{unit:'Mathematical foundations',lessons:[['Variables and expressions','A variable stands for a value. An expression combines values and operations; simplifying it preserves its value while making its form clearer.','In 3x + 2, what does x represent?','A variable value','The variable x can take different values.'],['Equations and balance','An equation states that two expressions are equal. Apply the same operation to both sides to keep the equality balanced while solving.','What keeps an equation balanced?','Doing the same operation to both sides','This preserves equality as you isolate the unknown.'],['Functions describe relationships','A function maps each allowed input to exactly one output. Its rule can be shown with an equation, table or graph.','How many outputs does a function assign to one input?','Exactly one','That one-output rule defines a function.']]},
  'Physics':{unit:'How to describe the physical world',lessons:[['Measure with units','Physical quantities combine a number and a unit. SI units give scientists a shared standard for comparing measurements.','What does a physical measurement need besides a number?','A unit','Units make measured quantities interpretable and comparable.'],['Motion and speed','Speed describes distance travelled per unit time: speed = distance ÷ time. Velocity also includes direction.','A student travels 100 m in 20 s. What is the speed?','5 m/s','100 divided by 20 equals 5 metres per second.'],['Forces change motion','A net force changes an object’s motion. Newton’s second law relates net force, mass and acceleration: F = ma.','What happens when an unbalanced net force acts?','The object accelerates','Acceleration is a change in velocity caused by net force.']]},
  'Chemistry':{unit:'Matter and its transformations',lessons:[['Atoms and elements','Atoms contain protons, neutrons and electrons. The number of protons identifies the element; atoms of one element share that proton number.','What identifies an element?','Its number of protons','This is the atomic number.'],['Molecules and bonds','Atoms bond by sharing or transferring electrons. A molecule is a group of atoms held together by chemical bonds.','What holds atoms together in a molecule?','Chemical bonds','Bonds result from interactions involving electrons.'],['Chemical reactions','In a chemical reaction, atoms rearrange into new substances. Atoms are conserved, so the total number of each type stays the same.','What happens to atoms in a reaction?','They rearrange','The atoms are conserved while their bonds and groupings change.']]},
  'Biological Sciences':{unit:'Living systems',lessons:[['Cells and life','Cells are the basic units of life. Organisms may be single-celled or multicellular, with specialised cells performing different functions.','What is the basic unit of life?','The cell','All living organisms are made of one or more cells.'],['Ecosystems and energy','An ecosystem includes organisms and their physical environment. Energy flows through food chains, while matter cycles between organisms and the environment.','What flows through a food chain?','Energy','Energy enters ecosystems, often through producers, and moves between organisms.'],['Variation and adaptation','Individuals in a population vary. Inherited traits that improve survival and reproduction can become more common over generations.','What can happen to helpful inherited traits over generations?','They can become more common','This is a key mechanism of natural selection.']]},
  'Law':{unit:'Foundations of legal reasoning',lessons:[['Rules and legal sources','A legal system uses recognised sources such as legislation and regulations. The applicable source depends on the issue and the relevant jurisdiction.','Why identify the relevant jurisdiction?','It determines which rules apply','Legal rules and competent institutions vary by jurisdiction.'],['Rights and duties','Rights protect interests or freedoms, while duties require or prohibit certain conduct. Legal analysis considers both sides and the rules connecting them.','What does a legal duty do?','Requires or prohibits conduct','Duties set legally expected or forbidden actions.'],['Reasoning from rules','Legal reasoning identifies the facts, selects a relevant rule, then explains how the rule applies to those facts and supports a conclusion.','What should follow identifying a relevant rule?','Apply it to the facts','Connecting rule and facts makes the conclusion reasoned.']]},
  'Economics':{unit:'How economies work',lessons:[['Scarcity and choice','Resources are limited while wants can exceed them. Scarcity means choices have an opportunity cost: the best alternative not chosen.','What is opportunity cost?','The best alternative given up','It is the value of the next-best option forgone.'],['Supply and demand','Demand describes how much buyers are willing and able to purchase. Supply describes how much sellers are willing and able to offer at different prices.','Which side represents sellers?','Supply','Supply describes what sellers offer at different prices.'],['Reading economic indicators','Indicators such as inflation and unemployment summarise parts of economic activity. They need context and should not be treated as complete descriptions on their own.','What does inflation track?','A general rise in prices','Inflation measures the rate at which the general price level rises.']]},
  'Languages':{unit:'Language and communication',lessons:[['Meaning in context','Words can change meaning depending on context, audience and register. Careful readers use surrounding details to infer the intended sense.','What helps resolve an ambiguous word?','Its context','Nearby ideas and the communication setting guide interpretation.'],['Build clear sentences','A clear sentence expresses a complete idea. Agreement, word order and punctuation help readers follow the relationship between ideas.','What helps readers see how ideas relate?','Sentence structure and punctuation','Structure and punctuation make meaning easier to follow.'],['Read for the main idea','A text’s main idea is its central point. Supporting details explain, illustrate or provide evidence for that point.','What is a supporting detail for?','To explain or evidence the main idea','Details develop the central point of a text.']]},
  'Social Sciences':{unit:'People, society and evidence',lessons:[['People in social contexts','Social sciences study people, groups and institutions. Behaviour is shaped by interactions between individuals and their social and historical contexts.','What do social sciences examine?','People, groups and institutions','These fields study human life and social organisation.'],['Evidence and research','Research questions guide the choice of methods. Surveys, interviews and observations each provide different kinds of evidence and have limitations.','Why choose a method to fit the question?','Methods produce different kinds of evidence','The method affects what can be learned and what limitations apply.'],['Interpreting findings','A finding describes evidence from a study. Researchers consider sample, context and limitations before deciding how broadly a result may apply.','What should be considered before generalising a result?','The sample and study limitations','Findings may not apply beyond the people or setting studied.']]},
  'Engineering':{unit:'Engineering design basics',lessons:[['Define the problem','Engineering starts by identifying a need, users and constraints. A clear problem statement guides solutions and makes success measurable.','What guides a useful design solution?','The need, users and constraints','These define the problem the design must solve.'],['Compare design options','Engineers compare concepts against requirements such as safety, cost and performance. Trade-offs help explain why one option may suit a context better.','What is a design trade-off?','A compromise between requirements','Improving one requirement may affect another.'],['Test and improve','A prototype makes an idea testable. Measurements and feedback reveal gaps, allowing engineers to refine the design through iteration.','Why build a prototype?','To test and improve an idea','Testing provides evidence for the next design iteration.']]},
  'Energy and Earth':{unit:'Energy, Earth and resources',lessons:[['Energy forms and transfer','Energy can be stored in different forms and transferred between systems. Conservation means it changes form or location rather than disappearing.','What does energy conservation mean?','Energy changes form or location','Energy is not destroyed in a transfer.'],['Resources and systems','Natural and engineered systems connect resources, processes and outputs. Understanding these links helps evaluate efficiency and impacts.','Why map system inputs and outputs?','To understand efficiency and impacts','A system view reveals where resources go and what effects result.'],['Evidence for decisions','Reliable decisions use measurements, compare alternatives and consider uncertainty, environmental effects and local needs.','What should accompany a measurement?','Its uncertainty and context','Evidence is more useful when its limits and setting are clear.']]},
  'Geology':{unit:'Earth basics',lessons:[['Inside planet Earth','Earth is built in layers. The thin, solid crust is broken into tectonic plates. Beneath it, the mantle is hot rock that moves very slowly. The liquid outer core surrounds a solid inner core.','Which layer is the thin, solid outer surface of Earth?','The crust','The crust is Earth’s thin, solid outer layer.'],['Rocks and minerals','A mineral is a naturally occurring solid with a consistent chemical composition and crystal structure. A rock is a natural material made of one or more minerals. Geologists use properties such as hardness and streak to identify minerals.','What is the key difference between a mineral and a rock?','A mineral has a consistent composition and crystal structure','Minerals have a defined composition and crystal structure; rocks contain one or more minerals.'],['A moving planet','Earth’s outer shell is divided into large plates that move slowly over the softer mantle. Plates can move apart, collide or slide past each other, helping explain earthquakes and mountain building.','What can happen when two tectonic plates collide?','They may build mountains','When plates converge, the crust can crumple into mountain ranges.']]}
};
function categoryFor(subject){if(subject==='Geology'||subject==='Earth Science and Universe')return'Geology';if(subject==='Medicine')return'Medicine';if(subject==='Computer and Information Technology')return subject;if(subject==='Mathematics')return'Mathematics';if(subject==='Physics')return'Physics';if(subject==='Chemistry')return'Chemistry';if(subject==='Law')return'Law';if(subject==='Economics')return'Economics';if(['Arabic Language and Literature','French Language and Literature','English Language and Literature'].includes(subject))return'Languages';if(['Biological Sciences','Agricultural Sciences'].includes(subject))return'Biological Sciences';if(['Political Sciences','Sociology and Demography','Humanities','Information and Communication','Psychology and Educational Sciences'].includes(subject))return'Social Sciences';if(['Renewable Energy','Hydrocarbon Production','Drilling and Oil Mechanics'].includes(subject))return'Energy and Earth';if(['Commercial Sciences','Management Sciences'].includes(subject))return'Economics';if(subject==='Technology')return'Engineering';return'Engineering'}
function makeCourseStages(subject){if(subject==='Earth Science and Universe')subject='Geology';if(subject==='Geology'){return[...geologyStages.slice(0,3),{id:'geology-matching-game',type:'PRACTICE GAME',title:'Earth science concept match',summary:'Match each key idea to its meaning.',duration:'3 pairs',xp:20,kind:'matching',pairs:[{term:'Earth layers',definition:'Crust, mantle and core arranged from the surface inward.'},{term:'Mineral',definition:'A natural solid with a consistent composition and crystal structure.'},{term:'Tectonic plates',definition:'Pieces of Earth’s outer shell that move slowly.'}],intro:'Match each key idea to the correct meaning. You have learned all the concepts in the lessons above, so use those ideas to clear the board.'},...geologyStages.slice(3)]}if(subject==='Electronics and Telecommunication')subject='Computer and Information Technology';if(['Process Engineering','Mechanical Engineering','Civil and Hydraulic Engineering','Electrical Engineering','Physical and Sporting Activities'].includes(subject))subject='Engineering';const blueprint=subjectBlueprints[categoryFor(subject)]||subjectBlueprints.Engineering;const slug=subject.toLowerCase().replace(/[^a-z0-9]+/g,'-');const lessons=blueprint.lessons.map((item,i)=>({id:`${slug}-lesson-${i+1}`,type:`LESSON 0${i+1}`,title:item[0],summary:item[1].split('.')[0]+'.',duration:`${5+i} min`,xp:20,intro:item[1],questions:[{q:item[2],options:[item[3],`Not ${item[3]}`,'None of these'],answer:0,why:item[4]},{q:`Which idea best matches “${item[0]}”?`,options:[item[3],`Not ${item[3]}`,'None of these'],answer:0,why:item[4]}]}));const matching={id:`${slug}-matching-game`,type:'PRACTICE GAME',title:`${subject} concept match`,summary:'Match each key idea to its meaning.',duration:'3 pairs',xp:20,kind:'matching',pairs:blueprint.lessons.map(item=>({term:item[0],definition:item[4]})),intro:'Match each key idea to the correct meaning. You have learned all the concepts in the lessons above, so use those ideas to clear the board.'};const questions=blueprint.lessons.map(item=>({q:item[2],options:[item[3],`Not ${item[3]}`,'None of these'],answer:0,why:item[4]}));const checkpoint={id:`${slug}-unit-checkpoint`,type:'UNIT CHECKPOINT',title:`${subject} checkpoint`,summary:'Review the three lessons.',duration:'3 questions',xp:30,intro:'You need at least 2 correct answers to pass this checkpoint.',pass:2,questions};const examQuestions=lessons.flatMap(lesson=>lesson.questions).slice(0,5);const exam={id:`${slug}-final-exam`,type:'FINAL EXAM',title:`${subject} level exam`,summary:'Pass to complete this level.',duration:'5 questions',xp:50,intro:'Your level finale! Get at least 4 out of 5 correct. You can retry at any time.',pass:4,questions:examQuestions};return [...lessons,matching,checkpoint,exam]}
function makeLevelPath(subject){
  const seeds=makeCourseStages(subject);
  const lessonSeeds=seeds.filter(stage=>stage.type.startsWith('LESSON'));
  const baseQuestions=lessonSeeds.flatMap(stage=>stage.questions||[]);
  const conceptQuestions=lessonSeeds.map((topic,index)=>({q:`Which topic is described by “${topic.summary}”`,options:lessonSeeds.map(item=>item.title),answer:index,why:topic.intro}));
  const questions=[...baseQuestions,...conceptQuestions];
  const matchingPairs=lessonSeeds.flatMap(topic=>[{term:topic.title,definition:topic.summary},{term:`${topic.title} · explanation`,definition:topic.intro}]);
  const matchingSeed=seeds.find(stage=>stage.kind==='matching');
  const checkpointSeed=seeds.find(stage=>stage.type.includes('CHECKPOINT'));
  const examSeed=seeds.find(stage=>stage.type.includes('EXAM'));
  const slug=(subject==='Earth Science and Universe'?'geology':subject.toLowerCase()).replace(/[^a-z0-9]+/g,'-');
  const unitLevels=['Foundations','Core skills','Applied understanding','Advanced connections','Mastery'];
  const unitTitles=Array.from({length:5},(_,unit)=>`${unitLevels[unit]} · ${subjectBlueprints[categoryFor(subject)].unit}`);
  const path=[];
  for(let unit=0;unit<5;unit++){
    for(let level=1;level<=20;level++){
      const globalLevel=unit*20+level;
      const seed=unit===0&&level<=3?lessonSeeds[level-1]:unit===0&&level===5?matchingSeed:unit===0&&level===19?checkpointSeed:unit===0&&level===20?examSeed:null;
      if(seed){path.push({...seed,pairs:seed.kind==='matching'?matchingPairs.slice(0,3):seed.pairs,type:`LEVEL ${String(level).padStart(2,'0')} · ${seed.type}`,title:level===20?`Unit ${unit+1} mastery exam`:seed.title,summary:level===20?`Final exam for ${unitTitles[unit]}.`:seed.summary,unit:unit+1,unitTitle:unitTitles[unit],level,globalLevel,difficulty:unit+1});continue}
      if(level===20){
        const examQuestions=Array.from({length:Math.min(questions.length,6+unit)},(_,i)=>questions[(globalLevel+i)%questions.length]);
        const pass=Math.ceil(examQuestions.length*(.7+unit*.04));
        path.push({id:`${slug}-unit-${unit+1}-final-exam`,unit:unit+1,unitTitle:unitTitles[unit],level,globalLevel,difficulty:unit+1,type:`LEVEL 20 · UNIT ${unit+1} FINAL EXAM`,title:`Unit ${unit+1} mastery exam`,summary:`Prove your understanding of ${subject} to unlock the next unit.`,duration:`${examQuestions.length} questions`,xp:50+unit*10,intro:`This exam brings together the skills from ${unitTitles[unit]}. You need ${pass} correct answers to pass.`,pass,questions:examQuestions});
        continue;
      }
      if(level%5===0){
        const pairCount=Math.min(matchingPairs.length,3+unit+Math.floor((level-5)/5));
        const pairs=matchingPairs.slice(0,pairCount);
        path.push({id:`${slug}-unit-${unit+1}-level-${String(level).padStart(2,'0')}-game`,unit:unit+1,unitTitle:unitTitles[unit],level,globalLevel,difficulty:unit+1,type:`LEVEL ${String(level).padStart(2,'0')} · PRACTICE GAME`,title:`Unit ${unit+1} concept challenge`,summary:`Match the key ideas from ${unitTitles[unit]}.`,duration:`${pairs.length} pairs`,xp:25+unit*5,kind:'matching',pairs,intro:`Use what you have learned in ${unitTitles[unit]} to match every idea. This round gets more demanding as you advance.`});
        continue;
      }
      const count=Math.min(questions.length,2+unit+Math.ceil((level-1)/4));
      const levelQuestions=Array.from({length:count},(_,i)=>{
        const source=questions[(globalLevel+i)%questions.length];
        return unit===0&&level<5?source:{...source,q:`${unitLevels[unit]} · ${source.q}`};
      });
      const pass=Math.ceil(count*(.6+unit*.05+Math.floor((level-1)/5)*.02));
      const topic=lessonSeeds[(globalLevel-1)%lessonSeeds.length];
      path.push({id:`${slug}-unit-${unit+1}-level-${String(level).padStart(2,'0')}`,unit:unit+1,unitTitle:unitTitles[unit],level,globalLevel,difficulty:unit+1,type:`LEVEL ${String(level).padStart(2,'0')} · ${unitLevels[unit].toUpperCase()}`,title:`${unitLevels[unit]}: ${topic.title}`,summary:`Level ${globalLevel} of 100 · ${count} questions · ${Math.round(pass/count*100)}% to pass.`,duration:`${count} questions`,xp:20+unit*5+Math.floor(level/4)*2,intro:`${topic.intro}\n\n${unitTitles[unit]} · Level ${level} of 20. Answer at least ${pass} of ${count} questions to pass.`,pass:Math.min(pass,count),questions:levelQuestions});
    }
  }
  return path;
}
let courseStages=makeLevelPath('Geology');

const storageKey='stc-learn-practice-v1';
const guestStorageKey=`${storageKey}:guest`;
const legacyOwnerKey=`${storageKey}:legacy-owner`;
const accountStorageKey=userId=>`${storageKey}:user:${userId}`;
const config=window.STC_SUPABASE_CONFIG||{};
const progressClient=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url||'')&&typeof config.publishableKey==='string'&&config.publishableKey.startsWith('sb_publishable_')&&window.supabase?.createClient
  ?window.supabase.createClient(config.url,config.publishableKey,{auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}})
  :null;
const emptyProgress=()=>({completed:[],xp:0,streak:0,lastActive:'',todayXP:0,goalDate:'',energy:20,energyUpdatedAt:new Date().toISOString()});
const normalizeProgress=saved=>({completed:Array.isArray(saved?.completed)?[...new Set(saved.completed.filter(id=>typeof id==='string'))]:[],xp:Number.isFinite(Number(saved?.xp))?Math.max(0,Number(saved.xp)):0,streak:Number.isFinite(Number(saved?.streak))?Math.max(0,Number(saved.streak)):0,lastActive:typeof(saved?.lastActive??saved?.last_active)==='string'?(saved.lastActive??saved.last_active):'',todayXP:Number.isFinite(Number(saved?.todayXP??saved?.today_xp))?Math.max(0,Number(saved.todayXP??saved.today_xp)):0,goalDate:typeof(saved?.goalDate??saved?.goal_date)==='string'?(saved.goalDate??saved.goal_date):'',energy:Number.isFinite(Number(saved?.energy))?Math.max(0,Math.min(20,Number(saved.energy))):20,energyUpdatedAt:typeof(saved?.energyUpdatedAt??saved?.energy_updated_at)==='string'?(saved.energyUpdatedAt??saved.energy_updated_at):new Date().toISOString()});
function readProgress(key=storageKey){try{return normalizeProgress(JSON.parse(localStorage.getItem(key)||'{}'))}catch{return emptyProgress()}}
const stageXpById=new Map();
subjectGroups.forEach(group=>group.subjects.forEach(subject=>makeLevelPath(subject).forEach(stage=>stageXpById.set(stage.id,stage.xp))));
function mergeProgress(first,second){
  const left=normalizeProgress(first),right=normalizeProgress(second),completed=[...new Set([...left.completed,...right.completed])];
  const catalogXp=completed.reduce((sum,id)=>sum+(stageXpById.get(id)||0),0);
  const activityOrder=left.lastActive.localeCompare(right.lastActive);
  const latestActivity=activityOrder>0?left:activityOrder<0?right:{...right,streak:Math.max(left.streak,right.streak)};
  const earlierActivity=activityOrder>0?right:left;
  const activeDayGap=latestActivity.lastActive&&earlierActivity.lastActive?(Date.parse(`${latestActivity.lastActive}T00:00:00Z`)-Date.parse(`${earlierActivity.lastActive}T00:00:00Z`))/86400000:0;
  const mergedStreak=activityOrder===0?Math.max(left.streak,right.streak):activeDayGap===1?Math.max(latestActivity.streak,earlierActivity.streak+1):latestActivity.streak;
  const goalOrder=left.goalDate.localeCompare(right.goalDate),goal=goalOrder>0?left:goalOrder<0?right:{...right,todayXP:Math.max(left.todayXP,right.todayXP)};
  const energyOwner=left.energyUpdatedAt.localeCompare(right.energyUpdatedAt)>0?left:right;
  return{completed,xp:Math.max(catalogXp,left.xp,right.xp),streak:mergedStreak,lastActive:latestActivity.lastActive,todayXP:goal.todayXP,goalDate:goal.goalDate,energy:energyOwner.energy,energyUpdatedAt:energyOwner.energyUpdatedAt};
}
let progress=readProgress();
let activeUserId=null,sessionResolved=false,cloudSyncReady=false,energyAccountReady=true,authGeneration=0,cloudSyncTimer=0,cloudSyncQueue=Promise.resolve();
function statusText(state){
  const french=document.documentElement.dataset.language==='fr';
  const labels={checking:['Checking your account…','Vérification du compte…'],local:['Saved on this device','Enregistré sur cet appareil'],syncing:['Syncing progress…','Synchronisation de la progression…'],synced:['Progress synced to your account','Progression synchronisée avec votre compte'],error:['Sync unavailable. Progress is saved on this device.','Synchronisation indisponible. Progression enregistrée sur cet appareil.']};
  return labels[state]?.[french?1:0]||labels.local[french?1:0];
}
function setSyncStatus(state){const node=document.querySelector('#progressSyncText');if(node)node.textContent=statusText(state);const badge=document.querySelector('#progressSyncStatus');if(badge)badge.dataset.state=state}
function writeLocalProgress(){const key=activeUserId?accountStorageKey(activeUserId):sessionResolved?guestStorageKey:storageKey;try{localStorage.setItem(key,JSON.stringify(progress))}catch{}}
let chosen={faculty:subjectGroups[2].faculty,subject:'Earth Science and Universe'};
const levelOptions=['Licence · Year 1','Licence · Year 2','Licence · Year 3','Master · Year 1','Master · Year 2'];
let selectedLevel='Licence · Year 1';
const initialParams=new URLSearchParams(window.location.search);
const initialFaculty=initialParams.get('faculty'),initialSubject=initialParams.get('subject'),initialGroup=subjectGroups.find(group=>group.faculty===initialFaculty&&group.subjects.includes(initialSubject));
if(initialGroup){chosen={faculty:initialGroup.faculty,subject:initialSubject}}
if(levelOptions.includes(initialParams.get('level')))selectedLevel=initialParams.get('level');
let activeStage=-1,questionIndex=0,correctAnswers=0,mode='intro',energySpendPending=false;
const subjectList=document.querySelector('#subjectList');
const pathContent=document.querySelector('#pathContent');
const lessonDialog=document.querySelector('#lessonDialog');
const lessonContinue=document.querySelector('#lessonContinue');
function todayKey(){const date=new Date();return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
let energyNoticeTimer=0;
function energyLanguage(){return document.documentElement.dataset.language==='fr'||(()=>{try{return localStorage.getItem('stc-learnit-language')==='fr'}catch{return false}})()}
function refreshLocalEnergy(){
  const now=Date.now(),last=Date.parse(progress.energyUpdatedAt)||now,ticks=Math.floor(Math.max(0,now-last)/300000);
  if(ticks){progress.energy=Math.min(20,progress.energy+ticks);progress.energyUpdatedAt=progress.energy===20?new Date(now).toISOString():new Date(last+ticks*300000).toISOString();writeLocalProgress()}
}
function updateEnergyView(){
  refreshLocalEnergy();
  const energyCount=document.querySelector('#energyCount'),energyTimer=document.querySelector('#energyTimer');
  if(energyCount)energyCount.textContent=progress.energy;
  if(!energyTimer)return;
  if(progress.energy>=20)energyTimer.textContent=energyLanguage()?'Pleine':'Full';
  else{const left=Math.max(0,300000-(Date.now()-(Date.parse(progress.energyUpdatedAt)||Date.now()))),minutes=Math.floor(left/60000),seconds=Math.floor((left%60000)/1000);energyTimer.textContent=energyLanguage()?`+1 dans ${minutes}:${String(seconds).padStart(2,'0')}`:`+1 in ${minutes}:${String(seconds).padStart(2,'0')}`}
}
function setEnergyNotice(kind){
  const node=document.querySelector('#energyMessage');if(!node)return;
  const messages={
    low:['You need 10 energy to start a level. One energy returns every 5 minutes.','Il faut 10 énergies pour commencer un niveau. Une énergie revient toutes les 5 minutes.'],
    setup:['Energy sync needs the Supabase setup in supabase/learning-energy.sql.','La synchronisation de l’énergie nécessite le script Supabase supabase/learning-energy.sql.'],
    normal:['Each level attempt costs 10 energy. One energy returns every 5 minutes.','Chaque tentative de niveau coûte 10 énergies. Une énergie revient toutes les 5 minutes.']
  };
  node.textContent=messages[kind][energyLanguage()?1:0];
  clearTimeout(energyNoticeTimer);if(kind!=='normal')energyNoticeTimer=setTimeout(()=>setEnergyNotice('normal'),6500);
}
async function refreshCloudEnergy(){
  if(!progressClient||!activeUserId)return;
  const {data,error}=await progressClient.rpc('get_learning_energy');if(error)throw error;
  const row=Array.isArray(data)?data[0]:data;if(!row)return;
  progress.energy=Number(row.energy);progress.energyUpdatedAt=row.energy_updated_at||new Date().toISOString();writeLocalProgress();updateEnergyView();
}
async function spendEnergy(){
  if(activeUserId&&!energyAccountReady){setEnergyNotice('setup');return false}
  if(activeUserId&&cloudSyncReady&&progressClient){
    const {data,error}=await progressClient.rpc('spend_learning_energy');
    if(error){console.error('STC Learnit energy sync:',error);setEnergyNotice('setup');return false}
    const row=Array.isArray(data)?data[0]:data;
    if(row){progress.energy=Number(row.energy);progress.energyUpdatedAt=row.energy_updated_at||new Date().toISOString();writeLocalProgress()}
    updateEnergyView();if(!row?.spent){setEnergyNotice('low');return false}return true;
  }
  refreshLocalEnergy();if(progress.energy<10){updateEnergyView();setEnergyNotice('low');return false}
  if(progress.energy>=20)progress.energyUpdatedAt=new Date().toISOString();
  progress.energy-=10;writeLocalProgress();updateEnergyView();return true;
}
function scheduleCloudSync(){
  if(!progressClient||!activeUserId||!cloudSyncReady)return;
  clearTimeout(cloudSyncTimer);setSyncStatus('syncing');
  cloudSyncTimer=window.setTimeout(()=>{
    const userId=activeUserId,snapshot=normalizeProgress(progress);
    cloudSyncQueue=cloudSyncQueue.then(async()=>{
      if(activeUserId!==userId)return;
      try{
        const {error}=await progressClient.rpc('merge_learning_progress',{
          p_completed:snapshot.completed,p_xp:snapshot.xp,p_streak:snapshot.streak,
          p_last_active:snapshot.lastActive||null,p_today_xp:snapshot.todayXP,p_goal_date:snapshot.goalDate||null
        });
        if(error)throw error;
        const {data,error:readError}=await progressClient.from('learning_progress').select('*').eq('user_id',userId).single();
        if(readError)throw readError;
        if(activeUserId!==userId)return;
        const cloudProgress=normalizeProgress(data);
        progress=mergeProgress(progress,cloudProgress);writeLocalProgress();
        const needsReconcile=progress.completed.length>cloudProgress.completed.length||progress.xp>cloudProgress.xp||progress.streak>cloudProgress.streak||progress.todayXP>cloudProgress.todayXP;
        try{localStorage.setItem(legacyOwnerKey,userId)}catch{}
        setSyncStatus('synced');
        updateProgressStats();renderPath();
        if(needsReconcile)scheduleCloudSync();
      }catch(error){
        console.error('STC Learnit progress sync:',error);
        if(activeUserId===userId)setSyncStatus('error');
      }
    });
  },350);
}
function saveProgress(){writeLocalProgress();scheduleCloudSync()}
let loadingUserId=null;
async function applyLearningSession(session){
  const userId=session?.user?.id||null;
  if(userId===activeUserId&&sessionResolved&&(userId===null||cloudSyncReady||loadingUserId===userId))return;
  const generation=++authGeneration;sessionResolved=true;activeUserId=userId;cloudSyncReady=false;energyAccountReady=!userId;loadingUserId=userId;
  if(!userId){
    const owner=(()=>{try{return localStorage.getItem(legacyOwnerKey)}catch{return null}})();
    const guest=readProgress(guestStorageKey),legacy=!owner?readProgress(storageKey):emptyProgress();
    progress=mergeProgress(guest,legacy);loadingUserId=null;setSyncStatus('local');updateProgressStats();renderPath();return;
  }
  setSyncStatus('checking');
  const cached=readProgress(accountStorageKey(userId));
  let owner=null;try{owner=localStorage.getItem(legacyOwnerKey)}catch{}
  const canImportLegacy=!owner||owner===userId;
  const legacy=canImportLegacy?mergeProgress(readProgress(storageKey),readProgress(guestStorageKey)):emptyProgress();
  const localCandidate=mergeProgress(cached,legacy);
  try{
    const {data,error}=await progressClient.from('learning_progress').select('*').eq('user_id',userId).maybeSingle();
    if(error)throw error;
    if(generation!==authGeneration)return;
    progress=mergeProgress(localCandidate,data?normalizeProgress(data):emptyProgress());
    cloudSyncReady=true;loadingUserId=null;
    try{await refreshCloudEnergy();energyAccountReady=true}catch(error){console.error('STC Learnit energy load:',error);energyAccountReady=false}
    if(generation!==authGeneration)return;
    writeLocalProgress();updateProgressStats();renderPath();scheduleCloudSync();
  }catch(error){
    if(generation!==authGeneration)return;
    console.error('STC Learnit progress load:',error);
    progress=localCandidate;cloudSyncReady=true;energyAccountReady=false;loadingUserId=null;
    writeLocalProgress();setSyncStatus('error');updateProgressStats();renderPath();
  }
}
function initializeProgressSync(){
  if(!progressClient){sessionResolved=true;setSyncStatus('local');updateProgressStats();renderPath();return}
  progressClient.auth.onAuthStateChange((_event,session)=>{window.setTimeout(()=>applyLearningSession(session),0)});
  progressClient.auth.getSession().then(({data,error})=>{
    if(error){console.error('STC Learnit account check:',error);sessionResolved=true;setSyncStatus('local');return}
    applyLearningSession(data.session);
  }).catch(error=>{console.error('STC Learnit account check:',error);sessionResolved=true;setSyncStatus('local')});
}
window.addEventListener('online',()=>{if(activeUserId&&cloudSyncReady)scheduleCloudSync()});
window.addEventListener('stc:language-change',()=>setSyncStatus(document.querySelector('#progressSyncStatus')?.dataset.state||'local'));
async function recordTournamentStep(stage){
  if(!progressClient||!activeUserId||!cloudSyncReady)return;
  const userId=activeUserId,snapshot=normalizeProgress(progress);
  try{
    const {error:syncError}=await progressClient.rpc('merge_learning_progress',{
      p_completed:snapshot.completed,p_xp:snapshot.xp,p_streak:snapshot.streak,
      p_last_active:snapshot.lastActive||null,p_today_xp:snapshot.todayXP,p_goal_date:snapshot.goalDate||null
    });
    if(syncError)throw syncError;
    if(activeUserId!==userId)return;
    const {error}=await progressClient.rpc('record_tournament_step',{p_stage_id:stage.id,p_xp:stage.xp});
    if(error)throw error;
  }catch(error){console.error('STC Learnit tournament score:',error)}
}
function addProgressForStage(stage){
  if(progress.completed.includes(stage.id)){recordTournamentStep(stage);return}
  const today=todayKey();
  if(progress.goalDate!==today){progress.goalDate=today;progress.todayXP=0}
  if(progress.lastActive!==today){const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);const yesterdayKey=`${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;progress.streak=progress.lastActive===yesterdayKey?progress.streak+1:1;progress.lastActive=today}
  progress.completed.push(stage.id);progress.xp+=stage.xp;progress.todayXP+=stage.xp;saveProgress();recordTournamentStep(stage);
}
function updateProgressStats(){
  if(progress.goalDate!==todayKey()){progress.goalDate=todayKey();progress.todayXP=0;saveProgress()}
  const level=Math.floor(progress.xp/100)+1,levelXp=progress.xp%100;
  document.querySelector('#streakCount').textContent=progress.streak;
  document.querySelector('#xpCount').textContent=progress.xp;
  document.querySelector('#goalProgress').textContent=Math.min(progress.todayXP,30);
  document.querySelector('#goalFill').style.width=`${Math.min(progress.todayXP/30*100,100)}%`;
  document.querySelector('#goalMessage').textContent=progress.todayXP>=30?'Daily goal complete — great work!':'A little practice goes a long way.';
  updateEnergyView();
  return{level,levelXp};
}
function renderSubjects(){
  subjectList.innerHTML='';
  subjectGroups.forEach(group=>{
    const section=document.createElement('section');section.className='subject-faculty';
    const heading=document.createElement('h3');heading.textContent=group.faculty;section.appendChild(heading);
    group.subjects.forEach(subject=>{
      
      const button=document.createElement('button');button.type='button';button.className='subject-option';
      button.classList.toggle('is-active',chosen.subject===subject);
      button.innerHTML=`<span class="subject-option-icon"><img src="assets/icons/${subject==='Geology'||subject==='Earth Science and Universe'?'earth-energy.svg':'book-open.svg'}" alt=""></span><span class="subject-option-text"><strong>${subject}</strong><small>LESSONS · GAME · EXAM</small></span><span class="subject-option-arrow">↗</span>`;
      button.addEventListener('click',()=>selectSubject(group.faculty,subject));
      section.appendChild(button);
    });
    subjectList.appendChild(section);
  });
}
function selectSubject(faculty,subject){chosen={faculty,subject};renderSubjects();renderPath()}
function renderOldPath(){
  courseStages=makeCourseStages(chosen.subject);
  const {level,levelXp}=updateProgressStats();
  const completedCount=courseStages.filter(stage=>progress.completed.includes(stage.id)).length,percent=Math.round(completedCount/courseStages.length*100);
  const nodes=courseStages.map((stage,index)=>{
    const complete=progress.completed.includes(stage.id),unlocked=index===0||progress.completed.includes(courseStages[index-1].id),current=unlocked&&!complete;
    const label=complete?'COMPLETED':unlocked?'START HERE':'LOCKED';
    const icon=complete?'✓':stage.type.includes('EXAM')||stage.type.includes('CHECKPOINT')?'★':String(index+1).padStart(2,'0');
    return `<button type="button" class="path-node ${complete?'is-complete':''} ${current?'is-current':''} ${unlocked?'':'is-locked'}" data-stage="${index}" ${unlocked?'':'disabled'}><span class="node-rail"><span class="node-circle">${icon}</span></span><span class="node-copy"><span class="node-label">${stage.type}</span><strong>${stage.title}</strong><small>${stage.summary}</small></span><span class="node-meta">${complete?'✓ DONE':unlocked?stage.duration:'🔒'}</span></button>`;
  }).join('');
  const completedExam=progress.completed.includes(courseStages.at(-1).id),unit=subjectBlueprints[categoryFor(chosen.subject)].unit;
  pathContent.innerHTML=`<div class="path-course-head"><div class="path-course-icon"><img src="assets/icons/${chosen.subject==='Geology'||chosen.subject==='Earth Science and Universe'?'earth-energy.svg':'book-open.svg'}" alt=""></div><div class="path-course-copy"><span class="course-kicker">YOUR LEARNING PATH · ${chosen.faculty}</span><h2>${chosen.subject} <span class="level-pill">LEVEL ${level}</span></h2><p>${selectedLevel}</p></div><div class="course-xp"><img src="assets/icons/xp.svg" alt=""><strong>${progress.xp}</strong><small>XP</small></div></div><div class="course-progress-box"><div class="course-progress-top"><span>YOUR PROGRESS</span><strong>${completedCount} / ${courseStages.length} STEPS</strong></div><div class="course-progress-track"><span style="width:${percent}%"></span></div><div class="level-progress"><span>Level ${level}</span><span>${levelXp} / 100 XP to next level</span></div></div><div class="unit-heading"><div><span class="unit-tag">UNIT 1</span><h3>${unit}</h3></div><span class="unit-xp">✦ 160 XP available</span></div><div class="path-track">${nodes}</div>${completedExam?`<div class="level-up-banner"><span>✦</span><div><strong>Level complete!</strong><small>You passed the ${chosen.subject} final exam. Keep learning to build your skills and earn XP.</small></div></div>`:''}<div class="path-footer-note">Complete the lessons to unlock the matching game, checkpoint and final exam. Your progress is saved automatically.</div>`;
  pathContent.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>openStage(Number(button.dataset.stage))));
}
function renderPath(){
  courseStages=makeLevelPath(chosen.subject);updateProgressStats();
  const completedCount=courseStages.filter(stage=>progress.completed.includes(stage.id)).length;
  const firstOpen=courseStages.findIndex((stage,index)=>!progress.completed.includes(stage.id)&&(index===0||progress.completed.includes(courseStages[index-1].id)));
  const currentLevel=firstOpen<0?100:firstOpen+1,percent=Math.round(completedCount/100*100);
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const sections=Array.from({length:5},(_,unitIndex)=>{
    const unitStages=courseStages.filter(stage=>stage.unit===unitIndex+1);
    const unitDone=unitStages.filter(stage=>progress.completed.includes(stage.id)).length;
    const nodes=unitStages.map(stage=>{
      const index=stage.globalLevel-1,complete=progress.completed.includes(stage.id),unlocked=index===0||progress.completed.includes(courseStages[index-1].id);
      const icon=complete?'✓':stage.type.includes('EXAM')||stage.type.includes('CHECKPOINT')?'★':String(stage.level).padStart(2,'0');
      const energyLabel=energyLanguage()?'⚡ −10 énergie':'⚡ −10 energy';
      return `<button type="button" class="path-node ${complete?'is-complete':''} ${unlocked&&!complete?'is-current':''} ${unlocked?'':'is-locked'}" data-stage="${index}" ${unlocked?'':'disabled'} aria-label="${escape(stage.title)} · ${energyLabel}"><span class="node-rail"><span class="node-circle">${icon}</span></span><span class="node-copy"><span class="node-label">${escape(stage.type)}</span><strong>${escape(stage.title)}</strong><small>${escape(stage.summary)}</small></span><span class="node-meta">${complete?'✓ DONE':unlocked?'⚡ 10':'🔒'}</span></button>`;
    }).join('');
    return `<section class="unit-section"><div class="unit-heading"><div><span class="unit-tag">UNIT ${unitIndex+1} · 20 LEVELS</span><h3>${escape(unitStages[0]?.unitTitle||'')}</h3></div><span class="unit-xp">${unitDone} / 20</span></div><div class="path-track">${nodes}</div></section>`;
  }).join('');
  const unit=subjectBlueprints[categoryFor(chosen.subject)].unit;
  pathContent.innerHTML=`<div class="path-course-head"><div class="path-course-icon"><img src="assets/icons/${chosen.subject==='Geology'||chosen.subject==='Earth Science and Universe'?'earth-energy.svg':'book-open.svg'}" alt=""></div><div class="path-course-copy"><span class="course-kicker">YOUR LEARNING PATH · ${escape(chosen.faculty)}</span><h2>${escape(chosen.subject)} <span class="level-pill">LEVEL ${currentLevel} / 100</span></h2><p>${escape(selectedLevel)} · ${escape(unit)}</p></div><div class="course-xp"><img src="assets/icons/xp.svg" alt=""><strong>${progress.xp}</strong><small>XP</small></div></div><div class="course-progress-box"><div class="course-progress-top"><span>YOUR PROGRESS</span><strong>${completedCount} / 100 LEVELS</strong></div><div class="course-progress-track"><span style="width:${percent}%"></span></div><div class="level-progress"><span>${currentLevel === 100 && completedCount === 100?'All 100 levels complete':`Current level ${currentLevel}`}</span><span>5 units · 20 levels each</span></div></div>${sections}<div class="path-footer-note">Each level attempt uses 10 energy, whether you pass or not. Energy returns at one point every five minutes.</div>`;
  pathContent.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>openStage(Number(button.dataset.stage))));
}
async function openStage(index){
  if(index<0||index>=courseStages.length||energySpendPending)return;
  energySpendPending=true;let hasEnergy=false;try{hasEnergy=await spendEnergy()}catch(error){console.error('STC Learnit energy spend:',error);setEnergyNotice('setup')}finally{energySpendPending=false}
  if(!hasEnergy)return;
  activeStage=index;questionIndex=0;correctAnswers=0;mode='intro';
  const stage=courseStages[index];
  document.querySelector('#lessonType').textContent=stage.type;
  document.querySelector('#lessonTitle').textContent=stage.title;
  document.querySelector('#lessonBody').textContent=stage.intro;
  document.querySelector('#lessonQuiz').hidden=true;
  document.querySelector('#lessonGame').hidden=true;
  document.querySelector('#lessonBody').hidden=false;
  document.querySelector('#lessonProgressFill').style.width='0%';
  const xpTag=document.querySelector('.lesson-xp');xpTag.innerHTML=`<img src="assets/icons/xp.svg" alt=""> +${stage.xp} XP · ${energyLanguage()?'⚡ −10 énergie':'⚡ −10 energy'}`;
  lessonContinue.disabled=false;lessonContinue.innerHTML=stage.kind==='matching'?'Start matching <span>↗</span>':'Start practice <span>↗</span>';
  if(!lessonDialog.open)lessonDialog.showModal();
}
let selectedTerm=-1,matchedPairs=new Set();
function startMatchingGame(){
  const stage=courseStages[activeStage];selectedTerm=-1;matchedPairs=new Set();mode='matching';
  document.querySelector('#lessonBody').hidden=true;document.querySelector('#lessonQuiz').hidden=true;document.querySelector('#lessonGame').hidden=false;
  const terms=document.querySelector('#matchTerms'),definitions=document.querySelector('#matchDefinitions');terms.innerHTML='';definitions.innerHTML='';
  stage.pairs.forEach((pair,index)=>{const button=document.createElement('button');button.type='button';button.className='match-card';button.textContent=pair.term;button.dataset.pair=index;button.addEventListener('click',()=>{if(matchedPairs.has(index))return;selectedTerm=index;terms.querySelectorAll('.match-card').forEach(item=>item.classList.toggle('is-selected',Number(item.dataset.pair)===index))});terms.appendChild(button)});
  [...stage.pairs].map((pair,index)=>({pair,index})).reverse().forEach(({pair,index})=>{const button=document.createElement('button');button.type='button';button.className='match-card';button.textContent=pair.definition;button.dataset.pair=index;button.addEventListener('click',()=>checkMatch(index,button));definitions.appendChild(button)});
  document.querySelector('#matchFeedback').hidden=true;lessonContinue.disabled=true;lessonContinue.textContent='Match all pairs';document.querySelector('#lessonProgressFill').style.width='0%';
}
function checkMatch(index,button){
  const feedback=document.querySelector('#matchFeedback');
  if(selectedTerm<0){feedback.hidden=false;feedback.className='answer-feedback is-wrong';feedback.textContent='Choose a concept first.';return}
  if(selectedTerm===index){matchedPairs.add(index);document.querySelectorAll(`.match-card[data-pair="${index}"]`).forEach(card=>{card.disabled=true;card.classList.remove('is-selected');card.classList.add('is-matched')});selectedTerm=-1;feedback.hidden=false;feedback.className='answer-feedback is-right';feedback.textContent='Nice match!';document.querySelector('#lessonProgressFill').style.width=`${Math.round(matchedPairs.size/courseStages[activeStage].pairs.length*100)}%`;if(matchedPairs.size===courseStages[activeStage].pairs.length){mode='game-complete';lessonContinue.disabled=false;lessonContinue.textContent='Finish game';feedback.textContent='All pairs matched. Great recall!'} }
  else{button.classList.add('is-mismatch');setTimeout(()=>button.classList.remove('is-mismatch'),450);feedback.hidden=false;feedback.className='answer-feedback is-wrong';feedback.textContent='Not a match yet. Try another meaning.'}
}
function finishMatchingGame(){const stage=courseStages[activeStage],alreadyCompleted=progress.completed.includes(stage.id);addProgressForStage(stage);document.querySelector('#lessonGame').hidden=true;const body=document.querySelector('#lessonBody');body.hidden=false;body.innerHTML=`<div class="result-mark">✓</div><h3>Great matching!</h3><p>You matched every concept. ${alreadyCompleted?'Review complete—no extra XP this time.':`You earned ${stage.xp} XP.`} Your checkpoint is now unlocked.</p>`;lessonContinue.innerHTML='Continue learning <span>↗</span>';mode='passed';updateProgressStats()}
function renderQuestion(){
  const stage=courseStages[activeStage],question=stage.questions[questionIndex];
  mode='question';
  document.querySelector('#lessonBody').hidden=true;
  document.querySelector('#lessonQuiz').hidden=false;
  document.querySelector('#answerFeedback').hidden=true;
  document.querySelector('#questionText').textContent=question.q;
  document.querySelector('#lessonProgressFill').style.width=`${Math.round((questionIndex/stage.questions.length)*100)}%`;
  const options=document.querySelector('#answerOptions');options.innerHTML='';
  question.options.forEach((option,index)=>{
    const button=document.createElement('button');button.type='button';button.className='answer-option';button.textContent=option;
    button.addEventListener('click',()=>checkAnswer(index));options.appendChild(button);
  });
  lessonContinue.disabled=true;lessonContinue.textContent='Choose an answer';
}
function checkAnswer(index){
  const stage=courseStages[activeStage],question=stage.questions[questionIndex],buttons=[...document.querySelectorAll('.answer-option')],correct=index===question.answer;
  if(correct)correctAnswers++;
  buttons.forEach((button,i)=>{button.disabled=true;if(i===question.answer)button.classList.add('is-right');else if(i===index)button.classList.add('is-wrong')});
  const feedback=document.querySelector('#answerFeedback');feedback.hidden=false;feedback.className=`answer-feedback ${correct?'is-right':'is-wrong'}`;feedback.textContent=`${correct?'That’s right!':'Not quite.'} ${question.why}`;
  mode='answered';lessonContinue.disabled=false;lessonContinue.textContent=questionIndex===stage.questions.length-1?'Finish practice':'Next question';
  document.querySelector('#lessonProgressFill').style.width=`${Math.round(((questionIndex+1)/stage.questions.length)*100)}%`;
}
function finishStage(){
  const stage=courseStages[activeStage],passed=correctAnswers>=(stage.pass||stage.questions.length);
  document.querySelector('#lessonQuiz').hidden=true;document.querySelector('#lessonBody').hidden=false;
  const body=document.querySelector('#lessonBody');
  if(passed){const alreadyCompleted=progress.completed.includes(stage.id);addProgressForStage(stage);body.innerHTML=`<div class="result-mark">✓</div><h3>Brilliant work!</h3><p>You got ${correctAnswers} of ${stage.questions.length} right. ${alreadyCompleted?'Review complete—no extra XP this time.':`You earned ${stage.xp} XP.`} Keep your momentum going.</p>`;lessonContinue.innerHTML='Continue learning <span>↗</span>';mode='passed'}
  else{body.innerHTML=`<div class="result-mark try-again">↻</div><h3>One more round?</h3><p>You got ${correctAnswers} of ${stage.questions.length} right. Review the lesson and try again—you need ${stage.pass||stage.questions.length} correct to pass.</p>`;lessonContinue.textContent='Try again';mode='failed'}
  updateProgressStats();
}
lessonContinue.addEventListener('click',()=>{
  if(mode==='intro'){if(courseStages[activeStage].kind==='matching'){startMatchingGame();return}renderQuestion();return}
  if(mode==='matching')return;
  if(mode==='game-complete'){finishMatchingGame();return}
  if(mode==='question')return;
  if(mode==='answered'){
    if(questionIndex<courseStages[activeStage].questions.length-1){questionIndex++;renderQuestion()}
    else finishStage();
    return;
  }
  if(mode==='failed'){openStage(activeStage);return}
  if(mode==='passed'){lessonDialog.close();renderPath()}
});
document.querySelector('#lessonClose').addEventListener('click',()=>lessonDialog.close());
document.querySelector('#lessonBack').addEventListener('click',()=>lessonDialog.close());
document.querySelector('#learnMenuToggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
window.addEventListener('stc:language-change',()=>{updateEnergyView();setEnergyNotice('normal')});window.setInterval(updateEnergyView,1000);
updateProgressStats();renderSubjects();renderPath();initializeProgressSync();
