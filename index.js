var os = require('os')

var withEvery = function(callback) {
  os.cpus().forEach(function(cpu, index) {
    Object.keys(cpu.times).forEach(function(key) {
      callback(index, key, cpu.times[key])
    })
  })
}

module.exports = function(timeout, callback) {
  if(arguments.length == 0) {
    throw new Error('Please pass a callback to cpu-stats')
  }

  if(arguments.length == 1) {
    callback = timeout
    timeout = 1000
  }

  var initial = []
  var values = []

  for(var i = 0; i < os.cpus().length; i++) {
    initial.push({})
    values.push({})
  }

  withEvery(function(index, key, value) {
    initial[index][key] = value
  })

  setTimeout(function() {
    withEvery(function(index, key, value) {
      values[index][key] = value - initial[index][key]
    })

    var output = values.map(function(value) {
      var total = value.user + value.nice + value.sys + value.idle + value.irq

      return {
        cpu: ((total - value.idle) / total) * 100,
        user: (value.user / total) * 100,
        nice: (value.nice / total) * 100,
        sys: (value.sys / total) * 100,
        idle: (value.idle / total) * 100,
        irq: (value.irq / total) * 100
      }
    })

    callback(undefined, output)
  }, timeout)
}
