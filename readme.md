# Flud

Flud is designed to be a simple and elegant way to work with streams.  Yes, there are a lot of really cool & slick modules that do that already and you can use them to solve specific problems.  Flud is more of a general toolkit than a specific tool.


## Readers

Readers will take in any of an existing stream, a file, or an array of objects and make them into a stream that can have Flud methods chained to it.  These methods can be called explicitly or when instantiating a new Flud().

### stream

If you've already got a stream that you want to use Flud methods on, all you have to do is provide it to `Flud()` or call the `.stream()` method.

```javascript
'use strict';

import Flud from 'flud';
import fs from 'fs';

const stream = fs.createReadStream('/path/to/file');

const flud = new Flud(stream);

flud
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));
```

```javascript
'use strict';

import Flud from 'flud';
import fs from 'fs';

const stream = fs.createReadStream('/path/to/file');

const flud = new Flud();

flud
  .stream(stream)
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));
```

### file

A common pattern is to read a file into a stream and the `.file()` method makes that easy.

```javascript
'use strict';

import Flud from 'flud';

const filepath = '/path/to/file';

const flud = new Flud(filepath);

flud
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));
```

```javascript
'use strict';

import Flud from 'flud';

const filepath = '/path/to/file';

const flud = new Flud();

flud
  .file(filepath)
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));
```

### objects

Streams in `objectMode` are another common pattern that Flud works with.  To simplify this, Flud will accept an array of objects and convert it into a stream.

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));
```

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud();

flud
  .objects(objects)
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));
```


## PassThrough

PassThroughs invoke the Stream.PassThrough class.

### tap

The `.tap()` method will do just that, it taps into the stream and gives a place to view the contents of the stream without modifying them.

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud();

flud
  .objects(objects)
  .tap((data) => console.log('data:', data))
  .stream
    .on('end', () => console.log('all done!'));

/*
data: { a: 1 }
data: { a: 2 }
data: { a: 3 }
all done!
 */
```


## Transform

Transformer methods invoke the Stream.Transform class to actively modify the stream in some way.

### split

The `.split()` method accepts either a String or RegExp as an argument and will modify the stream so that each item resulting from the split becomes it's own chunk.

For example, say you want to split a file by lines

```bash
#/path/to/file
line1
line2
line3
```

```javascript
'use strict';

import Flud from 'flud';

const filepath = '/path/to/file';

const flud = new Flud();

flud
  .file(filepath)
  .tap((data) => console.log('before:', data))
  .split()
  .tap((data) => console.log('after:', data))
  .stream
    .on('end', () => console.log('all done!'));

/*
before: line1
line2
line3
after: line1
after: line2
after: line3
all done!
 */
```

### map

The `.map()` method acts like `Array.map()` via a simplified Stream.Transform.

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('before:', data))
  .map((data) => {
    data.a += data.a;
    return data;
  })
  .tap((data) => console.log('after:', data))
  .stream
    .on('end', () => console.log('all done!'));

/*
before: { a: 1 }
before: { a: 2 }
before: { a: 3 }
after: { a: 2 }
after: { a: 4 }
after: { a: 6 }
all done!
 */
```

### filter

The `.map()` method acts like `Array.map()` via a simplified Stream.Transform.

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('before:', data))
  .filter((data) => data.a !== 2)
  .tap((data) => console.log('after:', data))
  .stream
    .on('end', () => console.log('all done!'));

/*
before: { a: 1 }
before: { a: 2 }
before: { a: 3 }
after: { a: 1 }
after: { a: 3 }
all done!
 */
```


## Promises

Some times you may want to perform an operation on the results of the stream.  Since streams are asynchronous by their design, it's best to use Promises to manage the flow.

### toArray

```javascript
'use strict';

import Flud from 'flud';

const filepath = '/path/to/file';

const flud = new Flud();

flud
  .file(filepath)
  .split()
  .toArray()
    .then((array) => console.log(array))
    .then(() => console.log('all done!'));

/*
[ "line1", "line2", "line3" ]
all done!
 */
```
