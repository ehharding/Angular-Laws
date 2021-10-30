import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ReplaySubject, takeUntil } from 'rxjs';

import { ALL_THEMES, Theme, ThemeBundle } from '@core/services/theme/theme.model';
import { DEFAULT_MAT_DIALOG_CONFIG } from '@core/services/config/config.model';
import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { UserService } from '@core/services/user/user.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';
import { CreateAccountLoginDialogComponent } from '@core/components/toolbar/create-account-login-dialog/create-account-login-dialog.component';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public readonly allThemes : Theme[] = ALL_THEMES;
  public activeTheme : ThemeBundle = ThemeBundle.DeepPurpleAmber;
  public currentUser : User = {} as User;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(public readonly dialog : MatDialog, private readonly _themeService : ThemeService, private readonly _userService : UserService) { }

  public ngOnInit() : void {
    this._themeService.getActiveThemeBundleName().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (activeTheme : ThemeBundle) : void => { this.activeTheme = activeTheme; }
    });

    this._userService.getCurrentUser().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (currentUser : User) : void => { this.currentUser = currentUser; }
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  /**
   * Opens the "About" dialog (sometimes called a modal) that contains information about the application.
   */
  public openAboutDialog() : void {
    const DIALOG_REF : MatDialogRef<AboutDialogComponent> = this.dialog.open(AboutDialogComponent, DEFAULT_MAT_DIALOG_CONFIG);

    DIALOG_REF.backdropClick().subscribe(() : void => {
      DIALOG_REF.addPanelClass('pf-shake');

      window.setTimeout(() : MatDialogRef<AboutDialogComponent> => {
        return DIALOG_REF.removePanelClass('pf-shake');
      }, ConfigService.appConfiguration.constants.genericAnimationDurationMS);
    });
  }

  /**
   * Opens the "Create Account | Login" dialog (sometimes called a modal) that contains the functionality to both create an account on the application and to log in to the
   * site with an existing account.
   */
  public openCreateAccountLoginDialog() : void {
    const DIALOG_REF : MatDialogRef<CreateAccountLoginDialogComponent> = this.dialog.open(CreateAccountLoginDialogComponent, DEFAULT_MAT_DIALOG_CONFIG);

    DIALOG_REF.backdropClick().subscribe(() : void => {
      DIALOG_REF.addPanelClass('pf-shake');

      window.setTimeout(() : MatDialogRef<CreateAccountLoginDialogComponent> => {
        return DIALOG_REF.removePanelClass('pf-shake');
      }, ConfigService.appConfiguration.constants.genericAnimationDurationMS);
    });
  }

  /**
   * Sets the application theme using the ThemeService.
   *
   * @param themeBundleName - The themeBundleName of the theme to set from one of the available defined in the `ThemeBundle` enumeration
   */
  public setApplicationTheme(themeBundleName : ThemeBundle) : void {
    this._themeService.loadClientTheme(themeBundleName);
  }
}
