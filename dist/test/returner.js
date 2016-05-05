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

  describe('returner', function () {

    describe('toArray', function () {

      it('should return a Promise that produces an array', function (done) {
        var _inputs = inputs();

        var objects = _inputs.objects;
        var flud = new _2.default(objects);

        flud.tap(function (data) {
          data.should.be.an.Object.with.property('a');
        }).toArray().then(function (array) {
          array.should.be.an.Array.with.length(objects.length);
          done();
        });
      });
    });
  }); // end returner tests
};

exports.default = readerTests;