import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from '../../../types/article.interface';

export const addToFavoriteActions = createActionGroup({
  source: 'add to favorite',
  events: {
    AddToFavorite: props<{ isFavorited: boolean; slug: string }>(),
    AddToFavoriteSuccess: props<{ article: ArticleInterface }>(),
    AddToFavoriteFailur: emptyProps(),
  },
});
