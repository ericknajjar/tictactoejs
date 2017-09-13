import {CheckEquality} from "../equality.js"

export class VictoryCheckStrategy{

    constructor(pattern){
        this._getPattern = ()=> {
            return pattern
        };
    }

    get Pattern(){
        return this._getPattern();
    }

    equals(other)
    {
        if(typeof other != typeof this)
        {
            return false;
        }

        return CheckEquality(this.Pattern,other.Pattern);
    }

    toString(){
        return "VictoryCheckStrategy("+this._t+")";
    }


}