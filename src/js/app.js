import {GameState} from './view/gameState.js';
import {MenuState} from './view/menuState.js';

let game = new Phaser.Game(1024,576, Phaser.CANVAS,'tictactoe');

game.state.add("gameState", new GameState());
game.state.add("menuState", new MenuState());
game.state.start("menuState", true, false);


