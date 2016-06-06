'use strict';

import makeSure from 'make-sure';

import reader from './reader';
import transformer from './transformer';
import passthrougher from './passthrougher';
import returner from './returner';

const { isStream, isArray, isString } = makeSure;

const piper = () => ({
  pipe(stream, options) {
    if (isStream(stream) === false)
      throw new Error('Cannot pipe a non-stream');

    this.stream = this.stream.pipe(stream, options);

    return this;
  }
});

const pusher = () => ({
  push(data) {
    this.stream.push(data);
  }
});

const Flud = (stream) => {
  const flud = Object.assign({},
    piper(),
    pusher(),
    reader(),
    transformer(),
    passthrougher(),
    returner()
  );

  if (isStream(stream))
    flud.stream(stream);
  else if (isArray(stream))
    flud.array(stream);
  else if (isString(stream))
    flud.file(stream);

  return flud;
};

// oink!
export default Flud;
