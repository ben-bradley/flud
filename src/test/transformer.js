'use strict';

import should from 'should';
import Flud from '../';

const readerTests = (inputs) => {

  describe('transformer', () => {

    describe('split', () => {

      it('should break a chunk into smaller chunks', (done) => {
        let { stream } = inputs(),
          flud = new Flud(stream),
          before = [],
          after = [];

        flud
          .tap((data) => before.push(data))
          .split()
          .tap((data) => after.push(data))
          .stream.on('end', () => {
            (before.length).should.eql(1);
            (after.length).should.eql(4);
            done();
          });
      });

    }); // end split tests

    xdescribe('parallel', () => {

      it('should break a chunk into smaller chunks', (done) => {
        let { stream } = inputs(),
          flud = new Flud(stream),
          before = [],
          after = [];

        flud
          .tap((data) => before.push(data))
          .split()
          .parallel(4)
          .tap((data) => after.push(data))
          .stream.on('end', () => {
            (before.length).should.eql(1);
            (after.length).should.eql(4);
            done();
          });
      });

    }); // end split tests

    describe('map', () => {

      it('should modify the data in an object stream', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects);

        flud
          .map((data) => {
            (data).should.be.an.Object.with.property('a');
            data.b = 1;
            return data;
          })
          .tap((data) => {
            (data).should.be.an.Object.with.property('b');
            (data.b).should.be.a.Number;
          })
          .stream.on('end', () => done());
      });

      it('should modify the data in a stream', (done) => {
        let { stream } = inputs(),
          flud = new Flud(stream);

        flud
          .split()
          .map((data) => {
            (data).should.be.a.String;
            data += '-foo';
            return data;
          })
          .tap((data) => (data.match(/\-foo$/)).should.be.ok)
          .stream.on('end', () => done());
      });

    }); // end map tests

    describe('filter', () => {

      it('should filter the data from an object stream', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          exists = false;

        flud
          .tap((data) => {
            if (!exists && data.a === '2')
              exists = true;
          })
          .filter((data) => data.a !== '2')
          .tap((data) => {
            (data).should.be.an.Object.with.property('a');
            (data.a).should.not.eql('2');
          })
          .stream.on('end', () => {
            (exists).should.eql(true);
            done();
          });
      });

      it('should filter the data from a stream', (done) => {
        let { stream } = inputs(),
          flud = new Flud(stream),
          exists = false;

        flud
          .split()
          .tap((data) => {
            if (!exists && data === '4,5,6')
              exists = true;
          })
          .filter((data) => data !== '4,5,6')
          .tap((data) => {
            (data).should.be.a.String;
            (data).should.not.eql('4,5,6');
          })
          .stream.on('end', () => {
            (exists).should.eql(true);
            done();
          });
      });

    }); // end filter tests

    describe('append', () => {

      it('should create one more data event', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects);

        flud
          .append({ a: 0 })
          .toArray()
            .then((appended) => {
              let len = appended.length;

              (len).should.eql(objects.length + 1);
              (appended[len - 1]).should.be.an.Object.with.property('a');
              (appended[len - 1].a).should.eql(0);
              done();
            })
            .catch(done);
      });

    }); // end append tests

    describe('drop', () => {

      it('should drop the first n chunks', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          counter = 0;

        flud
          .drop(2)
          .tap(() => counter +=1)
          .done(() => {
            (counter).should.eql(objects.length - 2);
            done();
          });
      });

    }); // end drop tests

    describe('slice', () => {

      it('should slice chunks from the stream', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          datas = [];

        flud
          .slice(2, 2)
          .tap((data) => datas.push(data))
          .done(() => {
            (datas.length).should.eql(objects.length - 2);
            (datas[0].a).should.eql(objects[0].a);
            (datas[1].a).should.eql(objects[3].a);
            done();
          });
      });

    }); // end drop tests

    describe('transform', () => {

      it('should provide a hook for the _transform method', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          datas = [];

        flud
          .transform((data, enc, next) => {
            data.b = 1;
            next(null, data);
          }, { objectMode: true })
          .tap((data) => datas.push(data))
          .done(() => {
            datas.map((d) => {
              (d).should.be.an.Object.with.property('b');
              (d.b).should.be.a.Number;
            });
            done();
          });
      });

    }); // end transform tests

    describe('buffer', () => {

      it('should buffer object data until flush', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          before = [],
          after = [];

        flud
          .tap((data) => before.push(data))
          .join()
          .tap((data) => after.push(data))
          .done(() => {
            (before.length).should.eql(objects.length);
            (after.length).should.eql(1);
            done();
          });
      });

      it('should buffer string data until flush', (done) => {
        let { filepath } = inputs(),
          flud = new Flud(filepath),
          orig = '',
          before = [],
          after = [];

        flud
          .tap((data) => orig = data.replace(/\n$/, ''))
          .split()
          .tap((data) => before.push(data))
          .join('\n')
          .tap((data) => after.push(data))
          .done(() => {
            (before.length).should.eql(4);
            (after.length).should.eql(1);
            (after[0]).should.eql(orig);
            done();
          });
      });

    }); // end transform tests

  }); // end transformer tests

};

export default readerTests;
