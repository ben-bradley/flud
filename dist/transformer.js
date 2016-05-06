'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeSure = require('make-sure');

var _makeSure2 = _interopRequireDefault(_makeSure);

var _stream = require('stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformer = function transformer() {
  return {
    filter: function filter(cb) {
      (0, _makeSure2.default)(cb).is.a.Function;

      var objectMode = this.objectMode;


      return this.transform(function (data, enc, next) {
        var value = objectMode ? cb(data) : cb(data.toString());

        if (value) return next(null, data);

        next();
      }, { objectMode: objectMode });
    },
    map: function map(cb) {
      (0, _makeSure2.default)(cb).is.a.Function;

      var objectMode = this.objectMode;


      return this.transform(function (data, enc, next) {
        if (objectMode) next(null, cb(data));else next(null, cb(data.toString()));
      }, { objectMode: objectMode });
    },
    split: function split() {
      var delim = arguments.length <= 0 || arguments[0] === undefined ? /\r*\n/ : arguments[0];

      var isString = _makeSure2.default.isString(delim),
          isRegExp = _makeSure2.default.isRegExp(delim);

      if (!isString && !isRegExp) throw new Error('The split() method expects a string or regular expression');else if (this.objectMode) throw new Error('the split() method can\'t be called on an objectMode stream');

      var buf = '';

      var stream = new _stream.Transform({
        transform: function transform(data, enc, next) {
          var _this = this;

          var parts = (buf + data.toString()).split(delim);

          buf = parts.pop();
          parts.map(function (part) {
            return _this.push(part.toString());
          });
          next();
        },
        flush: function flush(done) {
          var _this2 = this;

          buf.toString().split(delim).map(function (part) {
            return _this2.push(part.toString());
          });
          done();
        }
      });

      return this.pipe(stream);
    },
    append: function append() {
      var _this3 = this;

      var data = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var objectMode = this.objectMode;


      if (objectMode && _makeSure2.default.isObject(data) === false) throw new Error('In objectMode, append() expects an object as an argument');

      return this.flush(function (done) {
        _this3.push(data);
        done();
      }, { objectMode: objectMode });
    },
    drop: function drop() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var objectMode = this.objectMode;
      var dropped = 0;

      return this.transform(function (data, enc, next) {
        if (dropped < n) {
          dropped += 1;
          return next();
        }

        next(null, data);
      }, { objectMode: objectMode });
    },
    slice: function slice(start) {
      var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
      var objectMode = this.objectMode;
      var dropped = 0;
      var counter = 0;

      return this.transform(function (data, enc, next) {
        counter += 1;

        if (counter >= start && dropped < n) {
          dropped += 1;
          return next();
        }

        next(null, data);
      }, { objectMode: objectMode });
    },
    transform: function transform(_transform, options) {
      var stream = new _stream.Transform(Object.assign({}, options, { transform: _transform }));

      return this.pipe(stream);
    },
    flush: function flush(_flush, options) {
      var stream = new _stream.Transform(Object.assign({}, {
        transform: function transform(data, enc, next) {
          next(null, data);
        },
        flush: function flush(done) {
          _flush.call(this, done);
        }
      }, options));

      return this.pipe(stream);
    }
  };
};

exports.default = transformer;