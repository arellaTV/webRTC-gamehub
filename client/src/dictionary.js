var Node = function(row, column) {
  return {
    row: row,
    column: column,
    id: `${row}${column}`,
    contents: 'empty',
    up: null,
    down: null,
    left: null,
    right: null,
    upleft: null,
    upright: null,
    downleft: null,
    downright: null
  };
};
