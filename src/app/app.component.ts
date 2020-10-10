/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * app.component.ts - TypeScript
 *
 * @see https://angular.io/guide/architecture#components
 * @description This component serves as the core, or root, component. It is always present and forms the main application view.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector : 'iv-root',
  styleUrls : ['app.component.scss'],
  templateUrl : 'app.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppComponent { }
