import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';

const routes: Routes = [
  { path: 'feed/:feedType', component: FeedComponent },
  { path: '', redirectTo: 'feed/top', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
