import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HomeComponent} from "./home/home.component";
import {ArticleListComponent} from "./article-list/article-list.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleAddComponent } from './article-add/article-add.component';
import { ArticleDisplayNComponent } from './article-display-n/article-display-n.component'


/* ORIG. WAS. WORKS. WORKED. BACKUP. BAK. ETC. CHEERS.
 const appRoutes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'articles', component: ArticleAddComponent }, // << Used to be ArticleListComponent, fwiw
 { path: 'articles/:article_id', component: ArticleDetailComponent }
 ];
 */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles/add', component: ArticleAddComponent },
  { path: 'articles/displayn', component: ArticleDisplayNComponent },
  { path: 'articles/:article_id', component: ArticleDetailComponent },
  { path: 'articles/:article_id/edit', component: ArticleAddComponent }
/* TODO Next up ... << Actually, no. "Plan A" is to (re)-use ArticleAddComponent for both ADD and for EDIT. Cheers
  { path: 'articles/:article_id/edit', component: ArticleEditComponent }, << NO, hoping to NOT make a separate "Article*Edit*Component. We shall see.
*/
];
/* NEW. Article Detail Page URL is CHANGING.

But we are KEEPING the same route/path above.
We'll just treat/handle the "/:article_id" parameter string in a new way.

See /src/app/article.service.ts
getArticle(idPassedIn) {}

WAS: http://0.0.0.0:4206/articles/5af746cea7008520ae732e2c

IS NOW: http://0.0.0.0:4206/articles/trump-fuel-efficiency-rollbacks--aid--5af746cea7008520ae732e2c

See also notes in /src/app/article-detail/article-detail.component.ts

See also notes in /src/app/article/article.component.ts,
where the Client App links are created,
to navigate from the Article Component in the List,
down to the Article Detail Component.
 */

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HeaderComponent,
    FooterComponent,
      HomeComponent,
      ArticleListComponent,
      ArticleDetailComponent,
      ArticleAddComponent,
      ArticleDisplayNComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
