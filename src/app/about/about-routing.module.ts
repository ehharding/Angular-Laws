/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This file handles navigation for the `About` module. The URLs defined here are children of about/.
 ****************************************************************************************************************************************************/

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AboutComponent } from '@about/about.component';

const ROUTES : Routes = [
  { path : '', component : AboutComponent }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forChild(ROUTES)]
})
export class AboutRoutingModule { }
