/* eslint-disable no-unused-vars */
import {
  openGameOverModal,
  openLevelOverModal,
  resetDom,
  setPiecePlaced,
  setUpNextContainer,
  updateNextContainer,
  updateScoreContainer
} from './dom-helpers';
import { coordsAreValid, getFirstCoords, getInitialGrid, getNextCoords, placePiece, removePiece } from './grid-helpers';
import { PIECES } from './piece-helpers';

let ID, score, level, lines, speed, grid, moveIsOver, levelIsOver, gameIsOver, currentPiece, nextPieces;

const setUpGame = () => {
  ID = 0;
  score = 0;
  level = 1;
  lines = 10;
  speed = 100;
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
  console.log('startGame');
  firstMove();
};

const firstMove = () => {
  console.log('firstMove');
  const coords = getFirstCoords(currentPiece);
  console.log('firstMove coords:', coords);
  if (coordsAreValid(coords, grid)) {
    console.log('firstMove VALID');
    currentPiece.coords = coords;
    placePiece(currentPiece, grid);
  } else {
    endGame();
  }
};

const startNextMove = () => {};

const endMove = () => {
  getNewPiece();
  firstMove();
};

const getRandomPiece = () => {
  const randomIndex = Math.floor(Math.random() * PIECES.length);
  const piece = PIECES[randomIndex];
  piece.coords = [];
  piece.id = ID;
  ID++;
  console.log('piece.id:', piece.id);
  console.log('getRandom piece:', piece);
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

export { resetGame, setUpGame, startNextLevel };
