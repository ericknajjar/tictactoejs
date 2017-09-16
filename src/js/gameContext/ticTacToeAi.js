import {MiniMaxAi} from "../ai/minimax.js"
import * as _ from "lodash";

class AiStateAdapter
{
    constructor(gameState,player = null)
    {
        this._gameState = gameState;

        this._bot = (player == null)?gameState.CurrentPlayer:player;
    }


    Pick (move)
    {
        return new AiStateAdapter (this._gameState.PickAMove (move),this._bot);
    }

    get Min()
    {
        return !this._gameState.CurrentPlayer.equals(this._bot);
    }

    get Score()
    {            
        if (this._gameState.VictoryState.Winner.equals (this._bot))
            return 10;
        if (this._gameState.VictoryState.Winner.equals (this._bot.Other))
            return -10;

        return 0;
    }

    get AllMoves()
    {
        return this._gameState.PossibleMoves;
    }

    get IsEndState()
    {
        return this._gameState.IsEndState;  
    }
}

export class TicTacToeAi
{
 
    constructor(perfect = true)
    {
       this._perfect = perfect;
       this._minimaxAi = new MiniMaxAi();
    }

    NextMove(gameState)
    {
        if(!this._perfect && Math.random() < 0.1)
        {
            return _.sample(gameState.PossibleMoves);
        }
        else
        {
            let adapter = new AiStateAdapter (gameState);
            return this._minimaxAi.NextMove (adapter);
        }        
    }
}