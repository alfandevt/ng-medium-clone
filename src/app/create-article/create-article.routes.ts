import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/create-article.component';
import { CreateArticleService } from './services/create-article.service';
import * as createArticleEffects from './stores/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './stores/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
