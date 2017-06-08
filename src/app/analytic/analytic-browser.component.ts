/**
 * Created by she110ff on 2017. 4. 17..
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './analytic-browser.component.html',
})
export class AnalyticBrowserComponent {
  //items: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {};

  searchRockets(orgName: string) {

  }

}
