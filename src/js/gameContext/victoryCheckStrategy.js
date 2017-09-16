import {CheckEquality} from "../equality.js"
import {Player} from "./player.js"

export class VictoryCheckStrategy{

    constructor(pattern){
        this._Pattern = pattern;
    }

    get Pattern(){
        return this._Pattern;
    }

    equals(other)
    {
        if(typeof other != typeof this)
        {
            return false;
        }

        return CheckEquality(this.Pattern,other.Pattern);
    }

    Check(boardData){

        let player = Player.None;
        let points = this.Pattern;

        for (let i = 0; i < points.length; ++i) {
            let point = points [i];
            let owner = boardData [point.X][point.Y];

            if (owner.equals (Player.None))
                return Player.None;

            if (i == 0)
                player = owner;
            else {
                if (!player.equals (owner)) {
                    return Player.None;
                }
            }

        }

        return player;
    }

    toString(){
        return "VictoryCheckStrategy("+this._Pattern+")";
    }


}