import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgroexToastService, ToastType } from 'ngx-agroex-toast';
import { EMPTY, Observable } from 'rxjs';

import { UserApiResponse } from '../../../shared/interfaces/user.interface';
import { IUserCredentials } from '../../../shared/interfaces/user-credentials.interfase';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    private toastService: AgroexToastService,
    protected override httpClient: HttpClient
  ) {
    super(httpClient);
  }

  public create(
    user: IUserCredentials,
    url: string
  ): Observable<UserApiResponse> {
    return this.post<UserApiResponse>(`auth/${url}`, { user }).pipe(
      tap((createdUser: UserApiResponse) =>
        this.toastService.addToast({
          title: `User ${createdUser['user'].username} ${url} will success`,
          toastType: ToastType.Success,
          width: '60vw',
          buttonText: 'Ok',
        })
      ),
      catchError((e) => {
        this.toastService.addToast({
          title: `The user can not ${
            url === 'register' ? 'created' : 'log in'
          }`,
          message: `${
            url === 'register' ? e.error.message : 'Incorrect data entered'
          }`,
          toastType: ToastType.Error,
          width: '408px',
        });
        return EMPTY;
      })
    );
  }
}
