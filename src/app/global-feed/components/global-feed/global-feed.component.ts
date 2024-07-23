import { Component, Input } from '@angular/core';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { PopularTagComponent } from '../../../shared/components/popular-tag/popular-tag.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';

@Component({
  selector: 'mc-globalfeed',
  templateUrl: './global-feed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagComponent,
    FeedTogglerComponent,
  ],
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
}
