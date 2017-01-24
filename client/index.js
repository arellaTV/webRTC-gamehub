import Board from './src/board';
import Validation from './src/validation';
import ArtificialIntelligence from './src/artificalIntelligence';
import Peer from './src/peer';
import { renderer, stage } from './src/PIXI.js';
var board = new Board(6,7);

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(stage);
};
animate();
