import {GameState} from "../js/gameContext/gameState.js"
import {Move} from "../js/gameContext/move.js"
import {CheckEquality} from "../js/equality.js"
import {Player} from "../js/gameContext/player.js"
import {Point} from "../js/gameContext/point.js"
import {TicTacToeAi} from "../js/gameContext/ticTacToeAi.js"

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

    console.log("Move = "+move+" nextMoves: "+aiCase.NextMoves);
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
        
        let playerMoves = [new Point(0,2),Point(2,0),Point(2,2),Point(1,2)];
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

});

/*
public class TicTacToeAiTests  
{

	AiCase m_starterAlmostWins = new AiCase(new List<Point>{Point.Make(0,0),Point.Make(0,2),Point.Make(1,0),Point.Make(1,2)},
		new List<Point>{Point.Make(2,0)}, Gameplay.Player.X);

	AiCase m_playOnTheCorners = new AiCase(new List<Point>{Point.Make(1,1)},
		new List<Point>{Point.Make(0,0),Point.Make(2,0),Point.Make(0,2),Point.Make(2,2)}, Gameplay.Player.X);

	AiCase m_openingMove = new AiCase(new List<Point>(),
		new List<Point>{Point.Make(1,1),Point.Make(0,0),Point.Make(2,0),Point.Make(0,2),Point.Make(2,2)}, Gameplay.Player.X);


	Gameplay.TicTacToeAi  m_ai = new Gameplay.TicTacToeAi ();

	[Test]
	public void AssertingWinPremiss()
	{
		var winningState = m_starterAlmostWins.State.PickAMove (m_starterAlmostWins.NextMoves [0]);

		Assert.AreEqual (Gameplay.Player.X,winningState.VictoryState.Winner);
	}

	[Test]
	public void ChooseRightToVictoryMove1()
	{
		TestAiCase (m_starterAlmostWins);
	}

	[Test]
	public void PlayOnCorners()
	{
		TestAiCase (m_playOnTheCorners);
	}


	[Test]
	public void OpeningMove()
	{
		TestAiCase (m_openingMove);
	}

	void TestAiCase(AiCase aiCase)
	{
		var move = m_ai.NextMove (aiCase.State);

		bool contains = aiCase.NextMoves.Contains (move);

		var list = new StringBuilder ();
		list.Append ("[");
		foreach(var possibleMove in aiCase.NextMoves)
		{
			list.Append (possibleMove);
			list.Append (",");
		}
		list.Append ("]");

		Assert.That (contains, move+" should be in" + list);
	}

	[Test]
	public void StrangeWeakCase()
	{
		List<Point> playerMoves = new List<Point>{ Point.Make(0,2),Point.Make(2,0),Point.Make(2,2),Point.Make(1,2) };
		var gameState = new Gameplay.GameState (Gameplay.Player.X);

		foreach(var point in playerMoves)
		{
			var move = new Gameplay.Move (point);

			if (gameState.PossibleMoves.Contains (move))
				gameState = gameState.PickAMove (move);
			else
				gameState = gameState.PickAMove (gameState.PossibleMoves[0]);

			if (gameState.IsEndState)
				break;

			var aiMove = m_ai.NextMove (gameState);
			gameState = gameState.PickAMove(aiMove);
		}

		Assert.AreEqual (Gameplay.Player.O, gameState.VictoryState.Winner);
	}

	[Test, Timeout(10000)]
	public void AiVsAiDraw()
	{
		var gameState = new Gameplay.GameState (Gameplay.Player.X);

		while(!gameState.IsEndState)
		{
			var move = m_ai.NextMove (gameState);
			gameState = gameState.PickAMove (move);

		}

		bool draw = gameState.PossibleMoves.Count == 0 && gameState.VictoryState.Winner.Equals (Gameplay.Player.None);

		Assert.That (draw, "Move Count: "+gameState.PossibleMoves.Count+" Winner: "+gameState.VictoryState.Winner);
	}
}
*/
