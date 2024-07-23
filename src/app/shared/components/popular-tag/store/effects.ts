import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { popularTagsAction } from './actions';
import { PopularTagService } from '../services/popular-tag.service';
import { PopularTagType } from '../../../types/popularTag.type';

export const getPopularTags = createEffect(
  (action$ = inject(Actions), popularTagsService = inject(PopularTagService)) =>
    action$.pipe(
      ofType(popularTagsAction.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsAction.getPopularTagsSuccess({ popularTags });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(popularTagsAction.getPopularTagsFailure())
          )
        );
      })
    ),
  { functional: true }
);
