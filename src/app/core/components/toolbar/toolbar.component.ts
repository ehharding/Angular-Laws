/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This component is always visible and sits at the top of the application, across the entire screen.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Theme, ThemeService } from '@core/services/theme/theme.service';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'iv-toolbar',
  styleUrls : ['toolbar.component.scss'],
  templateUrl : 'toolbar.component.html'
})
export class ToolbarComponent {
  public readonly availableThemes : Theme[] = this._themeService.getAvailableThemes();
  public readonly applicationTitle : string = this._titleService.getTitle();
  public readonly gitHubURL : string = 'https://github.com/ehharding/Internet-Visualizer';

  public constructor(
    private readonly _matIconRegistry : MatIconRegistry,
    private readonly _domSanitizer : DomSanitizer,
    private readonly _themeService : ThemeService,
    private readonly _titleService : Title
  ) {
    this._matIconRegistry.addSvgIcon('github', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/github-logo.svg'));
  }

  /**
   * Sets the application theme using the Theme Service.
   *
   * @param bundleName - The bundleName of the theme to set
   *
   * @see ThemeService
   */
  public setApplicationTheme(bundleName : string) : void {
    this._themeService.loadClientTheme(bundleName);
  }

  /**
   * Determines if a given theme bundleName is the same as the bundleName for the currently active theme.
   *
   * @param bundleName - The bundleName of a certain theme to compare to the currently active theme bundleName
   * @returns true if the provided bundleName is equal to the currently active theme bundleName and false otherwise
   */
  public themeBundleNameIsActive(bundleName : string) : boolean {
    return bundleName === this._themeService.getActiveThemeBundleName();
  }
}
