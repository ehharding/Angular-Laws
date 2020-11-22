/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * This module contains all commonly used components, directives, modules, and pipes that are used across the application.
 *
 * {@link https://angular.io/guide/sharing-ngmodules#sharing-modules | Angular Sharing Modules Guide}
 ****************************************************************************************************************************************************/

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  exports : [BrowserAnimationsModule, BrowserModule, CommonModule, HttpClientModule, RouterModule]
})
export class SharedModule { }
