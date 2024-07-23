import { Component, OnInit } from '@angular/core';
import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import {
  selectArticle,
  selectIsSubmitting,
  selectValidationErrors,
} from '../stores/reducers';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { editArticleAction } from '../stores/action';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from '../../shared/types/article.interface';
import { selectIsLoading } from '../../auth/stores/reducers';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleAction.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };

    this.store.dispatch(
      editArticleAction.editArticle({ request, slug: this.slug })
    );
  }
}
