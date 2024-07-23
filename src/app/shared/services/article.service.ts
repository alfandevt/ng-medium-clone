import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ArticleInterface } from '../types/article.interface';
import { ArticleResponseInterface } from '../types/articleResponse.interface';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const url = environment.apiURL + '/articles/' + slug;
    return this.http.get<ArticleResponseInterface>(url).pipe(map(response => response.article));
  }
}
