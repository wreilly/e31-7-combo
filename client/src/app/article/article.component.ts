import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { apiUrlStubInService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css' ]

})
export class ArticleComponent implements OnInit {

  @Input('articleToSendDown') articleHere;

  apiUrlStubInArticle = apiUrlStubInService;
  // i.e., http://0.0.0.0:8089/api/v1/articles/

  @Output('myEventEmitterSendTitleAlias') myEventEmitterSendTitle = new EventEmitter();

  articleApiUrlWithId = '';
  // e.g., "http://0.0.0.0:8089/api/v1/articles/5ab99ee11459a61b106a55ff"

  constructor() { }

  ngOnInit() {

    this.articleApiUrlWithId = this.apiUrlStubInArticle + this.articleHere._id;

  }

  sendTitleToParent() {
    this.myEventEmitterSendTitle.emit(this.articleHere.articleTitle);
  }

}
