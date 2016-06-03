'use strict';

import { PassThrough } from 'stream';
import makeSure from 'make-sure';

const passthrougher = () => ({

  tap(cb) {
    let { objectMode } = this,
      stream = new PassThrough({ objectMode });

    makeSure(cb).is.a.Function;

    stream.on('data', (data) => {
      if (objectMode)
        cb(data);
      else if (!objectMode)
        cb(data.toString());
    });

    return this.pipe(stream);
  },

  first(cb) {
    let { objectMode } = this,
      stream = new PassThrough({ objectMode }),
      done = false;

    makeSure(cb).is.a.Function;

    stream.on('data', (data) => {
      if (done)
        return;

      done = true;
      if (objectMode)
        cb(data);
      else if (!objectMode)
        cb(data.toString());
    });

    return this.pipe(stream);
  },

  last(cb) {
    let { objectMode } = this,
      stream = new PassThrough({ objectMode }),
      last = {};

    makeSure(cb).is.a.Function;

    stream.on('data', (data) => last = data);

    stream.on('finish', () => {
      if (objectMode)
        cb(last);
      else if (!objectMode)
        cb(last.toString());
    });

    return this.pipe(stream);
  },

  when(condition, cb) {
    let { objectMode } = this,
      stream = new PassThrough({ objectMode });

    makeSure(condition).is.a.Function;
    makeSure(cb).is.a.Function;

    stream.on('data', (data) => {
      if (condition(data))
        cb(data);
    });

    return this.pipe(stream);
  },

  done(cb) {
    makeSure(cb).is.a.Function;

    this.stream.on('end', () => cb());

    return this;
  }

});

export default passthrougher;
