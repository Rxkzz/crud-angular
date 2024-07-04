// src/app/login/login.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  validationErrors: Array<any> = [];

  constructor(@Inject(UserAuthService) public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/show');
    }
  }

  loginAction() {
    this.isSubmitting = true;
    let payload = {
      email: this.email,
      password: this.password,
    };

    this.userAuthService.login(payload)
      .then((response: any) => {
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          this.router.navigateByUrl('/show');
          return response.data;
        } else {
          throw new Error('Data not found');
        }
      }).catch(error => {
        this.isSubmitting = false;
        if (error.response && error.response.data && error.response.data.errors) {
          this.validationErrors = error.response.data.errors;
        } else if (error.response && error.response.data && error.response.data.error) {
          this.validationErrors = [error.response.data.error];
        }
        return error;
      });
  }
}
