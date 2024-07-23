import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userProfileAction } from '../stores/actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectUserProfile,
} from '../stores/reducers';
import { selectCurrentUser } from '../../auth/stores/reducers';
import { UserProfileInterface } from '../types/userProfile.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { FeedComponent } from '../../shared/components/feed/feed.component';

@Component({
  selector: 'mc-user-app',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  slug: string = '';
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter(
        (currentUser): currentUser is CurrentUserInterface | null =>
          currentUser !== undefined
      )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfile),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({ currentUser, userProfile }) => {
      return currentUser?.username === userProfile.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfile),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.slug = param['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileAction.getUserProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorite = this.router.url.includes('favorites');
    return isFavorite
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
