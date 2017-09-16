
import {VisualBoard} from "./visualBoard.js"
import {Point} from "../gameContext/point.js"
import {TicTacToeGame} from "../gameContext/ticTacToeGame.js"
import {Signals} from "../utils/signals.js";

export class GameState extends Phaser.State{ 
    
    constructor() {
        super();
    }

    init(easy){
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this._easy = easy;
    }

    preload(){

        this.game.load.image('background', 'assets/img/background2.jpg');
        this.loadAtlas('grid');
        this.loadAtlas('player');
        this.loadAtlas('arrow');
    }

    create(){
        

        let background = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'background');
        background.anchor.x = 0.5;
        background.anchor.y = 0.5;
        background.scale.setTo(0.25,0.25);

        this.createBackButton(this.game.world.centerX-background.width/2,5);
      //  this.createRestartButton(this.game.world.centerX+background.width/3,this.game.world.heigth-10);
        this.createRestartButton(this.game.world.centerX,this.game.world.heigth-20);

        this._visualBoard = new VisualBoard(new Point(this.game.world.centerX,this.game.world.centerY),this.game);

        let game = new TicTacToeGame(this._visualBoard.ClickObservable,!this._easy);

        game.PlayObservable.subscribe((play)=>{
            let sprite = this._visualBoard.displayPlay(play);
        });

       

    }

    createBackButton(x,y){

        let back = this.game.add.sprite(x, y, 'arrow', 'arrow1.png');
        back.animations.add('loop');
        back.animations.play('loop', 15, true);
        back.inputEnabled = true;
        back.bringToTop();
        back.scale.setTo(0.25,0.25);

        Signals.signalToObservable(back.events.onInputDown,back,this).subscribe(()=>{

            this.game.state.start("menuState", true, false);
        }); 

    }

    createRestartButton(x,y){
        let style = { font: "50px Comic", fill: 0, align: "center" };
        let restart = this.game.add.text(x, y, "Restart", style);
        restart.inputEnabled = true;

        Signals.signalToObservable(restart.events.onInputDown,restart,this).subscribe(()=>{
            this.game.state.start("gameState", true, false,this._easy);
        });

        restart.bringToTop();
    }

    

    loadAtlas(name){
        this.game.load.atlasJSONHash(name, 'assets/img/'+name+'.png', 'assets/img/'+name+'.json');
    }

}