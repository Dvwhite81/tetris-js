import { COLUMNS } from './grid-helpers';

const checkForLines = (coords, grid) => {
  const rows = [];
  for (const coord of coords) {
    rows.push(coord[0]);
  }

  const lines = [];
  for (const x of rows) {
    const hasLine = checkRowForLine(x, grid);
    if (hasLine && !lines.includes(x)) {
      lines.push(x);
    }
  }
  return lines;
};

const checkRowForLine = (x, grid) => {
  let complete = true;
  for (let y = 0; y < COLUMNS; y++) {
    const square = grid[x][y];
    if (!square.set) {
      complete = false;
    }
  }
  return complete;
};

export { checkForLines };
