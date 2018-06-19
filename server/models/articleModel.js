var mongoose = require('mongoose')

/*
NEW: 20180512
For CODE CLEAN UP post-project, I am making a NEW Collection,
on the same MongoDB database ('cscie31'):
- articles <<< we had already
- newarticles  <<<< new. it is really the same schema. point is to have a new, different data store, away from the CSCI-E31 final assignment  # 7 deliverable.
A new, different one for development, for code clean up, for future work & Etc.
 */

/* 20180617-0711
Hey. Something odd and crazy about (trying to) "require" a String here:

 https://github.com/Automattic/mongoose/issues/1215
Valeri Karpov: "the general idea is that mongoose allows null and undefined, and required is how you tell mongoose to not allow null or undefined. required is about nullish values, not falsy values."
(e.g. empty string "" is falsy, and mongoose's "required" is NOT validating to check for THAT condition)

William Reilly: "huh? aren't I getting precise opposite behavior?"
(from MY FINDINGS - below)
- when my Angular form input sends null  -- (no touch by user to field on form ("pristine")) -- the "required" here is not doing anything to catch that. It goes through to database
- when my Angular form input sends "" empty string (user entered a character, then deleted back to empty field ("dirty")), the "required" here *IS* catching that, throwing a ValidatorError that articleUrl is required. Good!
But aren't these two results the *opposite* of what Valeri Karpov says above?
?

Hmm:
 http://mongoosejs.com/docs/api.html#schematype_SchemaType-required

MY FINDINGS: << Update. Please note. NOW I do front-end validation on Angular form, so, no more "" nor null here on back-end for Title, URL. Cheers.

null
- If the user does not touch the input field, the resultant value is null
-- That null is NOT validated, required, caught, etc. It goes through. Not Good.

empty string ""
- If the user does, I don't know, click in the input field, enter a space then delete it, etc., the resultant value is "" empty string
-- That empty string IS validated, required, and IS caught. It does NOT go through. Good.
"ValidatorError: ... message: 'Path `articleUrl` is required.',"

The below S.O. code snippet does this:
- It finds out the typeof for your field.
- If you got that null type, it says, yeah, treat this field as Required! And it'll fail which is Good.
- If you got the String empty string "", this code says, nah, do not treat this as Required. It will let that go through.  << For *me* and my use case, not good. For this S.O. writer's use case, that was good.

 https://stackoverflow.com/questions/44320745/in-mongoose-how-do-i-require-a-string-field-to-not-be-null-or-undefined-permitt
 -------
 var userSchema = new mongoose.Schema({
 myField: {
 type: String,
 required: isMyFieldRequired,
 }
 });

 function isMyFieldRequired () {
 return typeof this.myField === 'string'? false : true
 }
 // WR__ variant (idea):
 function wr__isMyFieldRequired() { return true } // << For me, ALWAYS required, be that null (which Mongoose was not catching/enforcing), or "".
----------

 */
//         required: wr__isMyFieldRequired  << hmm. Took this back out. Not needed... (MBU)
var articleSchema = new mongoose.Schema({
    articleUrl: {
        type: String,
        required: true // << reverted to usual 'true' simply, rather than function that returned 'true'
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

function wr__isMyFieldRequired() { return true } // << For me, ALWAYS required, be that null (which Mongoose was not catching/enforcing), or "". Will also catch undefined, were our app to somehow come up with that ( ? ). H'okay.




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