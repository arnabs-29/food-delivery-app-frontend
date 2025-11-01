import { FoodItem } from "../../Shared/model/FoodItem";
import { Restaurant } from "../../Shared/model/Restaurant";

export interface orderDTO{
    foodItemList?:FoodItem[];
    userId?:number;
    restaurant?:Restaurant;
}