import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client : HttpClient, private router: Router) 
  {
  }

  private url: string = "https://localhost:7276/api/"

  getById(id : string | null){
    return this.client.get<User>(this.url +"Users/"+id)
  }
}