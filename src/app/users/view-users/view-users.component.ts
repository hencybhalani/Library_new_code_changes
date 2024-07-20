import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AccountStatus, UserType, userregister } from '../../_model/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/UserService';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [SharedModule,CommonModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {
  userType:any;
  columns: string[] = [
    'userId',
    'userName',
    'email',
    'mobileNumber',
    'createdOn',
    'accountStatus',
    'unblock',
    'userType',
  ];
  users: userregister[] = [];
  constructor(private apiService: UserService, private toaster:ToastrService) {
    var userDetail=apiService.getUserInfo();
    this.userType=userDetail?.userType;
    apiService.getUsers().subscribe({
      next: (res: userregister[]) => {
        console.log(res);
        this.users = [];  
        res.forEach((r) => this.users.push(r));
      },
    });
  }
  unblockUser(id:any ) {
    console.log(id);
    this.apiService.unblock(id).subscribe({
      next: (res:any) => {
        if (res.message == 'success') {
          this.toaster.success('User has been UNBLOCKED!', 'OK');
        } else this.toaster.error('Not Unblocked', 'OK');
      },
    });
  }
  getAccountStatus(input: any ) {
    return AccountStatus[input];
  }
  getUserType(input: any) {
    return UserType;
  }
}
