import {VictoryState} from "./victoryState.js"

export class Board{
    
    constructor(){
        this.VictoryState = VictoryState.Indetermined
    }

    SetCellOwner(player,position){
    
        this.VictoryState = new VictoryState(player);
       return this;
    }
}