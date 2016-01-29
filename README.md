# metalsmith-summary [![Build Status](https://travis-ci.org/mrajo/metalsmith-summary.svg)](https://travis-ci.org/mrajo/metalsmith-summary)

> A Metalsmith plugin to output total files processed and execution time when finished

This plugin prints a quick message before the build action to show the number of files processed and the time it took to execute all plugins.

## Usage

This module exports two functions: `init` and `print`. `init` should be the first plugin used by Metalsmith to initialize the timer. `print` should be the last plugin used before the `build` action. `print` accepts two optional arguments (`template`, `printfn`). Either one can be omitted but must be in this order when both defined.

`template` overrides the default output string. Use placeholders in the string to replace them with data from Metalsmith. `${count}` is replaced with file count and `${time}` is replaced with number of seconds to execute Metalsmith build.

By default, `print` uses `console.log`, but this can overridden by passing in a function that accepts a single string argument.

```js
var Metalsmith = require('metalsmith');
var summary = require('metalsmith-summary');

Metalsmith(__dirname)
  .use(summary.init())
  // other plugins
  .use(summary.print())
  // or
  .use(summary.print('There are ${count}. It took ${time} seconds.'))
  // or
  .use(summary.print(otherPrintFn))
  // or
  .use(summary.print('There are ${count}. It took ${time} seconds.', otherPrintFn))
  .build();
```

This will print a message to console with `console.log` or the supplied function like so:

`42 files were processed in 3.14 seconds.`


MIT © [Anthony Castle](http://github.com/mrajo)
