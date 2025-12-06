// ===============================
// Import Firebase
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.25.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/9.25.0/firebase-firestore.js";

// ===============================
// Pega aquí tu configuración de Firebase
// ===============================
const firebaseConfig = {
  // 🔹 apiKey: "TU_API_KEY",
  // 🔹 authDomain: "TU_PROJECT.firebaseapp.com",
  // 🔹 projectId: "TU_PROJECT_ID",
  // 🔹 storageBucket: "TU_PROJECT.appspot.com",
  // 🔹 messagingSenderId: "TU_MESSAGING_SENDER_ID",
  // 🔹 appId: "TU_APP_ID"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===============================
// Variables y elementos del DOM
// ===============================
let nickname = localStorage.getItem('storysNickname') || '';
let theme = localStorage.getItem('storysTheme') || 'light';

const body = document.body;
const feed = document.getElementById('feed');

const themeToggle = document.getElementById('themeToggle');
const newStoryBtn = document.getElementById('newStoryBtn');
const changeNickBtn = document.getElementById('changeNickBtn');
const shareBtn = document.getElementById('shareBtn');

const storyModal = document.getElementById('storyModal');
const nicknameModal = document.getElementById('nicknameModal');

const storyInput = document.getElementById('storyInput');
const publishStoryBtn = document.getElementById('publishStoryBtn');

const nicknameInput = document.getElementById('nicknameInput');
const setNicknameBtn = document.getElementById('setNicknameBtn');

const closeModals = document.querySelectorAll('.closeModal');

// ===============================
// Inicialización de temas
// ===============================
if(theme === 'dark') body.classList.add('dark');

// ===============================
// Funciones de Modal
// ===============================
function openModal(modal){ modal.style.display = 'flex'; }
function closeModal(modal){ modal.style.display = 'none'; }
closeModals.forEach(btn=>{
  btn.addEventListener('click',()=>{ closeModal(btn.closest('.modal')); });
});

// ===============================
// Cambio de Nickname
// ===============================
if(!nickname) openModal(nicknameModal);
nicknameInput.value = nickname;

setNicknameBtn.addEventListener('click', ()=>{
  nickname = nicknameInput.value.trim() || 'Anónimo';
  localStorage.setItem('storysNickname', nickname);
  closeModal(nicknameModal);
});

// ===============================
// Cambio de Tema
// ===============================
themeToggle.addEventListener('click', ()=>{
  body.classList.toggle('dark');
  theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('storysTheme', theme);
});

// ===============================
// Compartir Página
// ===============================
shareBtn.addEventListener('click', ()=>{
  if(navigator.share){
    navigator.share({title:'Storys', url:location.href});
  } else {
    navigator.clipboard.writeText(location.href);
    alert('Enlace copiado al portapapeles!');
  }
});

// ===============================
// Crear Story en Firestore
// ===============================
newStoryBtn.addEventListener('click', ()=> openModal(storyModal));

publishStoryBtn.addEventListener('click', async ()=>{
  const text = storyInput.value.trim();
  if(!text) return;

  try{
    await addDoc(collection(db,'stories'), {
      nickname: nickname || 'Anónimo',
      text,
      timestamp: serverTimestamp()
    });
    storyInput.value = '';
    closeModal(storyModal);
  } catch(err){
    console.error("Error al publicar story:", err);
  }
});

// ===============================
// Escuchar Stories en tiempo real
// ===============================
const q = query(collection(db,'stories'), orderBy('timestamp','desc'));
onSnapshot(q, (snapshot)=>{
  feed.innerHTML = '';
  if(snapshot.empty){
    feed.innerHTML = '<div class="placeholder">No hay historias aún. ¡Sé el primero en publicar! 💬</div>';
  } else {
    snapshot.forEach(doc=>{
      renderStory(doc.data());
    });
  }
});

// ===============================
// Renderizar Stories
// ===============================
function renderStory(story){
  const div = document.createElement('div');
  div.className = 'story-card';
  const date = story.timestamp?.toDate ? story.timestamp.toDate() : new Date();
  div.innerHTML = `
    <div class="nickname">${story.nickname}</div>
    <div class="timestamp">${date.toLocaleString()}</div>
    <div class="text">${story.text}</div>
  `;
  feed.appendChild(div);
}
