'use strict';

import makeSure from 'make-sure';
import { Transform } from 'stream';

const transformer = () => ({

  filter(cb) {
    makeSure(cb).is.a.Function;

    let { objectMode } = this;

    let stream = new Transform({
      objectMode,
      transform(data, enc, next) {
        let value = (objectMode) ? cb(data) : cb(data.toString());

        if (value)
          this.push(data);

        next();
      }
    });

    return this.pipe(stream);
  },

  map(cb) {
    makeSure(cb).is.a.Function;

    let { objectMode } = this;

    let stream = new Transform({
      objectMode,
      transform(data, enc, next) {
        if (objectMode)
          this.push(cb(data));
        else if (!objectMode)
          this.push(cb(data.toString()));

        next();
      }
    });

    return this.pipe(stream);
  },

  split(delim = /\r*\n/) {
    let isString = makeSure.isString(delim),
      isRegExp = makeSure.isRegExp(delim);

    if (!isString && !isRegExp)
      throw new Error('The split() method expects a string or regular expression');
    else if (this.objectMode)
      throw new Error('the split() method can\'t be called on an objectMode stream');

    let buf = '';

    let stream = new Transform({
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
    });

    return this.pipe(stream);
  },

  append(data = '') {
    let { objectMode } = this;

    if (objectMode && makeSure.isObject(data) === false)
      throw new Error('In objectMode, append() expects an object as an argument');

    let stream = new Transform({
      objectMode,
      transform(chunk, enc, next) {
        this.push(chunk);
        next();
      },
      flush(done) {
        this.push(data);
        done();
      }
    });

    return this.pipe(stream);
  }

});

export default transformer;
