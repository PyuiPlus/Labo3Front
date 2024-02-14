import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';

const routes: Routes = [
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path:'', redirectTo:"home", pathMatch:"full"},
  {path: 'article_creation', component:CreateArticleComponent},
  {path: 'article/:id', component:ArticleDetailsComponent},
  {path: 'user/:id', component:DetailsUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
