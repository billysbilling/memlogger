var crypto = require('crypto');
var memwatch = require('memwatch-next');
/**
 * Takes a log function that accepts an object of properties,
 * and optionally an interval (in ms) to log process.memoryUsage()
 * (default is 10000)
 **/
module.exports = function (logfn, msBetweenLogMemoryUsage) {
  var memoryLogInterval = msBetweenLogMemoryUsage || 10000;

  var identity = crypto.randomBytes(16).toString("hex");

  memwatch.on('leak', function (info) {
    logfn({
      '@timestamp': new Date().toISOString(),
      processId: identity,
      type: 'memwatch-leak',
      leak: info
    });
  });

  memwatch.on('stats', function (stats) {
    logfn({
      '@timestamp': new Date().toISOString(),
      processId: identity,
      type: 'memwatch-stats',
      stats: stats
    });
  });

  setInterval(function () {
    var usage = process.memoryUsage();
    logfn({
      '@timestamp': new Date().toISOString(),
      processId: identity,
      type: 'process-memory-usage',
      memory: usage
    })
  }, memoryLogInterval);
};