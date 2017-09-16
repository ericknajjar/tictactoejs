import { Observable } from 'rxjs/Observable';
import {GameState} from "../gameContext/gameState.js";
import {Player} from "../gameContext/player.js";

class Play
{
    constructor(player,point,victoryState,endedTheGame){
        this.Player = player;
        this.Target = point;
        this.VictoryState = victoryState;
        this.EndedTheGame = endedTheGame;
    }
}

export class TicTacToeGame{

    constructor(clickObservable,perfectAi=true){

        this._gameState = new GameState(Player.X);
        this.PlayObservable = this._buildPlayObservable(clickObservable);
    }

    _buildPlayObservable(clickObservable) {

        return Observable.create((observer)=>{
            clickObservable.subscribe((point)=>{

                    if(!this._gameState.IsEndState)
                    {
                        this._makeAMove(observer,point);
                    }
            });

        });

    }

    _makeAMove(observer,point){
        
        let chosen = this._gameState.PossibleMoves.find((move)=>{
            return move.Target.equals(point);
        });

        if(chosen!= undefined)
        {
           
            this._play(chosen,observer);

            if(!this._gameState.IsEndState)
              this._aiPlay(observer);
        }
    }

    _play(move, observer){
        let player = this._gameState.CurrentPlayer;
        this._gameState = this._gameState.PickAMove(move);
        let play = new Play(player,move.Target,this._gameState.VictoryState,this._gameState.IsEndState);
        observer.next(play);
    }

    _aiPlay(observer){

       let possibleMoves = this._gameState.PossibleMoves;

       
       let move = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];

       this._play(move,observer);
    }


}