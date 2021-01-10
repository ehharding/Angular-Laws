/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the repository for the applications singleton core services. All services provided here have only one instance
 * at any point in time across the entire application, in other words.
 ****************************************************************************************************************************************************/

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';

import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';
import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations : [ToolbarComponent],
  exports : [ToolbarComponent],
  imports : [SharedModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule],
  providers : [Title]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule : CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
