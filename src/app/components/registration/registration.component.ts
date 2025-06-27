import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {Modal} from 'bootstrap';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerUser: User = {
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    role: '',
    customerName: '',
    information: ''
  };
  confirmPassword: string = '';
  errorMessage:string;

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  register(form: NgForm) {
    if (form.valid && this.registerUser.password === this.confirmPassword) {
      this.authService.register(this.registerUser).subscribe(
        (response) => {
            const successModal = new Modal(document.getElementById('successModal'));
            successModal.show();
          form.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          form.reset();
          if (error.status === 409) {
            this.errorMessage = 'User already exists. Please try a different email or username.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
          const errorModal = new Modal(document.getElementById('errorModal'));
          errorModal.show();
          this.router.navigate(['/login']);
        }
      );
    }
  }
}
