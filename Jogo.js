const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dog = {
  x: 50,
  y: 300,
  width: 40,
  height: 40,
  color: "brown",
  speed: 4
};

const bone = {
  x: 700,
  y: 300,
  width: 30,
  height: 30,
  color: "white",
  collected: false
};

const house = {
  x: 20,
  y: 50,
  width: 60,
  height: 60,
  color: "orange"
};

const keys = {};

document.addEventListener("keydown", e => {
  keys[e.key] = true;
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function update() {
  if (keys["ArrowRight"]) dog.x += dog.speed;
  if (keys["ArrowLeft"]) dog.x -= dog.speed;
  if (keys["ArrowUp"]) dog.y -= dog.speed;
  if (keys["ArrowDown"]) dog.y += dog.speed;

  // Limites
  dog.x = Math.max(0, Math.min(canvas.width - dog.width, dog.x));
  dog.y = Math.max(0, Math.min(canvas.height - dog.height, dog.y));

  // Pegar o osso
  if (!bone.collected &&
      dog.x < bone.x + bone.width &&
      dog.x + dog.width > bone.x &&
      dog.y < bone.y + bone.height &&
      dog.y + dog.height > bone.y) {
    bone.collected = true;
  }

  // Levar o osso pra casinha
  if (bone.collected &&
      dog.x < house.x + house.width &&
      dog.x + dog.width > house.x &&
      dog.y < house.y + house.height &&
      dog.y + dog.height > house.y) {
    alert("Você levou o osso pra casinha! 🏠🐶");
    // Resetar o jogo
    dog.x = 50;
    dog.y = 300;
    bone.collected = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Casinha
  ctx.fillStyle = house.color;
  ctx.fillRect(house.x, house.y, house.width, house.height);

  // Doguinho
  ctx.fillStyle = dog.color;
  ctx.fillRect(dog.x, dog.y, dog.width, dog.height);

  // Osso (só se não foi pego)
  if (!bone.collected) {
    ctx.fillStyle = bone.color;
    ctx.fillRect(bone.x, bone.y, bone.width, bone.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
