/**
 * This component serves as the core, or root, component. It is always present and forms the main application view.
 *
 * {@link https://angular.io/guide/architecture#components | Angular Component Guide}
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector : 'al-root',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl : 'app.component.html',
  styleUrls : ['app.component.scss']
})
class AppComponent {
  @ViewChild('drawer') public drawer : MatDrawer | undefined = undefined;
}

export {
  AppComponent
};
