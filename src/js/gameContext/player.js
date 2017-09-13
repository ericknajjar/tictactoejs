
export class Player
{
    static get X(){
        return new Player("X");
    }

    static get O(){
        return new Player("0");
    }

    static get None(){
        return new Player("None");
    }

    constructor(name){
        
        this._getName = ()=>{
            return name;
        }
    }

    toString(){
        return this._getName();
    }

    equals(other)
    {
        if(typeof other != typeof this)
        {
            return false;
        }

        return this._getName() == other._getName();
    }
}