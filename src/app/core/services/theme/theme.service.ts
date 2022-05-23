/**
 * This service holds the active application theme and provides functionality for loading four pre-built Angular Material themes and provides logic for assigning an arbitrary
 * CSS class to an HTML tag.
 *
 * {@link https://material.angular.io | Angular Material}
 *
 * @remarks There are four material themes available to the user:
 *   1) Deep Purple & Amber
 *   2) Indigo & Pink
 *   3) Pink & Blue Grey
 *   4) Purple & Green
 */

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { ALL_THEMES, ThemeBundle } from '@core/services/theme/theme.model';

import { ConfigService } from '@core/services/config/config.service';

@Injectable({ providedIn : 'root' })
export class ThemeService {
  private readonly _activeThemeBundleName$ : BehaviorSubject<ThemeBundle> = new BehaviorSubject<ThemeBundle>(ALL_THEMES[0].bundleName);

  public constructor(@Inject(DOCUMENT) private readonly _document : Document) {
    this.loadClientTheme(ALL_THEMES[0].bundleName); // Load The First Theme By Default
  }

  /**
   * Provides an Observable for the active application theme to interested subscribers.
   *
   * @returns a ThemeBundle-typed Observable stream for interested subscribers to receive the active theme bundle.
   */
  public getActiveThemeBundleName$() : Observable<ThemeBundle> {
    return this._activeThemeBundleName$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * This method assigns the provided CSS class names to the element specified by tagName. Use this if you are wanting to achieve some kind of programmatic styling effect on
   * an entire tag name. For example, this is used to set the "background" attribute of <body></body>, depending on the current application theme.
   *
   * @param cssClassList - A list of CSS class names to assign to an existing HTML element
   * @param tagName - The qualified HTML tag name that you would like to apply CSS classes to
   */
  public assignCSSClassesToTag(cssClassList : readonly string[], tagName : keyof HTMLElementTagNameMap) : void {
    const HTML_ELEMENT : HTMLElement | null = this._document.querySelector(tagName);

    // If The Element Already Exists, We Set Its "class" Attribute To The List Of Provided CSS Class Names
    if (HTML_ELEMENT) {
      HTML_ELEMENT.setAttribute('class', cssClassList.join(' '));
    // Otherwise, If The Element Does Not Exist, We'll Throw An Error Since That Essentially Means Programmer Mistake
    } else {
      throw new ReferenceError(`The HTML Tag '${ tagName }' Does Not Exist in the DOM.`);
    }
  }

  /**
   * This method loads a style name in the ThemeBundle enumeration, injecting the requested theme into the index.html as a <link/>. This allows for simple style switching at
   * runtime.
   *
   * @param themeBundleName - The themeBundleName of the theme to load from one of the available defined in the "ThemeBundle" enumeration
   */
  public loadClientTheme(themeBundleName : ThemeBundle) : void {
    const HTML_LINK_ELEMENT_ID : string = 'client-theme';
    const HTML_LINK_ELEMENT : HTMLElement | null = this._document.getElementById(HTML_LINK_ELEMENT_ID);
    const THEME_STYLES : string = `${ ConfigService.appConfiguration.apiServer.themes }/${ themeBundleName }.css`;

    // If The <link/> Element Already Exists, We Simply Modify Its "href" Attribute
    if (HTML_LINK_ELEMENT) {
      (HTML_LINK_ELEMENT as HTMLLinkElement).setAttribute('href', THEME_STYLES);
    // Otherwise, If We're In Startup, We Create It With All The Necessary Attribute Settings
    } else {
      const LINK_ELEMENT : HTMLLinkElement = this._document.createElement('link');
      LINK_ELEMENT.setAttribute('href', THEME_STYLES);
      LINK_ELEMENT.setAttribute('id', HTML_LINK_ELEMENT_ID);
      LINK_ELEMENT.setAttribute('rel', 'stylesheet');
      LINK_ELEMENT.setAttribute('type', 'text/css');

      // This Adds <link href="assets/themes/foo.css" id="client-theme" rel="stylesheet" type="text/css"/> To index.html's <head></head> Section
      this._document.head.appendChild(LINK_ELEMENT);
    }

    this._activeThemeBundleName$.next(themeBundleName);

    // We'll Set The "background" Attribute Of <body></body> To "pf-bg-white" For Two Themes And "pf-bg-grey" For The Other Two
    const BODY_TAG : keyof HTMLElementTagNameMap = 'body';

    if (themeBundleName === ThemeBundle.DeepPurpleAmber || themeBundleName === ThemeBundle.IndigoPink) {
      this.assignCSSClassesToTag(['pf-bg-white'], BODY_TAG);
    } else {
      this.assignCSSClassesToTag(['pf-bg-grey'], BODY_TAG);
    }
  }
}
