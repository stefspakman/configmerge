var configmerge = require('../index.js');
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

var configuration =  configmerge.merge(config, './config.local.json', function(err, response) {
  if (err)
    console.log ('error', err.message, err.stack)
  else
    return response
});
console.log(configuration);

var configuration =  configmerge.merge(config, configObject, function(err, response) {
  if (err)
    console.log ('error', err.message, err.stack)
  else
    return response
});

var fs = require('fs');
fs.writeFileSync('./result.json', JSON.stringify(configuration));