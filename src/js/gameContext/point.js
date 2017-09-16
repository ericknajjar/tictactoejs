export class Point{

    constructor(x,y){

        this._X = x;
    

        this._Y =  y;
    }

    get X(){
        return this._X;
    }

    get Y(){
        return this._Y;
    }

    equals(other)
    {
        return other.Y == this.Y && other.X == this.X;
    }

    toString()
    {
        return "Point("+this.X+","+this.Y+")";
    }

}