import { AnimationMetadata, animate, state, style, transition, trigger } from '@angular/animations';

import { ConfigService } from '@core/services/config/config.service';

export const CONTRIBUTORS_ANIMATIONS : AnimationMetadata[] = [
  trigger('hover', [
    state('normalState', style({ transform : 'translateX(0)' })),
    state('shiftedState', style({ transform : 'translateX(10px)' }))
  ]),
  trigger('openClose', [
    state('visibleState', style({ opacity : 1 })),
    state('invisibleState', style({ opacity : 0 })),
    transition('visibleState <=> invisibleState', [animate(`${ ConfigService.appConfiguration.constants.genericAnimationDurationMS }ms`)])
  ])
];
