// Tuck everything you can into a module or factory function

//Set up the board game ---------------------------------------
const GameBoard = (() => {
    let boardClean = () => {
        return [...Array(3)].map(e => Array(3).fill(null));
        }
    let board = boardClean();
    
    // Have a function that resets the board to its start state
    const resetBoard = () => {
        board = boardClean();
    }
    return {
        get board() {
            return board;
        },
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
        console.log(player.name);
        let move = false; 
        while (move === false) {
            const solicitMove = prompt(`${player.name} move. Enter row and column separated by space`);
            [row, column] = solicitMove.split(' ');
            move = player.move(row, column);
        };
        console.log(GameBoard.board);
    };
    round(player1);
    round(player2);
    GameBoard.resetBoard();
    console.log("Post Reset: ");
    console.log(GameBoard.board);
})();


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



// Check for win

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
    */