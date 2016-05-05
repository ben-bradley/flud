'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readerTests = function readerTests(inputs) {

  describe('reader', function () {

    it('stream', function (done) {
      var _inputs = inputs();

      var stream = _inputs.stream;
      var flud = new _2.default(stream);

      flud.tap(function () {}).stream.on('end', function () {
        return done();
      });
    });

    it('objects', function (done) {
      var _inputs2 = inputs();

      var objects = _inputs2.objects;
      var flud = new _2.default(objects);

      flud.tap(function () {}).stream.on('end', function () {
        return done();
      });
    });

    it('filepath', function (done) {
      var _inputs3 = inputs();

      var filepath = _inputs3.filepath;
      var flud = new _2.default(filepath);

      flud.tap(function () {}).stream.on('end', function () {
        return done();
      });
    });
  }); // end reader tests
};

exports.default = readerTests;