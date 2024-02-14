import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private client: HttpClient, private router: Router) 
  { 

  }

  private url: string = "https://localhost:7276/api/"


  getAll(id : string){
    return this.client.get
  }

  createAgenda(startDate: Date, endDate: Date, articleId: number){
    this.client.post(this.url+"Agenda", {startDate, endDate, articleId}, {responseType : "text"}).subscribe({
      next : (agenda : string) =>{
        console.log(agenda);
        window.location.reload()
        },
        error : (error) => console.error(error),
        complete : () => console.log("Call api done")
    })
  }

}
