import {GameState} from "../gameContext/gameState.js"
import {Move} from "../gameContext/move.js"
import {CheckEquality} from "../equality.js"
import {Player} from "../gameContext/player.js"
import {Point} from "../gameContext/point.js"
import {TicTacToeAi} from "../gameContext/ticTacToeAi.js"

class AiCase
{
    get State() {
        return this._state;
    }

    get  NextMoves() {
      return this._nextMoves;
    }

    constructor (moves,nextMoves, player)
    {
        this._state = new GameState(player);
        this._nextMoves = [];

        moves.forEach((point)=>{
            this._state = this._state.PickAMove(new Move(point));
        });

        nextMoves.forEach((point)=>{
            this._nextMoves.push(new Move(point));
        });
    }
}

let ai = new TicTacToeAi ();

function TestAiCase(aiCase)
{
    let move = ai.NextMove (aiCase.State);
    let str = "[";
    aiCase.NextMoves.forEach((possibleMove)=>{
        str+=possibleMove;
        str+=",";
    });
 
    str+="]";

   // let m = new Move(new Point(0,0));

   // console.log("Move = "+move+" nextMoves: "+aiCase.NextMoves);
    let contains = aiCase.NextMoves.find((e)=> {return e.equals(move);}) != undefined;

    expect(contains).toEqual(true);
}


let starterAlmostWins = new AiCase([new Point(0,0),new Point(0,2),new Point(1,0),new Point(1,2)],
[new Point(2,0)], Player.X);

let playOnTheCorners = new AiCase([new Point(1,1)],
[new Point(0,0),new Point(2,0),new Point(0,2),new Point(2,2)], Player.X);

let openingMove = new AiCase([],
[new Point(1,1),new Point(0,0),new Point(2,0),new Point(0,2),new Point(2,2)], Player.X);

describe("Ai", function() {
    
    beforeEach(function() {
        jasmine.addCustomEqualityTester(CheckEquality);
    });

    it("asserting win premiss", function() {
        
        let winningState = starterAlmostWins.State.PickAMove (starterAlmostWins.NextMoves [0]);
        expect(winningState.VictoryState.Winner).toEqual(Player.X);
        
    });

    it("should choose the right victory move", function() {
        
        TestAiCase (starterAlmostWins);
        
    });

    it("should play on corners", function() {
        
        TestAiCase (playOnTheCorners);
        
    });

    it("should open the game well", function() {
        
        TestAiCase (openingMove);
        
    });

    it("should avoid this strange weak scenario", function() {
        
        let playerMoves = [new Point(0,2),new Point(2,0),new Point(2,2),new Point(1,2)];
        let gameState = new GameState (Player.X);
        
        for(let i=0;i<playerMoves.length;++i)
        {
            let point = playerMoves[i];
            let move = new Move(point);

            let contains = gameState.PossibleMoves.find((e)=> {return e.equals(move);}) != undefined;

            if(contains)
                gameState = gameState.PickAMove (move);
            else
                gameState = gameState.PickAMove (gameState.PossibleMoves[0]);

            if (gameState.IsEndState)
                break;
            
            var aiMove = ai.NextMove (gameState);
			gameState = gameState.PickAMove(aiMove);
        }

        expect(gameState.VictoryState.Winner).toEqual(Player.O);
        
	});

	it("should draw with itself", function() {
        

		let gameState = new GameState (Player.X);
        var t0 = performance.now();
       
		while(!gameState.IsEndState)
		{
			var move = ai.NextMove (gameState);
			gameState = gameState.PickAMove (move);

		}
        var t1 = performance.now();

		let draw = gameState.PossibleMoves.length == 0 
				   && gameState.VictoryState.Winner.equals(Player.None);
                   
        console.log("Test took " + (t1 - t0) + " milliseconds.")
		expect(draw).toEqual(true);
    });
	
	


});
