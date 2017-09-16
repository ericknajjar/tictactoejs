import {GameState} from './view/gameState.js';

let game = new Phaser.Game(1024,576, Phaser.CANVAS,'tictactoe');

game.state.add("gameState", new GameState());
game.state.start("gameState", true, false);


