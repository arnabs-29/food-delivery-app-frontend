import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/food-item.service';
import { FoodCataloguePage } from '../../Shared/model/FoodCataloguePage';
import { FoodItem } from '../../Shared/model/FoodItem';

@Component({
  selector: 'app-food-catalogue',
  standalone: false,
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent {

  restaurantId:number;
  foodItemResponse:FoodCataloguePage;
  foodItemCart:FoodItem[]=[];
  orderSummary:FoodCataloguePage;
  
  constructor(private route:ActivatedRoute, private foodItemService:FoodItemService,private router:Router){}
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      const idParam = params.get('id');
      this.restaurantId = idParam !== null ? +idParam : 0;
      console.log(this.restaurantId);
    });
    this.getFoodItemsByRestaurant(this.restaurantId);
  }

  getFoodItemsByRestaurant(id: number) {
    this.foodItemService.getFoodItemsByRestaurantId(id).subscribe({
      next: (data: FoodCataloguePage) => {
        this.foodItemResponse = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  increment(food: FoodItem) {
    food.quantity = (food.quantity ?? 0) + 1;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      this.foodItemCart.push(food);
    } else {
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: FoodItem) {
    if ((food.quantity ?? 0) > 0) {
      food.quantity!--;
      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity === 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        this.foodItemCart[index] = food;
      }
    }
  }
  onCheckout(){
    this.foodItemCart;
    this.orderSummary={
      foodItemList:[],
      restaurant: {} as import('../../Shared/model/Restaurant').Restaurant
    }
    this.orderSummary.foodItemList=this.foodItemCart;
    this.orderSummary.restaurant=this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], {queryParams: {data: JSON.stringify(this.orderSummary)}}); 
  }
}
