/**
 * This service handles the loading of user credentials from storage on application startup and keeps track of the authenticated (logged-in) user.
 */

import { Injectable } from '@angular/core';

import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';

@Injectable({ providedIn : 'root' })
export class CredentialService {
  private _currentUser : User | null = null;
  private _jwtToken : string = '';

  public constructor() {
    this._loadCredentialsFromStorage();
  }

  /**
   * A utility function for retrieving the logged-in (authenticated) user for the application.
   *
   * @returns the logged-in user. This could be null if the user is not logged in.
   */
  public getCurrentUser() : User | null {
    return this._currentUser;
  }

  /**
   * Returns the JSON Web Token (JWT) of the current user, which could be empty.
   *
   * @returns the JWT token of the current user. This token signifies the authentication status (logged-in/not logged-in) of the user, so it can be empty.
   */
  public getJwtToken() : string {
    return this._jwtToken;
  }

  /**
   * A utility function to get a boolean value for the logged in status of the application.
   *
   * @returns true if the user is logged in and false otherwise.
   */
  public isLoggedIn() : boolean {
    return this._jwtToken.length > 0;
  }

  /**
   * Sets the current user for the application. This is primarily intended to be called by the AuthenticationInterceptor when the user logs in to the application.
   *
   * @param user - The user data to update the current user with
   */
  public setCurrentUser(user : User) : void {
    this._currentUser = user;
    this._jwtToken = user.jwtToken;

    localStorage.setItem(ConfigService.appConfiguration.apiServer.paths.users.currentUser, JSON.stringify(user));
  }

  /**
   * This function sets, on application startup, the current user of the application with anything found in LocalStorage. This could be seen as preparing for a cookie-like
   * setup check.
   */
  private _loadCredentialsFromStorage() : void {
    const EXISTING_USER : User | null = JSON.parse(localStorage.getItem(ConfigService.appConfiguration.apiServer.paths.users.currentUser) ?? 'null') as User | null;

    if (EXISTING_USER?.jwtToken) {
      this._currentUser = EXISTING_USER;
      this._jwtToken = EXISTING_USER.jwtToken;
    }
  }
}
