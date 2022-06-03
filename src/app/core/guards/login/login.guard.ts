/**
 * This file handles the activation of the /login route of the application. It rejects users of the application that are already logged in.
 */

import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DEFAULT_MAT_SNACKBAR_CONFIG } from '@core/services/config/config.model';

import { CredentialService } from '@core/services/credential/credential.service';

@Injectable()
class LoginGuard implements CanActivate {
  public constructor(private readonly _snackBar : MatSnackBar, private readonly _credentialService : CredentialService) { }

  /**
   * This method determines if the /login application route can be activated. If the user is logged in to the application then access to the route is rejected, and the user is
   * returned to the main page. Otherwise, they are allowed to the login page.
   *
   * @returns true if the user can activate the route this guard is configured for and false otherwise.
   */
  public canActivate() : boolean {
    if (this._credentialService.isLoggedIn()) {
      this._snackBar.open('You Don\'t Need To Go To That Page Again. You\'re Already Logged In!', 'OK', DEFAULT_MAT_SNACKBAR_CONFIG);

      return false;
    }

    return true;
  }
}

export {
  LoginGuard
};
