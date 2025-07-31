const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');

let dog = { x: 50, y: 300, width: 50, height: 50 };
let osso = { x: 600, y: 300, width: 30, height: 30 };
let casa = { x: 750, y: 280, width: 40, height: 50 };

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Céu e chão
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height - 100);
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Dog
  ctx.fillStyle = "#b5651d";
  ctx.fillRect(dog.x, dog.y, dog.width, dog.height);

  // Osso
  ctx.fillStyle = "#fff";
  ctx.fillRect(osso.x, osso.y, osso.width, osso.height);

  // Casa
  ctx.fillStyle = "#8b0000";
  ctx.fillRect(casa.x, casa.y, casa.width, casa.height);
}

function update() {
  draw();

  if (
    dog.x < osso.x + osso.width &&
    dog.x + dog.width > osso.x &&
    dog.y < osso.y + osso.height &&
    dog.y + dog.height > osso.y
  ) {
    osso.x = -100; // Pega o osso
  }

  if (
    dog.x < casa.x + casa.width &&
    dog.x + dog.width > casa.x &&
    osso.x === -100
  ) {
    alert("Parabéns! O doguinho levou o osso pra casinha!");
    dog.x = 50;
    osso.x = 600;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') dog.x += 10;
  if (e.key === 'ArrowLeft') dog.x -= 10;
  update();
});

draw();
