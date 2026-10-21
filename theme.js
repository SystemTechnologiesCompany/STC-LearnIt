const rootElement=document.documentElement;
const themeButton=document.querySelector('#themeToggle');
const announcement=document.querySelector('.announcement');
const announcementClose=document.querySelector('.announcement-close');
try{if(sessionStorage.getItem('stc-announcement-dismissed')==='true')announcement?.remove()}catch{}
announcementClose?.addEventListener('click',()=>{
  announcement?.classList.add('is-closing');
  try{sessionStorage.setItem('stc-announcement-dismissed','true')}catch{}
  window.setTimeout(()=>announcement?.remove(),220);
});
function setTheme(theme,persist=false){
  const dark=theme==='dark';
  rootElement.classList.add('theme-changing');
  if(dark)rootElement.dataset.theme='dark';else delete rootElement.dataset.theme;
  if(persist){try{localStorage.setItem('stc-learnit-theme',dark?'dark':'light')}catch{}}
  if(themeButton){
    themeButton.checked=dark;
    const french=rootElement.dataset.language==='fr';
    themeButton.setAttribute('aria-label',french?(dark?'Passer en mode clair':'Passer en mode sombre'):(dark?'Switch to light mode':'Switch to dark mode'));
    themeButton.title=french?(dark?'Passer en mode clair':'Passer en mode sombre'):(dark?'Switch to light mode':'Switch to dark mode');
  }
  window.setTimeout(()=>rootElement.classList.remove('theme-changing'),480);
}
setTheme(rootElement.dataset.theme==='dark'?'dark':'light');
themeButton?.addEventListener('change',()=>setTheme(themeButton.checked?'dark':'light',true));
window.addEventListener('storage',event=>{if(event.key==='stc-learnit-theme')setTheme(event.newValue==='dark'?'dark':'light')});
