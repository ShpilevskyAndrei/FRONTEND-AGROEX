import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { filter, mergeMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import firebase from 'firebase/compat';
import MessagePayload = firebase.messaging.MessagePayload;

import { IUser } from '../../interfaces/user.interface';
import { USER_PANEL_OPTION } from './constants/user-panel-option';
import { LOGGED_ROLE_CONFIG } from './constants/user-role-config';
import { UserPanelOptionId } from './enums/user-panel-option-id';
import { UserRole } from './enums/user-role';
import { IUserOptionsType } from './interfaces/user-options-type.interface';
import { AgroexToastService, ToastType } from 'ngx-agroex-toast';
import { ModerationPage } from 'src/app/pages/moderation-advertisements/interfaces/moderation-page.interface';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges, OnInit {
  @Input() public user: IUser | null;
  @Input() public userRole: UserRole | null;
  @Input() public notificationMessage: MessagePayload[] | null;
  @Input() public moderationPage = ModerationPage.StatusFalse;

  @Output() public logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() public selectTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() public addNotificationMessage: EventEmitter<MessagePayload> =
    new EventEmitter<MessagePayload>();

  public userRoleConfig = LOGGED_ROLE_CONFIG;
  public userRoles = UserRole;
  public userPanelOption: IUserOptionsType[] = USER_PANEL_OPTION;
  public userCurrentRole: UserRole | null = UserRole.Guest;

  constructor(
    private router: Router,
    private afMessaging: AngularFireMessaging,
    private toastService: AgroexToastService
  ) {}

  public ngOnInit(): void {
    this.afMessaging.messages
      .pipe(
        tap((message) => {
          this.toastService.addToast({
            toastType: ToastType.Info,
            title: 'You received new message',
            width: '60vw',
          });
          this.addNotificationMessage.emit(message);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && this.user) {
      this.userCurrentRole = this.userRole;
    }
  }

  public onLogin(): void {
    this.router.navigate(['registration']);
  }

  public navigateToUserOption(
    selectedOption: IUserOptionsType,
    userNavigationPanel: MatSelect
  ): void {
    if (selectedOption.id === UserPanelOptionId.MyAccount) {
      userNavigationPanel.value = null;
      this.onLogout();

      return;
    }
  }

  public goToMainPage(): void {
    this.router.navigate(['']);
  }

  public goToCreateAdvertisement(): void {
    this.router.navigate(['create-advertisement']);
  }

  public goToModerateAdvertisement(): void {
    this.router.navigate(['moderation-advertisements']);
  }

  public onLogout(): void {
    this.afMessaging.getToken
      .pipe(
        tap((result) => {
          if (!result) {
            this.logout.emit();
            this.userCurrentRole = UserRole.Guest;
            this.router.navigate(['']);

            return;
          }

          return result;
        }),
        filter(Boolean),
        mergeMap((token: string) => this.afMessaging.deleteToken(token)),
        tap(() => {
          this.logout.emit();
          this.userCurrentRole = UserRole.Guest;
          this.router.navigate(['']);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public onSelectPage(selectedOptionId: string | undefined): void {
    this.selectTab.emit(selectedOptionId);
  }
}
