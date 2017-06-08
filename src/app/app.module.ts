import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { firebaseConfig } from './env.component';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AnalyticBrowserComponent } from './analytic/analytic-browser.component';
import { CallsComponent } from './analytic/calls.component';

import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { TextMaskModule } from 'angular2-text-mask';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

// Must export the config
/*export const firebaseConfig = {
  apiKey: "AIzaSyDNQ6PDIIlFB7yMJLe7Yt5YfVaC0jNDg7U",
  authDomain: "faithservice2017.firebaseapp.com",
  databaseURL: "https://faithservice2017.firebaseio.com",
  projectId: "faithservice2017",
  storageBucket: "faithservice2017.appspot.com",
  messagingSenderId: "300912220492"
};*/
@NgModule({
  declarations: [
    AppComponent,
    AnalyticBrowserComponent,
    CallsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MultiselectDropdownModule,
    Daterangepicker,
    TextMaskModule,
    NguiAutoCompleteModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
