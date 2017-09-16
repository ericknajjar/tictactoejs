import { Observable } from 'rxjs/Observable';

export class Signals
{
    static signalToObservable(signal,value,context=null){
        
               return Observable.create((observer)=>{
        
                    let binding = signal.add(()=>{
                        observer.next(value);
                    });
                },context);
            }
}

