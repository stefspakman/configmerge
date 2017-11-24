var
  fs = require('fs'),
  _ = require('underscore-node');

exports.merge = function(config, localconfig, done) {
  config = openFile(config, function (err, result) {
    if (!err)
      return ('result', result)
  });

  localconfig = openFile(localconfig, function (err, result) {
    if (!err)
      return ('result', result)
  });
  if (!config || !localconfig) {
    return done (Error ('Cannot open file'))
  } else {
    return done (null, createConfig(config, localconfig));
  }
}

function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

function openFile(object, done){
  if (typeof object === 'string') {
    if (fs.existsSync(object)) {
      var rawdata = fs.readFileSync(object);
      return done (null, JSON.parse(rawdata));
    }  else {
      return done (Error ('Cannot open file'))
    }
  } else {
    return done (null, object)
  }
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