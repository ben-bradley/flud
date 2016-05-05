'use strict';

import should from 'should';
import Flud from '../';

const readerTests = (inputs) => {

  describe('returner', () => {

    describe('toArray', () => {

      it('should return a Promise that produces an array', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects);

        flud
          .tap((data) => {
            (data).should.be.an.Object.with.property('a');
          })
          .toArray()
          .then((array) => {
            (array).should.be.an.Array.with.length(objects.length);
            done();
          });
      });

    });

  }); // end returner tests

};

export default readerTests;
