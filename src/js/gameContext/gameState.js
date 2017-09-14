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

    constructor(player,board = new Board()){
        
        this._board = board;
        this._possibleMoves =  GameState.CreateAllMoves (board);
        this._currentPlayer = player;
        
    }
        
        
    PickAMove(move)
    {
        let contais = this._possibleMoves.find((e)=>{return e.equals(move)}) != undefined;

        if (!contais)
            throw "Can't play an impossible move: ";
        
        let newBoard = this._board.SetCellOwner (this._currentPlayer, move.Target);

        return new GameState (this._currentPlayer.Other, newBoard);
    }

    forEachCell(visitor)
    {
        this._board.ForeachCell (visitor);
    }

    get IsEndState(){
    
            return !this.VictoryState.Winner.equals (Player.None) || this._possibleMoves.length == 0;
    } 

    getPlayer(point){
        
            return this._board.getPlayer(point);
    }

    get PossibleMoves(){
        return this._possibleMoves;
    }	
}
