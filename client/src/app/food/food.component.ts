import { Component, OnInit } from '@angular/core';
import { FoodService } from "../services/food.service";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  // constructor now requires the FoodService to be injected
  constructor(private foodService: FoodService) { }

  // create foods property to hold the list of foods
  foods: any;
  _id: string;
  name: string;
  country: string;

  getFoods(): void {
    // use the service to fetch the food list from the server api
    this.foodService.getFoods().subscribe(response => {
      this.foods = response
    })
  }

  addFood(): void {
    // create new food from the ui
    let newFood = {
      name: this.name,
      country: this.country
    }

    // call the service which calls the server api. When done, refresh list & clear form
    this.foodService.addFood(newFood).subscribe(response => {
      this.getFoods()
      this.clearForm()
    })
  }

  clearForm(): void {
    this.name = null;
    this.country = null;
  }

  ngOnInit(): void {
    // get the list of foods automatically when this component is started
    this.getFoods()
  }

}
