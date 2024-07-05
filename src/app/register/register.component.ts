import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { Axios } from 'axios';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    emailAddress: '',
    password: '',
    fullName: '',
    companyName: '',
    telp: '',
    salt: '',
    roleId: 0,
    roleName: ''
  };
  message: string = '';

  constructor(private axiosService: AxiosService, private router: Router) {}

  register() {
    this.axiosService.register(this.user).then(
      response => {
        console.log('Register berhasil', response);
        this.message = 'Register berhasil';
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Register gagal', error);
        this.message = 'Register gagal';
      }
    );
  }
}