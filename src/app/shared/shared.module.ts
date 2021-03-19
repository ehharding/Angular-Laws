/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * This module contains all commonly used components, directives, modules, and pipes that are used across the application.
 *
 * {@link https://angular.io/guide/sharing-ngmodules#sharing-modules | Angular Sharing Modules Guide}
 ****************************************************************************************************************************************************/

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  exports : [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class SharedModule { }
