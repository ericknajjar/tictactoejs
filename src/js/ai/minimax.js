class MoveScore
{
    constructor(move,score)
    {
        this._move = move;
        this._score = score;
    }

    get Score(){
        return this._score;
    }

    get Move(){
        return this._move;
    }

    toString ()
    {
        return "MoveScore("+this._move+","+this._score+")";
    }
}

export class MiniMaxAi
{
    constructor(){

    }

    NextMove(beginingState){

        if(!beginingState.IsEndState)
            return this._MiniMax (beginingState, -1000,1000).Move;

        throw "Can't determine next move from an end state";
    }

    _MiniMax(s,alpha, beta)
    {
 
        let best = new MoveScore (null,0);
        let length = s.AllMoves.length;
        for(let i=0;i<length;++i)
        {
            let move = s.AllMoves[i];

            let newState = s.Pick(move);
            let score = this._MiniMaxInner(newState,move,alpha,beta);
            let moveScore = new MoveScore(move,score.Score);

            if(best.Move == null)
                best = moveScore;

            if(!s.Min)
            {
                if (best.Score < moveScore.Score)
                    best = moveScore;
                
                if (alpha < best.Score) 
                {
                    alpha = best.Score;
                }
                    
                if (beta <= alpha)
                    break;
            }
            else
            {
                if (best.Score > moveScore.Score)
                    best = moveScore;
                
                if (beta > best.Score)
                {
                    beta = best.Score;
                }

                if (beta <= alpha)
                    break;
            }

        }

        return best;
    }

    _MiniMaxInner(s, move,alpha,beta)
    {
        if (s.IsEndState)
            return new MoveScore(move,s.Score);
        
        return this._MiniMax (s,alpha,beta);
    }

}