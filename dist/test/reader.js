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

    it('objectMode stream', function (done) {
      var _inputs2 = inputs();

      var objStream = _inputs2.objStream;
      var objects = _inputs2.objects;
      var flud = new _2.default(objStream());
      var objs = [];

      flud.tap(function (obj) {
        return objs.push(obj);
      }).stream.on('end', function () {
        objs.should.have.length(objects.length);
        done();
      });
    });

    it('objects', function (done) {
      var _inputs3 = inputs();

      var objects = _inputs3.objects;
      var flud = new _2.default(objects);

      flud.tap(function () {}).stream.on('end', function () {
        return done();
      });
    });

    it('filepath', function (done) {
      var _inputs4 = inputs();

      var filepath = _inputs4.filepath;
      var flud = new _2.default(filepath);

      flud.tap(function () {}).stream.on('end', function () {
        return done();
      });
    });
  }); // end reader tests
};

exports.default = readerTests;