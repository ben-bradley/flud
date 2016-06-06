'use strict';

import fs from 'fs';
import { Readable } from 'stream';

const filepath = __dirname + '/../../data/sample.csv';

const objects = [ { a: '1' }, { a: '2' }, { a: '3' }, { a: '4' } ];

const manyObjects = Array.from(new Array(50), (v, i) => ({ a: i }));
const stringArray = Array.from(new Array(50), (v, i) => '' + i);
const mixedArray = [].concat(manyObjects, stringArray);

const objStream = new Readable({
  objectMode: true,
  read() {}
});

const inputs = () => ({
  objects,
  manyObjects,
  stringArray,
  mixedArray,
  filepath,
  stream: fs.createReadStream(filepath),
  objStream() {
    let i = 0;

    return new Readable({
      objectMode: true,
      read() {
        let obj = objects[i];

        if (!obj)
          this.push(null);
        else {
          this.push(obj);
          i += 1;
        }
      }
    });
  }
});

export default inputs;
