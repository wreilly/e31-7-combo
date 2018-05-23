require('dotenv').config()

/* NEW 20180523
APP-COMBO.JS
Express app server configuration
for the "Combo" arrangement:
- Express Server on :8089 "hosts" the Angular Client *BUILD*
- via 'client_dist_dir_done_right'
Used:
1) in Production
2) in my Kitchen! (SubNet at home, to see on 2nd computer)


The above as opposed to the APP.JS arrangement:
- Express Server on :8089
- Angular Client "ng serve" on :4206 (Not a "build")
Used:
1) in Development (faster response to restart w. new code, on both Client (especially) and Server)
 2) Data from database is on 0.0.0.0:8089/api/v1... therefore seen ONLY on local machine. (NOT on 2nd machine on same SubNet, e.g. in kitchen.)



N.B. Each of these can be run in the Server's 'start-dev' for 'nodemon --inspect'

APP.JS
 $ npm run start            --> node ./bin/www
 $ npm run start-dev        --> nodemon --inspect ./bin/www

APP-COMBO.JS
 $ npm run start-combo      --> node ./bin/www-combo
 $ npm run start-combo-dev  --> nodemon --inspect ./bin/www-combo

 */

var express = require('express')
var appCombo = express()
var path = require('path')

/*
 ASSIGNMENT 7
 https://github.com/wreilly/e31-assignment-08-proxy-and-client-wreilly/blob/master/proxy-server/server.js
 N.B.
 With new "combo" proxy + client Git repository,
 this path now goes UP and OUT of
 the Express /server directory,
 to get over and then down to the
 Angular Client /client/dist directory.
 Video 13.8 at ~07:48
 https://canvas.harvard.edu/courses/35096/pages/week-13-build-and-deploy?module_item_id=378294
 app.use('/', express.static('../client/dist'));
 */

const client_dist_dir_done_right = path.join(__dirname, '..', 'client', 'dist');

/* **********  BREAKING APART THE "COMBO"  ***************
 * Q. Why?
 * A. 1. Takes a little longer to develop the Angular client side: 'ng build' vs. 'ng serve'
 * A. 2. It appears I am losing the console.log() from Angular client code (in Broswer dev console). :o(
 */
appCombo.use('/', express.static(client_dist_dir_done_right))





var bodyParser = require('body-parser')
// https://www.npmjs.com/package/body-parser#extended
appCombo.use(bodyParser.urlencoded({extended: false}))
/*
 https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
 */
// JSON will be used by REST API, to POST, if JSON is used.
// (Note that of course the REST API can also be POSTed to using Form field name-value pairs)
// https://expressjs.com/en/resources/middleware/body-parser.html
// app.use(bodyParser.json) // <<< NO !!!
appCombo.use(bodyParser.json()) // << Yes. You have to *START IT UP* ! (oy)


var mongoose = require('mongoose')
/*
 https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options

 mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

 mongodb://db1.example.net:27017,db2.example.net:2500/?replicaSet=test&connectTimeoutMS=300000

 */
var uri_to_cscie31_db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@clusterwr03-shard-00-00-n783b.mongodb.net:27017,clusterwr03-shard-00-01-n783b.mongodb.net:27017,clusterwr03-shard-00-02-n783b.mongodb.net:27017/cscie31?ssl=true&replicaSet=ClusterWR03-shard-0&authSource=admin`
// The default connection here simply "returns" undefined
// But the mongoose object here knows what db it is connected to
// I don't need to obtain a reference to the connected db, per se, to use here in my code
// Instead, subsequent calls here in my code, to/on the mongoose object (e.g. Schema, Model), will "know" what db they will be attached to
// And from there, the "new" creation of a model, representing a document in a particular Collection, provides the connection and the functionality to exercise the database, from my code.
// E.g. new Article().save()

/* */
mongoose.connect(uri_to_cscie31_db)
    .then(
        // resolve
        () => {
            console.log('Happy database.')
        },
        // reject
        (err) => {
            console.log('Unhappy. Failed database connection ', err)
        }
    )


var articlesRouterHere = require('./routes/articles')

var apiArticlesRouterHere = require('./routes/api/api-articles')

// https://expressjs.com/en/starter/static-files.html
// https://expressjs.com/en/4x/api.html#express.static
// app.use(express.static(path.join(__dirname, 'public')))
appCombo.use('/static', express.static(path.join(__dirname, 'public')))

appCombo.set('view engine', 'pug')
appCombo.set('views', path.join(__dirname, 'views'))

appCombo.use('/api/v1/articles', apiArticlesRouterHere)

/* MUST REMOVE.
 (At least,when in "COMBO" mode, yes ? )
 This Server route path matches what the Angular Client primarily uses.

 // Back "On" now in NON-Combo mode:
 app.use('/articles', articlesRouterHere)
 */


/* Old "Catch-all"
 * Hmm, going back to Non-Combo mode; reinstating this:
 *
 app.get('/', (req, res, next) => {
 console.log('just on the root home page.')
 res.render('index')
 })
 */

/*
 Catch-All:
 - If user hits browser button to refresh page, the Angular SPA will not be first recipient of that new request.
 The Express app will be.
 - For any request the Express app does not have a route for, it will simply
 use this catch-all, and redirect to the Angular index.html page.
 - Recall, the Express (proxy server) app only has one route, for the WS API GET :3000/myspecialproxy/:book_id
 - Anything else will fall to this Catch-All:

 GOING BACK TO NON-COMBO MODE:  comment this out now
 */
appCombo.use('/*', (req, res, next) => {
    res.sendFile('index.html', {root: client_dist_dir_done_right})
})


module.exports = appCombo
