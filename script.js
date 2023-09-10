// Tuck everything you can into a module or factory function

//Set up the board game ---------------------------------------
const GameBoard = (() => {
    let board = [...Array(3)].map(e => Array(3).fill(null));
    
    // Have a function that resets the board to its start state
    const resetBoard = () => board.fill(null);
    return {
        board: board,
        resetBoard
    };
})();

// Create players ----------------------------------------------
const Player = (symbol) => {

    // Place 'x' and 'o' on board as move
    const move = (row, column) => {
        if (GameBoard.board[row][column] === null) {
            GameBoard.board[row][column] = symbol;
        }
        else {
            return false
        }
    }
    return {
        symbol,
        move
    }
}

// Play Game -------------------------------------------------
const Game = (() => {

    // Create players
    const player1 = Player('X');
    const player2 = Player('O');

    // Game Round - Control for game flow of turns

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

    const round = (player) => {
        console.log(player.name);
        let move = false; 
        while (move === false) {
            const solicitMove = prompt(`${player.name} move. Enter row and column separated by space`);
            [row, column] = solicitMove.split(' ');
            move = player.move(row, column);
        };
        console.log(GameBoard.board)
    };
    round(player1);
    round(player2);
    
    
})();



/*
function tests() {
    console.log(GameBoard.board);
    const player1 = Player('X');
    player1.move(1, 2);
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
