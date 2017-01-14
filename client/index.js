import Board from './src/board';
import Validation from './src/validation';
import { renderer, stage } from './src/PIXI.js';
var board = new Board(6,7);

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(stage);
};
animate();
