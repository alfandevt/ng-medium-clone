import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddToFavoriteServices } from '../services/add-to-favorite.service';
import { addToFavoriteActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from '../../../types/article.interface';

export const addToFavoriteEffect = createEffect(
  (
    action$ = inject(Actions),
    addToFavoriteService = inject(AddToFavoriteServices)
  ) => {
    return action$.pipe(
      ofType(addToFavoriteActions.addToFavorite),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoriteService.removeFromFavorite(slug)
          : addToFavoriteService.addToFavorite(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoriteActions.addToFavoriteSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoriteActions.addToFavoriteFailur());
          })
        );
      })
    );
  },
  { functional: true }
);
