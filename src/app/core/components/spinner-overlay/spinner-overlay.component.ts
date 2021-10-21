import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector : 'pf-spinner-overlay',
  styleUrls : ['spinner-overlay.component.scss'],
  templateUrl : 'spinner-overlay.component.html'
})
export class SpinnerOverlayComponent { }
