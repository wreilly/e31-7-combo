import { Component } from '@angular/core'

import { apiUrlStubInService } from '../article.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {
    title = 'Some Times';
    subTitle = 'Newspaper Articles Reference Site - Angular CRUD - with REST API';
    apiUrlStubInHome = apiUrlStubInService;
}