'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require('stream');

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

var _transformer = require('./transformer');

var _transformer2 = _interopRequireDefault(_transformer);

var _passthrougher = require('./passthrougher');

var _passthrougher2 = _interopRequireDefault(_passthrougher);

var _returner = require('./returner');

var _returner2 = _interopRequireDefault(_returner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var streamTypes = [_stream.Readable, _stream.Transform, _stream.PassThrough, _stream.Duplex];

var piper = function piper() {
  return {
    pipe: function pipe(stream) {
      this.stream = this.stream.pipe(stream);

      return this;
    }
  };
};

var Flud = function Flud(stream) {
  var flud = Object.assign({}, piper(), (0, _reader2.default)(), (0, _transformer2.default)(), (0, _passthrougher2.default)(), (0, _returner2.default)());

  var isStream = streamTypes.reduce(function (isStream, type) {
    return isStream || stream instanceof type;
  }, false);

  if (isStream) flud.stream(stream);else if (Array.isArray(stream)) flud.objects(stream);else if (typeof stream === 'string') flud.file(stream);

  return flud;
};

// oink!
exports.default = Flud;