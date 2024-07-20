import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private connectionStarted: boolean = false;



  constructor() {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5132/libraryhub`)
      .build();
      this.hubConnection.start().then(() => console.log("Hub Connected..."));
      this.hubConnection.on('ReceiveDashboardCounts',(item :any[]) => {
        console.log(item);  
      });
      this.hubConnection.on('ReceiveStudentList',(item :any[]) => {
        console.log(item);  
      });
      this.startConnection();

  }


  public startConnection() {
    if (this.hubConnection.state === HubConnectionState.Disconnected) {
      this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR connection started');
          this.connectionStarted = true;
        })
        .catch(err => {
          console.error('Error starting SignalR connection:', err);
          setTimeout(() => this.startConnection(), 5000); // Retry connection after 5 seconds
        });
        
    } else {
      console.log('SignalR connection already started');
    }
  }

  public addReceiveStudentListListener = (callback: (students: any[]) => void) => {
    this.hubConnection.on('ReceiveStudentList', callback);
  }
  public addReceiveBookListListener = (callback: (book: any[]) => void) => {
    this.hubConnection.on('ReceiveBookList', callback);
  }
  public addReceiveOrderListListener = (callback: (bookOrder: any[]) => void) => {
    this.hubConnection.on('ReceiveOrderList', callback);
  }
  public addReceiveOrderReturnListListener = (callback: (bookReturn: any[]) => void) => {
    this.hubConnection.on('ReceivePendingReturns', callback);
  }
  public addReceiveOrderBookPendingListListener = (callback: (bookReturn: any[]) => void) => {
    this.hubConnection.on('ReceiveOrderList', callback);
  }




  public addReceiveDashboardCountsListener = (callback: (data: any[]) => void) => {
    this.hubConnection.on('ReceiveDashboardCounts', callback);
  }
}
