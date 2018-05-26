import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
  providers: [ArticleService]
})
export class ArticleAddComponent  {

  articles = [];
  articlesHowMany = []; // Articles user requested, via button click
  titleToDisplay: string;


  /* ====================================== */
  /* === CREATE ARTICLE FORM stuff .... === */
  /* ====================================== */
  articleIJustCreatedBoolean = true; // << temporary  // false;
  articleIJustCreatedDisplay: any; // screw it = { articlePhotos: 'any' };

  photosFilenamesArray = []; // ORIGINAL Filenames.
  // Populated by onPhotosFileChangePostFiles()
  // e.g. AndToThinkWeAl…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg

  photosRenamedFilenamesArray = []; // After Multer on Server
  // Called from onPhotosFileChangePostFiles() which calls myServiceFilesUpload()
  // e.g. sometimes__1525980207472_AndToThinkWeAl…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg

  myFormFieldsData = new FormData(); // used by both TEMPLATE and REACTIVE forms "prepareToAdd...()"

  addArticleForm: FormGroup; // REACTIVE Form (not Template Form)

  loadingPhotos = false; // https://nehalist.io/uploading-files-in-angular2/
  /* ====================================== */
  /* ====================================== */


  constructor(private _myArticleService: ArticleService) {

  }

  ngOnInit() {

    this._myArticleService.listArticles().subscribe(
        (whatIGot: any[]) => {
          this.articles = whatIGot;
        }
    );

    this.addArticleForm = new FormGroup({
      articleUrl_formControlName: new FormControl(null, Validators.required),
      'articleTitle_formControlName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      articlePhotos_formControlName: new FormControl(null, Validators.required)
    });


  }

}
