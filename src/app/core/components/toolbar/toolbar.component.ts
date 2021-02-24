/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AVAILABLE_THEMES, Theme, ThemeBundles } from '@core/services/theme/theme.configuration';
import { ThemeService } from '@core/services/theme/theme.service';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'ff-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public readonly applicationTitle : string = this._titleService.getTitle();
  public readonly gitHubURL : string = 'https://github.com/ehharding/FanFiction.com';
  public readonly availableThemes : Theme[] = AVAILABLE_THEMES;

  public activeTheme : ThemeBundles | undefined;

  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _themeService : ThemeService, private readonly _titleService : Title) { }

  public ngOnInit() : void {
    this._themeService.getActiveThemeBundleName().pipe(takeUntil(this._componentDestroyed$)).subscribe((activeTheme : ThemeBundles) : void => {
      this.activeTheme = activeTheme;
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
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
