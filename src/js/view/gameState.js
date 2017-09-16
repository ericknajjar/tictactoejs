
import {VisualBoard} from "./visualBoard.js"
import {Point} from "../gameContext/point.js"
import {TicTacToeGame} from "../gameContext/ticTacToeGame.js"

export class GameState extends Phaser.State{ 
    constructor() {
        super();
    }

    init(){
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
    }

    preload(){

        this.game.load.image('background', 'assets/img/background2.jpg');
        this.loadAtlas('grid');
        this.loadAtlas('player');
    }

    create(){
        let background = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'background');
        background.anchor.x = 0.5;
        background.anchor.y = 0.5;
        background.scale.setTo(0.25,0.25);

        this._visualBoard = new VisualBoard(new Point(this.game.world.centerX,this.game.world.centerY),this.game);

        let game = new TicTacToeGame(this._visualBoard.ClickObservable);

        game.PlayObservable.subscribe((play)=>{

            let sprite = this._visualBoard.displayPlay(play);
            console.log(play.Target);
        });

    }

    loadAtlas(name){
        this.game.load.atlasJSONHash(name, 'assets/img/'+name+'.png', 'assets/img/'+name+'.json');
    }

}