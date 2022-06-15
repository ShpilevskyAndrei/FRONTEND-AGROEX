import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserPanelOptionId } from '../../shared/components/header/enums/user-panel-option-id';
import { AppRootActions } from '../../state/app-root/app-root.actions';
import { RegistrationPageActions } from '../../state/registration-page/registration-page.actions';
import {
  selectUserData,
  selectUserRole,
} from '../../state/registration-page/registration-page.selectors';
import { IUser } from '../../shared/interfaces/user.interface';
import { selectAppRootOptionId } from '../../state/app-root/app-root.selectors';
import { UserRole } from '../../shared/components/header/enums/user-role';
import {
  selectAdvertisementsData,
  selectAdvertisementsLoadingStatus,
} from '../../state/advertisements-list-page/advertisements-list-page.selectors';
import { IAdvertisementRequestInterface } from '../../shared/components/advertisements-list/interfaces/advertisement-request.interface';
import { LoadingStatus } from '../../shared/interfaces/loading-status';

@Component({
  selector: 'app-account-page-container',
  template: ` <app-account-page
    [user]="user$ | async"
    [userRole]="userRole$ | async"
    [selectedTab]="selectedTab$ | async"
    [advertisementsRequest]="advertisementsRequest$ | async"
    [advertisementsLoadingStatus]="advertisementsLoadingStatus$ | async"
    (logout)="onLogout()"
    (selectTab)="onSelectTab($event)"
  ></app-account-page>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageContainerComponent {
  public user$: Observable<IUser | null>;
  public userRole$: Observable<UserRole | null>;
  public selectedTab$: Observable<string | null>;
  public advertisementsRequest$: Observable<IAdvertisementRequestInterface | null>;
  public advertisementsLoadingStatus$: Observable<LoadingStatus | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserData);
    this.userRole$ = this.store.select(selectUserRole);
    this.selectedTab$ = this.store.select(selectAppRootOptionId);
    this.advertisementsRequest$ = this.store.select(selectAdvertisementsData);
    this.advertisementsLoadingStatus$ = this.store.select(
      selectAdvertisementsLoadingStatus
    );
  }

  /*public onDispatcher(dispatcher: Function) {
    this.store.dispatch(dispatcher());
  }*/

  public onLogout(): void {
    this.store.dispatch(RegistrationPageActions.getUserLogout());
  }

  public onSelectTab(selectedOptionId: UserPanelOptionId): void {
    this.store.dispatch(AppRootActions.getUserSelectTab({ selectedOptionId }));
  }
}
