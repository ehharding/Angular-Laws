/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { ThemeBundles } from '@core/services/theme/theme.configuration';
import { ThemeService } from '@core/services/theme/theme.service';

import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

import { of } from 'rxjs';

describe('ToolbarComponent', () : void => {
  let toolbarComponent : ToolbarComponent;
  let themeService : ThemeService;
  let titleService : Title;

  const DEFAULT_ACTIVE_THEME : ThemeBundles = ThemeBundles.DeepPurpleAmber;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      providers : [{ provide : ThemeService, useClass : ThemeService }, { provide : Title, useClass : Title }]
    });

    themeService = TestBed.inject(ThemeService);
    titleService = TestBed.inject(Title);

    spyOn(themeService, 'getActiveThemeBundleName').and.returnValue(of(DEFAULT_ACTIVE_THEME));

    toolbarComponent = new ToolbarComponent(themeService, titleService);
    toolbarComponent.ngOnInit();
  });

  it('should initialize variables.', () : void => {
    expect(toolbarComponent).toBeTruthy();

    expect(toolbarComponent.applicationTitle).toBeDefined();
    expect(toolbarComponent.availableThemes).toBeDefined();
    expect(toolbarComponent.gitHubURL).toBeDefined();
    expect(toolbarComponent.activeTheme).toBe(DEFAULT_ACTIVE_THEME);
  });

  describe('setApplicationTheme()', () : void => {
    it('should call ThemeService.loadClientTheme().', () : void => {
      const THEME_TO_LOAD : ThemeBundles = ThemeBundles.PinkBlueGrey;
      spyOn(themeService, 'loadClientTheme');

      toolbarComponent.setApplicationTheme(THEME_TO_LOAD);
      expect(themeService.loadClientTheme).toHaveBeenCalledWith(THEME_TO_LOAD);
    });
  });
});
