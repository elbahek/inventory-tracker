require('./lib/config/config').setup(__dirname);

// Express
var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser());
app.engine('html', require('ejs').renderFile);

// Set routes and run application
app.get('/', function(req, res) {
    res.send(200, 'im here');
});
app.listen(global.config.port || 3000);