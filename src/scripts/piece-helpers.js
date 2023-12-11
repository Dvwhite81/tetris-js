const PIECES = [
  {
    name: 'O',
    shape: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ],
    height: 2,
    width: 2,
    squareClass: 'O-square',
    pieceClass: 'O-piece',
    coords: []
  },
  {
    name: 'S',
    shape: [
      { x: 0, y: 2 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 }
    ],
    height: 2,
    width: 3,
    squareClass: 'S-square',
    pieceClass: 'S-piece',
    coords: []
  },
  {
    name: 'Z',
    shape: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ],
    height: 2,
    width: 3,
    squareClass: 'Z-square',
    pieceClass: 'Z-piece',
    coords: []
  },
  {
    name: 'L',
    shape: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 }
    ],
    height: 3,
    width: 2,
    squareClass: 'L-square',
    pieceClass: 'L-piece',
    coords: []
  },
  {
    name: 'J',
    shape: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 0 }
    ],
    height: 3,
    width: 2,
    squareClass: 'J-square',
    pieceClass: 'J-piece',
    coords: []
  },
  {
    name: 'I',
    shape: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ],
    height: 4,
    width: 1,
    squareClass: 'I-square',
    pieceClass: 'I-piece',
    coords: []
  },
  {
    name: 'T',
    shape: [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ],
    height: 2,
    width: 3,
    squareClass: 'T-square',
    pieceClass: 'T-piece',
    coords: []
  }
];

const getRandomPiece = () => {
  const pieceIndex = Math.floor(Math.random() * PIECES.length);
  return PIECES[pieceIndex];
};

const getNextPieces = () => {
  const pieces = [];
  while (pieces.length < 2) {
    const piece = getRandomPiece();
    pieces.push(piece);
  }
  return pieces;
};

const rotatePiece = (piece) => {
  const { shape } = piece;
  const coords = [];
  for (const coord of shape) {
    [coord.x, coord.y] = [coord.y, coord.x];
    coords.push(coord);
  }
  piece.shape = coords;
};

export { getNextPieces, getRandomPiece, PIECES, rotatePiece };
