/**
 * The Karma configuration file configures the Karma test runner to execute tests for the application. The tests themselves operate through the Jasmine JavaScript testing
 * framework.
 *
 * {@link https://karma-runner.github.io/6.3/config/configuration-file.html | Karma Configuration Guide}
 * {@link https://github.com/dfederm/karma-jasmine-html-reporter | Karma Jasmine HTML Reporter}
 * {@link https://github.com/litixsoft/karma-mocha-reporter | Karma Mocha Reporter}
 */

module.exports = (config : any) : void => {
  config.set({
    autoWatch : true,
    colors : true,
    crossOriginAttribute : true,
    detached : false,
    failOnEmptyTestSuite : true,
    failOnFailingTestSuite : true,
    failOnSkippedTests : true,
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
    concurrency : Infinity,
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
    customClientContextFile : undefined,
    customContextFile : undefined,
    customDebugFile : undefined,
    customHeaders : undefined,
    httpModule : undefined,
    formatError : undefined,
    proxyReq : undefined,
    proxyRes : undefined,
    upstreamProxy : undefined,
    logLevel : config.LOG_INFO,
    browserConsoleLogOptions : {
      terminal : false,
      format : '%b %T %m', // { Browser } { Log Type in UpperCase } { Log Message } (%t Is Unused But Is The LogType In LowerCase)
      level : 'debug'
    },
    client : {
      captureConsole : true,
      clearContext : false,
      clientDisplayNone : false,
      runInParent : false,
      useIframe : true,
      args : undefined,
      jasmine : {
        autoCleanClosures : true,
        failSpecWithNoExpectations : true,
        hideDisabled : false,
        random : true,
        seed : undefined,
        stopOnSpecFailure : false,
        stopSpecOnExpectationFailure : true,
        verboseDeprecations : true
      }
    },
    coverageReporter : { dir : 'coverage-report', type : 'html' },
    jasmineHtmlReporter : { suppressAll : false, suppressFailed : false },
    mochaReporter : {
      ignoreSkipped : false,
      printFirstSuccess : false,
      showDiff : false,
      maxLogLines : 999,
      divider : '====================================================================================================',
      output : 'full',
      colors : { error : 'red', info : 'green', success : 'blue', warning : 'cyan' },
      symbols : { error : 'x', info : '#', success : '+', warning : '!' }
    },
    customLaunchers : {
      FirefoxHeadless : { base : 'Firefox', flags : ['--headless'], prefs : { 'network.proxy.type' : 0 } }
    },
    httpsServerOptions : { },
    mime : { },
    proxies : { },
    preprocessors : { '**/*.ts' : 'coverage' },
    beforeMiddleware : [],
    middleware : [],
    browsers : ['Firefox'],
    exclude : [],
    files : [
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap.rtl.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap-grid.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap-grid.rtl.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap-reboot.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap-reboot.rtl.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap-utilities.css', watched : true, included : true, served : true },
      { pattern : 'node_modules/bootstrap/dist/css/bootstrap-utilities.rtl.css', watched : true, included : true, served : true },
      { pattern : 'src/assets/themes/indigo-pink.css', watched : true, included : true, served : true },
      { pattern : 'src/assets/themes/pink-bluegrey.css', watched : true, included : true, served : true }
    ],
    frameworks : ['@angular-devkit/build-angular', 'jasmine'],
    loggers : [{ type : 'console' }],
    plugins : [
      '@angular-devkit/build-angular/plugins/karma',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-mocha-reporter'
    ],
    reporters : ['coverage', 'dots', 'kjhtml', 'mocha'],
    transports : ['polling', 'websocket']
  });
};
