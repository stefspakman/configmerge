var configoverwrite = require('../index.js');
var config = require('./config.json');

var configObject = {
  "0" : {
    "value": "10",
    "1" : {
      "value": "11",
      "2" : {
        "3" : {
          "value": "13",
          "4" : {
            "value": "14"
          }
        }
      }
    }
  }
};

var configuration =  configoverwrite(config, './tests/config.local.json', function(err, response) {
  if (err)
    console.log ('error', err.message, err.stack);
  else
    return response
});
console.log(configuration);

var configuration =  configoverwrite(config, configObject, function(err, response) {
  if (err)
    console.log ('error', err.message, err.stack)
  else
    return response
});
console.log(configuration);

var fs = require('fs');
fs.writeFileSync('./result.json', JSON.stringify(configuration));