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

    }); // end tap tests

    describe('first', () => {

      it('should call fn with only the first value', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          first = {};

        flud
          .first((data) => first = data)
          .stream.on('end', () =>{
            (first).should.be.an.Object.with.property('a');
            (first.a).should.eql(objects[0].a);
            done();
          });
      });

    }); // end first tests

    describe('last', () => {

      it('should call fn with only the last value', (done) => {
        let { objects } = inputs(),
          flud = new Flud(objects),
          last = {};

        flud
          .last((data) => last = data)
          .stream.on('end', () =>{
            (last).should.be.an.Object.with.property('a');
            (last.a).should.eql(objects[objects.length - 1].a);
            done();
          });
      });

    }); // end last tests

  }); // end passthrougher tests

};

export default passthrougherTests;
