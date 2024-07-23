import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/popularTag.type';

@Component({
  selector: 'mc-taglist',
  templateUrl: './tag-list.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];
}
