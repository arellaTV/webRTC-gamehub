import { orientationLUT, Node } from './LUT';
import { stage, textures, renderer } from './PIXI';

var Board = function(rows, columns) {
  this.nodes = {};
  this.currentSprite = {};
  this.currentPlayer = 'one';
  this.winner = null;
  var that = this;
  if (rows && columns) { this.build(rows, columns) };

  this.floatSprite(this.currentPlayer);
  renderer.plugins.interaction.on('mousemove',(data) => {
    var mouse = data.data.global;
    this.updatePosition(mouse, that.currentSprite);
  });

  renderer.plugins.interaction.on('mousedown',(data) => {
    var mouse = data.data.global;
    this.dropPiece(mouse, that.currentSprite);
  });
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
  board_tile.zOrder = 1;
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

Board.prototype.fall = function(sprite, coordinates) {
  sprite.position.x = coordinates.x
  if (sprite.position.y < coordinates.y) {
    sprite.position.y += 8;
  } else {
    sprite.position.y += 0;
    return;
  }
  requestAnimationFrame(this.fall.bind(this, sprite, coordinates));
}

Board.prototype.dropPiece = function(mouse, sprite) {
  var column = Math.ceil(mouse.x / 64);
  var currentPlayer = this.currentPlayer;
  var startingNode = this.nodes[`1${column}`];
  if (startingNode.contents !== 'empty') { return };

  const drop = (node) => {
    if (node.vertical.down === null || node.vertical.down.contents !== 'empty') {
      var endCoordinates = node.coordinates;
      node.contents = currentPlayer;
      this.fall(sprite, endCoordinates);
      this.check(node, 'horizontal');
      this.check(node, 'vertical');
      this.check(node, 'right_diagonal');
      return;
    }
    drop(node.vertical.down);
  };

  drop(startingNode);
  this.switchPlayers();
  this.floatSprite(this.currentPlayer);
};

Board.prototype.floatSprite = function(player_string) {
  var player = new PIXI.Sprite(textures[`player_${player_string}_texture`]);
  player.anchor.x = 0.5;
  player.anchor.y = 0.5;
  player.scale.x = 0.5;
  player.scale.y = 0.5;
  player.position.x = -100;
  player.position.y = 240;
  this.currentSprite = player;
  stage.addChildAt(player, 0);
}

Board.prototype.updatePosition = function(mouse, sprite) {
  sprite.position.x = mouse.x;
}

Board.prototype.declareWinner = function(winner) {
  console.log(winner, 'wins!');
}

export default Board;
