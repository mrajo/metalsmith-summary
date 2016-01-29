'use strict';

var timer = require('metrics-timer');
var sprintf = require('sprintf-js').sprintf;
var pkg_name = require('../package.json').name;

var metrics = module.exports = {};

metrics.print = function (template, printfn) {
    return function (files, metalsmith, done) {
      var data = {
        count: Object.keys(files).length,
        time: (timer.stop(pkg_name) / 1000).toFixed(2)
      };

      var text;
      if (typeof template == 'string') {
        template = template.replace(/\$\{([a-zA-Z]+)\}/g, '%\($1\)d');
        text = sprintf(template, data);
      } else {
        text = sprintf('%(count)d files processed in %(time)d seconds.', data);
      }

      if (typeof template == 'function') {
        printfn = template;
      }

      if (typeof printfn != 'function' && typeof template != 'function') {
        printfn = console.log;
      }

      printfn.call(null, text);
      done();
    };
};

metrics.init = function () {
    return function (files, metalsmith, done) {
      timer.start(pkg_name);
      done();
    };
};
