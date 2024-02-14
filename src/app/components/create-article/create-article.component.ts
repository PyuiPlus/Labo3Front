import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscriber } from 'rxjs';
import { ArticleService } from 'src/app/Services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {

  formArticle: FormGroup = new FormGroup({})

  link: string = ""

  constructor(private fb: FormBuilder, private router: Router, private articleService : ArticleService) {
    
    this.formArticle = this.fb.group(
      {
        title: ['', [Validators.required]],
        type: ['', [Validators.required]],
        price: [0, [Validators.required]],
        description: ['']
      }
    )

      
    
  }

  submitForm(){

    if (this.formArticle.valid) {
      this.articleService.createArticle(this.formArticle.value.title, this.formArticle.value.type, this.formArticle.value.price, this.link, this.formArticle.value.description, parseInt(this.getIdUser()))
    }
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

  onChange($event: Event){
    const file = ($event.target as HTMLInputElement).files![0];
    this.convertToBase64(file)
  }


  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      this.link = d
      
    })
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file)

    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete();
    }
    filereader.onerror = (error) =>{
      subscriber.error(error)
      subscriber.complete();
    }
  }
}
