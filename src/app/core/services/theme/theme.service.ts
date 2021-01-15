/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This service keeps the state of the theme being used for the application. It loads style sheet themes provided by Angular Material.
 *
 * {@link https://material.angular.io | Angular Material}
 *
 * @remarks There are currently four material themes available to the user:
 *   1) Deep Purple & Amber
 *   2) Indigo & Pink
 *   3) Pink & Blue Grey
 *   4) Purple & Green
 ****************************************************************************************************************************************************/

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum AvailableStyleBundles {
  DeepPurpleAmber = 'deeppurple-amber',
  IndigoPink = 'indigo-pink',
  PinkBlueGrey = 'pink-bluegrey',
  PurpleGreen = 'purple-green'
}

export interface Theme {
  bundleName : AvailableStyleBundles;
  labelName : string;
  backgroundColor : string;
  buttonColor : string;
  headerColor : string;
}

export const AVAILABLE_THEMES : Theme[] = [
  { bundleName : AvailableStyleBundles.DeepPurpleAmber, labelName : 'Deep Purple & Amber', backgroundColor : '#FFFFFF', buttonColor : '#FFC107', headerColor : '#673AB7' },
  { bundleName : AvailableStyleBundles.IndigoPink, labelName : 'Indigo & Pink', backgroundColor : '#FFFFFF', buttonColor : '#FF4081', headerColor : '#3F51B5' },
  { bundleName : AvailableStyleBundles.PinkBlueGrey, labelName : 'Pink & Blue Grey', backgroundColor : '#303030', buttonColor : '#607D8B', headerColor : '#E91E63' },
  { bundleName : AvailableStyleBundles.PurpleGreen, labelName : 'Purple & Green', backgroundColor : '#303030', buttonColor : '#4CAF50', headerColor : '#9C27B0' }
];

@Injectable({ providedIn : 'root' })
export class ThemeService {
  private _activeThemeBundleName : AvailableStyleBundles | undefined;

  public constructor(@Inject(DOCUMENT) private readonly _document : Document) {
    this.loadClientTheme(AVAILABLE_THEMES[0].bundleName);
  }

  /**
   * Gets the currently active application theme bundleName.
   *
   * @returns the bundleName of the currently active application theme
   */
  public getActiveThemeBundleName() : AvailableStyleBundles {
    return this._activeThemeBundleName as AvailableStyleBundles;
  }

  /**
   * This method loads a style name that exists in the Themes enumeration, injecting the requested theme into the index.html as a <link />. This
   * allows for simple style switching at runtime.
   *
   * @param themeBundleName - A theme bundleName from one of the available application themes defined in the AvailableStyleBundles enumeration
   */
  public loadClientTheme(themeBundleName : AvailableStyleBundles) : void {
    const HTML_LINK_ELEMENT_ID : string = 'client-theme';
    const HTML_LINK_ELEMENT : HTMLElement | null = this._document.getElementById(HTML_LINK_ELEMENT_ID);
    const THEME_STYLES : string = `assets/themes/${ themeBundleName }.css`;

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
      window.onload = () : void => {
        this._document.head.appendChild(LINK_ELEMENT);
      };
    }

    this._activeThemeBundleName = themeBundleName;
  }
}
