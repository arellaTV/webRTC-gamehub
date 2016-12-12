var Board = function(rows, columns) {
  this.slots = {};
  this.currentPlayer = 'red';
  this.winner = null;
  if (rows && columns) { this.build(rows, columns) };
}

Board.prototype.addNode = function(node) {
  this.nodes[node.id] = node;
}
