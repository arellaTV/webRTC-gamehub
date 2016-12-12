var orientationLUT = {
  horizontal: ['left','right'],
  vertical: ['up', 'down'],
  right_diagonal: ['upright', 'downleft'],
  left_diagonal: ['upleft', 'downright']
};

var Node = function(row, column) {
  return {
    row: row,
    column: column,
    id: `${row}${column}`,
    contents: 'empty',
    vertical: {
      up: null,
      down: null,
    },
    horizontal: {
      left: null,
      right: null,
    },
    right_diagonal: {
      upright: null,
      downleft: null,
    },
    left_diagonal: {
      upleft: null,
      downright: null
    },
  };
};
