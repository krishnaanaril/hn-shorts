import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import { UpdateService } from './shared/services/update.service';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(updateService: UpdateService) { }

}
