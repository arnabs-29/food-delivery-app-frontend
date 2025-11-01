import { Component } from '@angular/core';
import { Restaurant } from '../../Shared/model/Restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-listing',
  standalone: false,
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css']
})
export class RestaurantListingComponent {

  public restaurantList: Restaurant[];

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  constructor(private router:Router, private restaurantService:RestaurantService){}
  
  getAllRestaurants(){
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data)=>{
        this.restaurantList=data;
        console.log(this.restaurantList);
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }

  getRandomImage():string{
    const imageCount=10; // Assuming you have 10 images named from restaurant1.jpg to restaurant10.jpg
    const randomIndex=Math.floor(Math.random()*imageCount)+1;
    return `${randomIndex}.jpeg`;
  }
  
  onButtonClick(id:number){
    this.router.navigate(['/food-catalogue', id]);
  }
}
