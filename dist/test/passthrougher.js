'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passthrougherTests = function passthrougherTests(inputs) {

  describe('passthrougher', function () {

    describe('tap', function () {

      it('should tap the stream', function (done) {
        var _inputs = inputs();

        var objects = _inputs.objects;
        var flud = new _2.default(objects);
        var datas = [];

        flud.tap(function (data) {
          datas.push(data);
          data.should.be.an.Object.with.property('a');
        }).stream.on('end', function () {
          datas.length.should.eql(objects.length);
          datas[0].a.should.eql(objects[0].a);
          done();
        });
      });
    }); // end tap tests

    describe('first', function () {

      it('should call fn with only the first value', function (done) {
        var _inputs2 = inputs();

        var objects = _inputs2.objects;
        var flud = new _2.default(objects);
        var first = {};

        flud.first(function (data) {
          return first = data;
        }).stream.on('end', function () {
          first.should.be.an.Object.with.property('a');
          first.a.should.eql(objects[0].a);
          done();
        });
      });
    }); // end first tests

    describe('last', function () {

      it('should call fn with only the last value', function (done) {
        var _inputs3 = inputs();

        var objects = _inputs3.objects;
        var flud = new _2.default(objects);
        var last = {};

        flud.last(function (data) {
          return last = data;
        }).stream.on('end', function () {
          last.should.be.an.Object.with.property('a');
          last.a.should.eql(objects[objects.length - 1].a);
          done();
        });
      });
    }); // end last tests
  }); // end passthrougher tests
};

exports.default = passthrougherTests;