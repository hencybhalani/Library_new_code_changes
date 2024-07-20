import { Component } from '@angular/core';
import { AccountStatus, userregister } from '../../_model/user.model';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approval-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approval-request.component.html',
  styleUrl: './approval-request.component.css'
})
export class ApprovalRequestComponent {
  columns: string[] = [
    'userId',
    'userName',
    'email',
    'userType',
    'createdOn',
    'approve',
  ];
  users: userregister[] = [];

  constructor(private apiService: UserService, private toastr: ToastrService) {
    this.unapproveUser();
  }

  unapproveUser()
  {
    this.apiService.getUsers().subscribe({
      next: (res: userregister[]) => {
        console.log(res);
        this.users = res.filter(
          (r) => r.accountStatus == AccountStatus.UNAPPROVED
        );
      },
    });
  }
  approvebutton(userId:any, username:any, email:any | undefined){
    this.apiService.approveRequest(userId).subscribe({
           next: (res:any) => {
             if (res.message == 'approved') {
               this.toastr.success(`Approved for ${username}`, 'OK');
               this.unapproveUser();
               this.apiService.sendEmail(email).subscribe({
                next: (res) => {
                  if (res.status === "success" && res.message === "Email sent successfully") {
                    this.toastr.success(`Email sent Successfully to ${username}`, 'OK');
                  } else {
                    this.toastr.error('Failed to send email. Please try again.');
                  }
                },
               })
           } else this.toastr.error(`Not Approved by Admin`, 'OK');
           },
       });
  }
  
}
