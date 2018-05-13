import { Component, Input } from '@angular/core';
import { apiUrlStubInService, imgUrlStubInService, mongodbCollection, gitRepo } from '../article.service'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  apiUrlStubInFooter = apiUrlStubInService;
  imgUrlStubInFooter = imgUrlStubInService;
  mongodbCollectionInFooter = mongodbCollection;
  gitRepoInFooter = gitRepo;
  @Input() copyrightYearInFooter;

  constructor() { }
}
