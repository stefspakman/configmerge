var configmerge = require('../index.js');
var config = require('./config.json');
var fs = require('fs');


var configuration =  configmerge.merge(config, './config.local.json');

console.log(configuration);
// console.log(configmerge.merge('./config.local.json', config));
fs.writeFileSync('./data.json', JSON.stringify(configuration));