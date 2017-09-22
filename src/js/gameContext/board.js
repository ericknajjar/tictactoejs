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

const  bestOrder = [Point.Make(1,1),Point.Make(0,0),Point.Make(2,0),Point.Make(2,2),Point.Make(0,2),
    Point.Make(1,0), Point.Make(2,1),Point.Make(1,2),Point.Make(0,1)];

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

    get movesCount(){
        return this._numberOfPlays;
    }

    getPlayer(point) {
        return this._boardData[point.X][point.Y];
    }

    foreachCell(callback){

        bestOrder.forEach((target)=>{
         callback(this._boardData[target.X][target.Y],target);
        });
    }


    SetCellOwner(player,position){
    
        let newData = this._boardData.slice();

        newData[position.X] = newData[position.X].slice();
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