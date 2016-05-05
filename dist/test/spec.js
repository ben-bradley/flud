'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _inputs = require('./inputs');

var _inputs2 = _interopRequireDefault(_inputs);

var _reader = require('./reader');

var _reader2 = _interopRequireDefault(_reader);

var _passthrougher = require('./passthrougher');

var _passthrougher2 = _interopRequireDefault(_passthrougher);

var _returner = require('./returner');

var _returner2 = _interopRequireDefault(_returner);

var _transformer = require('./transformer');

var _transformer2 = _interopRequireDefault(_transformer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Flud', function () {

  (0, _reader2.default)(_inputs2.default);

  (0, _passthrougher2.default)(_inputs2.default);

  (0, _returner2.default)(_inputs2.default);

  (0, _transformer2.default)(_inputs2.default);
});