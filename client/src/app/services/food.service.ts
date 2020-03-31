import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

// set up http headers for POST and PUT to accept incoming json
let headers = new HttpHeaders()
headers.append('Content-Type', 'application/json')

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  // get
  getFoods() {
    return this.http.get('http://localhost:3000/foods')
  }

  // add
  addFood(newFood) {
    return this.http.post('http://localhost:3000/foods', newFood, { headers: headers } )
  }
}
