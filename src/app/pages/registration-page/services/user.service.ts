import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

import { UserApiResponse } from '../interfaces/user-api-response.interface';
import { UserCredentials } from '../interfaces/user.interfase';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  public create(
    user: UserCredentials,
    url: string
  ): Observable<UserApiResponse> {
    return this.http
      .post<UserApiResponse>(
        `https://agroex-backend.herokuapp.com/users/${url}`,
        { user }
      )
      .pipe(
        tap((createdUser: UserApiResponse) =>
          this.snackbar.open(
            `User ${createdUser['user'].username} ${url} will success`,
            'Close',
            {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          )
        ),
        catchError((e) => {
          this.snackbar.open(
            `User could not be created, due to: ${e.error.message}`,
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          return throwError(() => e);
        })
      );
  }
}
