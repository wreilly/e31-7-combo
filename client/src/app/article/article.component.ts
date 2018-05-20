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
  Will be:  school-shootings-drills-risks
  To create link: /articles/school-shootings-drills-risks--aid--5ab99ee11459a61b106a55ff
   */

  constructor() { }

  ngOnInit() {

    this.articleApiUrlWithId = this.apiUrlStubInArticle + this.articleHere._id;

    /*
    Time to create a new URL link to go from Article component (in List)
    down to the Article Detail page component.
     */

    console.log('PRE-REGEX! - ARTICLE COMPONENT - this.articleHere.articleUrl as passed in was: ', this.articleHere.articleUrl)
    // https://www.nytimes.com/2018/05/20/us/school-shootings-drills-risks.html

/* Worked ...
    this.articleUrlTitleStubArray = this.articleHere.articleUrl.match(/(\/(?:(?!\/).)+?(?=\.html))/); // , '$1');
*/
    // Above returns string I seek *twice*. (Array of two (identical) strings). Owing to the Capture Group. Hmm.
    // https://stackoverflow.com/questions/9002771/match-returns-array-with-two-matches-when-i-expect-one-match

    this.articleUrlTitleStubArray = this.articleHere.articleUrl.match(/\/(?:(?!\/).)+?(?=\.html)/); // , '$1');
    // This one works right: Once. Array of one string. Interesting. I removed the outermost () Capture Group biz.

// FAILS    console.log('******* articleUrlTitleStubArray[0] ', articleUrlTitleStubArray[0]);

    this.articleUrlTitleStub = this.articleUrlTitleStubArray[0];
    this.articleUrlTitleStub = this.articleUrlTitleStub.slice(1); // returns new String. Onto same property? Y not.

    // *** THANK YOU regex101.com ***

    console.log('POST-REGEX! - ARTICLE COMPONENT - this.articleUrlTitleStub now is: ', this.articleUrlTitleStub);
    // working. h'rrah   E.g., school-shootings-drills-risks

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
