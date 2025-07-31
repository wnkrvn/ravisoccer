const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = { x: 50, y: 200, w: 30, h: 30, color: 'white', speed: 5 };
const bot = { x: 720, y: 200, w: 30, h: 30, color: 'red', speed: 3 };
const ball = { x: 400, y: 250, r: 10, dx: 4, dy: 2, color: 'yellow' };

function drawPlayer(p) {
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x, p.y, p.w, p.h);
}

function drawBall(b) {
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
  ctx.fillStyle = b.color;
  ctx.fill();
  ctx.closePath();
}

function moveBot() {
  if (bot.y + bot.h / 2 < ball.y) bot.y += bot.speed;
  else if (bot.y + bot.h / 2 > ball.y) bot.y -= bot.speed;
}

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.dy *= -1;

  // colisão com player
  if (
    ball.x - ball.r < player.x + player.w &&
    ball.y > player.y &&
    ball.y < player.y + player.h
  ) {
    ball.dx *= -1;
    ball.x = player.x + player.w + ball.r;
  }

  // colisão com bot
  if (
    ball.x + ball.r > bot.x &&
    ball.y > bot.y &&
    ball.y < bot.y + bot.h
  ) {
    ball.dx *= -1;
    ball.x = bot.x - ball.r;
  }

  // gols (reinicia)
  if (ball.x < 0 || ball.x > canvas.width) {
    ball.x = 400;
    ball.y = 250;
    ball.dx *= -1;
    ball.dy = 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer(player);
  drawPlayer(bot);
  drawBall(ball);
  moveBot();
  updateBall();
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && player.y > 0) player.y -= player.speed;
  if (e.key === 'ArrowDown' && player.y + player.h < canvas.height) player.y += player.speed;
});

draw();
