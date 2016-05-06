'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require('stream');

var _makeSure = require('make-sure');

var _makeSure2 = _interopRequireDefault(_makeSure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passthrougher = function passthrougher() {
  return {
    tap: function tap(cb) {
      var objectMode = this.objectMode;
      var tap = new _stream.PassThrough({ objectMode: objectMode });

      (0, _makeSure2.default)(cb).is.a.Function;

      tap.on('data', function (data) {
        if (objectMode) cb(data);else if (!objectMode) cb(data.toString());
      });

      return this.pipe(tap);
    }
  };
};

exports.default = passthrougher;