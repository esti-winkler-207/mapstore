import { Injectable } from '@angular/core';
import { Person } from '../person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServService {

  p1!:Array<Person>
  BasicURL="http://localhost:59435/api/person/"
  constructor(private http:HttpClient) { }
  add(p:Person):Observable<Array<Person>>
  {
    console.log("p",p);
  
    return this.http.post<Array<Person>>(this.BasicURL+"Add",p)
  }
  chechIsExist(userName:string,password:string):Observable<number>{
  
    return this.http.get<number>(this.BasicURL+"FindPerson/"+password+"/"+userName)
    
  }
  x1:number=5
  nameCustomer:string=""
  pass:string=""
}
