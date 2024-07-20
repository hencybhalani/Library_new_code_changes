import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavigationEnd, Route, RouterModule } from '@angular/router';
import { PageSideNavComponent } from '../page-side-nav/page-side-nav.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { BookStoreComponent } from '../../books/book-store/book-store.component';
import { UserOrdersComponent } from '../../users/user-orders/user-orders.component';
import { BreadcrumbService } from '../../_service/breadcrumb.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SharedModule,RouterModule,PageSideNavComponent,PageHeaderComponent,BookStoreComponent,UserOrdersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  breadcrumb: string | undefined;

  constructor(private router: Router, private breadcrumbService: BreadcrumbService) { }

  
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.updateBreadcrumb();
    });

    this.breadcrumbService.currentBreadcrumb.subscribe(breadcrumb => {
      this.breadcrumb = breadcrumb;
    });
  }

  updateBreadcrumb() {
    const currentRoute = this.router.url.split('/').pop();
    if (currentRoute) {
      this.breadcrumbService.setBreadcrumb(currentRoute.replace(/-/g, ' '));
    }
  }
  }

