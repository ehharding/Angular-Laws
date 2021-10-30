/******************************************************************************************************************************************************************************
 * This service handles the loading of user credentials from storage on application startup and keeps track of the currently authenticated (logged in) user.
 *****************************************************************************************************************************************************************************/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';

@Injectable({ providedIn : 'root' })
export class CredentialService {
  private _currentUser : User = { } as User;
  private _jwtToken : string = '';

  public constructor(private readonly _httpClient : HttpClient) {
    this._loadCredentialsFromStorage();
  }

  /**
   * Returns the Java Web Token (JWT) of the current user, which could be empty.
   *
   * @returns the JWT token of the current user. This token signifies the authentication status (logged in/not logged in) of the user, so it can be empty.
   */
  public getJwtToken() : string {
    return this._jwtToken;
  }

  /**
   * A utility function to get a boolean value for the logged-in status of the application.
   *
   * @returns true if the user is logged in and false otherwise.
   */
  public isLoggedIn() : boolean {
    return this._jwtToken.length > 0;
  }

  /**
   * A utility function for retrieving the currently logged-in (authenticated) user for the application.
   *
   * @returns the currently logged-in user. This could be an empty object if the user is not logged in.
   */
  public getCurrentUser() : User {
    return this._currentUser;
  }

  /**
   * Sets the current user for the application. This is primarily intended to be called by the AuthenticationInterceptor when the user logs in to the application.
   *
   * @param user - The user data to update the current user with
   */
  public setCurrentUser(user : User) : void {
    this._currentUser = user;
    this._jwtToken = user.jwtToken;
  }

  /**
   * This function sets, on application startup, the current user of the application with anything found in LocalStorage. This could be seen as preparing for a cookie-like
   * setup check.
   */
  private _loadCredentialsFromStorage() : void {
    this._currentUser = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.currentUser) ?? '{ }') as User;
    this._jwtToken = this._currentUser.jwtToken;
  }
}
