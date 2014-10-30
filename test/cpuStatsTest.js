var expect = require('chai').expect,
  sinon = require('sinon'),
  path = require('path'),
  proxyquire = require('proxyquire')

describe('cpu-status', function() {
  var clock

  before(function () {
    clock = sinon.useFakeTimers()
  })

  after(function () {
    clock.restore()
  })

  it('should work out stats', function(done) {
    var os = {
      cpus: sinon.stub()
    }
    var cpuStats = proxyquire('../index', {
      os: os
    })

    os.cpus.returns([{
      times: {
        idle: 10,
        user: 10,
        sys: 10,
        nice: 0,
        irq: 0
      }
    }, {
      times:{
        idle: 0,
        user: 0,
        sys: 0,
        nice: 0,
        irq: 0
      }
    }])

    cpuStats(2000, function(error, results) {
      expect(error).to.not.exist

      expect(results[0].cpu).to.equal(50)
      expect(results[0].idle).to.equal(50)
      expect(results[0].user).to.equal(50)
      expect(results[0].sys).to.equal(0)
      expect(results[0].nice).to.equal(0)
      expect(results[0].irq).to.equal(0)

      expect(results[1].cpu).to.equal(50)
      expect(results[1].idle).to.equal(50)
      expect(results[1].user).to.equal(25)
      expect(results[1].sys).to.equal(25)
      expect(results[1].nice).to.equal(0)
      expect(results[1].irq).to.equal(0)

      done()
    })

    os.cpus.returns([{
        times: {
        idle: 20,
        user: 20,
        sys: 10,
        nice: 0,
        irq: 0
      }
    }, {
      times:{
        idle: 50,
        user: 25,
        sys: 25,
        nice: 0,
        irq: 0
      }
    }])

    clock.tick(2000);
  })

  it('should default to 1000ms', function(done) {
    var os = {
      cpus: sinon.stub()
    }
    var cpuStats = proxyquire('../index', {
      os: os
    })

    os.cpus.returns([])

    cpuStats(function(error, results) {
      done()
    })

    clock.tick(1000);
  })

  it('should object to incorrect arguments', function(done) {
    var cpuStats = require('../index')

    try {
      cpuStats()
    } catch(e) {
      done()
    }

  })
})
