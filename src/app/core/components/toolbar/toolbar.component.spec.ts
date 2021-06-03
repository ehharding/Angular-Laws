/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CoreModule } from '@core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
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

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      imports : [CoreModule, RouterTestingModule],
      providers : [MatDialog, Title, ThemeService]
    }).compileComponents(); // Compile Template And CSS
  }));

  it('should create', () : void => {
    expect(fixture.componentInstance).toBeDefined();
  });

  // Synchronous beforeEach()
  beforeEach(() : void => {
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
    it('should execute component initialization instructions and check for basic DOM structure', () : void => {
      expect(toolbarComponent.applicationTitle).toEqual(MOCK_APPLICATION_TITLE);
      expect(toolbarComponent.activeTheme).toEqual(DEFAULT_THEME);

      // We Expect The First <button></button> Element To Be The `Home Page` Button (Which Also Includes A Material Icon)
      expect(fixture.nativeElement.querySelector('button[aria-label="Home Page Button"]').textContent.includes(toolbarComponent.applicationTitle)).toBe(true);
      // We Expect The Second <button></button> Element To Be The `Contributors` Page Button
      expect(fixture.nativeElement.querySelector('button[aria-label="Contributors Page Button"]').textContent).toEqual('Contributors');
      // We Expect The Third <button></button Element To Be The `Theme Selection` Button (Which Includes A Paint Palette Material Icon)
      expect(fixture.nativeElement.querySelector('button[aria-label="Theme Selection Button"]').textContent).toEqual('palette');
      // We Expect The Fourth <button></button Element To Be The `Help` Button (Which Includes A Help Material Icon)
      expect(fixture.nativeElement.querySelector('button[aria-label="Help Menu Button"]').textContent).toEqual('help');
      // We Expect The Fifth And Final <button></button Element To Be The `GitHub Repository` Button (Which Includes An SVG Image Logo)
      expect(fixture.nativeElement.querySelector('button[aria-label="GitHub Repository Button"]').textContent.includes('GitHub')).toBe(true);
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
        maxWidth : '1500px',
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
