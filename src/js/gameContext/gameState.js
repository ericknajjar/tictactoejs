import {Board} from "./board.js"
import {VictoryState} from "./victoryState.js"
import {Move} from "./move.js"
import {Player} from "./player.js"

export class GameState 
{
    get CurrentPlayer(){
        return this._currentPlayer;
    }

    get VictoryState(){ 
        
        return this._board.VictoryState;

    }

    static CreateAllMoves(board)
    {
        let moves = [];

        board.foreachCell ((player,point) => {
            if(player.equals(Player.None))
                moves.push(new Move(point));
        });

        return moves;
    }

    get movesCount(){
        return this._board.movesCount;
    }

    constructor(player,board = new Board(),possibleMoves = undefined){
        
        this._board = board;
        if(possibleMoves == undefined)
            this._possibleMoves =  GameState.CreateAllMoves (board);
        else
            this._possibleMoves = possibleMoves;

        this._currentPlayer = player;
        
    } 
        
        
    PickAMove(move)
    {
        let newMoves = this._possibleMoves.filter((e)=>{ return !e.equals(move)});

        let contais = newMoves.length < this._possibleMoves.length;

        if (!contais)
            throw "Can't play an impossible move: ";
        
        let newBoard = this._board.SetCellOwner (this._currentPlayer, move.Target);

        return new GameState (this._currentPlayer.Other, newBoard,newMoves);
    }

    get IsEndState(){
    
            return this._possibleMoves.length == 0 || (!this.VictoryState.Winner.equals (Player.None));
    } 

    getPlayer(point){
        
            return this._board.getPlayer(point);
    }

    get PossibleMoves(){
        return this._possibleMoves;
    }	
}
