/*****************************************************************************************************************************************************
 * This module serves as the repository for the applications singleton core services. All services provided here have only one instance at any point
 * in time across the entire application, in other words.
 ****************************************************************************************************************************************************/

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';

import { ConfigService } from '@core/services/config/config.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { UserService } from '@core/services/user/user.service';

import { AboutDialogComponent } from '@core/components/toolbar/about-dialog/about-dialog.component';
import { CreateAccountLoginDialogComponent } from '@core/components/toolbar/create-account-login-dialog/create-account-login-dialog.component';
import { SpinnerOverlayComponent } from '@core/components/spinner-overlay/spinner-overlay.component';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

@NgModule({
  declarations : [AboutDialogComponent, CreateAccountLoginDialogComponent, SpinnerOverlayComponent, ToolbarComponent],
  exports : [ToolbarComponent],
  imports : [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ScrollingModule,
    SharedModule
  ],
  providers : [ConfigService, ThemeService, UserService]
})
export class CoreModule { }
