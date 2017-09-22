
export class Move 
{

    constructor(target)
    {
        this._target = target;
    }

    get Target(){
        return this._target;
    }

    equals(other)
    {
        if(this === other)
            return true;

        if(typeof other != typeof this)
        {
            return false;
        }

        return this._target.equals(other._target);
    }
    

    toString ()
    {
        return "Move("+this._target+")";
    }
    

}