import { Game } from './Game.js';

// Get the canvas and context and make global
window.canvas = document.getElementById('gameCanvas');
window.context = canvas.getContext('2d');

// Create and start game
let game = new Game();
game.createEventListeners();
game.startGame();