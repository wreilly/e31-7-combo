webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\nYO! Go see /SRC/STYLES.CSS instead. Hey.\n*/\n\n/* RouterLinkActive ~05:02...\nhttps://www.youtube.com/watch?v=T7s4Ie5kdyQ\n */\n\na {\n    color: black;\n}\n\na.active {\n    color: red;\n}\n\n/*\nhttps://www.w3schools.com/howto/howto_css_two_columns.asp\n */\n\n.column {\n    float: left;\n    padding: 10px;\n}\n\n.left {\n    width: 33%;\n}\n\n.middle {\n    width: 34%;\n    background-color: gainsboro;\n}\n\n.right {\n    width: 33%;\n    background-color: aliceblue;\n}\n\n.row:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<strong>APP.COMPONENT</strong>\n<h1>{{ title }}</h1>\n<router-outlet></router-outlet>\n<app-footer bind-copyrightYearInFooter=\"copyrightYear\"></app-footer>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Some Times';
        this.subTitle = 'Newspaper Articles Reference Site - Angular CRUD - with REST API';
        this.copyrightYear = '2018';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__article_article_component__ = __webpack_require__("../../../../../src/app/article/article.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__ = __webpack_require__("../../../../../src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__article_list_article_list_component__ = __webpack_require__("../../../../../src/app/article-list/article-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__article_detail_article_detail_component__ = __webpack_require__("../../../../../src/app/article-detail/article-detail.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__home_home_component__["a" /* HomeComponent */] },
    { path: 'articles', component: __WEBPACK_IMPORTED_MODULE_10__article_list_article_list_component__["a" /* ArticleListComponent */] },
    { path: 'articles/:article_id', component: __WEBPACK_IMPORTED_MODULE_11__article_detail_article_detail_component__["a" /* ArticleDetailComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__article_article_component__["a" /* ArticleComponent */],
                __WEBPACK_IMPORTED_MODULE_7__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_10__article_list_article_list_component__["a" /* ArticleListComponent */],
                __WEBPACK_IMPORTED_MODULE_11__article_detail_article_detail_component__["a" /* ArticleDetailComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/article-detail/article-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/article-detail/article-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<strong>ARTICLE-DETAIL.COMPONENT</strong>\n\n<div *ngIf=\"theArticleHereInDetailPage\">\n    <div *ngIf=\"!editing\">\n        <h3>Article Detail DISPLAY Page</h3>\n        <h2><a bind-href=\"theArticleHereInDetailPage.articleUrl\" target=\"_nytblank\">{{ theArticleHereInDetailPage.articleTitle }}</a></h2>\n        <p>Some Times - API URL: <a bind-href=\"articleApiUrlWithId\" target=\"_apiblank\">{{articleApiUrlWithId}}</a>\n        </p>\n        <div *ngFor=\"let onePic of theArticlePhotosArrayHereInDetailPage\">\n            <img src=\"{{imgUrlStubInThisComponent}}static/img/{{onePic}}\" alt=\"\" width=\"400\"  />\n            <br />\n            <div class=\"tiny\">{{ onePic }}</div>\n            <br />\n        </div>\n        <p class=\"tiny\">{{theArticleHereInDetailPage.articleUrl}}\n        </p>\n        <p class=\"tiny\">{{theArticleHereInDetailPage._id}}</p>\n        <button (click)=\"letUsEdit()\">Let's Edit (or Delete!)</button>\n    </div>\n    <div *ngIf=\"editing\">\n        <h3>Article EDIT or DELETE Page</h3>\n\n        <!--  2-way binding biz.\n        We are doing 2-way binding, kind of just to show off.\n        For the heck of it. Show it can be done.\n\n        The headline value appears in large letters for read-only,\n        but the same headline value is in the editable input box right below.\n\n        We apply the 2-way binding code (details below) to the <input> element.\n\n        When the user changes the headline in the input element,\n        the large-lettered display changes too.\n        (And yes, if they Cancel out of editing, we do preserve and restore\n        the initial value.)\n\n        https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html\n        [(ngModel)]\n        syntactic sugar for:\n          bind-value=\"theArticleHereInDetailPage.articleTitle\"\n          on-input=\"theArticleHereInDetailPage.articleTitle = $event.target.value\"\n          OR:\n        [value]=...\n        (input)=...\n          OR:\n         [(ngModel)]=...\n        -->\n\n        <h2>{{ theArticleHereInDetailPage.articleTitle }}</h2>\n\n        <!-- TEMPLATE-DRIVEN ANGULAR FORM y not\nhttps://blog.thoughtram.io/angular/2016/03/21/template-driven-forms-in-angular-2.html#submitting-a-form-and-accessing-its-value\n        -->\n        <p>Angular TEMPLATE-DRIVEN FORM</p>\n        <div style=\"border-color: blue; border-style: dashed; padding: 10px;\">\n        <form ref-myArticleEditForm_ref=\"ngForm\" on-ngSubmit=\"letUsSave(myArticleEditForm_ref.value)\">\n            <p>Edit the Headline: <input\n                    type=\"text\"\n                    ref-articleTitle_ref\n                    id=\"articleTitle_id\"\n                    name=\"articleTitle_name\"\n                    size=\"60\"\n                    bind-ngModel=\"theArticleHereInDetailPage.articleTitle\"\n                    on-input=\"theArticleHereInDetailPage.articleTitle = $event.target.value\"\n            />\n            </p>\n\n            <p>New York Times - article URL: {{theArticleHereInDetailPage.articleUrl}}\n            </p>\n            <p>Some Times - API URL: {{articleApiUrlWithId}}</p>\n            <p class=\"tiny\">{{theArticleHereInDetailPage._id}}</p>\n            <button type=\"submit\">Let's Save!</button>\n        </form>\n        </div>\n        <hr />\n        <p>Angular REACTIVE-MODEL-DRIVEN FORM</p>\n        <div style=\"border-color: green; border-style: dotted; padding: 10px;\">\n            <form [formGroup]=\"myArticleEditFormGroup\" on-ngSubmit=\"letUsSaveReactive(myArticleEditFormGroup)\">\n                <p>Edit the Headline:\n                <input\n                        type=\"text\"\n                        id=\"articleTitle_id\"\n                        name=\"articleTitle_name\"\n                        size=\"60\"\n                        formControlName=\"articleTitle_formControlName\"\n                        bind-ngModel=\"theArticleHereInDetailPage.articleTitle\"\n                        on-input=\"theArticleHereInDetailPage.articleTitle = $event.target.value\"\n                >\n                </p>\n      <!-- Yes, works:  [(ngModel)]=\"theArticleHereInDetailPage.articleTitle\" -->\n                <br />\n                <button type=\"submit\">Let's Save!</button>\n            </form>\n\n        </div>\n        <div *ngFor=\"let onePic of theArticlePhotosArrayHereInDetailPage\">\n            <img src=\"{{imgUrlStubInThisComponent}}static/img/{{onePic}}\" alt=\"\" width=\"400\"  />\n            <br />\n            <div class=\"tiny\">{{ onePic }}</div>\n            <br />\n        </div>\n        <hr />\n\n        <!-- Delete is simpler. No need to pass anything. Component already \"knows\" its own ID etc. -->\n        <button on-click=\"letUsDelete()\">Let's Delete</button>\n        <button (click)=\"letUsCancel()\">Let's Cancel Outta Editing Here</button>\n    </div>\n</div>\n\n\n<!--\nDon't quite have this data yet here in Article-Detail...\n<h4>{{ articleHere.articleTitle }}</h4>\n<p>Some Times - API URL: <a bind-href=\"articleApiUrlWithId\" target=\"_apiblank\">{{articleApiUrlWithId}}</a>\n</p>\n<p>New York Times - article URL: <a bind-href=\"articleHere.articleUrl\" target=\"_nytblank\">{{articleHere.articleUrl}}</a>\n</p>\n-->\n"

/***/ }),

/***/ "../../../../../src/app/article-detail/article-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_service__ = __webpack_require__("../../../../../src/app/article.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wrarticle__ = __webpack_require__("../../../../../src/app/wrarticle.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript

// Take 1: NAH. Not for us: Just FormControl, on one <input> (for headline) This is really for SEARCH.
// https://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html#forms-with-a-single-control
// import { FormControl } from '@angular/forms';
// Take 2: Template-Driven
// NO NEED for additional imports viz. Form. Just in app.module.ts where we get { FormsModule }
// https://www.tektutorialshub.com/angular-passing-parameters-to-route/
// https://stackblitz.com/github/Harvard-DCE-CSCIE3/angular-routing-and-CRUD?file=src%2Fapp%2Fphotodetail%2Fphotodetail.component.ts
// Take 3: Adding in REACTIVE-MODEL-DRIVEN Form

var ArticleDetailComponent = /** @class */ (function () {
    function ArticleDetailComponent(_myActivatedRoute, _myArticleService) {
        this._myActivatedRoute = _myActivatedRoute;
        this._myArticleService = _myArticleService;
        this.editing = false;
    }
    ArticleDetailComponent.prototype.ngOnInit = function () {
        //        console.log('ngOnInit this._myArticleService.apiUrlStubInService ', this._myArticleService.apiUrlStubInService); // undefined. hmm.
        /* WORKED when apiUrl etc. was INSIDE already-getting-exported class
                this.apiUrlStubInThisComponent = this._myArticleService.apiUrlStubInService;
        */
        // Now as its own export const:
        this.apiUrlStubInThisComponent = __WEBPACK_IMPORTED_MODULE_2__article_service__["b" /* apiUrlStubInService */];
        this.imgUrlStubInThisComponent = __WEBPACK_IMPORTED_MODULE_2__article_service__["d" /* imgUrlStubInService */];
        // TAKE 3 w. REACTIVE-MODEL-DRIVEN Form:
        this.myArticleEditFormGroup = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormGroup */]({
            'articleTitle_formControlName': new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(4)])
        });
        // Q. ?? this.theArticleHereInDetailPage.articleTitle ?? instead of null?
        // A. No. null appears correct. Here in OnInit you get 'undefined', to try to get the title etc. at this (early) point.
        this.getArticle();
        /* Form "Take 1" We are NOT doing/
         this.articleTitleInputFormControl.valueChanges
         .subscribe(
         (valueSeen) => {
         // Value seen in <input> for headline
         console.log('wow. OnInit. headline valueChanges: ', valueSeen);
         }
         )
         */
    };
    ArticleDetailComponent.prototype.getArticle = function () {
        var _this = this;
        this.subscriptionForId = this._myActivatedRoute.params.subscribe(function (paramsIGot) {
            // data... In the case of an ActivatedRoute, what it sends back when you subscribe is the Params (apparently). Bueno.
            // Note: This param name ('article_id') is set in the app.module.ts appRoutes
            _this.theArticleIdHereInDetailPage = paramsIGot['article_id'];
            _this.articleApiUrlWithId = _this.apiUrlStubInThisComponent + _this.theArticleIdHereInDetailPage;
            // Now, here, right inside the SUBSCRIBE (Observable) to get the ID,
            // let us directly proceed, with that freshly gotten ID, to
            // go ahead right here and use the articleIdParam to now
            // go get the Article from the Service.
            // (That is, by contrast, I had first thought these lines of code would
            //   go *down below* the whole tri-part "subscribe" thing.
            //   That first intuition was NOT RIGHT.)
            _this._myArticleService.getArticle(_this.theArticleIdHereInDetailPage)
                .subscribe(function (articleIGot) {
                // data...
                _this.theArticleHereInDetailPage = articleIGot;
                console.log('subscribe : this.theArticleHereInDetailPage ', _this.theArticleHereInDetailPage); // Yes: the object {} from MongoDB
                // Fill in that REACTIVE Form, too!
                _this.myArticleEditFormGroup.patchValue({
                    articleTitle_formControlName: articleIGot.articleTitle
                });
                /*
                Let's transform the Photo File Names
                In the database they are JSON.stringify()
                Now time to JSON.parse()
                 */
                _this.theArticlePhotosArrayHereInDetailPage = JSON.parse(articleIGot.articlePhotos);
                console.log('this.theArticlePhotosArrayHereInDetailPage ', _this.theArticlePhotosArrayHereInDetailPage);
                /*
                Yes
                 ["sometimes__1525988911510_010006-MexAmerican.jpg", "sometimes__1525988911513_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"]
                 0
                 :
                 "sometimes__1525988911510_010006-MexAmerican.jpg"
                 1
                 :
                 "sometimes__1525988911513_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
                 */
            }, function (error) {
                // error
                console.log('subscribe get Article Error: ', error);
            }, function () {
                // done
            });
        }, function (errorIThink) {
            // error
            console.log('subscribe get Param Id Error: ', errorIThink);
        }, function () {
            // done
        });
    }; // /getArticle()
    ArticleDetailComponent.prototype.letUsEdit = function () {
        // Grab title (headline) before edit
        // Q. Why?
        // A. If they hit Cancel, not Save, we want to restore it.
        // Further A.: Recall, with 2-way data binding, we are letting them
        // (for fun) be able to SEE their edit live on the page.
        // But since that is changing the value in the actual property,
        // if they do hit Cancel we need to be able to restore.
        this.articleTitleCachedBeforeEdit = this.theArticleHereInDetailPage.articleTitle;
        this.toggleEdit();
    };
    ArticleDetailComponent.prototype.letUsCancel = function () {
        // Restore any edit they may have done in the 2-way binding!
        if (this.theArticleHereInDetailPage.articleTitle !== this.articleTitleCachedBeforeEdit) {
            if (confirm('Are you sure you wish to cancel your editing?')) {
                this.theArticleHereInDetailPage.articleTitle = this.articleTitleCachedBeforeEdit; // Put cached value back on
                this.toggleEdit();
            }
            else {
                // User did do some editing, clicked Cancel, then said "No" to leaving, abandoning edits. Wants to KEEP edits, and keep on editing. hmm.
                // just return to where it was ? hmm
                console.log('else nuttin ');
            }
        }
        else {
            // No editing changes detected. They clicked Cancel. Just proceed to cancel out. Leave editing mode.
            this.articleTitleCachedBeforeEdit = ''; // empty out y not
            this.toggleEdit();
        }
    };
    ArticleDetailComponent.prototype.toggleEdit = function () {
        console.log('letUsEdit ', this.editing);
        this.editing = this.editing ? false : true; // toggle. if true, make false. And vice versa
    };
    ArticleDetailComponent.prototype.letUsSave = function (whatIsPassedIn) {
        /* From the HTML:
         <form ref-myArticleEditForm_ref="ngForm" on-ngSubmit="letUsSave(myArticleEditForm_ref.value)">
         */
        // Note: ngSubmit takes care of the event.preventDefault() for you.
        //      (Had we used simply 'submit', we'd have had to do the preventDefault() here.)
        /* This only references the property here on the component.
                 console.log('we are saving ... theArticleHereInDetailPage._id ', this.theArticleHereInDetailPage._id)
        */
        // We want the object passed from the form, to save the edits
        console.log('edit/update time - whatIsPassedIn ', whatIsPassedIn); // YES gets edit. OK
        /* E.g.,
         {articleTitle_name: "Scott TEMPLATE EDIT Pruitt REACTIVE EDIT Before th…ncy Homes, a Shell Company and Friends With Money"}
         VM147086 article-detail.component.ts:143
         */
        // 1. Just whamma-jamma newly edited value onto the component itself:
        /*
        Q. Do I really have to do the whamma-jamma, since I am already doing (for fun) 2-way binding out on that HTML page with the Form?
           (That is, this bit of code came from some example somewhere, and they (like
           most people) did not introduce potentially distracting 2-way binding
           on the HTML page with their form.) And so they do proceed to do whamma-jamma.
        A. Let's try without. ... (musical interlude) ...
           Hey! I was correct-a-mundo. Yippee-zippie.
         */
        /* Can safely be commented out. Bon.
                this.theArticleHereInDetailPage.articleTitle = whatIsPassedIn.articleTitle_name
        */
        console.log('this.theArticleHereInDetailPage.articleTitle ', this.theArticleHereInDetailPage.articleTitle); // Yes. Edited title.
        // 2. Time to go to the database to update it
        console.log('About to use service. this.theArticleIdHereInDetailPage is ', this.theArticleIdHereInDetailPage); // Yes. Correct ID.
        this._myArticleService.updateArticle(this.theArticleIdHereInDetailPage, whatIsPassedIn)
            .subscribe(function (fromDatabaseEditedArticle) {
            // data
            console.log('whoa. fromDatabaseEditedArticle ', fromDatabaseEditedArticle);
            /*
            Remember, after PUT or POST, good
            practice to move the user OFF
            the form page. Prevents submitting
            twice & Etc.
            Though whole page/app reload is kinda brutal.
             */
            // location.replace('/') // works, but also a reload, and takes you to Home, not so good
            location.reload(); // okay we'll go with it.
        });
    };
    ArticleDetailComponent.prototype.letUsSaveReactive = function (formGroupPassedIn) {
        /* From the HTML:
         <form [formGroup]="myArticleEditFormGroup" on-ngSubmit="letUsSaveReactive(myArticleEditFormGroup)">
         */
        // Note: (As noted above) - ngSubmit takes care of the event.preventDefault() for you.
        //      (Had we used simply 'submit', we'd have had to do the preventDefault() here.)
        /*
            letUsSaveReactive({ value, valid }) { ...
            // Use destructuring to get these two things off the FormGroup: .value, .valid. Very groovy.
         */
        /* 20180505_1552 TODO
        Wow. This is NOT easy, simple, straightforward.
        Jesus Christ.
        Better see:
        - https://toddmotto.com/angular-2-form-controls-patch-value-set-value
        - https://stackoverflow.com/questions/45366955/same-form-for-creating-and-editing-data-angular4
        - https://github.com/PeterKassenaar/ng2-form-edit/blob/master/app/edit/city.edit.component.ts
         */
        // Does not need param passed in << Hmm. Think again.
        console.log('this.myArticleEditFormGroup.value is ', this.myArticleEditFormGroup.value);
        /* Yes:
              { articleTitle_formControlName: "Foosball I typed into empty input box. Cheers." }
         */
        console.log('this.myArticleEditFormGroup is ', this.myArticleEditFormGroup);
        //
        console.log('formGroupPassedIn ', formGroupPassedIn);
        /*
         formGroupPassedIn  FormGroup {validator: null, asyncValidator: null, _onCollectionChange: ƒ, pristine: false, touched:
         */
        console.log('formGroupPassedIn.value', formGroupPassedIn.value);
        // { articleTitle_formControlName: "Foosball I typed into empty input box. Cheers." }
        console.log('formGroupPassedIn.valid  ', formGroupPassedIn.valid);
        // true
        console.log('Is they the same? formGroupPassedIn === this.myArticleEditFormGroup ', formGroupPassedIn === this.myArticleEditFormGroup);
        // true  !!! :o)
        /* All right. Time to now actually DO something.

        UPDATE: Looks like you want/need this up in ngOnInit() !
        UPDATE # 2: Actually, we put it in getArticle() (which is yes called right from ngOnInit()).

        This "PATCH" business is how we "bind" (if I may say?), or "set" (better),
        the value of the Article data we have right now right here in this Component instance.
        We are "setting it" into the FormGroup, which is what makes the data available
        out there on the HTML view, in the HTML Form Input field.
         */
        /* Not Done Here. See above (in getArticle(), called by ngOnInit())
                formGroupPassedIn.patchValue({
                    articleTitle_formControlName: this.theArticleHereInDetailPage.articleTitle
                });
        */
        /* "Non-D.R.Y." I suppose:
        We are going to do same database call as we do in letUsSave()
         */
        // 1. NOT NEEDED! The data value is ALREADY here on the Component, via REACTIVE FORM. I think.
        // Just whamma-jamma newly edited value onto the component itself:
        ////       this.theArticleHereInDetailPage.articleTitle = whatIsPassedIn.articleTitle_name
        ////       console.log('this.theArticleHereInDetailPage.articleTitle ', this.theArticleHereInDetailPage.articleTitle ); // Yes. Edited title.
        // 2. Time to go to the database to update it
        console.log('REACTIVE EDIT FORM. About to use service. this.theArticleIdHereInDetailPage is ', this.theArticleIdHereInDetailPage); // Yes. Correct ID.
        /* One Further Little Cleanup!
        1. articleTitle_formControlName: "Scott Pruitt..."
        2. articleTitle_name: "Scott Pruitt..."
        3. articleTitle: "Scott Pruitt..."

        # 1 is how I name it on the REACTIVE Form
        # 2 is how I name it on the TEMPLATE Form (and in most all of the app)
        # 3 is how it is named in the database c/o MongoDB

        Need to, right here, move this from # 1 to # 2.
         (The change from # 2 to # 3 happens in the REST API.)
         */
        // HARD-CODED WAY:
        // Works, but NO we are not using this.
        var updateToMakeHardCoded = {
            articleTitle_name: formGroupPassedIn.value.articleTitle_formControlName
        };
        // HARD-CODED-ISH, Configurable (Using a class new constructor! nice.)
        /*
        I.
        Let's say we had this (plus maybe more fields)  in our database. Wondeful.
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
         (If you are wondering how we get from type II. to type I., the answer to that is in the REST API. All done, all set honey, no need think about it further.)

         Hmm. Seems almost you'd want to simply "new up" an Article!
         (What a concept.)
         Except we don't have any Article class here, do we ?? ??
         // https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript

         Wrarticle (ta-da!) = now we do.
         For testing etc., this Class has 3 fields, but really I right now need only 1.

         constructor(title, url, category) {
           this.articleTitle_name = title;
           this.articleUrl_name = url;
           this.articleCategory_name = category;
         }
         */
        // YES. We are using this:
        var updateToMakeHardCodedIshConfigurable = new __WEBPACK_IMPORTED_MODULE_3__wrarticle__["a" /* Wrarticle */](formGroupPassedIn.value.articleTitle_formControlName, 'myhttp', 'mycategory'); // We omit url, category. should be ok. << HAH! WRONG-O. (thilly) We now instead SUPPLY a dummy-value for each.
        /* NO.
        DANG! This RegEx way we are ABANDONING!
        Seems JavaScript doesn't really want you messing with trying to write variable values into the Key string names for Objects. At least, for me.
        See above for more "hard-coded-ish", configurable, less flexible but oughta work solution.
         */
        // REGEX or some such way:
        /* N.B. These are KEY NAMES, not the String Values!
        INPUT field_formControlName
        OUTPUT field_name
         */
        /* Need to first get these key names as strings, onto some variable. Whoa.
 Excellent:        myBunchOfKeyNames ["articleTitle_formControlName"]
         */
        var myBunchOfKeyNames = Object.keys(formGroupPassedIn.value);
        console.log('myBunchOfKeyNames', myBunchOfKeyNames);
        /* From REST API, Assignment 5, /MIDDLEWARE/TRIM-URL-IS-ALL.JS:
         * Typical Input:
         https://www.nytimes.com/2018/03/26/world/europe/trump-russia-diplomats-expulsion.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news
         * Desired Output:
         https://www.nytimes.com/2018/03/26/world/europe/trump-russia-diplomats-expulsion.html
         * RegEx: */
        // NAIVELY FIRST THOUGHT:       string.replace(/(.)\?/, $1)
        // AFTER MUCH STRUGGLE, SEARCH: string.replace(/(.*?\?(?:(?!\?))).*/, '$1')
        // btw,  it is the *2nd* '?' question mark in that crazy string
        //        that represents the '?' in the NYTimes URL we are trying to find. Cheers.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        //
        console.log('PRE-REGEX! myBunchOfKeyNames[0] was: ', myBunchOfKeyNames[0]);
        myBunchOfKeyNames[0] = myBunchOfKeyNames[0].replace(/(.*?_form(?:(?!\?))).*/, '$1');
        console.log('MIDDLEWARE! POST-REGEX! myBunchOfKeyNames[0] now is: ', myBunchOfKeyNames[0]);
        //         articleTitle_formControlName
        //         .replace(/(.*?\_form(?:(?!\?))).*/, '$1')
        //         .replace(/(.*?_form(?:(?!\?))).*/, '$1')   <<< Note: You can remove that '\' that was escaping when we were looking for a '?' Now that we look for simply '_form', no need for escaping '\'. Cheers.
        //         articleTitle_form
        var firstTestKeyName = myBunchOfKeyNames[0];
        /*
// .replace(/(.*?\?(?:(?!\?))).*!/, '$1')
// WE GET:   https://www.nytimes.com/section/politics?  << Note the final ? is still on the string.
// HAD BEEN: https://www.nytimes.com/section/politics?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Politics&WT.nav=page
*/
        // NO. We are NOT using this.
        var updateToMakeRegExed = {
            /* NO:
                    myBunchOfKeyNames[0]: formGroupPassedIn.value.articleTitle_formControlName
            */
            'firstTestKeyName': formGroupPassedIn.value.articleTitle_formControlName
        };
        /* #################################### */
        /* Nope: formGroupPassedIn.value << Wrong naming convention! articleTitle_formControlName vs. articleTitle_name
         * YEP!: updateToMakeHardCoded
         * Nope: updateToMakeRegExed
         * YEP!!: updateToMakeHardCodedIshConfigurable << USING THIS.
          * */
        this._myArticleService.updateArticle(this.theArticleIdHereInDetailPage, updateToMakeHardCodedIshConfigurable)
            .subscribe(function (fromDatabaseEditedArticle) {
            // data
            console.log('whoa. REACTIVE EDIT FORM fromDatabaseEditedArticle ', fromDatabaseEditedArticle);
            /*
             Remember, after PUT or POST, good
             practice to move the user OFF
             the form page. Prevents submitting
             twice & Etc.
             Though whole page/app reload is kinda brutal.
             */
            // location.replace('/') // works, but also a reload, and takes you to Home, not so good
            location.reload(); // okay we'll go with it.
        });
    };
    ArticleDetailComponent.prototype.letUsDelete = function () {
        if (confirm('All right, you sure you wish to delete this article?')) {
            console.log('we are deleting ...theArticleHereInDetailPage._id ', this.theArticleHereInDetailPage._id);
            this._myArticleService.deleteArticle(this.theArticleIdHereInDetailPage)
                .subscribe(function (articleJustDeleted) {
                // data back
                console.log('whoa. articleJustDeleted ', articleJustDeleted);
                /*
                                        location.reload(); // << No. Tries to bring up page for article you just deleted! D'oh!
                */
                location.replace('/articles'); // Better
            });
        }
        else {
            // do nuttin'
        }
    };
    ArticleDetailComponent.prototype.ngOnDestroy = function () {
        this.subscriptionForId.unsubscribe();
    };
    ArticleDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-article-detail',
            template: __webpack_require__("../../../../../src/app/article-detail/article-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/article-detail/article-detail.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__article_service__["a" /* ArticleService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__article_service__["a" /* ArticleService */]])
    ], ArticleDetailComponent);
    return ArticleDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/article-list/article-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/article-list/article-list.component.html":
/***/ (function(module, exports) {

module.exports = "<strong>ARTICLE-LIST.COMPONENT</strong>\n<p style=\"font-size: small;\">Angular Version: {{ angularVersion.full }}</p>\n<p style=\"font-size: small;\">Pointed to API at: {{ apiUrlStubInApp }}</p>\n<div class=\"row\" style=\"border-style: dashed; border-color: darkred\">\n    <div>You clicked:</div>\n    <div style=\"font-size: x-large\">{{titleToDisplay}}</div>\n</div>\n\n<div class=\"row\">\n    <div class=\"column left\">\n        <h3>1. Display Articles - from REST API, using Angular Form</h3>\n        <div style=\"background-color: lightgreen; padding: 10px;\">\n            <h4>1.A. Display \"First n\" Articles</h4>\n            <div>\n                <input type=\"number\" id=\"numberArticles_id\" name=\"numberArticles_name\" style=\"width: 4em\" min=\"1\" placeholder=\"#...\" #numberArticlesNgRef />\n                <br />\n                <br />\n                <button (click)=\"getThisManyArticles(numberArticlesNgRef)\"\n                        (mousedown)=\"preventDefaultOnMouseDownButtonHighlightRemains($event)\">Get 'n' Articles</button>\n                <br />\n            </div>\n        </div>\n        <br />\n        <div style=\"background-color: lightblue; padding: 10px;\">\n            <h4>1.B. Display All Articles</h4>\n            <button (click)=\"getAllArticlesOnClick()\"\n                    (mousedown)=\"preventDefaultOnMouseDownButtonHighlightRemains($event)\">Get All Articles</button>\n            <br />\n            <br />\n            <button (click)=\"clearAllArticlesOnClick()\" style=\"font-style: italic;\"\n                    (mousedown)=\"$event.preventDefault()\">(Clear Articles)</button>\n        </div>\n        <h3>2. Add a New Article</h3>\n        <p>2.A. Angular REACTIVE-MODEL-DRIVEN FORM</p>\n        <div style=\"border-color: green; border-style: dotted; padding: 10px;\">\n            <form [formGroup]=\"addArticleForm\" on-ngSubmit=\"addArticle(null)\" enctype=\"multipart/form-data\">\n                <label for=\"articleUrl_id\">NYT URL: </label>\n                <input type=\"text\" id=\"articleUrl_id\" name=\"articleUrl_name\" size=\"40\" formControlName=\"articleUrl_formControlName\" />\n                <br />\n                <label for=\"articleTitle_id\">Headline: </label>\n                <input type=\"text\" id=\"articleTitle_id\" name=\"articleTitle_name\" size=\"40\" formControlName=\"articleTitle_formControlName\" />\n                <br />\n                <label for=\"articlePhotos_id\">Photo(s): </label>\n                <input type=\"file\"\n                       id=\"articlePhotos_id\"\n                       name=\"articlePhotos_name\"\n                       formControlName=\"articlePhotos_formControlName\"\n                       on-change=\"onPhotosFileChangePostFiles($event)\"\n                       multiple>\n                <button type=\"submit\">Add Article</button>\n            </form>\n        </div>\n        <hr />\n        <div  *ngIf=\"articleIJustCreatedBoolean\">\n            <h4>Article You Just Added</h4>\n            <app-article\n                    [articleToSendDown]=\"articleIJustCreatedDisplay\"\n                    [apiUrlStubInArticleAlias]=\"apiUrlStubInApp\"\n                    on-myEventEmitterSendTitleAlias=\"runDisplayTitle($event)\"></app-article>\n        </div>\n        <hr />\n        <p>2.B. Angular TEMPLATE-DRIVEN FORM</p>\n        <p><strong>Unfortunately</strong>, I had a basic working \"Template-Driven\" Angular Form, but as I worked (a ton) to get Photo Upload to work on the \"Reactive-Model-Driven\" Form, something has happened to render this one not working. Ran out of time to rectify.</p>\n        <p>I've \"disabled\" the form's fields and button.</p>\n        <div style=\"border-color: blue; border-style: dashed; padding: 10px;\">\n            <form ref-addArticleFormTemplate_ref=\"ngForm\" on-ngSubmit=\"addArticle(addArticleFormTemplate_ref.value)\">\n                <label for=\"articleUrl_id_template\">NYT URL: </label>\n                <input type=\"text\" id=\"articleUrl_id_template\" name=\"articleUrl_name\" size=\"40\" ngModel disabled/>\n                <br />\n                <label for=\"articleTitle_id_template\">Headline: </label>\n                <input type=\"text\" id=\"articleTitle_id_template\" name=\"articleTitle_name\" size=\"40\" ngModel disabled/>\n                <br />\n<!--\n                <label for=\"articlePhotos_id_template\">Photo(s): </label>\n                <input type=\"file\"\n                       id=\"articlePhotos_id_template\"\n                       name=\"articlePhotos_name\"\n                       on-change=\"onPhotosFileChange($event)\"\n                       multiple\n                disabled>\n-->\n                <button type=\"submit\" disabled>Add Article</button>\n            </form>\n        </div>\n        <hr />\n    </div>\n    <div class=\"column middle\">\n        <h3>Articles Listed from Form/Button</h3>\n        <p>Number of Articles Requested: {{ articlesHowMany.length }}</p>\n        <hr />\n        <app-article\n                *ngFor='let article of articlesHowMany'\n                [articleToSendDown]=\"article\"\n                [apiUrlStubInArticleAlias]=\"apiUrlStubInApp\"\n                on-myEventEmitterSendTitleAlias=\"runDisplayTitle($event)\"></app-article>\n    </div>\n    <div class=\"column right\">\n        <h3>Articles Listed from ngOnInit()</h3>\n        <p>Number of Articles: {{ articles.length }}</p>\n        <hr />\n        <app-article\n                *ngFor='let article of articles'\n                [articleToSendDown]=\"article\"\n                [apiUrlStubInArticleAlias]=\"apiUrlStubInApp\"\n                on-myEventEmitterSendTitleAlias=\"runDisplayTitle($event)\"></app-article>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/article-list/article-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_service__ = __webpack_require__("../../../../../src/app/article.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// For file upload stuff we'll first try the HTTP POST from right here in the Component; later to the Service. t.b.d.

var ArticleListComponent = /** @class */ (function () {
    /* ====================================== */
    /* ====================================== */
    /* ====================================== */
    function ArticleListComponent(_myArticleService, _myHttpService) {
        this._myArticleService = _myArticleService;
        this._myHttpService = _myHttpService;
        this.angularVersion = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* VERSION */];
        this.copyrightYear = '2018';
        this.articles = [];
        this.howMany = 0; // # of Articles to get. user input, click
        this.articlesHowMany = []; // Articles user requested, via button click
        this.apiUrlStubInApp = ''; // init, create a Property
        /* ====================================== */
        /* === CREATE ARTICLE FORM stuff .... === */
        /* ====================================== */
        this.articleIJustCreatedBoolean = false;
        this.photosFilenamesArray = []; // ORIGINAL Filenames.
        // Populated by onPhotosFileChangePostFiles()
        // e.g. AndToThinkWeAl…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg
        this.photosRenamedFilenamesArray = []; // After Multer on Server
        this.loadingPhotos = false; //         // https://nehalist.io/uploading-files-in-angular2/
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* WORKED. When apiUrlStub etc. was INSIDE the exported class:
                this.apiUrlStubInApp = this._myArticleService.apiUrlStubInService;
        */
        // Now (for heck of it and/or learning), trying to import and use as mere const:
        this.apiUrlStubInApp = __WEBPACK_IMPORTED_MODULE_2__article_service__["b" /* apiUrlStubInService */];
        // this.getAllArticles();
        this._myArticleService.listArticles().subscribe(function (whatIGot) {
            _this.articles = whatIGot;
        });
        this.addArticleForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            articleUrl_formControlName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required),
            'articleTitle_formControlName': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(4)]),
            articlePhotos_formControlName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */](null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required)
        });
    };
    ArticleListComponent.prototype.runDisplayTitle = function (event) {
        this.titleToDisplay = event;
    };
    ArticleListComponent.prototype.getAllArticlesOnClick = function () {
        var _this = this;
        this._myArticleService.listArticles()
            .subscribe(function (whatIGot) {
            _this.articlesHowMany = whatIGot;
        });
    };
    ArticleListComponent.prototype.clearAllArticlesOnClick = function () {
        this.articlesHowMany = []; // re-init
    };
    ArticleListComponent.prototype.getThisManyArticles = function (numberArticlesPassedIn) {
        /* VALIDATION (however humble)
         - EMPTY INPUT BOX:
         It is an EMPTY STRING "" - when you click submit on empty input.
         - USER TYPES IN 0 or -1
         */
        var _this = this;
        if (numberArticlesPassedIn.value === "" || numberArticlesPassedIn.value < 1) {
            console.log('Invalid number of articles requested.'); // TODO Flash msg or similar
        }
        else {
            this._myArticleService.listFirstNArticles(numberArticlesPassedIn.value)
                .subscribe(function (whatIGot) {
                _this.articlesHowMany = whatIGot;
            });
        }
    };
    ArticleListComponent.prototype.preventDefaultOnMouseDownButtonHighlightRemains = function (event) {
        /* In Chrome at least, the highlight around the clicked
         button remains after the click action is done.
         Seems distracting. Better to remove.
         This "preventDefault()" takes care of that.
         */
        event.preventDefault();
        /* UPDATE
        Sheesh bud, just do it IN-LINE over in the template. Sheesh.

        E.g.,
         <button (click)="clearAllArticlesOnClick()" style="font-style: italic;"
         (mousedown)="$event.preventDefault()">(Clear Articles)</button>

         */
    };
    ArticleListComponent.prototype.onPhotosFileChangePostFiles = function (eventPassedIn) {
        /*
         https://stackblitz.com/edit/angular-file-upload?file=app%2Fapp.component.ts
         upload() { this.basicUpload() }
         */
        var myFiles = eventPassedIn.target.files;
        console.log('onPhotosFileChangePostFiles myFiles ', myFiles);
        /* Yes:
         FileList {0: File(115777), length: 1}
         0
         :
         File(115777) {name: "010006-MexAmerican.jpg", lastModified: 1459182030000, lastModifiedDate: Mon Mar 28 2016 12:20:30 GMT-0400 (EDT), webkitRelativePath: "", size: 115777, …}
         length
         :
         1
         */
        // Very nice. 1 file to http://file.io  Works. Image stays there 14 days.
        // Well, more precisely, in 14 days it will be deleted.
        // But, you should know, if you click/view it at any point in those 14 days, it is DELETED right then and there.
        // "Single View" thing. "Snapchat for files" they call it. Bit odd in my view. O well.
        /*  WORKED FINE. Don't need it any longer ... ...
                this.basicUpload(myFiles)
        */
        // YES $$$$$$$$$$$$$$$$$$$$$$
        // Now for MY image posting ... ... ?   Just images. First, one. Then, multiple?
        // Through MY Service (god willing) Yep!
        this.myServiceFilesUpload(myFiles);
        /*
        When above line of code has finished:
        - the file(s)(?) have been written by Multer to /public/img
        - the web app page simply awaits the user's next click
        - user's next click should be Submit the Form
        - Submitting the Form writes the fielded metadata to the database
        - We need to ensure we get image file filenames to also put in that database record (so we can img src them for the U/I of course)
        -- Just to note it: If user clicks away without Submit, yeah, no database entry gets made, and those uploaded files are going to sit there in /public/img unused o well
        -- Exercise for the reader: use Node(Express?) file system stuff to delete those abandoned image files ...
         */
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // NOT GOING TO DO. NOT GOING TO WORK.:
        // Then, if possible, both my IMAGE posting + my FORM FIELDS posting, together
        // this.SOMEMETHOD(myFormFieldsAndFiles)
        /*
        FINDING. No. This is NOT going to work.
        See also REST API Server api-articles.js Router
        POST /articleimages
        In sum:
         # 1 :  Off the "Choose Files" click:  BODY = NO, FILES = YES
         # 2 : Off "Submit whole Form" click: BODY = YES, FILES = NO
         */
        // Next: get those photo file names!
        /*
         FOR LOOP TIME:
         https://www.javascripture.com/FileList
         */
        for (var i = 0; i < myFiles.length; i++) {
            console.log(myFiles[i].name);
            this.photosFilenamesArray.push(myFiles[i].name);
        }
        console.log('We are DONE - this.photosFilenamesArray ', this.photosFilenamesArray);
        /* Hmm. These are not the "renamed" photo file names. Hmm. Not what I need.
         this.photosFilenamesArray  (2)
         ["010006-MexAmerican.jpg", "AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.png", "WREILLY-HelpDesk-OutlookClient-ForceQuit-Unstable-2014-03-20.jpg"]
         */
        /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        Oy. We need the RE-NAMED file names. Back from after Multer.

         */
    }; // /onPhotosFileChangePostFiles()
    ArticleListComponent.prototype.myServiceFilesUpload = function (myFilesHere) {
        var _this = this;
        var myFormDataFilesForService = new FormData();
        for (var i = 0; i < myFilesHere.length; i++) {
            console.log(myFilesHere[i].name);
            // This MUST BE CALLED 'file':
            myFormDataFilesForService.append('file', myFilesHere[i]);
        }
        /*
        1. Let's use HTTP Service to just whamma onto our REST API URL directly from here.
        2. Let's next use our Article Data Service, to let IT do the HTTP whamma biz.

        For # 1:
         this._myHttpService.post('http://0.0.0.0:8089/api/v1/articles/', myFormDataFilesForService)

         ------WebKitFormBoundary6CEHBFpBZAg8g080
         Content-Disposition: form-data; name="file"; filename="AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
         Content-Type: image/jpeg


         ------WebKitFormBoundary6CEHBFpBZAg8g080--

         For # 2:
         this._myArticleService.uploadArticleImages(myFormDataFilesForService)
         ------WebKitFormBoundarygyHHLUu614ikUvU3
         Content-Disposition: form-data; name="file"; filename="010006-MexAmerican.jpg"
         Content-Type: image/jpeg


         ------WebKitFormBoundarygyHHLUu614ikUvU3--
         */
        // apiUrlstub:  http://0.0.0.0:8089/api/v1/articles/
        /*
                this._myArticleService.createArticle(myFormDataFilesForService)
        */
        this._myArticleService.uploadArticleImages(myFormDataFilesForService)
            .subscribe(function (eventBack) {
            console.log('whew99 My Service uploadArticleImages eventBack is ', eventBack);
            /* whew99
             {crazymessage: "RES.SEND in JSON, Congratulations, your file was u… it was. c/o apiUploadedArticleImagesNowDoNothing", yourpath: "public/img/sometimes__1525980207472_AndToThinkWeAl…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"}
             */
            /*
             whew file.io eventBack is  {success: true, key: "06l3Ql", link: "https://file.io/06l3Ql", expiry: "14 days"}
             */
            /* E.g.,
             ------WebKitFormBoundary0DghgeLU8KM4eNoO
             Content-Disposition: form-data; name="file"; filename="010006-MexAmerican.jpg"
             Content-Type: image/jpeg


             ------WebKitFormBoundary0DghgeLU8KM4eNoO--
             */
            // Next: get those photo file names!
            /*
             FOR LOOP TIME:
             https://www.javascripture.com/FileList
             */
            for (var i = 0; i < eventBack.allreqfiles.length; i++) {
                console.log(eventBack.allreqfiles[i].filename);
                _this.photosRenamedFilenamesArray.push(eventBack.allreqfiles[i].filename);
            }
            console.log('We are DONE - this.photosRenamedFilenamesArray ', _this.photosRenamedFilenamesArray);
            /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
             Oy. We need the RE-NAMED file names. Back from after Multer.

             */
        }, function (error) { console.log('ERROR in myService uploadArticleImages() :( ', error); });
    }; // /myServiceFilesUpload()
    ArticleListComponent.prototype.basicUpload = function (myFilesHere) {
        var myFormData = new FormData();
        // THIS DO *NOT* WORK. JESUS.
        /*
                Array.from(myFilesHere).forEach(fileThing => myFormData.append('file', fileThing));
        */
        for (var i = 0; i < myFilesHere.length; i++) {
            console.log('basicUpload myFilesHere[i].name ', myFilesHere[i].name);
            /* Hmm, that "mywrfile" appears to be NO GOOD...
                        myFormData.append('mywrfile', myFilesHere[i]);
            */
            // This MUST BE CALLED 'file' (not 'mywrfile'). okay.
            myFormData.append('file', myFilesHere[i]);
        }
        console.log('basicUpload() We are DONE - myFilesHere is/was/still is: ', myFilesHere);
        // console.log('We are DONE -02- myFormData is ', myFormData) // You can't see FormData via console.log().
        /*
        JESUS H. MOTHERFUCKING CHRISTOBOL.

        The FormData god-damned object is NOT able to be viewed in Dev Console !!! !!!
        It will always show {} EMPTY.
        Fut the wuck.

         https://stackoverflow.com/questions/7752188/formdata-appendkey-value-is-not-working
         */
        /* Huh. Look at NETWORK TAB more than CONSOLE:

         ------WebKitFormBoundaryx1A4qYIGBZHTCJDb
         Content-Disposition: form-data; name="articleUrl_formControlName"

         http://nytimes.com
         ------WebKitFormBoundaryx1A4qYIGBZHTCJDb
         Content-Disposition: form-data; name="articleTitle_formControlName"

         Network Tab
         ------WebKitFormBoundaryx1A4qYIGBZHTCJDb
         Content-Disposition: form-data; name="articlePhotos_formControlName"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryx1A4qYIGBZHTCJDb--

         */
        /*
        We did this just for debugging to see the FormData in the browser network tab.
                var myxhr = new XMLHttpRequest;
                myxhr.open('POST', '/', true);
        */
        /* (When I tried sending twice in a row
        "ERROR DOMException: Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."
         */
        /*
                myxhr.send(myFormData);
        */
        //      myxhr.send(myFormData[0]); // << No! It is certainly NOT an Array. Solly!
        /*  No no no. Not an Array, not handled like this...
        var myxhr2 = new XMLHttpRequest;
        myxhr2.open('POST', '/', true);
        myxhr2.send(myFormData[1]);
        */
        /*
        ------WebKitFormBoundary0DghgeLU8KM4eNoO
        Content-Disposition: form-data; name="file"; filename="010006-MexAmerican.jpg"
        Content-Type: image/jpeg


        ------WebKitFormBoundary0DghgeLU8KM4eNoO--
        */
        /*
         ------WebKitFormBoundaryTmLgSbMmlArSB8K7
         Content-Disposition: form-data; name="mywrfile"; filename="AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
         Content-Type: image/jpeg


         ------WebKitFormBoundaryTmLgSbMmlArSB8K7--
         */
        // https://stackoverflow.com/questions/7752188/formdata-appendkey-value-is-not-working
        //  console.log('999999 basicUpload myFormData.entries() ', myFormData.entries()) // Iterator
        /* "ERROR in src/app/article-list/article-list.component.ts(249,76): error TS2339: Property 'entries' does not exist on type 'FormData'."
        */
        // console.log('999999 basicUpload myFormData.entries() ', Array.from(myFormData.entries())) //
        /*
        * [Array(2)]
         0
         :
         Array(2)
         0
         :
         "file"
         1
         :
         File(115777) {name: "010006-MexAmerican.jpg", lastModified: 1459182030000, lastModifiedDate: Mon Mar 28 2016 12:20:30 GMT-0400 (EDT), webkitRelativePath: "", size: 115777, …}
         length
         :
         2
        * */
        // Note: FILE.IO not set up to handle multiple files. Jus' sayin'.
        this._myHttpService.post('https://file.io', myFormData)
            .subscribe(function (eventBack) { console.log('whew file.io eventBack is ', eventBack); }
        /*
        You Bet! :o)
         whew file.io eventBack is  {success: true, key: "06l3Ql", link: "https://file.io/06l3Ql", expiry: "14 days"}
         */
        /* E.g.,
         ------WebKitFormBoundary0DghgeLU8KM4eNoO
         Content-Disposition: form-data; name="file"; filename="010006-MexAmerican.jpg"
         Content-Type: image/jpeg


         ------WebKitFormBoundary0DghgeLU8KM4eNoO--
         */
        );
    }; // /basicUpload()
    ArticleListComponent.prototype.onPhotosFileChange = function (eventPassedIn) {
        // Note: This occurs before, and separate from, the Form Submit. Curiouser and curiouser.
        console.log('Event Time! eventPassedIn.target.files ', eventPassedIn.target.files); // FileList
        console.log('Event Time! eventPassedIn.target.files[0] ', eventPassedIn.target.files[0]); // File
        // https://nehalist.io/uploading-files-in-angular2/
        console.log('-01- this.addArticleForm.value ', this.addArticleForm.value);
        /* Yes.
        P.S. This "C:\fakepath" stuff is O.K., and expected.

         {articleUrl_formControlName: "http://nytimes.com", articleTitle_formControlName: "Good morning 01", articlePhotos_formControlName: "C:\fakepath\010006-MexAmerican.jpg"}
         */
        var myOneFile = eventPassedIn.target.files[0];
        console.log('myOneFile is ', myOneFile);
        /*
         File(115777) {name: "010006-MexAmerican.jpg", lastModified: 1459182030000, lastModifiedDate: Mon Mar 28 2016 12:20:30 GMT-0400 (EDT), webkitRelativePath: "", size: 115777, …}
         */
        console.log('addArticleForm ', this.addArticleForm);
        /*
        FormGroup { controls: { articleUrl_formControlName ...
         */
        console.log('addArticleForm.value ', this.addArticleForm.value);
        /*
         {articleUrl_formControlName: "http://nytimes.com", articleTitle_formControlName: "we", articlePhotos_formControlName: "C:\fakepath\AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.png"}
         */
        // ***********************************
        /* No! It's not the "ID". It's the FORMCONTROLNAME. (mais bien sûr)
                this.addArticleForm.get('articlePhotos_id').setValue(myOneFile);
        */
        // Cannot read property 'setValue' of null
        /*  Both equal:  Both are not allowed.
                this.addArticleForm.get('articlePhotos_formControlName').setValue(myOneFile);
                this.addArticleForm.controls['articlePhotos_formControlName'].setValue(myOneFile);
        */
        /* O la.
        "ERROR DOMException: Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string."
         */
        // ***********************************
        console.log('what the hey myOneFile ', myOneFile);
        /* (Redundant. same as above o well)
         File(115777) {name: "010006-MexAmerican.jpg", lastModified: 1459182030000, lastModifiedDate: Mon Mar 28 2016 12:20:30 GMT-0400 (EDT), webkitRelativePath: "", size: 115777, …}
         */
        console.log('-02- this.addArticleForm.value ', this.addArticleForm.value);
        /*
         Event Time! eventPassedIn.target.files

         File(115777) {name: "010006-MexAmerican.jpg", lastModified: 1459182030000, lastModifiedDate: Mon Mar 28 2016 12:20:30 GMT-0400 (EDT), webkitRelativePath: "", size: 115777, …}
         1
         :
         File(362417) {name: "AndToThinkWeAllPlayedASmallPart ...
         */
        // *********** O LA. Giving up on trying to use this FileList in any ARRAY or ARRAY.FROM() LIKE way.
        // Going to just use the old-fashioned FOR LOOP
        // https://www.javascripture.com/FileList
        /* "FileList":
                this.photosFilenamesArray = eventPassedIn.target.files.map((eachFileThing) => eachFileThing.name)
        */
        /* Hmm. "files" not an Array. No ".map()"
         https://developer.mozilla.org/en-US/docs/Web/API/FileList
         */
        // NOT USING "ARRAY.FROM() anymore. Cheers.
        var photosFilenamesArrayTEMP = Array.from(eventPassedIn.target.files);
        console.log(photosFilenamesArrayTEMP); // [File, File]
        console.log(photosFilenamesArrayTEMP[0]); // File
        /* "File" thing whatever that is:
         File(115777) {name: "010006-MexAmerican.jpg", lastModified: 1459182030000, lastModifiedDate: Mon Mar 28 2016 12:20:30 GMT-0400 (EDT), webkitRelativePath: "", size: 115777, …}
         lastModified
         :
         1459182030000
         lastModifiedDate
         :
         Mon Mar 28 2016 12:20:30 GMT-0400 (EDT) {}
         name
         :
         "010006-MexAmerican.jpg"
         */
        //        console.log(photosFilenamesArrayTEMP[0].name) // 010006-MexAmerican.jpg
        //        console.log(photosFilenamesArrayTEMP[1].name) // WREILLY-Mac-WINSCurrentlyBeingUsed-2014-02-03.jpg
        // No gave error: (sad)
        //       this.photosFilenamesArray = photosFilenamesArrayTEMP.map((eachFileThing) => eachFileThing.name)
        /* Hmm. Grr.
         ERROR in src/app/article-list/article-list.component.ts(142,99): error TS2339: Property 'name' does not exist on type '{}'.

         webpack: Failed to compile.
         */
        /* Be aware, previous three lines generate: But I still get the array I need ... Cheers.
        "ERROR in src/app/article-list/article-list.component.ts(140,49): error TS2339: Property 'name' does not exist on type '{}'.
         src/app/article-list/article-list.component.ts(141,49): error TS2339: Property 'name' does not exist on type '{}'.
         src/app/article-list/article-list.component.ts(142,99): error TS2339: Property 'name' does not exist on type '{}'."
         */
        /*
                FOR LOOP TIME:
                    https://www.javascripture.com/FileList
        */
        for (var i = 0; i < eventPassedIn.target.files.length; i++) {
            console.log(eventPassedIn.target.files[i].name);
            this.photosFilenamesArray.push(eventPassedIn.target.files[i].name);
        }
        console.log('We are DONE - this.photosFilenamesArray ', this.photosFilenamesArray);
        /* YES.
         this.photosFilenamesArray  (2) ["010006-MexAmerican.jpg", "WREILLY-Mac-WINSCurrentlyBeingUsed-2014-02-03.jpg"]
         */
    };
    ArticleListComponent.prototype.prepareToAddArticle = function () {
        // https://nehalist.io/uploading-files-in-angular2/
        var myFormFieldsData = new FormData();
        //  console.log('-01- wtfrickety myFormFieldsData ', myFormFieldsData) // FormData {} // You cannot see FormData via console.log()
        // console.log('-01A- this.addArticleForm.get('articleUrl_formControlName').value', this.addArticleForm.get('articleUrl_formControlName').value)
        // "ReferenceError: articleUrl_formControlName is not defined"
        console.log('-01B- this.addArticleForm ', this.addArticleForm); // FormGroup
        /*
         FormGroup {validator: null, asyncValidator: null, _onCollectionChange: ƒ, pristine: false, touched: true, …}
         asyncValidator
         :
         null
         controls
         :
         {articleUrl_formControlName: FormControl, articleTitle_formControlName: FormControl, articlePhotos_formControlName: FormControl}
         dirty
         :
         (...)
         */
        console.log('-01B-A- this.addArticleForm.controls ', this.addArticleForm.controls);
        /*
         this.addArticleForm.controls  {articleUrl_formControlName: FormControl, articleTitle_formControlName: FormControl, articlePhotos_formControlName: FormControl}
         */
        console.log('-01B-B- this.addArticleForm.controls.articleTitle_formControlName.value ', this.addArticleForm.controls.articleTitle_formControlName.value); // Yes what's in input box
        console.log('-01B-C- this.addArticleForm.controls.articlePhotos_formControlName.value ', this.addArticleForm.controls.articlePhotos_formControlName.value); // C:\fakepath\010006-MexAmerican.jpg
        /* << this is all you see via console.log(), but this (presumably) is a full File object, not just this string for path. btw don't worry about "fakepath". All is well. Real path is there under the hood. Cheers.
        */
        // ***********************************
        // REACTIVE-MODEL-DRIVEN:
        // Huh? Not [] obj[key[] ?? // myFormFieldsData.append('articleUrl_formControlName', this.addArticleForm.controls['articleUrl_formControlName'].value)
        // It is time to MAP onto new keys:
        // WAS: articleUrl_formControlName
        // NOW SHOULD BE: articleUrl_name
        // (1) .controls.field << YEP, WORKS.
        myFormFieldsData.append('articleUrl_name', this.addArticleForm.controls.articleUrl_formControlName.value);
        // (2) .controls['field'] << YEP, WORKS.
        myFormFieldsData.append('articleTitle_name', this.addArticleForm.controls['articleTitle_formControlName'].value);
        // Q. (below) For .append(), do I want 'file'? Or 'articlePhotos_name'? Hmm.
        // For "file.io" API, seems it had to have "file". Maybe with my own server API, I can change it up...
        // At moment, doing both. Should/will drop one.
        // (3) .get('field') << YEP, WORKS.
        /*  Was working fine. These are ORIGINAL Photo File Names.
        I should maybe rename the field to 'articlePhotosOriginal_name' or similar.
                T.B.D.
                myFormFieldsData.append('articlePhotos_name', this.addArticleForm.get('articlePhotos_formControlName').value)
                myFormFieldsData.append('file', this.addArticleForm.get('articlePhotos_formControlName').value)
        */
        // (4) *NEW* Time to add an array of the RENAMED (by Multer) Photo File Names
        // photosRenamedFilenamesArray
        // Whamma-jamma this array right onto it ... ?
        // https://stackoverflow.com/questions/16104078/appending-array-to-formdata-and-send-via-ajax
        // YES!       myFormFieldsData.append('articlePhotos_name[]', this.photosRenamedFilenamesArray)
        /*
         error TS2345: Argument of type 'any[]' is not assignable to parameter of type 'string | Blob'.

         Hmm. But, it worked! Sort of anyway. Hmm.
         In MongoDB:
         The multiple photos is:
          An Array, of one String, separated by comma. Kinda weird.
          [ 'allonestring.jpg, secondpic.jpg' ]
         { "_id" : ObjectId("5af4b25eb0f4ef4a2394b7fa"), "articlePhotos" : [ "sometimes__1525985838159_010006-MexAmerican.jpg,sometimes__1525985838164_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg" ], "articleUrl" : "http://nytimes.com", "articleTitle" : "two two", "__v" : 0 }


An Example With 3:

         {articlePhotos: Array(1), _id: "5af4b43db0f4ef4a2394b7fb", articleUrl: "http://nytimes.com", articleTitle: "three", __v: 0}
         articlePhotos
         :
         Array(1)
         0
         :
         "sometimes__1525986355016_010006-MexAmerican.jpg,sometimes__1525986355019_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.png,sometimes__1525986355025_WREILLY-Mac-WINSCurrentlyBeingUsed-2014-02-03.jpg"
         length
         :
         1
         __proto__
         :
         Array(0)
         articleTitle
         :
         "three"
         articleUrl
         :
         "http://nytimes.com"
         __v
         :
         0
         _id
         :
         "5af4b43db0f4ef4a2394b7fb"


         */
        // https://stackoverflow.com/questions/16104078/appending-array-to-formdata-and-send-via-ajax
        // This SO page recommends using JSON.stringify() (then JSON.parse()). Hmm
        myFormFieldsData.append('articlePhotos_name', JSON.stringify(this.photosRenamedFilenamesArray));
        /*
         { "_id" : ObjectId("5af4b53ab0f4ef4a2394b7fc"), "articlePhotos" : [ "[\"sometimes__1525986614512_010006-MexAmerican.jpg\",\"sometimes__1525986614515_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg\"]" ], "articleUrl" : "http://nytimes.com", "articleTitle" : "2 w JSON biz", "__v" : 0 }
         */
        // --------
        /*
         ------WebKitFormBoundaryAxdbkLntT9ST7JB0
         Content-Disposition: form-data; name="articleUrl_name"

         http://nytimes.com
         ------WebKitFormBoundaryAxdbkLntT9ST7JB0
         Content-Disposition: form-data; name="articleTitle_name"

         gtr
         ------WebKitFormBoundaryAxdbkLntT9ST7JB0
         Content-Disposition: form-data; name="articlePhotos_name"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryAxdbkLntT9ST7JB0
         Content-Disposition: form-data; name="file"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryAxdbkLntT9ST7JB0--
         */
        // ***********************************
        // Something NEW. (oy) https://stackblitz.com/edit/angular-file-upload?file=app%2Fapp.component.ts
        // Don't work, trying to console.log() the FormData. Sorry.
        // No >> console.log('-02?- wtfrickety myFormFieldsData ', myFormFieldsData) // still just: FormData {}
        /*
         We did this just for debugging to see the FormData in the browser network tab.
         */
        var myxhr = new XMLHttpRequest;
        myxhr.open('POST', '/', true);
        myxhr.send(myFormFieldsData);
        /*
        LATEST:  Multiple Photos:
         Below in the "FormData", it is NOT an Array - it is two comma-separated Strings.
         But in the MongoDB it IS an Array, of two Strings
        Okay.

         ------WebKitFormBoundary3g7RUjARsLRYwcxA
         Content-Disposition: form-data; name="articleUrl_name"

         http://nytimes.com
         ------WebKitFormBoundary3g7RUjARsLRYwcxA
         Content-Disposition: form-data; name="articleTitle_name"

         two two
         ------WebKitFormBoundary3g7RUjARsLRYwcxA
         Content-Disposition: form-data; name="articlePhotos_name[]"

         sometimes__1525985838159_010006-MexAmerican.jpg,sometimes__1525985838164_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg
         ------WebKitFormBoundary3g7RUjARsLRYwcxA--

         In MongoDB:
         { "_id" : ObjectId("5af4b25eb0f4ef4a2394b7fa"), "articlePhotos" : [ "sometimes__1525985838159_010006-MexAmerican.jpg,sometimes__1525985838164_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg" ], "articleUrl" : "http://nytimes.com", "articleTitle" : "two two", "__v" : 0 }
         */
        /*
         ------WebKitFormBoundarySkpszp1E9NbAhSon
         Content-Disposition: form-data; name="articleUrl_name"

         http://nytimes.com
         ------WebKitFormBoundarySkpszp1E9NbAhSon
         Content-Disposition: form-data; name="articleTitle_name"

         hy
         ------WebKitFormBoundarySkpszp1E9NbAhSon
         Content-Disposition: form-data; name="articlePhotos_name"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundarySkpszp1E9NbAhSon
         Content-Disposition: form-data; name="file"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundarySkpszp1E9NbAhSon--
         */
        console.log('7777777777 After that SEND above, does program return to this next line? Yes it do'); //  yes
        return myFormFieldsData;
    }; // /prepareToAddArticle()
    ArticleListComponent.prototype.addArticle = function (addArticleFormTemplate_refPassedIn) {
        var _this = this;
        console.log('addArticle - now OverLoading: both REACTIVE and TEMPLATE');
        // N.B. Only the TEMPLATE mode needs to pass in a parameter.
        // https://nehalist.io/uploading-files-in-angular2/
        console.log('addArticleFormTemplate_refPassedIn: (TEMPLATE only) ', addArticleFormTemplate_refPassedIn);
        /* Yes:
         {articleUrl_name: "http://nytimes.com", articleTitle_name: "TEMPLATE We Wrote This Yesterday. (So long as Today is Tomorrow.)"}
         */
        console.log('we are in addArticle - this.addArticleForm.value (REACT only) ', this.addArticleForm.value);
        /* Yeah. V. nice.
         {articleUrl_formControlName: "http://nytimes.com", articleTitle_formControlName: "REACTIVE We Wrote This Yesterday. (So long as Today is Tomorrow.)"}
         */
        var articleToCreate = {
            articleUrl_name: '',
            articleTitle_name: '',
            articlePhotos_name: null // We were using this for filenames; time to use it for FILES.
        };
        // https://nehalist.io/uploading-files-in-angular2/
        // ***********************************
        var myFormFieldsAndFiles = this.prepareToAddArticle();
        // ***********************************
        this.loadingPhotos = true;
        console.log('addArticle() Let\'s have a look via Network tab at myFormFieldsAndFiles FormData ');
        /*
         We did this just for debugging to see the FormData in the browser network tab.
         */
        var myxhr3 = new XMLHttpRequest;
        myxhr3.open('POST', '/myFormFieldsAndFiles', true);
        myxhr3.send(myFormFieldsAndFiles);
        /* YES. JUST RIGHT.
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="articleUrl_name"

         http://nytimes.com
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="articleTitle_name"

         fgh
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="articlePhotos_name"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryoPpanl3RULBL6o14
         Content-Disposition: form-data; name="file"

         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryoPpanl3RULBL6o14--
         */
        /*
         if (addArticleFormTemplate_refPassedIn) {
            // TEMPLATE-DRIVEN
            articleToCreate = {
                articleUrl_name: addArticleFormTemplate_refPassedIn.articleUrl_name,
                articleTitle_name: addArticleFormTemplate_refPassedIn.articleTitle_name,
                articlePhotos_name: this.photosFilenamesArray
            };
            console.log('TEMPLATE articleToCreate is ', articleToCreate) // Yes we have the pics
        } else {
            // REACTIVE-MODEL-DRIVEN
            articleToCreate = {
                articleUrl_name: this.addArticleForm.value.articleUrl_formControlName,
                articleTitle_name: this.addArticleForm.value.articleTitle_formControlName,
                articlePhotos_name: this.photosFilenamesArray
            };

            // https://nehalist.io/uploading-files-in-angular2/
            // WE ARE DOING REACTIVE ONLY (thus far)
        }



        /* 2018-04-22 "C" in CRUD time:

         From here in the Component's TypeScript,
         we invoke the Article Service,
         to use its Angular HTTP
         to hit the REST API endpoint:

(akin to how we used Axios in the Express App for the CLIENT-SIDE JAVASCRIPT to talk to the REST API),

           POST to http://0.0.0.0:8089/articles
         */
        console.log('-01- BOUT TO GO TO SOIVICE articleToCreate is ', articleToCreate); // Yes we have the pics FILENAMES. Hmmph.
        //      console.log('-02- BOUT TO GO TO SOIVICE  myFormFieldsAndFiles ', myFormFieldsAndFiles) // // You cannot see FormData via console.log()
        /*
                this._myArticleService.createArticle(articleToCreate) // << "Worked" to send photo filenames, not files.
        */
        // https://nehalist.io/uploading-files-in-angular2/
        // WE ARE DOING REACTIVE ONLY (thus far)
        this._myArticleService.createArticle(myFormFieldsAndFiles)
            .subscribe(function (whatIJustCreated) {
            // Observable success
            console.log('whatIJustCreated ', whatIJustCreated);
            // Type {}
            _this.articleIJustCreatedDisplay = whatIJustCreated;
            _this.articleIJustCreatedBoolean = true;
            /*
            O la. JSON.stringify of Array going into MongoDB
            Time to JSON.parse what we get out. I think
             */
            console.log(' $$$$$$$$$$$$$$$$$$$$   whatIJustCreated.articlePhotos ', whatIJustCreated.articlePhotos);
            console.log('whatIJustCreated.articlePhotos JSON.parse() ', JSON.parse(whatIJustCreated.articlePhotos));
            /*
            Damn. Looks like that worked. Hot damn.  20180510-1716

            Of course, if you really do go this JSON/STRINGIFY/PARSE route, well,
            you are stuck with a database that for EVERY TIME you obtain
            this info, you MUST do JSON PARSE to use it.
            That is, your database entry is really holding a STRING. ugh.
            Kinda ugly.
            O well.
            Good enough for tonight's assignment! !! !!!


             whatIJustCreated.articlePhotos JSON.parse()
             (2) ["sometimes__1525986950360_010006-MexAmerican.jpg", "sometimes__1525986950363_AndToThinkWeAllPlayedASma…t-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"]
             0
             :
             "sometimes__1525986950360_010006-MexAmerican.jpg"
             1
             :
             "sometimes__1525986950363_AndToThinkWeAllPlayedASmallPart-NewYorkerCartoon-SlackScreenshot-2017-11-14.jpg"
             */
            _this.articleIJustCreatedDisplay.articlePhotos = JSON.parse(whatIJustCreated.articlePhotos); // whamma-jamma this reconstituted Array of strings onto that {} type. should go okay I expect.
            /* Working. Finally. Whoa. 20180510-1647. Due at 20180510-2359.

             whatIJustCreated
             {articlePhotos: Array(1), _id: "5af4adf4b0f4ef4a2394b7f8", articleUrl: "http://nytimes.com", articleTitle: "hy", __v: 0}
             articlePhotos
             :
             Array(1)
             0
             :
             "sometimes__1525984753235_010006-MexAmerican.jpg"
             length
             :
             1
             __proto__
             :
             Array(0)
             articleTitle
             :
             "hy"
             articleUrl
             :
             "http://nytimes.com"
             __v
             :
             0
             _id
             :
             "5af4adf4b0f4ef4a2394b7f8"
             */
            // New: Let's update the Articles array right here, right now.
            // Also: The user-selected "How Many Articles" array.
            // On create here, I do *not* refresh the page,
            //  because I wanted to immediately display the just-created article.
            //  Till now I had not thought to do this array-pushing.
            //  Instead, the user had to refresh or perhaps navigate back
            //  to this page, to see full list with newly added item.
            //  This is better.
            _this.articles.push(_this.articleIJustCreatedDisplay);
            if (_this.articlesHowMany.length) {
                // If the user has NOT clicked on "First n" Articles,
                //  we'll skip adding the just-created Article to that
                //  (non-existent) list on the page.
                //
                // That is, only if the user *HAS* already asked for some number
                // of Articles to appear will we add the
                // just-created Article to that displayed list:
                _this.articlesHowMany.push(_this.articleIJustCreatedDisplay);
                /*
                 One tiny side-effect (totally benign, acceptable, and prob. desired):
                 re: "articlesHowMany":
                 - If user says "Display first 2 articles", and then adds one article...
                 - The "First n" articles list of 2 will be joined by the new one, in the
                 next spot (3rd spot)
                 (whereas it of course belongs ultimately in last spot)
                 - That of course goes away next time they click on asking for any other
                 number of articles to be displayed.
                 (The newly added one will correctly be in the last spot.)
                 */
            }
            else {
                // do nothing. User had *not* clicked on "Display First n".
                // We do not add the just-created Article to a sort of "non-list"
            }
            // https://stackoverflow.com/questions/36655922/resetting-a-form-in-angular-2-after-submit
            // Hmm. Seems to say resetForm() should be available o well.
            _this.addArticleForm.reset();
        });
    }; // /addArticle()
    ArticleListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-article-list',
            template: __webpack_require__("../../../../../src/app/article-list/article-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/article-list/article-list.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__article_service__["a" /* ArticleService */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__article_service__["a" /* ArticleService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ArticleListComponent);
    return ArticleListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/article.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return apiUrlStubInService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return imgUrlStubInService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mongodbCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return gitRepo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArticleService = /** @class */ (function () {
    /* Hmm. Not working to "export" (I think) from here inside the
            already-getting-exported class.
            We'll move it outside (bottom of file here), and
            try from there ... ...
    */
    /* Interesting development:
    - Okay, yes, I can export this "apiUrlStub" out from this Service for
    use by Components to do stuff like simply display it to U/I
    (tell the user which environment/URL they are using for REST API) = okay
    Kind of artificial use, for a dev/test/prototype thing.
    - But, I do still really need this "apiUrlStub" right here IN the Service
    in earnest, to run all these HTTP calls to the API!
    
     */
    // apiUrlStubInService = environment.apiUrlStubInEnvironment;
    /*
     http://0.0.0.0:8089/api/v1/articles/
     http://192.168.1.126:8089/api/v1/articles/
     http://104.236.198.117:8089/api/v1/articles/
     */
    function ArticleService(_serviceHttp) {
        this._serviceHttp = _serviceHttp;
    }
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    /* ^^^^^^   TOC   ^^^^^^^^^^^^^  */
    /*
  
     // NEW. UTILITY thing. Maybe?
     // Instead I did an export const of it. See bottom of file.
     getApiUrlStubInService() << Did not do.
  
     listArticles()
  
     listFirstNArticles(howManyToList)
  
     getArticle(id)
  
     createArticle(article)
  
     updateArticle(id, article)
  
     deleteArticle(id)
  
     */
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    // GET All Articles
    ArticleService.prototype.listArticles = function () {
        /* No Longer INSIDE the class! Drop the 'this.' Voilà! (a.k.a.: Viola!)
            return this._serviceHttp.get(this.apiUrlStubInService);
        */
        return this._serviceHttp.get(apiUrlStubInService);
    };
    ArticleService.prototype.listFirstNArticles = function (howManyToList) {
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
        var nameValuePairNameThing = 'howMany_query';
        console.log("apiUrlStubInService + 'first-n?' + nameValuePairNameThing + (equals sign) + howManyToList ", apiUrlStubInService + 'first-n?' + nameValuePairNameThing + '=' + howManyToList);
        return this._serviceHttp.get(apiUrlStubInService + 'first-n?' + nameValuePairNameThing + '=' + howManyToList);
    };
    // GET One Article, by ID
    ArticleService.prototype.getArticle = function (idPassedIn) {
        return this._serviceHttp.get(apiUrlStubInService + '/' + idPassedIn);
    };
    ArticleService.prototype.createArticle = function (myFormFieldsAndFiles) {
        /*
         createArticle(articleToCreatePassedIn) {
         */
        /*
              console.log('HERE IN THE SOIVICE articleToCreatePassedIn is ', articleToCreatePassedIn) // Yes we have the pics
        */
        console.log('HERE IN THE SOIVICE myFormFieldsAndFiles is ', myFormFieldsAndFiles); // you won't see this FormData here....
        var myxhr4 = new XMLHttpRequest;
        myxhr4.open('POST', '/myFormFieldsAndFilesInService', true);
        myxhr4.send(myFormFieldsAndFiles);
        /* YES:
         ------WebKitFormBoundaryq80IEBooD6GEetmo
         Content-Disposition: form-data; name="articleUrl_name"
  
         http://nytimes.com
         ------WebKitFormBoundaryq80IEBooD6GEetmo
         Content-Disposition: form-data; name="articleTitle_name"
  
         gt
         ------WebKitFormBoundaryq80IEBooD6GEetmo
         Content-Disposition: form-data; name="articlePhotos_name"
  
         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryq80IEBooD6GEetmo
         Content-Disposition: form-data; name="file"
  
         C:\fakepath\010006-MexAmerican.jpg
         ------WebKitFormBoundaryq80IEBooD6GEetmo--
         */
        /*
        return this._serviceHttp.post(apiUrlStubInService,
            articleToCreatePassedIn
        );
        */
        /* This IS has been the standard POST '/' endpoint for this service method... */
        return this._serviceHttp.post(apiUrlStubInService, myFormFieldsAndFiles);
        /*  We will try instead doing POST '/articleimages'
        * Why?
        * Because with above we have not been seing that Multer is writing the file down to /public/img/filegoeshere...   Hmm.
        * */
        /* NOPE DON'T WORK for the "Submit Form" button click.
              return this._serviceHttp.post(apiUrlStubInService + 'articleimages',
                  myFormFieldsAndFiles
              );*/
    };
    ArticleService.prototype.uploadArticleImages = function (myFormDataFilesHere) {
        // This, God willing, runs first, off the "Choose File" button
        // to just upload images to the REST API which uses Multer to stow them
        // in /public/img
        // Then, the createArticle would get run. Hmm.
        // Maybe on 2nd thought, more ideal would be:
        // 1st pass, do get the image files info, but, do NOT go off to REST API / Multer etc.
        // Instead, wait for user to click Submit
        // Then stitch together into FormData both 1) that images files info and 2) fielded data
        // *Then* go to REST API with all that and let Multer do magic with files,
        // and let rest of controller/service etc. write fielded data to MongoDB. Hmm.
        // Well, we'll give plan A a short shot here, then come back for 'B' as in Better.
        return this._serviceHttp.post(apiUrlStubInService + 'articleimages', myFormDataFilesHere);
    }; // /uploadArticleImages()
    ArticleService.prototype.updateArticle = function (idPassedIn, editedArticle) {
        return this._serviceHttp.put(apiUrlStubInService + '/' + idPassedIn, editedArticle);
    };
    ArticleService.prototype.deleteArticle = function (idPassedIn) {
        return this._serviceHttp.delete(apiUrlStubInService + '/' + idPassedIn);
    };
    ArticleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
        /* No. See comment at bottom
        class ArticleService {
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ArticleService);
    return ArticleService;
}());

/* This does not work. Ah well.
 https://stackoverflow.com/questions/42332456/an-interface-cannot-be-exported-in-an-angular-2-module
 */
/*
 module.exports = ArticleService;
*/
/* Hmm. Furtherance(s).  20180506_0813
 https://stackoverflow.com/questions/33524696/es6-destructuring-and-module-imports
 "The syntax to import a named export is very easily confused for the deconstructing syntax of an object. – Federico Nov 1 '16 at 0:54"

VEC
Very Easily Confused
TWBM
That Would Be Me
;o)


Consider:
--------------
 // react-router.js
 export const Link = 42;
 export default {
 Link: 21,
 };

 // something.js
 import {Link} from './react-router';
 import Router from './react-router';
 const {Link: Link2} = Router;

 console.log(Link); // 42
 console.log(Link2); // 21
 ---------------
 */
var apiUrlStubInService = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrlStubInEnvironment;
/*
 http://0.0.0.0:8089/api/v1/articles/
 http://192.168.1.126:8089/api/v1/articles/
 http://104.236.198.117:8089/api/v1/articles/
 */
// NEW: Basically same stub, for <IMG SRC="" />
var imgUrlStubInService = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].imgUrlStubInEnvironment;
/*
  http://0.0.0.0:8089/
  http://192.168.1.126:8089/
  http://104.236.198.117:8089/
 */
var mongodbCollection = 'newarticles'; // See MODEL INFO:
/* From /server/models/articleModel.js : We've renamed from original 'Article' to 'Newarticle'.
Simply to get a new, different Collection to write to, read from. No other change. Same schema.

 var articleModelVarHere = mongoose.model('Newarticle', articleSchema)
 */
var gitRepo = 'e31-7-combo';
/*
 https://github.com/wreilly/e31-7-combo
 */ 


/***/ }),

/***/ "../../../../../src/app/article/article.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/article/article.component.html":
/***/ (function(module, exports) {

module.exports = "<strong>ARTICLE.COMPONENT</strong>\n<h3>\nArticle Component\n</h3>\n<h4><a routerLink=\"/articles/{{articleHere._id}}\">{{ articleHere.articleTitle }}</a></h4>\n<!-- https://angular.io/api/router/RouterLink#description\nrouterLink vs. [routerLink]\n-->\n<p>Some Times - Article Detail Page: /articles/{{articleHere._id}}</p>\n\n    <!-- To display literal '{{ }}', use this pattern to escape: {{ '{' }}-->\n    <!--/articles/{{ '{' }}{{ '{' }}articleHere._id{{ '}' }}{{ '}' }}-->\n<!--\n<p>Some Times - API URL: <a bind-href=\"articleApiUrlWithId\" target=\"_apiblank\">{{articleApiUrlWithId}}</a>\n</p>\n<p>New York Times - article URL: <a bind-href=\"articleHere.articleUrl\" target=\"_nytblank\">{{articleHere.articleUrl}}</a>\n</p>\n-->\n<button on-click=\"sendTitleToParent()\"\n        (mousedown)=\"$event.preventDefault()\"\n>Click to Emit!</button>\n<!--\n<button on-click=\"sendTitleToParent()\"\n        (mousedown)=\"preventDefaultOnMouseDownButtonHighlightRemains($event)\"\n>Click to Emit!</button>\n-->\n<hr>\n"

/***/ }),

/***/ "../../../../../src/app/article/article.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ArticleComponent = /** @class */ (function () {
    // e.g., "http://0.0.0.0:8089/api/v1/articles/5ab99ee11459a61b106a55ff"
    function ArticleComponent() {
        // i.e., http://0.0.0.0:8089/api/v1/articles/
        // or    http://104.236.198.117:8089/api/v1/articles/
        this.myEventEmitterSendTitle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.articleApiUrlWithId = '';
    }
    ArticleComponent.prototype.ngOnInit = function () {
        this.articleApiUrlWithId = this.apiUrlStubInArticle + this.articleHere._id;
    };
    ArticleComponent.prototype.sendTitleToParent = function () {
        console.log('sendTitleToParent hey? this.articleHere.articleTitle: ', this.articleHere.articleTitle);
        this.myEventEmitterSendTitle.emit(this.articleHere.articleTitle);
    };
    ArticleComponent.prototype.preventDefaultOnMouseDownButtonHighlightRemains = function (event) {
        event.preventDefault(); // We prevent the button highlight (in Chrome)
        /* UPDATE
        Just do it IN-LINE in the Component HTML. Heck.
         */
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('articleToSendDown'),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "articleHere", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('apiUrlStubInArticleAlias'),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "apiUrlStubInArticle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])('myEventEmitterSendTitleAlias'),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "myEventEmitterSendTitle", void 0);
    ArticleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-article',
            template: __webpack_require__("../../../../../src/app/article/article.component.html"),
            styles: [__webpack_require__("../../../../../src/app/article/article.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ArticleComponent);
    return ArticleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/footer/footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"center\">\n  <hr />\n<p>&copy; Some Times Angular CRUD with REST API {{ copyrightYearInFooter }}</p>\n<br />\n  <p style=\"font-size: xx-small;\">Pointed to API at: {{ apiUrlStubInFooter }}</p>\n  <p style=\"font-size: xx-small;\">Pointed to /public/img at: {{ imgUrlStubInFooter }}</p>\n  <p style=\"font-size: xx-small;\">Pointed to MongoDB Collection: {{ mongodbCollectionInFooter }}</p>\n  <p style=\"font-size: xx-small;\">Pointed to Git Repository: {{ gitRepoInFooter }}</p>\n  <br />\n  <p>CSCI-E31 Final Assignment 7 CODE CLEAN UP Post-Project - May 12 - 13 ..., 2018</p>\n<p>William Reilly - wreilly2001@gmail.com</p>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__("../../../../../src/app/article.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.apiUrlStubInFooter = __WEBPACK_IMPORTED_MODULE_1__article_service__["b" /* apiUrlStubInService */];
        this.imgUrlStubInFooter = __WEBPACK_IMPORTED_MODULE_1__article_service__["d" /* imgUrlStubInService */];
        this.mongodbCollectionInFooter = __WEBPACK_IMPORTED_MODULE_1__article_service__["e" /* mongodbCollection */];
        this.gitRepoInFooter = __WEBPACK_IMPORTED_MODULE_1__article_service__["c" /* gitRepo */];
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], FooterComponent.prototype, "copyrightYearInFooter", void 0);
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n<hr />\n  &nbsp; &nbsp; &nbsp;  <a routerLink=\"/\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">Home</a> | <a routerLink=\"/articles\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">Articles</a> || Week {{ weekNumber }} | FINAL Assignment {{ assignmentNumber }}\n<hr />\n<div class=\"banner-angular\">\n  <p>FINAL Assignment 7 - CODE CLEAN UP Post-Project</p>\n  <p><strong>CRUD</strong> - All via <strong>Angular</strong> client (not Express server)</p>\n  <ul>\n    <li>CREATE - Add Article Form on Articles page</li>\n    <li>READ - Button to Display All, or \"First n\" Articles, on Articles page</li>\n    <li>UPDATE - From list, click on an Article. Edit from that page.</li>\n    <li>DELETE - From list, click on an Article. Delete from that page.</li>\n    </ul>\n    <hr>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__("../../../../../src/app/article.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// This next line did not work, to just import some part of the Service ("deconstruct").
// import { apiUrlStubInService } from '../article.service'
// We bring in whole Service, just to get one property out of it: enviroment-specific URL(stub)

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_myArticleService) {
        this._myArticleService = _myArticleService;
        this.weekNumber = 14;
        this.assignmentNumber = this.weekNumber / 2; // 7!
        /*
          apiUrlStubHereInHeader = this._myArticleService.apiUrlStubInService;
        */
        this.apiUrlStubHereInHeader = __WEBPACK_IMPORTED_MODULE_1__article_service__["b" /* apiUrlStubInService */];
        // http://192.168.1.126:8089/api/v1/articles/
        // http://192.168.1.126:8089/ << What we want.
        // We'll find "api/v1" for the index of where to slice to. Cheers.
        // https://www.digitalocean.com/community/tutorials/how-to-index-split-and-manipulate-strings-in-javascript
        this.expressAppUrlHereInHeader = this.apiUrlStubHereInHeader
            .slice(0, this.apiUrlStubHereInHeader
            .indexOf("api/v1"));
    }
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/header/header.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<strong>HOME.COMPONENT</strong>\n<h2>{{ subTitle }}</h2>\n<p>\n    <i>\"Some of the Times that's fit to post.\"</i>\n</p>\n<div>\n    A. Find an article from\n    <a href=\"http://www.nytimes.com\" target=\"nyt_tab_blank\">The New York Times</a>\n    to reference here.\n</div>\n<div>\n    B. Post\n    <a routerLink=\"/articles\" routerLinkActive=\"active\">your selected article</a>\n    on this articles reference site.\n</div>\n<div>\n    <p>New: Angular Client App for all four \"CRUD\" Functions:</p>\n    <ol>\n        <li>CREATE - Add Article Form on /articles page</li>\n        <li>READ - Button to List All Articles, on /articles page</li>\n        <li>UPDATE - From list, click on an Article. Edit from that page</li>\n        <li>DELETE - From list, click on an Article. Delete from that page</li>\n    </ol>\n</div>\n<p style=\"font-size: small;\">Pointed to API at: {{ apiUrlStubInHome }}</p>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__("../../../../../src/app/article.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*
Interesting. (I think.)
Because from the "ArticleService" all I am importing for this Component
is a mere exported cont (an API URL stub),
I do *not* need to put "ArticleService" into the providers:[] array  on
the Component decorator. I think.
 */
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.title = 'Some Times';
        this.subTitle = 'Newspaper Articles Reference Site - Angular CRUD - with REST API';
        this.apiUrlStubInHome = __WEBPACK_IMPORTED_MODULE_1__article_service__["b" /* apiUrlStubInService */];
    }
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/wrarticle.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Wrarticle; });
// https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript
// https://javascript.info/class
// https://www.sitepen.com/blog/2014/08/22/advanced-typescript-concepts-classes-types/
// https://johnpapa.net/typescriptpost3/
// https://www.developer.com/lang/top-10-things-to-know-about-typescript.html
var Wrarticle = /** @class */ (function () {
    function Wrarticle(title, url, category) {
        this.articleTitle_name = title;
        this.articleUrl_name = url;
        this.articleCategory_name = category;
        console.log('heck we just constructed a wrarticle');
        console.log('this.articleTitle_name ', this.articleTitle_name);
        console.log('this.articleUrl_name ', this.articleUrl_name);
    }
    return Wrarticle;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// BUILD info
// https://github.com/angular/angular-cli/wiki/build
var environment = {
    production: false,
    /* *** -1- ****** 0.0.0.0  ************* */
    // LOCALHOST 0.0.0.0
    // USE ANYWHERE ... (E.g., on Harvard campus, in some coffee shop, etc.)
    // Also yes CAN be used "at home" simply.
    // Runs on local machine only.
    /* */
    apiUrlStubInEnvironment: 'http://0.0.0.0:8089/api/v1/articles/',
    // NEW: Basically same stub, for <IMG SRC="" />
    /* We will now point to the "canonical" place where the IMAGES are, namely in Production at Digital Ocean! */
    // OR - let's put (new) photos LOCAL, to work that way during development:
    imgUrlStubInEnvironment: 'http://0.0.0.0:8089/' // << Yep, final '/'
    /* Even though this is "LOCAL" for app, and local for REST API, we go to PRODUCTION for the IMAGES:
  
    imgUrlStubInEnvironment: 'http://104.236.198.117:8089/'
  */
    /* *** -2- ****** 192.168.1.126  ************* */
    // SUBNET "LOCAL" 192.168.1.126 << sometimes changes to .125
    //   $ ifconfig | grep 192
    //   inet 192.168.1.126 netmask 0xffffff00 broadcast 192.168.1.255
    // Lets me see app and GET ARTICLES, on **2nd Macintosh** here on kitchen table...
    // USE AT HOME (100 Gore) (if/when you wish to use another computer to see app in browser)
    // Do NOT use outside the home, off of the SubNet. App may run but API part won't work!
    // See Also note below re: PACKAGE.JSON
    /*
      apiUrlStubInEnvironment: 'http://192.168.1.126:8089/api/v1/articles/' // << Don't forget final '/' !
    */
    /*
      // NEW: Basically same stub, for <IMG SRC="" />
      imgUrlStubInEnvironment: 'http://192.168.1.126:8089/' // << Yep, final '/'
    */
    /* *** -3- *******  104.236.198.117  ************ */
    // Test up on Digital Ocean:
    //
    // To test A) LOCAL "dev" Client, pointing to B) *PROD* API:
    // 1. With Local Client Angular App...
    //    simply run ng serve
    //    That "ng serve" simply uses this default environment.ts ("local"). okay.
    // 2. And with line below have this Local DEV Client point to **PROD / D.O.** API
    // To test a "Local" environment.ts BUILD, using A) LOCAL Client, pointing to B) *PROD* API:
    // 1. With Local Client Angular App...
    //    do a "build" ng build  (defaults to "local" build)
    //    That "ng build" simply uses this default environment.ts ("local"). okay.
    // 2. HTTP - Interesting. Then, because a BUILT Angular Client on its own is kinda useless...
    //    (You have to have a plain old web server, to serve it up!)
    // So, to that end, we can use a plain Python simple HTTP server to serve up the /dist
    /*
     $ which python
     /usr/bin/python
     $ python --version
     Python 2.7.10
      cd ./dist
     $ python -m SimpleHTTPServer 8000
     Serving HTTP on 0.0.0.0 port 8000 ...
     http://0.0.0.0:8000/
     Voilà!
     */
    // 3. And then with line below you can have this Local BUILT Client point to **PROD / D.O.** API
    // Note: (parenthetical) If what you want to do is: To test a true "PROD" build,
    // well, with your "build" command, you will be pointing
    // not to this environment.ts, but
    //   over to environment.prod.ts
    // $ npm run build  That is, --> $ ng build --env=prod
    //  // https://github.com/angular/angular-cli/wiki/build
    // Go see that file instead ... :)
    /*
    apiUrlStubInEnvironment: 'http://104.236.198.117:8089/api/v1/articles/' // << Don't forget final '/' !
    */
    /*
     // NEW: Basically same stub, for <IMG SRC="" />
     imgUrlStubInEnvironment: 'http://104.236.198.117:8089/' // << Yep, final '/'
     */
    /* D.O.
     http://104.236.198.117:8089/api/v1/articles/5ac5eeba45ed983e8a8a209e
     */
};
/* PACKAGE.JSON note:

 "scripts": {
   "ng": "ng",
   "my-fake-comment-in-json": "this start line with host 0.0.0.0 is what makes the client app work okay from a 2nd computer on the subnet in my house e.g. 192.168.1.126:4206 hooray for that. See Also /environments/environment.ts re: apiUrlStub...",
   "start": "ng serve --host 0.0.0.0",
   "build": "ng build --prod",
 ...}


 FURTHER NOTE:
 "name": "e31-assignment-08-ng-client-no-cors-wreilly",
 "scripts": {
   "ng": "ng",
   "start": "ng serve",
   "build": "ng build --env=prod",
   "buildlocal": "ng build",

 */


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map