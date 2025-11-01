import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { K8_External_IP } from '../../constants/url';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // Add your service methods here]
  private apiUrl= K8_External_IP+'/restaurant/allRestaurant';

  constructor(private http:HttpClient) { }

  getAllRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {  
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
