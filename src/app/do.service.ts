import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoService {

  private API_URL = 'http://localhost:3000'
  
  constructor(private http:HttpClient) { }

  start():Observable<any>{
    return this.http.post(`${this.API_URL}/start`,{});
  }

  getDrinks(journal:number):Observable<any>{
    return this.http.get(`${this.API_URL}/getDrinks?journal=${journal}`);
  }
  
  getCurrentJournal():Observable<any>{
    return this.http.get(`${this.API_URL}/getCurrentJournal`);
  }

  consume(drinkId:number, journal:number,op:string):Observable<any>{
    return this.http.post(`${this.API_URL}/consume`,{drinkId, journal,op});
  }

  getJournals(page=1):Observable<any>{
    return this.http.get(`${this.API_URL}/getJournals?page=${page}`);
  }

}
