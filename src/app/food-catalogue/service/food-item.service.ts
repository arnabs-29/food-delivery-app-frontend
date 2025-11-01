import { Injectable } from '@angular/core';
import { K8_External_IP } from '../../constants/url';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  // Add your service methods here
  private apiUrl= K8_External_IP+'/foodCatalogue/fetchRestaurantAndFoodItemsById/';

  constructor(private http:HttpClient) { }

  getFoodItemsByRestaurantId(id: number) :Observable<any>{
    return this.http.get<any>(`${this.apiUrl+id}`)
    .pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.'); 
  }     
}
