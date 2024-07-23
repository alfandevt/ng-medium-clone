import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProfileService } from '../services/user-profile.service';
import { userProfileAction } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getUserProfileEffect = createEffect(
  (
    action$ = inject(Actions),
    userProfileService = inject(UserProfileService)
  ) => {
    return action$.pipe(
      ofType(userProfileAction.getUserProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile) => {
            return userProfileAction.getUserProfileSuccess({ userProfile });
          }),
          catchError(() => {
            return of(userProfileAction.getUserProfileFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
