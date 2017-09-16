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
        grid.scale.setTo(2,2);
        grid.animations.add('loop');
        grid.animations.play('loop', 15, true);
        return grid;
    }

    _createClickSprites(width,height){

        let spriteGrid =[];
        let allObservables = [];
        for(let i=0;i<3;++i)
        {
            let list = [];

            for(let j=0;j<3;++j)
            {
               let logicalPosition = new Point(i,j);
               let screenPositin = this._calculateScreenPosition(logicalPosition,width,height);
               let clickable = this._createClickable(logicalPosition,screenPositin);
               list.push(clickable[0]);
               allObservables.push(clickable[1]);
            }
            spriteGrid.push(list);
        }

        return [spriteGrid,Observable.merge(...allObservables)];
    }



    displayPlay(play){

        this._markPlayer(play.Target,play.Player);
        if(play)
       
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

    _calculateScreenPosition(logicalPosition,width,height){

        let xOffset = this._origin.X/2;
        let yOffset = this._origin.Y/2;

        //alinhando melhor com a imagem de fundo
        xOffset += width*0.05;
        yOffset -= height*0.05;

        let x = logicalPosition.X*(width/3) + xOffset;
        let y = logicalPosition.Y*(height/3) + yOffset;

        
        return new Point(x,y);
    }

    _createClickable(logicalPosition, screenPosition){
        let sprite = this.game.add.sprite(screenPosition.X,screenPosition.Y,'player','x1.png');
        sprite.scale.setTo(0.5,0.5);
        sprite.tint = 0;

        sprite.animations.add('loopX', Phaser.Animation.generateFrameNames('x', 1, 3, '.png', 0), 15, true);
        sprite.animations.add('loopO', Phaser.Animation.generateFrameNames('o', 1, 3, '.png', 0), 15, true);

        sprite.inputEnabled = true;
        sprite.alpha = 0;

        let observable = Signals.signalToObservable(sprite.events.onInputDown,logicalPosition,this);

        return [sprite,observable];
    }




}