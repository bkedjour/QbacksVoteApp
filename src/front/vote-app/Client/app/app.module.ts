import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { VotesComponent } from './votes/votes.component';
import { VotesService } from "./votes.service";
import { UtilsService } from "./util.service";

@NgModule({
  declarations: [
    AppComponent,
    VotesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [VotesService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
