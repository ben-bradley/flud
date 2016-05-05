'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objects = [{ a: 'b' }, { a: 'c' }, { a: 'd' }];
var file = __dirname + '/../data/sample.csv';
var stream = (0, _fs.createReadStream)(file);

var flud = new _2.default(stream);

flud.split()
// .map((data) => {
//   console.log('map', data);
//   data += '-foo';
//   return data;
// })
.tap(console.log).toArray().then(function (array) {
  console.log('toArray()', array);
});