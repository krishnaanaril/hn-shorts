import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

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
        this.sidenav.close();
      });
  }

  toggleSideNav() {
    this.sidenav
      .toggle()
      .then(() => console.log('toggled'))
      .catch((err) => console.error(err));
  }

}
