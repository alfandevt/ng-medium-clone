import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    // Register
    Register: props<{ request: RegisterRequestInterface }>(),
    RegisterSuccess: props<{ currentUser: CurrentUserInterface }>(),
    RegisterFailure: props<{ errors: BackendErrorsInterface }>(),
    // Login
    Login: props<{ request: LoginRequestInterface }>(),
    LoginSuccess: props<{ currentUser: CurrentUserInterface }>(),
    LoginFailure: props<{ errors: BackendErrorsInterface }>(),
    // Get Current User
    GetCurrentUser: emptyProps(),
    GetCurrentUserSuccess: props<{ currentUser: CurrentUserInterface }>(),
    GetCurrentUserFailure: emptyProps(),

    // Edit Current User
    EditCurrentUser: props<{
      currentUserRequest: CurrentUserRequestInterface;
    }>(),
    EditCurrentUserSuccess: props<{ currentUser: CurrentUserInterface }>(),
    EditCurrentUserFailure: props<{ errors: BackendErrorsInterface }>(),
    // Logout
    Logout: emptyProps(),
  },
});

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );
