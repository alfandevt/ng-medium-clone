import { Component } from '@angular/core';
import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../stores/reducers';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { createArticleAction } from '../stores/action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
})
export class CreateArticleComponent {
  initialValues: ArticleFormValuesInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    console.log(request);

    this.store.dispatch(createArticleAction.createArticle({ request }));
  }
}
