const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

// Jogador (cachorro)
let player = {
  x: 100,
  y: 400,
  width: 40,
  height: 40,
  color: "brown",
  dx: 0,
  dy: 0,
  speed: 3,
  gravity: 0.8,
  jumping: false
};

let keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function update() {
  // Movimento horizontal
  if (keys["ArrowRight"]) player.dx = player.speed;
  else if (keys["ArrowLeft"]) player.dx = -player.speed;
  else player.dx = 0;

  // Pulo
  if (keys[" "] && !player.jumping) {
    player.dy = -15;
    player.jumping = true;
  }

  // Gravidade
  player.dy += player.gravity;
  player.y += player.dy;
  player.x += player.dx;

  // Chão
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.jumping = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
