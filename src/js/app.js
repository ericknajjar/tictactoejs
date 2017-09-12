import * as Phaser from 'phaser/build/custom/phaser-split';
window.Phaser = Phaser


import * as test from "./test.js";
class State{
    constructor() {
    }

    preload(){

    }

    create(){
    
    }

    
}

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'tictactoe', new State());
