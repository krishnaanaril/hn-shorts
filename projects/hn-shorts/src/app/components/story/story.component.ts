import { Component, Input, OnInit } from '@angular/core';
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
    private dataService: HnDataService
  ) { }

  ngOnInit(): void {
    if(this.storyId) {
      this.dataService
      .getItem<Story>(this.storyId)
      .subscribe({
        next: (story: Story) => {
          this.storyDetails = story;
        }
      })
    }
  }

}
