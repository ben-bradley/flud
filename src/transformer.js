'use strict';

import { Transform } from 'stream';

const transformer = () => ({

  filter(cb) {
    let { objectMode } = this;

    this.stream = this.stream.pipe(new Transform({
      objectMode,
      transform(data, enc, next) {
        let value = (objectMode) ? cb(data) : cb(data.toString());

        if (value)
          this.push(data);

        next();
      }
    }));

    return this;
  },

  map(cb) {
    let { objectMode } = this;

    this.stream = this.stream.pipe(new Transform({
      objectMode,
      transform(data, enc, next) {
        if (objectMode)
          this.push(cb(data));
        else if (!objectMode)
          this.push(cb(data.toString()));

        next();
      }
    }));

    return this;
  },

  split(delim = /\r*\n/) {
    if (this.objectMode) {
      console.log('Warning: can\'t split an objectMode stream');
      return this;
    };

    let buf = '';

    this.stream = this.stream.pipe(new Transform({
      transform(data, enc, next) {
        let parts = (buf + data.toString()).split(delim);

        buf = parts.pop();
        parts.map((part) => this.push(part.toString()))
        next();
      },
      flush(done) {
        buf.toString().split(delim).map((part) => this.push(part.toString()));
        done();
      }
    }));

    return this;
  }
});

export default transformer;
