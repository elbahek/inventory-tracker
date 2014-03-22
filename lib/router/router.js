exports.setup = function(app, express) {
    // Static routes
    app.use('/vendor', express.static(global.config.appDir + '/vendor'));
    app.use('/assets', express.static(global.config.appDir + '/assets'));
    app.use('/views', express.static(global.config.appDir + '/views'));

    // App entry point
    app.get('/', function(req, res) {
        res.render(global.config.appDir +'/views/landing.html');
    });
}
