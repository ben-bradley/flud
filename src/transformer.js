'use strict';

import makeSure from 'make-sure';
import { Transform } from 'stream';

const transformer = () => ({

  filter(cb) {
    makeSure(cb).is.a.Function;

    let { objectMode } = this;

    return this.transform((data, enc, next) => {
      let value = (objectMode) ? cb(data) : cb(data.toString());

      if (value)
        return next(null, data);

      next();
    }, { objectMode });
  },

  map(cb) {
    makeSure(cb).is.a.Function;

    let { objectMode } = this;

    return this.transform((data, enc, next) => {
      if (objectMode)
        next(null, cb(data));
      else
        next(null, cb(data.toString()));
    }, { objectMode });
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

    return this.flush((done) => {
      this.push(data);
      done();
    }, { objectMode });
  },

  drop(n = 1) {
    let { objectMode } = this,
      dropped = 0;

    return this.transform((data, enc, next) => {
      if (dropped < n) {
        dropped += 1;
        return next();
      }

      next(null, data);
    }, { objectMode });
  },

  slice(start, n  = 1) {
    let { objectMode } = this,
      dropped = 0,
      counter = 0;

    return this.transform((data, enc, next) => {
      counter += 1;

      if (counter >= start && dropped < n) {
        dropped += 1;
        return next();
      }

      next(null, data)
    }, { objectMode });
  },

  transform(transform, options) {
    let stream = new Transform(Object.assign({}, options, { transform }));

    return this.pipe(stream);
  },

  flush(flush, options) {
    let stream = new Transform(Object.assign({}, {
      transform(data, enc, next) {
        next(null, data);
      },
      flush(done) {
        flush.call(this, done);
      }
    }, options));

    return this.pipe(stream);
  },

  join(delim = ',') {
    let { objectMode } = this,
      buffer = [];

    let stream = new Transform({
      objectMode,
      transform(data, enc, next) {
        buffer.push(data);
        next();
      },
      flush(done) {
        let data = (objectMode) ? buffer : buffer.join(delim);

        this.push(data);
        done();
      }
    });

    return this.pipe(stream);
  }

});

export default transformer;
