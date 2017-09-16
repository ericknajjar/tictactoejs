import {Board} from "./board.js"
import {Move} from "./move.js"
import {Player} from "./player.js"
import {VictoryState} from "./victoryState.js"

export class GameState 
{
	get CurrentPlayer(){ 
		return this._currentPlayer;
	}

	get VictoryState(){ 
		return this._board.VictoryState;
	}

	get PossibleMoves() {
		return this._possibleMoves;
	}
	
	constructor(player,board = new Board()) {
		this._board = board;
		this._possibleMoves = GameState.CreateAllMoves (this._board);
		this._currentPlayer = player;
	}
		
	static CreateAllMoves(board){

		var moves = [];

		board.foreachCell ((owner,point) => {
			if(owner.equals(Player.None))
				moves.push (new Move(point));
		});

		return moves;
	}
		
	PickAMove(move)
	{
		let contains = this._possibleMoves.find ((e)=> {return e.equals(move.Target);}) != undefined;

		if (!contains)
			throw "Can't play an impossible move: "+move;
		
		var newBoard = this._board.SetCellOwner (this._currentPlayer, move.Target);

		return new GameState (this._currentPlayer.Other, newBoard);
	}

	get IsEndState(){
	
		return !this.VictoryState.Winner.equals (Player.None) || this._possibleMoves.Count == 0;
	} 

	getPlayer(point){
		return this._board.getPlayer(point);
	}
		
}