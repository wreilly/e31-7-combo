import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Some Times';
  subTitle = 'Newspaper Articles Reference Site - Angular CRUD - with REST API';
  copyrightYear = '2018';
  angularVersion = VERSION;

  constructor() { }

  ngOnInit() {

  }


}

