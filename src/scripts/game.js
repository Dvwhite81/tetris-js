/* eslint-disable no-unused-vars */
import { updateBoard } from './board-helpers';
import {
  openGameOverModal,
  openLevelOverModal,
  resetBoard,
  setUpNextContainer,
  updateNextContainer,
  updateScoreContainer
} from './dom-helpers';
import {
  clearRow,
  coordsAreValid,
  getBottomCoords,
  getFirstCoords,
  getInitialGrid,
  getNextCoords,
  placePiece,
  removePiece,
  removeRowFromGrid,
  setPiecePlaced
} from './grid-helpers';
import { checkForLines } from './line-helpers';
import { getRandomPiece, rotatePiece } from './piece-helpers';
import { countdown, tetrisFlash } from './screen-helpers';

const initialValues = {
  score: 0,
  level: 1,
  lines: 10,
  speed: 1000
};

let { score, level, lines, speed } = initialValues;

let ID, grid, currentPiece, nextPieces;

const setUpGame = () => {
  // console.log('setUpGame');
  // console.log('speed:', speed);
  ID = 0;
  grid = getInitialGrid();
  resetBoard();
  const firstPiece = getPieceWithId();
  const secondPiece = getPieceWithId();
  const thirdPiece = getPieceWithId();
  currentPiece = firstPiece;
  nextPieces = [secondPiece, thirdPiece];
  updateScoreContainer(score, level, lines);
  setUpNextContainer(nextPieces);
  startGame();
};

const startGame = () => {
  // console.log('startGame');
  countdown();
  setTimeout(() => {
    startMove();
  }, 5000);
};

const startMove = () => {
  // console.log('startMove');
  const coords = getFirstCoords(currentPiece);
  if (coordsAreValid(coords, grid)) {
    currentPiece.coords = coords;
    placePiece(currentPiece, grid);
    continueMove();
    addKeyListeners();
  } else {
    return endGame();
  }
};

const continueMove = () => {
  // console.log('continueMove');
  setTimeout(() => {
    const nextCoords = getNextCoords(currentPiece, 'down');
    movePiece(nextCoords);
  }, speed);
};

const movePiece = (nextCoords) => {
  // console.log('movePiece');
  if (coordsAreValid(nextCoords, grid)) {
    removePiece(currentPiece, grid);
    currentPiece.coords = nextCoords;
    placePiece(currentPiece, grid);
    continueMove();
  } else {
    endMove();
  }
};

const endMove = () => {
  // console.log('endMove');
  setPiecePlaced(currentPiece, grid, lines);
  const levelIsOver = checkLevelOver();
  if (levelIsOver) {
    endLevel();
  } else {
    getNewPiece();
    startMove();
  }
};

const checkLevelOver = () => {
  let over = false;
  const completedLines = checkForLines(currentPiece.coords, grid);
  const { length } = completedLines;
  if (length > 0) {
    if (length > lines) {
      lines = 0;
    } else {
      lines -= length;
    }
    score += 500 * length + 100 * length;
    // Extra bonus for tetris
    if (length >= 4) {
      tetrisFlash();
      score += 5000;
    }
    updateScoreContainer(score, level, lines);
    removeCompletedLines(completedLines, grid);
    if (lines <= 0) {
      over = true;
    }
  }
  return over;
};

const removeCompletedLines = (rows, grid) => {
  // Might need to check for consecutive
  // console.log('rows:', rows);
  rows.sort((a, b) => a - b);
  for (const x of rows) {
    clearRow(x, grid);
    removeRowFromGrid(x, grid);
    updateBoard(grid);
  }
};

const getPieceWithId = () => {
  // console.log('getPieceWithId');
  const piece = getRandomPiece(ID);
  ID++;
  // console.log('new Piece:', piece);
  return piece;
};

const getNewPiece = () => {
  // console.log('getNewPiece');
  const newPiece = getPieceWithId();
  currentPiece = nextPieces.shift();
  currentPiece.currentShape = 0;
  nextPieces.push(newPiece);
  updateNextContainer(newPiece);
};

const endLevel = () => {
  // console.log('LEVEL OVER');
  level++;
  lines += level * 10;
  speed *= 0.5;
  openLevelOverModal(level, lines);
};

const endGame = () => {
  // console.log('GAME OVER');
  openGameOverModal();
};

const resetGame = () => {
  // console.log('resetGame');
  score = 0;
  level = 1;
  lines = 10;
  speed = 1000;
  setUpGame();
};

const addKeyListeners = () => {
  document.addEventListener('keydown', handleKeyPress);
};

const handleKeyPress = (e) => {
  e.preventDefault();
  const { key } = e;
  if (!keyIsValid(key)) {
    return;
  }
  let newCoords;

  switch (key) {
    case 'ArrowLeft': {
      newCoords = getNextCoords(currentPiece, 'left');
      break;
    }
    case 'ArrowRight': {
      newCoords = getNextCoords(currentPiece, 'right');
      break;
    }
    case 'ArrowDown': {
      newCoords = getBottomCoords(currentPiece, grid);
      break;
    }
    case 'ArrowUp': {
      newCoords = rotatePiece(currentPiece, grid);
      break;
    }
    default: {
      break;
    }
  }
  if (newCoords && coordsAreValid(newCoords, grid)) {
    removePiece(currentPiece, grid);
    currentPiece.coords = newCoords;
    placePiece(currentPiece, grid);
  } else {
    return;
  }
};

const keyIsValid = (key) => {
  const valid = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  return valid.includes(key);
};

export { resetGame, setUpGame };
