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
        console.log(player.name);

        // Player move, checking for whether the move is viable
        let move = false; 
        while (move === false) {
            const solicitMove = prompt(`${player.name} move. Enter row and column separated by space`);
            [row, column] = solicitMove.split(' ');
            move = player.move(row, column);
        };
        console.table(GameBoard.board);
    };

    const match = (player1, player2) => {
        const players = [player1, player2];
        let turn = 0;
        let winner = null; // Declare winner variable here
        while (winner === null) {
            const currentPlayer = players[turn % 2];
            round(currentPlayer);
            let statusCheck = GameBoard.checkWin();
            console.log("Status Check: " + statusCheck);
            if (statusCheck === currentPlayer.symbol) {
                winner = currentPlayer.symbol;
                console.log(`${currentPlayer.name} wins!`);
                return currentPlayer.name;
            }
            turn++; // Increment the turn counter to switch players
        }
    };    
    match(player1, player2);
})();
