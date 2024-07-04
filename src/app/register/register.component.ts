// src/app/register/register.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isSubmitting: boolean = false;
  validationErrors: any = [];

  constructor(@Inject(UserAuthService) public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/show');
    }
  }

  registerAction() {
    this.isSubmitting = true;
    let payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.userAuthService.register(payload)
      .then((response: any) => {
        if (response && response.data) {
          localStorage.setItem('token', response.data.token);
          this.router.navigateByUrl('/show');
          return response.data;
        }
      }).catch(error => {
        this.isSubmitting = false;
        if (error.response && error.response.data && error.response.data.errors) {
          this.validationErrors = error.response.data.errors;
        }
        return error;
      });
  }
}
