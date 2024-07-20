import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from "@angular/material/icon";
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../_service/breadcrumb.service';
import { filter } from 'rxjs';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [SharedModule,MatIconModule,RouterLink,MaterialModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {
  loggedIn: boolean = false;
  name: string = '';
  breadcrumb: string | undefined;
  todayDate!: string;


  constructor(
    private apiService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    apiService.userStatus.subscribe({
      next: (res) => {
        if (res === 'loggedIn') {
          this.loggedIn = true;
          let user = apiService.getUserInfo()!;
          this.name = `${user.username} `;
        } else {
          this.loggedIn = false;
          this.name = '';
        }
      },
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.todayDate = `${year}-${month}-${day}`;
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });

    this.breadcrumbService.currentBreadcrumb.subscribe(breadcrumb => {
      this.breadcrumb = breadcrumb;
    });
  }
  updateBreadcrumb() {
    const urlSegments = this.router.routerState.snapshot.url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];
    const secondLastSegment = urlSegments[urlSegments.length - 2];

    if (secondLastSegment === 'e-book-deatils') {
      this.breadcrumbService.setBreadcrumb('E-Book Details');
    } else {
      this.breadcrumbService.setBreadcrumb(lastSegment.replace(/-/g, ' '));
    }
  } 

  logout() {
    this.apiService.logOut();
    this.toaster.success('Logout Successfully');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/dashboard/profile'); // Navigate to the profile route
  }
}
