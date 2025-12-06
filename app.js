// Firebase
const firebaseConfig = { /* Tu config aquí */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Nickname
let nickname = localStorage.getItem('toryNickname') || '';
const nicknameModal = document.getElementById('nicknameModal');
const nicknameInput = document.getElementById('nicknameInput');
nicknameInput.value = nickname;
if(!nickname) nicknameModal.style.display = 'flex';
document.getElementById('setNicknameBtn').addEventListener('click', ()=>{
  nickname = nicknameInput.value.trim() || 'Anónimo';
  localStorage.setItem('toryNickname', nickname);
  nicknameModal.style.display = 'none';
});

// DOM
const toryFeed = document.getElementById('toryFeed');
const toryForm = document.getElementById('toryForm');
const toryInput = document.getElementById('toryInput');
const onlineCount = document.getElementById('onlineCount');

// Presencia online
const presenceRef = db.ref('presence');
const myRef = presenceRef.push(); myRef.onDisconnect().remove(); myRef.set(true);
presenceRef.on('value', snap=>{ onlineCount.textContent=`Personas en línea: ${snap.numChildren()}`; });

// Render Tory
function renderTory(id,data){
  if(document.querySelector('.placeholder')) document.querySelector('.placeholder').remove();
  const div=document.createElement('div');
  div.className='toryCard'; div.dataset.id=id;
  const date=new Date(data.timestamp||Date.now());
  div.innerHTML=`<div class='timestamp'>${date.toLocaleString()}</div>
  <div style="display:flex;align-items:center;gap:10px;">
    <div class="nicknameBubbleCard">${data.nickname||'Anónimo'}</div>
    <div>${data.text}</div>
  </div>`;
  const actions=document.createElement('div'); actions.className='toryActions';
  ['👍','👎','😂','😡'].forEach(emoji=>{
    const btn=document.createElement('button'); btn.textContent=`${emoji} ${data[emoji]||0}`;
    btn.addEventListener('click',()=>{ db.ref('torys/'+id+'/'+emoji).transaction(c=>(c||0)+1); });
    actions.appendChild(btn);
  });
  div.appendChild(actions);
  toryFeed.prepend(div);
}

// Firebase listeners
db.ref('torys').on('child_added', snap=>renderTory(snap.key, snap.val()));
db.ref('torys').on('child_changed', snap=>{
  const div=document.querySelector(`.toryCard[data-id='${snap.key}']`);
  if(div){ const actions=div.querySelector('.toryActions'); ['👍','👎','😂','😡'].forEach((emoji,i)=>{actions.children[i].textContent=`${emoji} ${snap.val()[emoji]||0}`;}); }
});

// Publicar Tory y comando secreto
toryForm.addEventListener('submit', e=>{
  e.preventDefault();
  const text=toryInput.value.trim();
  if(!text) return;
  if(text === '#OWNER Delete'){ db.ref('torys').remove(); toryFeed.innerHTML='<div class="placeholder">No hay Torys aún, sé el primero en publicar 💬</div>'; toryInput.value=''; return; }

  const dataObj={text,timestamp:Date.now(),nickname:nickname||'Anónimo'};
  ['👍','👎','😂','😡'].forEach(emoji=>dataObj[emoji]=0);
  db.ref('torys').push(dataObj);
  toryInput.value='';
});

// Partículas
const canvas=document.querySelector('.particles'); const ctx=canvas.getContext('2d'); let particles=[];
function resizeCanvas(){canvas.width=window.innerWidth; canvas.height=window.innerHeight;}
window.addEventListener('resize',resizeCanvas); resizeCanvas();
for(let i=0;i<200;i++){particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, radius:Math.random()*3+1.5, speed:Math.random()*1+0.5});}
function animateParticles(){ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{ctx.beginPath(); ctx.arc(p.x,p.y,p.radius,0,Math.PI*2); ctx.fillStyle='rgba(24,119,242,0.7)'; ctx.fill(); p.y-=p.speed; if(p.y<0)p.y=canvas.height;}); requestAnimationFrame(animateParticles);}
animateParticles();

// Scroll top
document.getElementById('scrollTopBtn').addEventListener('click', ()=>{ window.scrollTo({top:0,behavior:'smooth'}); });

// Barra inferior
document.getElementById('themeBtn').addEventListener('click', ()=>{ document.body.classList.toggle('amoled'); });
document.getElementById('changeNickBtn').addEventListener('click', ()=>{ nicknameModal.style.display='flex'; });
document.getElementById('shareBtn').addEventListener('click', ()=>{ navigator.share ? navigator.share({title:'Foro de Torys',url:location.href}) : alert('Copiar link: '+location.href); });
document.getElementById('newToryBtn').addEventListener('click', ()=>{ toryInput.focus(); });
