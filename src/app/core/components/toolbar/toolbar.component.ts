/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { AppConfig } from 'app/app.config';

import { AVAILABLE_THEMES, Theme, ThemeBundles } from '@core/services/theme/theme.model';
import { ThemeService } from '@core/services/theme/theme.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';
import { AboutDialogConfigData } from '@core/components/toolbar/about-dialog/about-dialog.model';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public readonly aboutDialogTitle : string = 'About The Application';
  public readonly availableThemes : Theme[] = AVAILABLE_THEMES;

  public activeTheme : ThemeBundles | undefined;
  public applicationTitle : string = '';

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(public readonly dialog : MatDialog, private readonly _titleService : Title, private readonly _themeService : ThemeService) { }

  public ngOnInit() : void {
    this.applicationTitle = this._titleService.getTitle();

    this._themeService.getActiveThemeBundleName().pipe(takeUntil(this._componentDestroyed$)).subscribe((activeTheme : ThemeBundles) : void => {
      this.activeTheme = activeTheme;
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }

  /**
   * Opens the `About` dialog (sometimes called a modal) that contains information contributors the application.
   */
  public openAboutDialog() : void {
    const ABOUT_DIALOG_CONFIG_DATA : AboutDialogConfigData = {
      aboutDialogTitle : this.aboutDialogTitle,
      applicationTitle : this.applicationTitle
    };

    const ABOUT_DIALOG_CONFIG : MatDialogConfig = { // eslint-disable-line @typescript-eslint/no-explicit-any
      disableClose : true,
      role : 'dialog',
      panelClass : 'pf-dialog',
      maxHeight : '75%',
      maxWidth : '75%',
      data : ABOUT_DIALOG_CONFIG_DATA
    };

    const ABOUT_DIALOG_REF : MatDialogRef<AboutDialogComponent> = this.dialog.open(AboutDialogComponent, ABOUT_DIALOG_CONFIG);

    ABOUT_DIALOG_REF.backdropClick().subscribe(() : void => {
      ABOUT_DIALOG_REF.addPanelClass('pf-shake');
      window.setTimeout(() => ABOUT_DIALOG_REF.removePanelClass('pf-shake'), AppConfig.appConfig.constants.genericAnimationDurationMS);
    });
  }

  /**
   * Sets the application theme using the Theme Service.
   *
   * @param themeBundleName - The themeBundleName of the theme to set from one of the available defined in the ThemeBundles enumeration
   *
   * @see ThemeService
   */
  public setApplicationTheme(themeBundleName : ThemeBundles) : void {
    this._themeService.loadClientTheme(themeBundleName);
  }
}
