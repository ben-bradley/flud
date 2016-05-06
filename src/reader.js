'use strict';

import { createReadStream } from 'fs';
import { Readable } from 'stream';
import makeSure from 'make-sure';

const reader = () => ({

  stream(stream) {
    makeSure(stream).is.a.Stream;

    this.stream = stream;
    return this;
  },

  file(filepath, encoding = 'utf8') {
    makeSure(filepath).is.a.String;

    this.stream = createReadStream(filepath, encoding);
    return this;
  },

  objects(array) {
    makeSure(array).is.an.Array;

    let ary = array.slice(0);

    this.objectMode = true;
    this.stream = new Readable({
      objectMode: true,
      read() {
        let item = ary.shift();

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
