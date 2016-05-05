'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filepath = __dirname + '/../../data/sample.csv';

var inputs = function inputs() {
  return {
    objects: [{ a: '1' }, { a: '2' }, { a: '3' }, { a: '4' }],
    filepath: filepath,
    stream: _fs2.default.createReadStream(filepath)
  };
};

exports.default = inputs;