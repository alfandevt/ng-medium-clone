import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';

export const getCurrentUserEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) =>
    action$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.get('accessToken');
        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.getCurrentUserFailure())
          )
        );
      })
    ),
  { functional: true }
);

export const registerEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) =>
    action$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const redirectAfterRegister = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) =>
    action$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const editCurrentUserEffect = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService)) =>
    action$.pipe(
      ofType(authActions.editCurrentUser),
      switchMap(({ currentUserRequest }) => {
        return authService.editCurrentUser(currentUserRequest).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.editCurrentUserSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.editCurrentUserFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    ),
  { functional: true }
);

export const logoutEffect = createEffect(
  (
    action$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return action$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistanceService.set('accessToken', '');
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const redirectAfterLogin = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
