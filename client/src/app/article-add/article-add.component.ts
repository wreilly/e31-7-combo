import { Component, OnInit, ViewChild } from '@angular/core';

// ++ ADD BECOMING ADD-EDIT:
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService, apiUrlStubInService, imgUrlStubInService } from '../article.service';

// https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript
import { Wrarticle } from '../wrarticle'


@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
  providers: [ArticleService]
})
export class ArticleAddComponent {

    /* **************
     ** NO LONGER GO GET ARTICLES, FROM HERE, in Parent <app-article-add>
     articles = [];
     */

    /* Not Used here in <app-article-add>
     articlesHowMany = []; // Articles user requested, via button click
     */
    /* */
    titleToDisplay: string;
    // UPDATE This IS being used, for "just added" (right? yes? yes) >>  Not used either. Maybe we will (for the h. of it), on the "Article Just Added" emit button. y not. T.B.D. << DONE (right? yes? yes (I think, yes))

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

    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
    // ++ ADD BECOMING ADD-EDIT:
    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

    theArticleIdHereInDetailPage; // e.g. 5afac7603fa7e949fa00a64e
    theArticleHereInDetailPage;

    theArticlePhotosArrayHereInDetailPage;

    paramsIGotTitleStubWithArticleIdHereInDetailPage; //

    articleTitleCachedBeforeEdit;

    apiUrlStubInThisComponent;

    articleApiUrlWithId;

    articleIdDelimiter = '--aid--';

    subscriptionForId; // reference to the Subscription we create, so that we can also Destroy it

    editing: boolean = false; // default: component used to Add

    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
    /* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */


    // ++ ADD BECOMING ADD-EDIT:
    constructor(private _myArticleService: ArticleService,
                private _myActivatedRoute: ActivatedRoute,
                private _myRouter: Router
    ) {
        // nuttin'
    }

    ngOnInit() {

        this.imgUrlStubInThisComponent = imgUrlStubInService; // E.g. http://0.0.0.0:8089/

        // ++ ADD BECOMING ADD-EDIT:
        this.apiUrlStubInThisComponent = apiUrlStubInService;

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


        // ++ ADD BECOMING ADD-EDIT:
        /*
         Hmm. Below is the FormGroup for ADD.
         Can I / do I simply use same exact thing for EDIT?
         Recall: On edit I only allow a single field to be edited: Title.
         hmm...
         */
        /* VALIDATION - Good Article
         https://scotch.io/tutorials/angular-2-form-validation#angular-2-form-validation
         */
        this.addArticleForm = new FormGroup({
            articleUrl_formControlName: new FormControl("", Validators.required),
            'articleTitle_formControlName': new FormControl(null, [Validators.required, Validators.minLength(15)]),
            articlePhotos_formControlName: new FormControl(null, Validators.required)
        });

        // ++ ADD BECOMING ADD-EDIT:
//    this.getArticle();
        /*
         Q.    Need some IF logic. Either: we're ADDING, or, we're EDITING
         /add
         /unique-id/edit

         A.    Maybe first run areWeEditing(), inside of which we run getArticle() if answer is Yes.
         */
        this.areWeEditing();

    }

    // ++ ADD BECOMING ADD-EDIT:
    areWeEditing() {
        // PARAMS TIME. Just snapshot, perhaps? TBD TODO
        // https://stackoverflow.com/questions/46050849/what-is-the-difference-between-activatedroute-and-activatedroutesnapshot-in-angu
        // https://stackblitz.com/edit/angular-router-snapshot-and-params-yakov-hzkxd9?file=ProductDetails.component.ts

        var didIFindAnIdParam = this._myActivatedRoute.snapshot.params['article_id']
        // Note: This param name ('article_id') is set in the app.module.ts appRoutes
        if (didIFindAnIdParam) {
            // we are EDITing. Let's Go Get that article:
            console.log('Mr. Debug here: areWeEditing() YES didIFindAnIdParam is ', didIFindAnIdParam) // whats-good-for-pharma-isnt-good-for-america-wonkish--aid--5af83649f2fffa14c4a22cd7

            this.editing = true; // voilà!

            this.getArticle()
        } else {
            // nuttin' we're just ADDing
            console.log('Mr. Debug here: areWeEditing() NO didIFindAnIdParam is NUGATORY apparently', didIFindAnIdParam) // undefined. okay
            this.editing = false; // set it (Back?) as need be...
        }
    }


    // ++ ADD BECOMING ADD-EDIT:
    getArticle() {

        this.subscriptionForId = this._myActivatedRoute.params.subscribe(
            (paramsIGot) => {
                // Note: This param name ('article_id') is set in the app.module.ts appRoutes
                /* ORIGINALLY:
                 this.theArticleIdHereInDetailPage = paramsIGot['article_id'];
                 */
                this.paramsIGotTitleStubWithArticleIdHereInDetailPage = paramsIGot['article_id'];
                // E.g., 5af746cea7008520ae732e2c
                // Now: trump-fuel-efficiency-rollbacks--aid--5af746cea7008520ae732e2c

                /* NEW. Article Detail Page URL is CHANGING.

                 But we are KEEPING the same route/path above. (/src/app/app.module.ts)
                 We'll just treat/handle the "/:article_id" parameter string in a new way.

                 WAS: http://0.0.0.0:4206/articles/5af746cea7008520ae732e2c

                 IS NOW: http://0.0.0.0:4206/articles/trump-fuel-efficiency-rollbacks--aid--5af746cea7008520ae732e2c

                 See also /src/app/article.service.ts
                 getArticle(idPassedIn) {}

                 See also notes in /src/app/article/article.component.ts,
                 where the Client App links are created,
                 to navigate from the Article Component in the List,
                 down to the Article Detail Component.
                 */

                // https://stackoverflow.com/questions/830855/what-regex-would-capture-everything-from-mark-to-the-end-of-a-line
                console.log('ARTICLE-DETAIL -01- GET-ARTICLE() this.paramsIGotTitleStubWithArticleIdHereInDetailPage ', this.paramsIGotTitleStubWithArticleIdHereInDetailPage);

                /* **********************************
                 REGEX
                 Note: We wish to support two things:
                 1) The new "Semantically Useful" URLs
                 2) The old "Just the ID #" URLs
                 Why?
                 Dunno. Seems friendly, wise, forward looking.
                 Makes consultation of the REST API (which only traffics in ID #s)
                 portable to, yeah, copy & pasting URLs into the web app.
                 ("copy & pasta..." ;o)

                 For # 2 above, our assumption is:
                 - If the delimiter '--aid--' is not found, ("article id")
                 -- then the entire passed-in parameter must be the ID #, simply.
                 No further bullet-proofing.
                 */

                if (this.paramsIGotTitleStubWithArticleIdHereInDetailPage.match(/--aid--/)) {

                    const regexResultsArrayArticleId = this.paramsIGotTitleStubWithArticleIdHereInDetailPage.match(/--aid--.*$/);

                    console.log('ARTICLE-DETAIL -02- GET-ARTICLE() regexResultsArrayArticleId ', regexResultsArrayArticleId);

                    this.theArticleIdHereInDetailPage = regexResultsArrayArticleId[0].slice(this.articleIdDelimiter.length) // from '--aid--' to the end will (should?) (does!) yield the MongoDB _id #. H'rrah.
                    // We now have simply (and correctly): E.g. 5af746cea7008520ae732e2c
                } else {
                    // NO '--aid--'. Must be just ID # (E.g. 5af746cea7008520ae732e2c)
                    this.theArticleIdHereInDetailPage = this.paramsIGotTitleStubWithArticleIdHereInDetailPage;
                    // We now have simply (and correctly): E.g. 5af746cea7008520ae732e2c
                }


                this.articleApiUrlWithId = this.apiUrlStubInThisComponent + this.theArticleIdHereInDetailPage;

                this._myArticleService.getArticle(this.theArticleIdHereInDetailPage)
                    .subscribe(
                        (articleIGot: {articleUrl: string, articleTitle: string, articlePhotos: string}) => {
                            // data...
                            this.theArticleHereInDetailPage = articleIGot;
                            console.log('subscribe : this.theArticleHereInDetailPage ', this.theArticleHereInDetailPage) // Yes: the object {} from MongoDB

                            /* 20180627-0727
                             EDITING
                             {articlePhotos: Array(1), _id: "5b3362d7a1284d055d2c4d6c", articleUrl: "https://www.nytimes.com/2018/06/26/nyregion/joseph-crowley-ocasio-cortez-democratic-primary.html", articleTitle: "Alexandria Ocasio-Cortez Defeats Joseph Crowley in Major Democratic House Upset", __v: 0}
                             articlePhotos:
                             ["["sometimes__1530093587619_27crowley1-superJumbo.j…__1530093587642_27crowley3NEW-superJumbo-v4.jpg"]"]
                             */



                            // Fill in that REACTIVE editable Form, too!
                            /*  USED TO BE CALLED (when in article-detail)
                             this.myArticleEditFormGroup.patchValue({
                             */
// NOW CALLED (re-used Form here in article-add):
                            this.addArticleForm.patchValue({
                                articleUrl_formControlName: articleIGot.articleUrl,
                                articleTitle_formControlName: articleIGot.articleTitle
                            });

                            /*
                             Let's transform the Photo File Names:
                             1      - In the database they are JSON.stringify()
                             - Now time to JSON.parse()
                             */
                            this.theArticlePhotosArrayHereInDetailPage = JSON.parse(articleIGot.articlePhotos)
                            console.log('88888888888888 AFTER JSON.PARSE this.theArticlePhotosArrayHereInDetailPage ', this.theArticlePhotosArrayHereInDetailPage);
                            /* Yes. EDITING. 20180627-0729

                             ["sometimes__1530093587619_27crowley1-superJumbo.jpg", "sometimes__1530093587642_27crowley3NEW-superJumbo-v4.jpg"]

                             Yes
                             ["sometimes__1525988911510_010006-MexAmerican.jpg", "sometimes__1525988911513_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"]
                             */

                            // 20180620-0621
                            // Patch Photos (Array) Back Onto That Picture Picker Input Thing-A-Ding-A ??? ???
                            // Q. gonna work? wu nos
                            // A. no! (security thing)
                            /*Read 'em & weep:
                            "ERROR DOMException: Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string.
                             at EmulatedEncapsulationDomRenderer2.DefaultDomRenderer2.setProperty ..."
                             */
                            /* CONCLUSION:
                            1) NOT going to (re)-display the already uploaded file(s), in the "Choose File(s)" input. (Can't.)
                            2) MAYBE (later) will display those photos just as: a) text: image filenames, b) viewable pictures: img href etc.
                            3) MAYBE (later later) will make those deleteable (checkbox etc.) - (later later later)
                            4) FOR NOW - User can just ADD another file(s). Recall: our max is (v. arbitrarily) 3. Mebbe should up to say 4. whoa.
                             */
/* YA CAIN'T DO THIS, KID:
                            this.addArticleForm.patchValue({
                                articlePhotos_formControlName: this.theArticlePhotosArrayHereInDetailPage
                            })
*/

                        },
                        (error) => {
                            // error
                            console.log('subscribe get Article Error: ', error)
                        },
                        () => {
                            // done
                        }
                    )
            },
            (errorIThink) => {
                // error
                console.log('subscribe get Param Id Error: ', errorIThink)
            },
            () => {
                // done
            }
        );
    } // /getArticle()


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
        /*
         FileList {0: File(328571), 1: File(914778), length: 2}
         0
         :
         File(328571) {name: "27crowley1-superJumbo.jpg", lastModified: 1530093389338, lastModifiedDate: Wed Jun 27 2018 05:56:29 GMT-0400 (Eastern Daylight Time), webkitRelativePath: "", size: 328571, …}
         1
         :
         File(914778)
         lastModified
         :
         1530093353566
         lastModifiedDate
         :
         Wed Jun 27 2018 05:55:53 GMT-0400 (Eastern Daylight Time) {}
         name
         :
         "27crowley3NEW-superJumbo-v4.jpg"
         size
         :
         914778
         type
         :
         "image/jpeg"
         webkitRelativePath
         :
         ""
         */

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
                    console.log('JUST-UPLOADED, be that initial CREATE or eventual UPDATE. Renamed Photo Filenames: this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray);
                    /* YES
                     JUST-UPLOADED, be that initial CREATE or eventual UPDATE. Renamed Photo Filenames: this.photosRenamedFilenamesArray  ["sometimes__1529922716438_01chinatitans-3-jumbo.jpg"]
                     */


                    /* 20180625-1515
                    If NOT editing (if ADDING/CREATING), then "theArticleHereInDetailPage" is NOT defined etc. ERROR. So, we if() it.
                    THE REST OF THIS METHOD IS ALL ABOUT "EDITING" - No "Add".
                    ***************************************
                     */
                    if (this.editing) {

                        console.log('000a EXISTING, OLD this.theArticleHereInDetailPage ', this.theArticleHereInDetailPage)
                        console.log('000 EXISTING, OLD this.theArticleHereInDetailPage.articlePhotos ', this.theArticleHereInDetailPage.articlePhotos)
                        /*
                         ["["sometimes__1526546868758_636348446001047963-IMG-…_857f43ba-d349-445c-a9f9-8a4adb54a012-jumbo.jpg"]"]
                         */
                        console.log('001 EXISTING, OLD, PARSED tempArticlePhotosStringParsedToArrayIThink ', tempArticlePhotosStringParsedToArrayIThink)
                        /*
                         undefined    :o(
                         It does work - but (it isn't defined till below!!) d'oh
                         */


                    console.log('002 NEW this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray)
                    /*
                     ["sometimes__1529946401051_01chinatitans-3-jumbo.jpg"]
                     */

                    /* NEW 20180620-1321
                    ABILITY TO ADD PHOTO(s) ON EDIT PAGE
                     this.theArticleHereInDetailPage.articlePhotos
                     is (more or less) an array with one string in it
                     That string is, in a sense, an "array" of "strings"
                     o la
                     "['stringone','stringtwo']"
                     */
                    var tempArticlePhotosStringParsedToArrayIThink;
                    tempArticlePhotosStringParsedToArrayIThink = JSON.parse(this.theArticleHereInDetailPage.articlePhotos)
                    // Yes! gets nice little array
                    /* 20180624-0704


                    A. IF UPDATING:
                    - 1. Existing, "old", originally with CREATE:
                    -- this.theArticleHereInDetailPage.articlePhotos
                    - 2. New, now added with UPDATE:
                    -- this.photosRenamedFilenamesArray

                     B. IF CREATING:
                     - N/A : 1. Existing, "old", originally with CREATE:
                     -- this.theArticleHereInDetailPage.articlePhotos
                     -- would therefore be empty ? null? non-problematic? TODO = find out
                     - 2. New, now being added with CREATE:
                     -- this.photosRenamedFilenamesArray
                     */

                    console.log('EXISTING, OLD this.theArticleHereInDetailPage.articlePhotos ', this.theArticleHereInDetailPage.articlePhotos)
                    /* Yes: Array, of one string. (which itself is an array of strings)
                     OLD, ORIGINAL PHOTO FILENAME(S)
                     ["["sometimes__1527074634847_13alexander-articleLarge.jpg"]"]
                     */

                    console.log('EXISTING, OLD, PARSED tempArticlePhotosStringParsedToArrayIThink ', tempArticlePhotosStringParsedToArrayIThink)
                    /* Yes: Array of strings.
                     Again, OLD, ORIGINAL PHOTO FILENAME(S)
                    ["sometimes__1527074634847_13alexander-articleLarge.jpg"]

                     e.g.
                     ["sometimes__1526546868758_636348446001047963-IMG-8038.JPG", "sometimes__1526546868759_merlin_137328849_857f43ba-d349-445c-a9f9-8a4adb54a012-jumbo.jpg"]
                     */

                    console.log('NEW this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray)
                    /* Yes: Array of strings.
                    NEW, JUST-ADDED PHOTO FILENAME(S)
                     ["sometimes__1529925255575_23TB-ICEMAN2-videoLarge.jpg"]
                     */


                    // Time to concat the existing file(s) to the newly added file(s)
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
                    var tempAllArticlePhotosToUpdateDatabaseArray;
                    tempAllArticlePhotosToUpdateDatabaseArray = tempArticlePhotosStringParsedToArrayIThink.concat(this.photosRenamedFilenamesArray)
                    // Yes! now we have ALL photo filenames in this little array
                    console.log('CONCAT of BOTH: EXISTING + NEW tempAllArticlePhotosToUpdateDatabaseArray ', tempAllArticlePhotosToUpdateDatabaseArray)
                    /* Yes. Array of strings.
                     ["sometimes__1527074634847_13alexander-articleLarge.jpg", "sometimes__1529925255575_23TB-ICEMAN2-videoLarge.jpg"]

                    e.g.
                     ["sometimes__1526546868758_636348446001047963-IMG-8038.JPG", "sometimes__1526546868759_merlin_137328849_857f43ba-d349-445c-a9f9-8a4adb54a012-jumbo.jpg", "sometimes__1529946401051_01chinatitans-3-jumbo.jpg"]
                     */




                    /*
                    So now we CLOBBER the this.photosRenamedFilenamesArray
                    so as to (re)-use it,
                    in the "prepareToAddArticleReactiveForm()"
                    as we now "add" (update, really) our Article
                    with ALL photos filenames:
                    - those we had before
                    - those we just got from Edit upload of (Additional) photos
                     */
                    this.photosRenamedFilenamesArray = tempAllArticlePhotosToUpdateDatabaseArray;
                    // Q. Array clobber just replaces yes?
                    // Q. No confounding "by reference" nonsense and all, yah? right? yeesh.
                    // A. RIGHT. No nonsense. "Just works." Bon.
                    console.log('CLOBBER CONCAT onto this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray)
                    /* Yes.  Array of strings.
                     ["sometimes__1527074634847_13alexander-articleLarge.jpg", "sometimes__1529925255575_23TB-ICEMAN2-videoLarge.jpg"]
                     */

                    /*
                    Hmm. Very pretty array and all that.
                    But NOT GOOD ENOUGH, YET

                    1) Here is how it looks IN THE DATABASE:

                     "articlePhotos" : [ "sometimes__1526546868758_636348446001047963-IMG-8038.JPG", "sometimes__1526546868759_merlin_137328849_857f43ba-d349-445c-a9f9-8a4adb54a012-jumbo.jpg", "sometimes__1529946401051_01chinatitans-3-jumbo.jpg" ]


                     PRIMARY> db.newarticles.find({_id: ObjectId("5afd42368d01417b61af44d8")})
                     { "_id" : ObjectId("5afd42368d01417b61af44d8"), "articlePhotos" : [ "sometimes__1526546868758_636348446001047963-IMG-8038.JPG", "sometimes__1526546868759_merlin_137328849_857f43ba-d349-445c-a9f9-8a4adb54a012-jumbo.jpg", "sometimes__1529946401051_01chinatitans-3-jumbo.jpg" ], "articleUrl" : "https://nytimes.com/2018/06/15/sports/spain-portugal-world-cup.html", "articleTitle" : "Editable Heyhey 22 NYT RO23 This is Excellent, most excellent Walked for His Right to Vote. Now He’s Running for Office. RO2", "__v" : 0 }

                     2) Here is an example of how it SHOULD LOOK:
                     "articlePhotos" : [ "[\"sometimes__1527881479973_11bledsoe-superJumbo.jpg\",\"sometimes__1527881479980_merlin_136696233_fbde38d7-df32-4801-9c88-c9111e7084d7-jumbo.jpg\"]" ],


                     */

                    // ***************************************************
                    } // /if(editing)

                },

                (error) => {
                    console.log('ERROR in myService uploadArticleImages() :( ', error)
                }
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
    } // /prepareToAddArticleTemplateForm()



    private prepareToAddArticleReactiveForm(): any {
        // NON-D.R.Y.  (TODO)
        // Now a component property (up above), not just a variable declared within this method
        // ---- let myFormFieldsData = new FormData();

        /* *** N.B. Don't forget: this "FormGroup" / FormData thing
        is *NOT* super friendly with the 'console.log()' to see
        what it holds.
        Below we see that some logging yields null, others not. Odd. o well.
         */

        console.log('-01B- this.addArticleForm ', this.addArticleForm); // FormGroup
        /* Hmm.
        null logging, but these formControls do have stuff o well...

      FormGroup.value         :
         articlePhotos_formControlName         :
         null
         articleTitle_formControlName         :
         null
         articleUrl_formControlName         :
         null
         */

        console.log('-01B-A- this.addArticleForm.controls ', this.addArticleForm.controls);
        /* Kinda Useless Logging:

         {articleUrl_formControlName: FormControl, articleTitle_formControlName: FormControl, articlePhotos_formControlName: FormControl}
         */

        /* Hmm. Was showing RED in IDE ...
         console.log('-01B-B- this.addArticleForm.controls.articleTitle_formControlName.value ', this.addArticleForm.controls.articleTitle_formControlName.value); // Yes what's in input box
         */
        console.log('-01B-Baaa- this.addArticleForm.controls[\'articleTitle_formControlName\'].value ', this.addArticleForm.controls['articleTitle_formControlName'].value); // Yes what's in input box

        console.log('-01B-Caaa- this.addArticleForm.controls[\'articleUrl_formControlName\'].value ', this.addArticleForm.controls['articleUrl_formControlName'].value); // Yes what's in input box


        // 20180624-0658
        console.log('-01B-Daaa- this.addArticleForm.controls[\'articlePhotos_formControlName\'].value ', this.addArticleForm.controls['articlePhotos_formControlName'].value); // Yes what's in input box!
        /*
         20180627-0615
         Hmm. same result.
         As noted before, for whatever reason this console.log() of
         "articlePhotos" (plural) shows me only one, even though I have two.
         Seems to not be a problem (j'espere)
         articlePhotos_formControlName:
         "C:\fakepath\27crowley1-superJumbo.jpg"

        Another run, earlier:
         C:\fakepath\051218krugman3-superJumbo.png
         */


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
        console.log('******* 01 BEFORE this.photosRenamedFilenamesArray ', this.photosRenamedFilenamesArray)
        /*  Seems to NOT NEED JSON.stringify ?? ??....

         ******* 01 this.photosRenamedFilenamesArray
         * (2) ["sometimes__1527074436227_13alexander-articleLarge.jpg", "sometimes__1529764939636_10carter-jumbo.jpg"]
         0         :
         "sometimes__1527074436227_13alexander-articleLarge.jpg"
         1
         :         "sometimes__1529764939636_10carter-jumbo.jpg"
         */

        /* 20180627-1250
        God damn it. what the hay is this.
         JSON.stringify(this.photosRenamedFilenamesArray)
         */
        var whatTheHay = JSON.stringify(this.photosRenamedFilenamesArray);
        console.log('WHATTHEHAY PREPARETOADDARTICLE whatTheHay JSON.stringify(this.photosRenamedFilenamesArray) ', whatTheHay)
        console.log('Am I this.Editing? Or this.What? this.editing: ', this.editing);

        this.myFormFieldsData.append('articlePhotos_name', JSON.stringify(this.photosRenamedFilenamesArray)) // SAME as on Template Form (fwiw)

        console.log('******* 02 AFTER JSON.stringified... this.photosRenamedFilenamesArray ', JSON.stringify(this.photosRenamedFilenamesArray))
        /*
         ******* 02 JSON.stringified... this.photosRenamedFilenamesArray  ["sometimes__1527074436227_13alexander-articleLarge.jpg","sometimes__1529764939636_10carter-jumbo.jpg"]
         */

        /* Worked fine. See browser DevTools Network "Request Payload" */
        var myxhr = new XMLHttpRequest;
        myxhr.open('POST', '/REACTIVE-FORM', true);
        myxhr.send(this.myFormFieldsData);

        /* YES. 20180623-0656
        Adding new photo, via EDIT. We do have photo array with BOTH old and new. Good.
         ------WebKitFormBoundaryCP0WHt6OdYil7wnP
         Content-Disposition: form-data; name="articleUrl_name"

         https://www.nytimes.com/2018/05/21/opinion/trump-investigation-russia-surveillance.html
         ------WebKitFormBoundaryCP0WHt6OdYil7wnP
         Content-Disposition: form-data; name="articleTitle_name"

         Trump Ye Olde Edite 2 v. the Department of Justice
         ------WebKitFormBoundaryCP0WHt6OdYil7wnP
         Content-Disposition: form-data; name="articlePhotos_name"

         ["sometimes__1526986681996_15Mideast-Visual1-superJumbo-v3.jpg","sometimes__1529751130601_09dc-Autos-1-jumbo.jpg"]
         ------WebKitFormBoundaryCP0WHt6OdYil7wnP--

         */

        return this.myFormFieldsData;
    } // /prepareToAddArticleReactiveForm()


    public processReactiveFormAddOrEdit(addArticleFormTemplate_refPassedIn) { // << Hmm, had to add back in the param. Okay. Y not.

        /*  USED TO BE:  NOW INSTEAD WE MAKE ONE FORM DO BOTH ADD OR EDIT
         AND, WE ARE JUST DOING REACTIVE AT THIS POINT... (letting go the complexity of supporting Yet Another Variation (Template v. Reactive))
         (May pick that back up; prob. shouldn't. "YAGNI")

         public addArticle(addArticleFormTemplate_refPassedIn) { // << NO LONGER...
         // Used for both Template and Reactive forms.
         */

        let myFormFieldsAndFiles: any; // FormData & Etc.

        if (addArticleFormTemplate_refPassedIn) { // << NO LONGER...
            // TEMPLATE-DRIVEN
            console.log('addArticleFormTemplate_refPassedIn.value: (TEMPLATE) ', addArticleFormTemplate_refPassedIn.value);
            myFormFieldsAndFiles = this.prepareToAddArticleTemplateForm(addArticleFormTemplate_refPassedIn);
        } else {
            // REACTIVE-MODEL-DRIVEN
            console.log('we are in addArticle - this.addArticleForm.value (REACT only) ', this.addArticleForm.value);

            /* 20180627-0615
            Hmm. same result. for whatever reason this console.log() of
            "articlePhotos" (plural) shows me only one, even though I have two.
            Seems to not be a problem (j'espere)
             articlePhotos_formControlName:
             "C:\fakepath\27crowley1-superJumbo.jpg"

            20180624-0634
             articlePhotos_formControlName:
             "C:\fakepath\10carter-jumbo.jpg"
             */

            myFormFieldsAndFiles = this.prepareToAddArticleReactiveForm();
        }

        this.loadingPhotos = true;

        console.log('addArticle() Let\'s have a look via Network tab at myFormFieldsAndFiles FormData ');
        /*
         This, as you may recall, on purpose hits a 404 error.
         The idea is to see what the DevTools shows was the PAYLOAD. :o)
         */
        var myxhr3 = new XMLHttpRequest;
        myxhr3.open('POST', '/myFormFieldsAndFiles', true);
        myxhr3.send(myFormFieldsAndFiles);
        /* 20180623-0705 Yes.
        Like /REACTIVE-FORM above, we here DO have BOTH old and  new photo filenames.
        Good.
         */
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

// UPDATE or ADD:
        if (this.editing) { // UPDATE
            this.goUpdateArticle(myFormFieldsAndFiles)
        } else { // ADD
            this.goAddArticle(myFormFieldsAndFiles)
        }
    } // /processReactiveFormAddOrEdit()


    public goAddArticle(myFormFieldsAndFiles) {
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


                    this.resetBothForms();
                }
            );
    } // /goAddArticle()

    public goUpdateArticle(myFormFieldsAndFiles) {
        // forth coming...
        console.log('goUpdateArticle!')
        /*
        Good. Since upon page load we do "getArticle()",
        we have done the "heavy lifting" (yah right)
        to get the cursed _id.  this.theArticleIdHereInDetailPage  << prob. should rename a bit o well
        Bon.
         */

        /*
        Mkaing sure of things. (Oy!)
         */
        console.log('goUpdateArticle - BEFORE wrArticle etc. - this.photosRenamedFilenamesArray: ', this.photosRenamedFilenamesArray)

        /* NEW 20180623 In "Update", also Add New Photo(s)!
        Need to incorporate PHOTOS onto this Wrarticle object.
         */
        const updateToMakeHardCodedIshConfigurable = new Wrarticle(this.addArticleForm.value.articleTitle_formControlName, this.addArticleForm.value.articleUrl_formControlName, 'mycategory2', this.photosRenamedFilenamesArray)
/* No. This was not it. This has "FAKEPATH" boolsheet.
            this.addArticleForm.value.articlePhotos_formControlName)
*/
        // We supply a dummy-value for the one not-really-in-use field: "category"

        console.log('OOFFAA # 3: updateToMakeHardCodedIshConfigurable ', updateToMakeHardCodedIshConfigurable)
        /* Issue. Not There Yet.
        Got the FAKEPATH << ain't right
        Need to get that "this.photosRenamedFilenamesArray" instead. Hmm.
        see revised code above...

         Wrarticle {articleTitle_name: "EDITOLA Trump’s Moves to Fight Back Against Investigators .html", articleUrl_name: "https://www.nytimes.com/2018/05/22/opinion/trump-rosenstein.html", articleCategory_name: "mycategory2", articlePhotos_name: "C:\fakepath\051218krugman1-jumbo.png"}
         */
        /* YES << Older
Wrarticle         {articleTitle_name: "REDITEDeactive Photos ngModel 1", articleUrl_name: "http://nytimes.com/section/business", articleCategory_name: "mycategory2"}
         */

        this._myArticleService.updateArticle(
            this.theArticleIdHereInDetailPage,
            updateToMakeHardCodedIshConfigurable
        )
            .subscribe(
                (fromDatabaseEditedArticle) => {
                    // data
                    console.log('REACTIVE NO PARAM EDIT FORM fromDatabaseEditedArticle ', fromDatabaseEditedArticle);

                    console.log('01 we are about to run resetBothForms for UPDATE this.addArticleForm.value ', this.addArticleForm.value)
                    this.resetBothForms();
                    console.log('04 we just ran resetBothForms for UPDATE this.addArticleForm.value ', this.addArticleForm.value)
                    this.editing = false; // we're done!  don't still be editing for reload!
                    // location.reload() // << dummkoppf. We do NOT want to go back to /id/edit. No. Just /id
                    // TODONE navigate to article id thing 20180615-0639
/*
                    this._myRouter.navigate([`/articles/${this.theArticleIdHereInDetailPage}`])
                    // e.g. http://0.0.0.0:4206/articles/5afac7603fa7e949fa00a64e
*/
                    this._myRouter.navigate([`/articles/${this.paramsIGotTitleStubWithArticleIdHereInDetailPage}`])


                    /* From article.component.html, plain ol' HREFf-ish:
                     <a routerLink="/articles/{{articleUrlTitleStub}}{{articleIdDelimiter}}{{articleHere._id}}">{{ articleHere.articleTitle }}</a>
                     */
                },
                () => {}, // error
                () => {} // complete
            )
    }

    resetBothForms() {

        /* REACTIVE-MODEL-DRIVEN: How to "reset"
         <form [formGroup]="addArticleForm"
         */
        console.log('02 Here in resetBothForms BEFORE this.addArticleForm.value is ', this.addArticleForm.value)
        this.addArticleForm.reset();
        console.log('03 Here in resetBothForms AFTER this.addArticleForm.value is ', this.addArticleForm.value)
        /*
        Yes. Reset IS working. (Good)
         {articleUrl_formControlName: null, articleTitle_formControlName: null, articlePhotos_formControlName: null}

         Something however is RELOADING that Form up with the title we just edited, upon page reload.
         Hmm.
         */

        /* TEMPLATE-DRIVEN: How to "reset"
         <form ref-addArticleFormTemplate_ref="ngForm" ...

         https://codecraft.tv/courses/angular/forms/template-driven/#_resetting_the_form

         One difference doing Template is we need to now add a variable here
         in the Component TS (up above), which will reference the form over on the HTML,
         using @ViewChild()
         */
        this.addArticleFormTemplate.reset();

    }

  runDisplayTitle(articleTitlePassedIn) {
    this.doShowYouClickedForJustAddedHereInArticleAdd = true;
    this.titleToDisplay = articleTitlePassedIn;
  }

}
