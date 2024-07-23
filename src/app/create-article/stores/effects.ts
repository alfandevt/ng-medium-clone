import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createArticleAction } from './action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateArticleService } from '../services/create-article.service';

export const createArticleEffect = createEffect(
  (
    action = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) =>
    action.pipe(
      ofType(createArticleAction.createArticle),
      switchMap(({ request }) => {
        return createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) => {
            return createArticleAction.createArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createArticleAction.createArticleFailure({
                errors: errorResponse.error.erros,
              })
            )
          )
        );
      })
    ),
  { functional: true }
);

export const redirectAfterCreateEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(createArticleAction.createArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  { functional: true, dispatch: false }
);
