/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { ThemeService } from '@core/services/theme/theme.service';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

describe('ToolbarComponent', () : void => {
  let toolbarComponent : ToolbarComponent;

  let themeService : ThemeService;
  let titleService : Title;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      providers : [{ provide : ThemeService, useClass : ThemeService }, { provide : Title, useClass : Title }]
    });

    themeService = TestBed.inject(ThemeService);
    titleService = TestBed.inject(Title);

    toolbarComponent = new ToolbarComponent(themeService, titleService);
  });

  it('should initialize variables and register the GitHub icon with the MatIconRegistry.', () : void => {
    expect(toolbarComponent).toBeTruthy();

    expect(toolbarComponent.applicationTitle).toBeDefined();
    expect(toolbarComponent.availableThemes).toBeDefined();
    expect(toolbarComponent.gitHubURL).toBeDefined();
  });
});
