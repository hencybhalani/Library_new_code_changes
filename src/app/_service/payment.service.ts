import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
declare var Razorpay: any;


@Injectable({
  providedIn: 'root'
})

export class PaymentService {
private razorpayOptions: any = {
  key: 'rzp_test_bfsUwGvbOsTygO', 
  amount: 500,
  currency: 'INR',
  name: 'Library Mangement',
  description: 'Payment for Returned  Book', 
  image: 'lib2.jpg',
  handler: this.paymentHandler.bind(this),
  prefill: {
    name: 'hency bhalani',
    email: 'hencybhalani@gmail.com', 
    contact: '9876543210' 
  },
  theme: {
    color: '#141E30' 
  }
};

private rzp: any;

constructor(private toaster: ToastrService) {
  this.loadRazorpay();
}

private loadRazorpay(): void {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = () => {
    this.rzp = new Razorpay(this.razorpayOptions);
  };
  script.onerror = () => {
    console.error('Razorpay SDK could not be loaded.');
  };
  document.body.appendChild(script);
}
initiatePayment(amount: number,name:string,contact:string): void {
  if (this.rzp) {
    this.razorpayOptions.amount = amount * 100; // Razorpay expects amount in paise, so multiply by 100
    this.razorpayOptions.prefill.name = name;
    this.razorpayOptions.prefill.contact =contact;
    console.log("final"+this.rzp.amount);
    this.rzp = new Razorpay(this.razorpayOptions);
    this.rzp.open();
  } else {
    console.error('Razorpay instance is not initialized.');
  }
}

private paymentHandler(response: any): void {
  console.log('Payment Response:', response);
  this.toaster.success('Payment successful!');
}

}