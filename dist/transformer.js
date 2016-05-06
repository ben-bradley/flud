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
      var objectMode = this.objectMode;


      var stream = new _stream.Transform({
        objectMode: objectMode,
        transform: function transform(data, enc, next) {
          var value = objectMode ? cb(data) : cb(data.toString());

          if (value) this.push(data);

          next();
        }
      });

      return this.pipe(stream);
    },
    map: function map(cb) {
      var objectMode = this.objectMode;


      var stream = new _stream.Transform({
        objectMode: objectMode,
        transform: function transform(data, enc, next) {
          if (objectMode) this.push(cb(data));else if (!objectMode) this.push(cb(data.toString()));

          next();
        }
      });

      return this.pipe(stream);
    },
    split: function split() {
      var delim = arguments.length <= 0 || arguments[0] === undefined ? /\r*\n/ : arguments[0];

      if (this.objectMode) {
        console.log('Warning: can\'t split an objectMode stream');
        return this;
      };

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
      var data = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var objectMode = this.objectMode;


      var stream = new _stream.Transform({
        objectMode: objectMode,
        transform: function transform(chunk, enc, next) {
          this.push(chunk);
          next();
        },
        flush: function flush(done) {
          this.push(data);
          done();
        }
      });

      return this.pipe(stream);
    }
  };
};

exports.default = transformer;