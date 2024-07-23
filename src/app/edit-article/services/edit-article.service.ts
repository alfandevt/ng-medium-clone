import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { environment } from '../../../environments/environment.development';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  editArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const url = environment.apiURL + '/articles/' + slug;
    return this.http
      .put<ArticleResponseInterface>(url, articleRequest)
      .pipe(map((response) => response.article));
  }
}
