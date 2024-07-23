import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { articleAction } from './action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

export const getArticleEffect = createEffect(
  (action = inject(Actions), articleService = inject(SharedArticleService)) =>
    action.pipe(
      ofType(articleAction.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return articleAction.getArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(articleAction.getArticleFailure())
          )
        );
      })
    ),
  { functional: true }
);

export const deleteArticleEffect = createEffect(
  (action = inject(Actions), articleService = inject(ArticleService)) =>
    action.pipe(
      ofType(articleAction.deleteArticle),
      switchMap(({ slug }) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleAction.deleteArticleSuccess();
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(articleAction.deleteArticleFailure())
          )
        );
      })
    ),
  { functional: true }
);

export const redirectAfterDelete = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(articleAction.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
