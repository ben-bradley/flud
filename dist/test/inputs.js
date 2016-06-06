'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stream = require('stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filepath = __dirname + '/../../data/sample.csv';

var objects = [{ a: '1' }, { a: '2' }, { a: '3' }, { a: '4' }];

var manyObjects = Array.from(new Array(50), function (v, i) {
  return { a: i };
});
var stringArray = Array.from(new Array(50), function (v, i) {
  return '' + i;
});
var mixedArray = [].concat(manyObjects, stringArray);

var objStream = new _stream.Readable({
  objectMode: true,
  read: function read() {}
});

var inputs = function inputs() {
  return {
    objects: objects,
    manyObjects: manyObjects,
    stringArray: stringArray,
    mixedArray: mixedArray,
    filepath: filepath,
    stream: _fs2.default.createReadStream(filepath),
    objStream: function objStream() {
      var i = 0;

      return new _stream.Readable({
        objectMode: true,
        read: function read() {
          var obj = objects[i];

          if (!obj) this.push(null);else {
            this.push(obj);
            i += 1;
          }
        }
      });
    }
  };
};

exports.default = inputs;