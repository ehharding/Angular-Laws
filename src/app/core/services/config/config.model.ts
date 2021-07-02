/* eslint-disable @typescript-eslint/no-magic-numbers */

export interface IAppConfiguration {
  environment : {
    name : 'development' | 'production';
  };
  apiServer : {
    retries : number;
    apiBase : string;
    themes : string;
    paths : {
      allUsers : string;
    };
  };
  constants : {
    genericAnimationDurationMS : number;
    tooltipHideDelayMS : number;
    tooltipShowDelayMS : number;
    touchendHideDelayMS : number;
  };
}

export const DEFAULT_APP_CONFIGURATION : IAppConfiguration = {
  environment : {
    name : 'development'
  },
  apiServer : {
    retries : 2,
    apiBase : 'api/',
    themes : 'assets/themes',
    paths : {
      allUsers : 'allUsers'
    }
  },
  constants : {
    genericAnimationDurationMS : 100,
    tooltipHideDelayMS : 0,
    tooltipShowDelayMS : 500,
    touchendHideDelayMS : 1500
  }
};

interface AppConstants {
  timeConstants : {
    oneSecondMS : number;
  };
}

export const APP_CONSTANTS : AppConstants = {
  timeConstants : {
    oneSecondMS : 1000
  }
};
