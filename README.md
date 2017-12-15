# Config overwrite [![NPM version][npm-image]][npm-url]

Allow your users to overwrite default config. 

## Install

```
$ npm install --save config-overwrite
```

## Usage
The function requires two parameters, both can be an object or a path as a string. The first parameter is the global config which you provide, the second will be the local overwrite. The local file only needs to contain the keys to be overwritten. 

If a version key is provided in both config files, the function will check if they are the same. If the versions do not match, the process wil be exited.

Example:

```js
var configoverwrite = require('config-overwrite');
var config = require('./config.json');

var configuration =  configoverwrite(config, './config.local.json', function(err, response) {
  if (err)
    console.log ('error', err.message, err.stack)
  else
    return response
});
```

config.json:
```json
{
  "version": "1.0.0",
  "fist": "Hello",
  "second": "Hey",
  "third": {
    "sub": "Sub levels work too",
    "sub-two": "Let's try"
  }
}
```
config.local.json:
```json
{
  "version": "1.0.0",
  "first": "Bye",
  "third": {
      "sub-two": "See, it works"
    }
}
```
result:
```json
{
  "version": "1.0.0",
  "fist": "Bye",
  "second": "Hey",
  "third": {
      "sub": "Sub levels work too",
      "sub-two": "See, it works"
    }
}
```

## Changelog
 **v1.1.0 - 2017-12-15** 
* function can be called by configoverwrite() instead of configoverwrite.generate()
* If a version key is provided in your config, the 

 **v1.0.0 - 2017-11-24** 
* Initial release


[npm-url]: https://www.npmjs.com/package/configoverwrite
[npm-image]: https://img.shields.io/npm/v/configoverwrite.svg