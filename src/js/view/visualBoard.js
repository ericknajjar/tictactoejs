import {Point} from "../gameContext/point.js";
import {Player} from "../gameContext/player.js";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import {Signals} from "../utils/signals.js";

export class VisualBoard
{
    constructor(origin,game){
       this._origin = origin;
       this.game = game;

       let background = this._createBackground(origin);

       let result = this._createClickSprites(background.width,background.height);

       this._spriteGrid = result[0];
       this.ClickObservable =  result[1];
    }

    _createBackground(){
        let grid = this.game.add.sprite(this._origin.X, this._origin.Y, 'grid', 'frame1.png');
        grid.anchor.x = 0.5;
        grid.anchor.y = 0.5;
        grid.animations.add('loop');
        grid.animations.play('loop', 15, true);
        return grid;
    }

    _createClickSprites(width,height){

        let spriteGrid =[];
        let allObservables = [];
        let clickables = this.game.add.group();
        clickables.x = this._origin.X - width/2;
        clickables.y = this._origin.Y- height/2;

        for(let i=0;i<3;++i)
        {
            let list = [];

            for(let j=0;j<3;++j)
            {
               let logicalPosition = new Point(i,j);
               let clickable = this._createClickable(logicalPosition,clickables);
               list.push(clickable[0]);
               allObservables.push(clickable[1]);
            }
            spriteGrid.push(list);
        }
        clickables.align(3, -1, width/3, height/3);
     
        return [spriteGrid,Observable.merge(...allObservables)];
    }



    displayPlay(play){

        this._markPlayer(play.Target,play.Player);
        if(play.EndedTheGame)
        {
            this._markVictory(play.VictoryState.Pattern);
        }
       
    }

    _markPlayer(logicalPosition,player){

        let anim = Player.X.equals(player)?"loopX":"loopO";
        let sprite = this._spriteGrid[logicalPosition.X][logicalPosition.Y];
        sprite.alpha = 1;
        sprite.animations.play(anim);

        
    }

    _markVictory(pattern){

        pattern.forEach((point)=>{

            this._spriteGrid[point.X][point.Y].tint = 0xff0000;
        });

    }


    _createClickable(logicalPosition,group){
        let sprite = group.create(0,0,'player','x1.png');
        sprite.scale.setTo(0.25,0.25);

        sprite.tint = 0;

        sprite.animations.add('loopX', Phaser.Animation.generateFrameNames('x', 1, 3, '.png', 0), 15, true);
        sprite.animations.add('loopO', Phaser.Animation.generateFrameNames('o', 1, 3, '.png', 0), 15, true);

        sprite.inputEnabled = true;
        sprite.alpha = 0;

        let observable = Signals.signalToObservable(sprite.events.onInputDown,logicalPosition,this);

        return [sprite,observable];
    }

}