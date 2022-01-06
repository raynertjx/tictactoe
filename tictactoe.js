var stage = document.querySelector("#stage");
var playerTurnText = document.querySelector("#playerturntext");
var gameBoardArr = [
  " ", " ", " ",
  " ", " ", " ",
  " ", " ", " "
];
var CELL_COUNT = 0;
var SIZE = 100;
var SPACE = 10;
var ROWS = 3
var COLUMNS = 3;
var playerTurn = true;


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
       
        cell.addEventListener("click", function() {
          // make sure player cannot play in spot that is already taken
          if (this.innerText != "") {
            return;
          }
          // alternates between the 2 players
          if (playerTurn) {
            this.innerText = player1.symbol;
            playerTurnText.innerText = `${player1.name}` + "" + "'s Turn";
            gameBoardArr[this.getAttribute("id")] = player1.symbol
            console.log(gameBoardArr)
            displayController.checkWinner(player1.symbol);
          } else {
            this.innerText = player2.symbol;
            playerTurnText.innerText = `${player2.name}` + "" + "'s Turn";
            gameBoardArr[this.getAttribute("id")] = player2.symbol
            console.log(gameBoardArr)
            displayController.checkWinner(player2.symbol);
          }
          playerTurn = !playerTurn;
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

  function checkWinner(player) {
    for (var i = 0; i < 3; i++) {
      // check the rows for winner
      if (gameBoardArr[3 * i] === player && gameBoardArr[1 + 3 * i] === player && gameBoardArr[2 + 3 * i] === player) {
        console.log("yay");
      }
      // check the columns for winner
      if (gameBoardArr[i] === player && gameBoardArr[3 + i] === player && gameBoardArr[6 + i] === player) {
        console.log("yay");
      }
    }
    // check the first diagonal for winner
    if (gameBoardArr[0] === player && gameBoardArr[4] === player && gameBoardArr[8] === player) {
      console.log("yay");
    }
    // check the second diagonal for winner
    if (gameBoardArr[2] === player && gameBoardArr[4] === player && gameBoardArr[6] === player) {
      console.log("yay");
    }
  }
  return {
    checkWinner: checkWinner
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

game()