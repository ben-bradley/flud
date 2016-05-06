'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeSure = require('make-sure');

var _makeSure2 = _interopRequireDefault(_makeSure);

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

var _transformer = require('./transformer');

var _transformer2 = _interopRequireDefault(_transformer);

var _passthrougher = require('./passthrougher');

var _passthrougher2 = _interopRequireDefault(_passthrougher);

var _returner = require('./returner');

var _returner2 = _interopRequireDefault(_returner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isStream = _makeSure2.default.isStream;
var isArray = _makeSure2.default.isArray;
var isString = _makeSure2.default.isString;


var piper = function piper() {
  return {
    pipe: function pipe(stream) {
      if (isStream(stream) === false) throw new Error('Cannot pipe a non-stream');

      this.stream = this.stream.pipe(stream);

      return this;
    }
  };
};

var Flud = function Flud(stream) {
  var flud = Object.assign({}, piper(), (0, _reader2.default)(), (0, _transformer2.default)(), (0, _passthrougher2.default)(), (0, _returner2.default)());

  if (isStream(stream)) flud.stream(stream);else if (isArray(stream)) flud.objects(stream);else if (isString(stream)) flud.file(stream);

  return flud;
};

// oink!
exports.default = Flud;