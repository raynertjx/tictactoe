var stage = document.querySelector("#stage");
var playerTurnText = document.querySelector(".playerturntext");
var winnerContainer = document.querySelector(".winnercontainer");
var winningText = document.querySelector(".winningtext");
var playerMenu = document.querySelector(".playermenu")
var player1Name = document.querySelector("#player1name");
var player2Name = document.querySelector("#player2name");
var mainMenu = document.querySelector(".mainmenu");
var gameScreen = document.querySelector(".gamescreen");
const buttons = document.querySelectorAll("button");
var gameBoardArr = ["", "", "", "", "", "", "", "", ""];
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
          // ensure player cannot place marker when spot is already taken or when game is over
          if (this.innerText != "" || (winnerFound)) {
            return;
          } 
          // alternates between the 2 players
          if (playerTurn) {
            this.innerHTML = `<span class="material-icons-outlined gamesymbol1 fade-in">
            close</span>`
            gameBoardArr[this.getAttribute("id")] = player1.symbol
            displayController.checkWinner(player1);
          } else {
            this.innerHTML = `<span class="material-icons-outlined gamesymbol2 fade-in">
            circle</span>`
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

  function restartGameBoard() {
    // reset certain variables
    CELL_COUNT = 0;
    gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    playerTurn = !playerTurn;
    displayController.hideContent(winnerContainer)
    if (winnerFound) {
      winnerFound = !winnerFound;
    }
    if (!playerTurn) {
      playerTurn = !playerTurn;
    }
    while (stage.firstChild) {
      stage.removeChild(stage.lastChild);
    }
  }
  return {
    createGameBoard: createGameBoard,
    restartGameBoard: restartGameBoard
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
      displayController.displayWinner(player.name);
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
    if (winnerFound) {
      winningText.innerText = player + " wins!";
      showContent(winnerContainer);
    }
    else {
      winningText.innerText = "Draw!";
      showContent(winnerContainer);
    }
    blurBackground();
  }

  function hideContent(id) {
    id.classList.add("hidden");
  }

  function showContent(id) {
    id.classList.remove("hidden");
  }

  function resetPlayerNames() {
    player1Name.value = "";
    player2Name.value = "";
  }

  function blurBackground() {
    $('body > *:not(#endscreen)').css("filter","blur(3px)");
  }

  function unblurBackground() {
    $('body > *:not(#endscreen)').css("filter","blur(0px)");
  }

  return {
    checkWinner: checkWinner,
    playerTurnDisplay: playerTurnDisplay,
    displayWinner: displayWinner,
    hideContent: hideContent,
    showContent: showContent,
    resetPlayerNames: resetPlayerNames,
    blurBackground: blurBackground,
    unblurBackground: unblurBackground
  };
})();

// game object, controls flow of game
var game = function(name1, name2) {

  // Create players
  var player1 = createPlayer(name1, "x");
  var player2 = createPlayer(name2, "o");

  // Create gameboard
  gameBoard.createGameBoard(player1, player2);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("playermenubtn")) {
      displayController.hideContent(mainMenu);
      displayController.showContent(playerMenu);
    }
    if (button.classList.contains("startgamebtn")) {
      if (player1Name.value == "" || player2Name.value == "") {
        alert("Please input your names!")
        return;
      }
      if (player1Name.value == player2Name.value) {
        alert("Player names cannot be the same!")
        displayController.resetPlayerNames();
        return;
      }
      game(player1Name.value, player2Name.value);
      displayController.hideContent(playerMenu);
      displayController.showContent(gameScreen);
    }
    if (button.classList.contains("gobackbtn")) {
      displayController.resetPlayerNames();
      displayController.hideContent(playerMenu);
      displayController.showContent(mainMenu);
    }
    if (button.classList.contains("restartbtn")) {
      gameBoard.restartGameBoard();
      displayController.unblurBackground();
      game(player1Name.value, player2Name.value);
    }
    if (button.classList.contains("mainmenubtn")) {
      displayController.resetPlayerNames();
      gameBoard.restartGameBoard();
      displayController.unblurBackground();
      displayController.showContent(mainMenu);
      displayController.hideContent(gameScreen);
    }
  })
})
