import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { IAdvertisementRequestInterface } from '../../shared/components/advertisements-list/interfaces/advertisement-request.interface';
import { IMyOrdersInterface } from '../../pages/account-page/my-orders/interfaces/my-orders-request.interface';

export const AccountPageActions = {
  getMyAdvertisementsRequest: createAction(
    '[ACCOUNT_PAGE] my advertisements requested'
  ),

  getMyAdvertisementsSuccess: createAction(
    '[ACCOUNT_PAGE] my advertisements success',
    props<{ myAdvertisements: IAdvertisementRequestInterface }>()
  ),

  getMyAdvertisementsError: createAction(
    '[ACCOUNT_PAGE] my advertisements error',
    props<{ error: HttpErrorResponse }>()
  ),

  getMyOrdersRequest: createAction('[ACCOUNT_PAGE] my orders requested'),

  getMyOrdersSuccess: createAction(
    '[ACCOUNT_PAGE] my orders success',
    props<{ myOrders: IMyOrdersInterface[] }>()
  ),

  getMyOrdersError: createAction(
    '[ACCOUNT_PAGE] my orders error',
    props<{ error: HttpErrorResponse }>()
  ),
};
