import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { editArticleAction } from './action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditArticleService } from '../services/edit-article.service';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';

export const getArticleEffect = createEffect(
  (action = inject(Actions), articleService = inject(SharedArticleService)) =>
    action.pipe(
      ofType(editArticleAction.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleAction.getArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(editArticleAction.getArticleFailure())
          )
        );
      })
    ),
  { functional: true }
);

export const editArticleEffect = createEffect(
  (action = inject(Actions), editArticleService = inject(EditArticleService)) =>
    action.pipe(
      ofType(editArticleAction.editArticle),
      switchMap(({ request, slug }) => {
        return editArticleService.editArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return editArticleAction.editArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              editArticleAction.editArticleFailure({
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
      ofType(editArticleAction.editArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  { functional: true, dispatch: false }
);
