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
       list.push(new Point(i,index));
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

        list.push(new Point(x,y));
    }

    return list;
}

function _MakeColumn(index)
{
    let list = [];

    for (let i = 0; i < 3; ++i) 
    {
        list.push(new Point(index,i));
    }

    return list;
}

export class BoardVictoryAnalyser{

     
     static get  FirstRow(){
        return new VictoryCheckStrategy(_MakeRow(0));
     }; 

     static  get SecondRow(){
        return new VictoryCheckStrategy(_MakeRow(1));
     };

     static get  ThirdRow(){
        return new VictoryCheckStrategy(_MakeRow(2));
     }; 


     static get FirstColumn(){
        return new VictoryCheckStrategy(_MakeColumn(0));
     }; 

     static get SecondColumn(){
        return new VictoryCheckStrategy(_MakeColumn(1));
     };

     static  get ThirdColumn(){
        return new VictoryCheckStrategy(_MakeColumn(2));
     }; 


     static get LeftRightDiagonal(){
        return new VictoryCheckStrategy(_MakeDiagonal(DiagonalDirection.LeftRight));
     };

     static get RightLeftDiagonal(){
        return new VictoryCheckStrategy(_MakeDiagonal(DiagonalDirection.RightLeft));
     }; 

     static get _rows(){
         return [BoardVictoryAnalyser.FirstRow,BoardVictoryAnalyser.SecondRow,BoardVictoryAnalyser.ThirdRow];
     }

     static get _columns(){
        return [BoardVictoryAnalyser.FirstColumn,BoardVictoryAnalyser.SecondColumn,BoardVictoryAnalyser.ThirdColumn];
    }

     constructor(origin){

        let firstRow = new VictoryCheckStrategy(0); 
        this._strategies = [BoardVictoryAnalyser.FirstColumn,BoardVictoryAnalyser.FirstRow,BoardVictoryAnalyser.LeftRightDiagonal];

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

        if(Math.abs(origin.X-origin.Y) == 2 && !hasRightLeftDiagonal)
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