import { GetFeedResponseInterface } from './GetFeedResponse.interface';

export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponseInterface | null;
}
