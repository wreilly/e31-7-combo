import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';

@Component({
    selector: 'app-article-list',
    templateUrl: 'article-list.component.html',
    styleUrls: ['article-list.component.css'],
    providers: [ArticleService]
})
export class ArticleListComponent {

    /*
    Trying to parameterize this Component.
    Usually gets ALL Articles
    WAS:
    // numberOfArticlesToGet; // simply declared...

    NOW (TRYING):  To be an "@Input()". Hmm
   But on "display-n" page, let's try to use it get 'N' Articles

   See logic in ngOnInit()

   From "parent" <app-article-display-n> is passed down to here
     numberOfArticlesToGetHereInDisplayN as numberOfArticlesToGetAlias
     (We have a hard-coded 2 from Display-N, for now.)
     And *yes* that 2 is seen in ngOnInit

     O la. See Also: "ngOnChanges". Ye Gods.
     */
    @Input('numberOfArticlesToGetAlias') numberOfArticlesToGet; // Need to init ?? = 0; // init

    articles = [];

    /*
    This Array to hold "articlesHowMany" will be factored out ( ? ) from here in <app-article-list>,
     ** but ** a similar concept will be introduced, to have the initial Array "articles"
    perform a new function:
    - hold a certain number of Articles, (numberOfArticlesToGet)
     -- OR  --,
    - hold All Articles.
    This Array "articlesHowMany" will still be used, over on "display-n" component. Cheers.
     */
    articlesHowMany = []; // Array of Articles user requested, via button click



    titleToDisplay: string;

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
    /* ====================================== */
    /* ====================================== */

    constructor(
        private _myArticleService: ArticleService,
    ) { }

    ngOnInit() {

        if (this.numberOfArticlesToGet == 0) {
            // GET ALL ("Plan A")
            console.log("// GET ALL (Plan A) this.numberOfArticlesToGet ", this.numberOfArticlesToGet);
            this._myArticleService.listArticles().subscribe(
                (whatIGot: any[]) => {
                    this.articles = whatIGot;
                }
            );
        } else {
            // GET SOME ("Plan B")
            console.log("// GET SOME (Plan B) this.numberOfArticlesToGet ", this.numberOfArticlesToGet)
            // YES. the hard-coded 2 is seen here. SFSG. So Far, So Good.

            // On "Display-N" page user clicked of some number (not 0)
            this.getThisManyArticles(this.numberOfArticlesToGet)
        }

        this.addArticleForm = new FormGroup({
            articleUrl_formControlName: new FormControl(null, Validators.required),
            'articleTitle_formControlName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
            articlePhotos_formControlName: new FormControl(null, Validators.required)
        });

    }

    ngOnChanges(myChanges: SimpleChanges) {
        // https://angular.io/guide/lifecycle-hooks#onchanges

        console.log('o la. OnChanges. this.numberOfArticlesToGet ', this.numberOfArticlesToGet);

        for (let myPropName in myChanges) {
            let myChng = myChanges[myPropName];
            console.log('myPropName ', myPropName);
            console.log('myChng ', myChng);
            
            let cur = JSON.stringify(myChng.currentValue);
            console.log('o la. OnChanges. CUR: ', cur)

            let prev = JSON.stringify(myChng.previousValue);
            console.log('o la. OnChanges. PREV: ', prev)
        }
        this.getThisManyArticles(this.numberOfArticlesToGet) // cur, yes ?
    }

    runDisplayTitle(articleTitlePassedIn) {
        this.titleToDisplay = articleTitlePassedIn;
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
        // N.B. This function is (currently) in TWO PLACES:
        // 1. Here in <app-article-list>
        // 2. (NEW) In <app-article-display-n>

        /* VALIDATION (however humble)
         - EMPTY INPUT BOX:
            It is an EMPTY STRING "" - when you click submit on empty input.
         - USER TYPES IN 0 or -1
         */

        if (numberArticlesPassedIn.value === "" || numberArticlesPassedIn.value < 1) {
            console.log('Invalid number of articles requested.') // TODO Flash msg or similar
        } else {
            console.log('getThisManyArticles: numberArticlesPassedIn ', numberArticlesPassedIn)
/*
            this._myArticleService.listFirstNArticles(numberArticlesPassedIn.value)
*/
            this._myArticleService.listFirstNArticles(numberArticlesPassedIn)
                .subscribe(
                    (whatIGot: any[]) => {
/* Comment Out I do believe ?
                        this.articlesHowMany = whatIGot;
*/
                        console.log('whatIGot.length ', whatIGot.length)
                        this.articles = whatIGot; // NEW. (Hmm, do we keep line above? or kill? hmm)
                    }
                );
        }
    }

    preventDefaultOnMouseDownButtonHighlightRemains(event) {
        /* In Chrome at least, the highlight around the clicked
         button remains after the click action is done.
         Seems distracting. Better to remove.
         This "preventDefault()" takes care of that.
         */
        event.preventDefault();

        /* UPDATE
        Sheesh bud, just do it IN-LINE over in the template. Sheesh.
        E.g.,
         <button (click)="clearAllArticlesOnClick()" style="font-style: italic;"
         (mousedown)="$event.preventDefault()">(Clear Articles)</button>
         */
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

                    this.articles.push(this.articleIJustCreatedDisplay)
                    if (this.articlesHowMany.length) {
                        this.articlesHowMany.push(this.articleIJustCreatedDisplay)
                    } else {
                        // Do nothing to this "First n" list.
                        // (User had *not* clicked on "Display First n".)
                    }
                    this.addArticleForm.reset();
                }
            );
    } // /addArticle()

}