'use strict';

import should from 'should';
import Flud from '../';

const readerTests = (inputs) => {

  describe('reader', () => {

    it('stream', (done) => {
      let { stream } = inputs(),
        flud = new Flud(stream);

      flud.tap(() => {}).stream.on('end', () => done());
    });

    it('objectMode stream', (done) => {
      let { objStream, objects } = inputs(),
        flud = new Flud(objStream()),
        objs = [];

      flud
        .tap((obj) => objs.push(obj))
        .stream.on('end', () => {
          (objs).should.have.length(objects.length);
          done();
        });
    });

    it('array of Objects', (done) => {
      let { objects } = inputs(),
        flud = new Flud(objects);

      flud.tap(() => {}).stream.on('end', () => done());
    });

    it('filepath', (done) => {
      let { filepath } = inputs(),
        flud = new Flud(filepath);

      flud.tap(() => {}).stream.on('end', () => done());
    });

    it('arrays of Strings', (done) => {
      let { stringArray } = inputs(),
        flud = new Flud(stringArray),
        before = [],
        after = [];

      flud
        .tap((data) => before.push(data))
        .join()
        .tap((data) => after.push(data))
        .done(() => {
          (before).should.be.an.Array.with.length(stringArray.length);
          (after).should.be.an.Array.with.length(1);
          done();
        });
    });

    it('arrays of Mixed', () => {
      (() => {
        let { mixedArray } = inputs(),
          flud = new Flud(mixedArray);
      }).should.throw('Flud cannot process mixed arrays.');
    });

  }); // end reader tests

};

export default readerTests;
