import { Component, OnInit } from '@angular/core';
import { UtilsService } from "./util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Vote APP';

  frontendId : string;
  apiId: string;

  constructor(private utils : UtilsService) {    
  }

  ngOnInit(): void {
    this.utils.getApiMachineName().then(r => this.apiId = r);
    this.frontendId = this.utils.getFrontMachineName();
  }
}
