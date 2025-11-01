import { Injectable } from '@angular/core';
import { K8_External_IP } from '../../constants/url';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Add your order-related service methods here
  private apiUrl= K8_External_IP+'/order/saveOrder';
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers:new Headers({
        'Content-Type':'text/plain',
        'Access-Control-Allow-Origin':'http://localhost:4200'
    })
  };

  saveOrder(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.'); 
  }
}
