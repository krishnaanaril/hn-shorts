import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

// install Swiper modules
SwiperCore.use([Pagination]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('sidenavContainer', { static: true })
  sidenavContainer!: MatSidenavContainer;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sidenav.autoFocus = false;
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.sidenav.close().then(() => {
          this.sidenavContainer.hasBackdrop = false;
        });
      });
  }

  toggleSideNav() {
    this.sidenav
      .toggle()
      .then(() => console.log('toggled'))
      .catch((err) => console.error(err));
  }


}
