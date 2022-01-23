/******************************************************************************************************************************************************************************
 * This component serves as the core, or root, component. It is always present and forms the main application view.
 *
 * {@link https://angular.io/guide/architecture#components | Angular Component Guide}
 *****************************************************************************************************************************************************************************/

/* eslint-disable @typescript-eslint/no-floating-promises */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';

import { ReplaySubject, distinctUntilChanged, takeUntil } from 'rxjs';

import { AppRoute } from 'app/app-routing.module';

import { ALL_THEMES, Theme, ThemeBundle } from '@core/services/theme/theme.model';
import { DEFAULT_MAT_DIALOG_CONFIG } from '@core/services/config/config.model';
import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';
import { SpinnerService } from '@core/services/spinner/spinner.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { UserService } from '@core/services/user/user.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-root',
  styleUrls : ['app.component.scss'],
  templateUrl : 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') public drawer : MatDrawer | undefined = undefined;

  public activeTheme : ThemeBundle = ThemeBundle.DeepPurpleAmber;
  public currentUser : User | null = null;
  public isLoading : boolean = false;

  public readonly allThemes : Theme[] = ALL_THEMES;
  public readonly AppRoute = AppRoute;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(
    private readonly _changeDetectorRef : ChangeDetectorRef,
    private readonly _dialog : MatDialog,
    private readonly _spinnerService : SpinnerService,
    private readonly _themeService : ThemeService,
    private readonly _userService : UserService
  ) {
    this._spinnerService.isLoading$.pipe(distinctUntilChanged()).subscribe({
      next : (isLoading : boolean) : void => {
        this.isLoading = isLoading;

        this._changeDetectorRef.markForCheck();
      }
    });
  }

  public ngOnInit() : void {
    this._themeService.getActiveThemeBundleName$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (activeTheme : ThemeBundle) : void => {
        this.activeTheme = activeTheme;
        this._changeDetectorRef.detectChanges();
      }
    });

    this._userService.getCurrentUser$().pipe(takeUntil(this._componentDestroyed$)).subscribe({
      next : (currentUser : User | null) : void => {
        this.currentUser = currentUser;
        this._changeDetectorRef.detectChanges();
      }
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  /**
   * Opens the "About" dialog (modal) that contains information about the application.
   */
  public openAboutDialog() : void {
    this.drawer?.close();

    const DIALOG_REF : MatDialogRef<AboutDialogComponent> = this._dialog.open(AboutDialogComponent, DEFAULT_MAT_DIALOG_CONFIG);

    DIALOG_REF.backdropClick().subscribe(() : void => {
      DIALOG_REF.addPanelClass('pf-shake');

      window.setTimeout(() : MatDialogRef<AboutDialogComponent> => {
        return DIALOG_REF.removePanelClass('pf-shake');
      }, ConfigService.appConfiguration.constants.genericAnimationDurationMS);
    });
  }

  /**
   * Opens the navigation sidenav that contains the toolbar's information condensed into a mobile-friendly list.
   */
  public openSidenav() : void {
    this.drawer?.open();
  }

  /**
   * Sets the application theme using the ThemeService.
   *
   * @param themeBundleName - The themeBundleName of the theme to set from one of the available defined in the "ThemeBundle" enumeration
   */
  public setApplicationTheme(themeBundleName : ThemeBundle) : void {
    this._themeService.loadClientTheme(themeBundleName);
  }
}
