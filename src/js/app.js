import {GameState} from './view/gameState.js';

let game = new Phaser.Game("80%","80%", Phaser.CANVAS,'tictactoe');

game.state.add("gameState", new GameState());
game.state.start("gameState", true, false);


