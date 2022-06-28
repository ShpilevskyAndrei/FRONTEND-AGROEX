import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import MessagePayload = firebase.messaging.MessagePayload;

import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { IUser } from '../../shared/interfaces/user.interface';
import { AppRootActions } from '../../state/app-root/app-root.actions';
import { CreateAdvertisementPageActions } from '../../state/create-advertisement-page/create-advertisement-page.actions';
import { selectCreateAdvertisementLoadingStatus } from '../../state/create-advertisement-page/create-advertisement-page.selectors';
import { RegistrationPageActions } from '../../state/registration-page/registration-page.actions';
import {
  selectUserData,
  selectUserRole,
} from '../../state/registration-page/registration-page.selectors';
import { UserRole } from '../../shared/components/header/enums/user-role';
import { getNotificationMessage } from '../../state/app-root/app-root.selectors';

@Component({
  selector: 'app-create-advertisement-page-container',
  template: ` <app-create-advertisement-page
    [user]="user$ | async"
    [userRole]="userRole$ | async"
    [createAdvertisementLoadingStatus]="
      createAdvertisementLoadingStatus$ | async
    "
    [notificationMessage]="notificationMessage$ | async"
    (logout)="onLogout()"
    (formAdvertisement)="onSubmitAdvertisementFormData($event)"
    (dropLoadingStatus)="onDropLoadingStatus()"
    (selectTab)="onSelectTab($event)"
    (addNotificationMessage)="onAddNotificationMessage($event)"
    (changeNotificationStatus)="onClickNotification($event)"
  ></app-create-advertisement-page>`,
})
export class CreateAdvertisementPageContainerComponent {
  public user$: Observable<IUser | null>;
  public userRole$: Observable<UserRole | null>;
  public createAdvertisementLoadingStatus$: Observable<LoadingStatus>;
  public notificationMessage$: Observable<MessagePayload[] | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserData);
    this.userRole$ = this.store.select(selectUserRole);
    this.createAdvertisementLoadingStatus$ = this.store.select(
      selectCreateAdvertisementLoadingStatus
    );
    this.notificationMessage$ = this.store.select(getNotificationMessage);
  }

  public onLogout(): void {
    this.store.dispatch(RegistrationPageActions.getUserLogout());
  }

  public onSubmitAdvertisementFormData(formAdvertisement: FormData): void {
    this.store.dispatch(
      CreateAdvertisementPageActions.createAdvertisementRequest({
        formAdvertisement,
      })
    );
  }

  public onDropLoadingStatus(): void {
    this.store.dispatch(
      CreateAdvertisementPageActions.dropAdvertisementLoadingStatus()
    );
  }

  public onSelectTab(selectedOptionId: string): void {
    this.store.dispatch(AppRootActions.getUserSelectTab({ selectedOptionId }));
  }

  public onAddNotificationMessage(message: MessagePayload): void {
    this.store.dispatch(AppRootActions.getNotificationMessage({ message }));
  }

  public onClickNotification(message: MessagePayload): void {
    this.store.dispatch(AppRootActions.changeNotificationStatus({ message }));
  }
}
