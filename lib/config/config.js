exports.setup = function(siteDir) {
    var config = {};
    var env = 'prod';
    if (typeof process.NODE_ENV !== 'undefined' && ['dev', 'prod'].indexOf(process.NODE_ENV) !== -1) {
        env = process.NODE_ENV;
    }
    var configEnvironment = require('./config.json')[env];
    var configLocal = require('./local.json');

    // Fetch environment-specific settings
    // and overwrite them with local settings
    config.siteDir = siteDir;
    config.libraryDir = siteDir +'/lib';
    config.appDir = siteDir +'/app';
    for (var paramName in configEnvironment) {
        config[paramName] = configEnvironment[paramName];
    }
    for (var paramName in configLocal) {
        config[paramName] = configLocal[paramName];
    }

    global.config = config;
}