import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/app/Services/agenda.service';
import { ArticleService } from 'src/app/Services/article.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent {
  
  article! : Article
  formAgenda: FormGroup = new FormGroup({})

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private fb : FormBuilder,private agendaService: AgendaService) {
    
    this.formAgenda = this.fb.group(
      {
        startDate: ["", Validators.required],
        endDate: ["", Validators.required]
      }
    )
  }

  ngOnInit(){
    this.articleService.getById(this.route.snapshot.paramMap.get("id")).subscribe({
      next:(data : Article)=> this.article = data
    })
  }

  submitForm(){
    if (this.formAgenda.valid) {
      this.agendaService.createAgenda(this.formAgenda.value.startDate, this.formAgenda.value.endDate, this.article.id)
    }
  }
}
