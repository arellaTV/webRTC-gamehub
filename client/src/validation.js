import Board from './board.js';
import { orientationLUT } from './LUT.js';

Board.prototype.check = function(startingNode, orientation) {
  var direction1 = orientationLUT[orientation][0];
  var direction2 = orientationLUT[orientation][1];
  var total = 1;
  var currentNode = startingNode;
  var path = {};
  path[currentNode.id] = currentNode.id;
  var tail1, tail2;

  while (currentNode[orientation][direction1] !== null) {
    var nextNode = currentNode[orientation][direction1];
    if (nextNode['contents'] === this.currentPlayer) {
      total++;
    } else {
      tail1 = nextNode;
      break;
    }
    path[nextNode.id] = nextNode.id;
    currentNode = nextNode;
  }

  currentNode = startingNode;

  while (currentNode[orientation][direction2] !== null) {
    var nextNode = currentNode[orientation][direction2];
    if (nextNode['contents'] === this.currentPlayer) {
      total++;
    } else {
      tail2 = nextNode;
      break;
    }
    path[nextNode.id] = nextNode.id;
    currentNode = nextNode;
  }

  if (total >= 4) {
    this.declareWinner(this.currentPlayer);
    this.highlightWinner(path);
  }
  return {
    total,
    tail1,
    tail2
  };
}
