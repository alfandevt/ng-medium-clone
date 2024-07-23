import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import { popularTagsAction } from './store/actions';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-populartags',
  templateUrl: './popular-tag.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingComponent,
    ErrorMessageComponent,
  ],
})
export class PopularTagComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsAction.getPopularTags());
  }
}
