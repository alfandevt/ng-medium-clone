import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '../../auth/stores/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { Subscription, combineLatest, filter, throwError } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../stores/reducers';
import { CommonModule } from '@angular/common';
import { BackendErrorMessagesComponent } from '../../shared/components/backend-error-messages/backend-error-messages.component';
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface';
import { authActions } from '../../auth/stores/actions';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesComponent],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  currentUserSubs?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.currentUserSubs = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubs?.unsubscribe();
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.editCurrentUser({ currentUserRequest }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
