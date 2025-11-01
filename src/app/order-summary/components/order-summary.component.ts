import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { orderDTO } from '../model/orderDTO';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  orderSummary:orderDTO;
  obj:any;
  total:any;
  showDialog:boolean=false;

  constructor(private route:ActivatedRoute,private orderService:OrderService, private router:Router){}

  ngOnInit(): void {
    const data= this.route.snapshot.queryParams['data'];
    this.obj= JSON.parse(data);
    this.obj.userId=2; // Hardcoded user ID for demonstration
    this.orderSummary=this.obj;

    this.total = (this.orderSummary?.foodItemList ?? []).reduce((accumulator, currentVal) => {
      return accumulator + ((currentVal.price ?? 0) * (currentVal.quantity ?? 0));
    }, 0);  
     
  }

  saveOrder(): void {
    this.orderService.saveOrder(this.orderSummary)
      .subscribe(
        (response: any) => {
            this.showDialog = true;
          },
        (error: any) => {
            console.error("Failed to save order:", error);
        }
      );
  }

  closeDialog(){
    this.showDialog=false;
    this.router.navigate(['/']);
  }
}
