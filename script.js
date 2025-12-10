// -----------------------------
// Configuración Firebase (compat)
// -----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDYPKKEtJmqazv6MhuRhfS79jyHf2NpqoA",
  authDomain: "torys-16335.firebaseapp.com",
  databaseURL: "https://torys-16335-default-rtdb.firebaseio.com",
  projectId: "torys-16335",
  storageBucket: "torys-16335.appspot.com",
  messagingSenderId: "97006009990",
  appId: "1:97006009990:web:f815478cf0d219f8d15b07",
  measurementId: "G-H9D9DEKZ7K"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// -----------------------------
// ELEMENTOS DEL DOM
// -----------------------------
const storyFeed = document.getElementById('storyFeed');
const storyModal = document.getElementById('storyModal');
const newStoryBtn = document.getElementById('newStoryBtn');
const closeStoryModal = document.getElementById('closeStoryModal');
const publishBtn = document.getElementById('publishBtn');
const storyInput = document.getElementById('storyInput');

const nicknameModal = document.getElementById('nicknameModal');
const changeNickBtn = document.getElementById('changeNickBtn');
const nicknameInput = document.getElementById('nicknameInput');
const setNicknameBtn = document.getElementById('setNicknameBtn');

const loginIcon = document.getElementById('loginIcon');
const loginDropdown = document.getElementById('loginDropdown');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMsg = document.getElementById('loginMsg');

const themeBtn = document.getElementById('themeBtn');

// -----------------------------
// ESTADO LOCAL
// -----------------------------
let currentUser = localStorage.getItem('currentUser') || null;
let nickname = localStorage.getItem('nickname') || null;

// -----------------------------
// TOGGLE TEMA OSCURO / AMOLED
// -----------------------------
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// -----------------------------
// TOGGLE LOGIN DROPDOWN
// -----------------------------
loginIcon.addEventListener('click', () => {
  loginDropdown.classList.toggle('show');

  if(currentUser){
    logoutBtn.style.display = 'block';
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    usernameInput.style.display = 'none';
    passwordInput.style.display = 'none';
    loginMsg.textContent = `Hola ${currentUser}`;
  } else {
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    usernameInput.style.display = 'block';
    passwordInput.style.display = 'block';
    loginMsg.textContent = '';
  }
});

// -----------------------------
// LOGIN
// -----------------------------
loginBtn.addEventListener('click', () => {
  const user = usernameInput.value.trim();
  const pass = passwordInput.value;

  if(!user || !pass){
    loginMsg.textContent = "Rellena todos los campos";
    return;
  }

  db.ref('users/' + user).once('value', snapshot => {
    if(snapshot.exists() && snapshot.val().password === pass){
      currentUser = user;
      localStorage.setItem('currentUser', user);
      loginMsg.textContent = `Bienvenido ${user}`;
      usernameInput.value = passwordInput.value = '';
    } else {
      loginMsg.textContent = "Usuario o contraseña incorrecta";
    }
  });
});

// -----------------------------
// REGISTRO
// -----------------------------
registerBtn.addEventListener('click', () => {
  const user = usernameInput.value.trim();
  const pass = passwordInput.value;

  if(!user || !pass){
    loginMsg.textContent = "Rellena todos los campos";
    return;
  }

  db.ref('users/' + user).once('value', snapshot => {
    if(snapshot.exists()){
      loginMsg.textContent = "Usuario ya existe";
    } else {
      db.ref('users/' + user).set({password: pass}).then(() => {
        loginMsg.textContent = "Usuario creado correctamente";
      });
    }
  });
});

// -----------------------------
// LOGOUT
// -----------------------------
logoutBtn.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  loginDropdown.classList.remove('show');
});

// -----------------------------
// MODALES
// -----------------------------
newStoryBtn.addEventListener('click', () => {
  if(!currentUser) return alert("Inicia sesión primero");
  storyModal.style.display = 'flex';
});

closeStoryModal.addEventListener('click', () => {
  storyModal.style.display = 'none';
});

changeNickBtn.addEventListener('click', () => {
  nicknameModal.style.display = 'flex';
});

setNicknameBtn.addEventListener('click', () => {
  const nick = nicknameInput.value.trim();
  if(!nick) return;
  nickname = nick;
  localStorage.setItem('nickname', nick);
  nicknameModal.style.display = 'none';
