import { createFeature, createReducer, on } from '@ngrx/store';
import { UserProfileStateInterface } from '../types/userProfileState.interface';
import { userProfileAction } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const userProfileFeature = createFeature({
  name: 'user profile',
  reducer: createReducer(
    initialState,
    on(userProfileAction.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileAction.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileAction.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(routerNavigatedAction, (state) => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectData: selectUserProfile,
  selectError,
  selectIsLoading,
} = userProfileFeature;
