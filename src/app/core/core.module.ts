/**
 * This module serves as the repository for the applications' singleton core services. All services provided here have only one instance at any point across the entire
 * application, in other words.
 */

import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ConfigService } from '@core/services/config/config.service';

import { FooterComponent } from '@core/components/footer/footer.component';
import { HomeComponent } from '@core/components/home/home.component';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';

@NgModule({
  declarations : [FooterComponent, HomeComponent, ToolbarComponent],
  exports : [FooterComponent, ToolbarComponent],
  imports : [MatToolbarModule, SharedModule],
  providers : [ConfigService]
})
class CoreModule { }

export {
  CoreModule
};
