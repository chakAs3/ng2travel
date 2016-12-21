import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TravelService {

  constructor (private http: Http) {}


  // Fetch all existing cities
     getCities() : Observable<any> {

         // ...using get request
         return this.http.get("/api/cities")
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }


     getFlights(body) : Observable<any> {

         // ...using get request
         let bodyString = JSON.stringify(body); // Stringify payload
       let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
       let options       = new RequestOptions({ headers: headers }); // Create a request option

         return this.http.get('/api/flights?origin=' + body.origin +
                           '&departuredate=' + body.departuredate +
                           '&returndate=' + body.returndate +
                           '&maxfare=' + body.maxfare)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }





}
