import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../_service/UserService';
import { UserType } from '../../_model/user.model';


export interface TableElement {
  name: string;
  value: string;
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  columns: string[] = ['name', 'value'];
  dataSource: TableElement[] = [];
  constructor(private apiService: UserService) {
    let user = apiService.getUserInfo()!;
    this.dataSource = [
      { name: "Name", value:  `${user.username}` },
      { name: "Email", value: `${user.email}` },
      { name: "Mobile", value: `${user.phone}` },
      { name: "Account Status", value: `${user.accountStatus}` },
      { name: "Created On", value: `${user.createdOn}` },
      { name: "Type", value: user.userType !== undefined ? `${UserType[user.userType]}` : 'Unknown' },
    ];
  }

}
