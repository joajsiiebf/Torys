// ==============================
// CONFIGURACIÓN FIREBASE (compat)
// ==============================
const firebaseConfig = {
  apiKey: "AIzaSyDYPKKEtJmqazv6MhuRhfS79jyHf2NpqoA",
  authDomain: "torys-16335.firebaseapp.com",
  databaseURL: "https://torys-16335-default-rtdb.firebaseio.com",
  projectId: "torys-16335",
  storageBucket: "torys-16335.firebasestorage.app",
  messagingSenderId: "97006009990",
  appId: "1:97006009990:web:f815478cf0d219f8d15b07",
  measurementId: "G-H9D9DEKZ7K"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ==============================
// ELEMENTOS DOM
// ==============================
const storyFeed = document.getElementById('storyFeed');
const storyModal = document.getElementById('storyModal');
const storyInput = document.getElementById('storyInput');
const publishBtn = document.getElementById('publishBtn');
const closeStoryModal = document.getElementById('closeStoryModal');

const nicknameModal = document.getElementById('nicknameModal');
const nicknameInput = document.getElementById('nicknameInput');
const setNicknameBtn = document.getElementById('setNicknameBtn');

const themeBtn = document.getElementById('themeBtn');
const newStoryBtn = document.getElementById('newStoryBtn');
const changeNickBtn = document.getElementById('changeNickBtn');
const shareBtn = document.getElementById('shareBtn');

// ==============================
// NICKNAME & THEME
// ==============================
let nickname = localStorage.getItem('storysNickname') || '';
let darkMode = localStorage.getItem('storysDarkMode') === 'true';

document.body.classList.toggle('dark', darkMode);

if(!nickname) nicknameModal.style.display = 'flex';
else nicknameInput.value = nickname;

setNicknameBtn.addEventListener('click', ()=>{
  nickname = nicknameInput.value.trim() || 'Anónimo';
  localStorage.setItem('storysNickname', nickname);
  nicknameModal.style.display = 'none';
});

themeBtn.addEventListener('click', ()=>{
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
  localStorage.setItem('storysDarkMode', darkMode);
});

newStoryBtn.addEventListener('click', ()=> storyModal.style.display = 'flex');
closeStoryModal.addEventListener('click', ()=> storyModal.style.display = 'none');
changeNickBtn.addEventListener('click', ()=> nicknameModal.style.display = 'flex');

shareBtn.addEventListener('click', ()=>{
  if(navigator.share) navigator.share({title:'Storys', url: location.href});
  else navigator.clipboard.writeText(location.href).then(()=>alert('Link copiado!'));
});

// ==============================
// STORIES + REACTIONS
// ==============================
function renderStory(id, data){
  if(document.querySelector('.placeholder')) document.querySelector('.placeholder').remove();

  const div = document.createElement('div');
  div.className = 'storyCard';
  div.dataset.id = id;
  const date = new Date(data.timestamp);

  div.innerHTML = `
    <div class="nicknameBubble">${data.nickname}</div>
    <div>${data.text}</div>
    <small>${date.toLocaleString()}</small>
    <div class="reactions">
      <button data-emoji="👍">👍 ${data['👍']||0}</button>
      <button data-emoji="👎">👎 ${data['👎']||0}</button>
      <button data-emoji="😂">😂 ${data['😂']||0}</button>
      <button data-emoji="😡">😡 ${data['😡']||0}</button>
    </div>
  `;

  const buttons = div.querySelectorAll('.reactions button');
  buttons.forEach(btn => {
    btn.addEventListener('click', ()=>{
      const emoji = btn.dataset.emoji;
      const emojiRef = db.ref('stories/'+id+'/'+emoji);
      emojiRef.transaction(current => (current||0)+1);
    });
  });

  storyFeed.prepend(div);
}

const storiesRef = db.ref('stories');
storiesRef.on('child_added', snap => renderStory(snap.key, snap.val()));
storiesRef.on('child_changed', snap => {
  const div = document.querySelector(`.storyCard[data-id='${snap.key}']`);
  if(div){
    ['👍','👎','😂','😡'].forEach((emoji,i)=>{
      div.querySelectorAll('.reactions button')[i].textContent = `${emoji} ${snap.val()[emoji]||0}`;
    });
  }
});

publishBtn.addEventListener('click', ()=>{
  const text = storyInput.value.trim();
  if(!text) return;

  const storyObj = {
    nickname: nickname || 'Anónimo',
    text,
    timestamp: Date.now(),
    '👍':0,'👎':0,'😂':0,'😡':0
  };

  storiesRef.push(storyObj);
  storyInput.value = '';
  storyModal.style.display = 'none';
});
