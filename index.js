var
  fs = require('fs'),
  _ = require('underscore-node');

exports.merge = function(config, localconfig) {
  if (typeof config === 'string'){
    var rawdata = fs.readFileSync(config);
    config = JSON.parse(rawdata);
  }
  if (typeof localconfig === 'string'){
    var rawdata = fs.readFileSync(localconfig);
    localconfig = JSON.parse(rawdata);
  }

  return createConfig(config, localconfig);
}

function createConfig(config, local) {
  var newConfig = {};
  Object.keys(config).forEach(function(key) {
    if (config[key] instanceof Array) {
      newConfig[key] = local[key];
      if (!local[key]){
        newConfig[key] = config[key];
      }
    }
    else if (typeof config[key] === 'object') {
      if (_.isEmpty(local[key])){
        newConfig[key] = config[key];
      } else {
        newConfig[key] = createConfig(config[key], local[key]);
      }
    } else {
      newConfig[key] = local[key];
      if (!local[key]){
        newConfig[key] = config[key];
      }
    }
  });
  return newConfig;
}