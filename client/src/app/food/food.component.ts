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
    this._id = null;
    this.name = null;
    this.country = null;
  }

  ngOnInit(): void {
    // get the list of foods automatically when this component is started
    this.getFoods()
  }

  deleteFood(_id: any) {
    if (confirm('Are you sure?')) {
      this.foodService.deleteFood(_id).subscribe(response => {
        this.getFoods()
      })
    }
  }

  // display selected food in the form for editing
  selectFood(food): void {
    this._id = food._id;
    this.name = food.name;
    this.country = food.country;
  }

  // update selected food from the form values
  updateFood(): void {
    // create food object from the form values
    let food = {
      _id: this._id,
      name: this.name,
      country: this.country
    }

    // call the service to update
    this.foodService.updateFood(food).subscribe(response => {
      this.getFoods()
      this.clearForm()
    })
  }
}
