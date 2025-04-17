import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoService {

  private API_URL = 'https://djo-back.onrender.com';

  HttpOptions={
    headers:new HttpHeaders().set('Authorization',localStorage.getItem('key') || '')
  }

  constructor(private http:HttpClient){}

  authenticateToken(key:string):Observable<any>{
    return this.http.get(`${this.API_URL}/authenticateToken?key=${key}`);
  }


  start():Observable<any>{
    return this.http.post(`${this.API_URL}/start`,{},this.HttpOptions);
  }

  getDrinks(journal:number):Observable<any>{
    return this.http.get(`${this.API_URL}/getDrinks?journal=${journal}`,this.HttpOptions);
  }
  
  getCurrentJournal():Observable<any>{
    return this.http.get(`${this.API_URL}/getCurrentJournal`,this.HttpOptions);
  }

  consume(drinkId:number, journal:number,op:string):Observable<any>{
    return this.http.post(`${this.API_URL}/consume`,{drinkId, journal,op},this.HttpOptions);
  }

  getJournals(page=1):Observable<any>{
    return this.http.get(`${this.API_URL}/getJournals?page=${page}`,this.HttpOptions);
  }

}
