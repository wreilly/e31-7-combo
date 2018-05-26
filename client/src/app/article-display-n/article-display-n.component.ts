import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service'

@Component({
  selector: 'app-article-display-n',
  templateUrl: './article-display-n.component.html',
  styleUrls: ['./article-display-n.component.css'],
    providers: [ArticleService]
})
export class ArticleDisplayNComponent implements OnInit {

  titleToDisplay: string = 'display N titleToDisplay hard-coded for now';
  articlesHowMany = []; //  << How I did init on original article-list.component.ts (worked)
    //  >> This did work, to init:  // articlesHowMany:[string] =['']; // init

  constructor(private _myArticleService: ArticleService) { }

  ngOnInit() {
  }

  getAllArticlesOnClick(): void {
    this._myArticleService.listArticles()
        .subscribe((whatIGot: any[]) => {
              this.articlesHowMany = whatIGot;
            }
        );
  }

  clearAllArticlesOnClick(): void {
    this.articlesHowMany = []; // re-init
  }


  getThisManyArticles(numberArticlesPassedIn) {
    /* VALIDATION (however humble)
     - EMPTY INPUT BOX:
     It is an EMPTY STRING "" - when you click submit on empty input.
     - USER TYPES IN 0 or -1
     */

    if (numberArticlesPassedIn.value === "" || numberArticlesPassedIn.value < 1) {
      console.log('Invalid number of articles requested.') // TODO Flash msg or similar
    } else {
      this._myArticleService.listFirstNArticles(numberArticlesPassedIn.value)
          .subscribe(
              (whatIGot: any[]) => {
                this.articlesHowMany = whatIGot;
              }
          );
    }
  }

  // As seen in article-list.component.ts, "parent" container to <app-article>
    // Here we have article-display-n.component.ts doing same thing (at least temporarily),
    //    till/if we can figure out how to pass a parameter to the <app-article-list> component,
    //    to tell it How Many to display, on init... T.B.D. TODO
    runDisplayTitle(articleTitlePassedIn) {
        this.titleToDisplay = articleTitlePassedIn;
    }


}
