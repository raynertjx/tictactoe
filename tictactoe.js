var stage = document.querySelector("#stage");

// 2d array for the gameboard
var gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

var SIZE = 100;

var SPACE = 10;

var ROWS = gameBoard.length;
var COLUMNS = gameBoard[0].length;

for (var row = 0; row < ROWS; row++) {
  for (var column = 0; column < COLUMNS; column++) {
    var cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    stage.appendChild(cell);
    cell.style.top = row * (SIZE + SPACE) + "px";
    cell.style.left = column * (SIZE + SPACE) + "px";
  }
}