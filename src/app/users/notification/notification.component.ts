import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../_service/notification.service';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [SharedModule,CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notificationMessage: string = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.currentMessage.subscribe(message => {
      this.notificationMessage = message;
      console.log("hello"+this.notificationMessage);
    });
  }
}
