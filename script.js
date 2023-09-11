//Set up the board game ---------------------------------------
const GameBoard = (() => {

    // Board itself
    let boardClean = () => {
        return [...Array(3)].map(e => Array(3).fill(null));
        }
    let board = boardClean();
    
    // Have a function that resets the board to its start state
    const resetBoard = () => {
        board = boardClean();
    };

    // I want a helper function to help test arbitrary boards
    const setBoard = (newBoard) => {
        board = newBoard;
    };

    // Have function to check for win
    // Check for win
    const checkWin = () => {
    
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && 
                board[row][1] === board[row][2] && 
                board[row][0] !== null) {
                return board[row][0];
            }
        }
    
        // Check columns
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && 
                board[1][col] === board[2][col] && 
                board[0][col] !== null) {
                return board[0][col];
            }
        }
    
        // Check diagonals
        if (board[0][0] === board[1][1] && 
            board[1][1] === board[2][2] && 
            board[0][0] !== null) {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && 
            board[1][1] === board[2][0] && 
            board[0][2] !== null) {
            return board[0][2];
        }
    
        // No winner
        return null;
    };

    // Checking for draw
    const checkDraw = () => {
        return board.flat().every(cell => cell !== null);
    };

    // return the board itself, reset, and win check
    return {
        get board() {
            return board;
        },
        setBoard,
        checkWin,
        resetBoard,
        checkDraw
    };
})();  

// Create players ----------------------------------------------
const Player = (name, symbol) => {

    // Place 'x' and 'o' on board as move
    const move = (row, column) => {
        if (GameBoard.board[row][column] === null) {
            GameBoard.board[row][column] = symbol;
            return true;
        }
        else {
            return false
        }
    }
    return {
        name,
        symbol,
        move
    }
}


// Your existing GameBoard and Player code remains unchanged

// Your existing GameBoard and Player code remains unchanged

// Play Game -------------------------------------------------
const Game = (() => {
    // Create players
    const player1 = Player("Player 1", 'X');
    const player2 = Player("Player 2", 'O');
    let currentPlayer = player1; // Start with player 1

    const gameStatus = document.querySelector('.gameStatus');

    // Function to handle a player's move
    const handleMove = (row, col, cell) => {
        if (currentPlayer.move(row, col)) {
            cell.textContent = currentPlayer.symbol;
            const winner = GameBoard.checkWin();
            const isDraw = GameBoard.checkDraw();
            if (winner) {
                gameStatus.textContent = `${currentPlayer.name} wins!`;
            } else if (isDraw) { // Handle draw condition
                gameStatus.textContent = "It's a draw!";
            } else {
                gameStatus.textContent = `${(currentPlayer === player1) ? player2.name : player1.name}'s turn`;
            }
            // Switch to the other player for the next turn
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
    };

    // Add event listeners for cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.addEventListener('click', () => handleMove(row, col, cell));
    });

    // Add event listener for reset button
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        GameBoard.resetBoard();
        cells.forEach(cell => cell.textContent = ''); // Clear the cell's text content
        currentPlayer = player1; // Reset to player 1
        gameStatus.textContent = 'Begin Game'; // Reset game status
    });
})();
