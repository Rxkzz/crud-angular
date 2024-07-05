import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AxiosService } from '../axios.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private axiosService: AxiosService, private router: Router) {}

  login() {
    this.axiosService.login(this.email, this.password).then(response => {
      console.log('Login berhasil', response);
      if (response && response.accessToken) {
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/home']);
      } else {
        this.message = 'Login failed: Access token not found';
      }
    }).catch(error => {
      console.error('Login gagal', error);
      this.message = 'Login gagal';
    });
  }
}