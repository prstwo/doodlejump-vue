<script setup>
//board

import DoodleRight from "~/assets/img/watermelon-icon-right.svg";
import DoodleLeft from "~/assets/img/watermelon-icon-left.svg";
import PlatformImg from "~/assets/img/basket-platform.svg";
const emit = defineEmits(["changeComponent"]);

const board = ref();
let startGameContainer;
// let loseGameContainer;
let boardWidth = 360;
let boardHeight = 576;
let context;

//doodler
let doodlerWidth = 70;
let doodlerHeight = 60;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = (boardHeight * 7) / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWidth,
  height: doodlerHeight,
};

//physics
let velocityX = 0;
let velocityY = 0; //doodler jump speed
let initialVelocityY = -8; //starting velocity Y
let gravity = 0.45;

//platforms
let platformArray = [];
let platformWidth = 73.6;
let platformHeight = 23;
let platformImg;

let score = 0;
let maxScore = 0;
let gameOver = false;

onMounted(() => {
  board.value.height = boardHeight;
  board.value.width = boardWidth;
  context = board.value.getContext("2d"); //used for drawing on the board


  //load images
  doodlerRightImg = new Image();
  doodlerRightImg.src = DoodleRight;
  doodler.img = doodlerRightImg;
  doodlerRightImg.onload = function () {
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  };

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = DoodleLeft;

  platformImg = new Image();
  platformImg.src = PlatformImg;
  platformImg.style = "object-fit:cover";

  velocityY = initialVelocityY;

  // startBtnAgain = document.getElementById("js_restart_game");
  // startBtnAgain.addEventListener("click", startOver);
  placePlatforms();
});

function startGame() {
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
  document.addEventListener("touchmove", moveDoodler);


  document.addEventListener("keydown", moveDoodler);
  document.addEventListener("touchmove", handleTouchMove);
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", moveDoodler);
  } else {
    window.addEventListener("AbsoluteOrientationSensor", moveDoodler);
  }
}
function handleTouchMove(e) {
  const touchX = e.touches[0].clientX;

  // Adjust the threshold as needed
  const threshold = 10;

  if (touchX > doodler.x + doodler.width + threshold) {
    // Move right
    velocityX = 4;
    doodler.img = doodlerRightImg;
  } else if (touchX < doodler.x - threshold) {
    // Move left
    velocityX = -4;
    doodler.img = doodlerLeftImg;
  }
}
function startOver() {
  const spaceEvent = new Event("space");

  try {
    moveDoodler(undefined, true);
  } catch (err) {
    console.error("Error dispatching space event:", err);
  }
}

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.value.width, board.value.height);
  //doodler
  doodler.x += velocityX;
  if (doodler.x > boardWidth) {
    doodler.x = 0;
  } else if (doodler.x + doodler.width < 0) {
    doodler.x = boardWidth;
  }

  velocityY += gravity;
  doodler.y += velocityY;
  if (doodler.y > board.value.height) {
    gameOver = true;
  }
  context.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );

  //platforms
  for (let i = 0; i < platformArray.length; i++) {
    let platform = platformArray[i];
    if (velocityY < 0 && doodler.y < (boardHeight * 3) / 4) {
      platform.y -= initialVelocityY; //slide platform down
    }
    if (detectCollision(doodler, platform) && velocityY >= 0) {
      velocityY = initialVelocityY; //jump
    }
    context.drawImage(
      platform.img,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }

  // clear platforms and add new platform
  while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
    platformArray.shift(); //removes first element from the array
    newPlatform(); //replace with new platform on top
  }

  //score
  updateScore();
  context.fillStyle = "black";
  context.font = "16px sans-serif";
  context.fillText(score, 5, 20);
  localStorage.setItem("score", score);

  if (gameOver) {
    localStorage.setItem("score", score);
    updateScoreApi(score);
  }
}
function resetDoodler() {
  console.log("in resetDoodler");

  doodler = {
    img: doodlerRightImg,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight,
  };

  velocityX = 0;
  velocityY = initialVelocityY;
  score = 0;
  maxScore = 0;
  gameOver = false;
  placePlatforms();
}
function moveDoodler(e, startover = false) {
  // alert("in moveDoodler")
  if (e) {
    const gamma = e.gamma;
    // alert("gamma", gamma)

    if (e.code == "ArrowRight" || e.code == "KeyD" || gamma > 0) {
      //move right
      // alert("right")
      velocityX = 4;
      doodler.img = doodlerRightImg;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA" || gamma < 0) {
      //move left
      // alert("left")
      velocityX = -4;
      doodler.img = doodlerLeftImg;
    } else if (e.code == "Space" && gameOver) {
      //reset
      resetDoodler();
    }
  }
  if (startover && startover === true) {
    //reset
    alert("reset");

    resetDoodler();
  }
}

function placePlatforms() {
  platformArray = [];

  //starting platforms
  let platform = {
    img: platformImg,
    x: boardWidth / 2,
    y: boardHeight - 50,
    width: platformWidth,
    height: platformHeight,
  };

  platformArray.push(platform);

  for (let i = 0; i < 7; i++) {
    let randomX = Math.floor((Math.random() * boardWidth * 3) / 4); //(0-1) * boardWidth*3/4
    let platform = {
      img: platformImg,
      x: randomX,
      y: boardHeight - 75 * i - 150,
      width: platformWidth,
      height: platformHeight,
    };

    platformArray.push(platform);
  }
  startGame();
}

function newPlatform() {
  let randomX = Math.floor((Math.random() * boardWidth * 3) / 4); //(0-1) * boardWidth*3/4
  let platform = {
    img: platformImg,
    x: randomX,
    y: -platformHeight,
    width: platformWidth,
    height: platformHeight,
  };

  platformArray.push(platform);
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y
  ); //a's bottom left corner passes b's top left corner
}
async function updateScoreApi(score) {
  await $fetch(`/api/users/${useState("customerPhone").value}`, {
    method: "put",
    body: {
      score: Number(score),
      updated_date: new Date(Date.now()).toISOString(),
    },
    onResponse({ response }) {
      if (response.status === 200) {
        emit("changeComponent", 3);
      } else {
        alert("You lost");
      }
    },
    onRequestError({ error }) {
      alert(error);
    },
  });
}

function updateScore() {
  let points = Math.floor(50 * Math.random()); //(0-1) *50 --> (0-50)
  if (velocityY < 0) {
    //negative going up
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (velocityY >= 0) {
    maxScore -= points;
  }
}

onUnmounted(() => {
  window.removeEventListener("AbsoluteOrientationSensor", moveDoodler);
  window.removeEventListener("deviceorientation", moveDoodler);
  document.removeEventListener("keydown", moveDoodler);
  document.removeEventListener("touchmove", moveDoodler);
});
</script>
<template>
  <div class="game-canvas-container">
    <canvas id="board" ref="board"></canvas>
  </div>
</template>
<style scoped>
.game-canvas-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ce;
}
</style>