import {Player} from "./player.js"
import * as _ from "lodash";
import {CheckEquality} from "../equality.js"

export class VictoryState {


    static get Indetermined() {
       return new VictoryState(Player.None,[]);
    }

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
        if(typeof other != typeof this)
        {
            return false;
        }

        return this.Winner.equals(other.Winner) && CheckEquality(this.Pattern,other.Pattern);
    }
}