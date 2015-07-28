# node-find-higher-file [![Travis-CI.org Build Status](https://img.shields.io/travis/Qix-/node-find-higher-file.svg?style=flat-square)](https://travis-ci.org/Qix-/node-find-higher-file) [![Coveralls.io Coverage Rating](https://img.shields.io/coveralls/Qix-/node-find-higher-file.svg?style=flat-square)](https://coveralls.io/r/Qix-/node-find-higher-file)
Traverses upward to find either the next file or the highest file.

## Example
```javascript
var findHigherFile = require('find-higher-file');

findHigherFile('Mistfile', {find: 'highest'}, function(err, file) {[
  if (err) throw err;
  console.log(file);
});
```

## License
Licensed under the MIT license
