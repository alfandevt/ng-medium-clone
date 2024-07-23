import { createFeature, createReducer, on } from '@ngrx/store';
import { articleAction } from './action';
import { ArticleStateInterface } from '../types/ArticleState.interface';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleAction.getArticle, (state) => ({ ...state, isLoading: true })),
    on(articleAction.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(articleAction.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    // Router State
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectError,
  selectData: selectArticleData,
} = articleFeature;
