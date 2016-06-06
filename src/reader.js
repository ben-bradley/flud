'use strict';

import { createReadStream } from 'fs';
import { Readable } from 'stream';
import makeSure from 'make-sure';

const { isObject, isString, isUndefined } = makeSure;

const reader = () => ({

  stream(stream) {
    makeSure(stream).is.a.Stream;

    this.stream = stream;

    if (stream._readableState && stream._readableState.objectMode)
      this.objectMode = true;

    return this;
  },

  file(filepath, encoding = 'utf8') {
    makeSure(filepath).is.a.String;

    this.stream = createReadStream(filepath, encoding);
    return this;
  },

  objects(array) {
    // this got rolled up into this.array()
    return this.array(array);
  },

  array(array) {
    makeSure(array).is.an.Array;

    let ary = array.slice(0);

    let objectMode = !!ary.filter(isObject).length,
      stringMode = !!ary.filter(isString).length;

    if (objectMode && stringMode)
      throw new Error('Flud cannot process mixed arrays.');

    this.objectMode = objectMode;
    this.stream = new Readable({
      objectMode,
      read() {
        let item = ary.shift();

        if (isUndefined(item))
          this.push(null);
        else if (isString(item) || isObject(item))
          this.push(item);
      }
    });

    return this;
  }

});

export default reader;
