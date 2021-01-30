/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This service holds the currently active application theme and provides functionality for loading four pre-built Angular Material themes and also
 * provides logic for assigning an arbitrary CSS class to an HTML tag.
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

import { AVAILABLE_THEMES, ThemeBundles, ThemeCSSClassNames } from '@core/services/theme/theme.configuration';

import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class ThemeService {
  private readonly _activeThemeBundleName : ReplaySubject<ThemeBundles> = new ReplaySubject<ThemeBundles>();

  public constructor(@Inject(DOCUMENT) private readonly _document : Document) {
    this.loadClientTheme(AVAILABLE_THEMES[0].bundleName);
  }

  /**
   * Provides an Observable for the currently active application theme to interested subscribers.
   *
   * @returns a stream for the bundleName of the currently active application theme
   */
  public getActiveThemeBundleName() : Observable<ThemeBundles> {
    return this._activeThemeBundleName.asObservable();
  }

  /**
   * This method assigns the provided CSS class names to the element specified by tagName.
   *
   * @param cssClassList - A list of CSS class names to assign to an existing HTML element
   * @param tagName - The qualified HTML tag name that you would like to apply CSS classes to
   * @param themeMode - If true, core material theme CSS classes are removed before new classes are applied
   */
  public assignCSSClassesToTag(cssClassList : readonly string[], tagName : keyof HTMLElementTagNameMap, themeMode : boolean = false) : void {
    const HTML_ELEMENT : HTMLElement | null = this._document.querySelector(tagName);

    // If the element already exists, we set its class attribute to the list of provided CSS class names
    if (HTML_ELEMENT) {
      if (themeMode) {
        // First, we must remove any existing core theme styles
        const FILTERED_EXISTING_STYLES : string[] = HTML_ELEMENT.className.split(' ').filter((styleName : string) => {
          return !(styleName === ThemeCSSClassNames.DeepPurpleAmber ||
                   styleName === ThemeCSSClassNames.IndigoPink ||
                   styleName === ThemeCSSClassNames.PinkBlueGrey ||
                   styleName === ThemeCSSClassNames.PurpleGreen);
        });

        // Then, we'll combine the style lists and apply it to the element
        HTML_ELEMENT.setAttribute('class', FILTERED_EXISTING_STYLES.concat(cssClassList).join(' '));
      } else {
        HTML_ELEMENT.setAttribute('class', cssClassList.join(' '));
      }
      // Otherwise, if the element does not exist, we'll throw an error since that essentially means programmer mistake
    } else {
      throw new ReferenceError(`The HTML Tag '${ tagName }' Does Not Exist In The DOM.`);
    }
  }

  /**
   * This method loads a style name that exists in the ThemeBundles enumeration, injecting the requested theme into the index.html as a <link/>. This
   * allows for simple style switching at runtime.
   *
   * @param themeBundleName - A theme bundleName from one of the available application themes defined in the ThemeBundles enumeration
   */
  public loadClientTheme(themeBundleName : ThemeBundles) : void {
    const HTML_LINK_ELEMENT_ID : string = 'client-theme';
    const HTML_LINK_ELEMENT : HTMLElement | null = this._document.getElementById(HTML_LINK_ELEMENT_ID);
    const THEME_STYLES : string = `assets/themes/${ themeBundleName }.css`;

    // If the <link/> element already exists, we simply modify its "href" attribute
    if (HTML_LINK_ELEMENT) {
      (HTML_LINK_ELEMENT as HTMLLinkElement).setAttribute('href', THEME_STYLES);
      // Otherwise, if we're in startup, we create it with all the necessary attribute settings
    } else {
      const LINK_ELEMENT : HTMLLinkElement = this._document.createElement('link');
      LINK_ELEMENT.setAttribute('href', THEME_STYLES);
      LINK_ELEMENT.setAttribute('id', HTML_LINK_ELEMENT_ID);
      LINK_ELEMENT.setAttribute('rel', 'stylesheet');
      LINK_ELEMENT.setAttribute('type', 'text/css');

      // This adds <link href="assets/themes/foo.css" id="client-theme" rel="stylesheet" type="text/css"/> to index.html's <head></head> section
      window.onload = () : void => {
        this._document.head.appendChild(LINK_ELEMENT);
      };
    }

    this._activeThemeBundleName.next(themeBundleName);

    // We'll set the background-color of <body></body> to iv-bg-white for two themes and iv-bg-grey for the other two
    const BODY_TAG : keyof HTMLElementTagNameMap = 'body';

    if (themeBundleName === ThemeBundles.DeepPurpleAmber || themeBundleName === ThemeBundles.IndigoPink) {
      this.assignCSSClassesToTag(['iv-bg-white'], BODY_TAG);
    } else {
      this.assignCSSClassesToTag(['iv-bg-grey'], BODY_TAG);
    }
  }
}
