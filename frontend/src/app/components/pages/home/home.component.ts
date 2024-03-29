import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      let foodObservable:Observable<Food[]>;
      if (params.searchTerm)
      foodObservable = foodService.getAllFoodsBySearchTerm(params.searchTerm)
      else if (params.tag)
      foodObservable = foodService.getFoodByTag(params.tag);
      else
      foodObservable = foodService.getAll();

      foodObservable.subscribe(food=>{
        this.foods=food;
      })
    })
  }
  ngOnInit(): void {
  }

}
