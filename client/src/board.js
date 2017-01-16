import { orientationLUT, Node } from './LUT';
import { stage, textures, renderer } from './PIXI';
var dropPieceSoundEffect = new Audio('assets/sounds/dropPiece.wav');
var winnerSoundEffect = new Audio('assets/sounds/winner.wav');
dropPieceSoundEffect.volume = 0.5;
winnerSoundEffect.volume = 0.1;

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

Board.prototype.fall = function(sprite, coordinates) {
  sprite.position.x = coordinates.x
  if (sprite.position.y < coordinates.y - 32) {
    sprite.position.y *= 1.1;
  } else {
    sprite.position.y = coordinates.y;
    dropPieceSoundEffect.play();
    return;
  }
  requestAnimationFrame(this.fall.bind(this, sprite, coordinates));
}

Board.prototype.dropPiece = function(mouse, sprite) {
  var column = Math.ceil(mouse.x / 64);
  console.log('column:',column);
  var currentPlayer = this.currentPlayer;
  var startingNode = this.nodes[`1${column}`];
  if (startingNode.contents !== 'empty') { return };

  const drop = (node) => {
    if (node.vertical.down === null || node.vertical.down.contents !== 'empty') {
      var endCoordinates = node.coordinates;
      node.contents = currentPlayer;
      this.fall(sprite, endCoordinates);
      sprite.id = `${node.row}${node.column}`
      this.check(node, 'horizontal');
      this.check(node, 'vertical');
      this.check(node, 'right_diagonal');
      this.check(node, 'left_diagonal');
      if (this.currentPlayer === 'one') {
        if (this.opponentBlockFour(node) === false) {
          this.opponentRandom();
        }
      }
      return;
    }
    drop.call(this, node.vertical.down);
  };

  drop(startingNode);
};

Board.prototype.floatSprite = function(player_string) {
  var player = new PIXI.Sprite(textures[`player_${player_string}_texture`]);
  player.anchor.x = 0.5;
  player.anchor.y = 0.5;
  player.position.x = -100;
  player.position.y = 48;
  this.currentSprite = player;
  stage.addChildAt(player, 0);
}

Board.prototype.updatePosition = function(mouse, sprite) {
  sprite.position.x = mouse.x;
}

Board.prototype.declareWinner = function(winner) {
  console.log(winner, 'wins!');
}

Board.prototype.highlightWinner = function(path) {
  stage.children.map(sprite => {
    if (path[sprite.id]) {
      sprite.texture = textures['winner'];
    }
  });
  winnerSoundEffect.play();
}

export default Board;
