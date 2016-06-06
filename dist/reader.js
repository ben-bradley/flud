'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _stream2 = require('stream');

var _makeSure = require('make-sure');

var _makeSure2 = _interopRequireDefault(_makeSure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = _makeSure2.default.isObject;
var isString = _makeSure2.default.isString;
var isUndefined = _makeSure2.default.isUndefined;


var reader = function reader() {
  return {
    stream: function stream(_stream) {
      (0, _makeSure2.default)(_stream).is.a.Stream;

      this.stream = _stream;

      if (_stream._readableState && _stream._readableState.objectMode) this.objectMode = true;

      return this;
    },
    file: function file(filepath) {
      var encoding = arguments.length <= 1 || arguments[1] === undefined ? 'utf8' : arguments[1];

      (0, _makeSure2.default)(filepath).is.a.String;

      this.stream = (0, _fs.createReadStream)(filepath, encoding);
      return this;
    },
    objects: function objects(array) {
      // this got rolled up into this.array()
      return this.array(array);
    },
    array: function array(_array) {
      (0, _makeSure2.default)(_array).is.an.Array;

      var ary = _array.slice(0);

      var objectMode = !!ary.filter(isObject).length,
          stringMode = !!ary.filter(isString).length;

      if (objectMode && stringMode) throw new Error('Flud cannot process mixed arrays.');

      this.objectMode = objectMode;
      this.stream = new _stream2.Readable({
        objectMode: objectMode,
        read: function read() {
          var item = ary.shift();

          if (isUndefined(item)) this.push(null);else if (isString(item) || isObject(item)) this.push(item);
        }
      });

      return this;
    }
  };
};

exports.default = reader;