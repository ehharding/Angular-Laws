/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * app.module.ts - TypeScript
 *
 * @see https://angular.io/guide/architecture#modules
 * @description This module serves as the core, or root, module and is bootstrapped to start the application. It imports all other feature modules to
 * aid in application modularity and scalability.
 ****************************************************************************************************************************************************/

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';

@NgModule({
  bootstrap : [AppComponent],
  declarations : [AppComponent],
  imports : [CoreModule, AppRoutingModule, RouterModule, BrowserModule, BrowserAnimationsModule]
})
export class AppModule { }
