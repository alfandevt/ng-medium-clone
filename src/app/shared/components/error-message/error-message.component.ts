import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error',
  template: `<div>{{ message }}</div>`,
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() message: string = '';
}
