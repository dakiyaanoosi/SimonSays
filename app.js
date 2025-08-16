let score = 0;
let highScore = 0;
let level = 0;
let started = false;
let executing = false;
let gmOvr = false;
let gameSeq = [];
let userSeq = [];
let playingSeq = false;
let timeouts = [];

const colors = ["red", "green", "yellow", "blue"];
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

const checkbox = document.getElementById("checkbox");
let checkBoxValue = localStorage.getItem("checkBoxValue");
if (checkBoxValue) {
  checkbox.checked = checkBoxValue === "true";
}
checkbox.addEventListener("change", function () {
  localStorage.setItem("checkBoxValue", this.checked);
});

document.addEventListener("keyup", (event) => {
  if (event.code === "KeyC") {
    checkbox.checked = !checkbox.checked;
    localStorage.setItem("checkBoxValue", checkbox.checked);
  }
});

const button = document.querySelector("button");
const display = document.querySelector(".display");
const scr = document.querySelector("#scr");
const hghscr = document.querySelector("#hghscr");
const btns = document.querySelectorAll(".btn");

if (localStorage.getItem("highScore")) {
  highScore = parseInt(localStorage.getItem("highScore"));
  hghscr.innerText = `High Score: ${highScore}`;
}

const keyMap = {
  Enter: { element: button, class: "button_active" },
  KeyR: { element: btns[0], class: "btn_active" },
  KeyG: { element: btns[1], class: "btn_active" },
  KeyY: { element: btns[2], class: "btn_active" },
  KeyB: { element: btns[3], class: "btn_active" },
};

document.addEventListener("keydown", function (event) {
  if (keyMap[event.code]) {
    const { element, class: cls } = keyMap[event.code];
    element.classList.add(cls);
  }
});

document.addEventListener("keyup", function (event) {
  if (keyMap[event.code]) {
    const { element, class: cls } = keyMap[event.code];
    element.classList.remove(cls);
    element.click();
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
  if (event) event.preventDefault();

  audio[0].cloneNode().play();
  if (!started) {
    started = true;
    display.innerText = "Starting....";
    executing = true;
    button.innerText = "Restart";
    const startTimeoutID = setTimeout(function () {
      executing = false;
      levelUp();
    }, 1000);
    timeouts.push(startTimeoutID);
  } else {
    reset();
    display.classList.remove("redText");
    display.innerText = "Restarting....";
    executing = true;
    const restartTimeoutID = setTimeout(function () {
      executing = false;
      levelUp();
    }, 1000);
    timeouts.push(restartTimeoutID);
  }
}

function reset() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
  playingSeq = false;
  executing = false;
  score = 0;
  level = 0;
  gameSeq = [];
  userSeq = [];
  gmOvr = false;
}

function levelUp() {
  userSeq = [];
  scoreUpdate();
  display.innerText = `Level ${level}`;
  const random = Math.floor(Math.random() * 4);
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
  const flashTimeout = setTimeout(function () {
    if (btn) playAudio(btn.dataset.color);
    btn.classList.add("flash");
  }, 100);
  timeouts.push(flashTimeout);
  setTimeout(function () {
    executing = false;
    if (btn) btn.classList.remove("flash");
  }, 500);
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
  if (started && !executing && !playingSeq && !gmOvr) {
    userSeq.push(this.dataset.color);
    evaluate();
  }
}

function playAudio(color) {
  let soundIndex =
    color === "red" ? 1 : color === "yellow" ? 2 : color === "blue" ? 3 : 4;
  const aud = audio[soundIndex].cloneNode();
  aud.play();
}

function evaluate() {
  const index = userSeq.length - 1;
  if (userSeq[index] != gameSeq[index]) {
    gameOver();
    return;
  }
  if (userSeq.length == gameSeq.length) {
    if (checkbox.checked) replaySeq();
    else levelUp();
  }
}

function replaySeq() {
  playingSeq = true;
  for (let i = 1; i <= gameSeq.length; i++) {
    const timeoutID = setTimeout(function () {
      const btn = document.querySelector(`[data-color="${gameSeq[i - 1]}"]`);
      buttonFlash(btn);
      if (i == gameSeq.length) {
        const finalTimeout = setTimeout(function () {
          levelUp();
          playingSeq = false;
        }, 600);
        timeouts.push(finalTimeout);
      }
    }, i * 600);
    timeouts.push(timeoutID);
  }
}

function gameOver() {
  audio[5].cloneNode().play();
  display.innerText = "Game Over";
  display.classList.add("redText");
  gmOvr = true;
}
