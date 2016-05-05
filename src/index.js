'use strict';

import { Readable, Transform, PassThrough, Duplex } from 'stream';
import reader from './reader';
import transformer from './transformer';
import passthrougher from './passthrougher';
import returner from './returner';

const streamTypes = [ Readable, Transform, PassThrough, Duplex ];

const Flud = (stream) => {
  const flud = Object.assign({},
    reader(),
    transformer(),
    passthrougher(),
    returner()
  );

  let isStream = streamTypes.reduce((isStream, type) =>
    isStream || stream instanceof type, false);

  if (isStream)
    flud.stream(stream);
  else if (Array.isArray(stream))
    flud.objects(stream);
  else if (typeof stream === 'string')
    flud.file(stream);

  return flud;
};

// oink!
export default Flud;
