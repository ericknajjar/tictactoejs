import {VictoryState} from "./victoryState.js"
import {VictoryCheckStrategy} from "./victoryCheckStrategy.js"
import {Player} from "./player.js"
import {Point} from "./point.js"

let DiagonalDirection = {
    LeftRight :0,
    RightLeft :2
};

function _MakeRow(index)
{
    let list = [];

    for (let i = 0; i < 3; ++i) 
    {
       list.push(Point.Make(i,index));
    }

    return list;
}

function _MakeDiagonal(direction)
{
    let list = [];

    let offset = direction;
    for (let i = 0; i < 3; ++i)
    {
        let x = Math.abs(offset -i);
        let y = i;

        list.push( Point.Make(x,y));
    }

    return list;
}

function _MakeColumn(index)
{
    let list = [];

    for (let i = 0; i < 3; ++i) 
    {
        list.push(Point.Make(index,i));
    }

    return list;
}

export class BoardVictoryAnalyser{

     
    static get  FirstRow(){
        if(BoardVictoryAnalyser._FirstRow == undefined)
            BoardVictoryAnalyser._FirstRow = new VictoryCheckStrategy(_MakeRow(0));
        return BoardVictoryAnalyser._FirstRow;
     }; 

     static  get SecondRow(){
        if(BoardVictoryAnalyser._FirstRow == undefined)
            BoardVictoryAnalyser._FirstRow = new VictoryCheckStrategy(_MakeRow(1));

        return BoardVictoryAnalyser._FirstRow;
     };

     static get  ThirdRow(){
        if(BoardVictoryAnalyser._ThirdRow == undefined)
            BoardVictoryAnalyser._ThirdRow = new VictoryCheckStrategy(_MakeRow(2));

        return BoardVictoryAnalyser._ThirdRow;

     }; 


     static get FirstColumn(){
        if(BoardVictoryAnalyser._FirstColumn == undefined)
            BoardVictoryAnalyser._FirstColumn = new VictoryCheckStrategy(_MakeColumn(0));

        return BoardVictoryAnalyser._FirstColumn;
     }; 

     static get SecondColumn(){
        if(BoardVictoryAnalyser._SecondColumn == undefined)
            BoardVictoryAnalyser._SecondColumn = new VictoryCheckStrategy(_MakeColumn(1));

        return BoardVictoryAnalyser._SecondColumn;
     };

     static  get ThirdColumn(){
        if(BoardVictoryAnalyser._ThirdColumn == undefined)
            BoardVictoryAnalyser._ThirdColumn = new VictoryCheckStrategy(_MakeColumn(2));

        return BoardVictoryAnalyser._ThirdColumn;

     };


     static get LeftRightDiagonal(){
        if(BoardVictoryAnalyser._LeftRightDiagonal == undefined)
            BoardVictoryAnalyser._LeftRightDiagonal = new VictoryCheckStrategy(_MakeDiagonal(DiagonalDirection.LeftRight));

        return BoardVictoryAnalyser._LeftRightDiagonal;
     };

     static get RightLeftDiagonal(){
        if(BoardVictoryAnalyser._RightLeftDiagonal == undefined)
            BoardVictoryAnalyser._RightLeftDiagonal = new VictoryCheckStrategy(_MakeDiagonal(DiagonalDirection.RightLeft));

        return BoardVictoryAnalyser._RightLeftDiagonal;
     };

     static get RightLeftDiagonal(){
        return new VictoryCheckStrategy(_MakeDiagonal(DiagonalDirection.RightLeft));
     }; 

     constructor(origin){
         
        this._strategies = [BoardVictoryAnalyser._rows[origin.Y],BoardVictoryAnalyser._columns[origin.X]];
        let hasRightLeftDiagonal = false;

        if (origin.X == origin.Y)
        {
            
            this._strategies.push (BoardVictoryAnalyser.LeftRightDiagonal);

            if(origin.X == 1)
            {  
                hasRightLeftDiagonal = true;
                this._strategies.push(BoardVictoryAnalyser.RightLeftDiagonal);
            }
                
        }

        if(!hasRightLeftDiagonal && Math.abs(origin.X-origin.Y) == 2)
            this._strategies.push(BoardVictoryAnalyser.RightLeftDiagonal);
     }

     Check(boardData){

            for(let i=0;i<this._strategies.length;++i)
			{
				let strategie = this._strategies [i];
				let checkResult = strategie.Check (boardData);
		
				if (!checkResult.equals(Player.None))
					return new VictoryState (checkResult, strategie.Pattern);
		
			}

        return VictoryState.Indetermined;
     }
 
     Contains(strategy) {

        return this._strategies.find((e)=> {

            return strategy.equals(e);

        }) != undefined; 
     }

     toString(){
         return "BoardVictoryAnalyser("+this._strategies+")";
     }
 
     static get AllStrategies() {
       return [BoardVictoryAnalyser.FirstRow,
        BoardVictoryAnalyser.SecondRow,
        BoardVictoryAnalyser.ThirdRow,
        BoardVictoryAnalyser.FirstColumn,
        BoardVictoryAnalyser.SecondColumn,
        BoardVictoryAnalyser.ThirdColumn,
        BoardVictoryAnalyser.LeftRightDiagonal,
        BoardVictoryAnalyser.RightLeftDiagonal];
     }

};

BoardVictoryAnalyser._rows = [BoardVictoryAnalyser.FirstRow,BoardVictoryAnalyser.SecondRow,BoardVictoryAnalyser.ThirdRow];
BoardVictoryAnalyser._columns = [BoardVictoryAnalyser.FirstColumn,BoardVictoryAnalyser.SecondColumn,BoardVictoryAnalyser.ThirdColumn];