import { createFeature, createReducer, on } from '@ngrx/store';
import { editArticleAction } from './action';
import { routerNavigationAction } from '@ngrx/router-store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';

const initialState: EditArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleFeature = createFeature({
  name: 'edit article',
  reducer: createReducer(
    initialState,
    // get
    on(editArticleAction.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(editArticleAction.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(editArticleAction.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    // edit
    on(editArticleAction.editArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(editArticleAction.editArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(editArticleAction.editArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    // Router State
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectArticle
} = editArticleFeature;
