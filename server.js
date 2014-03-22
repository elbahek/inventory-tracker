require('./lib/config/config').setup(__dirname);

// Express
var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.engine('html', require('ejs').renderFile);

// Setup routes
require(global.config.libraryDir +'/router/router').setup(app, express);

// Run app
app.listen(global.config.port || 3000);