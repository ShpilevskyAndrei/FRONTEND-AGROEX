import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { UserPanelOptionId } from '../../shared/components/header/enums/user-panel-option-id';
import { IUser } from '../../shared/interfaces/user.interface';
import { USER_PANEL_OPTION } from '../../shared/components/header/constants/user-panel-option';
import { IUserOptionsType } from '../../shared/components/header/interfaces/user-options-type.interface';
import { UserRole } from '../../shared/components/header/enums/user-role';
import { IAdvertisementRequestInterface } from '../../shared/components/advertisements-list/interfaces/advertisement-request.interface';
import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { IMyOrdersInterface } from './my-orders/interfaces/my-orders-request.interface';
import { IAdvertisementInterface } from '../../shared/components/advertisements-list/interfaces/advertisement.interface';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  @Input() public user: IUser | null;
  @Input() public userRole: UserRole | null;
  @Input() public selectedTab: string | null;
  @Input()
  public myAdvertisementsRequest: IAdvertisementRequestInterface | null;
  @Input() public myAdvertisementsLoadingStatus: LoadingStatus | null;
  @Input()
  public myBettingsRequest: IAdvertisementInterface[] | null;
  @Input() public myBettingsLoadingStatus: LoadingStatus | null;
  @Input()
  public myOrdersRequest: IMyOrdersInterface[] | null;
  @Input() public myOrdersLoadingStatus: LoadingStatus | null;

  @Output() public logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() public selectTab: EventEmitter<UserPanelOptionId> =
    new EventEmitter<UserPanelOptionId>();
  @Output() public dispatcher: EventEmitter<Function> =
    new EventEmitter<Function>();
  @Output() public setBet: EventEmitter<Record<string, string | number>> =
    new EventEmitter<Record<string, string | number>>();
  @Output() public setBuy: EventEmitter<Record<string, string>> =
    new EventEmitter<Record<string, string>>();
  @Output() public confirmDeal: EventEmitter<IAdvertisementInterface> =
    new EventEmitter<IAdvertisementInterface>();

  public userPanelOption: IUserOptionsType[] = USER_PANEL_OPTION;
  public userPanelOptionId = UserPanelOptionId;

  public onLogout(): void {
    this.logout.emit();
  }

  public onSelectTab(selectedOptionId: UserPanelOptionId): void {
    this.selectTab.emit(selectedOptionId);
  }

  public onDispatcher(dispatcher: Function): void {
    this.dispatcher.emit(dispatcher);
  }

  public onConfirmDeal(advertisement: IAdvertisementInterface): void {
    this.confirmDeal.emit(advertisement);
  }

  public onSetBet(newBetOptions: Record<string, string | number>): void {
    this.setBet.emit(newBetOptions);
  }

  public onSetBuy(buyOptions: Record<string, string>): void {
    this.setBuy.emit(buyOptions);
  }
}
