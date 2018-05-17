import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';

// For file upload stuff we'll first try the HTTP POST from right here in the Component; later to the Service. t.b.d.
import { HttpClient } from '@angular/common/http'


@Component({
    selector: 'app-article-list',
    templateUrl: 'article-list.component.html',
    styleUrls: ['article-list.component.css'],
    providers: [ArticleService, HttpClient]
})
export class ArticleListComponent {

    articles = [];
    howMany = 0; // # of Articles to get. user input, click
    articlesHowMany = []; // Articles user requested, via button click
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
    loadingPhotos = false; //         // https://nehalist.io/uploading-files-in-angular2/
    /* ====================================== */
    /* ====================================== */
    /* ====================================== */

    constructor(
        private _myArticleService: ArticleService,
        private _myHttpService: HttpClient
    ) { }

    ngOnInit() {

        // this.getAllArticles();
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
    runDisplayTitle(event) {
        this.titleToDisplay = event;
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
         NOT the rest of the Form.
         */

        var myFiles = eventPassedIn.target.files;
        console.log('onPhotosFileChangePostFiles myFiles ', myFiles)

        this.myServiceFilesUpload(myFiles)
        /* MULTER & Beyond...
        When above line of code has finished:
        - the file(s)(?) have been written by Multer to /public/img
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
        console.log('We are DONE - this.photosFilenamesArray ', this.photosFilenamesArray)
        /* Hmm. These are not the "renamed" photo file names. Hmm. Not what I need.
         */
        /*
          We need the RE-NAMED file names. Which we do get, below when back from after Multer.
         */

    } // /onPhotosFileChangePostFiles()


    private myServiceFilesUpload(myFilesHere: File[]) {
        var myFormDataFilesForService = new FormData();

        for (var i = 0; i < myFilesHere.length; i++) {
            console.log(myFilesHere[i].name);
// This MUST BE CALLED 'file':
            myFormDataFilesForService.append('file', myFilesHere[i]);
        }

        /*
        1. Let's use HTTP Service to just whamma onto our REST API URL directly from here.
        2. Let's next use our Article Data Service, to let IT do the HTTP whamma biz.

        For # 1:
         this._myHttpService.post('http://0.0.0.0:8089/api/v1/articles/', myFormDataFilesForService)

         ------WebKitFormBoundary6CEHBFpBZAg8g080
         Content-Disposition: form-data; name="file"; filename="AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
         Content-Type: image/jpeg


         ------WebKitFormBoundary6CEHBFpBZAg8g080--

         For # 2:
         this._myArticleService.uploadArticleImages(myFormDataFilesForService)
         ------WebKitFormBoundarygyHHLUu614ikUvU3
         Content-Disposition: form-data; name="file"; filename="010006-MexAmerican.jpg"
         Content-Type: image/jpeg


         ------WebKitFormBoundarygyHHLUu614ikUvU3--
         */

/*
        this._myArticleService.createArticle(myFormDataFilesForService)
*/
        this._myArticleService.uploadArticleImages(myFormDataFilesForService)
            .subscribe(
                (eventBack: any) => {
                    console.log('whew99 My Service uploadArticleImages eventBack is ', eventBack);

                    /* whew99
                     {crazymessage: "RES.SEND in JSON, Congratulations, your file was u… it was. c/o apiUploadedArticleImagesNowDoNothing", yourpath: "public/img/sometimes__1525980207472_AndToThinkWeAl…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"}
                     */
                    /*
                     whew file.io eventBack is  {success: true, key: "06l3Ql", link: "https://file.io/06l3Ql", expiry: "14 days"}
                     */
                    /* E.g.,
                     ------WebKitFormBoundary0DghgeLU8KM4eNoO
                     Content-Disposition: form-data; name="file"; filename="010006-MexAmerican.jpg"
                     Content-Type: image/jpeg


                     ------WebKitFormBoundary0DghgeLU8KM4eNoO--
                     */


                    // Next: get those photo file names!
                    /*
                     FOR LOOP TIME:
                     https://www.javascripture.com/FileList
                     */

                    for (var i = 0; i < eventBack.allreqfiles.length; i++) {
                        console.log(eventBack.allreqfiles[i].filename);
                        this.photosRenamedFilenamesArray.push(eventBack.allreqfiles[i].filename);
                    }
                    console.log('We are DONE - this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray);


                    /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                     Oy. We need the RE-NAMED file names. Back from after Multer.

                     */

                },



                (error) => { console.log('ERROR in myService uploadArticleImages() :( ', error)}
                )

    } // /myServiceFilesUpload()



    private prepareToAddArticleTemplateForm(addArticleFormTemplate_refPassedIn): any {
        console.log('prepareToAddArticleTemplateForm -- addArticleFormTemplate_refPassedIn --  ?? ', addArticleFormTemplate_refPassedIn);

        this.myFormFieldsData.append('articleUrl_name', addArticleFormTemplate_refPassedIn.value.articleUrl_name_template)
        this.myFormFieldsData.append('articleTitle_name', addArticleFormTemplate_refPassedIn.value.articleTitle_name_template)

        this.myFormFieldsData.append('articlePhotos_name', JSON.stringify(this.photosRenamedFilenamesArray)) // SAME as on Reactive Form (fwiw)

        var myxhr8 = new XMLHttpRequest;
        myxhr8.open('POST', '/TEMPLATE-FORM', true);
        myxhr8.send(this.myFormFieldsData);

        return this.myFormFieldsData;

    }

    private prepareToAddArticleReactiveForm(): any {

        // Now a component property ---- let myFormFieldsData = new FormData();

        console.log('-01B- this.addArticleForm ', this.addArticleForm); // FormGroup
        console.log('-01B-A- this.addArticleForm.controls ', this.addArticleForm.controls);
        console.log('-01B-B- this.addArticleForm.controls.articleTitle_formControlName.value ', this.addArticleForm.controls.articleTitle_formControlName.value); // Yes what's in input box

        // (1) .controls.field << YEP, WORKS.
        this.myFormFieldsData.append('articleUrl_name', this.addArticleForm.controls.articleUrl_formControlName.value)

        // (2) .controls['field'] << YEP, WORKS.
        this.myFormFieldsData.append('articleTitle_name', this.addArticleForm.controls['articleTitle_formControlName'].value)


        // (3) .get('field') << YEP, ALSO WORKS.

        // https://stackoverflow.com/questions/16104078/appending-array-to-formdata-and-send-via-ajax
        this.myFormFieldsData.append('articlePhotos_name', JSON.stringify(this.photosRenamedFilenamesArray)) // SAME as on Template Form (fwiw)

         var myxhr = new XMLHttpRequest;
         myxhr.open('POST', '/', true);
         myxhr.send(this.myFormFieldsData);

        return this.myFormFieldsData;

    } // /prepareToAddArticle()


    public addArticle(addArticleFormTemplate_refPassedIn) {

        /* N.B. From the TEMPLATE Form, I pass in the whole ngForm reference
         on-ngSubmit="addArticle(addArticleFormTemplate_ref)"
         */

        console.log('addArticleFormTemplate_refPassedIn: WHOLE DURNED THING (TEMPLATE only) ', addArticleFormTemplate_refPassedIn);
        /* Interesting:
        NgForm { control: FormGroup, controls: { articleUrl_name_template: FormControl, ... } }
        */

        if (addArticleFormTemplate_refPassedIn) {
            console.log('addArticleFormTemplate_refPassedIn: .VALUE (TEMPLATE only) ', addArticleFormTemplate_refPassedIn.value);
            /* Yes:
             {articleUrl_name: "http://nytimes.com", articleTitle_name: "TEMPLATE We Wrote This Yesterday. (So long as Today is Tomorrow.)"}
             */
        }
        
        console.log('we are in addArticle - this.addArticleForm.value (REACT only) ', this.addArticleForm.value);
        /* Yeah. V. nice.
         {articleUrl_formControlName: "http://nytimes.com", articleTitle_formControlName: "REACTIVE We Wrote This Yesterday. (So long as Today is Tomorrow.)"}
         */

        let myFormFieldsAndFiles: any; // FormData & Etc.

        if (addArticleFormTemplate_refPassedIn) {
            // TEMPLATE-DRIVEN
/*
            articleToCreate = {
                articleUrl_name: addArticleFormTemplate_refPassedIn.articleUrl_name,
                articleTitle_name: addArticleFormTemplate_refPassedIn.articleTitle_name,
            }
*/

            // ***********************************
                myFormFieldsAndFiles  = this.prepareToAddArticleTemplateForm(addArticleFormTemplate_refPassedIn);
            // ***********************************


        } else {
             // ***********************************
             myFormFieldsAndFiles = this.prepareToAddArticleReactiveForm();
            // ***********************************
        }


        this.loadingPhotos = true;

        console.log('addArticle() Let\'s have a look via Network tab at myFormFieldsAndFiles FormData ');
        /*
         We did this just for debugging to see the FormData in the browser network tab.
         */
        var myxhr3 = new XMLHttpRequest;
        myxhr3.open('POST', '/myFormFieldsAndFiles', true);
        myxhr3.send(myFormFieldsAndFiles);
        /* YES. JUST RIGHT.
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="articleUrl_name"

         http://nytimes.com
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="articleTitle_name"

         fgh
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="articlePhotos_name"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="file"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryoPpanl3RULBL6o14--
         */


        /*
         if (addArticleFormTemplate_refPassedIn) {
            // TEMPLATE-DRIVEN
            articleToCreate = {
                articleUrl_name: addArticleFormTemplate_refPassedIn.articleUrl_name,
                articleTitle_name: addArticleFormTemplate_refPassedIn.articleTitle_name,
                articlePhotos_name: this.photosFilenamesArray
            };
            console.log('TEMPLATE articleToCreate is ', articleToCreate) // Yes we have the pics
        } else {
            // REACTIVE-MODEL-DRIVEN
            articleToCreate = {
                articleUrl_name: this.addArticleForm.value.articleUrl_formControlName,
                articleTitle_name: this.addArticleForm.value.articleTitle_formControlName,
                articlePhotos_name: this.photosFilenamesArray
            };

            // WE ARE DOING REACTIVE ONLY (thus far)
        }



        /* 2018-04-22 "C" in CRUD time:

         From here in the Component's TypeScript,
         we invoke the Article Service,
         to use its Angular HTTP
         to hit the REST API endpoint:

(akin to how we used Axios in the Express App for the CLIENT-SIDE JAVASCRIPT to talk to the REST API),

           POST to http://0.0.0.0:8089/articles
         */
  //      console.log('-02- BOUT TO GO TO SOIVICE  myFormFieldsAndFiles ', myFormFieldsAndFiles) // // You cannot see FormData via console.log()




        /*
                this._myArticleService.createArticle(articleToCreate) // << "Worked" to send photo filenames, not files.
        */
        // WE ARE DOING REACTIVE ONLY (thus far)
        this._myArticleService.createArticle(myFormFieldsAndFiles)
            .subscribe(
                (whatIJustCreated: any) => {
                    // Observable success
                    console.log('whatIJustCreated ', whatIJustCreated);
                    // Type {}
                    this.articleIJustCreatedDisplay = whatIJustCreated;
                    this.articleIJustCreatedBoolean = true;

                    /*
                    O la. JSON.stringify of Array going into MongoDB
                    Time to JSON.parse what we get out. I think
                     */
                    console.log(' $$$$$$$$$$$$$$$$$$$$   whatIJustCreated.articlePhotos ', whatIJustCreated.articlePhotos)
                    console.log('whatIJustCreated.articlePhotos JSON.parse() ', JSON.parse(whatIJustCreated.articlePhotos))
                    /*
                    Damn. Looks like that worked. Hot damn.  20180510-1716

                    Of course, if you really do go this JSON/STRINGIFY/PARSE route, well,
                    you are stuck with a database that for EVERY TIME you obtain
                    this info, you MUST do JSON PARSE to use it.
                    That is, your database entry is really holding a STRING. ugh.
                    Kinda ugly.
                    O well.
                    Good enough for tonight's assignment! !! !!!


                     whatIJustCreated.articlePhotos JSON.parse()
                     (2) ["sometimes__1525986950360_010006-MexAmerican.jpg", "sometimes__1525986950363_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"]
                     0
                     :
                     "sometimes__1525986950360_010006-MexAmerican.jpg"
                     1
                     :
                     "sometimes__1525986950363_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
                     */

                    this.articleIJustCreatedDisplay.articlePhotos = JSON.parse(whatIJustCreated.articlePhotos) // whamma-jamma this reconstituted Array of strings onto that {} type. should go okay I expect.

                    /* Working. Finally. Whoa. 20180510-1647. Due at 20180510-2359.

                     whatIJustCreated
                     {articlePhotos: Array(1), _id: "5af4adf4b0f4ef4a2394b7f8", articleUrl: "http://nytimes.com", articleTitle: "hy", __v: 0}
                     articlePhotos
                     :
                     Array(1)
                     0
                     :
                     "sometimes__1525984753235_010006-MexAmerican.jpg"
                     length
                     :
                     1
                     __proto__
                     :
                     Array(0)
                     articleTitle
                     :
                     "hy"
                     articleUrl
                     :
                     "http://nytimes.com"
                     __v
                     :
                     0
                     _id
                     :
                     "5af4adf4b0f4ef4a2394b7f8"
                     */



                    // New: Let's update the Articles array right here, right now.
                    // Also: The user-selected "How Many Articles" array.
                    // On create here, I do *not* refresh the page,
                    //  because I wanted to immediately display the just-created article.
                    //  Till now I had not thought to do this array-pushing.
                    //  Instead, the user had to refresh or perhaps navigate back
                    //  to this page, to see full list with newly added item.
                    //  This is better.
                    this.articles.push(this.articleIJustCreatedDisplay)
                    if (this.articlesHowMany.length) {
                        // If the user has NOT clicked on "First n" Articles,
                        //  we'll skip adding the just-created Article to that
                        //  (non-existent) list on the page.
                        //
                        // That is, only if the user *HAS* already asked for some number
                        // of Articles to appear will we add the
                        // just-created Article to that displayed list:
                        this.articlesHowMany.push(this.articleIJustCreatedDisplay)
                        /*
                         One tiny side-effect (totally benign, acceptable, and prob. desired):
                         re: "articlesHowMany":
                         - If user says "Display first 2 articles", and then adds one article...
                         - The "First n" articles list of 2 will be joined by the new one, in the
                         next spot (3rd spot)
                         (whereas it of course belongs ultimately in last spot)
                         - That of course goes away next time they click on asking for any other
                         number of articles to be displayed.
                         (The newly added one will correctly be in the last spot.)
                         */
                    } else {
                        // do nothing. User had *not* clicked on "Display First n".
                        // We do not add the just-created Article to a sort of "non-list"
                    }

                    // https://stackoverflow.com/questions/36655922/resetting-a-form-in-angular-2-after-submit
                    // Hmm. Seems to say resetForm() should be available o well.
                    this.addArticleForm.reset();
                }
            );
    } // /addArticle()

}