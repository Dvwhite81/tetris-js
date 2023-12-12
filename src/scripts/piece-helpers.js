import { iPatterns, jPatterns, lPatterns, oPatterns, sPatterns, tPatterns, zPatterns } from './shape-helpers';

// To rotate through patterns:
// piece.currentShape = (piece.currentShape + 1) % piece.patterns.length;
// piece.pattern = piece.patterns[piece.currentShape]
// Might need to change "this.patterns[0]" to (o, s, z...)Patterns[0]
const PIECES = [
  {
    name: 'O',
    patterns: oPatterns,
    shape: oPatterns[0],
    currentShape: 0,
    height: 2,
    width: 2,
    squareClass: 'O-square',
    pieceClass: 'O-piece',
    coords: []
  },
  {
    name: 'S',
    patterns: sPatterns,
    shape: sPatterns[0],
    currentShape: 0,
    height: 2,
    width: 3,
    squareClass: 'S-square',
    pieceClass: 'S-piece',
    coords: []
  },
  {
    name: 'Z',
    patterns: zPatterns,
    shape: zPatterns[0],
    currentShape: 0,
    height: 2,
    width: 3,
    squareClass: 'Z-square',
    pieceClass: 'Z-piece',
    coords: []
  },
  {
    name: 'L',
    patterns: lPatterns,
    shape: lPatterns[0],
    currentShape: 0,
    height: 3,
    width: 2,
    squareClass: 'L-square',
    pieceClass: 'L-piece',
    coords: []
  },
  {
    name: 'J',
    patterns: jPatterns,
    shape: jPatterns[0],
    currentShape: 0,
    height: 3,
    width: 2,
    squareClass: 'J-square',
    pieceClass: 'J-piece',
    coords: []
  },
  {
    name: 'I',
    patterns: iPatterns,
    shape: iPatterns[0],
    currentShape: 0,
    height: 4,
    width: 1,
    squareClass: 'I-square',
    pieceClass: 'I-piece',
    coords: []
  },
  {
    name: 'T',
    patterns: tPatterns,
    shape: tPatterns[0],
    currentShape: 0,
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
  const differences = getShapeDifference(piece);

  const { coords } = piece;
  const { length } = coords;
  const newCoords = [];

  for (let i = 0; i < length; i++) {
    const [x, y] = coords[i];
    console.log('coords[i]:', coords[i]);
    const [diffX, diffY] = [differences[i].x, differences[i].y];
    newCoords.push([x - diffX, y - diffY]);
  }
  return newCoords;
};

const getShapeDifference = (piece) => {
  const oldShape = piece.shape;
  piece.currentShape = (piece.currentShape + 1) % piece.patterns.length;
  piece.shape = piece.patterns[piece.currentShape];
  const newShape = piece.shape;
  const { length } = oldShape;
  const differences = [];
  for (let i = 0; i < length; i++) {
    const diffX = oldShape[i].x - newShape[i].x;
    const diffY = oldShape[i].y - newShape[i].y;
    differences.push({ x: diffX, y: diffY });
  }
  return differences;
};

export { getNextPieces, getRandomPiece, PIECES, rotatePiece };
