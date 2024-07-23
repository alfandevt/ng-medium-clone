import { createFeature, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/PopularTagsState.interface';
import { popularTagsAction } from './actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagsAction.getPopularTags, (state) => ({ ...state, isLoading: true })),
    on(popularTagsAction.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagsAction.getPopularTagsFailure, (state) => ({ ...state, isLoading: false })),
   
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = popularTagsFeature;
