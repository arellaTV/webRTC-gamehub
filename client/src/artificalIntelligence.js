import Board from './board.js';
import { orientationLUT } from './LUT.js';

Board.prototype.opponentRandom = function() {
    this.switchPlayers();
    this.floatSprite(this.currentPlayer);
    let random = (Math.ceil(Math.random() * 7) * 64 - 32);
    console.log('dropping randomly!', random);
    var position = {};
    position.x = random;
    setTimeout(() => {
      this.dropPiece(position, this.currentSprite);
      this.switchPlayers();
      this.floatSprite(this.currentPlayer);
    },1000);
}

Board.prototype.opponentBlockFour = function(lastDrop) {
  var analysis = {
    horizontal : this.check(lastDrop, 'horizontal'),
    vertical : this.check(lastDrop, 'vertical'),
    right_diagonal : this.check(lastDrop, 'right_diagonal'),
    left_diagonal : this.check(lastDrop, 'left_diagonal')
  };

  for (var key in analysis) {
    if (analysis[key].total === 3) {
      console.log(`Block at ${key}!`);
      console.log(`lastDrop is at position ${lastDrop.id}`)
      console.log(analysis[key]);
      if (analysis[key].tail1) {
        this.switchPlayers();
        this.floatSprite(this.currentPlayer);
        var position = {};
        position.x = analysis[key].tail1.coordinates.x;
        console.log(position);
        setTimeout(() => {
          this.dropPiece(position, this.currentSprite);
          this.switchPlayers();
          this.floatSprite(this.currentPlayer);
        },1000);
        return true;
      }
      if (analysis[key].tail2) {
        this.switchPlayers();
        this.floatSprite(this.currentPlayer);
        console.log(`tail2 is ${analysis[key].tail2.id}`);
        var position = {};
        position.x = analysis[key].tail2.coordinates.x;
        console.log(position);
        setTimeout(() => {
          this.dropPiece(position, this.currentSprite);
          this.switchPlayers();
          this.floatSprite(this.currentPlayer);
        },1000);
        return true;
      }
    }
  }

  return false;
};
