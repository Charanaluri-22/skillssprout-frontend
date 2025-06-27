import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; 
  loginUser: Login = {
    email: '',
    password: ''
  }
  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly service: AuthService,
    private readonly userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  login() {
    if (this.loginForm.valid) {
      this.loginUser = this.loginForm.value;
      this.service.login(this.loginUser).subscribe((data) => {
        this.userStore.setUser(data);
        this.router.navigate(['/home']);
      },
        (error) => {
          this.errorMessage = error.error;
        });
    }
  }
}
