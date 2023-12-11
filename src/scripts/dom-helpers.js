import { buildRows } from './dom-setup';
import { resetGame, setUpGame, startNextLevel } from './game-setup';

const updateScoreContainer = (score, level, lines) => {
  const scoreDisplay = document.querySelector('#score');
  scoreDisplay.textContent = score;

  const levelDisplay = document.querySelector('#level');
  levelDisplay.textContent = level;

  const linesDisplay = document.querySelector('#lines');
  linesDisplay.textContent = lines;
};

const setUpNextContainer = (nextPieces) => {
  const nextContainer = document.querySelector('#next');
  for (const piece of nextPieces) {
    const pieceElement = buildPiece(piece);
    nextContainer.append(pieceElement);
  }
};

const updateNextContainer = (newPiece) => {
  const nextContainer = document.querySelector('#next');
  const firstElement = nextContainer.children[0];
  firstElement.remove();
  const newElement = buildPiece(newPiece);
  nextContainer.append(newElement);
};

const buildPiece = (piece) => {
  const { id, pieceClass, height, width } = piece;

  const pieceElement = document.createElement('div');
  pieceElement.id = id;
  pieceElement.className = `${pieceClass} piece`;

  pieceElement.style.height = `calc(var(--cell-size) * ${height})`;
  pieceElement.style.width = `calc(var(--cell-size) * ${width})`;
  return pieceElement;
};

const updateBoard = (grid) => {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.querySelector(`#cell-${x}-${y}`);

      if (!cell.classList.contains('set')) {
        const square = grid[x][y];
        if (square.class !== 'none') {
          cell.classList.add(square.class);
        }
      }
    }
  }
};

const setPiecePlaced = (coords) => {
  for (const coord of coords) {
    const [x, y] = coord;
    if (x >= 0 && y >= 0) {
      const cell = document.querySelector(`#cell-${x}-${y}`);
      cell.classList.add('set');
    }
  }
};

const resetDom = () => {
  const board = document.querySelector('#board');
  board.innerHTML = '';
  const rows = buildRows();
  board.append(...rows);

  const nextContainer = document.querySelector('#next');
  nextContainer.innerHTML = '';
};

const openModal = (content) => {
  const modal = document.querySelector('#myModal');
  const h2 = document.querySelector('#modal-h2');
  h2.textContent = content.h2;
  const p1 = document.querySelector('#modal-p1');
  p1.textContent = content.p1;
  const p2 = document.querySelector('#modal-p2');
  p2.textContent = content.p2;
  const btn = document.querySelector('#modal-submit');
  btn.textContent = content.btn;

  btn.addEventListener('click', () => {
    closeModal();
    content.func();
  });
  modal.style.display = 'flex';
};

const closeModal = () => {
  const modal = document.querySelector('#myModal');
  modal.style.display = 'none';
};

const openGameStartModal = () => {
  const content = {
    h2: 'Welcome To Tetris!',
    p1: 'Ready For Level One?',
    p2: 'Get 10 Lines To Move On!',
    btn: 'START',
    func: setUpGame
  };

  openModal(content);
};

const openLevelOverModal = (level, lines) => {
  const content = {
    h2: 'Level Complete!',
    p1: `Ready For Level ${level}?`,
    p2: `Get ${lines} Lines To Move On!`,
    btn: 'START',
    func: startNextLevel
  };

  openModal(content);
};

const openGameOverModal = () => {
  const content = {
    h2: 'Game Over!',
    p1: '',
    p2: 'Play Again?',
    btn: 'START',
    func: resetGame
  };

  openModal(content);
};

export {
  buildPiece,
  openGameOverModal,
  openGameStartModal,
  openLevelOverModal,
  resetDom,
  setPiecePlaced,
  setUpNextContainer,
  updateBoard,
  updateNextContainer,
  updateScoreContainer
};
