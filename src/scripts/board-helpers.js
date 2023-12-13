import { COLUMNS, ROWS } from './grid-helpers';

const updateBoard = (grid) => {
  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLUMNS; y++) {
      const cell = document.querySelector(`#cell-${x}-${y}`);
      const square = grid[x][y];
      if (square.class === 'none') {
        cell.className = 'cell';
      } else {
        cell.classList.add(square.class);
      }
    }
  }
};

const setBoardPlaced = (coords) => {
  for (const coord of coords) {
    const [x, y] = coord;
    if (x >= 0 && y >= 0) {
      const cell = document.querySelector(`#cell-${x}-${y}`);
      cell.classList.add('set');
    }
  }
};

const addBottomHover = (coords) => {
  for (const coord of coords) {
    const [x, y] = coord;
    const cell = document.querySelector(`#cell-${x}-${y}`);
    cell.classList.add('hover');
  }
};

const removeBottomHover = () => {
  const cells = document.querySelectorAll('.cell');
  for (const cell of cells) {
    cell.classList.remove('hover');
  }
};

export { addBottomHover, removeBottomHover, setBoardPlaced, updateBoard };
