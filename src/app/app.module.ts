/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the core, or root, module and is bootstrapped to start the application. It imports all other feature modules to
 * aid in application modularity and scalability.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { NgModule } from '@angular/core';

import { AppComponent } from 'app/app.component';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { ThemeService } from '@core/services/theme/theme.service';

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [AppRoutingModule, CoreModule, SharedModule],
  providers : [ThemeService]
})
export class AppModule { }
