import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../types/GetFeedResponse.interface';
import { environment } from '../../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const feedUrl = environment.apiURL + url;
    return this.http.get<GetFeedResponseInterface>(feedUrl);
  }
}
