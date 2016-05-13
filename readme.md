# Flud [![Build Status](https://secure.travis-ci.org/ben-bradley/flud.png?branch=master)](https://travis-ci.org/ben-bradley/flud)

Flud is designed to be a simple and elegant way to work with streams.  Yes, there are a lot of really cool & slick modules that do that already and you can use them to solve specific problems.  Flud is more of a general toolkit than a specific tool.


## Readers

Readers will take in any of an existing stream, a file, or an array of objects and make them into a stream that can have Flud methods chained to it.  These methods can be called explicitly or when instantiating a new Flud().

### `stream(stream)`

If you've already got a `stream` that you want to use Flud methods on, all you have to do is provide it to `Flud()` or call the `.stream()` method.

#### Arguments

- `stream` = an existing NodeJS stream

#### Example

```javascript
'use strict';

import Flud from 'flud';
import fs from 'fs';

const stream = fs.createReadStream('/path/to/file');

const flud = new Flud(stream);

flud
  .tap((data) => console.log('data:', data))
  .stream
    .on('finish', () => console.log('all done!'));
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
    .on('finish', () => console.log('all done!'));
```

### `file(filepath)`

A common pattern is to read a file into a stream and the `.file()` method makes that easy.

#### Arguments

- `filepath` = a `String` that is the path to the file to read

#### Example

```javascript
'use strict';

import Flud from 'flud';

const filepath = '/path/to/file';

const flud = new Flud(filepath);

flud
  .tap((data) => console.log('data:', data))
  .stream
    .on('finish', () => console.log('all done!'));
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
    .on('finish', () => console.log('all done!'));
```

### `objects(array)`

Streams in `objectMode` are another common pattern that Flud works with.  To simplify this, Flud will accept an array of objects and convert it into a stream.

#### Arguments

- `array` = an array of `Object`s

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('data:', data))
  .stream
    .on('finish', () => console.log('all done!'));
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
    .on('finish', () => console.log('all done!'));
```


## PassThrough

PassThroughs invoke the Stream.PassThrough class.

### `tap(callback)`

The `.tap()` method will do just that, it taps into the stream and gives a place to view the contents of the stream without modifying them.

#### Arguments

- `callback` = a function with the signature `(data)`

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud();

flud
  .objects(objects)
  .tap((data) => console.log('data:', data))
  .stream
    .on('finish', () => console.log('all done!'));

/*
data: { a: 1 }
data: { a: 2 }
data: { a: 3 }
all done!
 */
```

### `first(callback)`

The `.first()` method will call a function and supply the first data chunk as an argument.

#### Arguments

- `callback` = a function with the signature `(data)`

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .first((data) => console.log('data:', data))
  .stream
    .on('finish', () => console.log('all done!'));

/*
data: { a: 1 }
all done!
 */
```

### `last(callback)`

#### Arguments

- `callback` = a function with the signature `(data)`

#### Example

The `.last()` method will call a function and supply the last data chunk as an argument.


```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .last((data) => console.log('data:', data))
  .stream
    .on('finish', () => console.log('all done!'));

/*
data: { a: 3 }
all done!
 */
```

### `when(condition, callback)`

The `.when()` method will evaluate a condition and only then execute the function with the data chunk that caused the condition to be truthy.

#### Arguments

- `condition` = a function with the signature `(data)`, truthy returned values will trigger the `callback`
- `callback` = a function with the signature `(data)`

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .when((data) => data.a !== 2, (data) => console.log('not 2:', data.a))
  .stream
    .on('finish', () => console.log('all done!'));

/*
not 2: 1
not 2: 3
all done!
 */
```

### `done(callback)`

The `.done()` method simply adds a listener to the stream `finish` event.

#### Arguments

- `callback` = a function with the signature `()`

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .done(() => console.log('done 1'))
  .tap((data) => console.log('tap:', data))
  .done(() => console.log('done 2'))
  .stream
    .on('finish', () => console.log('all done!'));

/*
tap: { a: 1 }
tap: { a: 2 }
tap: { a: 3 }
done 1
done 2
all done!
 */
```


## Transform

Transformer methods invoke the Stream.Transform class to actively modify the stream in some way.

### `transform(callback[, options])`

The `.transform()` method accepts a callback that will transform the data chunks

#### Arguments

- `callback` = a function with the signature `(data, encoding, next)`
- `options` = an object to specify the options for the `Transform()`

#### Example

```javascript
'use strict';

import Flud from 'flud';

const filepath = '/path/to/file';

const flud = new Flud(filepath);

flud
  .split()
  .tap((data) => console.log('before:', data))
  .transform((data, enc, next) => {
    data += ',z';
    next(null, data);
  })
  .tap((data) => console.log('after:', data))
  .done(() => console.log('all done!'));

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

### `split(delimiter)`

The `.split()` method accepts either a String or RegExp as an argument and will modify the stream so that each item resulting from the split becomes it's own chunk.

#### Arguments

- `delimiter` = either a `String` or a `RegExp` value to use to split the data into smaller chunks. __Default__ = `/\r*\n/`

#### Example

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
    .on('finish', () => console.log('all done!'));

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

### `map(callback)`

The `.map()` method acts like `Array.map()` via a simplified Stream.Transform.

#### Arguments

- `callback` = a function with signature `(data)`, returned values become data chunks for subsequent methods.

#### Example

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
    .on('finish', () => console.log('all done!'));

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

### `filter(callback)`

The `.map()` method acts like `Array.map()` via a simplified Stream.Transform.

#### Arguments

- `callback` = a function with signature `(data)`, returning a falsy value will omit the data chunk from subsequent methods

#### Example

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
    .on('finish', () => console.log('all done!'));

/*
before: { a: 1 }
before: { a: 2 }
before: { a: 3 }
after: { a: 1 }
after: { a: 3 }
all done!
 */
```

### `drop(number)`

The `.drop()` method will drop the first `n` data chunks that it sees from the stream.

#### Arguments

- `number` = the number of data chunks to drop

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('before:', data))
  .drop(2)
  .tap((data) => console.log('after:', data))
  .done(() => console.log('all done!'));

/*
before: { a: 1 }
before: { a: 2 }
before: { a: 3 }
after: { a: 3 }
all done!
 */
```

### `slice(start, number)`

The `.slice()` method will drop `number` data chunks beginning at `start` from the stream.

#### Arguments

- `start` = the position to start slicing from
- `number` = the number of data chunks to drop, __Default__ = 1

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('before:', data))
  .slice(2, 1)
  .tap((data) => console.log('after:', data))
  .done(() => console.log('all done!'));

/*
before: { a: 1 }
after: { a: 1 }
before: { a: 2 }
before: { a: 3 }
after: { a: 3 }
all done!
 */
```

### `join(delimiter)`

The `.join()` method will collect all the data chunks and emit a single data chunk.  If the stream is not in `objectMode`, the chunks are joined using the delimiter.  If the stream is in `objectMode` the objects are pushed into an array which becomes the emitted data chunk.

#### Arguments

- `delimiter` = a `String` value to use to join the data chunks into a single chunk. __Default__ = `','`, (__ignored in `objectMode`__)

#### Example

```javascript
'use strict';

import Flud from 'flud';

const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

const flud = new Flud(objects);

flud
  .tap((data) => console.log('before:', data))
  .join()
  .tap((data) => console.log('after:', data))
  .done(() => console.log('all done!'));

/*
before: { a: 1 }
before: { a: 2 }
before: { a: 3 }
after: [ { a: 1 }, { a: 2 }, { a: 3 } ]
all done!
 */
```


## Promises

Some times you may want to perform an operation on the results of the stream.  Since streams are asynchronous by their design, it's best to use Promises to manage the flow.

### `toArray()`

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

## Versions

- 1.2.1 - `npm publish` on master
- 1.2.0 - `new Flud(objectModeStream)` now works
- 1.1.0 - added `.join()`, cleaned up readme.md
- 1.0.0 - Initial release
