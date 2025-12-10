// -------------------------
// FIREBASE CONFIG
// -------------------------
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Configuración Firebase
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// -------------------------
// SELECTORES DOCK
// -------------------------
const themeBtn = document.getElementById("themeBtn");
const newStoryBtn = document.getElementById("newStoryBtn");
const changeNickBtn = document.getElementById("changeNickBtn");
const shareBtn = document.getElementById("shareBtn");
const loginIcon = document.getElementById("loginIcon");

// -------------------------
// SELECTORES MODALES
// -------------------------
const storyModal = document.getElementById("storyModal");
const closeStoryModal = document.getElementById("closeStoryModal");
const nicknameModal = document.getElementById("nicknameModal");
const setNicknameBtn = document.getElementById("setNicknameBtn");

const storyInput = document.getElementById("storyInput");
const storyFeed = document.getElementById("storyFeed");

// -------------------------
// SELECTORES LOGIN
// -------------------------
const loginDropdown = document.getElementById("loginDropdown");
const loginBtn = document.getElementById("loginBtn");
const createBtn = document.getElementById("createBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginMsg = document.getElementById("loginMsg");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// -------------------------
// FUNCIONES DOCK
// -------------------------
themeBtn.addEventListener("click", () => document.body.classList.toggle("dark-theme"));

newStoryBtn.addEventListener("click", () => storyModal.style.display = "flex");
closeStoryModal.addEventListener("click", () => storyModal.style.display = "none");

changeNickBtn.addEventListener("click", () => nicknameModal.style.display = "flex");
setNicknameBtn.addEventListener("click", () => {
  const nickname = document.getElementById("nicknameInput").value.trim();
  if(nickname){
    localStorage.setItem("nickname", nickname);
    nicknameModal.style.display = "none";
    alert("Nickname guardado: " + nickname);
  }
});

shareBtn.addEventListener("click", () => alert("Función de compartir pendiente"));

// -------------------------
// LOGIN LOCAL
// -------------------------
loginIcon.addEventListener("click", () => loginDropdown.classList.toggle("show"));

// Crear usuario
createBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if(!username || !password){
    loginMsg.style.color = "#ff6b6b";
    loginMsg.textContent = "Debes llenar todos los campos";
    return;
  }
  if(localStorage.getItem("user_" + username)){
    loginMsg.style.color = "#ff6b6b";
    loginMsg.textContent = "El usuario ya existe";
    return;
  }
  localStorage.setItem("user_" + username, JSON.stringify({ username, password }));
  loginMsg.style.color = "#2bd4ff";
  loginMsg.textContent = "Usuario creado correctamente!";
});

// Login
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if(!username || !password){
    loginMsg.style.color = "#ff6b6b";
    loginMsg.textContent = "Debes llenar todos los campos";
    return;
  }
  const storedUser = JSON.parse(localStorage.getItem("user_" + username));
  if(storedUser && storedUser.password === password){
    localStorage.setItem("sessionUser", username);
    loginMsg.style.color = "#2bd4ff";
    loginMsg.textContent = `¡Bienvenido ${username}!`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginMsg.style.color = "#ff6b6b";
    loginMsg.textContent = "Usuario o contraseña incorrectos";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("sessionUser");
  loginMsg.textContent = "";
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";
});

// Revisar sesión activa al cargar
window.addEventListener("DOMContentLoaded", () => {
  const sessionUser = localStorage.getItem("sessionUser");
  if(sessionUser){
    loginMsg.style.color = "#2bd4ff";
    loginMsg.textContent = `¡Bienvenido ${sessionUser}!`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    loginDropdown.classList.add("show");
  }
});

// -------------------------
// STORIES FIREBASE
// -------------------------
const publishBtn = document.getElementById("publishBtn");

publishBtn.addEventListener("click", () => {
  const text = storyInput.value.trim();
  const nickname = localStorage.getItem("nickname") || "Anonimo";
  if(!text) return alert("Escribe algo para publicar");

  const storyRef = ref(db, 'stories');
  push(storyRef, { text, nickname, timestamp: Date.now() });

  storyInput.value = "";
  storyModal.style.display = "none";
});

// Escuchar cambios en tiempo real
const storiesRef = ref(db, 'stories');
onValue(storiesRef, (snapshot) => {
  storyFeed.innerHTML = "";
  if(snapshot.exists()){
    const data = snapshot.val();
    Object.values(data).forEach(story => {
      const div = document.createElement("div");
      div.classList.add("tory-card", "fade-up");
      div.innerHTML = `<strong>${story.nickname}</strong>: ${story.text}`;
      storyFeed.appendChild(div);
    });
  } else {
    storyFeed.innerHTML = `<div class="placeholder">No hay stories aún, sé el primero en publicar 💬</div>`;
  }
});
