// https://stackoverflow.com/questions/38398877/how-do-i-declare-a-model-class-in-my-angular-2-component-using-typescript
// https://javascript.info/class

// https://www.sitepen.com/blog/2014/08/22/advanced-typescript-concepts-classes-types/
// https://johnpapa.net/typescriptpost3/
// https://www.developer.com/lang/top-10-things-to-know-about-typescript.html

export class Wrarticle {

    // Q. Hmm. Trying to see if possible to omit
    // these property declarations here, just get
    // a sort of "shortcut" to declaring them, via
    // the constructor.
    // A. Nope. Seems no, absolutely not.
    // That shortcut is avail. in JavaScript, kids, but not
    // in good old TYPESCRIPT.
    // Okay.
       articleTitle_name: string;

        articleUrl_name: string; // not really using...
        articleCategory_name: string; // not really using...

    /* NEW 20180623-1020
    In Update/Edit mode, ADD ANOTHER PHOTO(S) :o)
     */
 //   articlePhotos_name: [string]; // hmm, is this an Array (of Strings?)?
    /*
    See crapola problems in article-detail.component.ts ca. 371, 476 etc. Oy
    Just go with any
     */
   articlePhotos_name: any; // should I cop out and just throw down catch-all 'any' ?
    /*
    Yes, appears to be:
     ------WebKitFormBoundaryCYIbVB69jzqJ0Hyx
     Content-Disposition: form-data; name="articlePhotos_name"

     ["sometimes__1527074436227_13alexander-articleLarge.jpg","sometimes__1529763470672_31catholics-web3-jumbo.jpg"]
     ------WebKitFormBoundaryCYIbVB69jzqJ0Hyx--
     */

        constructor(title: string, url: string, category: string, photosArray: any) {
            this.articleTitle_name = title;
            this.articleUrl_name = url;
            this.articleCategory_name = category;
            this.articlePhotos_name = photosArray;

            console.log('heck we just constructed a wrarticle')
            console.log('WRARTICLE this.articleTitle_name ', this.articleTitle_name)
            console.log('WRARTICLE this.articleUrl_name ', this.articleUrl_name)
            console.log('WRARTICLE this.articlePhotos_name ', this.articlePhotos_name)
            console.log('WRARTICLE this.articleCategory_name << Not Using >> ', this.articleCategory_name)
        }
}
