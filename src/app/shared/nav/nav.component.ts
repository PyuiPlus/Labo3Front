import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  user? : User

  isConnected! : boolean
  constructor(private authService : AuthService, private userService: UserService, private route: ActivatedRoute){}

  ngOnInit() {
    this.authService.sujetAObserver.subscribe({
      next : (data : boolean) => this.isConnected = data
    })
    this.authService.sendIsConnectedValue()

    this.userService.getById(this.getIdUser()).subscribe({
      next:(data : User) => this.user = data
    })
      
  }

  logout(){
    this.authService.logout()
  }

  getIdUser(){
    const token = localStorage.getItem('token')
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    } else {
        return null;
    }
  }

}
