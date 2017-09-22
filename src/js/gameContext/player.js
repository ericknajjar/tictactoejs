

export class Player
{
 
    get Other()
    {
        if (this._name == "X")
            return Player.O;
        else if (this._name ==  "None")
            return this;

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
        if(this === other)
            return true;

        if(typeof other != typeof this)
        {
            return false;
        }

        return this._name == other._name;
    }
}

Player.X = new Player("X")
Player.O = new Player("O")
Player.None = new Player("None")