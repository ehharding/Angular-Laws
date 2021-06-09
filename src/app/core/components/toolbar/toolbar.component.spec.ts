/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';

import { AVAILABLE_THEMES, ThemeBundles } from '@core/services/theme/theme.model';
import { ThemeService } from '@core/services/theme/theme.service';

import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

import { Observable, of } from 'rxjs';

class MockMatDialog {
  public open() : any {
    return {
      addPanelClass() : void { },
      backdropClick : () : Observable<MouseEvent> => of({ } as any)
    };
  }
}

describe('ToolbarComponent', () : void => {
  let toolbarComponent : ToolbarComponent;
  let fixture : ComponentFixture<ToolbarComponent>;

  let matDialog : MatDialog;
  let themeService : ThemeService;
  let titleService : Title;

  const DEFAULT_THEME : ThemeBundles = AVAILABLE_THEMES[0].bundleName;
  const MOCK_APPLICATION_TITLE : string = 'Application Title';

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      imports : [BrowserAnimationsModule, CoreModule, RouterTestingModule],
      providers : [Title, ThemeService, { provide : MatDialog, useClass : MockMatDialog }]
    }).compileComponents(); // Compile Template And CSS
  }));

  it('should create', () : void => {
    expect(fixture.componentInstance).toBeDefined();
  });

  // Synchronous beforeEach()
  beforeEach(() : void => {
    fixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = fixture.componentInstance;

    matDialog = TestBed.inject(MatDialog);
    themeService = TestBed.inject(ThemeService);
    titleService = TestBed.inject(Title);

    spyOn(themeService, 'getActiveThemeBundleName').and.returnValue(of(DEFAULT_THEME));
    spyOn(titleService, 'getTitle').and.returnValue(MOCK_APPLICATION_TITLE);

    expect(toolbarComponent.aboutDialogTitle).toEqual('About The Application');
    expect(toolbarComponent.applicationTitle).toEqual('');
    expect(toolbarComponent.availableThemes).toEqual(AVAILABLE_THEMES);
    expect(toolbarComponent.activeTheme).toBeUndefined();
  });

  describe('ngOnInit()', () : void => {
    it('should execute component initialization instructions', () : void => {
      fixture.detectChanges();
      expect(toolbarComponent.applicationTitle).toEqual(MOCK_APPLICATION_TITLE);
      expect(toolbarComponent.activeTheme).toEqual(DEFAULT_THEME);
    });
  });

  describe('ngOnDestroy()', () : void => {
    it('should execute component destruction instructions', () : void => {
      fixture.detectChanges();

      spyOn(toolbarComponent['_componentDestroyed$'], 'next');
      spyOn(toolbarComponent['_componentDestroyed$'], 'complete');

      fixture.destroy();
      expect(toolbarComponent['_componentDestroyed$'].next).toHaveBeenCalledWith(true);
      expect(toolbarComponent['_componentDestroyed$'].complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('openAboutDialog()', () : void => {
    it('should open the about dialog with the expected parameters', () : void => {
      fixture.detectChanges();

      spyOn(matDialog, 'open').and.callThrough();

      toolbarComponent.openAboutDialog();
      expect(matDialog.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('setApplicationTheme()', () : void => {
    it('should make a call to set the theme for the application', () : void => {
      fixture.detectChanges();

      const DESIRED_THEME : ThemeBundles = ThemeBundles.IndigoPink;

      spyOn(themeService, 'loadClientTheme');

      toolbarComponent.setApplicationTheme(DESIRED_THEME);
      expect(themeService.loadClientTheme).toHaveBeenCalledWith(DESIRED_THEME);
    });
  });
});
