// Tuck everything you can into a module or factory function

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

    // return the board itself, reset, and win check
    return {
        get board() {
            return board;
        },
        setBoard,
        checkWin,
        resetBoard
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


// Play Game -------------------------------------------------
const Game = (() => {

    // Create players
    const player1 = Player("Player 1", 'X');
    const player2 = Player("Player 2", 'O');

    // Game Round - Control for game flow of turns
    const round = (player) => {
        console.log(GameBoard.board);
        console.log(player.name);

        // Player move, checking for whether the move is viable
        let move = false; 
        while (move === false) {
            const solicitMove = prompt(`${player.name} move. Enter row and column separated by space`);
            [row, column] = solicitMove.split(' ');
            move = player.move(row, column);
        };

        // Check if the player has won
        let statusCheck = GameBoard.checkWin();
        if (statusCheck === player.symbol) {
            console.log(`${player.name} wins!`);
            return true;
        } else {
            return false;
        };
    };

    round(player1);

})();

round(player1);
round(player2);

/*
function tests() {
    console.log(GameBoard.board);
    const player1 = Player('X');
    player1.move(1, 2);
    console.log(GameBoard.board);
    GameBoard.resetBoard;
    console.log(GameBoard.board);
};
tests();
*/




  
  

// Announce Win


/* ------------------------------
|*  VISUAL DISPLAY OF BOARD
|*------------------------------*/

// Render board

// Reset game with button



/*
    let solicitMove = prompt('Player 1 Move. Enter row and column separated by space');
    [row, column] = solicitMove.split(' ');
    player1.move(row, column);
    console.log(GameBoard.board)

    solicitMove = prompt('Player 2 Move. Enter row and column separated by space');
    [row, column] = solicitMove.split(' ');
    player2.move(row, column);
    console.log(GameBoard.board)


    GameBoard.setBoard([
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'O']
  ]);
console.log(GameBoard.checkWin());  // Output should be null (no winner)

    */