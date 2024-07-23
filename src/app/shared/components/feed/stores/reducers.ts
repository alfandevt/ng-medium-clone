import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/FeedState.interface';
import { feedAction } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedAction.getFeed, (state) => ({ ...state, isLoading: true })),
    on(feedAction.getFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(feedAction.getFeedFailure, (state) => ({ ...state, isLoading: false })),
    // Router state
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = feedFeature;
