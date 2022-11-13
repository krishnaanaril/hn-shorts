import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RoutesRecognized } from '@angular/router';
import { filter, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('sidenavContainer', { static: true })
  sidenavContainer!: MatSidenavContainer;
  feedType!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sidenav.autoFocus = false;
    this.router.events
      .pipe(
        filter(
          (event): event is RoutesRecognized => event instanceof RoutesRecognized
        )
      )
      .subscribe((event) => {        
        this.feedType = event.state.root.firstChild?.params['feedType'];
      });
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.sidenav.close();
      });
  }

  toggleSideNav() {
    this.sidenav
      .toggle();
  }

}
