'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var returner = function returner() {
  return {
    toArray: function toArray() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var stream = _this.stream;
        var array = [];

        stream.on('data', function (data) {
          if (data instanceof Buffer) array.push(data.toString());else array.push(data);
        });

        stream.on('end', function () {
          return resolve(array);
        });

        stream.on('error', function (err) {
          return reject(err);
        });
      });
    }
  };
};

exports.default = returner;