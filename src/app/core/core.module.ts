/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the repository for the applications singleton core services. All services provided here have only one instance at any point
 * in time across the entire application, in other words.
 ****************************************************************************************************************************************************/

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '@shared/shared.module';

import { throwIfAlreadyLoaded } from '@core/guards/module-import.guard';

import { ThemeService } from '@core/services/theme/theme.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

@NgModule({
  declarations : [AboutDialogComponent, FooterComponent, ToolbarComponent],
  exports : [FooterComponent, ToolbarComponent],
  imports : [
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers : [ThemeService]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule : CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
