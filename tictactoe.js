var stage = document.querySelector("#stage");
var playerTurnText = document.querySelector("#playerturntext");
var winningText = document.querySelector("#winningtext");
var startGameBtn = document.querySelector(".startgamebtn");
var startGameMenu = document.querySelector(".startgamemenu");
var gameScreen = document.querySelector(".gamescreen");
var gameBoardArr = [
  "", "", "",
  "", "", "",
  "", "", ""
];
var CELL_COUNT = 0;
var SIZE = 100;
var SPACE = 10;
var ROWS = 3
var COLUMNS = 3;
var playerTurn = true;
var winnerFound = false;

// player factory function 
const createPlayer = (name, symbol) => {
  return {
    name: name,
    symbol: symbol
  }
}

// gameBoard module
var gameBoard = (function() {
  'use strict';
  
  function createGameBoard(player1, player2) {
    for (var row = 0; row < ROWS; row++) {
      for (var column = 0; column < COLUMNS; column++) {
        var cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("id", CELL_COUNT);
        stage.appendChild(cell);
        CELL_COUNT++;
        
        displayController.playerTurnDisplay(player1, player2)
       
        cell.addEventListener("click", function() {
          // make sure player cannot play in spot that is already taken
          if (this.innerText != "") {
            return;
          }
          // alternates between the 2 players
          if (playerTurn) {
            this.innerText = player1.symbol;
            gameBoardArr[this.getAttribute("id")] = player1.symbol
            displayController.checkWinner(player1);
          } else {
            this.innerText = player2.symbol;
            playerTurnText.innerText = `${player2.name}` + "" + "'s Turn";
            gameBoardArr[this.getAttribute("id")] = player2.symbol
            displayController.checkWinner(player2);
          }
          playerTurn = !playerTurn;
          displayController.playerTurnDisplay(player1, player2)
        });
      }
    }
  }
  return {
    createGameBoard: createGameBoard
  };
})();

// displayController module
var displayController = (function() {
  'use strict'
  // check for winner
  function checkWinner(player) {
    for (var i = 0; i < 3; i++) {
      // check the rows for winner
      if (gameBoardArr[3 * i] === player.symbol && gameBoardArr[1 + 3 * i] === player.symbol && gameBoardArr[2 + 3 * i] === player.symbol) {
        winnerFound = !winnerFound;
        displayController.displayWinner(player.name);
      }
      // check the columns for winner
      if (gameBoardArr[i] === player.symbol && gameBoardArr[3 + i] === player.symbol && gameBoardArr[6 + i] === player.symbol) {
        winnerFound = !winnerFound;
        displayController.displayWinner(player.name);
      }
    }
    // check the first diagonal for winner
    if (gameBoardArr[0] === player.symbol && gameBoardArr[4] === player.symbol && gameBoardArr[8] === player.symbol) {
      winnerFound = !winnerFound;
      displayController.displayWinner(player.name);
    }
    // check the second diagonal for winner
    if (gameBoardArr[2] === player.symbol && gameBoardArr[4] === player.symbol && gameBoardArr[6] === player.symbol) {
      winnerFound = !winnerFound;
      displayController.displayWinner(player.name);
    }
    // if no winner, print draw
    const arrIsFilled = (currentValue) => currentValue != "";
    if ((!winnerFound) && (gameBoardArr.every(arrIsFilled))) {
      winningText.innerText = "Draw!";
      showContent(winningText);
    }
  }

  function playerTurnDisplay(player1, player2) {
    if (playerTurn) {
      playerTurnText.innerText = `${player1.name}` + "" + "'s Turn";
    } else {
      playerTurnText.innerText = `${player2.name}` + "" + "'s Turn";
    }
  }

  function displayWinner(player) {
    winningText.innerText = player + " wins!";
    showContent(winningText);
  }


  function hideContent(id) {
    id.classList.add("hidden");
  }

  function showContent(id) {
    id.classList.remove("hidden");
  }

  return {
    checkWinner: checkWinner,
    playerTurnDisplay: playerTurnDisplay,
    displayWinner: displayWinner,
    hideContent: hideContent,
    showContent: showContent
  };
})();

// game object, controls flow of game
var game = function() {

  // Create players
  var player1 = createPlayer(1, "x");
  var player2 = createPlayer(2, "o");

  // Create gameboard
  gameBoard.createGameBoard(player1, player2);

}

startGameBtn.addEventListener("click", () => {
  game();
  displayController.hideContent(startGameMenu);
  displayController.showContent(gameScreen);
})