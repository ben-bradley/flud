'use strict';

import Flud from './';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('before:', data))
  .drop(2)
  .tap((data) => console.log('after:', data))
  .done(() => console.log('all done!'));
