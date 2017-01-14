import Board from './board.js';
import { orientationLUT } from './LUT.js';

Board.prototype.check = function(startingNode, orientation) {
  var direction1 = orientationLUT[orientation][0];
  var direction2 = orientationLUT[orientation][1];
  var total = 0;
  var currentNode = startingNode;
  var path = {};
  path[currentNode.id] = currentNode.id;

  while (currentNode[orientation][direction1] !== null && currentNode[orientation][direction1]['contents'] === this.currentPlayer) {
    total++;
    var nextNode = currentNode[orientation][direction1];
    path[nextNode.id] = nextNode.id;
    currentNode = nextNode;
  }

  currentNode = startingNode;

  while (currentNode[orientation][direction2] !== null && currentNode[orientation][direction2]['contents'] === this.currentPlayer) {
    total++;
    var nextNode = currentNode[orientation][direction2];
    path[nextNode.id] = nextNode.id;
    currentNode = nextNode;
  }

  if (total + 1 >= 4) {
    this.declareWinner(this.currentPlayer);
    this.highlightWinner(path);
  }
  return total + 1;
}
