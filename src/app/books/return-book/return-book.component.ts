import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../_model/user.model';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [SharedModule,ReactiveFormsModule,FormsModule],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {
  returnForm: FormGroup;
  fineToPay: number | null = null;
  userList: any[] = [];
  userbookList  : any[] =[];
  id:any
  uniqueUserList: any[] = [];
  constructor( fb: FormBuilder,private apiService: UserService, private Toastr: ToastrService
  ) {
    //useer show dro down
    this.loaduser();
   
    this.loadBookname();
    this.returnForm = fb.group({
      userId: fb.control(null, [Validators.required]),
      bookId: fb.control(null, [Validators.required]),
    });
    
    this.returnForm.get('userId')?.valueChanges.subscribe(selectedUserId => {
      console.log('Selected User ID:', selectedUserId);
      this.id=selectedUserId;

      this.apiService.GetOrdersOFUser(this.id).subscribe(data => {
        this.userbookList = data;
        console.log(this.userbookList);
      });

    });
  }
  
  loaduser() {
    this.apiService.GetOrdersList().subscribe(data => {
      this.userList = data;
      this.uniqueUserList = this.getUniqueUsers(data);
      console.log(this.uniqueUserList);
    });
  }

  getUniqueUsers(data: any[]): any[] {
    const uniqueUsers = new Map();
    data.forEach(item => {
      if (!uniqueUsers.has(item.user.id)) {
        uniqueUsers.set(item.user.id, item.user);
      }
    });
    return Array.from(uniqueUsers.values());
  }
loadBookname(){
  console.log(this.id);
  // this.apiService.GetOrdersOFUser(this.id).subscribe(data => {
  //   this.userbookList = data;
  //   console.log(this.userbookList);
  // });
}

  getFine() {
    let userId = this.returnForm.get('userId')?.value;
    let bookId = this.returnForm.get('bookId')?.value;

    this.apiService.GetOrdersOFUser(userId).subscribe({
      next: (res: Order[]) => {
        if (res.some((o) => !o.Returned && o.BookId == bookId)) {
            let order: Order = res.filter((o) => o.BookId == bookId)[0];
            this.fineToPay = this.apiService.getFine(order);
            console.log(this.fineToPay);
            this.apiService.ReturnBookWithFine(userId, bookId, this.fineToPay!).subscribe({
              next: (res:any) => {
                if (res.message == 'storedfine')
                  this.Toastr.success('Book fine been R', 'OK');
                else this.Toastr.error('Book fine not Returned!', 'OK');
              },
            });
        } else {
          this.Toastr.error(`User doesn't have Book with ID: ${bookId}`, 'OK');
        }
      },
    });
  }

  returnBook() {
    if (this.fineToPay === null) {
      this.Toastr.error('Please calculate the fine before returning the book.', 'OK');
      return;
    }

  if (this.fineToPay > 0) {
    this.Toastr.error('Please pay the penalty amount before returning the book.', 'OK');
    return;
  }
    let userId = this.returnForm.get('userId')?.value;
    let bookId = this.returnForm.get('bookId')?.value;

    this.apiService.ReturnBook(userId, bookId, this.fineToPay!).subscribe({
      next: (res:any) => {
        if (res.message == 'returned')
          this.Toastr.success('Book has been Returned!', 'OK');
        else this.Toastr.error('Book has not Returned!', 'OK');
      },
    });
  }
}
