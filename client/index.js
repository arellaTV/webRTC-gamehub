import Board from './src/board';
var PIXI = require('pixi.js');

var board = new Board(6,7);

var renderer = new PIXI.WebGLRenderer(800,600);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var mario = null;

PIXI.loader.add('bunny', './assets/images/mario.png').load(function (loader, resources) {
  mario = new PIXI.Sprite(resources.bunny.texture);
  mario.position.x = 400;
  mario.position.y = 300;
  mario.scale.x = .1;
  mario.scale.y = .1;
  stage.addChild(mario);
  animate();
});

var animate = function() {
  requestAnimationFrame(animate);
  mario.rotation += 0.01;
  renderer.render(stage);
}
