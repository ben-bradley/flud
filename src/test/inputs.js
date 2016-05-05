'use strict';

import fs from 'fs';

const filepath = __dirname + '/../../data/sample.csv';

const inputs = () => ({
  objects: [ { a: '1' }, { a: '2' }, { a: '3' }, { a: '4' } ],
  filepath,
  stream: fs.createReadStream(filepath)
});

export default inputs;
