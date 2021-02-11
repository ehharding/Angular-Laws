/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the core, or root, module and is bootstrapped to start the application. It imports all other feature modules to aid in
 * application modularity and scalability, often asynchronously.
 *
 * {@link https://angular.io/guide/architecture#modules | Angular Module Guide}
 ****************************************************************************************************************************************************/

import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from 'app/app.component';

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [AppRoutingModule, CoreModule, SharedModule]
})
export class AppModule { }
