var PIXI = require('pixi.js');

var renderer = new PIXI.WebGLRenderer(448,796, { backgroundColor: 0xFFFFFF });
var rendererDOM = renderer.view;
rendererDOM.id = 'renderer';
document.body.appendChild(rendererDOM);
var stage = new PIXI.Container();

var board_tile_texture = PIXI.Texture.fromImage('assets/images/board_tile.png');
var player_one_texture = PIXI.Texture.fromImage('assets/images/player_one.png');
var player_two_texture = PIXI.Texture.fromImage('assets/images/player_two.png');
var winner = PIXI.Texture.fromImage('assets/images/winner.png');

var textures = {
  board_tile_texture,
  player_one_texture,
  player_two_texture,
  winner
};

export { stage, textures, renderer };
