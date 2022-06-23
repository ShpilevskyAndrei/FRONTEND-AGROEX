import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgroexToastService, ToastType } from 'ngx-agroex-toast';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { AccountPageService } from '../../pages/account-page/services/account-page.service';
import { IAdvertisementRequestInterface } from '../../shared/components/advertisements-list/interfaces/advertisement-request.interface';
import { selectUserToken } from '../registration-page/registration-page.selectors';
import { AccountPageActions } from './account-page.actions';
import { IMyOrdersInterface } from '../../pages/account-page/my-orders/interfaces/my-orders-request.interface';

@Injectable()
export class AccountPageEffects {
  public myAdvertisements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        AccountPageActions.getMyAdvertisementsRequest,
        AccountPageActions.getConfirmDealSuccess
      ),
      withLatestFrom(this.store.select(selectUserToken)),
      switchMap(([_, selectUserToken]) =>
        this.accountPageService.getMyAdvertisements(selectUserToken).pipe(
          map((myAdvertisements: IAdvertisementRequestInterface) =>
            AccountPageActions.getMyAdvertisementsSuccess({
              myAdvertisements,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              AccountPageActions.getMyAdvertisementsError({
                error: error,
              })
            )
          )
        )
      )
    );
  });

  public confirmDeal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountPageActions.getConfirmDealRequest),
      withLatestFrom(this.store.select(selectUserToken)),
      switchMap(([{ slug }, selectUserToken]) =>
        this.accountPageService.setConfirmDeal(slug, selectUserToken).pipe(
          map(() => {
            this.toastService.addToast({
              toastType: ToastType.Success,
              title: `You confirmed the deal with LOT ____`,
              width: '60vw',
            });

            return AccountPageActions.getConfirmDealSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.toastService.addToast({
              toastType: ToastType.Error,
              title: `Something went wrong! Please retry!`,
              width: '60vw',
            });

            return of(
              AccountPageActions.getConfirmDealError({
                error: error,
              })
            );
          })
        )
      )
    );
  });

  public myOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountPageActions.getMyOrdersRequest),
      withLatestFrom(this.store.select(selectUserToken)),
      switchMap(([_, selectUserToken]) =>
        this.accountPageService.getOrders(selectUserToken).pipe(
          map((myOrders: IMyOrdersInterface[]) =>
            AccountPageActions.getMyOrdersSuccess({
              myOrders,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              AccountPageActions.getMyOrdersError({
                error: error,
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private accountPageService: AccountPageService,
    private toastService: AgroexToastService
  ) {}
}
