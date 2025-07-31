const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dog = {
  x: 50,
  y: canvas.height - 80,
  width: 40,
  height: 40,
  color: '#ff9900',
  speed: 5
};

function drawDog() {
  ctx.fillStyle = dog.color;
  ctx.fillRect(dog.x, dog.y, dog.width, dog.height);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDog();
  requestAnimationFrame(gameLoop);
}

gameLoop();
