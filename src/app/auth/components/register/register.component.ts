import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../stores/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../stores/reducers';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log('value', this.registerForm.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.registerForm.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
    this.authService.register(request).subscribe();
  }
}
