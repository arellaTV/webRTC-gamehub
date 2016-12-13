import { orientationLUT, Node } from './LUT';
import { stage, textures } from './PIXI';

var Board = function(rows, columns) {
  this.nodes = {};
  this.currentPlayer = 'one';
  this.winner = null;
  if (rows && columns) { this.build(rows, columns) };
}

Board.prototype.show = function(entity) {
  if (entity) {
    return this.nodes[entity]['contents'];
  } else {
    return this.nodes;
  }
};

Board.prototype.switchPlayers = function() {
  if (this.currentPlayer === 'one') {
    this.currentPlayer = 'two';
  } else {
    this.currentPlayer = 'one';
  }
};

Board.prototype.addNode = function(node) {
  this.nodes[node.id] = node;
  var board_tile = new PIXI.Sprite(textures.board_tile_texture);
  board_tile.anchor.x = 0.5;
  board_tile.anchor.y = 0.5;
  board_tile.scale.x = 0.5;
  board_tile.scale.y = 0.5;
  board_tile.position.x = node.coordinates.x;
  board_tile.position.y = node.coordinates.y;
  stage.addChild(board_tile);
}

Board.prototype.addEdge = function(node1, node2, orientation) {
  if (node1 && node2) {
    var direction1 = orientationLUT[orientation][0];
    var direction2 = orientationLUT[orientation][1];
    this.nodes[node1.id][orientation][direction2] = node2;
    this.nodes[node2.id][orientation][direction1] = node1;
  };
};

Board.prototype.build = function(rows, columns) {
  for (var i = 1; i <= rows; i++) {
    for (var j = 1; j<= columns; j++) {
      this.addNode(Node(i,j));
    }
  }


  for (var k = 1; k <= rows; k++) {
    for (var l = 1; l <= columns; l++) {
      this.addEdge(this.nodes[`${k}${l}`], this.nodes[`${k+1}${l+1}`], 'left_diagonal');
      this.addEdge(this.nodes[`${k}${l}`], this.nodes[`${k}${l+1}`], 'horizontal');
      this.addEdge(this.nodes[`${k}${l}`], this.nodes[`${k+1}${l}`], 'vertical');
      this.addEdge(this.nodes[`${k}${l}`], this.nodes[`${k+1}${l-1}`], 'right_diagonal');
    }
  }
};

Board.prototype.destroy = function() {
  this.nodes = {};
};

Board.prototype.dropPiece = function(column) {
  var currentPlayer = this.currentPlayer;
  var startingNode = this.nodes[`1${column}`];
  if (startingNode.contents !== 'empty') { return };

  var drop = function(node) {
    if (node.vertical.down === null || node.vertical.down.contents !== 'empty') {
      node.contents = currentPlayer;
      return;
    }
    drop(node.vertical.down);
  };

  drop(startingNode);
};

export default Board;
