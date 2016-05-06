'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require('stream');

var passthrougher = function passthrougher() {
  return {
    tap: function tap(cb) {
      var objectMode = this.objectMode;
      var tap = new _stream.PassThrough({ objectMode: objectMode });

      tap.on('data', function (data) {
        if (objectMode) cb(data);else if (!objectMode) cb(data.toString());
      });

      return this.pipe(tap);
    }
  };
};

exports.default = passthrougher;