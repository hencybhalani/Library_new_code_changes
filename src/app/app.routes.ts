import { Routes,RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { ConfirmotpComponent } from './auth/confirmotp/confirmotp.component';
import { LayoutComponent } from './component/layout/layout.component';


import { AuthGuard } from './_service/auth.service';
import { RegisterComponent } from './auth/register/register.component';


export const routes: Routes = [
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'confirmotp',
        component:ConfirmotpComponent
    },
    // {
    //     path:'dashboard',
    //     component:LayoutComponent,
    // },
    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate:[AuthGuard],
        children: [
          {
            path: 'view-books',
            loadComponent:()=>import('../app/books/book-store/book-store.component').then(m=>m.BookStoreComponent),
            canActivate:[AuthGuard]
          },
          {
            path: 'my-orders',
            loadComponent: () => import('../app/users/user-orders/user-orders.component').then(m=>m.UserOrdersComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'profile',
            loadComponent:() => import('../app/users/profile/profile.component').then(m=>m.ProfileComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'maintenance',
            loadComponent:() => import('../app/books/maintenance/maintenance.component').then(m=>m.MaintenanceComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'return-book',
            loadComponent:() => import('../app/books/return-book/return-book.component').then(m=>m.ReturnBookComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'approval-request',
            loadComponent:() => import('../app/users/approval-request/approval-request.component').then(m=>m.ApprovalRequestComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'all-orders',
            loadComponent:() => import('../app/users/all-orders/all-orders.component').then(m=>m.AllOrdersComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'view-users',
            loadComponent:() => import('../app/users/view-users/view-users.component').then(m=>m.ViewUsersComponent),
            canActivate:[AuthGuard]
          },
          {
            path:'notification',
            loadComponent:() => import('../app/users/notification/notification.component').then(m=>m.NotificationComponent),
            canActivate:[AuthGuard]
          },
        
          // {
          //   path:'e-books',
          //   loadComponent:() => import('../app/books/e-book/e-book.component').then(m=>m.EBookComponent),
          //   canActivate:[AuthGuard]
          // },
          // {
          //    path:'e-book-deatils/:eid',
          //    loadComponent:()=> import('../app/books/e-book-details/e-book-details.component').then(m=>m.EBookDetailsComponent),
          //    canActivate:[AuthGuard]
          // },
          // {
          //   path:'addebook',
          //   loadComponent:()=> import('../app/books/e-book-modal/e-book-modal.component').then(m=>m.EBookModalComponent),
          //   canActivate:[AuthGuard]
          // },
          {
            path:'',
            loadComponent:() => import('../app/users/dashboard/dashboard.component').then(m=>m.DashboardComponent),
            canActivate:[AuthGuard]
            
          },
          {
            path: 'dashboard',
            redirectTo: 'view-books',
            pathMatch: 'full',
            
          }
        ]
      },
    {
        path:'**',
        component:PagenotfoundComponent
    }
    
    
    


];

