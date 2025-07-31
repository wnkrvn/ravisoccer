// Seletores dos elementos
const loginContainer = document.getElementById("loginContainer");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// Mostrar tela de cadastro
showRegister.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// Mostrar tela de login
showLogin.addEventListener("click", () => {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

// Cadastro
document.getElementById("registerButton").addEventListener("click", () => {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (!username || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  // Simulação de banco de dados local
  if (localStorage.getItem(username)) {
    alert("Esse usuário já existe!");
  } else {
    localStorage.setItem(username, password);
    alert("Cadastro realizado com sucesso! Faça login.");
    showLogin.click();
  }
});

// Login
document.getElementById("loginButton").addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  const storedPassword = localStorage.getItem(username);
  if (storedPassword === password) {
    alert(`Bem-vindo, ${username}!`);
    loginContainer.style.display = "none";
    // Aqui você chama o jogo após login
    iniciarJogo();
  } else {
    alert("Usuário ou senha incorretos.");
  }
});

// Função de exemplo pra iniciar o jogo depois do login
function iniciarJogo() {
  const canvas = document.getElementById("gameCanvas");
  canvas.style.display = "block";

  // Aqui você pode chamar as funções para desenhar o mapa, personagens, etc
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Jogo iniciado!", 50, 50);
}
