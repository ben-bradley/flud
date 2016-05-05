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
    });
  }); // end passthrougher tests
};

exports.default = passthrougherTests;