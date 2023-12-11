const domSetup = () => {
  const inner = document.querySelector('#board-inner');
  const board = buildBoard();
  inner.append(board);
};

const buildBoard = () => {
  const board = buildElement('div', {
    id: 'board',
    className: 'black'
  });

  const rows = buildRows();
  board.append(...rows);
  return board;
};

export const buildRows = () => {
  const rows = [];

  for (let x = 0; x < 20; x++) {
    const row = buildRow(x);
    rows.push(row);
  }
  return rows;
};

const buildRow = (x) => {
  const row = buildElement('div', {
    id: `row-${x}`,
    className: 'row'
  });

  const cells = buildCells(x);
  row.append(...cells);
  return row;
};

const buildCells = (x) => {
  const cells = [];
  for (let y = 0; y < 10; y++) {
    const cell = buildCell(x, y);
    cells.push(cell);
  }
  return cells;
};

const buildCell = (x, y) => {
  const coords = [x, y];
  const cell = buildElement('div', {
    id: `cell-${x}-${y}`,
    className: 'cell'
  });
  cell.setAttribute('coords', coords);
  return cell;
};

const buildElement = (type, args) => {
  const element = document.createElement(type);

  for (const key in args) {
    element[key] = args[key];
  }
  return element;
};

export default domSetup;
