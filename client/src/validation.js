import Board from './board.js';
import { orientationLUT } from './LUT.js';

Board.prototype.check = function(startingSlot, orientation) {
  var direction1 = orientationLUT[orientation][0];
  var direction2 = orientationLUT[orientation][1];
  var total = 0;
  var currentSlot = startingSlot;

  while (currentSlot[orientation][direction1] !== null && currentSlot[orientation][direction1]['contents'] === this.currentPlayer) {
    total++;
    currentSlot = currentSlot[orientation][direction1];
  }

  currentSlot = startingSlot;

  while (currentSlot[orientation][direction2] !== null && currentSlot[orientation][direction2]['contents'] === this.currentPlayer) {
    total++;
    currentSlot = currentSlot[orientation][direction2];
  }

  if (total + 1 >= 4) {
    this.declareWinner(this.currentPlayer);
  }
  return total + 1;
}
