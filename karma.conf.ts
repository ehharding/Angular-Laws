/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 *
 * The Karma Configuration File configures the Karma Test Runner to execute tests for the application. The tests themselves operate through the
 * Jasmine JavaScript testing framework.
 *
 * {@link https://karma-runner.github.io/6.0/config/configuration-file.html | Karma Configuration Guide}
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
    protocol : 'http:',
    listenAddress : '0.0.0.0',
    urlRoot : '/',
    concurrency : Infinity as number,
    customClientContextFile : null,
    customContextFile : null,
    customDebugFile : null,
    customHeaders : undefined,
    httpModule : undefined,
    formatError : undefined,
    proxyReq : undefined,
    proxyRes : undefined,
    upstreamProxy : undefined,
    logLevel : config.LOG_INFO as string,
    loggers : [{ type : 'console' }],
    beforeMiddleware : [],
    middleware : [],
    browsers : ['Chrome'],
    browserConsoleLogOptions : {
      terminal : false,
      format : '%b %T %m', // { Browser } { Log Type in UpperCase } { Log Message } (%t is unused but is the LogType in LowerCase)
      level : 'debug',
      path : './browser-console.log'
    },
    exclude : [],
    files : [
      { pattern : './src/*.ts', type : 'js', included : false, served : true, watched : false },
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js'
    ],
    frameworks : ['@angular-devkit/build-angular', 'jasmine'],
    plugins : [
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter')
    ],
    reporters : ['coverage', 'dots', 'kjhtml', 'mocha'],
    transports : ['polling', 'websocket'],
    coverageReporter : { dir : 'coverage_report/', type : 'html' },
    mochaReporter : {
      ignoreSkipped : false,
      printFirstSuccess : false,
      showDiff : false,
      maxLogLines : 999,
      colors : { error : 'red', info : 'grey', success : 'green', warning : 'yellow' },
      output : 'full'
    },
    preprocessors : { 'src/app/*.ts' : 'coverage' },
    client : {
      captureConsole : true,
      clearContext : false, // Leaves the Jasmine test runner output visible in the browser
      clientDisplayNone : false,
      runInParent : false,
      useIframe : true,
      args : undefined
    },
    httpsServerOptions : { },
    mime : { },
    proxies : { }
  });
};
