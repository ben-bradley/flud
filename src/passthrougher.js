'use strict';

import { PassThrough } from 'stream';

const passthrougher = () => ({

  tap(cb) {
    let { objectMode } = this,
      tap = new PassThrough({ objectMode });

    tap.on('data', (data) => {
      if (objectMode)
        cb(data);
      else if (!objectMode)
        cb(data.toString());
    });

    return this.pipe(tap);
  }

});

export default passthrougher;
