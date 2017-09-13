import {VictoryState} from "./victoryState.js"
import {Player} from "./player.js"
import {BoardVictoryAnalyser} from "./boardVictoryAnalyser.js"

function _fromPlay(newData,victoryState)
{
    let newBoard = new Board(false);
    newBoard._boardData = newData;
    newBoard.VictoryState = victoryState;

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
        }
    }

    getPlayer(point) {
        return this._boardData[point.X][point.Y];
    }

    SetCellOwner(player,position){
    
        let newData = this._boardData.slice();
        newData[position.X][position.Y] = player;

        if(this.VictoryState.Winner.equals(Player.None))
        {
            let victoryAnalyser = new BoardVictoryAnalyser(position);
            let vicoryState = victoryAnalyser.Check(newData);

            return _fromPlay(newData,vicoryState);

        }
        else
        {
            return _fromPlay(newData,this.VictoryState);
        }

    }
}