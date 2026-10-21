const menu=document.querySelector('#leaderMenuToggle');menu?.addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
// Rankings are intentionally empty until XP is backed by shared student accounts.
// Re-render on tab focus so a future live data adapter can refresh without a reload.
window.addEventListener('focus',()=>window.dispatchEvent(new CustomEvent('leaderboard:refresh')));
