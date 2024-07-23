import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';

export const articleAction = createActionGroup({
  source: 'article',
  events: {
    GetArticle: props<{ slug: string }>(),
    GetArticleSuccess: props<ArticleResponseInterface>(),
    GetArticleFailure: emptyProps(),
    // Delete
    DeleteArticle: props<{ slug: string }>(),
    DeleteArticleSuccess: emptyProps(),
    DeleteArticleFailure: emptyProps(),
  },
});
