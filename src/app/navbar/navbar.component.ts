import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user!:User
 
  constructor(public userAuthService: UserAuthService, private router: Router) {}
 
  ngOnInit(): void {
   if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.router.navigateByUrl('/')
    }else {
      this.userAuthService.getUser().then(({data})=>{
        this.user = data;
      })
    }
  }
 
  logoutAction () {
    this.userAuthService.logout().then(()=>{
      localStorage.setItem('token', "")
      this.router.navigateByUrl('/')
    }).catch(()=>{
      localStorage.setItem('token', "")
      this.router.navigateByUrl('/')
    })
   
  }
}

