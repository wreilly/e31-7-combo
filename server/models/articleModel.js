var mongoose = require('mongoose')

/*
NEW: 20180512
For CODE CLEAN UP post-project, I am making a NEW Collection,
on the same MongoDB database ('cscie31'):
- articles <<< we had already
- newarticles  <<<< new. it is really the same schema. point is to have a new, different data store, away from the CSCI-E31 final assignment  # 7 deliverable.
A new, different one for development, for code clean up, for future work & Etc.
 */

var articleSchema = new mongoose.Schema({
    articleUrl: {
        type: String,
        required: true
    },
    articleTitle: {
        type: String,
        required: true
    },
    // MULTER-TIME *****
    // https://stackoverflow.com/questions/35509611/mongoose-save-array-of-strings
    /* E.g.,
    ['wr__1525770461453-Photo 3.jpg', 'wr__1525770461459-Photo 4.jpg']

    Note that in the end, owing to FileList and File vagaries, we wound up
    with a JSON.stringify() version of an Array of Strings.
    (escaped double-quote marks in the Array):

     E.g.,
     "[\"sometimes__1526002216902_01FEMALEPILOTS_MONICA-master675.jpg\",\"sometimes__1526002216904_01FEMALEPILOTS1-master675.jpg\",\"sometimes__1526002216906_merlin_137026530_5750f3c2-339f-4890-bf80-f2959d79e4e4-master768.jpg\"]"
     ],

    For that reason the stored data must be processed by JSON.parse() by any consumer of it.
     */

    articlePhotos: [String]

})

// console.log('Let\'s de bug a bit.')
/* Naming:

1.  I can use a variable name as I like, here in the code (e.g. "articleModelVarHere"), to make clear to me what is what, how this works. (At least while learning, student projects, etc.)

2.  *But*, I should *not* use a *Model* name of that sort, and should instead put in a plain descriptive name (e.g. "Article"). (Capital letter the convention.)
 * Why?
  * Because that name ("Article") will be used by Mongoose/MongoDB to create for me a Database Collection that is the lower-cased plural of my name choice (e.g. "db.articles").
 */

// A. NOPE: Capital letter 'M'
// var articleModelVarHere = new mongoose.Model('Article', articleSchema)
/*
 TypeError: 2nd argument to `Model` must be a POJO or string, **not** a schema. Make sure you're calling `mongoose.model()`, not `mongoose.Model()`.
 */
// B. NOPE: Lower-case letter 'm'
// var articleModelVarHere = new mongoose.model('Article', articleSchema)
// http://mongoosejs.com/docs/models.html
// "The .model() function makes a copy of schema."
// C. YEP: Lower-case letter 'm', but *without* 'new'

/*
var articleModelVarHere = mongoose.model('Article', articleSchema)
*/
/*
 NEW: 20180512
 As noted above : a NEW Collection 'Newarticle', yields collection 'newarticles'
 N.B. the Schema is UNCHANGED.
 Also - this is the ONLY place in all the code (I believe/hope) that this other name
 is used. From here, the "articleModelVarHere" and all the other
 references to this downstream from here, can remain (I believe/hope) **UNCHANGED**.
*/
var articleModelVarHere = mongoose.model('Newarticle', articleSchema)


module.exports = articleModelVarHere

/*
 :PRIMARY> db.newarticles.find().pretty()
 {
 "_id" : ObjectId("5af746cea7008520ae732e2c"),
 "articlePhotos" : [
 "[\"sometimes__1526154956356_11bledsoe-superJumbo.jpg\",\"sometimes__1526154956363_11bledsoe2-superJumbo.jpg\"]"
 ],
 "articleUrl" : "https://www.nytimes.com/2018/05/11/opinion/trump-fuel-efficiency-rollbacks.html",
 "articleTitle" : "Trump’s Fuel Efficiency Rollbacks Will Hurt Drivers",
 "__v" : 0
 }

 */