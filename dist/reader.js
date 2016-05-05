'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _fs = require('fs');

var _stream2 = require('stream');

var reader = function reader() {
  return {
    stream: function stream(_stream) {
      this.stream = _stream;
      return this;
    },
    file: function file(filepath) {
      var encoding = arguments.length <= 1 || arguments[1] === undefined ? 'utf8' : arguments[1];

      this.stream = (0, _fs.createReadStream)(filepath, encoding);
      return this;
    },
    objects: function objects(ary) {
      var _ary = ary.slice(0);

      this.objectMode = true;
      this.stream = new _stream2.Readable({
        objectMode: true,
        read: function read() {
          var item = _ary.shift();

          if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') this.push(item);else if (typeof item === 'undefined') this.push(null);
        }
      });

      return this;
    }
  };
};

exports.default = reader;