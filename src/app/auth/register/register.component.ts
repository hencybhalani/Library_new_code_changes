

import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { userregister } from '../../_model/user.model';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from '../../_service/signalR.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  _regform: FormGroup;
  _loginform: FormGroup;
 _response : any;
 isLoading = false;
  constructor(private builder: FormBuilder , private service:UserService, private toaster:ToastrService,private router:Router,private signalr : SignalRService) {
    // Define the form group with validation
    this._regform = this.builder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      department: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },{ validator: this.passwordMatchValidator });

    this._loginform = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return control ? !control.valid && control.touched : false;
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { mismatch: true };
  }
  register(){
    if (this._regform.valid) {
      let _obj: userregister = {
        username: this._regform.value.username as string,
        email: this._regform.value.email as string,
        phone: this._regform.value.phone as string,
        department: this._regform.value.department as string,
        password: this._regform.value.password as string,
      };
      
       this.isLoading = true;
       this.service.sendOtp(_obj.email).subscribe({
        next: (response) => {
          this.isLoading = false;

          console.log('OTP sent successfully:', response);
          this.toaster.success('OTP sent successfully.'

          );
          // Navigate to the confirm OTP page with user data
          this.router.navigate(['/confirmotp'], { state: { userData: _obj } });
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Failed to send OTP:', err);
          this.toaster.error('Failed to send OTP. Please try again.' + err.message);
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this._regform.controls).forEach(field => {
        const control = this._regform.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
  
  login() {
    if (this._loginform.valid) {
      const email = this._loginform.value.email;
      const password = this._loginform.value.password;  

      this.service.login(email, password).subscribe({
        next: (response: any) => {
          if (response.message === 'not found') {
            this.toaster.error('Credentials are invalid!', 'OK');
          } else if (response.message === 'unapproved') {
            this.toaster.error('Your Account is not approved by Admin!', 'OK');
          } else {
            console.log(response);
            localStorage.setItem('access_token', response);
            this.service.userStatus.next('loggedIn');
           this.router.navigateByUrl('/dashboard');
          }
        },
        error: (err) => {
          console.error('Failed to send:', err);
          this.toaster.error('Failed to send.' + err.message);
        }
      });
    } else {
      Object.keys(this._loginform.controls).forEach(field => {
        const control = this._loginform.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }


  @ViewChild('container') container?: ElementRef;
  @ViewChild('overlayBtn') overlayBtn?: ElementRef;

  ngAfterViewInit(): void {
    console.log('container:', this.container);
    console.log('overlayBtn:', this.overlayBtn);

    if (this.container?.nativeElement && this.overlayBtn?.nativeElement) {
      const container = this.container.nativeElement;
      const overlayBtn = this.overlayBtn.nativeElement;

      overlayBtn.addEventListener('click', () => {
        container.classList.toggle('right-panel-active');

        overlayBtn.classList.remove('btnScaled');
        window.requestAnimationFrame(() => {
          overlayBtn.classList.add('btnScaled');
        });
      });

      // Add click event listeners to the buttons in the overlay panels
      const signInButton = container.querySelector('.overlay-panel.overlay-left button');
      const signUpButton = container.querySelector('.overlay-panel.overlay-right button');

      if (signInButton) {
        signInButton.addEventListener('click', () => {
          container.classList.remove('right-panel-active');
        });
      }

      if (signUpButton) {
        signUpButton.addEventListener('click', () => {
          container.classList.add('right-panel-active');
        });
      }
    } else {
      console.error('Container or overlay button not found');
    }
  }
}
