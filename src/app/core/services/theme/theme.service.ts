/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This service keeps the state of the theme being used for the application. It loads style sheet themes provided by Angular Material.
 *
 * {@link https://material.angular.io | Angular Material}
 *
 * @remarks There are currently four material themes available to the user:
 *   1) Deep Purple & Amber
 *   2) Indigo Pink
 *   3) Pink Blue & Grey
 *   4) Purple Green
 ****************************************************************************************************************************************************/

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface Theme {
  bundleName : string;
  labelName : string;
  backgroundColor : string;
  buttonColor : string;
  headerColor : string;
}

@Injectable({ providedIn : 'root' })
export class ThemeService {
  private readonly _availableThemes : Theme[] = this.getAvailableThemes();
  private _activeTheme : Theme = this._availableThemes[0];

  public constructor(@Inject(DOCUMENT) private readonly _document : Document) {
    this.loadClientTheme(this._activeTheme.bundleName);
  }

  /**
   * Gets the currently active application theme.
   *
   * @returns a the currently active Theme application theme
   */
  public getActiveTheme() : Theme {
    return this._activeTheme;
  }

  /**
   * Returns a list of available Theme application themes.
   *
   * @returns a list of Theme application themes
   */
  public getAvailableThemes() : Theme[] {
    return [
      { bundleName : 'deeppurple-amber', labelName : 'Deep Purple & Amber', backgroundColor : '#FFFFFF', buttonColor : '#FFC107', headerColor : '#673AB7' },
      { bundleName : 'indigo-pink', labelName : 'Indigo & Pink', backgroundColor : '#FFFFFF', buttonColor : '#FF4081', headerColor : '#3F51B5' },
      { bundleName : 'pink-bluegrey', labelName : 'Pink & Blue Grey', backgroundColor : '#303030', buttonColor : '#607D8B', headerColor : '#E91E63' },
      { bundleName : 'purple-green', labelName : 'Purple & Green', backgroundColor : '#303030', buttonColor : '#4CAF50', headerColor : '#9C27B0' }
    ];
  }

  /**
   * This method loads a style name that exists in the Themes enumeration, injecting the requested theme into the index.html as a <link />. This
   * allows for simple style switching at runtime.
   *
   * @param themeName - A theme from one of the available application themes defined in Themes
   */
  public loadClientTheme(themeName : string) : void {
    const HTML_LINK_ELEMENT_ID : string = 'client-theme';
    const THEME_STYLES : string = `assets/themes/${ themeName }.css`;

    const HTML_LINK_ELEMENT : HTMLElement | null = this._document.getElementById(HTML_LINK_ELEMENT_ID);

    // If the <link /> element already exists, we simply modify its "href" attribute
    if (HTML_LINK_ELEMENT) {
      (HTML_LINK_ELEMENT as HTMLLinkElement).setAttribute('href', THEME_STYLES);
    // Otherwise, if we're in startup, we create it with all the necessary attribute settings
    } else {
      const LINK_ELEMENT : HTMLLinkElement = this._document.createElement('link');
      LINK_ELEMENT.setAttribute('href', THEME_STYLES);
      LINK_ELEMENT.setAttribute('id', HTML_LINK_ELEMENT_ID);
      LINK_ELEMENT.setAttribute('rel', 'stylesheet');
      LINK_ELEMENT.setAttribute('type', 'text/css');

      // This adds <link href="assets/themes/foo.css" id="client-theme" rel="stylesheet" type="text/css" /> to index.html's <head></head> section
      this._document.head.appendChild(LINK_ELEMENT);

      // We check (for safety) if the themeName specified actually matches one of our main themes and, if so, we modify the _activeTheme state
      for (const THEME of this._availableThemes) {
        if (THEME.bundleName === themeName) {
          this._activeTheme = THEME;
        }
      }
    }
  }
}
