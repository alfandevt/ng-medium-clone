import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProfileInterface } from '../../shared/types/profile.interface';
import { UserProfileInterface } from '../types/userProfile.interface';

export const userProfileAction = createActionGroup({
  source: 'user profile',
  events: {
    GetUserProfile: props<{ slug: string }>(),
    GetUserProfileSuccess: props<{ userProfile: UserProfileInterface }>(),
    GetUserProfileFailure: emptyProps(),
  },
});
