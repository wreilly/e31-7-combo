// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// BUILD info
// https://github.com/angular/angular-cli/wiki/build

export const environment = {
    production: false,

    /* *** -2- ****** 192.168.1.126  ************* */
// SUBNET "LOCAL" 192.168.1.126 <<  !!! sometimes changes to .125 !!!
//   $ ifconfig | grep 192
//   inet 192.168.1.126 netmask 0xffffff00 broadcast 192.168.1.255

// Lets me see app and GET ARTICLES, on **2nd Macintosh** here on kitchen table...
// USE AT HOME (100 Gore) (if/when you wish to use another computer to see app in browser)
// Do NOT use outside the home, off of the SubNet. App may run but API part won't work!
// See Also note below re: PACKAGE.JSON
    /* */
    apiUrlStubInEnvironment: 'http://192.168.1.125:8089/api/v1/articles/', // << Don't forget final '/' !
    // apiUrlStubInEnvironment: 'http://192.168.1.126:8089/api/v1/articles/', // << Don't forget final '/' !


    /*
     // NEW: Basically same stub, for <IMG SRC="" />
     */
    imgUrlStubInEnvironment: 'http://192.168.1.125:8089/' // << Yep, final '/'
    // imgUrlStubInEnvironment: 'http://192.168.1.126:8089/' // << Yep, final '/'

}


/*
Don't forget /.angular-cli.json !!!

 "environmentSource": "environments/environment.ts",
 "environments": {
 "dev": "environments/environment.ts",
 "kitchen": "environments/environment.kitchen.ts",
 "prod": "environments/environment.prod.ts"
 }

 */

/* From PACKAGE.JSON:

 "my-fake-comment-in-json": "this start line with host 0.0.0.0 is what makes the client app work okay from a 2nd computer on the subnet in my house e.g. 192.168.1.126:4206 hooray for that. See Also /environments/environment.ts re: apiUrlStub...",
 "start": "ng serve --host 0.0.0.0",
 "my-other-fake-comment-in-json": "kitchen here means subnet in my house (kitchen). that is, my other (client) computer will see the REST API and the IMGs too, via subnet on 192.168.1.126:8089 (or .125, depending; see $ifconfig)",
 "build": "ng build --prod",
 "build-kitchen": "ng build --kitchen",
 "build-local": "ng build",
 */
