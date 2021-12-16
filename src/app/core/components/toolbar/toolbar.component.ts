import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ReplaySubject, takeUntil } from 'rxjs';

import { AppRoute } from 'app/app-routing.module';

import { ALL_THEMES, Theme, ThemeBundle } from '@core/services/theme/theme.model';
import { DEFAULT_MAT_DIALOG_CONFIG } from '@core/services/config/config.model';
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
  public activeTheme : ThemeBundle = ThemeBundle.DeepPurpleAmber;
  public currentUser : User | null = null;
  public mobileView : boolean = false;
  public showSidenav : boolean = false;

  public readonly allThemes : Theme[] = ALL_THEMES;
  public readonly AppRoute = AppRoute;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(
    private readonly _changeDetectorRef : ChangeDetectorRef,
    private readonly _dialog : MatDialog,
    private readonly _themeService : ThemeService,
    private readonly _userService : UserService
  ) { }

  /**
   * Executes certain actions whenever the window changes size. In this case, we set a flag that indicates if we should show a mobile-centric view or not.
   *
   * @param $windowResizeEvent - the resize event that triggered the function call (unless we are called when initializing)
   * @param initialize - a flag that indicates we are in startup and should set the mobile view flag after the view is initialized
   */
  @HostListener('window:resize', ['$event.target'])
  private _onResize($windowResizeEvent : typeof window, initialize : boolean = false) : void {
    if (initialize) {
      this.mobileView = window.innerWidth < ConfigService.appConfiguration.constants.mobileViewThresholdWidthPX;
    } else {
      this.mobileView = $windowResizeEvent.innerWidth < ConfigService.appConfiguration.constants.mobileViewThresholdWidthPX;
    }
  }

  public ngOnInit() : void {
    this._onResize(window, true);

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
   * Opens the "About" dialog (sometimes called a modal) that contains information about the application.
   */
  public openAboutDialog() : void {
    const DIALOG_REF : MatDialogRef<AboutDialogComponent> = this._dialog.open(AboutDialogComponent, DEFAULT_MAT_DIALOG_CONFIG);

    DIALOG_REF.backdropClick().subscribe(() : void => {
      DIALOG_REF.addPanelClass('pf-shake');

      window.setTimeout(() : MatDialogRef<AboutDialogComponent> => {
        return DIALOG_REF.removePanelClass('pf-shake');
      }, ConfigService.appConfiguration.constants.genericAnimationDurationMS);
    });
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
