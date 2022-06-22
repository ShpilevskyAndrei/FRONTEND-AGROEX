import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IAdvertisementRequestInterface,
  IAdvertisementRequestMyBetsInterface,
} from '../../../shared/components/advertisements-list/interfaces/advertisement-request.interface';
import { BaseService } from '../../../shared/services/base.service';
import { IMyOrdersInterface } from '../my-orders/interfaces/my-orders-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountPageService extends BaseService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public getMyAdvertisements(
    token?: string
  ): Observable<IAdvertisementRequestInterface> {
    return this.get<IAdvertisementRequestInterface>(
      // 'advertisements/myAdvertisements/all',
      'advertisements/my-advertisements',
      { token }
    );
  }

  public getMyBettings(
    token?: string
  ): Observable<IAdvertisementRequestMyBetsInterface> {
    return this.get<IAdvertisementRequestMyBetsInterface>(
      'advertisements/advertisements/my-bets',
      { token }
    );
  }

  public getOrders(token?: string): Observable<IMyOrdersInterface[]> {
    return this.get<IMyOrdersInterface[]>('orders', { token });
  }

  public setConfirmDeal(
    slug: string,
    token?: string
  ): Observable<IAdvertisementRequestInterface> {
    return this.post<IAdvertisementRequestInterface>(
      `orders/confirm/${slug}`,
      {},
      token
    );
  }
}
