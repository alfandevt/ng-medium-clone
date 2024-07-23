import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsStateInterface } from '../types/settingsState.interface';
import { authActions } from '../../auth/stores/actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.editCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.editCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.editCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    // Router Action
    on(routerNavigatedAction, (state) => ({ ...state, validationErrors: null }))
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingsFeature;
