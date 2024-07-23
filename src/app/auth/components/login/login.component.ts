import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../stores/actions';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
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
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BackendErrorMessagesComponent,
  ],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
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
    console.log('value', this.loginForm.getRawValue());
    const request: LoginRequestInterface = {
      user: this.loginForm.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
    this.authService.login(request).subscribe();
  }
}
