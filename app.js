let score = 0;
let highScore = 0;
let level = 0;
let started = false;
let executing = false;
let gmOvr = false;
let gameSeq = [];
let userSeq = [];
const colors = ["red", "yellow", "blue", "green"];
const audio = [
  new Audio("assets/Start.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  new Audio("assets/gameOver.mp3"),
];

for (let a of audio) {
  a.load();
}
let button = document.querySelector("button");
let display = document.querySelector(".display");
let scr = document.querySelector("#scr");
let hghscr = document.querySelector("#hghscr");
let btns = document.querySelectorAll(".btn");

if (localStorage.getItem("highScore")) {
  highScore = parseInt(localStorage.getItem("highScore"));
  hghscr.innerText = `High Score: ${highScore}`;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    button.classList.add("button_active");
  } else if (event.code === "KeyR") {
    btns[0].classList.add("btn_active");
  } else if (event.code === "KeyY") {
    btns[1].classList.add("btn_active");
  } else if (event.code === "KeyB") {
    btns[2].classList.add("btn_active");
  } else if (event.code === "KeyG") {
    btns[3].classList.add("btn_active");
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    button.classList.add("button_active");
    button.classList.remove("button_active");
    button.click();
  } else if (event.code === "KeyR") {
    btns[0].classList.remove("btn_active");
    btns[0].click();
  } else if (event.code === "KeyY") {
    btns[1].classList.remove("btn_active");
    btns[1].click();
  } else if (event.code === "KeyB") {
    btns[2].classList.remove("btn_active");
    btns[2].click();
  } else if (event.code === "KeyG") {
    btns[3].classList.remove("btn_active");
    btns[3].click();
  }
});

button.addEventListener("click", start);
button.addEventListener("touchstart", function (event) {
  event.preventDefault();
  button.classList.add("button_active");
});
button.addEventListener("touchend", function (event) {
  event.preventDefault();
  start.call(this, event);
  button.classList.remove("button_active");
});
button.addEventListener("touchcancel", function () {
  button.classList.remove("button_active");
});

function start(event) {
  event.preventDefault();
  if (!executing) {
    audio[0].play();
    if (!started) {
      started = true;
      display.innerText = "Starting....";
      executing = true;
      setTimeout(function () {
        executing = false;
        button.innerText = "Restart";
        levelUp();
      }, 1000);
    } else {
      reset();
      gmOvr = false;
      display.classList.remove("redText");
      display.innerText = "Restarting....";
      executing = true;
      setTimeout(function () {
        executing = false;
        levelUp();
      }, 1000);
    }
  }
}

function reset() {
  score = 0;
  level = 0;
  gameSeq = [];
  userSeq = [];
}

function levelUp() {
  userSeq = [];
  scoreUpdate();
  display.innerText = `Level ${level}`;
  let random = Math.floor(Math.random() * 4);
  gameSeq.push(colors[random]);
  buttonFlash(btns[random]);
}

function scoreUpdate() {
  level++;
  score = level - 1;
  scr.innerText = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    hghscr.innerText = `High Score: ${highScore}`;
    localStorage.setItem("highScore", highScore);
  }
}

function buttonFlash(btn) {
  executing = true;
  setTimeout(function () {
    playAudio(btn.dataset.color);
    btn.classList.add("flash");
  }, 100);
  setTimeout(function () {
    executing = false;
    btn.classList.remove("flash");
  }, 400);
}

for (let btn of btns) {
  btn.addEventListener("click", userClick);
  btn.addEventListener("touchstart", function (event) {
    event.preventDefault();
    this.classList.add("btn_active");
  });
  btn.addEventListener("touchend", function (event) {
    event.preventDefault();
    userClick.call(this, event);
    this.classList.remove("btn_active");
  });
  btn.addEventListener("touchcancel", function () {
    this.classList.remove("btn_active");
  });
}

function userClick(event) {
  event.preventDefault();
  if (started && !executing && !gmOvr) {
    userSeq.push(this.dataset.color);
    evaluate();
  }
}

function playAudio(color) {
  if (color === "red") audio[1].play();
  else if (color === "yellow") audio[2].play();
  else if (color === "blue") audio[3].play();
  else audio[4].play();
}

function evaluate() {
  const index = userSeq.length - 1;
  if (userSeq[index] != gameSeq[index]) {
    gameOver();
    return;
  }
  if (userSeq.length == gameSeq.length) {
    levelUp();
  }
}

function gameOver() {
  audio[5].play();
  display.innerText = "Game Over";
  display.classList.add("redText");
  gmOvr = true;
}
