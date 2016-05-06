'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objects = [{ a: 1 }, { a: 2 }, { a: 3 }];

var flud = new _2.default(objects);

flud.tap(function (data) {
  return console.log('before:', data);
}).drop(2).tap(function (data) {
  return console.log('after:', data);
}).done(function () {
  return console.log('all done!');
});