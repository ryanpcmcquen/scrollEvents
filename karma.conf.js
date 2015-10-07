/*jslint node:true*/
'use strict';

module.exports = function (karma) {
  karma.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'test/**/[^_]*.js',
      'scrollEvents.js'
    ],

    reporters: ['nyan'],

    preprocessors: {},

    browsers: ['Chrome', 'Firefox'],

    logLevel: karma.LOG_INFO,

    singleRun: false,
    autoWatch: true,
    colors: true
  });
};