/*****************************************************************************************************************************************************
 * This component serves as the core, or root, component. It is always present and forms the main application view.
 *
 * {@link https://angular.io/guide/architecture#components | Angular Component Guide}
 ****************************************************************************************************************************************************/

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-root',
  styleUrls : ['app.component.scss'],
  templateUrl : 'app.component.html'
})
export class AppComponent { }
