
let __internalCache = new Map();

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

    static Make(x,y){

       let key = x.toString()+y.toString();
       let ret = __internalCache.get(key);
       if(ret == undefined)
       {
           ret = new Point(x,y);
           __internalCache.set(key,ret);
       }

       return ret;
    }

    equals(other)
    {
        if(this === other)
            return true;

        if(typeof other != typeof this)
        {
            return false;
        }

        return other.Y == this.Y && other.X == this.X;
    }

    toString()
    {
        return "Point("+this.X+","+this.Y+")";
    }

}