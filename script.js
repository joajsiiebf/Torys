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

// -------------------------
// SELECTORES LOGIN
// -------------------------
const loginDropdown = document.getElementById("loginDropdown");
const loginBtn = document.getElementById("loginBtn");
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
// LOGIN LOCAL OPTIMIZADO
// -------------------------

// Crear usuario de prueba
const DEFAULT_USER = { username: "jhossue", password: "1234" };
if(!localStorage.getItem("user_" + DEFAULT_USER.username)){
  localStorage.setItem("user_" + DEFAULT_USER.username, JSON.stringify(DEFAULT_USER));
}

// Mostrar/ocultar login con animación
loginIcon.addEventListener("click", () => {
  loginDropdown.classList.toggle("show");
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
