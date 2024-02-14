import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/Services/article.service';
import { UserService } from 'src/app/Services/user.service';
import { Article } from 'src/app/models/article.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent {

  user? : User;
  articles? : Article[]

  constructor(private userService: UserService, private route: ActivatedRoute, private articleService : ArticleService) {
    
    
  }

  ngOnInit(){
    this.userService.getById(this.route.snapshot.paramMap.get("id")).subscribe({
      next:(data : User) => this.user = data
    })

    this.articleService.getAllByUserId(this.route.snapshot.paramMap.get("id")).subscribe({
      next:(data : Article[]) => this.articles = data
    })
  }


}
