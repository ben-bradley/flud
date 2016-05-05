'use strict';

import should from 'should';
import Flud from '../';

const passthrougherTests = (inputs) => {

  describe('passthrougher', () => {

    describe('tap', () => {

      it('should tap the stream', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          datas = [];

        flud
          .tap((data) => {
            datas.push(data);
            (data).should.be.an.Object.with.property('a');
          })
          .stream.on('end', () =>{
            (datas.length).should.eql(objects.length);
            (datas[0].a).should.eql(objects[0].a);
            done();
          });
      });

    });

  }); // end passthrougher tests

};

export default passthrougherTests;
