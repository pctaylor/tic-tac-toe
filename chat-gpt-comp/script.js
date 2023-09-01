// GameBoard Module
const GameBoard = (() => {
    let board = Array(9).fill(null);
  
    const getBoard = () => board;
  
    const setCell = (index, player) => {
      if (!board[index]) {
        board[index] = player.getSymbol();
        return true;
      }
      return false;
    };
  
    const reset = () => {
      board = Array(9).fill(null);
    };
  
    return { getBoard, setCell, reset };
  })();
  
  // Player Factory
  const Player = (symbol) => {
    const getSymbol = () => symbol;
    return { getSymbol };
  };
  
  // GameController Module
  const GameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let currentPlayer = playerX;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };
  
    const checkWin = () => {
      const board = GameBoard.getBoard();
      const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      return winningCombination.some(combination =>
        combination.every(index => board[index] === currentPlayer.getSymbol())
      );
    };
  
    return { currentPlayer, switchPlayer, checkWin };
  })();
  
  // DisplayController Module
  const DisplayController = (() => {
    const winnerDiv = document.getElementById('winner');
  
    const renderBoard = (cells) => {
      const board = GameBoard.getBoard();
      board.forEach((cell, index) => {
        cells[index].textContent = cell;
      });
    };
  
    const displayWinner = () => {
      winnerDiv.textContent = `Player ${GameController.currentPlayer.getSymbol()} wins!`;
    };
  
    return { renderBoard, displayWinner };
  })();
  
  // DOMContentLoaded Event Listener
  document.addEventListener('DOMContentLoaded', () => {
    const boardDiv = document.getElementById('board');
    const cells = [];
  
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', function() {
        if (GameBoard.setCell(i, GameController.currentPlayer)) {
          DisplayController.renderBoard(cells);
          if (GameController.checkWin()) {
            DisplayController.displayWinner();
            GameBoard.reset();
            DisplayController.renderBoard(cells);
          } else {
            GameController.switchPlayer();
          }
        }
      });
      boardDiv.appendChild(cell);
      cells.push(cell);
    }
  
    document.getElementById('reset').addEventListener('click', () => {
      GameBoard.reset();
      DisplayController.renderBoard(cells);
    });
  });
  