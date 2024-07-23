import { createFeature, createReducer, on } from '@ngrx/store';
import { createArticleAction } from './action';
import { routerNavigationAction } from '@ngrx/router-store';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'create article',
  reducer: createReducer(
    initialState,
    on(createArticleAction.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleAction.createArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleAction.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    // Router State
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;
