'use strict';

import Flud from './';
import { createReadStream } from 'fs';

const objects = [ { a: 'b' }, { a: 'c' }, { a: 'd' } ];
const file = __dirname + '/../data/sample.csv';
const stream = createReadStream(file);

const flud = new Flud(stream);

flud
  .split()
  // .map((data) => {
  //   console.log('map', data);
  //   data += '-foo';
  //   return data;
  // })
  .tap(console.log)
  .toArray()
  .then((array) => {
    console.log('toArray()', array);
  });
