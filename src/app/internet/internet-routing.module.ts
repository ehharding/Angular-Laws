/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This file handles navigation for the `Internet` module. The URLs defined here are children of internet/.
 ****************************************************************************************************************************************************/

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InternetComponent } from '@internet/internet.component';

const ROUTES : Routes = [
  { path : '', component : InternetComponent }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forChild(ROUTES)]
})
export class InternetRoutingModule { }
