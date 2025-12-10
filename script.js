// -------------------------
// DOCK ICONS FUNCTIONALITY
// -------------------------

const themeBtn = document.getElementById("themeBtn");
const newStoryBtn = document.getElementById("newStoryBtn");
const changeNickBtn = document.getElementById("changeNickBtn");
const shareBtn = document.getElementById("shareBtn");

// Aquí puedes poner las funciones actuales de tus botones
themeBtn.addEventListener("click", () => {
  // Cambiar tema
  document.body.classList.toggle("dark-theme");
});

newStoryBtn.addEventListener("click", () => {
  document.getElementById("storyModal").style.display = "flex";
});

changeNickBtn.addEventListener("click", () => {
  document.getElementById("nicknameModal").style.display = "flex";
});

shareBtn.addEventListener("click", () => {
  alert("Función de compartir pendiente");
});

// -------------------------
// LOGIN LOCAL
// -------------------------

const loginIcon = document.getElementById("loginIcon");
const loginDropdown = document.getElementById("loginDropdown");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginMsg = document.getElementById("loginMsg");

// Mostrar / ocultar formulario al hacer click en el icono
loginIcon.addEventListener("click", () => {
  loginDropdown.style.display = loginDropdown.style.display === "flex" ? "none" : "flex";
  loginDropdown.style.flexDirection = "column";
});

// Crear usuario de prueba
function createUser(username, password) {
  localStorage.setItem("user_" + username, JSON.stringify({ username, password }));
}
createUser("jhossue", "1234");

// Función de login
function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    loginMsg.style.color = "#ff6b6b";
    loginMsg.textContent = "Debes llenar todos los campos";
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("user_" + username));
  if (storedUser && storedUser.password === password) {
    localStorage.setItem("sessionUser", username);
    loginMsg.style.color = "#2bd4ff";
    loginMsg.textContent = "¡Bienvenido " + username + "!";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginMsg.style.color = "#ff6b6b";
    loginMsg.textContent = "Usuario o contraseña incorrectos";
  }
}

// Logout
function logout() {
  localStorage.removeItem("sessionUser");
  loginMsg.textContent = "";
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";
}

// Asignar eventos
loginBtn.addEventListener("click", loginUser);
logoutBtn.addEventListener("click", logout);

// Revisar sesión activa al cargar
window.addEventListener("DOMContentLoaded", () => {
  const sessionUser = localStorage.getItem("sessionUser");
  if (sessionUser) {
    loginMsg.style.color = "#2bd4ff";
    loginMsg.textContent = "¡Bienvenido " + sessionUser + "!";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    loginDropdown.style.display = "flex";
    loginDropdown.style.flexDirection = "column";
  }
});

// -------------------------
// MODALES EXISTENTES
// -------------------------

const storyModal = document.getElementById("storyModal");
const closeStoryModal = document.getElementById("closeStoryModal");
closeStoryModal.addEventListener("click", () => {
  storyModal.style.display = "none";
});

const nicknameModal = document.getElementById("nicknameModal");
const setNicknameBtn = document.getElementById("setNicknameBtn");
setNicknameBtn.addEventListener("click", () => {
  const nickname = document.getElementById("nicknameInput").value.trim();
  if (nickname) {
    localStorage.setItem("nickname", nickname);
    nicknameModal.style.display = "none";
    alert("Nickname guardado: " + nickname);
  }
});
