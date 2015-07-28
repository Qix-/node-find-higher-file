'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var range = require('range');

var defaultOpts = {
  find: 'higher',
  mode: 'rs'
};

module.exports = function findHigherFile(file, from, opts, cb) {
  switch (arguments.length) {
  case 0:
  case 1:
    throw new Error('invalid arguments');
  case 2:
    cb = from;
    from = process.cwd();
    opts = defaultOpts;
    break;
  case 3:
    cb = opts;
    if (from.constructor && from.constructor === String) {
      opts = defaultOpts;
    } else {
      opts = from;
      from = process.cwd();
    }
    break;
  }

  opts.find = opts.find || defaultOpts.find;
  opts.mode = opts.mode || defaultOpts.mode;
  from = path.resolve(from);

  var cur = from;
  var paths = [];
  while (true) {
    paths.push(cur);
    var lastCur = cur;
    cur = path.dirname(cur);
    if (lastCur === cur) {
      break;
    }
  }

  if (opts.find === 'higher') {
    paths.reverse();
  }

  var fd = null;
  var resultPath = null;
  async.doUntil(
      function (cb) {
        var filepath = path.join(paths.pop(), file);
        fs.open(filepath, opts.mode, function (err, opened) {
          if (!err) {
            fd = opened;
            resultPath = filepath;
          }

          cb();
        });
      },
      function () {
        return fd !== null || paths.length === 0;
      },
      function (err) {
        if (err) {
          return cb(err);
        }

        if (fd === null) {
          return cb(new Error('\'' + file + '\' not found (reached ' +
                  'filesystem boundary)'));
        }

        cb(null, fd, resultPath);
      });
};
