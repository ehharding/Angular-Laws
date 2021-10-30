/******************************************************************************************************************************************************************************
 * This service handles the retrieval of user-related data and making user-related transactions with the database.
 *****************************************************************************************************************************************************************************/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';

@Injectable({ providedIn : 'root' })
export class UserService {
  private readonly _allUsers$ : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([] as User[]);
  private readonly _currentUser$ : BehaviorSubject<User> = new BehaviorSubject<User>({ } as User);

  public constructor(private readonly _httpClient : HttpClient) {
    this._httpClient.get<User[]>(ConfigService.appConfiguration.apiServer.paths.users.allUsers).pipe(distinctUntilChanged()).subscribe({
      next : (allUsers : User[]) : void => { this._allUsers$.next(allUsers); }
    });

    this._httpClient.get<User>(ConfigService.appConfiguration.apiServer.paths.users.currentUser).pipe(distinctUntilChanged()).subscribe({
      next : (currentUser : User) : void => {
        if (currentUser.jwtToken) {
          this._currentUser$.next(currentUser);
        }
      }
    });
  }

  /**
   * Provides a User[]-typed Observable stream for interested subscribers to receive all users from the database.
   *
   * @returns a User[]-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getAllUsers() : Observable<User[]> {
    return this._allUsers$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Provides a User-typed Observable stream for interested subscribers to receive the current user from the database.
   *
   * @returns a User-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getCurrentUser() : Observable<User> {
    return this._currentUser$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * This function authenticates (logs in) a user to the application. If the username and password match an existing user in the database, then the user is logged in.
   *
   * @param userName - The username of the user to log in
   * @param password - The password of the user trying to log in
   * @returns the newly logged-in user if successful.
   */
  public login(userName : string, password : string) : Observable<User> {
    return this._httpClient.post<User>(ConfigService.appConfiguration.apiServer.paths.users.authenticate, { userName, password }, { withCredentials : true }).pipe(
      map((responseObject : User) : User => {
        if (responseObject.jwtToken) {
          this._currentUser$.next(responseObject);
        }

        return responseObject;
      })
    );
  }
}
