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

    });

    describe('map', () => {

      it('should modify the data in an object stream', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects);

        flud
          .map((data) => {
            (data).should.be.an.Object.with.property('a');
            data.b = new Date();
            return data;
          })
          .tap((data) => {
            (data).should.be.an.Object.with.property('b');
            (data.b).should.be.a.Date;
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

    });

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

    });

  }); // end transformer tests

};

export default readerTests;
