const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.5;

const dog = {
  x: 50,
  y: 0,
  width: 50,
  height: 50,
  speed: 5,
  velocityX: 0,
  velocityY: 0,
  jumping: false,
  image: new Image()
};
dog.image.src = "dog.png";

const bone = {
  x: 700,
  y: 350,
  width: 30,
  height: 30,
  collected: false,
  image: new Image()
};
bone.image.src = "bone.png";

const house = {
  x: 20,
  y: 380,
  width: 60,
  height: 60,
  image: new Image()
};
house.image.src = "house.png";

const platforms = [
  { x: 0, y: 400, width: 800, height: 50 },
  { x: 200, y: 320, width: 100, height: 20 },
  { x: 400, y: 250, width: 150, height: 20 },
  { x: 650, y: 350, width: 100, height: 20 }
];

const platformImage = new Image();
platformImage.src = "platform.png";

const keys = {};

document.addEventListener("keydown", e => {
  keys[e.key] = true;
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function update() {
  // Movimento horizontal
  if (keys["ArrowRight"]) {
    dog.velocityX = dog.speed;
  } else if (keys["ArrowLeft"]) {
    dog.velocityX = -dog.speed;
  } else {
    dog.velocityX = 0;
  }

  // Pulo
  if (keys["ArrowUp"] && !dog.jumping) {
    dog.velocityY = -12;
    dog.jumping = true;
  }

  // Gravidade
  dog.velocityY += GRAVITY;

  dog.x += dog.velocityX;
  dog.y += dog.velocityY;

  // Limites
  if (dog.x < 0) dog.x = 0;
  if (dog.x + dog.width > canvas.width) dog.x = canvas.width - dog.width;

  dog.jumping = true;

  // Colisão com plataformas
  for (let platform of platforms) {
    if (
      dog.x < platform.x + platform.width &&
      dog.x + dog.width > platform.x &&
      dog.y + dog.height < platform.y + 10 &&
      dog.y + dog.height + dog.velocityY >= platform.y &&
      dog.y + dog.height <= platform.y
    ) {
      dog.y = platform.y - dog.height;
      dog.velocityY = 0;
      dog.jumping = false;
    }
  }

  // Pegar osso
  if (
    !bone.collected &&
    dog.x < bone.x + bone.width &&
    dog.x + dog.width > bone.x &&
    dog.y < bone.y + bone.height &&
    dog.y + dog.height > bone.y
  ) {
    bone.collected = true;
  }

  // Levar osso pra casinha
  if (
    bone.collected &&
    dog.x < house.x + house.width &&
    dog.x + dog.width > house.x &&
    dog.y < house.y + house.height &&
    dog.y + dog.height > house.y
  ) {
    alert("Você levou o osso pra casinha! 🏠🐶");
    dog.x = 50;
    dog.y = 0;
    dog.velocityY = 0;
    dog.jumping = false;
    bone.collected = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Plataformas
  for (let platform of platforms) {
    if (platformImage.complete) {
      ctx.drawImage(platformImage, platform.x, platform.y, platform.width, platform.height);
    } else {
      ctx.fillStyle = "#654321";
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
  }

  // Casinha
  if (house.image.complete) {
    ctx.drawImage(house.image, house.x, house.y, house.width, house.height);
  } else {
    ctx.fillStyle = "orange";
    ctx.fillRect(house.x, house.y, house.width, house.height);
  }

  // Osso
  if (!bone.collected) {
    if (bone.image.complete) {
      ctx.drawImage(bone.image, bone.x, bone.y, bone.width, bone.height);
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(bone.x, bone.y, bone.width, bone.height);
    }
  }

  // Doguinho
  if (dog.image.complete) {
    ctx.drawImage(dog.image, dog.x, dog.y, dog.width, dog.height);
  } else {
    ctx.fillStyle = "brown";
    ctx.fillRect(dog.x, dog.y, dog.width, dog.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
