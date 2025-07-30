const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 180, w: 20, h: 40, color: "white" };
let bot = { x: 730, y: 180, w: 20, h: 40, color: "red" };
let ball = { x: 390, y: 190, r: 10, dx: 2, dy: 2 };

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function moveBot() {
  if (bot.y + bot.h / 2 < ball.y) bot.y += 1.5;
  else bot.y -= 1.5;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player);
  drawRect(bot);
  drawBall(ball);

  // Movimento da bola
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Rebater nas paredes
  if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1;

  // Rebater no jogador
  if (ball.x - ball.r <= player.x + player.w && ball.y >= player.y && ball.y <= player.y + player.h) {
    ball.dx *= -1;
  }

  // Rebater no bot
  if (ball.x + ball.r >= bot.x && ball.y >= bot.y && ball.y <= bot.y + bot.h) {
    ball.dx *= -1;
  }

  moveBot();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && player.y > 0) player.y -= 10;
  if (e.key === "ArrowDown" && player.y + player.h < canvas.height) player.y += 10;
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 10;
  if (e.key === "ArrowRight" && player.x + player.w < canvas.width) player.x += 10;
});

setInterval(update, 16);
