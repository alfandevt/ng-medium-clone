import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';
import { environment } from '../../../../../environments/environment.development';
import { GetPopularTagsResponseInterface } from '../types/GetPopularTags.interface';

@Injectable({ providedIn: 'root' })
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiURL + '/tags';
    return this.http
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(map((response) => response.tags));
  }
}
