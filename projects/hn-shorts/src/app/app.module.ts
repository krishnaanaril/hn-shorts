import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FeedComponent } from './components/feed/feed.component';
import { AppRoutingModule } from './app-routing.module';
import { StoryComponent } from './components/story/story.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
