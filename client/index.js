import Board from './src/board';
var PIXI = require('pixi.js');

var board = new Board(6,7);

var renderer = new PIXI.WebGLRenderer(800,600);
document.body.appendChild(renderer.view);
