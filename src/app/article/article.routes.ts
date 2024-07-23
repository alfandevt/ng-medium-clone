import { Route } from '@angular/router';
import { ArticleComponent } from './components/article.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { articleFeatureKey, articleReducer } from './stores/reducers';
import * as articleEffect from './stores/effects';
import { ArticleService } from './services/article.service';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffect),
      provideState(articleFeatureKey, articleReducer),
      ArticleService,
    ],
  },
];
