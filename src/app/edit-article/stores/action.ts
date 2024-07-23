import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export const editArticleAction = createActionGroup({
  source: 'edit article',
  events: {
    GetArticle: props<{ slug: string }>(),
    GetArticleSuccess: props<ArticleResponseInterface>(),
    GetArticleFailure: emptyProps(),
    // edit
    EditArticle: props<{ request: ArticleRequestInterface; slug: string }>(),
    EditArticleSuccess: props<ArticleResponseInterface>(),
    EditArticleFailure: props<{ errors: BackendErrorsInterface }>(),
  },
});
