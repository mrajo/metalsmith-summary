# metalsmith-summary

> A Metalsmith plugin to output total files processed and execution time when finished

This plugin prints a quick message before the build action to show the number of files processed and the time it took to execute all plugins.

## Usage

This module exports two functions: `init` and `print`. `init` should be the first plugin used by Metalsmith to initialize the timer. `print` should be the last plugin used before the `build` action.

```js
var Metalsmith = require('metalsmith');
var summary = require('metalsmith-summary');

Metalsmith(__dirname)
  .use(summary.init())
  // other plugins
  .use(summary.print())
  .build();
```

This will output a message like this:

`42 files were processed in 3.14 seconds.`


MIT © [Anthony Castle](http://github.com/mrajo)
