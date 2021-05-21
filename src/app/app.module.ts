/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the root application module and is bootstrapped to start the application. It imports all other feature modules to aid in
 * application modularity and scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { BrowserModule, Title } from '@angular/platform-browser';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from 'app/app.component';

const GLOBAL_TOOLTIP_DEFAULT_CONFIGURATION : MatTooltipDefaultOptions = {
  hideDelay : 0,
  showDelay : 500,          // eslint-disable-line @typescript-eslint/no-magic-numbers
  touchendHideDelay : 1500, // eslint-disable-line @typescript-eslint/no-magic-numbers
  position : 'below',
  touchGestures : 'auto'
};

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule, CoreModule, SharedModule],
  providers : [Title, { provide : MAT_TOOLTIP_DEFAULT_OPTIONS, useValue : GLOBAL_TOOLTIP_DEFAULT_CONFIGURATION }]
})
export class AppModule { }
