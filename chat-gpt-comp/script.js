//create board
const getBoard = (() => {
  let board = [...Array(3)].map(e => Array(3).fill(null));
  return {
      board: board
  };
})();
console.log(getBoard);