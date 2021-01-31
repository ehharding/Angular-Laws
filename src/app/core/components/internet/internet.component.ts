/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'iv-internet',
  styleUrls : ['internet.component.scss'],
  templateUrl : 'internet.component.html'
})
export class InternetComponent { }
