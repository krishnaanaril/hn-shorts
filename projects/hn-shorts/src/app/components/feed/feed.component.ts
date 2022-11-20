import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Keyboard, Mousewheel, Virtual } from 'swiper';

SwiperCore.use([Keyboard, Mousewheel, Virtual]);

import { HnDataService } from '../../shared/services/hn-data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {

  private feedType!: string;
  public data$!: Observable<number[]>;
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private dataService: HnDataService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => of(params.get('feedType'))),
        filter((type) : type is string => !!type)
      )
      .subscribe({
        next: (type: string) => {
          this.feedType = type;             
          this.swiper?.swiperRef.slideTo(0);   
          this.populateData(type);
        }
      });    
  }  

  populateData(feedType: string) {
    this.data$ = this.dataService
      .getFeed(feedType);      
  }

}
