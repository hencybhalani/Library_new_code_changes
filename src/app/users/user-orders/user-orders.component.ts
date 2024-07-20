import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Order } from '../../_model/user.model';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PaymentService } from '../../_service/payment.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
  columnsForPendingReturns: string[] = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'fineToPay',
  ];
  columnsForCompletedReturns: string[] = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'returnedDate',
    'finePaid',
  ];
  pendingReturns: Order[] = [];
  completedReturns: Order[] = [];

  

  constructor(private apiService: UserService,private toaster: ToastrService,private paymentService: PaymentService) {

    const userInfo = this.apiService.getUserInfo();
  if (!userInfo ||  userInfo.id === undefined) {
    console.error('Failed to get user info or user is not logged in');
    this.toaster.error('User not logged in', 'Error');
    return;
  }
 
    this.apiService.GetOrdersOFUser(userInfo.id).subscribe(
      {
       next:(res:Order[])=>{
        console.log(res);
        var result = res;
        this.pendingReturns = res.filter((o:any) => !o.returned);
        this.completedReturns = res.filter((o:any) => o.returned);
       }
      });
  }
  getFineToPay(order: Order) {
    return this.apiService.getFine(order);
  }
  name:string='hency';
  contact:string='1234567890';
  initiatePayment(amount:any) {
    console.log(amount);
    
    this.paymentService.initiatePayment(amount,this.name,this.contact);
    
  }
}
