import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/auth/stores/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffect from './app/auth/stores/effects';
import * as feedEffect from './app/shared/components/feed/stores/effects';
import * as popularTagsEffect from './app/shared/components/popular-tag/store/effects';
import * as addToFavoriteEffect from './app/shared/components/add-to-favorite/stores/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from './app/shared/services/auth-interceptor';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/stores/reducers';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/components/popular-tag/store/reducers';
import { AddToFavoriteServices } from './app/shared/components/add-to-favorite/services/add-to-favorite.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),

    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),

    provideEffects(
      authEffect,
      feedEffect,
      popularTagsEffect,
      addToFavoriteEffect
    ),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(),
    provideRouterStore(),
    AddToFavoriteServices,
  ],
});
