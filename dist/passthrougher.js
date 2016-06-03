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
      var stream = new _stream.PassThrough({ objectMode: objectMode });

      (0, _makeSure2.default)(cb).is.a.Function;

      stream.on('data', function (data) {
        if (objectMode) cb(data);else if (!objectMode) cb(data.toString());
      });

      return this.pipe(stream);
    },
    first: function first(cb) {
      var objectMode = this.objectMode;
      var stream = new _stream.PassThrough({ objectMode: objectMode });
      var done = false;

      (0, _makeSure2.default)(cb).is.a.Function;

      stream.on('data', function (data) {
        if (done) return;

        done = true;
        if (objectMode) cb(data);else if (!objectMode) cb(data.toString());
      });

      return this.pipe(stream);
    },
    last: function last(cb) {
      var objectMode = this.objectMode;
      var stream = new _stream.PassThrough({ objectMode: objectMode });
      var last = {};

      (0, _makeSure2.default)(cb).is.a.Function;

      stream.on('data', function (data) {
        return last = data;
      });

      stream.on('finish', function () {
        if (objectMode) cb(last);else if (!objectMode) cb(last.toString());
      });

      return this.pipe(stream);
    },
    when: function when(condition, cb) {
      var objectMode = this.objectMode;
      var stream = new _stream.PassThrough({ objectMode: objectMode });

      (0, _makeSure2.default)(condition).is.a.Function;
      (0, _makeSure2.default)(cb).is.a.Function;

      stream.on('data', function (data) {
        if (condition(data)) cb(data);
      });

      return this.pipe(stream);
    },
    done: function done(cb) {
      (0, _makeSure2.default)(cb).is.a.Function;

      this.stream.on('end', function () {
        return cb();
      });

      return this;
    }
  };
};

exports.default = passthrougher;