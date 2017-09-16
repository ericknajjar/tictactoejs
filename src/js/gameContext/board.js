import {VictoryState} from "./victoryState.js"
import {Player} from "./player.js"
import {BoardVictoryAnalyser} from "./boardVictoryAnalyser.js"
import {Point} from "./point.js"

function _fromPlay(newData,victoryState,numberOfPlays)
{
    let newBoard = new Board(false);
    newBoard._boardData = newData;
    newBoard.VictoryState = victoryState;
    newBoard._numberOfPlays = numberOfPlays;
    return newBoard;
}

export class Board{
    
    constructor(initBoard=true){
        if(initBoard)
        {
            this.VictoryState = VictoryState.Indetermined;
            this._boardData = [[Player.None,Player.None,Player.None],
            [Player.None,Player.None,Player.None],
            [Player.None,Player.None,Player.None]];
            this._numberOfPlays = 0;
        }
    }

    getPlayer(point) {
        return this._boardData[point.X][point.Y];
    }

    foreachCell(callback){

        for (let i = 0; i < 3; ++i) 
        {
            for (let j = 0; j < 3; ++j) 
            {
                let target = new Point(i,j);
                callback(this._boardData[i][j],target);
            }
        }
    }


    SetCellOwner(player,position){
    
        let newData = [];

        this._boardData.forEach((e)=>{
            newData.push(e.slice());
        });

        newData[position.X][position.Y] = player;

        if(this._numberOfPlays>=2 && this.VictoryState.Winner.equals(Player.None))
        {
            let victoryAnalyser = new BoardVictoryAnalyser(position);
            let vicoryState = victoryAnalyser.Check(newData);

            return _fromPlay(newData,vicoryState,this._numberOfPlays+1);

        }
        else
        {
            return _fromPlay(newData,this.VictoryState,this._numberOfPlays+1);
        }

    }
}