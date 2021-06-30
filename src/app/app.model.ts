import { ConfigService } from '@core/services/config/config.service';
import { InMemoryBackendConfigArgs } from 'angular-in-memory-web-api';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

import { ENVIRONMENT } from '@environment/environment.development';

export const IN_MEMORY_BACKEND_CONFIG_ARGS : InMemoryBackendConfigArgs = {
  caseSensitiveSearch : true,
  dataEncapsulation : false,
  post204 : false,
  put204 : false,
  delete404 : false,
  put404 : false,
  post409 : true,
  passThruUnknownUrl : true,
  delay : 250, // eslint-disable-line @typescript-eslint/no-magic-numbers
  apiBase : ConfigService.internalAppConfiguration.apiServer.apiBase,
  host : ENVIRONMENT.name === 'development' ? 'localhost' : 'ehharding.github.io',
  rootPath : ''
};

export const MAT_TOOLTIP_DEFAULT_CONFIG : MatTooltipDefaultOptions = {
  hideDelay : ConfigService.internalAppConfiguration.constants.tooltipHideDelayMS,
  showDelay : ConfigService.internalAppConfiguration.constants.tooltipShowDelayMS,
  touchendHideDelay : ConfigService.internalAppConfiguration.constants.touchendHideDelayMS,
  touchGestures : 'auto',
  position : 'below'
};
