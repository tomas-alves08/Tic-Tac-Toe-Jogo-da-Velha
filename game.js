"use strict";

// GENERAL CONSTANTS
const table = document.querySelector(".table");
const squares = document.querySelectorAll(".option");
const subtitleId = document.getElementById("subtitle");

// AUDIOS
const soundPlayer1 = new Audio("8d82b5_Bart_Simpson_Haha_Sound_Effect.mp3");
const soundPlayer2 = new Audio("45VPSJX-pig-oink-2782.mp3");
const winningSound = new Audio("mixkit-animated-small-group-applause-523.wav");
const failSound = new Audio("fail-trombone-02.mp3");

// INITIAL CONDITIONS
let player1 = [];
let player2 = [];
let game = true;
let bothPlayers = [];
let player = 1;
const winningSequences = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// --> FUNCTIONS <-- //

// FUNCTION REMOVE ATTRIBUTE
const removeAttribute = () => {
  for (const item of squares) {
    item.removeAttribute("onclick");
  }
};

// FUNCTION DRAW
const draw = () => {
  for (const item of squares) {
    document.getElementById(item.id).style.background = "yellow";
    failSound.play();
    subtitleId.innerHTML = "DRAW GAME";
    subtitleId.style.background = "yellow";
    subtitleId.style.color = "black";
    subtitleId.style.fontSize = "xx-large";
    game = false;
  }
};

// FUNCTION RESET ATTRIBUTE
const resetAttribute = () => {
  for (const item of squares) {
    item.setAttribute("onclick", `display_input('${item.id}')`);
  }
};

// FUNCTION INCLUDES ALL //
const containsAll = (arr1, arr2) =>
  arr1.every((element) => arr2.includes(element));

// FUNCTION GAME
function display_input(square) {
  // CONSTANT
  const squareId = document.getElementById(square);

  // PLAYER 1 TURN
  if (player === 1) {
    squareId.innerHTML = "X";
    player1.push(square);
    bothPlayers.push(square);
    squareId.removeAttribute("onclick");

    subtitleId.innerHTML = "Player 2 Turn";
    // CHECKING IF PLAYER 1 WINS
    for (const win of winningSequences.values()) {
      const player1Number = player1.map((item) => Number(item));

      if (containsAll(win, player1Number)) {
        for (const square of win) {
          document.getElementById(square).style.background = "green";
        }
        subtitleId.style.background = "green";
        subtitleId.style.fontSize = "xx-large";
        subtitleId.style.color = "black";
        subtitleId.innerHTML = "Player 1 Wins";
        winningSound.play();
        game = false;
      }
    }
    player = 2;
    soundPlayer1.play();

    // PLAYER 2 TURN
  } else {
    squareId.innerHTML = "O";
    player2.push(square);
    bothPlayers.push(square);
    squareId.removeAttribute("onclick");

    subtitleId.innerHTML = "Player 1 Turn";

    // CHECKING IF PLAYER 2 WINS
    for (const win of winningSequences.values()) {
      const player2Number = player2.map((item) => Number(item));

      if (containsAll(win, player2Number)) {
        for (const square of win) {
          document.getElementById(square).style.background = "red";
        }
        subtitleId.style.background = "red";
        subtitleId.style.fontSize = "xx-large";
        subtitleId.style.color = "black";
        subtitleId.innerHTML = "Player 2 Wins";
        winningSound.play();
        game = false;
      }
    }
    player = 1;
    soundPlayer2.play();
  }

  game === false && removeAttribute();

  if (bothPlayers.length === 9) {
    draw();
  }
}

// FUNCTION RESTART
const restart = function () {
  document.querySelector(".restart").addEventListener("click", function () {
    for (const item of squares) {
      document.getElementById(item.id).innerHTML = "";
      document.getElementById(item.id).style.background = "";
      subtitleId.style.background = "";
      subtitleId.style.fontSize = "2vw";
      subtitleId.style.color = "#4c2c92";
    }
    resetAttribute();
    player1 = [];
    player2 = [];
    bothPlayers = [];
    game = true;

    player = 1;
    subtitleId.innerHTML = "Click on a cell to start!";
  });
};

restart();
