'use strict';

import makeSure from 'make-sure';

import reader from './reader';
import transformer from './transformer';
import passthrougher from './passthrougher';
import returner from './returner';

const { isStream, isArray, isString } = makeSure;

const piper = () => ({
  pipe(stream) {
    if (isStream(stream) === false)
      throw new Error('Cannot pipe a non-stream');

    this.stream = this.stream.pipe(stream);

    return this;
  }
});

const Flud = (stream) => {
  const flud = Object.assign({},
    piper(),
    reader(),
    transformer(),
    passthrougher(),
    returner()
  );

  if (isStream(stream))
    flud.stream(stream);
  else if (isArray(stream))
    flud.objects(stream);
  else if (isString(stream))
    flud.file(stream);

  return flud;
};

// oink!
export default Flud;
