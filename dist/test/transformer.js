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

  describe('transformer', function () {

    describe('split', function () {

      it('should break a chunk into smaller chunks', function (done) {
        var _inputs = inputs();

        var stream = _inputs.stream;
        var flud = new _2.default(stream);
        var before = [];
        var after = [];

        flud.tap(function (data) {
          return before.push(data);
        }).split().tap(function (data) {
          return after.push(data);
        }).stream.on('end', function () {
          before.length.should.eql(1);
          after.length.should.eql(4);
          done();
        });
      });
    }); // end split tests

    xdescribe('parallel', function () {

      it('should break a chunk into smaller chunks', function (done) {
        var _inputs2 = inputs();

        var stream = _inputs2.stream;
        var flud = new _2.default(stream);
        var before = [];
        var after = [];

        flud.tap(function (data) {
          return before.push(data);
        }).split().parallel(4).tap(function (data) {
          return after.push(data);
        }).stream.on('end', function () {
          before.length.should.eql(1);
          after.length.should.eql(4);
          done();
        });
      });
    }); // end split tests

    describe('map', function () {

      it('should modify the data in an object stream', function (done) {
        var _inputs3 = inputs();

        var objects = _inputs3.objects;
        var flud = new _2.default(objects);

        flud.map(function (data) {
          data.should.be.an.Object.with.property('a');
          data.b = 1;
          return data;
        }).tap(function (data) {
          data.should.be.an.Object.with.property('b');
          data.b.should.be.a.Number;
        }).stream.on('end', function () {
          return done();
        });
      });

      it('should modify the data in a stream', function (done) {
        var _inputs4 = inputs();

        var stream = _inputs4.stream;
        var flud = new _2.default(stream);

        flud.split().map(function (data) {
          data.should.be.a.String;
          data += '-foo';
          return data;
        }).tap(function (data) {
          return data.match(/\-foo$/).should.be.ok;
        }).stream.on('end', function () {
          return done();
        });
      });
    }); // end map tests

    describe('filter', function () {

      it('should filter the data from an object stream', function (done) {
        var _inputs5 = inputs();

        var objects = _inputs5.objects;
        var flud = new _2.default(objects);
        var exists = false;

        flud.tap(function (data) {
          if (!exists && data.a === '2') exists = true;
        }).filter(function (data) {
          return data.a !== '2';
        }).tap(function (data) {
          data.should.be.an.Object.with.property('a');
          data.a.should.not.eql('2');
        }).stream.on('end', function () {
          exists.should.eql(true);
          done();
        });
      });

      it('should filter the data from a stream', function (done) {
        var _inputs6 = inputs();

        var stream = _inputs6.stream;
        var flud = new _2.default(stream);
        var exists = false;

        flud.split().tap(function (data) {
          if (!exists && data === '4,5,6') exists = true;
        }).filter(function (data) {
          return data !== '4,5,6';
        }).tap(function (data) {
          data.should.be.a.String;
          data.should.not.eql('4,5,6');
        }).stream.on('end', function () {
          exists.should.eql(true);
          done();
        });
      });
    }); // end filter tests

    describe('append', function () {

      it('should create one more data event', function (done) {
        var _inputs7 = inputs();

        var objects = _inputs7.objects;
        var flud = new _2.default(objects);

        flud.append({ a: 0 }).toArray().then(function (appended) {
          var len = appended.length;

          len.should.eql(objects.length + 1);
          appended[len - 1].should.be.an.Object.with.property('a');
          appended[len - 1].a.should.eql(0);
          done();
        }).catch(done);
      });
    }); // end append tests

    describe('drop', function () {

      it('should drop the first n chunks', function (done) {
        var _inputs8 = inputs();

        var objects = _inputs8.objects;
        var flud = new _2.default(objects);
        var counter = 0;

        flud.drop(2).tap(function () {
          return counter += 1;
        }).done(function () {
          counter.should.eql(objects.length - 2);
          done();
        });
      });
    }); // end drop tests

    describe('slice', function () {

      it('should slice chunks from the stream', function (done) {
        var _inputs9 = inputs();

        var objects = _inputs9.objects;
        var flud = new _2.default(objects);
        var datas = [];

        flud.slice(2, 2).tap(function (data) {
          return datas.push(data);
        }).done(function () {
          datas.length.should.eql(objects.length - 2);
          datas[0].a.should.eql(objects[0].a);
          datas[1].a.should.eql(objects[3].a);
          done();
        });
      });
    }); // end drop tests

    describe('transform', function () {

      it('should provide a hook for the _transform method', function (done) {
        var _inputs10 = inputs();

        var objects = _inputs10.objects;
        var flud = new _2.default(objects);
        var datas = [];

        flud.transform(function (data, enc, next) {
          data.b = 1;
          next(null, data);
        }, { objectMode: true }).tap(function (data) {
          return datas.push(data);
        }).done(function () {
          datas.map(function (d) {
            d.should.be.an.Object.with.property('b');
            d.b.should.be.a.Number;
          });
          done();
        });
      });
    }); // end transform tests

    describe('buffer', function () {

      it('should buffer object data until flush', function (done) {
        var _inputs11 = inputs();

        var objects = _inputs11.objects;
        var flud = new _2.default(objects);
        var before = [];
        var after = [];

        flud.tap(function (data) {
          return before.push(data);
        }).join().tap(function (data) {
          return after.push(data);
        }).done(function () {
          before.length.should.eql(objects.length);
          after.length.should.eql(1);
          done();
        });
      });

      it('should buffer string data until flush', function (done) {
        var _inputs12 = inputs();

        var filepath = _inputs12.filepath;
        var flud = new _2.default(filepath);
        var orig = '';
        var before = [];
        var after = [];

        flud.tap(function (data) {
          return orig = data.replace(/\n$/, '');
        }).split().tap(function (data) {
          return before.push(data);
        }).join('\n').tap(function (data) {
          return after.push(data);
        }).done(function () {
          before.length.should.eql(4);
          after.length.should.eql(1);
          after[0].should.eql(orig);
          done();
        });
      });
    }); // end transform tests
  }); // end transformer tests
};

exports.default = readerTests;