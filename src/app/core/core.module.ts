/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the repository for the applications singleton core services. All services provided here have only one instance at any point
 * in time across the entire application, in other words.
 ****************************************************************************************************************************************************/

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '@shared/shared.module';

import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';

import { ThemeService } from '@core/services/theme/theme.service';

import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

@NgModule({
  declarations : [ToolbarComponent],
  exports : [ToolbarComponent],
  imports : [BrowserModule, BrowserAnimationsModule, SharedModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule],
  providers : [ThemeService, Title]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule : CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
