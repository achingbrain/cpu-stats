# cpu-stats

[![Dependency Status](https://david-dm.org/achingbrain/cpu-stats.svg?theme=shields.io)](https://david-dm.org/achingbrain/cpu-stats) [![devDependency Status](https://david-dm.org/achingbrain/cpu-stats/dev-status.svg?theme=shields.io)](https://david-dm.org/achingbrain/cpu-stats#info=devDependencies) [![Build Status](https://img.shields.io/travis/achingbrain/cpu-stats/master.svg)](https://travis-ci.org/achingbrain/cpu-stats) [![Coverage Status](http://img.shields.io/coveralls/achingbrain/cpu-stats/master.svg)](https://coveralls.io/r/achingbrain/cpu-stats)


Calls a callback with the current CPU utilisation status in percent per core.

```javascript
var cpuStats = require('cpu-stats')

// the first argument is how long to sample for in ms.
// longer is more accurate but, you know, longer.
// if omitted, defaults to one second.
cpuStats(1000, function(error, result) {
  if(error) return console.error('Oh noes!', error) // actually this will never happen

  console.info(result)
})
```

Will output:

```sh
[
  { cpu: 14, user: 7, nice: 0, sys: 7, idle: 86, irq: 0 },
  { cpu: 3, user: 1, nice: 0, sys: 2, idle: 97, irq: 0 },
  { cpu: 9, user: 5, nice: 0, sys: 4, idle: 91, irq: 0 },
  { cpu: 2, user: 1, nice: 0, sys: 1, idle: 98, irq: 0 }
]
```

All numbers are in % and will probably not be integers.

`cpu` is a convenience addition of all activity per core minus idle time.
