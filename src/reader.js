'use strict';

import { createReadStream } from 'fs';
import { Readable } from 'stream';

const reader = () => ({

  stream(stream) {
    this.stream = stream;
    return this;
  },

  file(filepath, encoding = 'utf8') {
    this.stream = createReadStream(filepath, encoding);
    return this;
  },

  objects(ary) {
    let _ary = ary.slice(0);

    this.objectMode = true;
    this.stream = new Readable({
      objectMode: true,
      read() {
        let item = _ary.shift();

        if (typeof item === 'object')
          this.push(item);
        else if (typeof item === 'undefined')
          this.push(null);
      }
    });

    return this;
  }

});

export default reader;
