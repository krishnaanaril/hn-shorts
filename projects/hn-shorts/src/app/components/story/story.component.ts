import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';

import { Story } from '../../shared/models/story';
import { HnDataService } from '../../shared/services/hn-data.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() storyId!: number;
  public storyDetails!: Story | null;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private dataService: HnDataService
  ) { }

  ngOnInit(): void {
    if (this.storyId) {
      this.dataService
        .getItem<Story>(this.storyId)
        .subscribe({
          next: (story: Story) => {
            this.storyDetails = story;
          }
        })
    }
  }

  buttonClick(action: string) {
    console.log(`Clicked action: ${action}`)
    switch (action) {
      case 'View':
        this.viewStory();
        break;
      case 'Comment':
        this.viewComments();
        break;
      case 'Share': break;
      case 'Save': 
        this.downloadImage();
        break;
    }
  }

  viewStory() {
    if (!this.storyDetails?.url)
      this.viewComments();
    window.open(this.storyDetails?.url, "_blank");
  }

  viewComments() {
    const storyUrl = `https://news.ycombinator.com/item?id=${this.storyDetails?.id}`;
    window.open(storyUrl, "_blank");
  }

  downloadImage() {
    var elementNode = this.document.getElementById('main-block');
    if (elementNode) {
      toBlob(elementNode)
        .then(function (blob: any) {
          if (window.saveAs) {
            window.saveAs(blob, 'main-block.png');
          } else {
            saveAs(blob, 'main-block.png');
          }
        }, (error)=> console.error(error));
    }
    else {
      console.log("not found");
    }
  }

  timeSince(date: number | undefined): string {
    if (date == undefined)
      return '';
    date *= 1000;
    const thisMoment = new Date().getTime();
    const seconds = Math.floor((thisMoment - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 0) {
      return interval + (interval === 1 ? ' year' : ' years');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
      return interval + (interval === 1 ? ' month' : ' months');
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
      return interval + (interval === 1 ? ' day' : ' days');
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
      return interval + (interval === 1 ? ' hour' : ' hours');
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
      return interval + (interval === 1 ? ' minute' : ' minutes');
    }
    return Math.floor(seconds) + (interval === 1 ? ' second' : ' seconds');
  }


}
