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

Board.prototype.addEdge = function(node1, node2, orientation) {
  if (node1 && node2) {
    var direction1 = orientationLUT[orientation][0];
    var direction2 = orientationLUT[orientation][1];
    this.nodes[node1.id][orientation][direction2] = node2;
    this.nodes[node2.id][orientation][direction1] = node1;
  };
};
