import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export const createArticleAction = createActionGroup({
  source: 'create article',
  events: {
    CreateArticle: props<{ request: ArticleRequestInterface }>(),
    CreateArticleSuccess: props<ArticleResponseInterface>(),
    CreateArticleFailure: props<{ errors: BackendErrorsInterface }>(),
  },
});
