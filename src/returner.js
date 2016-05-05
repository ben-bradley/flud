'use strict';

const returner = () => ({
  toArray() {
    return new Promise((resolve, reject) => {
      let { stream } = this,
        array = [];

      stream.on('data', (data) => {
        if (data instanceof Buffer)
          array.push(data.toString());
        else
          array.push(data);
      });

      stream.on('end', () => resolve(array));

      stream.on('error', (err) => reject(err));
    });
  }
});

export default returner;
