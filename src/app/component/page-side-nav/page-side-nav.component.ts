import { APP_ID, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { UserType } from '../../_model/user.model';
import { MatSidenavModule } from '@angular/material/sidenav';

export interface NavigationItem {
  value:string;
  link:string;
  icon: string;
}
@Component({
  selector: 'app-page-side-nav',
  standalone: true,
  imports: [SharedModule,CommonModule,MatIconModule,RouterLink, MatSidenavModule],
  templateUrl: './page-side-nav.component.html',
  styleUrls: ['./page-side-nav.component.css']
})
export class PageSideNavComponent {

  panelName: string = '';
  navItems: NavigationItem[] = [];

  constructor(private apiService: UserService, private router: Router,private toaster:ToastrService,  private cdr: ChangeDetectorRef ) {
    // apiService.userStatus.subscribe({
    //   next: (status) => {
        
    //     console.log('user satuts changed', status);
    //     if (status == 'loggedIn') {
    //       console.log("login satatus",status);

    //       //this.router.navigateByUrl('/dashboard');
          
    //       let user = this.apiService.getUserInfo();
    //       console.log("user infomartion",user);
          
    //       if (user != null) {
    //         console.log("User Type:", user.userType); 
    //         alert(user.userType);
    //         alert(UserType.ADMIN);
    //         if (user.userType == "ADMIN") {
    //           alert("called");
    //           console.log("Admin Panel Loaded");

    //           this.panelName = 'Admin Panel';
    //           // this.toaster.success('Welcome To AdminPanel');
    //           this.navItems = [
    //             { value: 'Dashboard', link: '/dashboard', icon: 'fa-gauge' },
    //             { value: 'View Books', link: '/dashboard/view-books', icon: 'fa-book' },
    //             { value: 'Maintenance', link: '/dashboard/maintenance', icon: 'fa-tools' },
    //             { value: 'Return Book', link: '/dashboard/return-book', icon: 'fa-undo' },
    //             { value: 'E-Books', link: '/dashboard/e-books', icon:'fa-book-open-reader' },
    //             { value: 'View Users', link: '/dashboard/view-users', icon: 'fa-users' },
    //             { value: 'Approval Requests', link: '/dashboard/approval-request', icon: 'fa-check' },
    //             { value: 'All Orders', link: '/dashboard/all-orders', icon: 'fa-list' },
    //             { value: 'My Orders', link: '/dashboard/my-orders', icon: 'fa-shopping-cart' },
    //           ];
    //           this.router.navigateByUrl('/dashboard');

    //         } else if (user.userType === UserType.STUDENT) {
    //           console.log("student");

    //           this.panelName = 'Student Panel';
    //           // this.toaster.success('Welcome To StudentPanel');
    //           this.navItems = [
    //             { value: 'View Books', link: '/dashboard/view-books' , icon:'fa-book' },
    //             { value: 'My Orders', link: '/dashboard/my-orders', icon:'fa-shopping-cart' },
    //             { value: 'Notification', link: '/dashboard/notification', icon:'fa-bell' },
    //             { value: 'E-Books', link: '/dashboard/e-books', icon:'fa-book-open-reader' },
    //           ];
    //           this.router.navigateByUrl('/dashboard/view-books');

    //         }
    //       }
    //     } else if (status === 'loggedOff') {
    //       this.panelName = 'Auth Panel';
    //       router.navigateByUrl('/register');
    //       this.navItems = [];
    //     }
    //   },
    // });
    apiService.userStatus.subscribe({
      next: (status) => {
        if (status == 'loggedIn') {
          router.navigateByUrl('/home');
          let user = apiService.getUserInfo();
          if (user != null) {
            if (user.userType == UserType.ADMIN) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'Dashboard', link: '/dashboard', icon: 'fa-gauge' },
                { value: 'View Books', link: '/dashboard/view-books', icon: 'fa-book' },
                { value: 'Maintenance', link: '/dashboard/maintenance', icon: 'fa-tools' },
                { value: 'Return Book', link: '/dashboard/return-book', icon: 'fa-undo' },
                { value: 'E-Books', link: '/dashboard/e-books', icon: 'fa-book-open-reader' },
                { value: 'View Users', link: '/dashboard/view-users', icon: 'fa-users' },
                { value: 'Approval Requests', link: '/dashboard/approval-request', icon: 'fa-check' },
                { value: 'All Orders', link: '/dashboard/all-orders', icon: 'fa-list' },
                { value: 'My Orders', link: '/dashboard/my-orders', icon: 'fa-shopping-cart' },
              ];
            } else if (user.userType == UserType.STUDENT) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/dashboard/view-books', icon: 'fa-book' },
                { value: 'My Orders', link: '/dashboard/my-orders', icon: 'fa-shopping-cart' },
                { value: 'Notification', link: '/dashboard/notification', icon: 'fa-bell' },
                { value: 'E-Books', link: '/dashboard/e-books', icon: 'fa-book-open-reader' },
              ];
            }
          }
        } else if (status == 'loggedOff') {
          this.panelName = 'Auth Panel';
          router.navigateByUrl('/login');
          this.navItems = [];
        }
      },
    });

  }

  }


