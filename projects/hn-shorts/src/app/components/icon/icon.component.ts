import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() iconText!: string;
  @Input() labelText!: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
