var articleDataServiceHereInApiController = require('../../data-service/articleService')

// TOC = Table Of Contents

/* $$$$$   TOC   $$$$$$$$$$$$$$$$$

 * apiArticlesRouter.get('/edit?articleId_query', ...)  >> apiArticleController.apiGetArticleToEdit
 *
 * NEW: 2018-04-20
 * apiArticlesRouter.get('/first-n?howMany_query', ...) >> apiArticleController.apiGetFirstNArticles
 *
 * apiArticlesRouter.get('/:idHere', ...)  >> apiArticleController.apiGetArticleById
 *
 * apiArticlesRouter.get('/', ...) >> apiArticleController.apiGetAllArticles
 *
 * apiArticlesRouter.post('/', ...) >> apiArticleController.apiCreateArticle
 *
 * apiArticlesRouter.put('/:idToEditHere', ...) >> apiArticleController.apiUpdateArticle
 *
 * apiArticlesRouter.delete('/:idToDeleteHere, ...) >> apiArticlesController.apiDeleteArticle

 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */


var apiArticleController = {}
/* MODULE AS PLAIN OLD JAVASCRIPT OBJECT. EXPORT AS POJSO. STATIC METHODS. */

/* Trying to use module as function was causing Trouble.
See bottom of file for notes.

 function apiArticleController() {
 VERY HELPFUL:
 https://stackoverflow.com/questions/20534702/node-js-use-of-module-exports-as-a-constructor
 Node.js - use of module.exports as a constructor
 According to the Node.js manual: If you want the root of your module's export to be a function (such as a constructor) or if you want to export a complete object in one assignment instead of ...
 */


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiGetArticleToEdit   !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiGetArticleToEdit = function(req, res, next) {

    var articleIdToEdit = req.query.articleId_query
    // From article.pug form hidden input field

    articleDataServiceHereInApiController.findArticleById(articleIdToEdit)
        .then(
            (whatIGot) => {
                // fulfilled/resolved
                /*
                Please note: Even though we are in the *API* Controller,
                 for THIS step 1 part of Edit, we DO want to still use Express App Router Render.
                 On the SUBSEQUENT step part 2 of Edit, we *will* just "Send data" via HTTP from the API back to client-side JavaScript.

                 That is:
                 - 1. THIS step is: Pls render me a web app page with the "Edit Article" form in it, populated with this article.
                 - 2. NEXT step will be upon 'submit' of that form, to "just send" data, and that data will just be stuck on the page (added to DOM) by client-side JavaScript.
                 */
                res.render('articleedit.pug', { article: whatIGot})
            },
            (problemo) => {
                // rejected
                console.log('api Controller find article to edit rejected. problemo: ', problemo)
            }
        )
        .catch((err) => console.log('CATCH api Controller find article to edit. err: ', err))
}



/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiGetFirstNArticles  !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiGetFirstNArticles = function(req, res, next) {

    var howManyToGet = req.query.howMany_query
    // For Assignment 5 (Express, no Angular): On article.pug form, hidden input field
    // For Assignment 6 (Angular): On app.component.html, button on-click

    articleDataServiceHereInApiController.findFirstNArticles(howManyToGet)
        .then(
            (whatIGot) => {
                // resolved
                console.log('First N - First N ? whatIGot ', whatIGot)
                res.send(whatIGot) // "first n articles ..."
            },
            (problemo) => {
                // rejected
                console.log('First N - problemo in rejected Promise ', problemo)
            }
        )
        .catch((err) => console.log('First N - Err in Catch API Controller ', err))
}





/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiGetArticleById   !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiGetArticleById = function (req, res, next) {

    var idThisTime = req.params.idHere
    articleDataServiceHereInApiController.findArticleById(idThisTime)
        .then(
            (whatIGot) => {
                if(!whatIGot) {
                    // empty document. found nothing. 0 results
                    console.log("404 sorry not for that id: " + idThisTime)
                    res.status(404).send("sorry not for that id: " + idThisTime)
                }
                res.send(whatIGot)
            },
            (problemo) => {
                // rejected
                console.log('api Controller getArticleById problemo ', problemo)
            }
        )
        .catch((err) => console.log('catch err ', err))
} // /get article by _id





/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiGetAllArticles   !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiGetAllArticles = function (req, res, next) {

    articleDataServiceHereInApiController.findAllArticles()
        .then(
            (whatIGot) => {
                // resolved

                // Note: My client-side JavaScript does do JSON.stringify().
                // /public/javascript/utils.js
                // So it does work to just send the JavaScript Object (whatIGot)
                // res.send(whatIGot)
                // Let's just look at one of them... [0]
                console.log('1. Controller whatIGot[0] (from data service) ', whatIGot[0])
                /*
                A JavaScript OBJECT:
                 whatIGot
                 :
                 Array(20)
                 0
                 :
                 model {$__: InternalCache, isNew: false, errors: undefined, _doc: {…}, $init: true}
                 1
                 :
                 model
                 $__
                 :
                 InternalCache {strictMode: true, selected: {…}, shardval: undefined, saveError: undefined, validationError: undefined, …}
                 $init
                 :
                 true
                 articleTitle
                 :
                 "Expelling, well, kinda not really 01234567896553 MODERATE Russians was the Right Thing do do"
                 articleUrl
                 :
                 "https://www.nytimes.com/2018/03/26/world/europe/europe-russia-expulsions.html"
                 errors
                 :
                 undefined
                 */
                var strungWhatIGot = JSON.stringify(whatIGot)
                // console.log('2. strungWhatIGot ', strungWhatIGot)
                /*
                 [{"articlePhotos":[],"_id":"5ac35e6fa15feb87da63efa5","articleUrl":"https://www.nytimes.com/2018/03/30/sports/catholic-basketball-final-four.html","articleTitle":"Why Some Baptist Colleges Fail at Basketball","__v":0,"articleCategory":"undefined"},{"articlePhotos":[], ...}]
                 */

                /* Yes, a STRING. Out of all the extra data in that Object, here is the sort of ".toString()" version, at least of the whatIGot.data I guess, that JSON.stringify apparently delivers:
                 "[{"_id":"5ab991e7176b6011a4c561c3","articleUrl":"https://www.nytimes.com/video/us/100000005813009/stephon-clark-killed-police-sacramento...}]"
                 */
                res.send(JSON.stringify(whatIGot)) // YES (so long as client-side correctly set up)
                // res.send(strungWhatIGot) // YES same story
                // res.send(whatIGot) // YES also (even not "stringified()")
            },
            (problemo) => {
                // rejected
                console.log('problemo in rejected Promise ', problemo)
            }
        )
        .catch((err) => console.log('Err in Catch API Controller ', err))
}



/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiUploadedArticleImagesNowDoNothing   !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiUploadedArticleImagesNowDoNothing = function(req, res, next) {
    // Hmm. The router call did the Multer work with the images already
    // Nothing to do here in the Controller as I understand it.

    console.log('REST API CONTROLLER apiUploadedArticleImagesNowDoNothing req.files: ', req.files)
    console.log('REST API CONTROLLER apiUploadedArticleImagesNowDoNothing req.files[0].path ', req.files[0].path)

    // We'll just fire next() ? Is that moral equivalent of a return, or a res.send etc. ?? we shall see.
    console.log('apiUploadedArticleImagesNowDoNothing ... res.send << OK ')
    res.send({ "crazymessage": "RES.SEND in JSON, Congratulations, your file(s) was/were uploaded.","yourpathonefile": req.files[0].path, "allreqfiles": req.files })

    /* Hooray for our side
    We here get back all we need re: FILES.
    - An Array. For each File we get a) original filename, b) renamed filename, c) etc. Bon.

     allreqfiles
     :
     Array(2)
     0
     :
     destination
     :
     "public/img"
     encoding
     :
     "7bit"
     fieldname
     :
     "file"
     filename
     :
     "sometimes__1526723788740_15Mideast-Visual1-superJumbo-v3.jpg"
     mimetype
     :
     "image/jpeg"
     originalname
     :
     "15Mideast-Visual1-superJumbo-v3.jpg"
     path
     :
     "public/img/sometimes__1526723788740_15Mideast-Visual1-superJumbo-v3.jpg"
     size
     :
     288248

     length
     :
     2
     __proto__
     :
     Array(0)
     crazymessage
     :
     "RES.SEND in JSON, Congratulations, your file(s) was/were uploaded."
     yourpathonefile ... etc.
     :
     */
}


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiCreateArticle   !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiCreateArticle = function(req, res, next) {

    var articleToSave = {}
    articleToSave.articleUrl = req.body.articleUrl_name
    articleToSave.articleTitle = req.body.articleTitle_name
    articleToSave.articlePhotos = req.body.articlePhotos_name

    console.log('req.body.articlePhotos_name: ', req.body.articlePhotos_name);
    /* 20180519-0636 Array of renamed filenames:
     ["sometimes__1526724579866_15Mideast-Visual1-superJumbo-v3.jpg","sometimes__1526724579872_051218krugman1-jumbo.png"]
     */
    console.log('req.files: ', req.files) // [] empty. okay.

    console.log('SERVER. Controller. articleToSave: ', articleToSave)
    /* 20180519-0627
    Good. What we need, expect: Form field information only. No "files" per se. Okay.

     ------WebKitFormBoundaryxqXAkvb69BQla2a7
     Content-Disposition: form-data; name="articleUrl_name"

     https://www.nytimes.com/section/us?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=U.S.&WT.nav=page
     ------WebKitFormBoundaryxqXAkvb69BQla2a7
     Content-Disposition: form-data; name="articleTitle_name"

     React pics number 3
     ------WebKitFormBoundaryxqXAkvb69BQla2a7
     Content-Disposition: form-data; name="articlePhotos_name"

     ["sometimes__1526724579866_15Mideast-Visual1-superJumbo-v3.jpg","sometimes__1526724579872_051218krugman1-jumbo.png"]
     ------WebKitFormBoundaryxqXAkvb69BQla2a7--
     */

    articleDataServiceHereInApiController.saveArticle(articleToSave)
        .then(
            (whatIGot) => {
                console.log('Article Saved! ', whatIGot)
                /* Back from MongoDB
                 Notes on the "articlePhotos" property:
                 We used JSON.stringify() to store the Array of Strings with renamed photo filename(s).
                 (Why JSON.stringify()?
                 Because (according to Google/S.O.) it was pretty much the only way
                 to get processing a FormData FileList of Files (which is not really an Array)
                 to get into a real Array, albeit a real Array that holds one string.
                 One "JSON.stringified()" String.
                 That String is in fact itself a stringified version of an Array of Strings.
                 That is what then goes to the database. (MBU)
                 Cheers.

                 Therefore in the database we have:
                 - an Array, that holds one String (in single quotes).
                 - And that String contains a (sort-of, textually rendered) "Array"
                 - which holds Strings (double-quoted)
                 - of renamed photo filenames
                 So we must use JSON.parse() wherever we eventually consume this data. Cheers encore.

                 { articlePhotos:
                 [ '["sometimes__1526724579866_15Mideast-Visual1-superJumbo-v3.jpg","sometimes__1526724579872_051218krugman1-jumbo.png"]' ],
                 _id: 5afffaadbe8eecd714bdcf0a,
                 articleUrl: 'https://www.nytimes.com/section/us',
                 articleTitle: 'React pics number 3',
                 __v: 0 }
                 */
                res.send(whatIGot)
            },
            (problemo) => {
                console.log('Rejected Promise API Create Article. problemo: ', problemo)
                // E.g., Error: articleServiceSAVERejected
                res.send(problemo)
            }
        )
        .catch((err) => {
            console.log('Catch Err API Create Article. err: ', err)
            throw new Error('Thrown Error. API Create Article', err)
        })
}



/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiUpdateArticle      !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiUpdateArticle = function(req, res, next) {
    /*
     https://canvas.harvard.edu/courses/35096/pages/week-9-rest-api-routes?module_item_id=369603
     http://mongoosejs.com/docs/documents.html#updating
     */

    // GET _ID OFF URI PARAM
    var idForUpdate = req.params.idToEditHere

    // Get Form Data off req.body
    var articleDataToUpdate = {}
    /* Note: Naming Convention
    You must keep this naming convention I use TO THE END:
    - form field name I use: name="articleTitle_name"
    - that name ("articleTitle_name") is the variable, pointer to, the string value
    - KEEP that name (articleTitle_name) TO THE END of all this app processing
    - Only on the last place where you finally actually put the value onto what is HEADED TO THE DATABASE do we finally drop the suffix "_name" and just call it "articleTitle"
    - Why?
    - Because it is (only) over in the database that it is actually called "articleTitle"
    - Everything out in the app enroute to the database (create/save, edit/update) I use this naming convention of calling it "articleTitle_name"
     */
    articleDataToUpdate.articleTitle_name = req.body.articleTitle_name
    articleDataToUpdate.articleUrl_name = req.body.articleUrl_name

    return articleDataServiceHereInApiController.updateArticle(idForUpdate, articleDataToUpdate)
        .then((whatIGot) => {
            res.send(whatIGot)
    })
}



/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* !!!!!  apiArticleController.apiDeleteArticle      !!!!! */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
apiArticleController.apiDeleteArticle = function(req, res, next) {

    var idSomething = req.params.idToDeleteHere
    console.log('idSomething is sure ', idSomething)

    // http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
    articleDataServiceHereInApiController.deleteArticle(idSomething)
        .then(
            (returnedDocument) => {
                res.send(returnedDocument) // back to client-side JavaScript
            }
        )
        .catch((err) => console.log('apiController Delete CATCH err: ', err))
}





module.exports = apiArticleController


/*   Notes:

MODULE AS FUNCTION.
EXPORTS A CONSTRUCTOR I GUESS YOU'D CALL IT.
Then use .PROTOTYPE. METHOD. On the Instance(s) */
/*
 function apiArticleController() {
 // Got It To Work.   I'm to use a .prototype. method (on the instances) Hmm.

 apiArticleController.prototype.apiGetAllArticles = function (req, res, next) {
     articleDataServiceHereInApiController.findAllArticles()
        .then(
            (whatIGot) => {
 // resolved
 res.send(whatIGot)
 },
 (problemo) => {
 // rejected
 console.log('problemo in rejected Promise ', problemo)
 next()
          }
     )
     .catch((err) => console.log('Err in Catch API Controller ', err))
    }
 }

 module.exports = apiArticleController
 */

/*
Related Notes from the Router:
 */
/* FOR CONTROLLER EXPORTED AS FUNCTION/CONSTRUCTOR  -  NEW () .PROTOTYPE. METHOD */
/* YES WORKS
 apiArticlesRouter.get('/', function(req, res, next) {
    console.log('ahoy? 777 FUNCTION CONSTRUCTOR')
    var apiArticleControllerHereInApiInstance = new apiArticleControllerHereInApi()
    apiArticleControllerHereInApiInstance.apiGetAllArticles(req, res, next)
 })
 */

