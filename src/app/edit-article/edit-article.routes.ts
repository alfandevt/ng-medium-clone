import { Route } from '@angular/router';
import { EditArticleComponent } from './components/edit-article.component';
import { EditArticleService } from './services/edit-article.service';
import * as editArticleEffects from './stores/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './stores/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
