// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { SharedModule } from '../../shared/shared.module';
// import { UserService } from '../../_service/UserService';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute } from '@angular/router';
// import { PaymentService } from '../../_service/payment.service';

// @Component({
//   selector: 'app-e-book-details',
//   standalone: true,
//   imports: [CommonModule,SharedModule],
//   templateUrl: './e-book-details.component.html',
//   styleUrl: './e-book-details.component.css'
// })
// export class EBookDetailsComponent {
//   Ebooks:any = [];
//   eid:number;
//   wishlist: any = [];
//   showDiv: boolean = false;
//   userType:any;


//   constructor(private apiService: UserService, private toaster: ToastrService,private activateroute:ActivatedRoute,private paymentService: PaymentService) {
//    this.eid =this.activateroute.snapshot.params['eid'];
//   }
//   ngOnInit(): void {
//     const userInfo = this.apiService.getUserInfo();
//     console.log(userInfo);
//     this.userType=userInfo?.userType;
//     console.log(this.userType);


//     this.apiService.getEbookListById(this.eid).subscribe(data => {
//       this.Ebooks = data.map((ebook: any) => {
//         console.log('storedImage before e book data',ebook)
//         if (ebook.storedImage) {
//           ebook.imageUrl = `data:image/jpeg;base64,${ebook.storedImage}`;
//         }
//         if (ebook.storedDocument) {
//           ebook.documentUrl = `data:application/pdf;base64,${ebook.storedDocument}`;
//         }
//         console.log('storedImage before',ebook)

//         return ebook;
//       });

//       console.log(this.Ebooks);
//     });
     
//   }
//   viewDocument(base64Document: string) {
    
//     const byteCharacters = atob(base64Document);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: 'application/pdf' });
//     const objectUrl = URL.createObjectURL(blob);
    
//     const pdfWindow = window.open();
//     if (pdfWindow) {
//       pdfWindow.location.href = objectUrl;
//     }
//   }
 
  
//   showError() {
//     this.showDiv = true;
//     console.log('Error function called');

 
//   }
//   closeArticle() {
//     this.showDiv = false;
//   }
//   name:string='hency';
//   contact:string='1234567890';
//   initiatePayment(amount:any) {
//     console.log(amount);
    
//     this.paymentService.initiatePayment(amount,this.name,this.contact);
    
//   }
//   isAdmin(): boolean {
//     if(this.userType === 0)
//     {return  true;}
//     else{
//       return false;
//     }
//      // Assuming userType 'admin' for admin users
//   }
// }