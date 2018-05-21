import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ArticleService, apiUrlStubInService, imgUrlStubInService } from '../article.service';

// https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript
import { Wrarticle } from '../wrarticle'

// For our Template-Driven Angular Form
// NO NEED for additional imports viz. Form. Just in app.module.ts where we get { FormsModule }
// https://www.tektutorialshub.com/angular-passing-parameters-to-route/
// https://stackblitz.com/github/Harvard-DCE-CSCIE3/angular-routing-and-CRUD?file=src%2Fapp%2Fphotodetail%2Fphotodetail.component.ts

// For our REACTIVE-MODEL-DRIVEN Angular Form
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-article-detail',
    templateUrl: 'article-detail.component.html',
    styleUrls: ['article-detail.component.css'],
    providers: [ArticleService]
})
export class ArticleDetailComponent {

    theArticleIdHereInDetailPage;
    theArticleHereInDetailPage;

    theArticlePhotosArrayHereInDetailPage;
    /*
    From MongoDB, our input here is an Array, that holds one String, holding a stringified Array:
    O la.
     [ "[\"sometimes__1525986614512_010006-MexAmerican.jpg\",\"sometimes__1525986614515_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg\"]" ]

    What we want is an Array of Strings.
    JSON.parse() does this for us.
     articlePhotos: (2) 
     ["sometimes__1525988911510_010006-MexAmerican.jpg", "sometimes__1525988911513_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"]
     */

    articleTitleCachedBeforeEdit;

    editing: boolean = false;

    // Passed in, essentially, ("imported from") ArticleService
    apiUrlStubInThisComponent;

    // NEW. For <IMG SRC="" />  E.g. http://0.0.0.0:8089/
    imgUrlStubInThisComponent;

    // Will be filled out (with ID) inside getArticle()
    // We really only use this in a sort of "artificial" way:
    //  - We display on the web page the text of the link to the API
    //   (and we also put it in the <a href> to make it clickable)
    //   But a web user interface link to an API GET call is sort of contrived.
    // http://0.0.0.0:8089/api/v1/articles/5af746cea7008520ae732e2c
    articleApiUrlWithId;

    articleIdDelimiter = '--aid--'; // also in article.component.ts

    subscriptionForId; // reference to the Subscription we create, so that we can also Destroy it

    // FORM STUFF
    // Reactive Form:
    myArticleEditFormGroup: FormGroup;

    constructor(
        private _myActivatedRoute: ActivatedRoute,
        private _myArticleService: ArticleService
    ) {  }

    ngOnInit() {
/* WORKED when apiUrl etc. was INSIDE already-getting-exported class
        this.apiUrlStubInThisComponent = this._myArticleService.apiUrlStubInService;
*/
// Now as its own export const:
        this.apiUrlStubInThisComponent = apiUrlStubInService;


        this.imgUrlStubInThisComponent = imgUrlStubInService;

        // REACTIVE-MODEL-DRIVEN Form:
        this.myArticleEditFormGroup = new FormGroup({
            'articleTitle_formControlName': new FormControl(null, [Validators.required, Validators.minLength(4)])
        });

        this.getArticle();

    }

    getArticle() {

        this.subscriptionForId = this._myActivatedRoute.params.subscribe(
            (paramsIGot) => {
                // Note: This param name ('article_id') is set in the app.module.ts appRoutes
/* ORIGINALLY:
                this.theArticleIdHereInDetailPage = paramsIGot['article_id'];
*/
                const paramsIGotTitleStubWithArticleIdHereInDetailPage = paramsIGot['article_id'];
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
                console.log('ARTICLE-DETAIL -01- GET-ARTICLE() paramsIGotTitleStubWithArticleIdHereInDetailPage ', paramsIGotTitleStubWithArticleIdHereInDetailPage);

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

                if (paramsIGotTitleStubWithArticleIdHereInDetailPage.match(/--aid--/)) {

                    const regexResultsArrayArticleId = paramsIGotTitleStubWithArticleIdHereInDetailPage.match(/--aid--.*$/);

                    console.log('ARTICLE-DETAIL -02- GET-ARTICLE() regexResultsArrayArticleId ', regexResultsArrayArticleId);

                    this.theArticleIdHereInDetailPage = regexResultsArrayArticleId[0].slice(this.articleIdDelimiter.length) // from '--aid--' to the end will (should?) (does!) yield the MongoDB _id #. H'rrah.
                    // We now have simply (and correctly): E.g. 5af746cea7008520ae732e2c
                } else {
                    // NO '--aid--'. Must be just ID # (E.g. 5af746cea7008520ae732e2c)
                    this.theArticleIdHereInDetailPage = paramsIGotTitleStubWithArticleIdHereInDetailPage;
                    // We now have simply (and correctly): E.g. 5af746cea7008520ae732e2c
                }


                this.articleApiUrlWithId = this.apiUrlStubInThisComponent + this.theArticleIdHereInDetailPage;

                this._myArticleService.getArticle(this.theArticleIdHereInDetailPage)
                    .subscribe(
                        (articleIGot: { articleTitle: string, articlePhotos: string }) => {
                            // data...
                            this.theArticleHereInDetailPage = articleIGot;
                            console.log('subscribe : this.theArticleHereInDetailPage ', this.theArticleHereInDetailPage) // Yes: the object {} from MongoDB
                            // Fill in that REACTIVE editable Form, too!
                            this.myArticleEditFormGroup.patchValue({
                                articleTitle_formControlName: articleIGot.articleTitle
                            });

                            /*
                            Let's transform the Photo File Names:
                            - In the database they are JSON.stringify()
                            - Now time to JSON.parse()
                             */
                            this.theArticlePhotosArrayHereInDetailPage = JSON.parse(articleIGot.articlePhotos)
                            console.log('this.theArticlePhotosArrayHereInDetailPage ', this.theArticlePhotosArrayHereInDetailPage);
                            /*
                            Yes
                             ["sometimes__1525988911510_010006-MexAmerican.jpg", "sometimes__1525988911513_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"]
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



    letUsEdit() {
        // Grab (and cache, as 'twere) the title (headline) before edit
        // Q. Why?
        // A. If they hit Cancel, not Save, we want to restore it.
        // Further A.: Recall, with 2-way data binding, we are letting them
        // (for fun) be able to SEE their edit live on the page.
        // But since that is changing the value in the actual property,
        // if they do hit Cancel we do need to be able to restore.
        this.articleTitleCachedBeforeEdit = this.theArticleHereInDetailPage.articleTitle
        this.toggleEdit()
    }

    letUsCancel() {
        // Restore any edit they may have done in the 2-way binding!
        if (this.theArticleHereInDetailPage.articleTitle !== this.articleTitleCachedBeforeEdit) {
            if (confirm('Are you sure you wish to cancel your editing?')) {
                this.theArticleHereInDetailPage.articleTitle = this.articleTitleCachedBeforeEdit // Put cached value back on
                this.toggleEdit()
            } else {
                // User did do some editing, clicked Cancel, then said "No" to leaving, "No" to abandoning edits. Wants to KEEP edits, and keep on editing.
                // just return to where it was
                console.log('else: do nuttin\'');
            }
        } else {
          // No editing changes detected. They clicked Cancel. Just proceed to cancel out. Leave editing mode.
           this.articleTitleCachedBeforeEdit = ''; // empty out y not
           this.toggleEdit()
        }
    }

    toggleEdit() {
        console.log('letUsEdit ', this.editing)
        this.editing = this.editing ? false : true; // toggle. if true, make false. And vice versa
    }


    letUsSaveTemplate(whatIsPassedIn: any): void {
        // TODO (mebbe). Rather NON-D.R.Y.
        /* From the HTML:
         <form ref-myArticleEditForm_ref="ngForm" on-ngSubmit="letUsSaveTemplate(myArticleEditForm_ref.value)">
         */
        // Note: ngSubmit takes care of the event.preventDefault() for you.
        //      (Had we used simply 'submit', we'd have had to do the preventDefault() here.)

        console.log('edit/update time - whatIsPassedIn ', whatIsPassedIn);

        console.log('this.theArticleHereInDetailPage.articleTitle ', this.theArticleHereInDetailPage.articleTitle ); // Yes. Edited title.

        // Time to go to the database to update it
        console.log('About to use service. this.theArticleIdHereInDetailPage is ', this.theArticleIdHereInDetailPage) // Yes. Correct ID.
         this._myArticleService.updateArticle(this.theArticleIdHereInDetailPage, whatIsPassedIn)
            .subscribe(
                (fromDatabaseEditedArticle) => {
                    // data
                    console.log('fromDatabaseEditedArticle ', fromDatabaseEditedArticle);
                    location.reload() // okay we'll go with it.
                },
                (error) => {
                    console.log('updateArticle error! ', error)
                },
                () => {
                    console.log('updateArticle complete')
                }
            )
    }


    letUsSaveReactive(formGroupPassedIn) {  //  << NOT BEING CALLED
/* NOTE:
First attempt was this "letUsSaveReactive(PARAM)"
Below, I copy this method and call it "letUsSaveReactiveNoParam()"

We'll use that one instead. (What the heck).
So, THIS METHOD is NOT BEING CALLED. Cheers.
 */

        // TODO (mebbe). Rather NON-D.R.Y.
        /* From the HTML:
         <form [formGroup]="myArticleEditFormGroup" on-ngSubmit="letUsSaveReactive(myArticleEditFormGroup)">
         */

        /* 20180505_1552
        - https://toddmotto.com/angular-2-form-controls-patch-value-set-value
        - https://stackoverflow.com/questions/45366955/same-form-for-creating-and-editing-data-angular4
        - https://github.com/PeterKassenaar/ng2-form-edit/blob/master/app/edit/city.edit.component.ts
         */
        console.log('this.myArticleEditFormGroup.value is ', this.myArticleEditFormGroup.value)
        /* Yes:
              { articleTitle_formControlName: "Foosball I typed into empty input box. Cheers." }
         */

        console.log('formGroupPassedIn ', formGroupPassedIn)
        /*
         formGroupPassedIn  FormGroup {validator: null, asyncValidator: null, _onCollectionChange: ƒ, pristine: false, touched:
         */
        console.log('formGroupPassedIn.value', formGroupPassedIn.value)
        // { articleTitle_formControlName: "Foosball I typed into empty input box. Cheers." }
        console.log('formGroupPassedIn.valid  ', formGroupPassedIn.valid)
        // true

        console.log('Is they the same? formGroupPassedIn === this.myArticleEditFormGroup ', formGroupPassedIn === this.myArticleEditFormGroup)
        // true  !!! :o)

        /* All right. Time to now actually DO something.

        UPDATE: Looks like you want/need this up in ngOnInit() !
        UPDATE # 2: Actually, we put it in getArticle() (which is yes called right from ngOnInit()).

        This "PATCH" business is how we "bind" (if I may say?), or "set" (better),
        the value of the Article data we have right now right here in this Component instance.
        We are "setting it" into the FormGroup, which is what makes the data available
        out there on the HTML view, in the HTML Form Input field.
         */

        /* "Non-D.R.Y." I suppose:
        We are going to do same database call as we do in letUsSaveTemplate()
         */

        // Time to go to the database to update it
        console.log('REACTIVE EDIT FORM. About to use service. this.theArticleIdHereInDetailPage is ', this.theArticleIdHereInDetailPage) // Yes. Correct ID.

        /* One Further Little Cleanup!
        Naming Conventions In Use In My Code:
        1. articleTitle_formControlName: "Scott Pruitt..."
        2. articleTitle_name: "Scott Pruitt..."
        3. articleTitle: "Scott Pruitt..."

        # 1 is how I name it on the REACTIVE Form
        # 2 is how I name it on the TEMPLATE Form (and in most all of the app)
        # 3 is how it is named in the database c/o MongoDB

        Need to, right here, move this from # 1 to # 2.
         (Then, the change from # 2 to # 3 happens in the REST API.)
         */

        // HARD-CODED-ISH, Configurable (Using a class new constructor! nice.)
        /*
        I.
        Let's say we had this (plus maybe more fields)  in our database. Wonderful.
        article: {
          articleTitle: "asf",
          articleUrl: "http",
          articleCategory: "Opinion"
        }

        II.
        And let's say William had naming conventions God Knows Why, in the code in the  app:
         article: {
         articleTitle_name: "asf",
         articleUrl_name: "http",
         articleCategory_name: "Opinion"
         }
         Something about getting the data values off HTML Form Input Fields "name" attributes.
         Okay.

         III.
         And let's say William again ("that William") had naming conventions God Knows Why, in the code in the REACTIVE-MODEL-DRIVEN FORMS part of the app:
         article: {
         articleTitle_formControlName: "asf",
         articleUrl_formControlName: "http",
         articleCategory_formControlName: "Opinion"
         }
         Something about learning about "how all this works, really." (Ye Gods.)


         IV.
         Now, All We Gotta Do is...
         Get from type III. to type II.
         (If you are wondering how we get from type II. to type I., the answer to that is in the REST API. All done, all set, no need think about it further.)

         Hmm. Seems almost you'd want to simply "new up" an Article!
         // https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript

         Wrarticle - a new class type (just an Article, renamed, repurposed, copied).
         For testing etc., this Class has 3 fields, but really I right now need only 1.

         constructor(title, url, category) {
           this.articleTitle_name = title;
           this.articleUrl_name = url;
           this.articleCategory_name = category;
         }
         */

        const updateToMakeHardCodedIshConfigurable = new Wrarticle(formGroupPassedIn.value.articleTitle_formControlName, 'myhttp', 'mycategory')
        // We supply a dummy-value for the two not-really-in-use fields

        this._myArticleService.updateArticle(
            this.theArticleIdHereInDetailPage,
            updateToMakeHardCodedIshConfigurable
        )
            .subscribe(
                (fromDatabaseEditedArticle) => {
                    // data
                    console.log('whoa. REACTIVE EDIT FORM fromDatabaseEditedArticle ', fromDatabaseEditedArticle);
                    location.reload()
                },
                () => {}, // error
                () => {} // complete
            )
    }



    letUsSaveReactiveNoParam() {
        // THIS IS THE METHOD WE ARE NOW USING. :o)
        // No longer calling "letUsSaveReactive(PARAM)"
        /*
         https://toddmotto.com/angular-2-forms-reactive#reactive-submit
         "Because this.user is technically our model, we can simply reference the model onSubmit internally, and ***not pass*** user through as a function argument"


A). You *can* pass in the form information from the component .HTML ...

         onSubmit({ value, valid }: { value: User, valid: boolean }) {
           console.log(value, valid);
         }

B). Or, since the form information is *already here* in the component .TS, you can *omit* to pass it:

         onSubmit() {
            console.log(this.user.value, this.user.valid);
         }


         See also (kinda sorta)
         https://angular.io/guide/reactive-forms#save
         */
        /* From the HTML:
         <form [formGroup]="myArticleEditFormGroup" on-ngSubmit="letUsSaveReactiveNoParam()">
         */

        console.log('REACTIVE NO PARAM - this.myArticleEditFormGroup.value is ', this.myArticleEditFormGroup.value)
        /* Yes:
         REACTIVE NO PARAM - this.myArticleEditFormGroup.value is  {articleTitle_formControlName: "Reactd REACT EDIT NO PARAM 01"}
         */

        /* All right. Time to now actually DO something.

         UPDATE: Looks like you want/need this up in ngOnInit() !
         UPDATE # 2: Actually, we put it in getArticle() (which is yes called right from ngOnInit()).

         This "PATCH" business is how we "bind" (if I may say?), or "set" (better),
         the value of the Article data we have right now right here in this Component instance.
         We are "setting it" into the FormGroup, which is what makes the data available
         out there on the HTML view, in the HTML Form Input field.
         */

        console.log('REACTIVE NO PARAM - EDIT FORM. About to use service. this.theArticleIdHereInDetailPage is ', this.theArticleIdHereInDetailPage) // Yes. Correct ID.
        // this.theArticleIdHereInDetailPage is  5b003629480659e4aaf1449a

        const updateToMakeHardCodedIshConfigurable = new Wrarticle(this.myArticleEditFormGroup.value.articleTitle_formControlName, 'myhttp', 'mycategory')
        // We supply a dummy-value for the two not-really-in-use fields

        this._myArticleService.updateArticle(
            this.theArticleIdHereInDetailPage,
            updateToMakeHardCodedIshConfigurable
        )
            .subscribe(
                (fromDatabaseEditedArticle) => {
                    // data
                    console.log('REACTIVE NO PARAM EDIT FORM fromDatabaseEditedArticle ', fromDatabaseEditedArticle);
                    location.reload()
                },
                () => {}, // error
                () => {} // complete
            )
    }


    letUsDelete() {
        if (confirm('All right, you sure you wish to delete this article?')) {
            console.log('we are deleting ...theArticleHereInDetailPage._id ', this.theArticleHereInDetailPage._id)
            this._myArticleService.deleteArticle(this.theArticleIdHereInDetailPage)
                .subscribe(
                    (articleJustDeleted) => {
                        // data back
                        console.log('articleJustDeleted ', articleJustDeleted);
                        location.replace('/articles')
                        // After DELETE, go to list page, not article page (would be 404)
                    }
                )

        } else {
            // do nuttin'
        }
    }

    ngOnDestroy() {
        this.subscriptionForId.unsubscribe();
    }
}