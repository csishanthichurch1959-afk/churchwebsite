
const cards = [...document.querySelectorAll('.person-card')];
const input = document.getElementById('leaderSearch');
const buttons = [...document.querySelectorAll('.filter-btn')];
let activeType='all';
function applyFilter(){
  const q=(input?.value||'').trim().toLowerCase();
  cards.forEach(card=>{
    const matchesText=!q || card.textContent.toLowerCase().includes(q);
    const matchesType=activeType==='all' || card.dataset.type===activeType;
    card.classList.toggle('hidden', !(matchesText && matchesType));
  });
  const visible=cards.filter(c=>!c.classList.contains('hidden')).length;
  const count=document.getElementById('resultCount');
  if(count) count.textContent=`${visible} record${visible===1?'':'s'} shown`;
}
input?.addEventListener('input',applyFilter);
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  activeType=btn.dataset.filter;
  buttons.forEach(b=>b.classList.toggle('active',b===btn));
  applyFilter();
}));
applyFilter();
