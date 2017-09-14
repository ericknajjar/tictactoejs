
export class Player
{
    static get X(){
        return new Player("X");
    }

    static get O(){
        return new Player("O");
    }

    static get None(){
        return new Player("None");
    }

    get Other()
    {
        if (this._name == "X")
            return Player.O;
        else if (this._name ==  "None")
            return Player.None;

        return Player.X;
        
    }


    constructor(name){
        
        this._name = name;
        
    }

    toString(){
        return "Player("+this._name+")";
    }

    equals(other)
    {
        if(typeof other != typeof this)
        {
            return false;
        }

        return this._name == other._name;
    }
}