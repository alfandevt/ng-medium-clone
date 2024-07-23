import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';

export interface ArticleStateInterface {
  isLoading: boolean;
  error: string | null;
  data: ArticleInterface | null;
}
