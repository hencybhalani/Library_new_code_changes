import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order, UserType, userregister } from '../_model/user.model';
import { Observable, Subject } from 'rxjs';
import { response } from 'express';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  userStatus: Subject<string> = new Subject();

  constructor(private jwt: JwtHelperService) { }

  baseUrl = environment.apiUrL;

  userregistration(data: userregister): Observable<any> {
    return this.http.post(`${this.baseUrl}home`,data);
  }
  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}home/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}home/validate-otp`, { email, otp });
  }
  login(email:string, password:string): Observable<any> {
    return this.http.post(`${this.baseUrl}home/Login`, {
      email:email,
      password:password
   });

}
isLoggedIn(): boolean {
  const token = localStorage.getItem('access_token');
  return token != null && !this.jwt.isTokenExpired(token);
}

getUserInfo(): userregister | null {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  const decodedToken = this.jwt.decodeToken(token);
  if (!decodedToken) return null;

  const user: userregister = {
    id: decodedToken.id,
    username: decodedToken.username,
    email: decodedToken.email,
    phone: decodedToken.phone,
    department: decodedToken.department,
    userType: decodedToken.userType as UserType,
    accountStatus: decodedToken.accountStatus,
    createdOn: decodedToken.createdOn,
    password: '',
  };
  return user;
}

logOut() {
  localStorage.removeItem('access_token');
  this.userStatus.next('loggedOff');
}
getDashboardCounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}home/getdashboardcount`);
  }

  approveRequest(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}home/ApproveRequest`, {
      params: { userId: userId.toString() }
    });
  }

  ReturnBook(userId: number, bookId: number, fine: number): Observable<any> {
    return this.http.get(`${this.baseUrl}home/ReturnBook`, {
      params: { userId: userId.toString(), bookId: bookId.toString(), fine: fine.toString() }
    });
  }

  ReturnBookWithFine(userId: number, bookId: number, fine: number): Observable<any> {
    return this.http.put(`${this.baseUrl}home/ReturnBookWithFine`, {
      userId: userId,
      bookId: bookId,
      fine: fine
    });
  }

  getFine(order: Order) {
    let today = new Date();
    let orderDate = new Date(Date.parse(order.OrderDate));
    orderDate.setDate(orderDate.getDate() + 10);
    if (orderDate.getTime() < today.getTime()) {
      var diff = today.getTime() - orderDate.getTime();
      let days = Math.floor(diff / (1000 * 86400));
      return days * 50;
    }
    return 0;
  }

  getFine1(order: Order) {
    let today = new Date();
    let orderDate = new Date(Date.parse(order.OrderDate));
    orderDate.setDate(orderDate.getDate() + 10);
    if (orderDate.getTime() < today.getTime()) {
      var diff = today.getTime() - orderDate.getTime();
      let days = Math.floor(diff / (1000 * 86400));
      return days * 50;
    }
    return 0;
  }

  deleteBook(book_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}home/book/${book_id}`);
  }

  addNewCategory(bc: any): Observable<any> {
    return this.http.post(`${this.baseUrl}home/addNewCategory`, bc);
  }

  addBook(b: any): Observable<any> {
    return this.http.post(`${this.baseUrl}home/addNewBook`, b);
  }

  orderBook(ob: any): Observable<any> {
    return this.http.post(`${this.baseUrl}home/getorderbook`, ob);
  }

  GetOrdersOFUser (userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}home/GetOrdersOFUser?${userId}`) 
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}home/getuserlist`);
  }

  GetOrdersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}home/getOrderList`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}home/getCategoryList`);
  }

  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}home/getBooks`);
  }

  addUser(user:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}home/adduser`, user);
  }

  // Get user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}home/GetuserbyId/${id}`);
  }

  // Activate user
  unblock(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}home/ActivateUser/${id}`);
  }

  

 
 

  // Send email
  sendEmail(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}home/send-Email`, request);
  }


  // Get pending returns
  GetOrderPendingUser(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}home/getpendingreturn`);
  }

  // Send email for pending returns
  sendEmailtoUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}home/SendEmailForPendingReturns`);
  }

  // Block users
  blockedUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}home/BlockUsers`);
  }
  getEbookListById(id:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Ebook/EBookDeatlsbyId/${id}`);
  }
}