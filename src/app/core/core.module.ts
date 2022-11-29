/**
 * This module serves as the repository for the applications' singleton core services. All services provided here have only one instance at any point across the entire
 * application, in other words.
 */

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '@shared/shared.module';

import { ConfigService } from '@core/services/config/config.service';

import { HomeComponent } from '@core/components/home/home.component';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

@NgModule({
  declarations : [HomeComponent, ToolbarComponent],
  exports : [ToolbarComponent],
  imports : [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    ScrollingModule,
    SharedModule
  ],
  providers : [ConfigService]
})
class CoreModule { }

export {
  CoreModule
};
