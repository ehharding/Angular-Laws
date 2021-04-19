/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-footer',
  styleUrls : ['footer.component.scss'],
  templateUrl : 'footer.component.html'
})
export class FooterComponent {

}
