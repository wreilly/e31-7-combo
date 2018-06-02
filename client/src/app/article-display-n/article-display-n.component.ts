import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service'

@Component({
  selector: 'app-article-display-n',
  templateUrl: './article-display-n.component.html',
  styleUrls: ['./article-display-n.component.css'],
    providers: [ArticleService]
})
export class ArticleDisplayNComponent implements OnInit {

  titleToDisplay: string = ''; // No longer needed. I think. 'display N titleToDisplay hard-coded for now';
  articlesHowMany = []; //  << How I did init on original article-list.component.ts (worked)
    //  >> This also did work, to init:  // articlesHowMany:[string] =['']; // init
    articles = []; // NEW, hey

    numberOfArticlesToGetHereInDisplayN = 2; // need to init, hey? Yes. // Similar to as seen in article-list.component.ts

/* Naw This was NOT the right idea.
Parent does not "emit event" to notify Child. No.
Instead, see what we're doing with "ngOnChanges()" - Whoa. In child article-list
    @Output() myEventEmitterTellChildNewNumberArticlesToGet = new EventEmitter()
*/


  constructor(private _myArticleService: ArticleService) { }

  ngOnInit() {
  }

  getAllArticlesOnClick(): void {
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
              this.articlesHowMany = whatIGot;
              this.numberOfArticlesToGetHereInDisplayN = whatIGot.length;
            }
        );
  }

  clearAllArticlesOnClick(): void {
      console.log('9999999999999 clear in Display-N')
    this.articlesHowMany = []; // re-init
      this.titleToDisplay = ''; // likewise

      // Also need to clear the Child component article-list:
      this.numberOfArticlesToGetHereInDisplayN = 0;

      /* N.B.
      Not here but over in the .HTML
      there is one line of code to set the "ref" (referenced)
      widget element to hard-coded 0
      The <input> #numberArticlesNgRef

      The line of (in-line) code is:
       <button (click)="clearAllArticlesOnClick(); numberArticlesNgRef.value = 0;"

      I believe (not certain?) there is NO WAY to affect
      that referenced element thing from here in the TypeScript.
      AMIRITE? AMI? AMIRITE?
      */
      var numberArticlesInputThing = document.getElementById('numberArticles_id')
      console.log('numberArticlesInputThing ', numberArticlesInputThing)
    //  console.log('numberArticlesInputThing.value ', numberArticlesInputThing.value)

  }


  userWantsThisManyArticles(numberArticlesPassedIn) {
      /*
       Also: Let's rename this function here in "Display-N":
       * <app-article-display-n>
       getThisManyArticles(NUMBER)        <<<  WAS
       userWantsThisManyArticles(NUMBER)  <<< NOW IS
       * <app-article-list>
       getThisManyArticles(NUMBER)        <<< KEEP AS WAS; SAME NAME AS PRIOR
       */

    /* VALIDATION (however humble)
     - EMPTY INPUT BOX:
     It is an EMPTY STRING "" - when you click submit on empty input.
     - USER TYPES IN 0 or -1
     */

/* tsk, tsk:
 I Used To: Send in the whole referenced HTMLInputElement: (tsk, tsk)
 <button (click)="getThisManyArticles(numberArticlesNgRef)" <<<<

 Now Instead I: Send, to a function that expects/uses/consumes/needs a NUMBER, a ("ta-da!"): NUMBER.
 Mo' better

      if (numberArticlesPassedIn.value === "" || numberArticlesPassedIn.value < 1) {
*/
/* We Now DO Allow Zero. Why? So "Clear All" Will Work.
      if (numberArticlesPassedIn === "" || numberArticlesPassedIn < 1) {
*/
      if (numberArticlesPassedIn === "" || numberArticlesPassedIn < 0) {
      console.log('Invalid number of articles requested.') // TODO Flash msg or similar
       console.log('getThisManyArticles: numberArticlesPassedIn ', numberArticlesPassedIn)
    } else {
        /*
        NEW. Do two jobs: No, wrong about being wrong. O la. >> << Hmm, I think this belongs over in article-list.component.ts, not here in display-n.
        1) The job we were doing: go to the Service, get back # of articles
        2) Now, set a new component property to that same #, such that:
         // >> Huh? No. elsewhere you go get that same # of articles in a *separate* service call.
         such that: you "send" that number of articles down to the 'child' article-list and let *it* go get Articles.
         Ah-hah. I think.

        Kinda crzy, I kno.
         */
        // # 2.)
 // WRONG I THINK << No, right, I think.
/*
          this.numberOfArticlesToGetHereInDisplayN = numberArticlesPassedIn.value
*/
          this.numberOfArticlesToGetHereInDisplayN = numberArticlesPassedIn
        // Boom we are off to the races: my '3' let's say in a split second will go down to the 'child' article-list
        // which will do its own Service find(3)... J'espere.
          // Hmm.
          /* No. Chrissakes no.
          It ain't just gonna go and update your G.D. child component, just because
          you changed the damned value here in the parent.
          No.
          Yes you got to pass in the value one time, at the beginning of loading this
          G.D. parent, which yeah in turn loads the G.D. child, and the G.D. child
          gets that original (hard-coded 2) value yeah yeah.
          But that is NOT going to serve as the mechanism to pass subsequent changes. Sheesh. Yeesh.
 NO you were Wrong ABout That >> TIME FOR AN EVENT. EMITTER. EVENT-EMITTER. ("yay")  << NO you were Wrong ABout That
           */
          console.log('oh dear. # 2. this.numberOfArticlesToGetHereInDisplayN ', this.numberOfArticlesToGetHereInDisplayN)

          /* ************************
          Hah. "Unreachable Code" error. Solly!

          WE JUST RETURN
          WE ARE SKIPPING GOING TO GET ARTICLES FROM HERE IN PARENT  <<< Très bien.
          We instead will only get articles from
          in the Child component article-list
           */
              // Nope! >>         return;  // << "unreachable code"
          /* ************************ */

        // # 1.)
/*
          this._myArticleService.listFirstNArticles(numberArticlesPassedIn.value)
*/

          var shallWeRunThis = false;
          if (shallWeRunThis) {  // Huh. Just "if(false)" --> Also "unreachable code" Sheesh.
// ********* NO LONGER RUNNING THIS!   **********
              this._myArticleService.listFirstNArticles(numberArticlesPassedIn)
                  .subscribe(
                      (whatIGot: any[]) => {
                          this.articlesHowMany = whatIGot;

                          // Line below is NOT affecting "articles[]" on child Component article-list, of course. Yeesh.
                          // Line below is doing NOTHING, really.
                          /* fuggedaboudid
                           this.articles = whatIGot; // NEW. (Hmm, do we keep line above? or kill? hmm)
                           */

                          /*
                           WRONG >>        TIME FOR AN EVENT. EMITTER. EVENT-EMITTER. ("yay")
                           NO NO NO NO NO NO. See "ngOnChanges" instead. Child article-list compomnent.
                           this.myEventEmitterTellChildNewNumberArticlesToGet(numberArticlesPassedIn);
                           */
                      }
                  );
// *********************************************
          }
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
