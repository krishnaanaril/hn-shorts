import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FeedComponent } from './components/feed/feed.component';
import { AppRoutingModule } from './app-routing.module';
import { StoryComponent } from './components/story/story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IconComponent } from './components/icon/icon.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    StoryComponent,
    IconComponent,    
    SideNavContentComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule, 
    SwiperModule, 
    BrowserAnimationsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
