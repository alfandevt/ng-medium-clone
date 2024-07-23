import { Route } from '@angular/router';
import { UserProfileComponent } from './components/user-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { provideState } from '@ngrx/store';
import { userProfileFeatureKey, userProfileReducer } from './stores/reducers';
import { provideEffects } from '@ngrx/effects';
import * as userProfileEffect from './stores/effects';
export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProfileEffect),
    ],
  },
];
