/* eslint-disable no-unused-vars */
import {
  openGameOverModal,
  openLevelOverModal,
  resetDom,
  setUpNextContainer,
  updateNextContainer,
  updateScoreContainer
} from './dom-helpers';
import {
  coordsAreValid,
  getBottomCoords,
  getFirstCoords,
  getInitialGrid,
  getNextCoords,
  placePiece,
  removePiece,
  setPiecePlaced
} from './grid-helpers';
import { PIECES, rotatePiece } from './piece-helpers';

let ID, score, level, lines, speed, grid, moveIsOver, levelIsOver, gameIsOver, currentPiece, nextPieces;

const setUpGame = () => {
  ID = 0;
  score = 0;
  level = 1;
  lines = 10;
  speed = 2000;
  grid = getInitialGrid();
  moveIsOver = false;
  levelIsOver = false;
  gameIsOver = false;
  const firstPiece = getRandomPiece();
  const secondPiece = getRandomPiece();
  const thirdPiece = getRandomPiece();
  currentPiece = firstPiece;
  nextPieces = [secondPiece, thirdPiece];
  updateScoreContainer(score, level, lines);
  setUpNextContainer(nextPieces);
  startGame();
};

const startGame = () => {
  startMove();
};

const startMove = () => {
  const coords = getFirstCoords(currentPiece);
  if (coordsAreValid(coords, grid)) {
    currentPiece.coords = coords;
    placePiece(currentPiece, grid);
    continueMove();
    addKeyListeners();
  } else {
    endGame();
  }
};

const continueMove = () => {
  setTimeout(() => {
    const nextCoords = getNextCoords(currentPiece, 'down');
    movePiece(nextCoords);
  }, speed);
};

const movePiece = (nextCoords) => {
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
  // Need to set piece placed
  setPiecePlaced(currentPiece, grid);
  getNewPiece();
  startMove();
};

const getRandomPiece = () => {
  const randomIndex = Math.floor(Math.random() * PIECES.length);
  const piece = PIECES[randomIndex];
  piece.coords = [];
  piece.id = ID;
  ID++;
  return piece;
};

const getNewPiece = () => {
  const newPiece = getRandomPiece();
  currentPiece = nextPieces.shift();
  nextPieces.push(newPiece);
  updateNextContainer(newPiece);
};

const startNextLevel = () => {
  console.log('startNextLevel');
};

const endLevel = () => {
  console.log('LEVEL OVER');
  level++;
  lines += 10;
  openLevelOverModal(level, lines);
};

const endGame = () => {
  console.log('GAME OVER');
  openGameOverModal();
};

const resetGame = () => {
  resetDom();
  setUpGame();
};

const addKeyListeners = () => {
  document.addEventListener('keydown', handleKeyPress);
};

const handleKeyPress = (e) => {
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
      newCoords = rotatePiece(currentPiece);
      break;
    }
    default: {
      break;
    }
  }
  if (coordsAreValid(newCoords, grid)) {
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

export { resetGame, setUpGame, startNextLevel };
