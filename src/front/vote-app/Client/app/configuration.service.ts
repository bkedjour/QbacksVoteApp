import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { IConfiguration } from './configuration.model';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfigurationService {
    serverSettings : IConfiguration;

    private settingsLoadedSource = new Subject();
    settingsLoaded = this.settingsLoadedSource.asObservable();

    constructor(private http:Http) {
    }

    load(){
        const baseURI = document.baseURI.endsWith('/')? document.baseURI:`${document.baseURI}/`;
        let url = `${baseURI}api/settings`;
        this.http.get(url).subscribe((response : Response) => {
            console.log(`settings loaded (url): ${url}`);
            this.serverSettings = response.json();
            this.settingsLoadedSource.next();
        });
    }
}