import { Component, OnInit } from '@angular/core';
import { Link, NAVIGATION_LINKS } from '../../shared/models/links';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.css']
})
export class SideNavContentComponent implements OnInit {

  public links: Link[] = NAVIGATION_LINKS;

  constructor() { }

  ngOnInit(): void {
  }

}
