var PIXI = require('pixi.js');

var renderer = new PIXI.WebGLRenderer(800,600);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

var board_tile_texture = PIXI.Texture.fromImage('assets/images/board_tile.png');
var player_one_texture = PIXI.Texture.fromImage('assets/images/player_one.png');
var player_two_texture = PIXI.Texture.fromImage('assets/images/player_two.png');

var textures = {
  board_tile_texture,
  player_one_texture,
  player_two_texture
};

export { stage, textures, renderer };
// var mario = null;
// var acceleration = 1;

// PIXI.loader.add('mario', './assets/images/mario.png').load(function (loader, resources) {
//   mario = new PIXI.Sprite(resources.mario.texture);
//   mario.y = 10;
//   renderer.plugins.interaction.on('mousemove',(data) => {
//     var mouse = data.data.global;
//     mario.position.x = mouse.x;
//   });
//
//   renderer.plugins.interaction.on('mousedown', (data) => {
//     fall(mario.x);
//   });
//
//   mario.scale.x = .1;
//   mario.scale.y = .1;
//   stage.addChild(mario);
//   animate();
// });
//
// var build = function() {
//
// };
//
// var fall = function(x) {
//   acceleration *= 1.1;
//   if (mario.y >= 400) {
//     mario.y = 400;
//     return;
//   } else {
//     mario.y += acceleration;
//   };
//   requestAnimationFrame(fall);
// }
//
// var animate = function() {
//   requestAnimationFrame(animate);
//   renderer.render(stage);
// }
