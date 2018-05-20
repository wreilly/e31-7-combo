import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class ArticleService {

  constructor(private _serviceHttp: HttpClient) {  }

  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  /* ^^^^^^   TOC   ^^^^^^^^^^^^^  */
  /*

   listArticles()

   listFirstNArticles(howManyToList)

   getArticle(id)

   createArticle(article)

   updateArticle(id, article)

   deleteArticle(id)

   */
  /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */




  // GET All Articles
  listArticles() {
    return this._serviceHttp.get(apiUrlStubInService);
  }

  listFirstNArticles(howManyToList) {

    /* (See also REST API api-articles.js Router)
    FINDING/LEARNING:
    - When you do use HTML "form" and "hidden input field" ... You get (for free as it were)
    a **NAME=VALUE** PAIR
        - When you do (like I did) on the Angular "pseudo-form" combo bit, construct all by yourself on your own
    the GET URL to pass a query parameter, you do **NOT** get (for free) that "name=value" pairing.
        What I had done was baldly, blindly, badly JUST SEND THE "value"
    I failed to provide it a "name=" side of things.
        O well.
    */

    const nameValuePairNameThing = 'howMany_query'

    console.log("apiUrlStubInService + 'first-n?' + nameValuePairNameThing + (equals sign) + howManyToList ", apiUrlStubInService + 'first-n?' + nameValuePairNameThing + '=' + howManyToList);

          return this._serviceHttp.get(apiUrlStubInService + 'first-n?' + nameValuePairNameThing + '=' + howManyToList);
  }


  // GET One Article, by ID
  getArticle(idPassedIn) {

     /* NEW. Article Detail Page URL is CHANGING.

     But we are KEEPING the same route/path. (See /src/app/app.module.ts)
     We'll just treat/handle the "/:article_id" parameter string in a new way.

     WAS: http://0.0.0.0:4206/articles/5af746cea7008520ae732e2c

     IS NOW: http://0.0.0.0:4206/articles/trump-fuel-efficiency-rollbacks--aid--5af746cea7008520ae732e2c

     See also notes in /src/app/article/article.component.ts,
     where the Client App links are created,
     to navigate from the Article Component in the List,
     down to the Article Detail Component.
     */

    // ORIGINAL LINE THAT CALLS API
    // WE LEAVE THIS UNCHANGED.  API is UNCHANGED TOO.
    return this._serviceHttp.get(apiUrlStubInService + '/' + idPassedIn);
  }


    createArticle(myFormFieldsAndFiles) {  // << This is FormData

      console.log('HERE IN THE SOIVICE myFormFieldsAndFiles is ', myFormFieldsAndFiles) // you won't see this FormData here via console.log() .... Need xhr to "debug":

      var myxhr4 = new XMLHttpRequest;
      myxhr4.open('POST', '/myFormFieldsAndFilesInService', true);
      myxhr4.send(myFormFieldsAndFiles);
      /*
       ------WebKitFormBoundary6CarGlAr09T1oBoP
       Content-Disposition: form-data; name="articleUrl_name"

       http://nytimes.com
       ------WebKitFormBoundary6CarGlAr09T1oBoP
       Content-Disposition: form-data; name="articleTitle_name"

       ht
       ------WebKitFormBoundary6CarGlAr09T1oBoP
       Content-Disposition: form-data; name="articlePhotos_name"

       ["sometimes__1526731008173_15Mideast-Visual1-superJumbo-v3.jpg","sometimes__1526731008174_051218krugman1-jumbo.png"]
       ------WebKitFormBoundary6CarGlAr09T1oBoP--
       */

      return this._serviceHttp.post(apiUrlStubInService,
         myFormFieldsAndFiles
      );
  }

  uploadArticleImages(myFormDataFilesHere) {
    // 1). On User clicking "Choose File(s)"
    //     this uploads image(s) to the REST API
    //     which uses Multer to stow them in /public/img
    return this._serviceHttp.post(apiUrlStubInService + 'articleimages', myFormDataFilesHere);
  }

  updateArticle(idPassedIn, editedArticle) {
    return this._serviceHttp.put(apiUrlStubInService + '/' + idPassedIn, editedArticle)
  }

  deleteArticle(idPassedIn) {
    return this._serviceHttp.delete(apiUrlStubInService + '/' + idPassedIn)
  }

}

export const apiUrlStubInService = environment.apiUrlStubInEnvironment;
/*
 http://0.0.0.0:8089/api/v1/articles/
 http://192.168.1.126:8089/api/v1/articles/
 http://104.236.198.117:8089/api/v1/articles/
 */

// NEW: Basically same stub, for <IMG SRC="" />
export const imgUrlStubInService = environment.imgUrlStubInEnvironment;
/*
  http://0.0.0.0:8089/
  http://192.168.1.126:8089/
  http://104.236.198.117:8089/
 */

export const mongodbCollection = 'newarticles'; // See MODEL INFO:
/* From /server/models/articleModel.js : We've renamed from original 'Article' to 'Newarticle'.
Simply to get a new, different Collection to write to, read from. No other change. Same schema.

 var articleModelVarHere = mongoose.model('Newarticle', articleSchema)
 */

export const gitRepo = 'e31-7-combo';
/*
 https://github.com/wreilly/e31-7-combo
 */