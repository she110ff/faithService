
import { Routes } from '@angular/router';

import { AnalyticBrowserComponent } from './analytic/analytic-browser.component';
import { CallsComponent } from './analytic/calls.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: AnalyticBrowserComponent,
/*    children: 
      [ 
        { path: '', component: RocketListComponent },
        { path: 'student', component: RocketListStudentComponent }
      ]*/
  },
  { path: 'calls', component: CallsComponent },
  //{ path: 'rocket/:rocketId', component: RocketDetailComponent },
];

