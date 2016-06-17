'use strict';

const execFile = require('child_process').execFile
const path = require('path')

module.exports = function execJsonite(args, cb) {
  const nodeArgs = [path.resolve(__dirname, '../index.js')].concat(Array.isArray(args) ? args : [args]);

  execFile('node', nodeArgs, function(err, out) {
    if (err) {
      cb(err, null, code)
    }

    try {
      cb(null, JSON.parse(out))
    } catch (e) {
      cb(e, null)
    }
  });
};
