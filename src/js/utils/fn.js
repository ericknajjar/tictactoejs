export class fn
{
    static spread(values,callback){
        return callback(...values);
    }
}