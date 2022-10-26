import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

import { HnDataService } from '../../shared/services/hn-data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private feedType!: string;
  public data$!: Observable<number[]>;

  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private dataService: HnDataService
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => of(params.get('feedType'))),
        filter((type) : type is string => !!type)
      )
      .subscribe({
        next: (type: string) => {
          this.feedType = type;
          this.populateData(type);
        }
      });
    
  }

  populateData(feedType: string) {
    this.data$ = this.dataService
      .getFeed(feedType)
      .pipe(
        map((feedList: number[]) => feedList.slice(0, 10))
      );
  }

  onSwiper(data: any) {    
    console.log(data);
  }

  onSlideChange() {
    console.log('slide change');
  }

}
