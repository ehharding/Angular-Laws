/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { AvailableStyleBundles, ThemeService } from '@core/services/theme/theme.service';

describe('ThemeService', () : void => {
  let themeService : ThemeService;

  const INITIAL_THEME : AvailableStyleBundles = AvailableStyleBundles.DeepPurpleAmber;
  let dom : Document;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      imports : [BrowserDynamicTestingModule],
      providers : [{ provide : DOCUMENT, useClass : Document }]
    });

    dom = TestBed.inject(DOCUMENT);

    themeService = new ThemeService(dom);
  });

  it('should initialize variables.', () : void => {
    expect(themeService).toBeTruthy();
    expect(themeService.getActiveThemeBundleName()).toBeDefined();
  });

  describe('loadClientTheme()', () : void => {
    it('should set the `client-theme` to deeppurple-amber initially.', () : void => {
      themeService.loadClientTheme(INITIAL_THEME);
      expect(themeService.getActiveThemeBundleName()).toBe(INITIAL_THEME);
    });

    it('should set the theme link to the provided bundle name style.', () : void => {
      const MOCK_HTML_LINK_ELEMENT : HTMLLinkElement = { href : `assets/themes/${ INITIAL_THEME }.css`, setAttribute(qualifiedName : string, value : string) : void { } } as unknown as HTMLLinkElement;
      const NEW_THEME_CHOICE : AvailableStyleBundles = AvailableStyleBundles.IndigoPink;

      spyOn(dom, 'getElementById').and.returnValue(MOCK_HTML_LINK_ELEMENT);
      spyOn(MOCK_HTML_LINK_ELEMENT, 'setAttribute');

      themeService.loadClientTheme(NEW_THEME_CHOICE);
      expect(MOCK_HTML_LINK_ELEMENT.setAttribute).toHaveBeenCalledWith('href', `assets/themes/${ NEW_THEME_CHOICE }.css`);
    });
  });
});
