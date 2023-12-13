import { coordsAreValid, singleCoordIsValid } from './grid-helpers';
import { iPatterns, jPatterns, lPatterns, oPatterns, sPatterns, tPatterns, zPatterns } from './shape-helpers';

const pieces = [
  { name: 'O', patterns: oPatterns, height: 2, width: 2 },
  { name: 'S', patterns: sPatterns, height: 2, width: 3 },
  { name: 'Z', patterns: zPatterns, height: 2, width: 3 },
  { name: 'L', patterns: lPatterns, height: 3, width: 2 },
  { name: 'J', patterns: jPatterns, height: 3, width: 2 },
  { name: 'I', patterns: iPatterns, height: 4, width: 1 },
  { name: 'T', patterns: tPatterns, height: 2, width: 3 }
];

class Piece {
  constructor(name, patterns, height, width, ID) {
    this.name = name;
    this.patterns = patterns;
    this.currentShape = 0;
    this.shape = this.patterns[this.currentShape];
    this.height = height;
    this.width = width;
    this.squareClass = `${name}-square`;
    this.pieceClass = `${name}-piece`;
    this.coords = [];
    this.id = ID;
  }
}

const getRandomPiece = (ID) => {
  const randomIndex = Math.floor(Math.random() * pieces.length);
  const randomPiece = pieces[randomIndex];
  const { name, patterns, height, width } = randomPiece;
  return new Piece(name, patterns, height, width, ID);
};

const getNextPieces = () => {
  const pieces = [];
  while (pieces.length < 2) {
    const piece = getRandomPiece();
    pieces.push(piece);
  }
  return pieces;
};

const rotatePiece = (piece, grid) => {
  console.log('rotatePiece');
  const { coords } = piece;
  if (coords.some((coord) => coord[1] <= 0 || coord[1] >= 19)) {
    return;
  }
  
  const { length } = coords;
  const differences = getShapeDifference(piece);
  const newCoords = [];

  for (let i = 0; i < length; i++) {
    const [x, y] = coords[i];
    console.log('coords[i]:', coords[i]);
    const [diffX, diffY] = [differences[i].x, differences[i].y];
    const resultCoords = [x - diffX, y - diffY];
    console.log('resultCoords:', resultCoords);
    newCoords.push(resultCoords);
  }
  if (coordsAreValid(newCoords, grid)) {
    return newCoords;
  }
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

export { getNextPieces, getRandomPiece, rotatePiece };
