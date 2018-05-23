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

  articleIdDelimiter = '--aid--'; // also in article-detail.component.ts
  articleUrlTitleStubArray = [''];
  articleUrlTitleStub = '';
  /*
  For:  https://www.nytimes.com/2018/05/20/us/school-shootings-drills-risks.html
  We want:  school-shootings-drills-risks
  To create link: /articles/school-shootings-drills-risks--aid--5ab99ee11459a61b106a55ff
   */

  constructor() { }

  ngOnInit() {

    // API URL:
    this.articleApiUrlWithId = this.apiUrlStubInArticle + this.articleHere._id;

    /* Non-API URL. Just within the App:
    Time to create a new URL link, that contains:
     - the "nytimes-headline-title-kebab-style"
     - plus my "article id" delimiter '--aid--'
     - plus the MongoDB _id,
    to go from Article component (in List)
    down to the Article Detail page component.
    E.g.,

    INPUT: Real NYTimes URL
    e.g.,
     https://www.nytimes.com/2018/05/23/business/emmanuel-macron-france-technology.html?rref=collection%2Fsectioncollection%2Fbusiness&action=click&contentCollection=business&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront

     ONE OUTPUT DESIRED:
     https://www.nytimes.com/2018/05/23/business/emmanuel-macron-france-technology.html

     ANOTHER OUTPUT DESIRED:
     emmanuel-macron-france-technology

     GOAL:
     http://0.0.0.0:4206/articles/emmanuel-macron-france-technology--aid--5afac7603fa7e949fa00a64e
     http://0.0.0.0:4206/articles/5afac7603fa7e949fa00a64e          <<< Renders same app page
     http://0.0.0.0:8089/api/v1/articles/5afac7603fa7e949fa00a64e   <<< REST API *Unchanged* Still works.
     */

    /*
    NEXT UP!  ("This just in!")
    These "NYTimes URLs" can vary! (Who knew.)
    Need to handle:
    1) Long ones w. '?' and lots of parameters to chop off. DONE
    2) Ones ending '.html', from which we get our "kebab-title-stub-thing'. DONE
     https://www.nytimes.com/2018/05/22/world/asia/trump-kim-north-korea-summit.html
    3) Ones ending in "nothing": e.g. http://www.nytimes.com, or http://www.nytimes.com/section/business. << TODO !!!
    For these, we should make no kebab, add no '--aid--'
     */

    console.log('PRE-REGEX! - ARTICLE COMPONENT - this.articleHere.articleUrl as passed in was: ', this.articleHere.articleUrl)
    // https://www.nytimes.com/2018/05/20/us/school-shootings-drills-risks.html

    /* WRONG TEST. No '?' at this point. Oy!
    * ****   IF !!! ***** */
    // IF there IS a question mark (?) in the original NYTimes URL,
    // then okay, run this RegEx.
    // But if there is NO question mark, Skip RegEx !!
    // (otherwise run risk of "undefined" breaking stuff)
    // "Code Defensively"

/* HMM. My "articleUrl" is by now *without* the original '?' it had!
ORIGINAL: https://www.nytimes.com/2018/05/21/opinion/trump-investigation-russia-surveillance.html?rref=collection%2Fsectioncollection%2Fopinion&action=click&contentCollection=opinion&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront
THEN I CHANGED TO: https://www.nytimes.com/2018/05/21/opinion/trump-investigation-russia-surveillance.html

 if (this.articleHere.articleUrl.match(/\?/)) { // << WRONG TEST
    Right you are. Test should be for the '.html' thing. Ah-hah moment-o.
    */
 if (this.articleHere.articleUrl.match(/\.html/)) { // << CORRECT-A-MUNDO TEST

// LET'S JUST TURN THIS LOGIC BACK ON FOR THE MOMENT...
/*
    if (true) { << Was temporary
*/
      // Yes. '?'  present. Run RegEx << NO. Not '?', but '.html'
      /* Worked ...
       this.articleUrlTitleStubArray = this.articleHere.articleUrl.match(/(\/(?:(?!\/).)+?(?=\.html))/); // , '$1');
       */
      // Above returns string I seek *twice*. (Array of two (identical) strings). Owing to the Capture Group. Hmm.
      // https://stackoverflow.com/questions/9002771/match-returns-array-with-two-matches-when-i-expect-one-match

      this.articleUrlTitleStubArray = this.articleHere.articleUrl.match(/\/(?:(?!\/).)+?(?=\.html)/); // , '$1');
      // This one works right: Once. Array of one string. Interesting. I removed the outermost () Capture Group biz.

   /*
    https://www.nytimes.com/2018/05/21/opinion/trump-investigation-russia-surveillance.html   <<< BEFORE REGEX
    /trump-investigation-russia-surveillance   <<< AFTER REGEX
    trump-investigation-russia-surveillance    <<< AFTER slice(1)
    */

// FAILS    console.log('******* articleUrlTitleStubArray[0] ', articleUrlTitleStubArray[0]);

      this.articleUrlTitleStub = this.articleUrlTitleStubArray[0];
      this.articleUrlTitleStub = this.articleUrlTitleStub.slice(1);
      // returns new String. Onto same property? Y not.
      // We slice off that leading '/'    The above RegEx got us the last '/' in the URL and all characters after it.

      // *** THANK YOU regex101.com ***

      console.log('POST-REGEX! - ARTICLE COMPONENT - this.articleUrlTitleStub now is: ', this.articleUrlTitleStub);
      // working. h'rrah   E.g., school-shootings-drills-risks

    } else {
   // No '.html' present
      // No. No '?' present. Do not use this "question-mark-hunting" RegEx
      // E.g., https://nytimes.com
      console.log('99999999999999999 this.articleUrlTitleStub is empty yes? ', this.articleUrlTitleStub)
   if(this.articleUrlTitleStub) { // No. Not 'true'. Good.
        console.log('88888 hmm guess it was TRUE wtf this.articleUrlTitleStub ', this.articleUrlTitleStub)
   } else { // Yes. 'false'. Good.
        console.log('77777777 o goodie tests to FALSE this.articleUrlTitleStub ', this.articleUrlTitleStub)
   }

   console.log('this.articleHere.articleUrl is ', this.articleHere.articleUrl)
   // e.g. http://nytimes.com/section/business   << No '.html' okay
    }

  }

  sendTitleToParent() {
    this.myEventEmitterSendTitle.emit(this.articleHere.articleTitle);
  }

/*

<!-- NEW IDEA
  Just for Angular Client App URLs.
(Not going to change the Express REST API URLs.)

  CURRENT:
 <!-- ORIGINAL  E.g.,  http://0.0.0.0:4206/articles/5af83649f2fffa14c4a22cd7
 <h3><a routerLink="/articles/{{articleHere._id}}">{{ articleHere.articleTitle }}</a></h3>
 -->
      http://0.0.0.0:4206/articles/5af83649f2fffa14c4a22cd7


  NEW PROPOSAL(s):
  'aid' is 'article id'; hmm...
  '--' is my own invented delimiter; hmm...
  '--aid--' looks like we'll combine the two ...

 *************************
  SCENARIO 01:  "Blue sky / Happy path" - articleUrlTitleStub is present correctly:
// NO. Too hard dealing with actual delimiter '/' router uses, etc.
    http://0.0.0.0:4206/articles/trump-fuel-efficiency-rollbacks/aid/5af83649f2fffa14c4a22cd7

// YES. EASIER. Just do my own parsing on my invented delimiter '--aid--'
  http://0.0.0.0:4206/articles/trump-fuel-efficiency-rollbacks--aid--5af83649f2fffa14c4a22cd7


 *************************
 SCENARIO 02:   For whatever reason, articleUrlTitleStub is missing, null, etc.
// NO. Too hard dealing with actual delimiter '/' router uses, etc.
  http://0.0.0.0:4206/articles/aid/5af83649f2fffa14c4a22cd7

// NO. Looks troubly.
      http://0.0.0.0:4206/articles/--aid--5af83649f2fffa14c4a22cd7

// YES. BEST: Just serve it up as before:  articles/:id   simply
  http://0.0.0.0:4206/articles/5af83649f2fffa14c4a22cd7

-->

<!-- E.g.,
  INPUT:
      "articleUrl" : "https://www.nytimes.com/2018/05/16/opinion/he-walked-for-his-right-to-vote-now-hes-running-for-office.html"

  DESIRED OUTPUT:
    articleUrlTitleStub:  "he-walked-for-his-right-to-vote-now-hes-running-for-office"

  RegEx - get all from last '/' up to '.html'.  << Good luck ;o)

  console.log('PRE-REGEX! this.articleHere.articleUrl as passed in was: ', this.articleHere.articleUrl)
  // https://www.nytimes.com/2018/05/20/us/school-shootings-drills-risks.html


// YES. OUR PREVIOUS REGEX EXAMPLE. WORKS.   (server middleware "trim"...)
  //   req.body.articleUrl_name = req.body.articleUrl_name.replace(/(.*?\?(?:(?!\?))).*!/, '$1')

// NEW REGEX FOR THIS NEED. HOPEFULLY WORKS! (client Article component - creating link to detail page)

  articleUrlTitleStub = this.articleHere.articleUrl.replace((\/(?:(?!\/).)+?(?=\.html)), '$1')

*** THANK YOU regex101.com ***

console.log('POST-REGEX! articleUrlTitleStub now is: ', articleUrlTitleStub)
  // /school-shootings-drills-risks
  // Need to lop off that leading '/'  (splice/slice/whatever)

-->

<!-- E.g.,
  See amazon URLs:

    All bring up same page:

    https://www.amazon.com/Humanism-Hobbes-Quentin-Skinner-ebook/dp/B07952QPST/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1526827338&sr=1-1&keywords=quentin+skinner&dpID=410FE%252BwDtmL&preST=_SY445_QL70_&dpSrc=srch

  https://www.amazon.com/Humanism-Hobbes-Quentin-Skinner-ebook/dp/B07952QPST/

      https://www.amazon.com/dp/B07952QPST/

-->

HOW THE HELL IT (THE REGEX) WORKS:

 https://regex101.com/
 GOOD:
 (\/(?:(?!\/).)+?(?=\.html))
 INPUT
 https://www.nytimes.com/2018/05/20/us/school-shootings-drills-risks.html
 OUTPUT:
 /school-shootings-drills-risks

 REGULAR EXPRESSION
 REGEX
 EXPLANATION:
 ----------------
 /
 (\/(?:(?!\/).)+?(?=\.html))
 /
 1st Capturing Group (\/(?:(?!\/).)+?(?=\.html))
 \/ matches the character / literally (case sensitive)
 Non-capturing group (?:(?!\/).)+?
 +? Quantifier — Matches between one and unlimited times, as few times as possible, expanding as needed (lazy)
 Negative Lookahead (?!\/)
 Assert that the Regex below does not match
 \/ matches the character / literally (case sensitive)
 . matches any character (except for line terminators)
 Positive Lookahead (?=\.html)
 Assert that the Regex below matches
 \. matches the character . literally (case sensitive)
 html matches the characters html literally (case sensitive)
 -----------------

  */

}
