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
  template : `
    <div class="al-app">
      <mat-drawer-container class="h-100 w-100 position-absolute">
        <mat-drawer #drawer class="w-100">
          <mat-nav-list class="fw-bold">
            <div mat-subheader>PAGES</div>

            <a mat-list-item href="/" routerLink="/" (click)="drawer.close()">
              <mat-icon class="me-2" color="primary">balance</mat-icon>
              <span>Angular Laws</span>
            </a>

            <div mat-subheader>EXTERNAL LINKS</div>

            <a mat-list-item href="https://github.com/ehharding/Angular-Laws" target="_blank">
              <img alt="GitHub Icon" class="al-github-icon me-2" src="../assets/icons/github.svg"/>
              <span>GitHub</span>
            </a>
          </mat-nav-list>

          <button mat-icon-button="al-fixed-close-button" tabindex="-1" (click)="drawer.close()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-drawer>

        <mat-drawer-content class="al-app-content">
          <al-toolbar class="al-toolbar mat-elevation-z5" (openSidenav)="drawer.open()"></al-toolbar>

          <router-outlet></router-outlet>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styles : [`
    .al-app {
      display : flex;
      flex-direction : column;
      position : absolute;
      top : 0;
      bottom : 0;
      left : 0;
      right : 0;
    }

    .al-app-content {
      height : calc(100% - 48px);
      top : 48px;
    }

    .al-toolbar {
      position : fixed;
      top : 0;
      left : 0;
      right : 0;
      z-index : 2;
    }
  `]
})
class AppComponent {
  @ViewChild('drawer') public drawer : MatDrawer | undefined = undefined;
}

export {
  AppComponent
};
