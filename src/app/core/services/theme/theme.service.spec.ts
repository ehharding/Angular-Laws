/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from '@core/services/theme/theme.service';

describe('ThemeService', () : void => {
  let themeService : ThemeService;
  let dom : Document;

  let getElementByIdSpy : jasmine.Spy;
  let querySelectorSpy : jasmine.Spy;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      imports : [BrowserDynamicTestingModule],
      providers : [{ provide : DOCUMENT, useClass : Document }]
    });

    dom = TestBed.inject(DOCUMENT);

    getElementByIdSpy = spyOn(dom, 'getElementById').and.returnValue(null);
    querySelectorSpy = spyOn(dom, 'querySelector').and.returnValue({ setAttribute(qualifiedName : string, value : string) : void { } } as any);
    spyOn(dom, 'createElement').and.returnValue({ setAttribute(qualifiedName : string, value : string) : void { } } as any);

    themeService = new ThemeService(dom);
  });

  it('should initialize variables.', () : void => {
    expect(themeService).toBeTruthy();
    expect(dom.getElementById).toHaveBeenCalledWith('client-theme');
  });
});
