import * as Phaser from 'phaser/build/custom/phaser-split';
window.Phaser = Phaser


class State{
    constructor() {
    }

    preload(){

    }

    create(){
    
    }

    
}

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'tictactoe', new State());
