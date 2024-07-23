import { Component, Input, OnInit } from '@angular/core';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { PopularTagComponent } from '../../../shared/components/popular-tag/popular-tag.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mc-yourfeed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl = '';
  tagName = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
