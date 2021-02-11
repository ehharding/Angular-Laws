/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the repository for all code related to the `About` page, which holds information about the application, what it's for,
 * contributors, etc.
 ****************************************************************************************************************************************************/

import { NgModule } from '@angular/core';

import { AboutRoutingModule } from '@about/about-routing.module';

import { AboutComponent } from '@about/about.component';

@NgModule({
  declarations : [AboutComponent],
  imports : [AboutRoutingModule]
})
export class AboutModule { }
