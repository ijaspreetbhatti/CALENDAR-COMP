import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  constructor(private _http: HttpClient) {
  }

  getEvents(){
    return this._http.get("http://localhost:8080/events");
  }
}
