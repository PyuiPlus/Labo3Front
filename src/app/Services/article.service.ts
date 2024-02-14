import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../models/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private client : HttpClient, private router: Router) 
  {

  }

  private url: string = "https://localhost:7276/api/"


  getAll(){
    return this.client.get<Article[]>(this.url+"Article")
  }

  createArticle(title :string,type : string,price: number, link: string, description :string, usersId : number){
    
    this.client.post(this.url+"Article",{title, type, price, link, description, usersId }, {responseType : "text"}).subscribe({
      next : (article : string) =>{
        console.log(article);
        this.router.navigate(['/home'])
        },
        error : (error) => console.error(error),
        complete : () => console.log("Call api done")
    })
  }

  getById(id : string | null) : Observable<Article> {
    console.log(this.client.get(this.url +"Article/"+id));
    
    return this.client.get<Article>(this.url +"Article/"+ id)
  }

  getAllByUserId(id : string | null){
    return this.client.get<Article[]>(this.url+"Article/all/"+id)

  }
}
