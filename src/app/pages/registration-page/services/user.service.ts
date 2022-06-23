import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMap, Observable } from 'rxjs';

import { UserApiResponse } from '../../../shared/interfaces/user.interface';
import { IUserCredentials } from '../../../shared/interfaces/user-credentials.interfase';
import { BaseService } from 'src/app/shared/services/base.service';
import { ITokenNotificationResponse } from '../interfaces/token-notification-response';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    protected override httpClient: HttpClient,
    private afMessaging: AngularFireMessaging
  ) {
    super(httpClient);
  }

  public create(
    user: IUserCredentials,
    url: string
  ): Observable<UserApiResponse> {
    return this.post<UserApiResponse>(`auth/${url}`, { user });
  }

  public addNotificationToken(
    userToken: string | undefined
  ): Observable<ITokenNotificationResponse> {
    return this.afMessaging.requestToken.pipe(
      mergeMap((token: string | null) => {
        return this.post<ITokenNotificationResponse>(
          'notifications',
          {
            deviceType: 'web',
            token: token,
            isAllowed: true,
          },
          userToken
        );
      })
    );
  }
}
