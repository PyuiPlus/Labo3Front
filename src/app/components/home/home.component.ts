import { Component } from '@angular/core';
import { ArticleService } from 'src/app/Services/article.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  articleList! : Article[]
  constructor(private articleService : ArticleService) {}

  ngOnInit(){
    this.articleService.getAll().subscribe({
      next:(data : Article[])=> this.articleList = data
    })
  }
}
