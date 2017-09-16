import {Point} from "./point.js"

export class Move 
{

    constructor(target){
        this._target = target;
    }

    get Target(){  return this._target }

    equals (other)
    {
        if(typeof other != typeof this)
        {
            return false;
        }

        return this._target.equals(other);
    }
    

    toString ()
    {
        return "Move("+this._target+")";
    }
    

}