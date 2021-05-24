/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Title } from '@angular/platform-browser';

import { AVAILABLE_THEMES, ThemeBundles } from '@core/services/theme/theme.configuration';
import { ThemeService } from '@core/services/theme/theme.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';
import { AboutDialogConfigData } from '@core/components/toolbar/about-dialog/about-dialog.model';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

import { of } from 'rxjs';

describe('ToolbarComponent', () : void => {
  let toolbarComponent : ToolbarComponent;
  let fixture : ComponentFixture<ToolbarComponent>;

  let dialog : MatDialog;
  let themeService : ThemeService;
  let titleService : Title;

  const DEFAULT_THEME : ThemeBundles = AVAILABLE_THEMES[0].bundleName;
  const MOCK_APPLICATION_TITLE : string = 'Application Title';

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      imports : [MatDialogModule, MatMenuModule]
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = fixture.componentInstance;

    dialog = TestBed.inject(MatDialog);
    themeService = TestBed.inject(ThemeService);
    titleService = TestBed.inject(Title);

    spyOn(themeService, 'getActiveThemeBundleName').and.returnValue(of(DEFAULT_THEME));
    spyOn(titleService, 'getTitle').and.returnValue(MOCK_APPLICATION_TITLE);

    expect(toolbarComponent.aboutDialogTitle).toEqual('About The Application');
    expect(toolbarComponent.applicationTitle).toEqual('');
    expect(toolbarComponent.availableThemes).toEqual(AVAILABLE_THEMES);
    expect(toolbarComponent.activeTheme).toBeUndefined();

    fixture.detectChanges();
  });

  describe('ngOnInit()', () : void => {
    it('should execute component initialization instructions', () : void => {
      expect(toolbarComponent.applicationTitle).toEqual(MOCK_APPLICATION_TITLE);
      expect(toolbarComponent.activeTheme).toEqual(DEFAULT_THEME);
    });
  });

  describe('ngOnDestroy()', () : void => {
    it('should execute component destruction instructions', () : void => {
      spyOn(toolbarComponent['_componentDestroyed$'], 'next');
      spyOn(toolbarComponent['_componentDestroyed$'], 'complete');

      toolbarComponent.ngOnDestroy();
      expect(toolbarComponent['_componentDestroyed$'].next).toHaveBeenCalledWith(true);
      expect(toolbarComponent['_componentDestroyed$'].complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('openAboutDialog()', () : void => {
    it('should open the about dialog with the expected parameters', () : void => {
      const EXPECTED_DIALOG_CONFIG_DATA : AboutDialogConfigData = {
        aboutDialogTitle : toolbarComponent.aboutDialogTitle,
        applicationTitle : MOCK_APPLICATION_TITLE
      };

      const EXPECTED_ABOUT_DIALOG_CONFIG : MatDialogConfig = {
        disableClose : true,
        ariaLabel : 'About Dialog',
        role : 'dialog',
        panelClass : 'pf-dialog',
        maxHeight : '80vh',
        maxWidth : '1200px',
        width : '50%',
        data : EXPECTED_DIALOG_CONFIG_DATA
      };

      spyOn(dialog, 'open');

      toolbarComponent.openAboutDialog();
      expect(dialog.open).toHaveBeenCalledWith(AboutDialogComponent, EXPECTED_ABOUT_DIALOG_CONFIG);
    });
  });

  describe('setApplicationTheme()', () : void => {
    it('should make a call to set the theme for the application', () : void => {
      const DESIRED_THEME : ThemeBundles = ThemeBundles.IndigoPink;

      spyOn(themeService, 'loadClientTheme');

      toolbarComponent.setApplicationTheme(DESIRED_THEME);
      expect(themeService.loadClientTheme).toHaveBeenCalledWith(DESIRED_THEME);
    });
  });
});
