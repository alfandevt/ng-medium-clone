import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { feedAction } from './stores/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectFeedData,
  selectIsLoading,
} from './stores/reducers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from '../../../../environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';
import { AddToFavoriteComponent } from '../add-to-favorite/add-to-favorite.component';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoriteComponent
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';

  data$ = combineLatest({
    feed: this.store.select(selectFeedData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });
  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 1;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.currentPage = Number(param['page'] || '1');
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(
      feedAction.getFeed({
        url: apiUrlWithParams,
      })
    );
  }
}
