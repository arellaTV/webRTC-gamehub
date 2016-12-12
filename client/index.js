import Board from './src/board';
var PIXI = require('pixi.js');

var board = new Board(6,7);

var renderer = new PIXI.WebGLRenderer(800,600);
console.log(renderer.plugins.interaction);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var mario = null;

PIXI.loader.add('mario', './assets/images/mario.png').load(function (loader, resources) {
  mario = new PIXI.Sprite(resources.mario.texture);

  mario.position.y = 10;
  renderer.plugins.interaction.on('mousemove',(data) => {
    var mouse = data.data.global;
    mario.position.x = mouse.x;
  });

  renderer.plugins.interaction.on('mousedown', (data) => {
    fall();
    console.log('click');
  });

  mario.scale.x = .1;
  mario.scale.y = .1;
  stage.addChild(mario);
  animate();
});

var fall = function() {
  mario.position.y += 10;
  requestAnimationFrame(fall);
}

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
