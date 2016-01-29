'use strict';

var timer = require('metrics-timer');
var pkg_name = require('../package.json').name;

var metrics = module.exports = {};

metrics.print = function (printfn) {
    return function (files, metalsmith, done) {
      var ms = timer.stop(pkg_name);
      var text = Object.keys(files).length + ' files processed in ' + (ms / 1000).toFixed(2) + ' seconds.';
      if (typeof printfn == 'function') {
        printfn.call(null, text);
      } else {
        console.log(text);
      }
      done();
    };
};

metrics.init = function () {
    return function (files, metalsmith, done) {
      timer.start(pkg_name);
      done();
    };
};
