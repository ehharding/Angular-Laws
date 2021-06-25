import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Title } from '@angular/platform-browser';

import { of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';

import { AVAILABLE_THEMES, ThemeBundles } from '@core/services/theme/theme.model';
import { DEFAULT_APP_CONFIGURATION } from '@core/services/config/config.model';

import { ThemeService } from '@core/services/theme/theme.service';

import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

describe('ToolbarComponent', () : void => {
  let toolbarComponent : ToolbarComponent;
  let fixture : ComponentFixture<ToolbarComponent>;

  const DEFAULT_THEME : ThemeBundles = AVAILABLE_THEMES[0].bundleName;
  const MOCK_APPLICATION_TITLE : string = 'Application Title';

  const MOCK_MAT_DIALOG : any = jasmine.createSpyObj('MatDialog', ['open']);
  const MOCK_MAT_DIALOG_REF : any = jasmine.createSpyObj('MatDialogRef', ['addPanelClass', 'removePanelClass', 'backdropClick']);
  const MOCK_TITLE_SERVICE : any = jasmine.createSpyObj('Title', ['getTitle']);
  const MOCK_THEME_SERVICE : any = jasmine.createSpyObj('ThemeService', ['getActiveThemeBundleName', 'loadClientTheme']);

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [ToolbarComponent],
      imports : [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,
        ScrollingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers : [
        { provide : MatDialog, useValue : MOCK_MAT_DIALOG },
        { provide : MatDialogRef, useValue : MOCK_MAT_DIALOG_REF },
        { provide : Title, useValue : MOCK_TITLE_SERVICE },
        { provide : ThemeService, useValue : MOCK_THEME_SERVICE }
      ]
    }).compileComponents(); // Compile Template And CSS
  }));

  // Synchronous beforeEach()
  beforeEach(() : void => {
    fixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = fixture.componentInstance;

    MOCK_THEME_SERVICE.getActiveThemeBundleName.and.returnValue(of(DEFAULT_THEME));
    MOCK_TITLE_SERVICE.getTitle.and.returnValue(MOCK_APPLICATION_TITLE);

    expect(toolbarComponent.aboutDialogTitle).toBeDefined();
    expect(toolbarComponent.applicationTitle).toBeDefined();

    expect(toolbarComponent.availableThemes).toEqual(AVAILABLE_THEMES);
    expect(toolbarComponent.activeTheme).toEqual(ThemeBundles.DeepPurpleAmber);
  });

  it('should be created', () : void => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('lifecycle hook ngOnInit()', () : void => {
    it('should execute component initialization instructions', () : void => {
      fixture.detectChanges();
      expect(toolbarComponent.applicationTitle).toEqual(MOCK_APPLICATION_TITLE);
      expect(toolbarComponent.activeTheme).toEqual(DEFAULT_THEME);
    });
  });

  describe('lifecycle hook ngOnDestroy()', () : void => {
    it('should execute component destruction instructions', () : void => {
      fixture.detectChanges();

      spyOn(toolbarComponent['_componentDestroyed$'], 'next');
      spyOn(toolbarComponent['_componentDestroyed$'], 'complete');

      fixture.destroy();
      expect(toolbarComponent['_componentDestroyed$'].next).toHaveBeenCalledWith(true);
      expect(toolbarComponent['_componentDestroyed$'].complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('function openAboutDialog()', () : void => {
    it('should open the about dialog with the expected parameters and handle backdrop click behavior correctly', fakeAsync(() : void => {
      fixture.detectChanges();

      MOCK_MAT_DIALOG.open.and.returnValue(MOCK_MAT_DIALOG_REF);
      MOCK_MAT_DIALOG_REF.backdropClick.and.returnValue(of({ } as any)); // Simulate One Backdrop Click

      toolbarComponent.openAboutDialog();
      expect(MOCK_MAT_DIALOG.open).toHaveBeenCalledTimes(1);

      expect(MOCK_MAT_DIALOG_REF.addPanelClass).toHaveBeenCalledTimes(1);

      tick(DEFAULT_APP_CONFIGURATION.constants.genericAnimationDurationMS);
      expect(MOCK_MAT_DIALOG_REF.removePanelClass).toHaveBeenCalledTimes(1);
    }));
  });

  describe('function setApplicationTheme()', () : void => {
    it('should make a call to set the theme for the application', () : void => {
      fixture.detectChanges();

      const DESIRED_THEME : ThemeBundles = ThemeBundles.IndigoPink;

      toolbarComponent.setApplicationTheme(DESIRED_THEME);
      expect(MOCK_THEME_SERVICE.loadClientTheme).toHaveBeenCalledWith(DESIRED_THEME);
    });
  });
});
