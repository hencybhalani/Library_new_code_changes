import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Order } from '../../_model/user.model';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [SharedModule,CommonModule,MatProgressBarModule,MatProgressBar],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
  columnsForPendingReturns: string[] = [
    'orderId',
    'userIdForOrder',
    'userNameForOrder',
    'bookId',
    'orderDate',
    'fineToPay',
  ];

  columnsForCompletedReturns: string[] = [
    'orderId',
    'userIdForOrder',
    'userNameForOrder',
    'bookId',
    'orderDate',
    'returnedDate',
    'finePaid',
  ];
  ordersWithPendingReturns: any[] = [];
  ordersWithCompletedReturns: any[] = [];
  showProgressBar: boolean = false;


  constructor(private apiService: UserService,private toaster: ToastrService) {
 
  this.apiService.GetOrdersList().subscribe(data=>
  {
         this.ordersWithPendingReturns = data.filter((o:any) => !o.returned);
      console.log(this.ordersWithPendingReturns);
      this.ordersWithCompletedReturns = data.filter((o:any) => o.returned);
      console.log("complete"+this.ordersWithCompletedReturns);

  })
   
}
  getFineToPay(order: any) {
    return this.apiService.getFine1(order);
  }
  SendEmailtoUser(){
    this.showProgressBar = true;
    this.apiService.sendEmailtoUser().subscribe({
      next: (res:any) => {
        if (res === 'sent') {
          this.toaster.success(
            'Emails have been Sent to respected Students!',
            'OK'
          );
          this.showProgressBar = false;
        } else {
          this.toaster.error('Emails have not been sent!', 'OK');
          this.showProgressBar = false;
        }
      },
    });
  }
  Blockeduser(){
    this.showProgressBar = true;
    this.apiService.blockedUser().subscribe({
      next: (res:any) => {
        if (res.message === 'blocked') {
          this.toaster.success('Eligible Users Accounts were BLOCKED!', 'OK');
          this.showProgressBar = false;
        } else {
          this.toaster.error('Not BLOCKED!', 'OK');
          this.showProgressBar = false;
        }
      },
    });
  }
}
