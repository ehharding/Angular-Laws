import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';

import { AboutDialogData, OPEN_SOURCE_DEPENDENCIES, PACKAGE_VERSIONS } from '@core/components/toolbar/about-dialog/about-dialog.model';
import { APP_CONSTANTS } from '@core/services/config/config.model';
import packageJSON from 'app/../../package.json';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';

describe('AboutDialogComponent', () : void => {
  let aboutDialogComponent : AboutDialogComponent;
  let fixture : ComponentFixture<AboutDialogComponent>;

  let setCurrentTimeIntervalSpy : jasmine.Spy;

  const MOCK_ABOUT_DIALOG_DATA : AboutDialogData = {
    aboutDialogTitle : 'Dialog Title',
    applicationTitle : 'Application Title'
  };

  const MOCK_INTERVAL_ID : number = 1;

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [AboutDialogComponent],
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
      providers : [{ provide : MAT_DIALOG_DATA, useValue : MOCK_ABOUT_DIALOG_DATA }]
    }).compileComponents(); // Compile Template And CSS
  }));

  // Synchronous beforeEach()
  beforeEach(() : void => {
    fixture = TestBed.createComponent(AboutDialogComponent);
    aboutDialogComponent = fixture.componentInstance;

    setCurrentTimeIntervalSpy = spyOn(aboutDialogComponent, 'setCurrentTimeInterval').and.returnValue(MOCK_INTERVAL_ID);

    expect(aboutDialogComponent.currentTime).toBeDefined();

    expect(aboutDialogComponent.applicationTitle).toEqual(MOCK_ABOUT_DIALOG_DATA.applicationTitle);
    expect(aboutDialogComponent.dialogTitle).toEqual(MOCK_ABOUT_DIALOG_DATA.aboutDialogTitle);

    expect(aboutDialogComponent.applicationVersion).toEqual(packageJSON.version);
    expect(aboutDialogComponent.openSourceDependencies).toEqual(OPEN_SOURCE_DEPENDENCIES);
    expect(aboutDialogComponent.packageVersions).toEqual(PACKAGE_VERSIONS);

    expect(aboutDialogComponent['_currentTimeIntervalID']).toBeUndefined();
  });

  it('should be created', () : void => {
    expect(fixture.componentInstance).toBeDefined();
  });

  describe('lifecycle hook ngOnInit()', () : void => {
    it('should execute component initialization instructions', () : void => {
      fixture.detectChanges();
      expect(aboutDialogComponent['_currentTimeIntervalID']).toEqual(MOCK_INTERVAL_ID);
    });
  });

  describe('lifecycle hook ngOnDestroy()', () : void => {
    it('should execute component destruction instructions', () : void => {
      fixture.detectChanges();

      spyOn(window, 'clearInterval');

      fixture.destroy();
      expect(window.clearInterval).toHaveBeenCalledWith(MOCK_INTERVAL_ID);
    });
  });

  describe('function setCurrentTimeInterval()', () : void => {
    it('should update `currentTime` every second (config dependent)', fakeAsync(() : void => {
      fixture.detectChanges();

      const CURRENT_TIME_SNAPSHOT : Date = aboutDialogComponent.currentTime;

      setCurrentTimeIntervalSpy.and.callThrough();

      const CURRENT_TIME_INTERVAL_ID : number = aboutDialogComponent.setCurrentTimeInterval();

      tick(APP_CONSTANTS.timeConstants.oneSecondMS);
      expect(aboutDialogComponent.currentTime).not.toEqual(CURRENT_TIME_SNAPSHOT);

      window.clearInterval(CURRENT_TIME_INTERVAL_ID);
    }));
  });
});
