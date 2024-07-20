import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PageFooterComponent } from './component/page-footer/page-footer.component';
import { PageSideNavComponent } from './component/page-side-nav/page-side-nav.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { ConfirmotpComponent } from './auth/confirmotp/confirmotp.component';
import { LayoutComponent } from './component/layout/layout.component';
import { UserService } from './_service/UserService';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookStoreComponent } from './books/book-store/book-store.component';
import { UserOrdersComponent } from './users/user-orders/user-orders.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MaintenanceComponent } from './books/maintenance/maintenance.component';
import { ReturnBookComponent } from './books/return-book/return-book.component';
import { ApprovalRequestComponent } from './users/approval-request/approval-request.component';
import { AllOrdersComponent } from './users/all-orders/all-orders.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { NotificationComponent } from './users/notification/notification.component';
// import { EBookComponent } from './books/e-book/e-book.component';
// import { EBookDetailsComponent } from './books/e-book-details/e-book-details.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterModule, SharedModule,PageHeaderComponent,PageFooterComponent,PageSideNavComponent,PagenotfoundComponent,ConfirmotpComponent,RegisterComponent,LayoutComponent,BookStoreComponent,UserOrdersComponent,ProfileComponent,MaintenanceComponent,ReturnBookComponent,ApprovalRequestComponent,AllOrdersComponent,ViewUsersComponent,NotificationComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Authapp';
  constructor(private apiService: UserService) {}

  ngOnInit(): void {
    
    let status = this.apiService.isLoggedIn() ? 'loggedIn' : 'loggedOff';
    this.apiService.userStatus.next(status);
  }
}





