import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService, imgUrlStubInService } from '../article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
  providers: [ArticleService]
})
export class ArticleAddComponent  {

  /* **************
   ** NO LONGER GO GET ARTICLES, FROM HERE, in Parent <app-article-add>
   articles = [];
*/

/* Not Used here in <app-article-add>
  articlesHowMany = []; // Articles user requested, via button click
*/
/* */
  titleToDisplay: string; // Not used either. Maybe we will (for the h. of it), on the "Article Just Added" emit button. y not. T.B.D. TODO

  doShowYouClickedForJustAddedHereInArticleAdd = false;

  numberOfArticlesToGetSaysParentArticleAdd = 0; // init at 0.
  // We also use this, "re-setting" ( ? ) to 0 again,
  //   to re-trigger change after article add !
  // So that child component article-list refreshes and gets all (including just-added) article.
  // We hope.


  /* ====================================== */
  /* === CREATE ARTICLE FORM stuff .... === */
  /* ====================================== */
  articleIJustCreatedBoolean = false;
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

  imgUrlStubInThisComponent;

  // https://codecraft.tv/courses/angular/forms/template-driven/#_resetting_the_form
  // ViewChild lets us associate a template reference variable over in HTML, to a Component variable here in TS
  @ViewChild('addArticleFormTemplate_ref') addArticleFormTemplate: any;
  /* ====================================== */
  /* ====================================== */


  constructor(private _myArticleService: ArticleService) {

  }

  ngOnInit() {

    this.imgUrlStubInThisComponent = imgUrlStubInService; // E.g. http://0.0.0.0:8089/

    /* **************
    ** NO LONGER GO GET ARTICLES, FROM HERE, in Parent <app-article-add>
    * Refactored to the Child <app-article-list>
    *
    this._myArticleService.listArticles().subscribe(
        (whatIGot: any[]) => {
          this.articles = whatIGot;
        }
    );
*/
    this.addArticleForm = new FormGroup({
      articleUrl_formControlName: new FormControl(null, Validators.required),
      'articleTitle_formControlName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      articlePhotos_formControlName: new FormControl(null, Validators.required)
    });


  }

  getAllArticlesAfterAdd(): void {
    this._myArticleService.listArticles()
        .subscribe((whatIGot: any[]) => {
              /*
               New: Time to do 2 jobs.
               Just get the # of articles to display, and that will trigger
               (via ngOnChanges) the sending of a 2nd (kinda ridiculous)
               re-querying of the database, to get that number ("all")
               the records back.
               Kinda dumb, but we are really just exercising the mechanics
               of how to get components to communicate, etc. Cheers.
               */
              // this.articlesHowMany = whatIGot;
              this.numberOfArticlesToGetSaysParentArticleAdd = whatIGot.length;
            }
        );
  }

  public onPhotosFileChangePostFiles(eventPassedIn) {
    // Used for BOTH: 1) REACTIVE-MODEL-DRIVEN FORM, 2) TEMPLATE-DRIVEN FORM
    /*
     This is JUST for photo(s) file upload part.
     NOT the rest of the Form (the body, the fields).
     */

    var myFiles = eventPassedIn.target.files;
    console.log('onPhotosFileChangePostFiles myFiles ', myFiles)

    this.myServiceFilesUpload(myFiles)
    /* MULTER & Beyond...

     When above line of code has finished:
     - the file(s) have been written by Multer to /public/img
     - the web app page simply awaits the user's next click
     - user's next click should be Submit the Form
     - Submitting the Form writes the fielded metadata to the database
     - We need to ensure we get image file filenames to also put in that database record (so we can img src them for the U/I of course)
     -- In this method, we get the Original photo filename(s), just for the heck of it
     -- In the called method that does Multer biz, we get the RENAMED photo filename(s), which we DO need, and use. Cheers.

     - Extra Note: Slight edge case
     -- Just to note it: If user clicks away after adding photo(s), but without clicking form Submit, yeah, no database article entry will be made, and those uploaded files are going to sit there in /public/img unused. o well.
     -- Exercise for the reader: use Node(Express?) file system stuff to delete those abandoned image files ...
     */

    /*
     In sum:
     # 1 :  From the "Choose Files" click:      BODY = NO,  FILES = YES
     # 2 :  From the "Submit whole Form" click: BODY = YES, FILES = NO
     NOT going to be possible to combine the two. "MBU" (My Best Understanding).
     */

    // Next: Semi-Useless.
    // This gets the Original photo file names - (though we really don't make use of them. hmm.)
    for (var i = 0; i < myFiles.length; i++) {
      console.log(myFiles[i].name);
      this.photosFilenamesArray.push(myFiles[i].name);
    }
    console.log('Original photo filenames. fwiw. this.photosFilenamesArray ', this.photosFilenamesArray)
  } // /onPhotosFileChangePostFiles()


  private myServiceFilesUpload(myFilesHere: File[]) {
    var myFormDataFilesForService = new FormData();

    for (var i = 0; i < myFilesHere.length; i++) {
      console.log(myFilesHere[i].name);
      // This MUST BE CALLED 'file'. Don't do 'wr_file', 'myFile', etc. Gracias.
      myFormDataFilesForService.append('file', myFilesHere[i]);
    }

    this._myArticleService.uploadArticleImages(myFormDataFilesForService)
        .subscribe(
            (eventBack: any) => {
              console.log('whew99 My Service uploadArticleImages eventBack is ', eventBack);
              /*
               whew99 My Service uploadArticleImages eventBack is  {crazymessage: "RES.SEND in JSON, Congratulations, your file was u… it was. c/o apiUploadedArticleImagesNowDoNothing", yourpathonefile: "public/img/sometimes__1526727786186_051218krugman1-jumbo.png", allreqfiles: Array(2)}
               */

              for (var i = 0; i < eventBack.allreqfiles.length; i++) {
                console.log(eventBack.allreqfiles[i].filename);
                this.photosRenamedFilenamesArray.push(eventBack.allreqfiles[i].filename);
              }
              console.log('Renamed Photo Filenames: this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray);
            },

            (error) => { console.log('ERROR in myService uploadArticleImages() :( ', error)}
        )
  } // /myServiceFilesUpload()



  private prepareToAddArticleTemplateForm(addArticleFormTemplate_refPassedIn): any {
    // NON-D.R.Y.  (TODO)
    console.log('prepareToAddArticleTemplateForm -- addArticleFormTemplate_refPassedIn -- ', addArticleFormTemplate_refPassedIn);
    /*
     prepareToAddArticleTemplateForm -- addArticleFormTemplate_refPassedIn -- NgForm {submitted: true, _directives: Array(2), ngSubmit: EventEmitter, form: FormGroup}
     */

    this.myFormFieldsData.append('articleUrl_name', addArticleFormTemplate_refPassedIn.value.articleUrl_name_template)
    this.myFormFieldsData.append('articleTitle_name', addArticleFormTemplate_refPassedIn.value.articleTitle_name_template)

    this.myFormFieldsData.append('articlePhotos_name', JSON.stringify(this.photosRenamedFilenamesArray)) // SAME as on Reactive Form (fwiw)

    var myxhr8 = new XMLHttpRequest;
    myxhr8.open('POST', '/TEMPLATE-FORM', true);
    myxhr8.send(this.myFormFieldsData);

    return this.myFormFieldsData;
  }

  private prepareToAddArticleReactiveForm(): any {
    // NON-D.R.Y.  (TODO)
    // Now a component property, not just a variable declared within this method
    // ---- let myFormFieldsData = new FormData();

    console.log('-01B- this.addArticleForm ', this.addArticleForm); // FormGroup
    console.log('-01B-A- this.addArticleForm.controls ', this.addArticleForm.controls);
    /* Hmm. Was showing RED ...
     console.log('-01B-B- this.addArticleForm.controls.articleTitle_formControlName.value ', this.addArticleForm.controls.articleTitle_formControlName.value); // Yes what's in input box
     */
    console.log('-01B-Baaa- this.addArticleForm.controls[\'articleTitle_formControlName\'].value ', this.addArticleForm.controls['articleTitle_formControlName'].value); // Yes what's in input box

    // (1) .controls.field << YEP, syntax WORKS.
    /* Interesting.
     This syntax works, but, the IDE/Typescript shows RED for 'articleTitle_formControlName'
     Typescript does not know what a FormGroup.controls (in our case: 'addArticleForm.controls') is allowed to have on it.
     Hmm.
     Whereas syntax # 2 below avoids the IDE/Typescript RED (shows it in nice GREEN instead).
     */
    /* Hmm. Was showing RED ...
     this.myFormFieldsData.append('articleUrl_name', this.addArticleForm.controls.articleUrl_formControlName.value)
     */
    this.myFormFieldsData.append('articleUrl_name', this.addArticleForm.controls['articleUrl_formControlName'].value)

    // (2) .controls['field'] << YEP, syntax WORKS.
    this.myFormFieldsData.append('articleTitle_name', this.addArticleForm.controls['articleTitle_formControlName'].value)

    // (3) .get('field') << YEP, syntax ALSO WORKS.

    // https://stackoverflow.com/questions/16104078/appending-array-to-formdata-and-send-via-ajax
    this.myFormFieldsData.append('articlePhotos_name', JSON.stringify(this.photosRenamedFilenamesArray)) // SAME as on Template Form (fwiw)

    /* Worked fine. See browser DevTools Network "Request Payload" */
    var myxhr = new XMLHttpRequest;
    myxhr.open('POST', '/REACTIVE-FORM', true);
    myxhr.send(this.myFormFieldsData);

    return this.myFormFieldsData;
  } // /prepareToAddArticle()




  public addArticle(addArticleFormTemplate_refPassedIn) {
    // Used for both Template and Reactive forms.

    let myFormFieldsAndFiles: any; // FormData & Etc.

    if (addArticleFormTemplate_refPassedIn) {
      // TEMPLATE-DRIVEN
      console.log('addArticleFormTemplate_refPassedIn.value: (TEMPLATE) ', addArticleFormTemplate_refPassedIn.value);
      myFormFieldsAndFiles  = this.prepareToAddArticleTemplateForm(addArticleFormTemplate_refPassedIn);
    } else {
      // REACTIVE-MODEL-DRIVEN
      console.log('we are in addArticle - this.addArticleForm.value (REACT only) ', this.addArticleForm.value);
      myFormFieldsAndFiles = this.prepareToAddArticleReactiveForm();
    }

    this.loadingPhotos = true;

    console.log('addArticle() Let\'s have a look via Network tab at myFormFieldsAndFiles FormData ');
    var myxhr3 = new XMLHttpRequest;
    myxhr3.open('POST', '/myFormFieldsAndFiles', true);
    myxhr3.send(myFormFieldsAndFiles);
    /* 20180519-0550  Working fine. Just array of photo file *names*. Not photo *files*.
     ------WebKitFormBoundaryorWxAADqBUZELoEz
     Content-Disposition: form-data; name="articleUrl_name"

     http://nytimes.com
     ------WebKitFormBoundaryorWxAADqBUZELoEz
     Content-Disposition: form-data; name="articleTitle_name"

     React pics 1
     ------WebKitFormBoundaryorWxAADqBUZELoEz
     Content-Disposition: form-data; name="articlePhotos_name"

     ["sometimes__1526723160393_15Mideast-Visual1-superJumbo-v3.jpg","sometimes__1526723160400_051218krugman1-jumbo.png"]
     ------WebKitFormBoundaryorWxAADqBUZELoEz--
     */

    this._myArticleService.createArticle(myFormFieldsAndFiles)
        .subscribe(
            (whatIJustCreated: any) => {
              // Observable success
              console.log('whatIJustCreated ', whatIJustCreated);
              this.articleIJustCreatedDisplay = whatIJustCreated;
              this.articleIJustCreatedBoolean = true;

              /*
               IN:  JSON.stringify of Array going into MongoDB
               OUT: Must do JSON.parse what we get out
               */
              console.log('whatIJustCreated.articlePhotos JSON.parse() ', JSON.parse(whatIJustCreated.articlePhotos))
              /* Good:
               [
               "sometimes__1525986950360_010006-MexAmerican.jpg",
               "sometimes__1525986950363_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
               ]
               */

              this.articleIJustCreatedDisplay.articlePhotos = JSON.parse(whatIJustCreated.articlePhotos);

              /* **********
              NO LONGER GET ARTICLES here in Parent. See Child <app-article-list> instead.
              this.articles.push(this.articleIJustCreatedDisplay);
*/

/* Nope. See below.
              this.numberOfArticlesToGetSaysParentArticleAdd = 0;
*/
              /*
              Q. Is this even going to work?
              A. No!  0 ain't no magic "get em all". It just isn't.
                1) Re-trigger the child component, to re-do its "get articles" biz << Not happening, I think?
                2) Use a '0' to tell it to get "All" Is that even a thing? hmm. << No. Wrong.
               */

              /*
              Here is what we have to do.
              Copied/emulated from <app-article-display-n>

              Running this simply does retrieve all articles - but we don't use that data...
              We just get from it the *number* of articles that there are!
              That number we pass down (on "changes") to the child component <app-article-list>
              That child component goes and re-runs the query asking for that number, for all (e.g. 32)
              kinda crzy I kno
               */
              this.getAllArticlesAfterAdd()

/* ****** COMMENT OUT **************

              // We used to (pre-re-factoring) make use of this 2nd array on this component.
              //  Here is a dumb little bullet-proofing test to see whether or not it is in place now. (It isn't). Cheers.
              // https://stackoverflow.com/questions/858181/how-to-check-a-not-defined-variable-in-javascript
              if (typeof this.articlesHowMany != 'undefined') {
                if (this.articlesHowMany.length) { // << This line used to BREAK. Now, it is CHILL.
                  this.articlesHowMany.push(this.articleIJustCreatedDisplay)

                  /!* Well, not totally chill:
                   ERROR in src/app/article-add/article-add.component.ts(270,31): error TS2339: Property 'articlesHowMany' does not exist on type 'ArticleAddComponent'.

                   https://github.com/Microsoft/TypeScript/issues/6373

Reassurances: "(Most) errors in typescript do not actually stop code being transformed and emitted."
Ah well.
I will instead just Comment Out this bit above - no longer being used, does not really belong here.
Cheers indeed.
                   *!/

                } else {
                  // Do nothing to this "First n" list.
                  // (User had *not* clicked on "Display First n".)
                }
              }
 //         ******************************
*/


            /* REACTIVE-MODEL-DRIVEN: How to "reset"
               <form [formGroup]="addArticleForm"
            */
              this.addArticleForm.reset();

              /* TEMPLATE-DRIVEN: How to "reset"
                <form ref-addArticleFormTemplate_ref="ngForm" ...

               https://codecraft.tv/courses/angular/forms/template-driven/#_resetting_the_form

               One difference doing Template is we need to now add a variable here
               in the Component TS (up above), which will reference the form over on the HTML,
               using @ViewChild()
               */
              this.addArticleFormTemplate.reset();
            }
        );
  } // /addArticle()

  runDisplayTitle(articleTitlePassedIn) {
    this.doShowYouClickedForJustAddedHereInArticleAdd = true;
    this.titleToDisplay = articleTitlePassedIn;
  }

}
