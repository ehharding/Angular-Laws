/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This component is always visible and is the starting point for the whole application to the user.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ThemeBundles, ThemeCSSClassNames } from '@core/services/theme/theme.configuration';
import { ThemeService } from '@core/services/theme/theme.service';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'iv-internet',
  styleUrls : ['internet.component.scss'],
  templateUrl : 'internet.component.html'
})
export class InternetComponent implements OnInit, OnDestroy {
  private readonly _componentDestroyed$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public constructor(private readonly _themeService : ThemeService) { }

  public ngOnInit() : void {
    this._themeService.getActiveThemeBundleName().pipe(takeUntil(this._componentDestroyed$)).subscribe((activeTheme : ThemeBundles) : void => {
      // We'll set the background-color of <header> elements to the primary theme color
      const HEADER_TAG : keyof HTMLElementTagNameMap = 'header';

      switch (activeTheme) {
        case ThemeBundles.DeepPurpleAmber :
          this._themeService.assignCSSClassesToTag([ThemeCSSClassNames.DeepPurpleAmber], HEADER_TAG, true);
          break;
        case ThemeBundles.IndigoPink :
          this._themeService.assignCSSClassesToTag([ThemeCSSClassNames.IndigoPink], HEADER_TAG, true);
          break;
        case ThemeBundles.PinkBlueGrey :
          this._themeService.assignCSSClassesToTag([ThemeCSSClassNames.PinkBlueGrey], HEADER_TAG, true);
          break;
        case ThemeBundles.PurpleGreen :
          this._themeService.assignCSSClassesToTag([ThemeCSSClassNames.PurpleGreen], HEADER_TAG, true);
          break;
        default :
          break;
      }
    });
  }

  public ngOnDestroy() : void {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }
}
