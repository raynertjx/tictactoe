var stage = document.querySelector("#stage");
var gameBoardArr = [
  " ", " ", " ",
  " ", " ", " ",
  " ", " ", " "
];
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
  
  function createGameBoard(symbol1, symbol2) {
    for (var row = 0; row < ROWS; row++) {
      for (var column = 0; column < COLUMNS; column++) {
        var cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        stage.appendChild(cell);
       

        cell.addEventListener("click", function() {
          if (playerTurn) {
            this.innerHTML = symbol1;
          } else {
            this.innerHTML = symbol2;
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



// game object, controls flow of game
var game = function() {

  // Create players
  var player1 = createPlayer(1, "x");
  var player2 = createPlayer(2, "o");

  // Create gameboard
  gameBoard.createGameBoard(player1.symbol, player2.symbol);

}

game()