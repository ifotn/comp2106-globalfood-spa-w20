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

  // delete
  deleteFood(_id) {
    return this.http.delete('http://localhost:3000/foods/' + _id, { headers: headers })
  }

  // update
  updateFood(food) {
    return this.http.put('http://localhost:3000/foods/' + food._id, food, { headers: headers })
  }
}
