var Board = function(rows, columns) {
  this.nodes = {};
  this.currentPlayer = 'red';
  this.winner = null;
  if (rows && columns) { this.build(rows, columns) };
}

Board.prototype.addNode = function(node) {
  this.nodes[node.id] = node;
  var box = document.createElement('DIV');
  box.id = node.id;
  box.className = 'box';
}
