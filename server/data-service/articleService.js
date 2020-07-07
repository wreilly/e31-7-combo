var mongoose = require('mongoose')
var articleModelHereInService = require('../models/articleModel')

var runModelPromises = true

/*         !! Important Note !!
 ----------------------------------------------

There is ONE data service.

There are TWO controllers that call it.

Below are listings to show how each of the two controllers make their different calls
 into the same, shared methods on this one data service.

 - 1. Express Router Web App
 - 2. REST API

 ----------------------------------------------
 */

// TOC = Table Of Contents

/* $$$$$   TOC # 1 (of 2) - EXPRESS APP   $$$$$$$$$$$$$$$$$

 * articlesRouter.get('/', ...) >> articleController.getAllArticles >> static findAllArticles() >> articleModelHereInService.find()
 *
 * articlesRouter.get('/:idInRouter', ...) >> articleController.getOneArticle  >> static findArticleById(idPassedIn) >> articleModelHereInService.findById(idPassedIn)
 *
 * articlesRouter.post('/', ...) >> articleController.createArticle >> articleService.saveArticle(articleToSave) >> articleDocumentToSaveHereInService.save()

 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */


/* $$$$$   TOC # 2 (of 2) - REST API   $$$$$$$$$$$$$$$$$

 * apiArticlesRouter.get('/', ...) >> apiArticleController.apiGetAllArticles >> static findAllArticles() >> articleModelHereInService.find()
 *
 * apiArticlesRouter.get('/edit?articleId_query', ...) >> apiArticleController.apiGetArticleToEdit >> static findArticleById(idPassedIn) >> articleModelHereInService.findById(idPassedIn)
 *
 * apiArticlesRouter.get('/:idHere', ...)  >> apiArticleController.apiGetArticleById >> static findArticleById(idPassedIn) >> articleModelHereInService.findById(idPassedIn)
 *
 * NEW: 2018-04-20.
 * For Assignment 6.
 * My own self-imposed "application requirement":
 * - "Get Me This Many Articles" (i.e., first n articles) MongoDB: find().limit(n)
 * apiArticlesRouter.get('/first-n?howMany_query', ...) >> apiArticleController.apiGetFirstNArticles >> static findFirstNArticles(howMany) >> articleModelHereInService.find().limit(howmany)
 *
 * apiArticlesRouter.post('/', ...) >> apiArticleController.apiCreateArticle >> articleService.saveArticle >> articleDocumentToSaveHereInService.save()
 *
 * apiArticlesRouter.put('/:idToEditHere', ...) >> apiArticleController.apiUpdateArticle >> static updateArticle(idToUpdatePassedIn, ...) >> articleModelHereInService.update(idPassedIn, ...)
 *
 * apiArticlesRouter.delete('/:idToDeleteHere', ...) >> apiArticleController.apiDeleteArticle >> static deleteArticle(idPassedIn) >> articleModelHereInService.findByIdAndRemove(idPassedIn...)
 *
 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */


class articleService {

    /* As noted above, all of these methods are shared by both Express App and API */

    /* ********************************* */
    /* *** Find All Articles *********** */
    /* ********************************* */
    static findAllArticles() {
        if(runModelPromises) {
            console.log('articleService runModelPromises time!')
            return articleModelHereInService.find()
                .then((whatIGot) => {
                        // resolved
                        console.log('articleService runModelPromises resolved whatIGot[0]', whatIGot[0])
                        return whatIGot
                    },
                    (problemo) => {
                        // rejected
                        console.log('Here in articleService - findAllArticles - Rejected Promise problemo: ', problemo)
                        throw new Error('AllArticlesFindError',  problemo)
                    }
                )
                .catch((err) => console.log('Here in articleService - findAllArticles - catch err: ', err))
        }
    } // /findAllArticles()


    /* ********************************* */
    /* *** Find One Article, By ID *********** */
    /* SPECIAL NOTE: This one Data Service method is used
                     by TWO API Router/Controller endpoints:
                       1. GET '/api/v1/articles/edit?articleId_query=5ab99...'
                       2. GET '/api/v1/articles/12345'   i.e., :idHere param
     */
    /* ********************************* */
    static findArticleById(idPassedIn) {

        return articleModelHereInService.findById(idPassedIn)
            .then(
                (whatIGot) => {
                    // resolved
                    console.log('articleService whatIGot', whatIGot) // Model object

                    /* OY. 20180623-1107
                    We are only getting that FAKEPATH nonsense. What is going. on.
                     _doc
                     :
                     articlePhotos
                     :
                     ["C:\fakepath\merlin_137026530_5750f3c2-339f-4890-bf80-f2959d79e4e4-master768.jpg", toBSON: ƒ, _atomics: {…}, _parent: model, _cast: ƒ, _markModified: ƒ, …]
                     articleTitle
                     :
                     "Trump HELL Ye Olde Edite 2 v. the Department of Justice"
                     articleUrl
                     :
                     "https://www.nytimes.com/2018/05/21/opinion/trump-investigation-russia-surveillance.html"
                     __v
                     :
                     0

                     */



                    return whatIGot
                },
                (problemo) => {
                    // rejected
                    console.log('Data Service findArticleById() problemo: ', problemo)
                }
            ).catch((err) => console.log('Data Service findArticleById() CATCH err ', err))
    }


    /* ********************************* */
    /* *** Find First 'n' Articles *********** */
    /* SPECIAL NOTE: Self-imposed "application requirement"
                     GET '/api/v1/articles/first-n?howMany_query=3'
     */
    /* ********************************* */
    static findFirstNArticles(howManyPassedIn) {
        var howManyPassedInAsNumberNotString = parseInt(howManyPassedIn)

        /* TERRIBLE CODING AHEAD - NON D.R.Y.
         NEW. To support "Clear All Articles" button.
         If zero sent, launch an impossible "find({})" that
         will FIND NOTHING. Return results of that.
         */

        if (howManyPassedInAsNumberNotString == 0) {
// No.             return []; // << ain't right, just empty array
            return articleModelHereInService.find({articleTitle: 'NEVERFINDMERETURNZERO'}).limit(howManyPassedInAsNumberNotString)
                .then(
                    (whatIGot) => {
                        // resolved
                        console.log('articleService whatIGot, first "n" ', whatIGot) // YES e.g. 2 or 4 articles
                        console.log('First "n" = howMany:', howManyPassedIn) // YES  e.g. 2 or 4
                        return whatIGot
                    },
                    (problemo) => {
                        // rejected, unfulfilled
                        console.log('Data Service findFirstNArticles(howMany) problemo: ', problemo)
                    }
                )
                .catch((err) => console.log('Data Service findFirstNArticles(howMany) CATCH err', err))
        } else {
            // THE REAL FIND FUNCTION
            return articleModelHereInService.find({}).limit(howManyPassedInAsNumberNotString)
                .then(
                    (whatIGot) => {
                        // resolved
                        console.log('articleService whatIGot, first "n" ', whatIGot) // YES e.g. 2 or 4 articles
                        console.log('First "n" = howMany:', howManyPassedIn) // YES  e.g. 2 or 4
                        return whatIGot
                    },
                    (problemo) => {
                        // rejected, unfulfilled
                        console.log('Data Service findFirstNArticles(howMany) problemo: ', problemo)
                    }
                )
                .catch((err) => console.log('Data Service findFirstNArticles(howMany) CATCH err', err))
        }
    }
    /* WORKING RIGHT: shows (first) 2 articles
     http://0.0.0.0:8089/api/v1/articles/first-n?howMany_query=2
     */


    /* ********************************* */
    /* *** Update Article   *********** */
    /* ********************************* */
    static updateArticle(idToUpdatePassedIn, articleDataToUpdatePassedIn) {

        /* NEW 20180623-1031
         In Edit/Update, ADD NEW PHOTO(s)...
         */


        console.log('SUPER-DUPER-OOFFAA ******** articleDataToUpdatePassedIn ', articleDataToUpdatePassedIn)
        /* UPDATE: I see Title and URL ... Now time to add the Photos Filenames Array. :o)
         {articleTitle_name: "Trump’s WAYZO Gots to go 3345 Twice BAZZARRO  We L…CIENT Fuel Efficiency Rollbacks Will Hurt Drivers", articleUrl_name: "https://www.nytimes.com/2018/05/11/opinion/trump-fuel-efficiency-rollbacks.html"}


        ?
        Why only Title field?
         articleDataToUpdatePassedIn         {articleTitle_name: "Mueller EDIT Plans to Wrap Up Obstruction Inquiry Into Trump by Sept. 1, Giuliani Says"}
         */


        /*  Notes:
         1. I tried this two ways:
         - UPDATE()
         - FINDBYIDANDUPDATE()  << Preferred, for this use case

        Mongoose Model.update - this did work
        But, this is for having NO Document Returned.
         http://mongoosejs.com/docs/documents.html
         "If we don't need the document returned in our application and merely want to update a property in the database directly, Model#update is right for us..."

        So, I need another choice:
         http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
         */
        // NEW. Let's (what the hell) update the URL, too. hey.
        /*
        Huh. Did na work.
        boo-hoo.
        What (the h.) is URL here, anyhoo?
         */
        console.log('******** articleDataToUpdatePassedIn.articleUrl_name ', articleDataToUpdatePassedIn.articleUrl_name)
        console.log('******** articleDataToUpdatePassedIn.articleTitle_name ', articleDataToUpdatePassedIn.articleTitle_name)

        console.log('******** articleDataToUpdatePassedIn.articlePhotos_name ', articleDataToUpdatePassedIn.articlePhotos_name)

        /* 20180628-0740
        Boys and girls, we are going to try to NIP this bad boy,
        right here in the B-U-D. Whoa.

        O.M.G. It Worked.
        Goodness Griefiness.
        wswhooohhhhwwhh (sound, breath, exhalation, all that)

IN SUM - YAH, WE DID NEED TO DO ANOTHER JSON.stringify()
OF THAT CRAZY SIMPLE ARRAY OF STRINGS
BEFORE SENDING IT TO MONGOOSE / MONGO
FOR WHATEVER THE HELL IT IS THEy DO
IN TERMS OF STORING THIS AWAY.
YEESH.
And as a further comment: when you JSON.stringify()
this sort of thing, and then you debug either using
console.log(), OR using debugging in Chrome DevTools,
you do ***NOT*** get to "see" what it looks like.
You always see:
[ "asdf", "qwer" ]
You do NOT get to see (what actually lands in the database):
[ '["asdf", "qwer"] ' ]
NOR (same thing):
[ "[\"asdf\", \"qwer\"]" ]

JESUS H. CHRIST.

        Relevant console explorations:
        In sum: yeah, parsing then stringifying then parsing again ...
        ... it WORKS. Lessee if it'll do that Magic for ME
        ============
         var p5 = " [ \"asdf\", \"qwer\" ] "
         undefined
         var p6 = JSON.parse(p5)
         undefined
         p6
         Array [ "asdf", "qwer" ]
         ...
         p6
         Array [ "asdf", "qwer" ]
         p13 = JSON.parse(p6)
         SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data[Learn More] debugger eval code:1:7
         p14 = JSON.stringify(p6)  <<<<< THE MAGIC PART
         "[\"asdf\",\"qwer\"]"
         p14
         "[\"asdf\",\"qwer\"]"
         var p15 = JSON.parse(p14)
         undefined
         p15
         Array [ "asdf", "qwer" ]
         ============
         */

        var theLateGreatWhatTheHell = JSON.stringify(articleDataToUpdatePassedIn.articlePhotos_name); // << YES !!!
        console.log('******** theLateGreatWhatTheHell (JSON.stringify(articleDataToUpdatePassedIn.articlePhotos_name) ', theLateGreatWhatTheHell);
/*
Note that the "console.log()" nonsense does ***NOT*** show us what this thing
***TRULY*** is.   :o(
* ******** theLateGreatWhatTheHell (JSON.stringify(articleDataToUpdatePassedIn.articlePhotos_name)  ["sometimes__1530187445867_27vid-trump-kennedy-1-thumbLarge.jpg","sometimes__1530187445870_28midterm_xp-superJumbo.jpg","sometimes__1530188021581_00republicans1-jumbo-v3.jpg"]
*
*
* WHAT IS IN THE (G.D.) DATABASE (which is correct and right and good):
* "articlePhotos" : [ "[\"sometimes__1530187445867_27vid-trump-kennedy-1-thumbLarge.jpg\",\"sometimes__1530187445870_28midterm_xp-superJumbo.jpg\",\"sometimes__1530188021581_00republicans1-jumbo-v3.jpg\"]" ],
 */


        return articleModelHereInService.findByIdAndUpdate(
            {_id: idToUpdatePassedIn},
            { $set:
                {
                   articleTitle: articleDataToUpdatePassedIn.articleTitle_name,
                    articleUrl: articleDataToUpdatePassedIn.articleUrl_name,
                    // articlePhotos: articleDataToUpdatePassedIn.articlePhotos_name,  // << NO !!
                    articlePhotos: theLateGreatWhatTheHell, // << YES!!!
                 }
            },
            { new: true } // Gets you the NEW, just-edited doc (not the orig one)
        )
            .then(
                (whatIGot) => {
                    console.log('articleService. Update. then() whatIGot: ', whatIGot)
                    /*  .update()
                    Not the document. Returns a Mongo transaction report.
                     {n: 1, nModified: 1, opTime: {…}, electionId: ObjectID, ok: 1}
                     */

                    /* .findByIdAndUpdate()
                     model {$__: InternalCache, isNew: false, errors: undefined, _doc: {…}, $init: true}
                     */

                    /* Note / Question
                    Here on the returned Model, I find a property '._doc' which does contain my document. Returning this does work.
                    But:
                    1)What does that underscore naming convention mean?
                    2) Am I doing this the correct way, to get the data I need?
                    3) Does the returned Model expose some other way to get the document it is holding, than grabbing it off this '._doc' property?
                    Feel like I'm missing something.
                    But, this is working.
                     */
                    /* 2018-05-02  Web "Office Hours" with Mike Hilborn
                    Looks like all is O.K. re: the above questioning, wondering:

                      "@William: Underscore notation signifies an internal property of Mongoose model, similar to "_id"."
                      "@William: The "_doc" is a pointer to the document object and its properties, so, yeah, feel free to use it to access properties."

                     */
                    console.log('articleService. Update. then() whatIGot._doc: ', whatIGot._doc)
                    return whatIGot._doc
                }
            )
            .catch((err) => console.log('Service. Update. Catch. err: ', err))
    }




    /* ********************************* */
    /* *** Delete Article   *********** */
    /* ********************************* */
    static deleteArticle(idPassedIn) {

        /* PROMISE STYLE (Works) */

         return articleModelHereInService.findByIdAndRemove(idPassedIn)
         .then(
             (returnedDocument) => {
                 // fulfilled/resolved
                 console.log('PROMISE returnedDocument from DELETE (should be empty document : null) is: ', returnedDocument) // yes, null
                 return returnedDocument
             }
         )
             .catch((error) => console.log('articleService Delete PROMISE CATCH error: ', error))



        /*  CALLBACK STYLE  (Works) */
/*
        return articleModelHereInService.findByIdAndRemove(idPassedIn, function (returnedDocument) {
            // callback
            console.log('CALLBACK returnedDocument from DELETE (should be null) is: ', returnedDocument) // yes, null
            if (!returnedDocument) {
                console.log('articleService Delete  !returnedDocument in CALLBACK returnedDocument is (appropriately) empty (null): ', returnedDocument) // yes, null
                return(returnedDocument)
            } else {
                console.log('articleService Delete  !returnedDocument in CALLBACK returnedDocument is (for some reason) NOT empty: ', returnedDocument)
                return(returnedDocument)
            }
        })
*/

    } // /deleteArticle()


}  // /class articleService



/* ********************************* */
/* ****  Save Article   ************ */
/* ********************************* */
articleService.saveArticle = function(articleToSave) {

    /* "Static" Note:
    As an experiment, this method I defined OUTSIDE the class definition (above).
    It is also STATIC. */


    /* LEARNING. FINDING.
    - Mongoose Model has .create(myDoc)
    - Mongoose Model *prototype* has .save() (no param)
    So if you want to use .save() (below), you must CONSTRUCT (new up) an instance of your Model! A "Document"!
    If you just invoke the Model (class) itself, you cannot use .save(). You must use .create(myDoc)
     http://mongoosejs.com/docs/api.html#create_create
     http://mongoosejs.com/docs/api.html#model_Model-save
     */

    var articleDocumentToSaveHereInService = new articleModelHereInService(articleToSave)

    /* Mongoose: returns a Promise
         http://mongoosejs.com/docs/api.html#model_Model-save
       MongoDB: calls insert(). returns a status
         https://docs.mongodb.com/manual/reference/method/db.collection.save/#insert
     */
    return articleDocumentToSaveHereInService.save()
        .then(
            (articleJustSaved) => {
                // fulfilled/resolved
                // console.log('articleJustSaved: ', articleJustSaved)
                // console.log('articleJustSaved: _DOC ', JSON.parse(JSON.stringify(articleJustSaved))._doc); // Boo-hiss. undefined
                console.log('articleJustSaved: _ID ', JSON.parse(JSON.stringify(articleJustSaved))._id); // Yes: 5f045f616d2fd54b6630ec67
                console.log('articleJustSaved: TITLE ', JSON.parse(JSON.stringify(articleJustSaved)).articleTitle); // Yes: tooquickly
                console.log('SERVICE: articleJustSaved: JSON-JSON ', JSON.parse(JSON.stringify(articleJustSaved)));
                /*
                {articlePhotos: Array(0),
                _id: "5f045c15f9b0bc449c3a6a69",
                articleUrl: "https://reilly2001.info",
                articleTitle: "tooquickly", __v: 0}
                 */

                /* One More Thing To Try = YES :)
                .toObject()
                https://github.com/Automattic/mongoose/issues/1723#issuecomment-26214361
                 */
                const myPseudoLeanObject = articleJustSaved.toObject();
                console.log('01 ', myPseudoLeanObject);
                /*
                01  {
  articlePhotos: [],
  _id: ObjectID {
    _bsontype: 'ObjectID',
    id: <Buffer 5f 04 5f 61 6d 2f d5 4b 66 30 ec 67>
  },
  articleUrl: 'http://nytimes.com/oboyasdf',
  articleTitle: 'pseudofakey',
  __v: 0
}
                 */

                console.log('02 ', JSON.parse(JSON.stringify(myPseudoLeanObject)));
                /*
                02  {
  articlePhotos: [],
  _id: '5f045f616d2fd54b6630ec67',
  articleUrl: 'http://nytimes.com/oboyasdf',
  articleTitle: 'pseudofakey',
  __v: 0
}
                 */


                return articleJustSaved
                // return myPseudoLeanObject // << Yeah worked okay too
            },
            (problemo) => {
                // rejected
                console.log('articleService SAVE rejected Promise from Mongoose .save() ', problemo)
 // E.g. { ValidationError: Newarticle validation failed: articleUrl: Path `articleUrl` is required.
                throw new Error('articleServiceSAVERejected', problemo)
            }
        )
}

module.exports = articleService
