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

    it('objects', (done) => {
      let { objects } = inputs(),
        flud = new Flud(objects);

      flud.tap(() => {}).stream.on('end', () => done());
    });

    it('filepath', (done) => {
      let { filepath } = inputs(),
        flud = new Flud(filepath);

      flud.tap(() => {}).stream.on('end', () => done());
    });

  }); // end reader tests

};

export default readerTests;
