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

import { AVAILABLE_THEMES, ThemeBundles } from '@core/services/theme/theme.configuration';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn : 'root' })
export class ThemeService {
  private readonly _activeThemeBundleName$ : BehaviorSubject<ThemeBundles> = new BehaviorSubject<ThemeBundles>(AVAILABLE_THEMES[0].bundleName);

  public constructor(@Inject(DOCUMENT) private readonly _document : Document) {
    this.loadClientTheme(AVAILABLE_THEMES[0].bundleName); // Load The First Theme By Default
  }

  /**
   * Provides an Observable for the currently active application theme to interested subscribers.
   *
   * @returns a stream for the bundleName of the currently active application theme
   */
  public getActiveThemeBundleName() : Observable<ThemeBundles> {
    return this._activeThemeBundleName$.asObservable();
  }

  /**
   * This method assigns the provided CSS class names to the element specified by elementID. Use this if you are wanting to achieve some kind of
   * programmatic styling effect on a particular HTML element. The element ID here is referring to the ID set by using <input id="foo"/>, as an
   * example.
   *
   * @param cssClassList - A list of CSS class names to assign to an existing HTML element
   * @param elementID - The unique HTML ID of the element you would like to apply CSS classes to
   */
  public assignCSSClassesToID(cssClassList : readonly string[], elementID : string) : void {
    const HTML_ELEMENT : HTMLElement | null = this._document.getElementById(elementID);

    // If The Element Already Exists, We Set Its `class` Attribute To The List Of Provided CSS Class Names
    if (HTML_ELEMENT) {
      HTML_ELEMENT.setAttribute('class', cssClassList.join(' '));
      // Otherwise, If The Element Does Not Exist, We'll Throw An Error Since That Essentially Means Programmer Mistake
    } else {
      throw new ReferenceError(`The HTML ID '${ elementID }' Does Not Exist In The DOM.`);
    }
  }

  /**
   * This method assigns the provided CSS class names to the element specified by tagName. Use this if you are wanting to achieve some kind of
   * programmatic styling effect on an entire tag name. For example, this is used to set the `background` attribute of <body></body>, depending
   * on the current application theme.
   *
   * @param cssClassList - A list of CSS class names to assign to an existing HTML element
   * @param tagName - The qualified HTML tag name that you would like to apply CSS classes to
   */
  public assignCSSClassesToTag(cssClassList : readonly string[], tagName : keyof HTMLElementTagNameMap) : void {
    const HTML_ELEMENT : HTMLElement | null = this._document.querySelector(tagName);

    // If The Element Already Exists, We Set Its `class` Attribute To The List Of Provided CSS Class Names
    if (HTML_ELEMENT) {
        HTML_ELEMENT.setAttribute('class', cssClassList.join(' '));
      // Otherwise, If The Element Does Not Exist, We'll Throw An Error Since That Essentially Means Programmer Mistake
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

    // If The <link/> Element Already Exists, We Simply Modify Its `href` Attribute
    if (HTML_LINK_ELEMENT) {
      (HTML_LINK_ELEMENT as HTMLLinkElement).setAttribute('href', THEME_STYLES);
      // Otherwise, If We're In Startup, We Create It With All The Necessary Attribute Settings
    } else {
      const LINK_ELEMENT : HTMLLinkElement = this._document.createElement('link');
      LINK_ELEMENT.setAttribute('href', THEME_STYLES);
      LINK_ELEMENT.setAttribute('id', HTML_LINK_ELEMENT_ID);
      LINK_ELEMENT.setAttribute('rel', 'stylesheet');
      LINK_ELEMENT.setAttribute('type', 'text/css');

      // eslint-disable-next-line max-len
      // This Adds <link href="FanFiction.com/assets/themes/foo.css" id="client-theme" rel="stylesheet" type="text/css"/> To index.html's <head></head> Section
      window.onload = () : void => {
        this._document.head.appendChild(LINK_ELEMENT);
      };
    }

    this._activeThemeBundleName$.next(themeBundleName);

    // We'll Set The `background` Attribute Of <body></body> To `ff-bg-white` For Two Themes And `ff-bg-grey` For The Other Two
    const BODY_TAG : keyof HTMLElementTagNameMap = 'body';

    if (themeBundleName === ThemeBundles.DeepPurpleAmber || themeBundleName === ThemeBundles.IndigoPink) {
      this.assignCSSClassesToTag(['ff-bg-white'], BODY_TAG);
    } else {
      this.assignCSSClassesToTag(['ff-bg-grey'], BODY_TAG);
    }
  }
}
