import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {

}
