import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SelectiveStrategy implements PreloadingStrategy {
    preload(route: Route, load:Function): Observable<any> {
        //use route data property to determine what module to preload
        //A route has a data property we can use to pass a fixed object to a route
        //We use it to provide any arbitrary data to a route. We pass it an object specifying a set of key and value pairs, where the key is a logical name for the data and the value is the data itself.
        //Here we extend basic class implementing Angular s PreloadingStrategy interface with Observable. The observable connects subscriber of this class to inner private Subject. The subject is exposed as observable in our main method preload(). Inside the stream we stop the stream first depending on network speed (if this is enabled via our InjectionToken PRELOAD_OPTIONS) and the second and final check is to see if the current route is the one that is demanded _shouldPreload(). If both filters pass we pre-load the route. 

        //if data property is set on the route and the value is true we preload the module
        if (route.data && route.data['preload']) {
            console.log('product route data', route.data);
            return load()
        }
        return of(null);
    }

} 