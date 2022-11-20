import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { HACKER_NEWS_API_URL } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class HnDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFeed(feedType: string): Observable<any> {    
    const url = `${HACKER_NEWS_API_URL}/${feedType}stories.json`;
    return this.httpClient.get(url).pipe(retry(2));
  }

  getItem<T>(itemId: number): Observable<T> {
    const url = `${HACKER_NEWS_API_URL}/item/${itemId}.json?`;
    return this.httpClient.get<T>(url).pipe(retry(2));
  }
}
