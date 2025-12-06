// ==============================
// 🔹 CONFIGURACIÓN DE FIREBASE 🔹
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
// 🔹 VARIABLES PRINCIPALES 🔹
const storyFeed = document.getElementById('storyFeed');
const storyInput = document.getElementById('storyInput');
const storyModal = document.getElementById('storyModal');
const newStoryBtn = document.getElementById('newStoryBtn');
const closeStoryModal = document.getElementById('closeStoryModal');

const nicknameModal = document.getElementById('nicknameModal');
const nicknameInput = document.getElementById('nicknameInput');
const setNicknameBtn = document.getElementById('setNicknameBtn');
const changeNickBtn = document.getElementById('changeNickBtn');

const themeBtn = document.getElementById('themeBtn');
const shareBtn = document.getElementById('shareBtn');

let nickname = localStorage.getItem('storysNickname') || 'Anónimo';
nicknameInput.value = nickname;

// ==============================
// 🔹 MODALES 🔹
newStoryBtn.addEventListener('click', () => storyModal.style.display = 'flex');
closeStoryModal.addEventListener('click', () => storyModal.style.display = 'none');

changeNickBtn.addEventListener('click', () => nicknameModal.style.display = 'flex');
setNicknameBtn.addEventListener('click', () => {
  nickname = nicknameInput.value.trim() || 'Anónimo';
  localStorage.setItem('storysNickname', nickname);
  nicknameModal.style.display = 'none';
});

// ==============================
// 🔹 MODO CLARO / OSCURO 🔹
if(localStorage.getItem('storysTheme') === 'dark') document.body.classList.add('dark');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('storysTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ==============================
// 🔹 COMPARTIR PÁGINA 🔹
shareBtn.addEventListener('click', () => {
  if(navigator.share){
    navigator.share({title:'Storys', url:location.href});
  } else {
    navigator.clipboard.writeText(location.href);
    alert('Enlace copiado al portapapeles');
  }
});

// ==============================
// 🔹 PUBLICAR STORY 🔹
document.getElementById('publishBtn').addEventListener('click', () => {
  const text = storyInput.value.trim();
  if(!text) return;

  // COMANDO SECRETO #OWNER Delete
  if(text === '#OWNER Delete'){
    db.ref('torys').remove()
      .then(() => {
        storyFeed.innerHTML = '<div class="placeholder">No hay Torys aún, sé el primero en publicar 💬</div>';
        storyInput.value = '';
        storyModal.style.display = 'none';
        alert('Todos los Torys han sido borrados ✅');
      }).catch(err => console.error(err));
    return;
  }

  // Publicación normal
  const dataObj = {
    text,
    nickname,
    timestamp: Date.now(),
    '👍':0,'👎':0,'😂':0,'😡':0
  };
  db.ref('torys').push(dataObj);
  storyInput.value = '';
  storyModal.style.display = 'none';
});

// ==============================
// 🔹 RENDERIZAR STORIES EN TIEMPO REAL 🔹
db.ref('torys').on('child_added', snap => {
  const data = snap.val();
  const div = document.createElement('div');
  div.className = 'storyCard';
  div.dataset.id = snap.key;

  const date = new Date(data.timestamp || Date.now());

  div.innerHTML = `
    <div class="nicknameBubble">${data.nickname}</div>
    <div>${data.text}</div>
    <small>${date.toLocaleString()}</small>
  `;

  storyFeed.prepend(div);
});

db.ref('torys').on('child_removed', snap => {
  // Actualiza feed si se borra un Story
  const div = document.querySelector(`.storyCard[data-id='${snap.key}']`);
  if(div) div.remove();
  if(storyFeed.children.length === 0){
    storyFeed.innerHTML = '<div class="placeholder">No hay Torys aún, sé el primero en publicar 💬</div>';
  }
});
