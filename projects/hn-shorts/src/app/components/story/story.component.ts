import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';

import { Story } from '../../shared/models/story';
import { ShareData } from '../../shared/models/share-data'
import { HnDataService } from '../../shared/services/hn-data.service';
import { NotificationService } from '../../shared/services/notification.service';
import { BehaviorSubject, interval, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, OnChanges {

  @Input() storyId!: number;
  public storyDetails!: Story | null;
  public dataChange = new BehaviorSubject<number>(0);
  public timer$ = this.dataChange.pipe(
    switchMap(() => interval(1000)),
    map((item) => item+1),
    take(5)
  );
  progressBarValue = 0;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private notificationService: NotificationService,
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
        });
      this.timer$.subscribe((sec)=>{
        this.progressBarValue = sec * 100 / 5;
        console.log(`sec: ${sec}, progressBar: ${this.progressBarValue}`)
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let story = changes['storyId'].currentValue;
    console.log(`story: ${story}`);
    this.dataChange.next(story);
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
      case 'Share': 
      this.shareStory();
       break;
      case 'Save': 
        this.downloadImage();
        break;
    }
  }

  viewStory() {
    const storyUrl = this.getStoryUrl();
    window.open(storyUrl, "_blank");
  }

  async shareStory() {
    const shareData = {
      url: this.getStoryUrl(),
      title: "Hacker News | Shorts",
      text: this.storyDetails?.title
    } as ShareData;
    if(!navigator.canShare){
      console.log("No support for share");
      this.notificationService.open('Sorry, Your browser do not support this feature');
    } 
    else {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  getStoryUrl() {
    const commentUrl = `https://news.ycombinator.com/item?id=${this.storyDetails?.id}`;
    return this.storyDetails?.url ?? commentUrl;
  }

  viewComments() {
    const commentUrl = `https://news.ycombinator.com/item?id=${this.storyDetails?.id}`;
    window.open(commentUrl, "_blank");
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
}
