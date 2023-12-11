import { updateBoard } from './dom-helpers';

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
  console.log('getInitialGrid grid:', grid);
  return grid;
};

const getFirstCoords = (piece) => {
  const { shape, height } = piece;
  const coords = [];
  const [startX, startY] = [0 - (height - 1), 4];

  for (const coord of shape) {
    const x = coord.x + startX;
    const y = coord.y + startY;
    coords.push([x, y]);
    console.log('coords:', coords);
  }

  piece.coords = coords;
  return coords;
};

const coordsAreValid = (coords, grid) => {
  let valid = true;

  for (const coord of coords) {
    const [x, y] = coord;
    if (x >= 0 && (x >= ROWS || y >= COLUMNS || grid[x][y].set === true)) {
      valid = false;
    }
  }
  return valid;
};

const placePiece = (piece, grid) => {
  console.log('placePiece grid:', grid);
  addToGrid(piece, grid);
  updateBoard(grid);
};

const removePiece = (piece, grid, squareClass) => {
  const { coords } = piece;
  removeFromGrid(coords, grid);
  updateBoard(grid, squareClass);
};

const addToGrid = (piece, grid) => {
  const { coords, squareClass } = piece;
  const { length } = coords;
  console.log('addToGrid grid:', grid);
  console.log('addToGrid coords:', coords);
  for (let i = 0; i < length; i++) {
    const [x, y] = coords[i];
    console.log('addToGrid coords[i]:', coords[i]);
    console.log('addToGrid [x, y]:', [x, y]);
    if (x >= 0) {
      console.log('addToGrid x >= 0');
      console.log('grid[x][y]:', grid[x][y]);
      grid[x][y].class = squareClass;
      console.log('AFTER grid:', grid);
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
      case 'bottom': {
        [newX, newY] = getBottomCoords(piece);
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

const getBottomCoords = (piece) => {
  console.log('bottom piece:', piece);
  return piece;
};

export { coordsAreValid, getFirstCoords, getInitialGrid, getNextCoords, placePiece, removePiece };
