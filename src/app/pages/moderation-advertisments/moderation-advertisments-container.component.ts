import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { IUser } from '../../shared/interfaces/user.interface';
// import { CreateAdvertisementPageActions } from '../../state/moderation-advertisments/create-advertisement-page.actions';
// import { selectCreateAdvertisementLoadingStatus } from '../../state/create-advertisement-page/create-advertisement-page.selectors';
import { RegistrationPageActions } from '../../state/registration-page/registration-page.actions';
import { selectUserData } from '../../state/registration-page/registration-page.selectors';
import { IAdvertisementRequestInterface } from 'src/app/advertisements-list/interfaces/advertisement-request.interface';
import { ModerateAdvertisementsListPageActions } from 'src/app/state/moderation-advertisments-list/advertisements-list-page.actions';
import {
  selectModerateAdvertisementsData,
  selectModerateAdvertisementsLoadingStatus,
} from 'src/app/state/moderation-advertisments-list/advertisements-list-page.selectors';
import { IAdvertisementModerationRequest } from 'src/app/moderation-advertisments-list/interfaces/advertisement.interface';

@Component({
  selector: 'app-moderation-advertisments-page-container',
  template: ` <app-moderation-advertisments
    [user]="user$ | async"
    (logout)="onLogout()"
    (moderationDecision)="onModerationDecision($event)"
    [advertisementsRequest]="advertisementsRequest$ | async"
    [advertisementsLoadingStatus]="advertisementsLoadingStatus$ | async"
  ></app-moderation-advertisments>`,
})
export class ModerationAdvertismentsContainerComponent implements OnInit {
  //MAKSIM
  public user$: Observable<IUser | null>;
  public createAdvertisementLoadingStatus$: Observable<LoadingStatus>;
  //IGOR
  public advertisementsRequest$: Observable<IAdvertisementRequestInterface | null>;
  public advertisementsLoadingStatus$: Observable<LoadingStatus | null>;

  constructor(private store: Store) {
    //MAKSIM
    this.user$ = this.store.select(selectUserData);
    // this.createAdvertisementLoadingStatus$ = this.store.select(
    //   selectCreateAdvertisementLoadingStatus
    // );
    //IGOR
    this.advertisementsRequest$ = this.store.select(
      selectModerateAdvertisementsData
    );
    this.advertisementsLoadingStatus$ = this.store.select(
      selectModerateAdvertisementsLoadingStatus
    );
  }

  public onLogout(): void {
    this.store.dispatch(RegistrationPageActions.getUserLogout());
  }

  //IGOR
  public ngOnInit(): void {
    this.store.dispatch(
      ModerateAdvertisementsListPageActions.getNonModerateAdvertisementsRequest()
    );
  }

  public onModerationDecision(
    moderationDecision: IAdvertisementModerationRequest
  ): void {
    this.store.dispatch(
      ModerateAdvertisementsListPageActions.getDecisionNonModerateAdvertisements(
        { decision: moderationDecision }
      )
    );
  }

  // public onSubmitAdvertisementFormData(formAdvertisement: FormData): void {
  //   this.store.dispatch(
  //     CreateAdvertisementPageActions.createAdvertisementRequest({
  //       formAdvertisement,
  //     })
  //   );
  // }

  // public onDropLoadingStatus(): void {
  //   this.store.dispatch(
  //     CreateAdvertisementPageActions.dropAdvertisementLoadingStatus()
  //   );
  // }
}
