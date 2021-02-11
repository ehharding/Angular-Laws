/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module serves as the repository for all code related to the `Internet Visualizer` page, which is the main starting page for the application.
 ****************************************************************************************************************************************************/

import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

import { InternetRoutingModule } from '@internet/internet-routing.module';

import { InternetComponent } from '@internet/internet.component';

@NgModule({
  declarations : [InternetComponent],
  imports : [InternetRoutingModule, MatButtonModule]
})
export class InternetModule { }
