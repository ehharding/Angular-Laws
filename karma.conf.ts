/*****************************************************************************************************************************************************
 * Copyright 2020 Evan H. Harding. All Rights Reserved.
 *
 * The Karma Configuration File configures the Karma Test Runner to execute tests for the application. The tests themselves operate
 * through the Jasmine JavaScript Testing Framework powered with TypeScript.
 *
 * {@link https://karma-runner.github.io/5.2/config/configuration-file.html | Karma Configuration Guide}
 ****************************************************************************************************************************************************/

module.exports = (config : any) : void => { // eslint-disable-line @typescript-eslint/no-explicit-any
  config.set({
    autoWatch : true,
    colors : true,
    crossOriginAttribute : true,
    detached : false,
    failOnEmptyTestSuite : true,
    failOnFailingTestSuite : true,
    failOnSkippedTests : false,
    forceJSONP : false,
    proxyValidateSSL : true,
    restartOnFileChange : true,
    singleRun : false,
    autoWatchBatchDelay : 250,
    browserDisconnectTimeout : 2000,
    browserDisconnectTolerance : 0,
    browserNoActivityTimeout : 60000,
    browserSocketTimeout : 20000,
    captureTimeout : 60000,
    pingTimeout : 5000,
    port : 9876,
    processKillTimeout : 2000,
    reportSlowerThan : 0,
    retryLimit : 2,
    basePath : '',
    hostname : 'localhost',
    httpModule : undefined,
    protocol : 'http:',
    listenAddress : '0.0.0.0',
    urlRoot : '/',
    concurrency : Infinity as number,
    customClientContextFile : null,
    customContextFile : null,
    customDebugFile : null,
    customHeaders : undefined,
    formatError : undefined,
    proxyReq : undefined,
    proxyRes : undefined,
    upstreamProxy : undefined,
    logLevel : config.LOG_INFO as string,
    loggers : [{ type : 'console' }],
    beforeMiddleware : [],
    middleware : [],
    browsers : ['Chrome'],
    exclude : [],
    files : [],
    frameworks : ['@angular-devkit/build-angular', 'jasmine'],
    plugins : [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters : ['kjhtml', 'progress'],
    transports : ['polling', 'websocket'],
    browserConsoleLogOptions : {
      terminal : false,
      format : '%b %T %m', // { Browser } { Log Type in UpperCase } { Log Message } (%t is unused but is the LogType in LowerCase)
      level : 'debug',
      path : './browser-console.log'
    },
    client : {
      captureConsole : true,
      clearContext : false, // Leaves the Jasmine test runner output visible in the browser
      clientDisplayNone : false,
      runInParent : false,
      useIframe : true,
      args : undefined
    },
    coverageIstanbulReporter : {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      dir : require('path').join(__dirname, './coverage/internet-visualizer') as string,
      fixWebpackSourcePaths : true,
      reports : ['html', 'lcovonly', 'text-summary'],
      thresholds : { branches : 100, functions : 100, lines : 100, statements : 100 }
    },
    httpsServerOptions : { },
    mime : { },
    proxies : { }
  });
};
