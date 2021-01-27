import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../place';

@Injectable({
  providedIn: 'root'
})
export class MapServService {

  url:string="http://localhost:59435/api/place/"
place1:Place=new Place()
  constructor(private http:HttpClient) { }
  add(place:Place):Observable<Array<Place>>
  {
    console.log("p",place);
  
    return this.http.post<Array<Place>>(this.url+"Add",place)

  }
}
