import { Route } from '@angular/router';
import { SettingsComponent } from './components/settings.component';
import { provideState } from '@ngrx/store';
import { settingsFeatureKey, settingsReducer } from './stores/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
];
