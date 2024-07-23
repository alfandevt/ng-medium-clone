import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddToFavoriteServices } from './services/add-to-favorite.service';
import { Store } from '@ngrx/store';
import { addToFavoriteActions } from './stores/actions';

@Component({
  selector: 'mc-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AddToFavoriteComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private store: Store) {}

  handleLike(): void {
    this.store.dispatch(
      addToFavoriteActions.addToFavorite({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );
    if (this.isFavorited) {
      this.favoritesCount--;
    } else {
      this.favoritesCount++;
    }

    this.isFavorited = !this.isFavorited;
  }
}
