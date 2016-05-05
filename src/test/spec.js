'use strict';

import should from 'should';
import Flud from '../';
import inputs from './inputs';

import readerTests from './reader';
import passthrougherTests from './passthrougher';
import returnerTests from './returner';
import transformerTests from './transformer';

describe('Flud', () => {

  readerTests(inputs);

  passthrougherTests(inputs);

  returnerTests(inputs);

  transformerTests(inputs);

});
