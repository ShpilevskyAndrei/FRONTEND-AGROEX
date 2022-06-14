import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserPanelOptionId } from '../../shared/components/header/enums/user-panel-option-id';
import { AppRootActions } from '../../state/app-root/app-root.actions';
import { RegistrationPageActions } from '../../state/registration-page/registration-page.actions';
import { selectUserData } from '../../state/registration-page/registration-page.selectors';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-account-page-container',
  template: ` <app-account-page
    [user]="user$ | async"
    (logout)="onLogout()"
    (selectTab)="onSelectTab($event)"
  ></app-account-page>`,
})
export class AccountPageContainerComponent {
  public user$: Observable<IUser | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserData);
  }

  public onLogout(): void {
    this.store.dispatch(RegistrationPageActions.getUserLogout());
  }

  public onSelectTab(selectedOptionId: UserPanelOptionId): void {
    this.store.dispatch(AppRootActions.getUserSelectTab({ selectedOptionId }));
  }
}
