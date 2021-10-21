/*****************************************************************************************************************************************************
 * This service handles the retrieval of user-related data.
 ****************************************************************************************************************************************************/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';

@Injectable({ providedIn : 'root' })
export class UserService {
  private readonly _allUsers$ : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([] as User[]);
  private readonly _currentUser$ : BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  private readonly _userLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor(private readonly _httpClient : HttpClient) {
    this._httpClient.get<User[]>(ConfigService.appConfiguration.apiServer.paths.users.allUsers).pipe(distinctUntilChanged()).subscribe({
      next : (allUsers : User[]) : void => { this._allUsers$.next(allUsers); }
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
   * Provides a boolean-typed Observable stream for interested subscribers to receive the logged-out / logged-in status of the application.
   *
   * @returns a boolean-typed Observable stream. Subscribe to the stream to receive the object type specified asynchronously.
   */
  public getUserLoggedIn() : Observable<boolean> {
    return this._userLoggedIn$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Updates the current user of the application. This involves updating the current user and the logged-in status of the application for all
   * downstream functions to see. It should be noted that it is the responsibility of the caller to use this function appropriately. It is assumed
   * that this call is done "in good faith", meaning it should have been verified that the user has the permission to do so (either by matching
   * usernames and passwords or by some other means of authentication).
   *
   * @param user - the user to set as the current user for the application
   */
  public login(user : User) : void {
    this._currentUser$.next(user);
    this._userLoggedIn$.next(true);
  }
}
