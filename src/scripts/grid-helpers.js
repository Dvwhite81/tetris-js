import { addBottomHover, removeBottomHover, setBoardPlaced, updateBoard } from './board-helpers';

const ROWS = 20;
const COLUMNS = 10;

const getInitialGrid = () => {
  const grid = [];
  for (let x = 0; x < ROWS; x++) {
    const row = [];
    for (let y = 0; y < COLUMNS; y++) {
      const square = { class: 'none', set: false };
      row.push(square);
    }
    grid.push(row);
  }
  return grid;
};

const getFirstCoords = (piece) => {
  const { shape } = piece;
  const coords = [];
  const [startX, startY] = [0, 4];
  for (const coord of shape) {
    const x = coord.x + startX;
    const y = coord.y + startY;
    coords.push([x, y]);
  }

  piece.coords = coords;
  return coords;
};

const singleCoordIsValid = (coord, grid) => {
  let valid = true;
  const [x, y] = coord;
  // console.log('singleCoordsIsValid coord:', coord);
  if (x < 0 || x >= ROWS || y < 0 || y >= COLUMNS || grid[x][y].set === true) {
    valid = false;
  }
  return valid;
};

const coordsAreValid = (coords, grid) => {
  return coords.every((coord) => singleCoordIsValid(coord, grid));
};

const placePiece = (piece, grid) => {
  addToGrid(piece, grid);
  updateBoard(grid);
  const bottomCoords = getBottomCoords(piece, grid);
  addBottomHover(bottomCoords);
};

const removePiece = (piece, grid) => {
  const { coords } = piece;
  removeFromGrid(coords, grid);
  updateBoard(grid);
  removeBottomHover();
};

const addToGrid = (piece, grid) => {
  const { coords, squareClass } = piece;
  const { length } = coords;
  for (let i = 0; i < length; i++) {
    const [x, y] = coords[i];
    if (x >= 0) {
      grid[x][y].class = squareClass;
    }
  }
};

const removeFromGrid = (coords, grid) => {
  const { length } = coords;
  for (let i = 0; i < length; i++) {
    const [x, y] = coords[i];
    if (x >= 0) {
      grid[x][y].class = 'none';
    }
  }
};

const getNextCoords = (piece, direction) => {
  const { coords } = piece;
  const nextCoords = [];

  for (const coord of coords) {
    const [x, y] = coord;
    let newX;
    let newY;
    switch (direction) {
      case 'down': {
        newX = x + 1;
        newY = y;
        break;
      }
      case 'left': {
        newX = x;
        newY = y - 1;
        break;
      }
      case 'right': {
        newX = x;
        newY = y + 1;
        break;
      }
      default: {
        break;
      }
    }
    nextCoords.push([newX, newY]);
  }
  return nextCoords;
};

const setPiecePlaced = (piece, grid) => {
  const { coords } = piece;
  console.log('setPiecePlaced coords:', coords);
  const { length } = coords;
  for (let i = 0; i < length; i++) {
    const [x, y] = coords[i];
    if (x >= 0) {
      const square = grid[x][y];
      square.set = true;
    }
  }
  setBoardPlaced(coords);
};

const getBottomCoords = (piece, grid) => {
  const { coords } = piece;
  let bottom = false;
  let bottomCoords = coords;
  while (!bottom) {
    let nextCoords = [];
    for (const coord of bottomCoords) {
      const [x, y] = coord;
      nextCoords.push([x + 1, y]);
    }
    if (coordsAreValid(nextCoords, grid)) {
      bottomCoords = nextCoords;
    } else {
      bottom = true;
    }
  }
  return bottomCoords;
};

const clearSquare = (square) => {
  square.set = false;
  square.class = 'none';
};

const clearRow = (x, grid) => {
  for (let y = 0; y < COLUMNS; y++) {
    const square = grid[x][y];
    clearSquare(square);
  }
};

const moveAboveSquareDown = (x, y, grid) => {
  let square = grid[x][y];
  let squareAbove = grid[x - 1][y];
  square.set = squareAbove.set;
  square.class = squareAbove.class;
  clearSquare(squareAbove);
};

const removeRowFromGrid = (row, grid) => {
  if (row === 0) {
    return;
  }

  for (let x = row; x > 0; x--) {
    for (let y = 0; y < COLUMNS; y++) {
      moveAboveSquareDown(x, y, grid);
    }
  }
};

export {
  clearRow,
  COLUMNS,
  coordsAreValid,
  getBottomCoords,
  getFirstCoords,
  getInitialGrid,
  getNextCoords,
  placePiece,
  removePiece,
  removeRowFromGrid,
  ROWS,
  setPiecePlaced,
  singleCoordIsValid
};
