const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dog = { x: 50, y: 330, w: 50, h: 50, vx: 0, speed: 4 };
let bone = { x: 600, y: 340, w: 30, h: 30, collected: false };
let home = { x: 50, y: 340, w: 60, h: 40 };
let score = 0;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'd') dog.vx = dog.speed;
  if (e.key === 'ArrowLeft' || e.key === 'a') dog.vx = -dog.speed;
});

document.addEventListener('keyup', e => {
  if (
    e.key === 'ArrowRight' || e.key === 'ArrowLeft' ||
    e.key === 'a' || e.key === 'd'
  ) dog.vx = 0;
});

function drawDog() {
  ctx.fillStyle = '#795548'; // marrom
  ctx.fillRect(dog.x, dog.y, dog.w, dog.h);
}

function drawBone() {
  if (!bone.collected) {
    ctx.fillStyle = '#ffcc80'; // amarelo
    ctx.beginPath();
    ctx.arc(bone.x, bone.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHome() {
  ctx.fillStyle = '#ff7043';
  ctx.fillRect(home.x, home.y, home.w, home.h);
}

function update() {
  dog.x += dog.vx;

  if (
    !bone.collected &&
    dog.x < bone.x + bone.w &&
    dog.x + dog.w > bone.x &&
    dog.y < bone.y + bone.h &&
    dog.y + dog.h > bone.y
  ) {
    bone.collected = true;
  }

  if (
    bone.collected &&
    dog.x < home.x + home.w &&
    dog.x + dog.w > home.x &&
    dog.y < home.y + home.h &&
    dog.y + dog.h > home.y
  ) {
    score++;
    bone.collected = false;
    bone.x = Math.random() * 700 + 50;
  }
}

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Comic Sans MS';
  ctx.fillText('Pontos: ' + score, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawHome();
  drawDog();
  drawBone();
  drawScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();
