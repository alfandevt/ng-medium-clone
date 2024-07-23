import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../types/GetFeedResponse.interface';
import { feedAction } from './actions';

export const getFeedEffect = createEffect(
  (action$ = inject(Actions), feedService = inject(FeedService)) =>
    action$.pipe(
      ofType(feedAction.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedAction.getFeedSuccess({ feed });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(feedAction.getFeedFailure())
          )
        );
      })
    ),
  { functional: true }
);
