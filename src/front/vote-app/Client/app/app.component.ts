import { Component, OnInit } from '@angular/core';
import { UtilsService } from "./util.service";
import { ConfigurationService } from "./configuration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Vote APP';

  frontendId: string;
  apiId: string;

  constructor(private utils: UtilsService, private settings: ConfigurationService) {
  }

  ngOnInit(): void {
    this.settings.load();

    this.settings.settingsLoaded.subscribe(r => {
      this.utils.getApiMachineName().then(r => this.apiId = r);
      this.frontendId = this.utils.getFrontMachineName();
    });
  }
}
