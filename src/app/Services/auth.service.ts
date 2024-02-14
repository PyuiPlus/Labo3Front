import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isConnected() : boolean{
    return localStorage.getItem('token') != undefined;
  }

  sujetAObserver : Subject<boolean> = new Subject<boolean>()

  private url: string = "https://localhost:7276/api/"


  constructor(private client : HttpClient, private router : Router) 
  {

  }

  sendIsConnectedValue() {
    this.sujetAObserver.next(this.isConnected)
  }

  login(email: string, password : string){
    this.client.post(this.url+"Auth", {email,password}, {responseType : "text"}).subscribe({
      next : (token : string) => {
        localStorage.setItem("token", token)
        this.sujetAObserver.next(this.isConnected)
        this.router.navigate(['/home'])

      },
      error : (error) => console.error(error),
      complete : () => {
        
        
      console.log("Call api done")
      }
      
    });
      
    }

  logout() {
    localStorage.removeItem("token")
    this.sujetAObserver.next(this.isConnected)
    this.router.navigateByUrl("/login")
  }


  register(email : string, password : string, firstname:string, lastname:string, phone:string, birthDate: Date){
    this.client.post(this.url+"Users",{email, password, firstname, lastname, phone, birthDate}, {responseType : "text"}).subscribe({
      next : (user : string) => {
        console.log(user);
        this.router.navigate(['/login'])
      },
      error : (error) => console.error(error),
      complete : () => console.log("Call api done")
    })
  }
  }

