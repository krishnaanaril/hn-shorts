import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HnDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFeed(feedType: string): Observable<any> {
    const url = `https://hacker-news.firebaseio.com/v0/${feedType}stories.json`;
    return this.httpClient.get(url).pipe(retry(2));
  }
}
