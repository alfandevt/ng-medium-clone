import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/stores/reducers';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class FeedTogglerComponent implements OnInit {
  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
