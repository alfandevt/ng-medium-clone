import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-loading',
  template: `<div><ng-content></ng-content></div>`,
  standalone: true,
})
export class LoadingComponent {
  @Input() message: string = '';
}
