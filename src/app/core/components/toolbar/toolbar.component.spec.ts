/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TestBed } from '@angular/core/testing';

import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

import { AvailableStyleBundles, ThemeService } from '@core/services/theme/theme.service';

describe('ToolbarComponent', () : void => {
  let toolbarComponent : ToolbarComponent;

  let matIconRegistry : MatIconRegistry;
  let domSanitizer : DomSanitizer;
  let themeService : ThemeService;
  let titleService : Title;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      providers : [ThemeService, Title]
    });

    matIconRegistry = TestBed.inject(MatIconRegistry);
    domSanitizer = TestBed.inject(DomSanitizer);
    themeService = TestBed.inject(ThemeService);
    titleService = TestBed.inject(Title);

    toolbarComponent = new ToolbarComponent(matIconRegistry, domSanitizer, themeService, titleService);
  });

  it('should initialize variables and register the GitHub icon with the MatIconRegistry.', () : void => {
    expect(toolbarComponent).toBeTruthy();

    expect(toolbarComponent.applicationTitle).toBeDefined();
    expect(toolbarComponent.availableThemes).toBeDefined();
    expect(toolbarComponent.gitHubURL).toBeDefined();
  });

  describe('setApplicationTheme()', () : void => {
    it('should use the ThemeService to set the material theme application-wide.', () : void => {
      const ACTIVE_THEME_CHOICE : AvailableStyleBundles = themeService.getActiveThemeBundleName();
      const NEW_THEME_CHOICE : AvailableStyleBundles = AvailableStyleBundles.IndigoPink;

      expect(toolbarComponent.themeBundleNameIsActive(ACTIVE_THEME_CHOICE)).toBe(true);
      expect(toolbarComponent.themeBundleNameIsActive(NEW_THEME_CHOICE)).toBe(false);

      toolbarComponent.setApplicationTheme(NEW_THEME_CHOICE);

      expect(toolbarComponent.themeBundleNameIsActive(ACTIVE_THEME_CHOICE)).toBe(false);
      expect(toolbarComponent.themeBundleNameIsActive(NEW_THEME_CHOICE)).toBe(true);
    });
  });

  describe('themeBundleNameIsActive()', () : void => {
    it('should return true if the provided theme bundle name is currently active application-wide.', () : void => {
      expect(toolbarComponent.themeBundleNameIsActive(AvailableStyleBundles.DeepPurpleAmber)).toBe(true);
    });

    it('should return false if the provided theme bundle name is not currently active application-wide.', () : void => {
      expect(toolbarComponent.themeBundleNameIsActive(AvailableStyleBundles.IndigoPink)).toBe(false);
    });
  });
});
