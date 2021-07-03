import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AVAILABLE_THEMES, Theme, ThemeBundle } from '@core/services/theme/theme.model';
import { AboutDialogData } from '@core/components/toolbar/about-dialog/about-dialog.model';
import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { UserService } from '@core/services/user/user.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public readonly aboutDialogTitle : string = 'About The Application';
  public applicationTitle : string = 'Application Title';

  public readonly availableThemes : Theme[] = AVAILABLE_THEMES;
  public activeTheme : ThemeBundle = ThemeBundle.DeepPurpleAmber;

  public allUsers : User[];
  public currentUser : User;
  public userLoggedIn : boolean;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(
    public readonly dialog : MatDialog,
    private readonly _titleService : Title,
    private readonly _themeService : ThemeService,
    private readonly _userService : UserService
  ) { }

  public ngOnInit() : void {
    this.applicationTitle = this._titleService.getTitle();

    this._themeService.getActiveThemeBundleName().pipe(takeUntil(this._componentDestroyed$)).subscribe((activeTheme : ThemeBundle) : void => {
      this.activeTheme = activeTheme;
    });

    this._userService.getAllUsers().pipe(takeUntil(this._componentDestroyed$)).subscribe((allUsers : User[]) : void => {
      this.allUsers = allUsers;
    });

    this._userService.getCurrentUser().pipe(takeUntil(this._componentDestroyed$)).subscribe((currentUser : User) : void => {
      this.currentUser = currentUser;
    });

    this._userService.getUserLoggedIn().pipe(takeUntil(this._componentDestroyed$)).subscribe((userLoggedIn : boolean) : void => {
      this.userLoggedIn = userLoggedIn;
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  /**
   * Very simple "login" functionality, for now, where the first available user is loaded.
   */
  public login() : void {
    this._userService.login(this.allUsers[0]);
  }

  /**
   * Opens the `About` dialog (sometimes called a modal) that contains information about the application.
   */
  public openAboutDialog() : void {
    const ABOUT_DIALOG_DATA : AboutDialogData = {
      aboutDialogTitle : this.aboutDialogTitle,
      applicationTitle : this.applicationTitle
    };

    const ABOUT_DIALOG_CONFIG : MatDialogConfig = {
      disableClose : true,
      role : 'dialog',
      panelClass : 'pf-dialog',
      data : ABOUT_DIALOG_DATA
    };

    const ABOUT_DIALOG_REF : MatDialogRef<AboutDialogComponent> = this.dialog.open(AboutDialogComponent, ABOUT_DIALOG_CONFIG);

    ABOUT_DIALOG_REF.backdropClick().subscribe(() : void => {
      ABOUT_DIALOG_REF.addPanelClass('pf-shake');

      window.setTimeout(() : MatDialogRef<AboutDialogComponent> => {
        return ABOUT_DIALOG_REF.removePanelClass('pf-shake');
      }, ConfigService.internalAppConfiguration.constants.genericAnimationDurationMS);
    });
  }

  /**
   * Sets the application theme using the Theme Service.
   *
   * @see ThemeService
   *
   * @param themeBundleName - The themeBundleName of the theme to set from one of the available defined in the `ThemeBundle` enumeration
   */
  public setApplicationTheme(themeBundleName : ThemeBundle) : void {
    this._themeService.loadClientTheme(themeBundleName);
  }
}
