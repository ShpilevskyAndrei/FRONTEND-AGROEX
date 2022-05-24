import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { LoginPageActions } from '../../state/login-page/login-page.actions';
import { selectLoginData } from '../../state/login-page/login-page.selectors';
import { MainDashboardActions } from '../../state/main-dashboard/main-dashboard.actions';
import {
  selectCategoriesData,
  selectCategoriesLoadingStatus,
} from '../../state/main-dashboard/main-dashboard.selectors';
import { selectUserData } from '../../state/registration-page/registration-page.selectors';
import { UserFromApi } from '../registration-page/interfaces/user-api-response.interface';
import { Category } from './categories/model/category.model';

@Component({
  selector: 'app-main-dashboard-container',
  template: ` <app-main-dashboard
    [categories]="categories$ | async"
    [categoriesLoadingStatus]="categoriesLoadingStatus$ | async"
    [user]="user$ | async"
    (logout)="onLogout()"
  ></app-main-dashboard>`,
})
export class MainDashboardContainerComponent implements OnInit {
  public categories$: Observable<Category[] | null>;
  public categoriesLoadingStatus$: Observable<LoadingStatus | null>;
  public user$: Observable<UserFromApi | null>;

  constructor(private store: Store) {
    this.categories$ = this.store.select(selectCategoriesData);
    this.user$ = this.store.select(selectUserData);
    this.user$ = this.store.select(selectLoginData); // ??
    this.categoriesLoadingStatus$ = this.store.select(
      selectCategoriesLoadingStatus
    );
  }

  public ngOnInit(): void {
    this.store.dispatch(MainDashboardActions.getCategoriesRequest());
  }

  public onLogout(): void {
    this.store.dispatch(LoginPageActions.getLogout());
  }
}
