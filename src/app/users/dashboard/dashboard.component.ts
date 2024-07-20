import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/UserService';
import { AccountStatus, Book, userregister } from '../../_model/user.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'; 
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';
import { SignalRService } from '../../_service/signalR.service';
echarts.use(
  [PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]
);


@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
   // Changed styleUrl to styleUrls
})

export class DashboardComponent implements OnInit {
  users: userregister[] = [];
  userCount:any;
  books: Book[] = [];
  dashboard : any[] =[];
  totalBooksCount:any;
  dashboardcount:any;
  ordersWithPendingReturns: any[] = [];
  totalOrdersCount:any;
  usersWithPendingReturns: any[] = [];
  displayUser: any[] = [];
  totalUsersWithPendingReturns:any;
  showAllUsers: boolean = false;
  showAllUsers1: boolean = false;
  showAllUsers2: boolean = false;
  pieChartInstance: echarts.ECharts | undefined;
  hubConnection: HubConnection | undefined; 


  constructor(private apiService: UserService, private toaster: ToastrService,private signalRService: SignalRService) {
    
  }

  ngOnInit() {

    this.signalRService.startConnection();
    this.signalRService.addReceiveStudentListListener(this.updateStudentList);
    this.signalRService.addReceiveBookListListener (this.updateBookList);
    this.signalRService.addReceiveDashboardCountsListener(this.updatedashboardlist);
    this.signalRService.addReceiveOrderBookPendingListListener(this.updatedOrderPendingBook);
    this.fetchInitialUsers();
    this.fetchdashboardcount();
    this.fetchInitialBook();
    this.fetchInitialBookIssued();
    this.fetchInitialBookReturn();
    this.fetchOrderList();

  }

      // Start the connection
    //i want set orderpending deatils...
      private updatedOrderPendingBook = (data: any[]): void => {
        console.log('Received updated pending order list via SignalR:', data);
        this.ordersWithPendingReturns = data;
        // this.initPieChart();
      }
      private updateStudentList = (students: userregister[]): void => {
        console.log('Received updated student list via SignalR:', students);
        this.users = students;
        // this.initPieChart();
      }
      private updateBookList = (book: Book[]): void => {
        console.log('Received updated book list via SignalR:', book);
        this.books = book;
        this.totalBooksCount = this.books.length;
        // this.initPieChart();
      }
      private updatedashboardlist = (data: any[]): void => {
        console.log('Received updated dashboard list via SignalR:', data);
        this.dashboard = data;
        console.log('dashboard',this.dashboard);
        this.dashboardcount = this.dashboard.length;
        // this.initPieChart();
        console.log("dashboatrd count via signalR",this.dashboardcount);

      }
      private fetchInitialUsers(): void {
        this.apiService.getUsers().subscribe({
          next: (res: userregister[]) => {
            console.log('Fetched users using API:', res);
            this.users = res;
            this.userCount = this.users.length;
            // this.initPieChart();
            console.log('userr',this.userCount);
          },
          error: (err) => {
            console.error('Error fetching users:', err);
            this.toaster.error('Failed to fetch users');
          },
        });
      }
    
      private fetchdashboardcount(): void {
        this.apiService.getDashboardCounts().subscribe({
          next: (res: any[]) => {
            console.log('Fetched dashboard using API:', res);
            this.dashboard = res;
            this.dashboardcount = this.dashboard.length;
            // this.initPieChart();
            console.log('Total dshboard', this.dashboardcount);

          },
          error: (err:any) => {
            console.error('Error fetching users:', err);
            this.toaster.error('Failed to fetch users');
          },
        });
      }
    
      private fetchInitialBook(): void {
    this.apiService.getBooks().subscribe({
      next: (res: Book[]) => {
        console.log('Fetched books:', res);
        this.books = res;
        this.totalBooksCount = this.books.length;
        // this.initPieChart();
        console.log('Total books:', this.totalBooksCount);
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.toaster.error('Failed to fetch books');
      },
    });
  }

  private fetchInitialBookIssued(): void {
    this.apiService.GetOrdersList().subscribe({
      next: (data: any[]) => {
        console.log('Fetched orders:', data);
        this.ordersWithPendingReturns = data;
        this.totalOrdersCount = this.ordersWithPendingReturns.length;
        // this.initPieChart();
        this.ordersWithPendingReturns = data.filter((o) => !o.returned);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.toaster.error('Failed to fetch orders');
      },
    });
  }

  private fetchInitialBookReturn(): void {
    this.apiService.GetOrderPendingUser().subscribe({
      next: (data: any[]) => {
        console.log('Fetched users with pending returns:', data);
        this.usersWithPendingReturns = data;
        this.totalUsersWithPendingReturns = this.usersWithPendingReturns.length;
        // this.initPieChart();
      },
      error: (err) => {
        console.error('Error fetching users with pending returns:', err);
        this.toaster.error('Failed to fetch users with pending returns');
      },
    });
  }
  private fetchOrderList(): void {
    this.apiService.GetOrdersList().subscribe({
      next: (data: any[]) => {
        console.log('Fetched orders12:', data);
        this.displayUser = data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.toaster.error('Failed to fetch orders');
      },
    });

    // this.initPieChart();
    // Initialize the pie chart
  }
  

  toggleShowAllUsers() {
    this.showAllUsers = !this.showAllUsers;
  }

  toggleShowAllUsers1() {
    this.showAllUsers1 = !this.showAllUsers1;
  }

  toggleShowAllUsers2() {
    this.showAllUsers2 = !this.showAllUsers2;
  }

  getAccountStatus(input: any) {
    return AccountStatus[input];
  }

  getFineToPay(order: any) {
    return this.apiService.getFine1(order);
  }

  initPieChart() {
    this.pieChartInstance = echarts.init(document.getElementById('pieChart') as HTMLDivElement);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['Total Students', 'Books Available', 'Books Issued', 'Books Due to Return']
      },
      series: [
        {
          name: 'Summary',
          type: 'pie',
          radius: '50%',
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.userCount, name: 'Total Students' },
            { value: this.totalBooksCount, name: 'Books Available' },
            { value: this.totalOrdersCount, name: 'Books Issued' },
            { value: this.totalUsersWithPendingReturns, name: 'Books Due to Return' }
          ]
        }
      ]
    };

    // Set options and render the chart
    this.pieChartInstance.setOption(option);
  }
}



