import * as _ from "lodash";

export function CheckEquality(a,b){
  
    if(a==null && b ==null) return true;
    if((a == null || b == null) && a!=b) return false;

    if(a.constructor === Array && b.constructor === Array)
    {
        if(a.length!=b.length) return false;

        for(let i = 0;i<a.length;++i)
        {
            if(!CheckEquality(a[i],b[i]))
                return false;
        }

        return true;
    }
    else if (typeof a.equals === "undefined" || typeof b.equals  === "undefined" )
    {
        return _.isEqual(a,b);
    }
    else
    {
        return a.equals(b);
    }
}