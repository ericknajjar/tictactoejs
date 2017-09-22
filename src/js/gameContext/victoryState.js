import {Player} from "./player.js"
import {CheckEquality} from "../equality.js"

export class VictoryState {


    constructor(winner, pattern){

        this._Winner = winner;
        this._Pattern = pattern;
    }

    get Winner(){
        return this._Winner;
    }

    get Pattern() {
        return this._Pattern;
    }

    equals(other)
    {
        if(this === other)
            return true;

        if(typeof other != typeof this)
        {
            return false;
        }

        return this.Winner.equals(other.Winner) && CheckEquality(this.Pattern,other.Pattern);
    }
}

VictoryState.Indetermined = new VictoryState(Player.None,[]);